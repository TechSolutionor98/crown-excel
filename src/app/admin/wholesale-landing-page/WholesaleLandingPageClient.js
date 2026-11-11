'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiExternalLink,
  FiRefreshCw,
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiLayers,
  FiX,
  FiImage,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { SEVEN_CATEGORIES } from '@/lib/wholesaleProductsSeed';

export default function WholesaleLandingPageClient() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  // Form state
  const initialFormState = {
    category: 'Consumer Laptops',
    name: '',
    brand: '',
    description: '',
    particular: '',
    barcode: '',
    image: '',
    imageClassName: 'scale-[1.05]',
    order: 1,
    isActive: true,
  };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch all wholesale products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/wholesale-landing-page');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load products from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Compute category counts and slot order
  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    SEVEN_CATEGORIES.forEach((cat) => {
      counts[cat] = products.filter((p) => p.category === cat).length;
    });
    return counts;
  }, [products]);

  // Map products with category-specific rank to show whether it is in the Live Top 4 slots
  const enrichedProducts = useMemo(() => {
    const rankCounter = {};
    return products.map((prod) => {
      if (!rankCounter[prod.category]) {
        rankCounter[prod.category] = 0;
      }
      rankCounter[prod.category] += 1;
      const rank = rankCounter[prod.category];
      const isLive = rank <= 4 && prod.isActive !== false;
      return {
        ...prod,
        categoryRank: rank,
        isLiveSlot: isLive,
      };
    });
  }, [products]);

  // Filtered products by active category & search query
  const displayedProducts = useMemo(() => {
    return enrichedProducts.filter((p) => {
      const matchesCategory =
        activeCategory === 'All' || p.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.name?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.barcode?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [enrichedProducts, activeCategory, searchQuery]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingProduct(null);
    const defaultCat =
      activeCategory !== 'All' ? activeCategory : 'Consumer Laptops';
    const nextOrder =
      products.filter((p) => p.category === defaultCat).length + 1;

    setFormData({
      ...initialFormState,
      category: defaultCat,
      order: nextOrder,
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      category: product.category || 'Consumer Laptops',
      name: product.name || '',
      brand: product.brand || '',
      description: product.description || '',
      particular: product.particular || '',
      barcode: product.barcode || '',
      image: product.image || '',
      imageClassName: product.imageClassName || 'scale-[1.05]',
      order: product.order || 1,
      isActive: product.isActive !== undefined ? product.isActive : true,
    });
    setIsModalOpen(true);
  };

  // Handle Image Upload
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/admin/wholesale-landing-page/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to upload image');
      }

      const json = await res.json();
      setFormData((prev) => ({ ...prev, image: json.url }));
      toast.success('Image uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle Form Submit (Add or Edit)
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Product Name is required');
      return;
    }
    if (!formData.category) {
      toast.error('Category is required');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...formData,
        particular:
          formData.particular.trim() ||
          `${formData.name.trim()} (${formData.description.trim()})`,
      };

      if (editingProduct) {
        // PUT update
        const res = await fetch('/api/admin/wholesale-landing-page', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: editingProduct._id, ...payload }),
        });
        if (!res.ok) throw new Error('Failed to update product');
        toast.success('Product updated successfully!');
      } else {
        // POST create
        const res = await fetch('/api/admin/wholesale-landing-page', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to create product');
        toast.success('Product added successfully!');
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  // Move Product Up/Down in sequence within category
  const handleReorder = async (product, direction) => {
    const categoryProds = products.filter(
      (p) => p.category === product.category
    );
    const currentIndex = categoryProds.findIndex(
      (p) => p._id === product._id
    );
    if (currentIndex === -1) return;

    const targetIndex =
      direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= categoryProds.length) return;

    const targetProduct = categoryProds[targetIndex];

    try {
      // Swap order numbers
      await Promise.all([
        fetch('/api/admin/wholesale-landing-page', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _id: product._id,
            order: targetIndex + 1,
          }),
        }),
        fetch('/api/admin/wholesale-landing-page', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _id: targetProduct._id,
            order: currentIndex + 1,
          }),
        }),
      ]);

      toast.success('Product reordered!');
      await fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error('Failed to reorder products');
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!deleteProduct) return;
    try {
      setSaving(true);
      const res = await fetch(
        `/api/admin/wholesale-landing-page?id=${deleteProduct._id}`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw new Error('Failed to delete product');
      toast.success('Product deleted successfully!');
      setDeleteProduct(null);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to delete product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#147A5F]" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 font-montserrat">
              Wholesale Landing Page Products
            </h1>
          </div>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Manage product cards displayed on the{' '}
            <span className="font-semibold text-[#147A5F]">
              IT Hardware Wholesale
            </span>{' '}
            landing page by category.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <Link
            href="/it-hardware-wholesale-supplier-in-dubai-or-uae"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
          >
            <FiExternalLink className="w-3.5 h-3.5 text-gray-500" />
            <span>View Landing Page</span>
          </Link>

          <button
            type="button"
            onClick={fetchProducts}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors cursor-pointer"
            title="Refresh Products"
          >
            <FiRefreshCw
              className={`w-3.5 h-3.5 text-gray-500 ${
                loading ? 'animate-spin' : ''
              }`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#084032] hover:bg-[#0c5946] rounded-lg transition-all shadow-xs cursor-pointer"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* 2. Live Slot Info Box */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 px-4 flex items-start gap-3 text-emerald-900 text-xs sm:text-sm">
        <FiCheckCircle className="w-5 h-5 text-[#147A5F] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <p className="font-semibold text-emerald-950">
            Client-Side 4-Card Display Rule:
          </p>
          <p className="text-emerald-800 text-xs">
            On the client-side wholesale page, each category displays exactly{' '}
            <strong className="underline">4 product cards</strong> at a time.
            The top 4 active products in each category (marked with{' '}
            <span className="font-bold text-[#084032]">Live (Slot 1–4)</span>)
            will be visible to customers. Any additional products will be held as
            backup/reserve cards.
          </p>
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveCategory('All')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeCategory === 'All'
              ? 'bg-[#084032] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <span>All Categories</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeCategory === 'All'
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {categoryCounts.All || 0}
          </span>
        </button>

        {SEVEN_CATEGORIES.map((cat) => {
          const count = categoryCounts[cat] || 0;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#084032] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Search and Table Controls */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products, tags, brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#147A5F] focus:border-[#147A5F]"
            />
          </div>

          <div className="text-xs text-gray-500 w-full sm:w-auto text-left sm:text-right">
            Showing <strong className="text-gray-900">{displayedProducts.length}</strong> of{' '}
            <strong className="text-gray-900">{products.length}</strong> products
          </div>
        </div>

        {/* 5. Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#084032] text-white font-semibold">
                <th className="py-3 px-3.5 w-14 text-center">Slot</th>
                <th className="py-3 px-3.5 w-16">Image</th>
                <th className="py-3 px-3.5">Product Title & Brand</th>
                <th className="py-3 px-3.5">Category</th>
                <th className="py-3 px-3.5">Buttons / Tags</th>
                <th className="py-3 px-3.5 w-28 text-center">Website Status</th>
                <th className="py-3 px-3.5 w-28 text-center">Order</th>
                <th className="py-3 px-3.5 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    <FiRefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#147A5F]" />
                    <span>Loading products from database...</span>
                  </td>
                </tr>
              ) : displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    <FiLayers className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="font-semibold text-gray-600">
                      No products found
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {searchQuery
                        ? 'Try adjusting your search criteria'
                        : 'Click "Add Product" above to create one'}
                    </p>
                  </td>
                </tr>
              ) : (
                displayedProducts.map((product) => {
                  return (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      {/* Slot index */}
                      <td className="py-3 px-3.5 text-center font-bold text-gray-600">
                        #{product.categoryRank}
                      </td>

                      {/* Image Thumbnail */}
                      <td className="py-3 px-3.5">
                        <div className="w-12 h-12 relative bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-0.5">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <FiImage className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </td>

                      {/* Product Name & Brand */}
                      <td className="py-3 px-3.5 max-w-xs">
                        <div className="font-bold text-gray-900 text-sm font-montserrat">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                          {product.brand && (
                            <span className="font-semibold text-[#147A5F]">
                              {product.brand}
                            </span>
                          )}
                          {product.barcode && (
                            <span className="font-mono text-gray-400">
                              SKU: {product.barcode}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3.5">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-700 whitespace-nowrap">
                          {product.category}
                        </span>
                      </td>

                      {/* Buttons / Tags */}
                      <td className="py-3 px-3.5 max-w-sm">
                        <p className="text-[11.5px] text-gray-600 line-clamp-2 leading-relaxed">
                          {product.description || (
                            <span className="text-gray-300 italic">None</span>
                          )}
                        </p>
                      </td>

                      {/* Website Status Badge */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        {product.isLiveSlot ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10.5px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            Live (Slot {product.categoryRank}/4)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10.5px] font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Reserve (Slot {product.categoryRank})
                          </span>
                        )}
                      </td>

                      {/* Order Controls (Move Up / Down) */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1 border border-gray-200 rounded-md bg-white p-0.5">
                          <button
                            type="button"
                            onClick={() => handleReorder(product, 'up')}
                            disabled={product.categoryRank === 1}
                            className="p-1 hover:bg-gray-100 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                            title="Move Up"
                          >
                            <FiArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-1 text-[11px] font-mono text-gray-500">
                            {product.categoryRank}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleReorder(product, 'down')}
                            disabled={
                              product.categoryRank ===
                              (categoryCounts[product.category] || 1)
                            }
                            className="p-1 hover:bg-gray-100 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                            title="Move Down"
                          >
                            <FiArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(product)}
                            className="p-1.5 text-gray-600 hover:text-[#084032] hover:bg-emerald-50 border border-gray-200 rounded-md transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteProduct(product)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 border border-gray-200 rounded-md transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
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

      {/* 6. Add / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-xl w-full p-6 my-8 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 font-montserrat">
                {editingProduct ? 'Edit Product Card' : 'Add New Product Card'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-4 space-y-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#147A5F]"
                >
                  {SEVEN_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Name & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Product Title / Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HP Printers, IdeaPad & Yoga"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#147A5F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="HP, Lenovo, etc."
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#147A5F]"
                  />
                </div>
              </div>

              {/* Buttons / Tags */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Buttons / Tags (Pipe-Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. DeskJet | Smart Tank | OfficeJet | LaserJet"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#147A5F]"
                />
                <p className="text-[10.5px] text-gray-400 mt-1">
                  Shown directly below the product name on the card. Separate tags using the pipe character (<code className="font-mono">|</code>).
                </p>
              </div>

              {/* Image Upload & URL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Product Image
                </label>

                <div className="flex items-center gap-3">
                  {/* Thumbnail Preview */}
                  <div className="w-16 h-16 relative bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-1">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <FiImage className="w-6 h-6 text-gray-300" />
                    )}
                  </div>

                  {/* Upload button & file input */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
                      >
                        <FiUploadCloud className="w-3.5 h-3.5" />
                        <span>
                          {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        </span>
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Or enter image URL / static path"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full px-2.5 py-1 text-xs border border-gray-200 rounded-md bg-gray-50 focus:bg-white font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Barcode / SKU & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Barcode / Model SKU (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CAC-200, 83KR0047US"
                    value={formData.barcode}
                    onChange={(e) =>
                      setFormData({ ...formData, barcode: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#147A5F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#147A5F]"
                  />
                </div>
              </div>

              {/* Inquiry Particular (Modal Text) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Inquiry Modal Text (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Auto-generated if left blank"
                  value={formData.particular}
                  onChange={(e) =>
                    setFormData({ ...formData, particular: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#147A5F]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#084032] hover:bg-[#0c5946] rounded-lg transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {saving
                    ? 'Saving...'
                    : editingProduct
                    ? 'Save Changes'
                    : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Delete Confirmation Modal */}
      {deleteProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-sm w-full p-6 animate-in fade-in duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <FiTrash2 className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-gray-900 text-center font-montserrat">
              Delete Product Card?
            </h3>
            <p className="text-xs text-gray-500 text-center mt-1">
              Are you sure you want to delete{' '}
              <strong className="text-gray-900">{deleteProduct.name}</strong>{' '}
              from <span className="font-semibold">{deleteProduct.category}</span>? This action cannot be undone.
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteProduct(null)}
                disabled={saving}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={saving}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow-xs cursor-pointer"
              >
                {saving ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

