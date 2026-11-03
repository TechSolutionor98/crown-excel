import React from 'react';
import { getDb } from '@/lib/mongodb';
import BlogListingClient from './BlogListingClient';
import { generateCmsMetadata } from '@/lib/cms-fetch';
import './blog-content.css';

export async function generateMetadata() {
  return await generateCmsMetadata('/blogs', {
    title: 'Blog - Insights & Tech Solutions | Crown Excel',
    description: 'Read the latest updates, tutorials, and expert analysis on IT infrastructure, hardware, cloud computing, and Excel automation.',
  });
}

export const revalidate = 120;

export default async function ClientBlogsPage() {
  let blogs = [];

  try {
    const db = await getDb();
    const docs = await db.collection('cms_blogs').find({ published: true }).sort({ createdAt: -1 }).toArray();
    blogs = docs.map(d => ({
      ...d,
      _id: d._id.toString(),
      createdAt: d.createdAt ? (d.createdAt instanceof Date ? d.createdAt.toISOString() : d.createdAt) : null,
      updatedAt: d.updatedAt ? (d.updatedAt instanceof Date ? d.updatedAt.toISOString() : d.updatedAt) : null,
    }));
  } catch (err) {
    console.error('Failed to fetch public blogs list', err);
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-gray-800">
      {/* Premium Hero Banner */}
      <div className="w-full bg-[#FFFFFF] overflow-hidden">
        <section className="relative w-full max-w-[1536px] mx-auto bg-[#0F5B42] text-white pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-20 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto text-center relative z-10 space-y-4">
            <span className="inline-block px-4 py-1.5 bg-[#4ade80]/15 border border-[#4ade80]/30 text-[#4ade80] rounded-full text-xs font-bold uppercase tracking-wider">
              Our Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
              The Crown Excel Blog
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Expert opinions, technical guides, and business insights on IT hardware, infrastructure, cloud systems, and technology solutions.
            </p>
          </div>
        </section>
      </div>

      {/* Real-time Client-side Blog Listing & Sidebar Widgets */}
      <BlogListingClient initialBlogs={blogs} />
    </main>
  );
}
