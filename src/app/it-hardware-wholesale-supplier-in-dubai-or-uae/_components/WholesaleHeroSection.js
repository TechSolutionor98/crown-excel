import React from 'react';
import { Send } from 'lucide-react';
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

  const defaultParagraph =
    'Crown Excel is a trusted Dubai-based sourcing partner for brand-new laptops, serving international wholesalers, distributors, retailers and corporate buyers. We offer a wide portfolio of leading laptop brands, competitive wholesale pricing, reliable stock availability and seamless export coordination to customers across the GCC, Africa, CIS and Asia.';
  const rawParagraph =
    typeof fields.paragraph === 'object' && fields.paragraph?.value !== undefined
      ? fields.paragraph.value
      : fields.paragraph;
  const paragraphVal =
    !rawParagraph ||
    rawParagraph.includes('authentic factory-sealed inventory, competitive bulk rates')
      ? defaultParagraph
      : fields.paragraph;

  const headingVal = safeRender(fields.heading, 'Laptop Wholesale Supplier in Dubai, UAE');

  const renderBadgeTopWithYellowDividers = (rawVal) => {
    const text = safeRender(rawVal, 'TRUST | AUTHENTICITY | CONVENIENCE');
    if (typeof text !== 'string') return text;
    if (!text.includes('|')) return text;

    const parts = text.split('|');
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part.trim()}
        {index < parts.length - 1 && (
          <>
            {' '}
            <span className="text-[#FFE500]" aria-hidden="true">
              |
            </span>{' '}
          </>
        )}
      </React.Fragment>
    ));
  };

  const renderHeadingWithHighlight = (text) => {
    if (!text) return 'Laptop Wholesale Supplier in Dubai, UAE';
    const parts = text.split(/(wholesale)/i);
    if (parts.length > 1) {
      return (
        <>
          <span className="block md:inline">{parts[0]}</span>
          <span className="inline-block mt-0.5 md:mt-0">
            <span className="inline-block bg-[#FFE500] text-[#171717] px-2 py-0.5 sm:px-3 sm:py-1.5 md:py-2 md:px-3 rounded-[3px] sm:rounded-none shadow-xs sm:shadow-none align-baseline">
              {parts[1]}
            </span>{' '}
            <span>{parts.slice(2).join('')}</span>
          </span>
        </>
      );
    }
    return <span>{text}</span>;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FAF9] via-white to-white pt-7 pb-8 sm:pt-16 sm:pb-12 border-b border-gray-100">
      {/* Subtle Ambient Radial Glow for Depth */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[650px] md:w-[850px] h-[200px] sm:h-[320px] bg-emerald-100/30 blur-[70px] sm:blur-[110px] rounded-full pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* User-Specified Display Heading */}
        <h1
          className="font-anton font-normal uppercase text-center tracking-[-0.035em] leading-[1.08] sm:leading-[1] md:leading-[0.95]"
          style={{
            fontFamily: "'Anton', Impact, sans-serif",
            fontWeight: 400,
            textTransform: 'uppercase',
          }}
        >
          {/* Top Line: TRUST | AUTHENTICITY | CONVENIENCE */}
          <span className="block not-italic text-[#171717] text-[13px] sm:text-[22px] md:text-[30px] lg:text-[40px] xl:text-[44px] lg:whitespace-nowrap mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
            {renderBadgeTopWithYellowDividers(fields.badge_top)}
          </span>

          {/* Line 1: Laptop Wholesale Supplier in Dubai, UAE (Desktop single line, Mobile clean 2-tier wrap) */}
          <span className="block not-italic text-[#171717] text-[21px] sm:text-4xl md:text-5xl lg:text-[66px] xl:text-[70px] lg:whitespace-nowrap mt-0.5 sm:mt-1">
            {renderHeadingWithHighlight(headingVal)}
          </span>

          {/* Dynamic Animated Category Typewriter */}
          <span
            className="block italic text-[#147A5F] text-[21px] sm:text-4xl md:text-5xl lg:text-[66px] xl:text-[70px] mt-1 sm:mt-1.5 md:mt-2"
            style={{ fontStyle: 'italic' }}
          >
            <span className="inline-flex items-center justify-center min-h-[1.2em] sm:min-h-[1.15em] align-middle px-1">
              {/* Animated Typing Text */}
              <span className="inline-flex items-center text-[#147A5F]">
                <span>{typedHeroText}</span>
                {/* Blinking Cursor */}
                {!prefersReducedMotion && (
                  <span
                    aria-hidden="true"
                    className="inline-block w-[2.5px] sm:w-[3.5px] md:w-[4px] h-[0.7em] bg-[#147A5F] ml-1 sm:ml-1.5 rounded-full animate-pulse align-middle"
                  />
                )}
              </span>
            </span>
          </span>

          {/* BEST SUPPLIER IN DUBAI & THE UAE Badge */}
          <span className="block mt-2 sm:mt-3 md:mt-4">
            <span
              className="inline-block not-italic bg-[#147A5F] text-white text-[26px] sm:text-5xl md:text-6xl lg:text-[80px] xl:text-[84px] px-2.5 sm:px-8 md:px-10 py-1 sm:py-3 md:py-3.5 lg:py-4 rounded-full shadow-sm whitespace-nowrap transform -rotate-[0.7deg] origin-center tracking-[-0.035em] max-w-full"
              style={{
                fontStyle: 'normal',
                transform: 'rotate(-0.7deg)',
              }}
            >
              {safeRender(fields.badge_bottom, 'BEST SUPPLIER IN DUBAI & THE UAE')}
            </span>
          </span>
        </h1>

        {/* Subtitle Paragraph (Plus Jakarta Sans) */}
        <p
          className="text-[13px] sm:text-base md:text-[17px] text-gray-600 leading-[1.6] sm:leading-relaxed font-jakarta font-normal mt-3 sm:mt-7 mb-5 sm:mb-9 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-0 sm:px-0 text-center text-pretty"
          style={{ textWrap: 'pretty' }}
        >
          {safeRender(paragraphVal, defaultParagraph)}
        </p>

        {/* Centered Action Buttons (Responsive: clean stacked/grid on mobile, flex row on desktop) */}
        <div className="w-full max-w-md sm:max-w-none mx-auto flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 font-jakarta">
          {/* Primary CTA */}
          <button
            type="button"
            onClick={openGeneralInquiryModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#147A5F] hover:bg-[#0f604b] text-white font-semibold text-sm sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Send className="w-4 h-4 flex-shrink-0" />
            <span>{safeRender(fields.button_primary_text, 'Request Wholesale Quote')}</span>
          </button>

          {/* Quick Contact: 2-column grid on mobile, flex row on sm+ */}
          <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto sm:flex sm:items-center sm:gap-4">
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
              className="inline-flex items-center justify-center gap-2 px-3 sm:px-7 py-2.5 sm:py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <FaWhatsapp className="w-4 h-4 flex-shrink-0" />
              <span>{safeRender(fields.button_whatsapp_text, 'WhatsApp')}</span>
            </a>

            <a
              href={safeRender(fields.telegram_url, telegramChannelUrl || 'https://t.me/crownexcelae')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Crown Excel Telegram Channel"
              className="inline-flex items-center justify-center gap-2 px-3 sm:px-7 py-2.5 sm:py-3.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-semibold text-xs sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <FaTelegramPlane className="w-4 h-4 flex-shrink-0" />
              <span>{safeRender(fields.button_telegram_text, 'Telegram')}</span>
            </a>
          </div>
        </div>

        {/* Continuous Horizontal Scrolling Brand Logos Slider Positioned Directly Below Hero Buttons */}
        <div className="w-full mt-6 sm:mt-10">
          <WholesaleBrandsSection />
        </div>
      </div>
    </section>
  );
}
