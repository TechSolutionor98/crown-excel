import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { safeRender } from '@/lib/safe-html';
import WholesaleBrandsSection from './WholesaleBrandsSection';

export default function WholesaleHeroSection({
  openGeneralInquiryModal,
  getWhatsAppUrl,
  handleWhatsAppRedirect,
  telegramChannelUrl,
  defaultWhatsAppMessage,
  typedHeroText,
  prefersReducedMotion,
  cmsData,
}) {
  const fields = cmsData?.fields || cmsData || {};

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FAF9]/60 via-white to-white pt-8 pb-8 sm:pt-14 sm:pb-12 border-b border-gray-100/80">
      {/* Subtle Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] md:w-[900px] h-[220px] sm:h-[340px] bg-emerald-100/25 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* 1. Top Pill Badge: TRUST | AUTHENTICITY | CONVENIENCE */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white border border-gray-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-4 sm:mb-6">
          <span className="w-2 h-2 rounded-full bg-[#147A5F]" aria-hidden="true" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-gray-700 uppercase font-jakarta">
            TRUST <span className="text-[#FFE500] font-bold mx-1.5 sm:mx-2">|</span> AUTHENTICITY <span className="text-[#FFE500] font-bold mx-1.5 sm:mx-2">|</span> CONVENIENCE
          </span>
        </div>

        {/* 2. Main Headline: LAPTOP [WHOLESALE] SUPPLIER IN DUBAI, UAE */}
        <h1
          className="font-anton font-normal uppercase text-center tracking-[-0.025em] leading-[1.08] sm:leading-[1.02]"
          style={{
            fontFamily: "'Anton', Impact, sans-serif",
            fontWeight: 400,
            textTransform: 'uppercase',
          }}
        >
          <span className="block text-[#171717] text-[26px] sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[76px]">
            LAPTOP{' '}
            <span className="inline-block bg-[#FFE500] text-[#171717] px-2 sm:px-3 md:px-3.5 py-0.5 sm:py-1 align-baseline">
              WHOLESALE
            </span>{' '}
            SUPPLIER
          </span>
          <span className="block text-[#147A5F] text-[26px] sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[76px] mt-1 sm:mt-2">
            IN DUBAI, UAE
          </span>
        </h1>

        {/* 3. Sub-headline / Animated Typing Line: Bulk supply of GAMING LAPTOPS| */}
        <div className="mt-3.5 sm:mt-5 text-base sm:text-xl md:text-[24px] lg:text-[26px] text-gray-600 font-jakarta">
          <span className="font-normal text-gray-600">Bulk supply of </span>
          <span
            className="font-anton italic tracking-wide text-[#147A5F] uppercase font-bold text-lg sm:text-2xl md:text-[26px] lg:text-[28px]"
            style={{ fontStyle: 'italic' }}
          >
            {typedHeroText ? typedHeroText.toUpperCase() : 'GAMING LAPTOPS'}
          </span>
          {!prefersReducedMotion && (
            <span
              aria-hidden="true"
              className="inline-block w-[2px] sm:w-[2.5px] h-[0.85em] bg-[#147A5F] ml-1 rounded-full animate-pulse align-middle"
            />
          )}
        </div>

        {/* 4. Paragraph Description */}
        <p className="font-jakarta text-gray-600 text-[13px] sm:text-base md:text-[16px] leading-[1.65] sm:leading-relaxed max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto mt-3 sm:mt-4 mb-6 sm:mb-8 text-center px-2 sm:px-0">
          Brand-new, <strong className="font-semibold text-gray-900">factory-sealed</strong> laptops from Lenovo, HP, Dell, ASUS and Acer, at wholesale prices for distributors, resellers and corporate buyers across the GCC, Africa, CIS and Asia.
        </p>

        {/* 5. Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 font-jakarta">
          {/* Primary CTA */}
          <button
            type="button"
            onClick={openGeneralInquiryModal}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#147A5F] hover:bg-[#0c4e3c] text-white font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <span>{safeRender(fields.button_primary_text, 'Request Wholesale Quote')}</span>
            <ArrowRight className="w-4 h-4 ml-0.5 flex-shrink-0" />
          </button>

          {/* WhatsApp CTA */}
          <a
            href={typeof getWhatsAppUrl === 'function' ? getWhatsAppUrl(defaultWhatsAppMessage) : '#'}
            onClick={(e) => {
              if (typeof handleWhatsAppRedirect === 'function') {
                handleWhatsAppRedirect(e, defaultWhatsAppMessage);
              }
            }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Crown Excel on WhatsApp"
            className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-gray-300 font-semibold text-sm sm:text-[15px] shadow-xs transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] flex-shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Telegram CTA */}
          <a
            href={safeRender(fields.telegram_url, telegramChannelUrl || 'https://t.me/crownexcelae')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Crown Excel Telegram Channel"
            className="inline-flex items-center justify-center w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] rounded-xl bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-xs transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <FaTelegramPlane className="w-4 h-4 sm:w-5 sm:h-5 text-[#0088cc] flex-shrink-0" />
          </a>
        </div>

        {/* 6. Trust Badges / Checkmarks */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2 text-xs sm:text-[13px] text-gray-500 font-medium mt-3.5 sm:mt-4 font-jakarta">
          <span className="inline-flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#147A5F] stroke-[2.5]" />
            Fast quote turnaround
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#147A5F] stroke-[2.5]" />
            Bulk &amp; mixed-model orders
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#147A5F] stroke-[2.5]" />
            Export documentation handled
          </span>
        </div>

        {/* 7. Stats / Metrics Card */}
        <div className="max-w-4xl mx-auto mt-8 sm:mt-10 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-6 sm:py-7 px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 divide-y-0 md:divide-x md:divide-gray-100 text-center font-jakarta">
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center px-2">
              <span className="font-jakarta font-extrabold text-3xl sm:text-4xl lg:text-[40px] text-[#147A5F] tracking-tight leading-none">
                16+
              </span>
              <span className="text-sm sm:text-[16px] text-gray-500 font-medium mt-2 leading-snug">
                Years in the<br className="hidden sm:inline" /> Dubai market
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center px-2">
              <span className="font-jakarta font-extrabold text-3xl sm:text-4xl lg:text-[40px] text-[#147A5F] tracking-tight leading-none">
                16
              </span>
              <span className="text-sm sm:text-[16px] text-gray-500 font-medium mt-2 leading-snug">
                Active export<br className="hidden sm:inline" /> markets
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center px-2">
              <span className="font-jakarta font-extrabold text-3xl sm:text-4xl lg:text-[40px] text-[#147A5F] tracking-tight leading-none">
                7
              </span>
              <span className="text-sm sm:text-[16px] text-gray-500 font-medium mt-2 leading-snug">
                Core IT<br className="hidden sm:inline" /> categories
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center px-2">
              <span className="font-jakarta font-extrabold text-3xl sm:text-4xl lg:text-[40px] text-[#147A5F] tracking-tight leading-none">
                100%
              </span>
              <span className="text-sm sm:text-[16px] text-gray-500 font-medium mt-2 leading-snug">
                Brand-new &amp;<br className="hidden sm:inline" /> factory-sealed
              </span>
            </div>
          </div>
        </div>

        {/* Continuous Horizontal Scrolling Brand Logos Slider Positioned Directly Below Hero Section */}
        <div className="w-full mt-8 sm:mt-12">
          <WholesaleBrandsSection />
        </div>
      </div>
    </section>
  );
}
