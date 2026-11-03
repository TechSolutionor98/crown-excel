import React from 'react';
import { getDb } from '@/lib/mongodb';
import Link from 'next/link';
import BlogCommentsSection from './BlogCommentsSection';
import { generateCmsMetadata, getCmsSeo } from '@/lib/cms-fetch';
import '../blog-content.css';

export const revalidate = 120;

/**
 * Wraps un-wrapped HTML tables in a responsive, scrollable container
 * so tables never overflow the viewport on mobile or small screens.
 */
function formatBlogContent(html) {
  if (!html || typeof html !== 'string') return '';
  if (html.includes('blog-table-container')) return html;
  return html.replace(
    /(<table[\s\S]*?<\/table>)/gi,
    '<div class="blog-table-container">$1</div>'
  );
}

// Dynamic SEO Metadata Generator
export async function generateMetadata({ params }) {
  const rawParams = await params;
  const rawSlug = rawParams?.slug;
  const slugPath = Array.isArray(rawSlug) ? rawSlug.join('/') : (rawSlug || '');
  const slug = decodeURIComponent(slugPath).replace(/^\/+|\/+$/g, '');
  const routePath = `/blogs/${slug}`;

  try {
    const cmsSeo = await getCmsSeo(routePath);
    if (cmsSeo) {
      return await generateCmsMetadata(routePath);
    }

    const db = await getDb();
    const blog = await db.collection('cms_blogs').findOne({
      slug: { $in: [slug, `${slug}/`, `/${slug}`, `/${slug}/`] },
      published: true,
    });
    if (blog) {
      return await generateCmsMetadata(routePath, {
        title: blog.metaTitle || `${blog.title} | Crown Excel Blog`,
        description: blog.metaDescription || blog.excerpt || 'Read the article on Crown Excel Blog.',
        keywords: blog.keywords || '',
      });
    }
  } catch (err) {
    console.error('generateMetadata error for blog slug: ' + slug, err);
  }

  return { title: 'Blog Post | Crown Excel' };
}

