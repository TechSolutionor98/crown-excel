'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ContactFormPopup from '@/Components/ContactFormPopup/ContactFormPopup';

// Page Sections
import LaptopHeroSection from './_components/LaptopHeroSection';
import LaptopExperienceSection from './_components/LaptopExperienceSection';
import LaptopCategoriesSection from './_components/LaptopCategoriesSection';
import LaptopProductsGridSection from './_components/LaptopProductsGridSection';
import LaptopSolutionsSection from './_components/LaptopSolutionsSection';
import LaptopOperationsSection from './_components/LaptopOperationsSection';
import LaptopInquirySection from './_components/LaptopInquirySection';

export default function LaptopPageClient({ cmsContent }) {
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);

  const sections = cmsContent?.sections || {};
  const heroSection = sections.laptopherosection || sections.hero;
  const experienceSection = sections.laptopexperiencesection;
  const categoriesSection = sections.laptopcategoriessection;
  const productsGridSection = sections.laptopproductsgridsection;
  const solutionsSection = sections.laptopsolutionssection;
  const operationsSection = sections.laptopoperationssection;
  const inquirySection = sections.laptopinquirysection;

  const WHATSAPP_PHONE = '971543090680';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const ua = navigator.userAgent || '';
        setIsMobile(
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
          window.innerWidth < 768
        );
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const openGeneralInquiryModal = useCallback(() => {
    setSelectedProduct(null);
    setShowContactPopup(true);
  }, []);

  const openProductInquiryModal = useCallback((product) => {
    setSelectedProduct(product);
    setShowContactPopup(true);
  }, []);

  const getWhatsAppUrl = useCallback((message = '') => {
    const encoded = message ? encodeURIComponent(message) : '';
    const base = isMobile ? 'https://api.whatsapp.com/send/' : 'https://web.whatsapp.com/send/';
    return `${base}?phone=${WHATSAPP_PHONE}${encoded ? `&text=${encoded}` : ''}&type=phone_number&app_absent=0`;
  }, [isMobile]);

  const handleWhatsAppRedirect = useCallback((e, message = '') => {
    const encoded = message ? encodeURIComponent(message) : '';
    const targetUrl = isMobile
      ? `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}${encoded ? `&text=${encoded}` : ''}&type=phone_number&app_absent=0`
      : `https://web.whatsapp.com/send/?phone=${WHATSAPP_PHONE}${encoded ? `&text=${encoded}` : ''}&type=phone_number&app_absent=0`;

    if (e && e.currentTarget) {
      e.currentTarget.href = targetUrl;
    }

    if (typeof window !== 'undefined') {
      const win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (win) {
        if (e && e.preventDefault) e.preventDefault();
      }
    }
  }, [isMobile]);

  const scrollToSection = useCallback((sectionId) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleSelectCategory = useCallback((categoryName) => {
    setActiveCategory(categoryName);
    scrollToSection('laptop-products-grid');
  }, [scrollToSection]);

  return (
    <main className="bg-white text-[#171717] selection:bg-[#147A5F] selection:text-white">
      {/* 1. Laptop Hero Section */}
      <LaptopHeroSection
        cmsData={heroSection}
        openGeneralInquiryModal={openGeneralInquiryModal}
        getWhatsAppUrl={getWhatsAppUrl}
        handleWhatsAppRedirect={handleWhatsAppRedirect}
        scrollToSection={scrollToSection}
      />

      {/* 2. Laptop Business Experience & Expertise */}
      <LaptopExperienceSection cmsData={experienceSection} />

      {/* 3. Laptop Categories */}
      <LaptopCategoriesSection
        cmsData={categoriesSection}
        onSelectCategory={handleSelectCategory}
      />

      {/* 4. Laptop Product Cards */}
      <LaptopProductsGridSection
        cmsData={productsGridSection}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        openProductInquiryModal={openProductInquiryModal}
        getWhatsAppUrl={getWhatsAppUrl}
        handleWhatsAppRedirect={handleWhatsAppRedirect}
      />

      {/* 5. Wholesale, Retail & B2B Solutions */}
      <LaptopSolutionsSection
        cmsData={solutionsSection}
        openGeneralInquiryModal={openGeneralInquiryModal}
      />

      {/* 6. Laptop Handling, Delivery & Support Expertise */}
      <LaptopOperationsSection cmsData={operationsSection} />

      {/* 7. Final Inquiry Section */}
      <LaptopInquirySection
        cmsData={inquirySection}
        openGeneralInquiryModal={openGeneralInquiryModal}
        getWhatsAppUrl={getWhatsAppUrl}
        handleWhatsAppRedirect={handleWhatsAppRedirect}
      />

      {/* Interactive Contact & Inquiry Modal */}
      <ContactFormPopup
        isOpen={showContactPopup}
        onClose={() => {
          setShowContactPopup(false);
          setSelectedProduct(null);
        }}
        defaultSubject="Wholesale Inquiries"
        showProductFields={true}
        initialProductName={selectedProduct?.name || ''}
        initialProductBarcode={selectedProduct?.barcode || ''}
        isProductReadOnly={Boolean(selectedProduct)}
        requireCaptcha={false}
      />
    </main>
  );
}
