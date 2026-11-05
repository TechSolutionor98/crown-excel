'use client';

import React, { useState, useCallback } from 'react';
import ContactFormPopup from '@/Components/ContactFormPopup/ContactFormPopup';

import ITHardwareHero from './ITHardwareHero';
import ITHardwareAbout from './ITHardwareAbout';
import ITHardwareCategories from './ITHardwareCategories';
import ITHardwareBrands from './ITHardwareBrands';
import ITHardwareWholesale from './ITHardwareWholesale';
import ITHardwareCorporate from './ITHardwareCorporate';
import ITHardwareWhoWeSupply from './ITHardwareWhoWeSupply';
import ITHardwareWhyChooseUs from './ITHardwareWhyChooseUs';
import ITHardwareCTA from './ITHardwareCTA';

export default function ITHardwareClientPage({ cmsContent }) {
  const sections = cmsContent?.sections || {};

  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySubject, setInquirySubject] = useState('Wholesale Inquiries');

  const handleOpenInquiry = useCallback((subject = 'Wholesale Inquiries') => {
    setInquirySubject(typeof subject === 'string' ? subject : 'Wholesale Inquiries');
    setShowInquiryModal(true);
  }, []);

  const handleCloseInquiry = useCallback(() => {
    setShowInquiryModal(false);
  }, []);

  const handleWhatsApp = useCallback((customMsg) => {
    const defaultMsg = 'Hello Crown Excel, I am looking for an IT Hardware quote and stock availability in Dubai/UAE.';
    const msg = typeof customMsg === 'string' ? customMsg : defaultMsg;
    const url = `https://api.whatsapp.com/send/?phone=971505033860&text=${encodeURIComponent(msg)}&type=phone_number&app_absent=0`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <main className="w-full min-h-screen bg-white">
      {/* 1. Hero Banner */}
      <ITHardwareHero
        cmsData={sections.ithardwarehero}
        onOpenInquiry={() => handleOpenInquiry('Wholesale Inquiries')}
        onWhatsApp={() => handleWhatsApp('Hello Crown Excel, I would like to request an instant IT Hardware quotation.')}
      />

      {/* 2. About Our IT Hardware Distribution */}
      <ITHardwareAbout
        cmsData={sections.ithardwareabout}
        onOpenInquiry={() => handleOpenInquiry('Corporate IT Procurement Inquiry')}
      />

      {/* 3. IT Hardware Categories */}
      <ITHardwareCategories
        cmsData={sections.ithardwarecategories}
        onOpenInquiry={(catTitle) => handleOpenInquiry(catTitle || 'Hardware Category Inquiry')}
      />

      {/* 4. Brands We Deal In */}
      <ITHardwareBrands
        cmsData={sections.ithardwarebrands}
        onOpenInquiry={(brandTitle) => handleOpenInquiry(brandTitle || 'Brand Pricing Inquiry')}
      />

      {/* 5. Wholesale IT Hardware Supply */}
      <ITHardwareWholesale
        cmsData={sections.ithardwarewholesale}
        onOpenInquiry={(subject) => handleOpenInquiry(subject || 'Wholesale Reseller Inquiry')}
      />

      {/* 6. B2B & Corporate IT Solutions */}
      <ITHardwareCorporate
        cmsData={sections.ithardwarecorporate}
        onOpenInquiry={(subject) => handleOpenInquiry(subject || 'Corporate IT Solutions Consultation')}
      />

      {/* 7. Who We Supply */}
      <ITHardwareWhoWeSupply
        cmsData={sections.ithardwarewhowesupply}
        onOpenInquiry={(verticalTitle) => handleOpenInquiry(verticalTitle || 'Vertical Hardware Inquiry')}
      />

      {/* 8. Why Choose Crown Excel */}
      <ITHardwareWhyChooseUs
        cmsData={sections.ithardwarewhychooseus}
        onOpenInquiry={() => handleOpenInquiry('Crown Excel Partner Inquiry')}
      />

      {/* 9. Final Inquiry CTA */}
      <ITHardwareCTA
        cmsData={sections.ithardwarecta}
        onOpenInquiry={() => handleOpenInquiry('Final IT Hardware Quote Request')}
        onWhatsApp={() => handleWhatsApp('Hello Crown Excel, I am ready to source IT hardware. Please assist me with pricing and delivery.')}
      />

      {/* Contact Form Popup Modal */}
      <ContactFormPopup
        isOpen={showInquiryModal}
        onClose={handleCloseInquiry}
        defaultSubject={inquirySubject}
        preSelectedSubject={inquirySubject}
      />
    </main>
  );
}
