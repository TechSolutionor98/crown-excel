"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Helper to extract clean plain-text description for each blog post
function getBlogDescription(blog) {
  if (blog?.excerpt && typeof blog.excerpt === 'string' && blog.excerpt.trim()) {
    return blog.excerpt.trim();
  }

  if (blog?.content && typeof blog.content === 'string') {
    return blog.content
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&apos;/gi, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  return '';
}

export default function BlogListingClient({ initialBlogs = [] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // Sync with URL query parameters on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      const searchParam = params.get('search');
      if (catParam) setCategory(catParam);
      if (searchParam) setSearch(searchParam);
    }
  }, []);

  // Update URL search parameters silently when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (search) params.set('search', search);

      const newRelativePathQuery = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.pushState(null, '', newRelativePathQuery);
    }
  }, [search, category]);

  // Filter blogs list in real-time
  const filteredBlogs = initialBlogs.filter((blog) => {
    if (category) {
      if ((blog.category || '').trim().toLowerCase() !== category.trim().toLowerCase()) {
        return false;
      }
    }
    if (search) {
      const q = search.trim().toLowerCase();
      const titleMatch = (blog.title || '').toLowerCase().includes(q);
      const excerptMatch = (blog.excerpt || '').toLowerCase().includes(q);
      const descMatch = getBlogDescription(blog).toLowerCase().includes(q);
      const authorMatch = (blog.author || '').toLowerCase().includes(q);
      const tagsMatch = Array.isArray(blog.tags) && blog.tags.some(t => t.toLowerCase().includes(q));
      if (!titleMatch && !excerptMatch && !descMatch && !authorMatch && !tagsMatch) {
        return false;
      }
    }
    return true;
  });

  // Calculate dynamic categories and counts from complete list of blogs
  const categoryCounts = initialBlogs.reduce((acc, b) => {
    if (b.category) {
      const cat = b.category.trim();
      acc[cat] = (acc[cat] || 0) + 1;
    }
    return acc;
  }, {});
  const categoriesList = Object.entries(categoryCounts).sort((a, b) => a[0].localeCompare(b[0]));

  // Calculate recent posts (unfiltered list of top 4 blogs)
  const recentPosts = initialBlogs.slice(0, 4);

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section className="relative w-full max-w-[1536px] mx-auto bg-[#F9FAFB] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* Main Listing Column (9/12) */}
      <div className="lg:col-span-9 space-y-8">
        
        {/* Search Input Bar & Active Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-gray-200 pb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Articles & Insights</h2>
            {(category || search) && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">
                  Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
                  {category ? ` in "${category}"` : ''}
                  {search ? ` matching "${search}"` : ''}
                </span>
                <button
                  type="button"
                  onClick={() => { setCategory(''); setSearch(''); }}
                  className="text-xs text-[#084032] font-semibold hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
          
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by title, topic, or tag..."
              className="w-full pl-9 pr-8 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#084032] focus:border-[#084032] outline-none transition-all bg-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black font-bold text-sm cursor-pointer"
                title="Clear search"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Blog Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto p-8">
            <div className="w-16 h-16 bg-green-50 text-[#084032] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              📰
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Articles Found</h2>
            <p className="text-gray-500 max-w-md mx-auto px-4 text-sm mb-6">
              {search || category 
                ? "We couldn't find any articles matching your search query or selected category." 
                : "No published blog articles yet. Check back soon for the latest updates and tech guides!"}
            </p>
            {(search || category) && (
              <button
                type="button"
                onClick={() => { setCategory(''); setSearch(''); }}
                className="px-4 py-2 bg-[#084032] hover:bg-[#0b5c48] text-white rounded-lg text-xs font-semibold shadow transition-all cursor-pointer"
              >
                Show All Articles
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredBlogs.map((blog) => {
              const description = getBlogDescription(blog);
              return (
                <article
                  key={blog._id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col hover:shadow-lg transition-all duration-300 group"
                >
                  {/* 1. Top Image */}
                  <Link href={`/blogs/${(blog.slug || '').replace(/^\/+|\/+$/g, '')}`} className="block relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full bg-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#084032]/10 to-[#0b5c48]/20 flex items-center justify-center text-5xl">
                        👑
                      </div>
                    )}
                  </Link>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">


                      {/* 3. Blog Title */}
                      <h2 className="text-xl sm:text-[1.28rem] font-bold font-montserrat tracking-tight text-gray-900 group-hover:text-[#00a63e] hover:text-[#00a63e] leading-[1.35] line-clamp-2 transition-colors duration-200">
                        <Link href={`/blogs/${(blog.slug || '').replace(/^\/+|\/+$/g, '')}`}>
                          {blog.title}
                        </Link>
                      </h2>

                      {/* 4. Publisher Name + Publication Date */}
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <span className="text-[#00a63e] font-semibold">{blog.author || 'Crown Excel'}</span>
                        <span className="text-gray-300">•</span>
                        <span>
                          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          }) : 'N/A'}
                        </span>
                      </div>

                      {/* 5. Blog Description (show only 3 lines) */}
                      {description && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {description}
                        </p>
                      )}
                    </div>

                    {/* 6. Read More button/link */}
                    <div className="pt-2">
                      <Link
                        href={`/blogs/${(blog.slug || '').replace(/^\/+|\/+$/g, '')}`}
                        className="text-[#00a63e] hover:text-[#084032] font-semibold text-sm inline-flex items-center gap-1.5 transition-colors group/link"
                      >
                        Read More <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Sidebar Column (3/12) */}
      <aside className="lg:col-span-3 lg:sticky lg:top-10 space-y-8 text-left">
        
        {/* Categories widget in sidebar */}
        {categoriesList.length > 0 && (
          <div className="text-left space-y-4 pb-8 border-b border-gray-100">
            <div className="relative pb-2 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Categories</h3>
              <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-[#00a63e] -mb-px" />
            </div>
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setCategory('')}
                className={`block text-xs font-bold text-left uppercase tracking-wider transition-colors w-full cursor-pointer ${
                  !category ? 'text-[#00a63e]' : 'text-gray-800 hover:text-[#00a63e]'
                }`}
              >
                All Posts <span className="text-gray-400 font-normal">({initialBlogs.length})</span>
              </button>
              {categoriesList.map(([cat, count]) => {
                const isActive = category?.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(isActive ? '' : cat)}
                    className={`block text-xs font-bold text-left uppercase tracking-wider transition-colors w-full cursor-pointer ${
                      isActive ? 'text-[#00a63e]' : 'text-gray-800 hover:text-[#00a63e]'
                    }`}
                  >
                    {cat} <span className="text-gray-400 font-normal">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Posts widget */}
        <div className="text-left space-y-4 pb-8 border-b border-gray-100">
          <div className="relative pb-2 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Recent Posts</h3>
            <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-[#00a63e] -mb-px" />
          </div>
          
          {recentPosts.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No articles available.</p>
          ) : (
            <div className="space-y-4 pt-2">
              {recentPosts.map((b) => (
                <div key={b._id} className="flex gap-3 group">
                  <Link href={`/blogs/${(b.slug || '').replace(/^\/+|\/+$/g, '')}`} className="w-20 aspect-[16/10] rounded-md overflow-hidden bg-gray-50 border border-gray-100 shrink-0 relative">
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
                      className="text-xs font-bold font-montserrat tracking-tight text-gray-800 hover:text-[#00a63e] line-clamp-2 leading-snug transition-colors duration-200"
                    >
                      {b.title}
                    </Link>
                    <span className="text-[10px] text-gray-450 block font-semibold" suppressHydrationWarning>
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', {
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
              href="tel:+971 4-354 0566"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#084032] hover:bg-[#00a63e] rounded-lg text-white font-semibold transition-all w-full"
            >
              📞 +971 4-354 0566
            </a>
            <a 
              href="mailto:contact@crownexcel.com"
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-700 font-semibold transition-all bg-white w-full"
            >
              ✉ contact@crownexcel.com
            </a>
          </div>
        </div>

      </aside>
    </div>
  </section>
</div>
  );
}
