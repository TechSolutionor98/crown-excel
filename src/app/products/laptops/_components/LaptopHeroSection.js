import React from 'react';
import { Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { safeRender } from '@/lib/safe-html';

export default function LaptopHeroSection({
  cmsData,
  openGeneralInquiryModal,
  getWhatsAppUrl,
  handleWhatsAppRedirect,
  scrollToSection,
}) {
  const WHATSAPP_PHONE = '971543090680';
  const heroWhatsAppMessage = 'Hello Crown Excel, I am looking for wholesale laptops availability and pricing.';

  const getHeroWhatsAppUrl = () => {
    if (typeof getWhatsAppUrl === 'function') {
      return getWhatsAppUrl(heroWhatsAppMessage);
    }
    const encoded = encodeURIComponent(heroWhatsAppMessage);
    return `https://web.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`;
  };

  const handleHeroWhatsAppClick = (e) => {
    if (typeof handleWhatsAppRedirect === 'function') {
      handleWhatsAppRedirect(e, heroWhatsAppMessage);
      return;
    }
    const encoded = encodeURIComponent(heroWhatsAppMessage);
    const isMob =
      typeof window !== 'undefined' &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '') ||
        window.innerWidth < 768);
    const targetUrl = isMob
      ? `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`
      : `https://web.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`;
    if (e && e.currentTarget) e.currentTarget.href = targetUrl;
    if (typeof window !== 'undefined') {
      const win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (win && e && e.preventDefault) e.preventDefault();
    }
  };

  const fields = cmsData?.fields || cmsData || {};
  const headingVal = fields.heading;
  const subheadingVal = fields.subheading ?? fields.heading_2;
  const paragraphVal = fields.paragraph;

  const defaultHeading = (
    <>
      <span className="block text-white">Direct Wholesale &amp; Bulk</span>
      <span className="block text-[#ffd900] italic">
        Laptops &amp; Workstations
      </span>
    </>
  );

  const defaultSubheading = (
    <>
      <span className="block">Looking for a reliable wholesale supplier</span>
      <span className="block mt-0.5 sm:mt-1">of Laptops &amp; Workstations</span>
    </>
  );

  const defaultParagraph = (
    <>
      Crown Excel is among the leading wholesale suppliers of laptops in Dubai, UAE, providing 100% genuine products and the best after-sales support. We cover almost all major laptop brands, including <span className="text-white font-medium">Lenovo, HP, Dell, ASUS, Acer, and Apple</span>, with competitive bulk pricing and extensive ready stock available in our Dubai warehouse.
    </>
  );

  let renderedHeading = headingVal;
  if (typeof renderedHeading === 'object' && renderedHeading?.value !== undefined) {
    renderedHeading = renderedHeading.value;
  }
  const cleanHeadingStr = typeof renderedHeading === 'string' ? renderedHeading.replace(/\s+/g, ' ').trim() : '';
  if (
    !cleanHeadingStr ||
    cleanHeadingStr === 'Direct Wholesale & Bulk Laptops & Workstations' ||
    cleanHeadingStr === 'Direct Wholesale & Bulk Laptops & Workstations Looking for a reliable wholesale supplier of Laptops & Workstations'
  ) {
    renderedHeading = defaultHeading;
  }

  let renderedSubheading = subheadingVal;
  if (typeof renderedSubheading === 'object' && renderedSubheading?.value !== undefined) {
    renderedSubheading = renderedSubheading.value;
  }
  const cleanSubheadingStr = typeof renderedSubheading === 'string' ? renderedSubheading.replace(/\s+/g, ' ').trim() : '';
  if (!cleanSubheadingStr || cleanSubheadingStr === 'Looking for a reliable wholesale supplier of Laptops & Workstations') {
    renderedSubheading = defaultSubheading;
  }

  let renderedParagraph = paragraphVal;
  if (typeof renderedParagraph === 'object' && renderedParagraph?.value !== undefined) {
    renderedParagraph = renderedParagraph.value;
  }
  if (typeof renderedParagraph === 'string' && renderedParagraph.includes('Crown Excel is among the leading wholesale suppliers of laptops in Dubai, UAE, providing 100% genuine products and the best after-sales support.')) {
    renderedParagraph = defaultParagraph;
  }

  return (
    <div className="relative w-full bg-[#FFFFFF] overflow-hidden">
      <section className="relative w-full max-w-[1536px] mx-auto overflow-hidden bg-gradient-to-b from-[#0b241c] via-[#103e30] to-[#0d2e24] text-white pt-12 pb-16 sm:pt-18 sm:pb-22 lg:pt-22 lg:pb-26 xl:pt-24 xl:pb-28 px-5 sm:px-8 md:px-[53px] lg:px-[53px] xl:px-16">
        {/* Ambient Radial Lighting Effects scaled across screen sizes */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] lg:w-[800px] xl:w-[900px] h-[280px] sm:h-[400px] lg:h-[500px] bg-emerald-400/15 blur-[100px] sm:blur-[140px] xl:blur-[160px] rounded-full pointer-events-none -z-0"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-[260px] sm:w-[420px] xl:w-[520px] h-[260px] sm:h-[420px] xl:h-[520px] bg-[#ffd900]/10 blur-[100px] xl:blur-[140px] rounded-full pointer-events-none -z-0"
        />

        <div className="relative z-10 w-full">
          {/* Hero Headline & Value Proposition */}
          <div className="text-center max-w-5xl xl:max-w-6xl mx-auto mb-7 sm:mb-9 xl:mb-11">
            <h1 className="font-anton uppercase tracking-[-0.03em] leading-[1.08] sm:leading-[1.02] text-3xl sm:text-4xl md:text-5xl lg:text-[66px] xl:text-[74px] mb-3.5 sm:mb-4.5 xl:mb-5">
              {safeRender(renderedHeading, defaultHeading) || 'Direct Wholesale & Bulk Laptops & Workstations'}
              <span className="block text-white text-[13px] xs:text-[15px] sm:text-xl md:text-2xl lg:text-[30px] xl:text-[34px] mt-2 sm:mt-2.5 font-montserrat font-bold tracking-normal uppercase leading-snug">
                {safeRender(renderedSubheading, defaultSubheading) || 'Looking for a reliable wholesale supplier of Laptops & Workstations'}
              </span>
            </h1>

            <p className="font-jakarta text-gray-200 text-xs sm:text-sm md:text-base xl:text-[17px] leading-relaxed max-w-2xl sm:max-w-3xl xl:max-w-4xl mx-auto font-light text-pretty">
              {safeRender(renderedParagraph, defaultParagraph) || 'Crown Excel is among the leading wholesale suppliers of laptops in Dubai, UAE, providing 100% genuine products and the best after-sales support. We cover almost all major laptop brands, including Lenovo, HP, Dell, ASUS, Acer, and Apple, with competitive bulk pricing and extensive ready stock available in our Dubai warehouse.'}
            </p>
          </div>

          {/* Action Buttons: Request Quote + WhatsApp Direct */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto font-jakarta px-2">
            {/* 1. Request Wholesale Quote (Primary CTA) */}
            <button
              type="button"
              onClick={openGeneralInquiryModal}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 xl:px-8 py-3.5 xl:py-4 rounded-xl bg-[#ffd900] hover:bg-[#ffe833] text-gray-950 font-bold text-xs sm:text-sm xl:text-base whitespace-nowrap shadow-md hover:shadow-xl hover:shadow-amber-500/20 border border-[#e6c400] transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Send className="w-4 h-4 text-gray-950 transition-transform duration-200 group-hover:translate-x-0.5" />
              <span>{safeRender(fields.button_primary_text, 'Request Wholesale Quote')}</span>
            </button>

            {/* 2. WhatsApp Instant Inquiries (Secondary Glass CTA) */}
            <a
              href={getHeroWhatsAppUrl()}
              onClick={handleHeroWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Crown Excel on WhatsApp at +971 54 309 0680"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 xl:px-8 py-3.5 xl:py-4 rounded-xl bg-white/10 hover:bg-emerald-500/20 border border-emerald-400/30 hover:border-emerald-400/60 text-white font-semibold text-xs sm:text-sm xl:text-base whitespace-nowrap backdrop-blur-md shadow-sm hover:shadow-lg hover:shadow-emerald-950/40 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <FaWhatsapp className="w-4.5 h-4.5 xl:w-5 xl:h-5 text-[#25D366] group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
              <span>{safeRender(fields.button_secondary_text, 'WhatsApp Instant Inquiries')}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
