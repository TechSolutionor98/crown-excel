'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ContactFormPopup from '@/Components/ContactFormPopup/ContactFormPopup';

import WholesaleHeroSection from './_components/WholesaleHeroSection';
import WholesaleCategoriesSection from './_components/WholesaleCategoriesSection';
import WholesaleProductsSection from './_components/WholesaleProductsSection';
import WholesaleWhyCrownExcelSection from './_components/WholesaleWhyCrownExcelSection';
import WholesaleWorldwideAreasSection from './_components/WholesaleWorldwideAreasSection';

export default function WholesaleClientPage({ cmsContent }) {
  const sections = cmsContent?.sections || {};
  const heroSection = sections.wholesaleherosection || sections.hero;

  const [showContactPopup, setShowContactPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openGeneralInquiryModal = () => {
    setSelectedProduct(null);
    setShowContactPopup(true);
  };

  const openProductInquiryModal = (product) => {
    setSelectedProduct(product);
    setShowContactPopup(true);
  };

  const WHATSAPP_PHONE = '971543090680';
  const DEFAULT_WHATSAPP_MESSAGE =
    "Hello Crown Excel, I’m interested in purchasing laptops wholesale. Could you please share your available models and wholesale prices?";
  const DEFAULT_TELEGRAM_URL = 'https://t.me/crownexcelae';
  const telegramChannelUrl = heroSection?.fields?.telegram_url?.value || DEFAULT_TELEGRAM_URL;

  const [isMobile, setIsMobile] = useState(false);

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

  const getWhatsAppUrl = (message = DEFAULT_WHATSAPP_MESSAGE) => {
    const textToSend = message || DEFAULT_WHATSAPP_MESSAGE;
    const encoded = encodeURIComponent(textToSend);
    const base = isMobile ? 'https://api.whatsapp.com/send/' : 'https://web.whatsapp.com/send/';
    return `${base}?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`;
  };

  const handleWhatsAppRedirect = (e, message = DEFAULT_WHATSAPP_MESSAGE) => {
    const textToSend = message || DEFAULT_WHATSAPP_MESSAGE;
    const encoded = encodeURIComponent(textToSend);
    const targetUrl = isMobile
      ? `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`
      : `https://web.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`;

    if (e && e.currentTarget) {
      e.currentTarget.href = targetUrl;
    }

    if (typeof window !== 'undefined') {
      const win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (win) {
        if (e && e.preventDefault) e.preventDefault();
      }
    }
  };

  // Hero Typewriter Animation matching exact 7 categories
  const heroCategories = useMemo(() => [
    { name: 'Consumer Laptops' },
    { name: 'Gaming Laptops' },
    { name: 'Business Laptops' },
    { name: 'All-In-One' },
    { name: 'Print & Scan' },
    { name: 'Servers & Workstation' },
    { name: 'Accessories (Crownyx)' },
  ], []);

  const [activeHeroCatIndex, setActiveHeroCatIndex] = useState(0);
  const [typedHeroText, setTypedHeroText] = useState('Consumer Laptops');
  const [isHeroDeleting, setIsHeroDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = setInterval(() => {
        setActiveHeroCatIndex((prev) => (prev + 1) % heroCategories.length);
      }, 3500);
      setTypedHeroText(heroCategories[activeHeroCatIndex].name);
      return () => clearInterval(timer);
    }

    const currentTarget = heroCategories[activeHeroCatIndex].name;
    let timer;

    if (!isHeroDeleting) {
      if (typedHeroText.length < currentTarget.length) {
        timer = setTimeout(() => {
          setTypedHeroText(currentTarget.slice(0, typedHeroText.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => {
          setIsHeroDeleting(true);
        }, 2200);
      }
    } else {
      if (typedHeroText.length > 0) {
        timer = setTimeout(() => {
          setTypedHeroText(currentTarget.slice(0, typedHeroText.length - 1));
        }, 40);
      } else {
        setIsHeroDeleting(false);
        setActiveHeroCatIndex((prev) => (prev + 1) % heroCategories.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedHeroText, isHeroDeleting, activeHeroCatIndex, heroCategories, prefersReducedMotion]);

  return (
    <div className="bg-[#FDFDFE] text-[#2D2D2D] selection:bg-[#147A5F] selection:text-white">
      {/* 1. Hero Section */}
      <WholesaleHeroSection
        cmsData={heroSection}
        openGeneralInquiryModal={openGeneralInquiryModal}
        getWhatsAppUrl={getWhatsAppUrl}
        handleWhatsAppRedirect={handleWhatsAppRedirect}
        telegramChannelUrl={telegramChannelUrl}
        defaultWhatsAppMessage={DEFAULT_WHATSAPP_MESSAGE}
        typedHeroText={typedHeroText}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* 2. Wholesale Product Categories (7 Categories with Icons) */}
      <WholesaleCategoriesSection />

      {/* 4. Product Line Section */}
      <WholesaleProductsSection
        openProductInquiryModal={openProductInquiryModal}
        getWhatsAppUrl={getWhatsAppUrl}
        handleWhatsAppRedirect={handleWhatsAppRedirect}
        telegramChannelUrl={telegramChannelUrl}
        defaultWhatsAppMessage={DEFAULT_WHATSAPP_MESSAGE}
      />

      {/* 4. Why Crown Excel (5 Pillars) */}
      <WholesaleWhyCrownExcelSection />

      {/* 5. Global Customer Presence */}
      <WholesaleWorldwideAreasSection />

      {/* Inquiry Form Modal */}
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
    </div>
  );
}
