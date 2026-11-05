'use client';

import React from 'react';
import Image from 'next/image';
import { 
  HiShieldCheck, 
  HiOutlineServer, 
  HiArrowRight, 
  HiOutlineTruck,
  HiOutlineBadgeCheck,
  HiOutlinePhone
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { safeRender, safeImage } from '@/lib/safe-html';

import HeroServerImage from '@/Components/Images/HighComputing.jpg';

export default function ITHardwareHero({ cmsData, onOpenInquiry, onWhatsApp }) {
  const fields = cmsData?.fields || cmsData || {};

  const badgeText = safeRender(fields.badge_text, 'OFFICIAL IT HARDWARE SUPPLIER & DISTRIBUTOR | DUBAI, UAE');
  const heroImageSrc = safeImage(fields.image_heroserverimage, HeroServerImage);

  const btn1Label = safeRender(fields.button_1_text, 'Request Wholesale Quotation');
  const btn2Label = safeRender(fields.button_2_text, 'Instant WhatsApp Inquiry');

  return (
    <section className="relative w-full bg-gradient-to-br from-[#16CA9A]/10 via-white to-gray-50 text-gray-900 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-gray-100">
      {/* Decorative subtle ambient gradients */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#16CA9A]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#16CA9A]/30 shadow-sm mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16CA9A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16CA9A]" />
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#0F9F78] uppercase font-urbanist">
                {badgeText}
              </span>
            </div>

            {/* Main H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.15] font-montserrat mb-6">
              {safeRender(fields.heading, "IT Hardware Supplier &")}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#16CA9A] via-[#12B388] to-[#084032]">
                {safeRender(fields.heading_accent, "Wholesale Distributor")}
              </span>
              <span className="text-gray-900 text-2xl sm:text-3xl md:text-4xl block mt-1 font-bold">
                {safeRender(fields.heading_suffix, "in Dubai & the United Arab Emirates")}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl font-roboto mb-8">
              {safeRender(
                fields.paragraph,
                "Crown Excel delivers authentic IT hardware distribution and bulk supply solutions for businesses, corporate enterprises, and IT resellers across Dubai and the UAE. We source directly from authorized channels to provide enterprise servers, networking switches, commercial laptops, storage arrays, and cyber security firewalls with official manufacturer warranty and dedicated B2B procurement support."
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="group relative inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#16CA9A] hover:bg-[#14b589] shadow-lg shadow-[#16CA9A]/25 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{btn1Label}</span>
                <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onWhatsApp}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#16CA9A] shadow-sm transition-all duration-300 cursor-pointer"
              >
                <FaWhatsapp className="mr-2.5 w-5 h-5 text-[#25D366]" />
                <span>{btn2Label}</span>
              </button>
            </div>

            {/* Trust Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-200/80 w-full">
              <div className="flex items-center gap-2.5">
                <HiShieldCheck className="w-5 h-5 text-[#16CA9A] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">100% Genuine Stock</span>
              </div>
              <div className="flex items-center gap-2.5">
                <HiOutlineTruck className="w-5 h-5 text-[#16CA9A] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Rapid UAE Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <HiOutlineBadgeCheck className="w-5 h-5 text-[#16CA9A] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Official Brand Warranty</span>
              </div>
              <div className="flex items-center gap-2.5">
                <HiOutlineServer className="w-5 h-5 text-[#16CA9A] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Bulk Wholesale Rates</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card Container */}
              <div className="relative rounded-2xl bg-white border border-gray-200/80 p-5 sm:p-7 shadow-xl">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#16CA9A]/15 border border-[#16CA9A]/30 flex items-center justify-center text-[#16CA9A]">
                      <HiOutlineServer className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 font-montserrat">Enterprise Hardware Hub</h3>
                      <p className="text-xs text-gray-500">Dubai Central Supply & Logistics</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#16CA9A]/10 text-[#0F9F78] border border-[#16CA9A]/20">
                    Active Stock
                  </span>
                </div>

                {/* Hero Feature Image */}
                <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-gray-100 mb-5 group">
                  <Image
                    src={heroImageSrc}
                    alt="Crown Excel IT Hardware Supplier & Distributor Dubai"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Floating Glass Tag inside Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/60 shadow-sm">
                    <span className="text-xs font-semibold text-gray-800">Servers • Networking • Storage • Endpoints</span>
                    <span className="text-xs font-bold text-[#16CA9A]">Dubai Stock</span>
                  </div>
                </div>

                {/* Genuine Value Pillars */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#16CA9A]">Direct Channels</div>
                    <div className="text-xs text-gray-600 mt-1">Authorized vendor & tier-1 sourcing channels</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#16CA9A]">B2B Wholesale</div>
                    <div className="text-xs text-gray-600 mt-1">Competitive pricing for resellers and enterprises</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#16CA9A]">Pre-Sales Support</div>
                    <div className="text-xs text-gray-600 mt-1">BOM validation & custom hardware configuration</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#16CA9A]">GCC Re-Export</div>
                    <div className="text-xs text-gray-600 mt-1">Compliant logistics across Saudi, Qatar & Oman</div>
                  </div>
                </div>

                {/* Direct Contact Bar */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <HiOutlinePhone className="w-4 h-4 text-[#16CA9A]" />
                    <span>Direct B2B Desk:</span>
                  </span>
                  <a href="tel:+97143540566" className="font-bold text-gray-900 hover:text-[#16CA9A] transition-colors">
                    +971 4-354 0566
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
