'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ContactFormPopup from '@/Components/ContactFormPopup/ContactFormPopup';
import { categories, categoryPages, productsByCategory } from './catalogData';

import { safeRender } from '@/lib/safe-html';

const AllProducts = ({ cmsCatalog, cmsData }) => {
    const catalog = cmsCatalog || cmsData;
    const [active, setActive] = useState(categories[0].slug);
    const [showContactPopup, setShowContactPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openProductInquiryModal = (product) => {
        setSelectedProduct(product);
        setShowContactPopup(true);
    };

    // Selected products mapping from CMS admin panel
    const selectedProductsMap = catalog?.fields?.selected_products?.value || 
                                catalog?.fields?.selected_products || {};

    const categoryProducts = productsByCategory[active] || [];
    const selectedTitles = selectedProductsMap[active] || 
        ((active === 'phones' || active === 'cctv') ? selectedProductsMap['phones-cctv'] : null);

    let activeProducts = [];
    if (Array.isArray(selectedTitles) && selectedTitles.length > 0) {
        // Preserve admin's chosen selection and order, max 4 cards
        const matched = selectedTitles
            .map(title => categoryProducts.find(p => p.title === title))
            .filter(Boolean);
        activeProducts = matched.length > 0 ? matched.slice(0, 4) : categoryProducts.slice(0, 4);
    } else {
        // Fall back to default first 4 products when no custom selection
        activeProducts = categoryProducts.slice(0, 4);
    }

    const activeCategory = categories.find((c) => c.slug === active);
    const activeCategoryPage = categoryPages[active] || '/products/laptops';
    const sectionHeading = catalog?.fields?.heading || catalog?.fields?.heading_2 || catalog?.heading || 'Our Product Catalog';

    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section id="product-catalog" className="product-catalog-section relative w-full max-w-[1536px] mx-auto bg-[#F9FAFB] py-8 font-montserrat overflow-hidden">
                {/* Filter Buttons Header - Exactly as existing design */}
                <div className="links-tab py-6 text-center">
                <h2 className="text-2xl font-bold text-green-900 mb-4">{safeRender(sectionHeading, 'Our Product Catalog')}</h2>
                <div className="flex flex-wrap justify-center gap-2 px-1">
                    {categories.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setActive(item.slug)}
                            aria-pressed={active === item.slug}
                            className={`px-4 py-2 border border-green-900 rounded-lg text-sm font-medium transition text-black hover:text-white ${
                                active === item.slug
                                    ? 'bg-green-900 text-white'
                                    : 'bg-[#defaca] text-black hover:bg-green-900'
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
                    {activeProducts.map((product, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-white p-3.5 sm:p-4 rounded-2xl border border-[#147A5F] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                        >
                            {/* Product Image on Pure White Background */}
                            <div className="relative w-full h-44 sm:h-48 bg-white flex items-center justify-center overflow-hidden rounded-xl mb-3">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content container */}
                            <div className="w-full flex flex-col flex-grow justify-between">
                                <div className="w-full text-center">
                                    {product.brand && (
                                        <span className="text-[11px] font-semibold tracking-wider uppercase text-[#147A5F] bg-[#defaca] px-2.5 py-0.5 rounded-full inline-block mb-1.5 font-montserrat">
                                            {product.brand}
                                        </span>
                                    )}
                                    <h3
                                        className="w-full font-montserrat font-bold text-[14px] sm:text-[15px] text-[#171717] leading-tight min-h-[38px] mb-1.5 flex items-center justify-center text-center"
                                        title={product.title}
                                    >
                                        <span className="line-clamp-2">{product.title}</span>
                                    </h3>
                                    <p className="w-full text-xs text-gray-500 font-montserrat line-clamp-2 mb-3 leading-relaxed text-center">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Action Buttons: Inquire Now & WhatsApp Inline Side-by-Side */}
                                <div className="w-full grid grid-cols-2 gap-2 mt-auto pt-2 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => openProductInquiryModal(product)}
                                        className="w-full py-2 px-1.5 bg-[#147A5F] hover:bg-[#0f5f4a] text-white text-[11px] sm:text-xs font-bold font-montserrat tracking-wide uppercase flex items-center justify-center gap-1 transition-all rounded-lg text-center cursor-pointer"
                                    >
                                        <span>Inquire</span>
                                        <ArrowRight className="w-3 h-3 shrink-0" />
                                    </button>
                                    <a
                                        href={`https://api.whatsapp.com/send/?phone=971543090680&text=${encodeURIComponent(
                                            `Hello Crown Excel, I am inquiring about ${product.title}.`
                                        )}&type=phone_number&app_absent=0`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-2 px-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] sm:text-xs font-bold font-montserrat tracking-wide uppercase flex items-center justify-center gap-1 transition-all rounded-lg text-center"
                                    >
                                        <FaWhatsapp className="w-3.5 h-3.5 shrink-0" />
                                        <span>WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Explore More Category Page Link */}
                <div className="flex justify-center mt-10">
                    <Link
                        href={activeCategoryPage}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#147A5F] hover:bg-[#084032] text-white text-sm font-semibold font-montserrat transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <span>View All {activeCategory?.name} Products</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Inquiry Form Modal */}
            <ContactFormPopup
                isOpen={showContactPopup}
                onClose={() => {
                    setShowContactPopup(false);
                    setSelectedProduct(null);
                }}
                defaultSubject="Wholesale Inquiries"
                showProductFields={true}
                initialProductName={selectedProduct?.title || selectedProduct?.name || ''}
                initialProductBarcode={selectedProduct?.barcode || selectedProduct?.brand || 'N/A'}
                isProductReadOnly={Boolean(selectedProduct)}
                requireCaptcha={false}
            />
            </section>
        </div>
    );
};

export default AllProducts;
