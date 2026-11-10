"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function BlogsListClient({ initialData = [], apiBase = '' }) {
  const [blogs, setBlogs] = useState(initialData);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Bulk author management mode state
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAuthor, setBulkAuthor] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);
  const headerCheckboxRef = useRef(null);

  // Filter blogs based on search query
  const filteredBlogs = useMemo(() => {
    if (!search.trim()) return blogs;
    const query = search.toLowerCase();
    return blogs.filter(b => 
      b.title.toLowerCase().includes(query) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(query)) ||
      (b.author && b.author.toLowerCase().includes(query)) ||
      (b.tags && b.tags.some(t => t.toLowerCase().includes(query)))
    );
  }, [blogs, search]);

  // Extract unique authors across all blogs for native autocomplete
  const uniqueAuthors = useMemo(() => {
    const set = new Set();
    blogs.forEach(b => {
      if (b.author && b.author.trim()) set.add(b.author.trim());
    });
    return Array.from(set);
  }, [blogs]);

  // Checkbox selection computations
  const isAllFilteredSelected = useMemo(() => {
    if (filteredBlogs.length === 0) return false;
    return filteredBlogs.every(b => selectedIds.includes(b._id));
  }, [filteredBlogs, selectedIds]);

  const isSomeFilteredSelected = useMemo(() => {
    if (filteredBlogs.length === 0 || isAllFilteredSelected) return false;
    return filteredBlogs.some(b => selectedIds.includes(b._id));
  }, [filteredBlogs, selectedIds, isAllFilteredSelected]);

  // Sync header checkbox indeterminate property
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeFilteredSelected;
    }
  }, [isSomeFilteredSelected]);

  // Enable bulk management mode
  const handleEnterBulkMode = () => {
    setIsBulkMode(true);
  };

  // Exit bulk management mode and reset selection
  const handleExitBulkMode = () => {
    setIsBulkMode(false);
    setSelectedIds([]);
    setBulkAuthor('');
  };

  // Toggle selection for a single blog post
  const handleToggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Toggle select all visible/filtered blog posts
  const handleToggleSelectAll = () => {
    if (isAllFilteredSelected) {
      const filteredIdSet = new Set(filteredBlogs.map(b => b._id));
      setSelectedIds(prev => prev.filter(id => !filteredIdSet.has(id)));
    } else {
      const filteredIdSet = new Set(filteredBlogs.map(b => b._id));
      setSelectedIds(prev => Array.from(new Set([...prev, ...filteredIdSet])));
    }
  };

  // Deselect all blog posts
  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  // Refresh data list
  const refresh = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/blogs?all=true`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      toast.error('Failed to refresh blogs: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Bulk update author for all selected blog posts
  const handleBulkUpdateAuthor = async () => {
    const authorToApply = bulkAuthor.trim();

    if (selectedIds.length === 0) {
      toast.error('Please select at least one blog post.');
      return;
    }

    if (!authorToApply) {
      toast.error('Please enter an author name.');
      return;
    }

    const count = selectedIds.length;
    const confirmMessage = `Update author to "${authorToApply}" for ${count} selected blog post${count > 1 ? 's' : ''}?`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setBulkLoading(true);
      const res = await fetch(`${apiBase}/api/blogs`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: selectedIds,
          author: authorToApply,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update author');

      // Optimistically update Author field on all selected blog posts
      setBlogs(prev =>
        prev.map(blog =>
          selectedIds.includes(blog._id)
            ? { ...blog, author: authorToApply }
            : blog
        )
      );

      toast.success(`Author updated to "${authorToApply}" for ${count} post${count > 1 ? 's' : ''}!`);
      setSelectedIds([]);
      setBulkAuthor('');

      // Refresh to ensure full synchronization with database
      await refresh();
    } catch (err) {
      toast.error('Bulk update failed: ' + err.message);
    } finally {
      setBulkLoading(false);
    }
  };

  // Toggle Publish/Draft state
  const togglePublish = async (id, currentPublished) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/blogs`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, published: !currentPublished }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to toggle publish status');
      await refresh();
    } catch (err) {
      toast.error('Failed to update status: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete Blog Post
  const deleteBlog = async (id, title) => {
    if (!confirm(`Are you sure you want to delete the blog post "${title}"? This will also delete all comments on this post.`)) return;

    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/blogs?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete blog post');
      
      // Clean up selection if this blog was selected
      setSelectedIds(prev => prev.filter(item => item !== id));
      await refresh();
    } catch (err) {
      toast.error('Failed to delete post: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
          <Link
            href="/admin/blogs/add"
            className="px-4 py-2 bg-[#084032] hover:bg-[#00a63e] text-white font-semibold rounded-lg shadow-xs transition-all duration-200 text-sm cursor-pointer"
          >
            Add Blog Post
          </Link>
          <button
            onClick={refresh}
            disabled={loading}
            className={`px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-semibold rounded-lg text-sm shadow-xs transition-all duration-200 cursor-pointer ${
              loading ? 'opacity-60' : ''
            }`}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>

          {/* Bulk Author Management Toggle Button (shown only when NOT in bulk mode) */}
          {!isBulkMode && (
            <button
              type="button"
              onClick={handleEnterBulkMode}
              className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 hover:text-[#084032] font-semibold rounded-lg text-sm shadow-xs transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              title="Enable bulk author selection mode"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Bulk Author Management</span>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs, authors, tags..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none transition-all"
          />
        </div>
      </div>

      {/* Clean, Modern Bulk Author Management Bar (Visible ONLY in Bulk Management Mode) */}
      {isBulkMode && (
        <div className="mb-4 px-4 py-3 bg-gray-50/90 border border-gray-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs transition-all duration-200">
          {/* Left: Selection Counter & Helper */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#084032] text-white">
              <svg className="w-3.5 h-3.5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {selectedIds.length} Selected
            </span>

            <button
              type="button"
              onClick={handleToggleSelectAll}
              className="text-xs text-[#084032] hover:text-[#00a63e] font-semibold hover:underline cursor-pointer"
            >
              {isAllFilteredSelected ? 'Deselect All' : `Select All (${filteredBlogs.length})`}
            </button>

            {selectedIds.length > 0 && !isAllFilteredSelected && (
              <button
                type="button"
                onClick={handleClearSelection}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium hover:underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right: Author Input, Update & Exit */}
          <div className="flex items-center flex-wrap gap-2">
            <div className="relative">
              <input
                id="bulk-author-input"
                type="text"
                list="bulk-author-suggestions"
                value={bulkAuthor}
                onChange={(e) => setBulkAuthor(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleBulkUpdateAuthor();
                  }
                }}
                placeholder="New author name..."
                className="w-48 sm:w-56 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#084032] focus:border-[#084032] outline-none shadow-xs"
              />
              <datalist id="bulk-author-suggestions">
                {uniqueAuthors.map((authorName, idx) => (
                  <option key={idx} value={authorName} />
                ))}
              </datalist>
            </div>

            <button
              type="button"
              onClick={handleBulkUpdateAuthor}
              disabled={bulkLoading || selectedIds.length === 0 || !bulkAuthor.trim()}
              className={`px-4 py-1.5 bg-[#084032] hover:bg-[#00a63e] text-white font-semibold rounded-lg text-sm shadow-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                bulkLoading || selectedIds.length === 0 || !bulkAuthor.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title={selectedIds.length === 0 ? 'Select at least one post' : 'Update Author for selected posts'}
            >
              {bulkLoading ? 'Updating...' : `Update Author${selectedIds.length > 0 ? ` (${selectedIds.length})` : ''}`}
            </button>

            <button
              type="button"
              onClick={handleExitBulkMode}
              className="px-3.5 py-1.5 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 font-medium rounded-lg text-sm transition-all cursor-pointer"
              title="Exit Bulk Mode"
            >
              Exit Bulk Mode
            </button>
          </div>
        </div>
      )}

      {/* Blogs Table */}
      <div className="overflow-x-auto w-full rounded-lg border border-gray-150 shadow-xs">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#084032] text-white text-left font-semibold">
              {/* Checkbox Column (Rendered ONLY in Bulk Management Mode) */}
              {isBulkMode && (
                <th className="w-12 px-3 py-3 text-center align-middle">
                  <input
                    type="checkbox"
                    ref={headerCheckboxRef}
                    checked={isAllFilteredSelected}
                    onChange={handleToggleSelectAll}
                    className="w-4 h-4 rounded text-[#084032] focus:ring-[#084032] border-gray-300 cursor-pointer accent-[#084032]"
                    title={isAllFilteredSelected ? 'Deselect all visible' : 'Select all visible'}
                    aria-label="Select all blog posts"
                  />
                </th>
              )}
              <th className="px-4 py-3">Cover</th>
              <th className="px-4 py-3">Title & Info</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Comments</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan={isBulkMode ? 7 : 6} className="px-4 py-12 text-center text-gray-500 font-medium">
                  {blogs.length === 0 ? 'No blog posts found. Click "Add Blog Post" to get started!' : 'No matching blog posts found.'}
                </td>
              </tr>
            ) : (
              filteredBlogs.map((blog) => {
                const isSelected = selectedIds.includes(blog._id);
                return (
                  <tr
                    key={blog._id}
                    className={`transition-colors ${
                      isBulkMode && isSelected
                        ? 'bg-emerald-50/50'
                        : 'hover:bg-green-50/30'
                    }`}
                  >
                    {/* Checkbox (Rendered ONLY in Bulk Management Mode) */}
                    {isBulkMode && (
                      <td className="w-12 px-3 py-3 text-center align-middle">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(blog._id)}
                          className="w-4 h-4 rounded text-[#084032] focus:ring-[#084032] border-gray-300 cursor-pointer accent-[#084032]"
                          aria-label={`Select blog post ${blog.title}`}
                        />
                      </td>
                    )}

                    {/* Cover */}
                    <td className="px-4 py-3 align-middle">
                      <div className="w-16 h-10 rounded-md border border-gray-100 bg-gray-50 overflow-hidden relative">
                        {blog.coverImage ? (
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-400 font-semibold uppercase">
                            No Img
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title & Info */}
                    <td className="px-4 py-3 align-middle max-w-xs">
                      <div className="font-bold text-gray-800 truncate" title={blog.title}>
                        {blog.title}
                      </div>
                      <div className="truncate">
                        <Link
                          href={`/blogs/${(blog.slug || '').replace(/^\/+|\/+$/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-emerald-700 hover:text-emerald-900 hover:underline font-mono inline-flex items-center gap-1"
                          title="View published article"
                        >
                          /blogs/{(blog.slug || '').replace(/^\/+|\/+$/g, '')}
                          <span className="text-[10px]">↗</span>
                        </Link>
                      </div>
                      {blog.createdAt && (
                        <div className="text-[10px] text-gray-400 mt-0.5">
                          Created: {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </td>

                    {/* Author */}
                    <td className="px-4 py-3 align-middle">
                      <span className="inline-flex items-center gap-1.5 text-gray-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        {blog.author || 'Admin'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 align-middle">
                      <button
                        onClick={() => togglePublish(blog._id, blog.published)}
                        disabled={loading}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                          blog.published
                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
                        }`}
                        title="Click to toggle status"
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    {/* Comments Count */}
                    <td className="px-4 py-3 align-middle">
                      <Link
                        href={`/admin/blogs/comments?blogId=${blog._id}`}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded text-xs font-semibold text-gray-700 inline-flex items-center gap-1 transition-all"
                      >
                        <span>💬</span>
                        <span>{blog.commentCount || 0}</span>
                      </Link>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blogs/${(blog.slug || '').replace(/^\/+|\/+$/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-semibold transition-all inline-flex items-center gap-0.5"
                          title="View live blog article"
                        >
                          View <span className="text-[10px]">↗</span>
                        </Link>
                        <Link
                          href={`/admin/blogs/edit/${blog._id}`}
                          className="px-3 py-1 bg-[#084032] hover:bg-[#00a63e] text-white rounded text-xs font-semibold shadow-xs transition-all"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteBlog(blog._id, blog.title)}
                          disabled={loading}
                          className="px-3 py-1 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded text-xs font-semibold transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
