'use client';

import React, { useState } from 'react';
import { Send, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { safeRender } from '@/lib/safe-html';

export default function LaptopInquirySection({
  cmsData,
  openGeneralInquiryModal,
  getWhatsAppUrl,
  handleWhatsAppRedirect,
}) {
  const fields = cmsData?.fields || cmsData || {};
  const headingVal = fields.heading;
  const paragraphVal = fields.paragraph;
  const heading2Val = fields.heading_2;

  const defaultHeading = (
    <>
      Ready to Order or Request <br className="hidden sm:inline" />
      <span className="text-[#ffd900] italic">Wholesale Laptop Pricing?</span>
    </>
  );

  let renderedHeading = headingVal;
  if (typeof renderedHeading === 'object' && renderedHeading?.value !== undefined) {
    renderedHeading = renderedHeading.value;
  }
  if (typeof renderedHeading === 'string' && renderedHeading.replace(/\s+/g, ' ').trim() === 'Ready to Order or Request Wholesale Laptop Pricing?') {
    renderedHeading = defaultHeading;
  }

  let renderedFaqHeading = heading2Val;
  if (typeof renderedFaqHeading === 'object' && renderedFaqHeading?.value !== undefined) {
    renderedFaqHeading = renderedFaqHeading.value;
  }
  const defaultFaqHeading = 'Frequently Asked Questions';

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const WHATSAPP_PHONE = '971543090680';
  const inquiryWhatsAppMessage =
    'Hello Crown Excel, I would like to request wholesale laptop availability and the latest price sheet.';

  const getInquiryWhatsAppUrl = () => {
    if (typeof getWhatsAppUrl === 'function') {
      return getWhatsAppUrl(inquiryWhatsAppMessage);
    }
    const encoded = encodeURIComponent(inquiryWhatsAppMessage);
    return `https://web.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`;
  };

  const handleInquiryWhatsAppClick = (e) => {
    if (typeof handleWhatsAppRedirect === 'function') {
      handleWhatsAppRedirect(e, inquiryWhatsAppMessage);
      return;
    }
    const encoded = encodeURIComponent(inquiryWhatsAppMessage);
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

  const faqs = [
    {
      q: safeRender(fields.faq_1_q, 'What is the Minimum Order Quantity (MOQ) for wholesale laptop pricing?'),
      a: safeRender(
        fields.faq_1_a,
        'Our standard wholesale pricing tier starts at 5 to 10 units for mixed commercial models. For volume pallet or container consignments (50 to 500+ units), we provide customized volume tier discounts tailored to your procurement schedule.'
      ),
    },
    {
      q: safeRender(fields.faq_2_q, 'Are all laptops factory-sealed with authentic manufacturer warranties?'),
      a: safeRender(
        fields.faq_2_a,
        'Yes. 100% of our laptop inventory is brand-new, factory-sealed in original manufacturer packaging with valid brand warranty. We do not sell grey-market or unverified stock. Serial numbers are logged upon dock intake.'
      ),
    },
    {
      q: safeRender(fields.faq_3_q, 'How fast can Crown Excel deliver laptops across Dubai and the UAE?'),
      a: safeRender(
        fields.faq_3_a,
        'Orders confirmed before 1:00 PM are dispatched same-day within Dubai, Sharjah, and Ajman. Deliveries to Abu Dhabi, Al Ain, Ras Al Khaimah, and Fujairah are completed next business day via our insured logistics fleet.'
      ),
    },
    {
      q: safeRender(fields.faq_4_q, 'Do you support international export to Saudi Arabia and other GCC countries?'),
      a: safeRender(
        fields.faq_4_a,
        'Yes. We provide comprehensive export services including daily road and air cargo dispatch to Saudi Arabia (Riyadh, Jeddah, Dammam), Oman, Qatar, Bahrain, Kuwait, and African markets with complete customs documentation, COO, and export packing.'
      ),
    },
    {
      q: safeRender(fields.faq_5_q, 'What payment terms are available for corporate and reseller accounts?'),
      a: safeRender(
        fields.faq_5_a,
        'We accept wire transfers (AED/USD), corporate cheques (PDC), company credit cards, and cash on delivery for established clients. Formal corporate credit facilities (30-day billing) are available for verified businesses subject to credit assessment.'
      ),
    },
  ];

  return (
    <div className="relative w-full bg-[#FFFFFF] overflow-hidden">
      <section id="laptop-inquiry" className="relative w-full max-w-[1536px] mx-auto overflow-hidden bg-white py-12 sm:py-16 lg:py-18 xl:py-20 px-5 sm:px-8 md:px-[53px] lg:px-[53px] xl:px-16">
        <div className="relative z-10 w-full">
          
          {/* Main High-Impact CTA Banner */}
          <div className="bg-gradient-to-br from-[#0c2a20] via-[#103e30] to-[#0a231b] rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden mb-12 sm:mb-16">
            {/* Subtle Ambient Lighting */}
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-400/15 rounded-full blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#ffd900]/10 rounded-full blur-3xl pointer-events-none"
            />

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <span className="text-[#ffd900] text-xs font-extrabold uppercase tracking-wider font-montserrat block mb-2 sm:mb-2.5">
                {safeRender(fields.badge, "START YOUR WHOLESALE PARTNERSHIP TODAY")}
              </span>

              <h2
                className="font-anton uppercase text-2xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.08] mb-3 text-white"
                style={{ fontFamily: "'Anton', Impact, sans-serif" }}
              >
                {safeRender(renderedHeading, defaultHeading) || 'Ready to Order or Request Wholesale Laptop Pricing?'}
              </h2>

              <p className="font-jakarta text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed mb-6 max-w-2xl mx-auto font-light">
                {safeRender(paragraphVal, 'Contact our sales desk now to check real-time stock availability, request official quotation manifests, or discuss customized fleet configurations. We respond within 2 business hours.')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 font-jakarta">
                <button
                  type="button"
                  onClick={openGeneralInquiryModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-[#ffd900] hover:bg-[#e6c400] text-gray-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Send className="w-4 h-4 text-gray-950" />
                  <span>{safeRender(fields.button_submit_text, "Submit Inquiry Form")}</span>
                </button>

                <a
                  href={getInquiryWhatsAppUrl()}
                  onClick={handleInquiryWhatsAppClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp with Crown Excel at +971 54 309 0680"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <FaWhatsapp className="w-4.5 h-4.5 text-emerald-400" />
                  <span>{safeRender(fields.button_whatsapp_text, "Chat on WhatsApp")}</span>
                </a>
              </div>

              {/* Fast Response Perks */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 pt-6 border-t border-emerald-800/40 text-xs text-emerald-200 font-jakarta">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ffd900]" /> {safeRender(fields.perk_1, "Quotes in 2 Hours")}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ffd900]" /> {safeRender(fields.perk_2, "Full VAT Invoices")}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ffd900]" /> {safeRender(fields.perk_3, "Bonded Export Ready")}
                </span>
              </div>
            </div>
          </div>

          {/* Wholesale FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#147A5F] font-montserrat block mb-1.5">
                {safeRender(fields.faq_badge, "GOT QUESTIONS?")}
              </span>
              <h3 className="font-anton uppercase text-2xl sm:text-3xl text-gray-900">
                {safeRender(renderedFaqHeading, defaultFaqHeading)}
              </h3>
            </div>

            <div className="space-y-3 font-jakarta">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-2xs transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 hover:text-[#147A5F] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#147A5F] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-2.5 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