export default async function BlogDetailsPage({ params }) {
  const rawParams = await params;
  const rawSlug = rawParams?.slug;
  const slugPath = Array.isArray(rawSlug) ? rawSlug.join('/') : (rawSlug || '');
  const slug = decodeURIComponent(slugPath).replace(/^\/+|\/+$/g, '');

  let blog = null;
  let comments = [];
  let settings = null;
  let recentBlogs = [];
  let popularTags = [];
  let categoriesList = [];

  try {
    const db = await getDb();

    // 1. Fetch Blog Data directly from DB
    const blogDoc = await db.collection('cms_blogs').findOne({
      slug: { $in: [slug, `${slug}/`, `/${slug}`, `/${slug}/`] },
      published: true,
    });
    if (blogDoc) {
      blog = {
        ...blogDoc,
        _id: blogDoc._id.toString(),
        createdAt: blogDoc.createdAt ? (blogDoc.createdAt instanceof Date ? blogDoc.createdAt.toISOString() : blogDoc.createdAt) : null,
        updatedAt: blogDoc.updatedAt ? (blogDoc.updatedAt instanceof Date ? blogDoc.updatedAt.toISOString() : blogDoc.updatedAt) : null,
      };
    }

    if (blog?._id) {
      // Fetch approved comments directly from DB
      const commentDocs = await db.collection('cms_blog_comments')
        .find({ blogId: blog._id, approved: true })
        .sort({ createdAt: -1 })
        .toArray();
      comments = commentDocs.map(c => ({
        ...c,
        _id: c._id.toString(),
        createdAt: c.createdAt ? (c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt) : null,
      }));

      // Fetch website settings
      try {
        settings = await db.collection('settings').findOne({ _id: 'website_settings' });
      } catch (e) {
        console.error('Failed to load settings:', e);
      }

      // Fetch all published blogs directly from DB for sidebar widgets
      const allBlogsDocs = await db.collection('cms_blogs')
        .find({ published: true })
        .sort({ createdAt: -1 })
        .toArray();

      const allBlogs = allBlogsDocs.map(b => ({
        ...b,
        _id: b._id.toString(),
        createdAt: b.createdAt ? (b.createdAt instanceof Date ? b.createdAt.toISOString() : b.createdAt) : null,
        updatedAt: b.updatedAt ? (b.updatedAt instanceof Date ? b.updatedAt.toISOString() : b.updatedAt) : null,
      }));

      // Filter out current blog
      recentBlogs = allBlogs.filter(b => b._id !== blog._id).slice(0, 4);

      // Extract most popular tags
      const tagsList = allBlogs.flatMap(b => b.tags || []);
      const tagCounts = tagsList.reduce((acc, t) => {
        acc[t] = (acc[t] || 0) + 1;
        return acc;
      }, {});
      popularTags = Object.keys(tagCounts)
        .sort((a, b) => tagCounts[b] - tagCounts[a])
        .slice(0, 10);

      // Extract categories and counts
      const categoryCounts = allBlogs.reduce((acc, b) => {
        if (b.category) {
          const cat = b.category.trim();
          acc[cat] = (acc[cat] || 0) + 1;
        }
        return acc;
      }, {});
      categoriesList = Object.entries(categoryCounts)
        .sort((a, b) => a[0].localeCompare(b[0]));
    }
  } catch (err) {
    console.error('Failed to fetch blog post details', err);
  }

  const companyPhone = settings?.phone || '+971 4-354 0566';
  const companyEmail = settings?.email || 'contact@crownexcel.com';

  if (!blog) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center pt-32">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-150 max-w-md w-full">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
            ⚠
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
          <p className="text-gray-500 mb-6 text-sm">
            The article you are looking for has been removed, renamed, or is currently drafted.
          </p>
          <Link
            href="/blogs"
            className="inline-block px-5 py-2.5 bg-[#084032] hover:bg-[#0a5c48] text-white font-semibold rounded-lg shadow transition-all duration-200 text-sm"
          >
            ← Back to All Articles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 pt-8 md:pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00a63e] hover:text-[#084032] uppercase tracking-wider transition-colors"
          >
            ← Back to Articles
          </Link>
        </div>

        {/* Main Grid: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Content Column (9/12) */}
          <div className="lg:col-span-9 space-y-10 text-left">
            
            <article className="text-left space-y-6">
              {/* 1. Blog Image at Top */}
              {blog.coverImage && (
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-50 relative border border-gray-100">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* 2. Blog Title directly below the image */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-gray-900 leading-tight">
                {blog.title}
              </h1>

              {/* 3. Publisher Name + Publication Date */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-gray-500 pb-4 border-b border-gray-150">
                <span>By</span>
                <span className="text-[#00a63e] font-semibold">{blog.author || 'Crown Excel'}</span>
                <span className="text-gray-300">•</span>
                <span>
                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }) : 'N/A'}
                </span>
                {blog.readMinutes && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1">⏱ {blog.readMinutes} min read</span>
                  </>
                )}
              </div>

            {/* Excerpt Panel */}
            {blog.excerpt && (
              <div className="p-5 bg-green-50/40 border-l-4 border-[#084032] text-gray-700 rounded-r-xl text-lg italic leading-relaxed text-left mb-8 font-light">
                {blog.excerpt}
              </div>
            )}

            {/* Tags (Inside Article) */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, idx) => (
                  <Link
                    key={idx}
                    href={`/blogs?search=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#084032] hover:bg-[#00a63e] text-white rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#084032] hover:border-[#00a63e] transition-all duration-200 shadow-2xs"
                  >
                    <span className="text-white/60 select-none font-bold">#</span>
                    <span>{tag}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Rich HTML body text */}
            <div 
              className="prose max-w-none prose-green leading-relaxed text-gray-750 space-y-6 text-left select-text"
              style={{
                direction: 'left',
                textAlign: 'left'
              }}
              dangerouslySetInnerHTML={{ __html: formatBlogContent(blog.content) }}
            />
          </article>

          {/* Comments integration */}
          <div className="pt-10 border-t border-gray-100">
            <BlogCommentsSection 
              blogId={blog._id} 
              initialComments={comments} 
            />
          </div>
        </div>

        {/* Sidebar Column (3/12) */}
        <aside className="lg:col-span-3 space-y-8 text-left">
          
          {/* About Crown Excel widget */}
          <div className="text-left space-y-4 pb-8 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Crown Excel</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We are a premier provider of customized IT solutions, networking architectures, system consulting, and hardware provisions for organizations in Dubai and the UAE.
            </p>
            <Link 
              href="/contact-us"
              className="inline-block px-4 py-2.5 bg-[#084032] hover:bg-[#00a63e] text-white font-semibold rounded-lg text-xs shadow-xs transition-all w-full text-center"
            >
              Contact Our Experts
            </Link>
          </div>

          {/* Categories Widget */}
          {categoriesList.length > 0 && (
            <div className="text-left space-y-4 pb-8 border-b border-gray-100">
              <div className="relative pb-2 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Categories</h3>
                <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-[#00a63e] -mb-px" />
              </div>
              <div className="space-y-3 pt-2">
                {categoriesList.map(([cat, count]) => (
                  <Link
                    key={cat}
                    href={`/blogs?category=${encodeURIComponent(cat)}`}
                    className="block text-xs font-bold text-gray-800 hover:text-[#00a63e] transition-colors uppercase tracking-wider"
                  >
                    {cat} <span className="text-gray-400 font-normal">({count})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recent Posts widget */}
          <div className="text-left space-y-4 pb-8 border-b border-gray-100">
            <div className="relative pb-2 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Recent Posts</h3>
              <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-[#00a63e] -mb-px" />
            </div>
            
            {recentBlogs.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No other articles available.</p>
            ) : (
              <div className="space-y-4 pt-2">
                {recentBlogs.map((b) => (
                  <div key={b._id} className="flex gap-3 group">
                    <Link href={`/blogs/${(b.slug || '').replace(/^\/+|\/+$/g, '')}`} className="w-20 aspect-video rounded-md overflow-hidden bg-gray-50 border border-gray-100 shrink-0 relative">
                      {b.coverImage ? (
                        <img 
                          src={b.coverImage} 
                          alt={b.title} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs">👑</div>
                      )}
                    </Link>
                    <div className="min-w-0 space-y-0.5">
                      <Link 
                        href={`/blogs/${(b.slug || '').replace(/^\/+|\/+$/g, '')}`}
                        className="text-xs font-bold text-gray-800 hover:text-[#00a63e] line-clamp-2 leading-tight"
                      >
                        {b.title}
                      </Link>
                      <span className="text-[10px] text-gray-450 block font-semibold">
                        {b.createdAt ? new Date(b.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric'
                        }) : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Help/Support CTA card */}
          <div className="text-left space-y-4 pb-8 border-b border-gray-100">
            <span className="text-[10px] font-bold text-[#084032] uppercase tracking-wider block">
              Direct Help Desk
            </span>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">Need Immediate IT Support?</h3>
            <p className="text-xs text-gray-650 leading-relaxed">
              Contact our support desk for hardware repair, server support, software maintenance, and corporate AMC inquiries.
            </p>
            
            <div className="pt-2 space-y-2 text-xs">
              <a 
                href={`tel:${companyPhone}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#084032] hover:bg-[#00a63e] rounded-lg text-white font-semibold transition-all w-full"
              >
                📞 {companyPhone}
              </a>
              <a 
                href={`mailto:${companyEmail}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-700 font-semibold transition-all bg-white w-full"
              >
                ✉ {companyEmail}
              </a>
            </div>
          </div>

          {/* Popular Tags cloud widget */}
          {popularTags.length > 0 && (
            <div className="text-left space-y-4">
              <div className="relative pb-2 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Popular Tags</h3>
                <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-[#00a63e] -mb-px" />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {popularTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blogs?search=${encodeURIComponent(tag)}`}
                    className="px-2.5 py-1 bg-gray-50 hover:bg-green-50 text-xs font-semibold text-gray-650 hover:text-[#084032] border border-gray-200 hover:border-green-200 rounded-md transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </aside>
      </div>
    </div>
  </main>
  );
}
