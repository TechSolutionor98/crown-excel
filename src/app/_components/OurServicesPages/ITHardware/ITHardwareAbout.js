'use client';

import React from 'react';
import Image from 'next/image';
import { 
  HiOutlineCheckCircle, 
  HiOutlineGlobeAlt, 
  HiOutlineCube, 
  HiOutlineShieldCheck,
  HiOutlineOfficeBuilding,
  HiOutlineCog
} from 'react-icons/hi';
import { safeRender, safeImage } from '@/lib/safe-html';

import AboutDistributionImage from '@/Components/Images/abouttrusted.jpg';

export default function ITHardwareAbout({ cmsData, onOpenInquiry }) {
  const fields = cmsData?.fields || cmsData || {};

  const eyebrow = safeRender(fields.eyebrow, 'ABOUT OUR IT HARDWARE DISTRIBUTION');
  const aboutImg = safeImage(fields.image_aboutdistributionimage, AboutDistributionImage);

  const pillar1Title = safeRender(fields.pillar_1_title, 'Ready UAE Inventory');
  const pillar1Desc = safeRender(fields.pillar_1_desc, 'Essential enterprise servers, networking switches, storage units, and commercial laptops available in Dubai for immediate dispatch.');

  const pillar2Title = safeRender(fields.pillar_2_title, '100% Genuine Certified Stock');
  const pillar2Desc = safeRender(fields.pillar_2_desc, 'All equipment is brand-new, factory-sealed, serialized, and backed by verifiable manufacturer warranty across the UAE and GCC.');

  const pillar3Title = safeRender(fields.pillar_3_title, 'Custom Staging & Configuration');
  const pillar3Desc = safeRender(fields.pillar_3_desc, 'Pre-delivery hardware configuration, including custom RAM/SSD staging, RAID array initialization, and corporate asset tagging.');

  const pillar4Title = safeRender(fields.pillar_4_title, 'GCC & International Logistics');
  const pillar4Desc = safeRender(fields.pillar_4_desc, 'Comprehensive re-export documentation, Certificate of Origin, and Chamber of Commerce attestation for shipments to Saudi Arabia, Oman, Qatar, and beyond.');

  return (
    <section className="relative w-full bg-white py-20 lg:py-28 overflow-hidden text-gray-900 border-b border-gray-100">
      {/* Decorative background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#16CA9A]/10 via-transparent to-transparent rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-500/5 via-transparent to-transparent rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16CA9A]/10 text-[#0F9F78] text-xs sm:text-sm font-bold tracking-wide uppercase font-urbanist mb-4">
            <HiOutlineOfficeBuilding className="w-4 h-4 text-[#16CA9A]" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-montserrat tracking-tight leading-tight mb-6">
            {safeRender(fields.heading, "Powering Technology Infrastructure Across Dubai, the UAE & GCC")}
          </h2>

          <div className="w-20 h-1.5 bg-[#16CA9A] mx-auto rounded-full mb-6" />

          <p className="text-base sm:text-lg text-gray-600 font-roboto leading-relaxed">
            {safeRender(
              fields.paragraph,
              "Crown Excel General Trading LLC is an established technology hardware supplier and wholesale distributor headquartered in Dubai, UAE. Backed by more than 15 years of industry presence and relationships with authorized global technology distributors, we provide reliable, scalable, and authenticated IT equipment for enterprises, educational institutions, government bodies, and regional IT resellers."
            )}
          </p>
        </div>

        {/* Content & Visual Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left: Visual Image & Floating Stat Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-100 group">
              <div className="relative h-80 sm:h-96 md:h-[420px] w-full">
                <Image
                  src={aboutImg}
                  alt="Crown Excel IT Hardware Distribution Center Dubai"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Floating Badge on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#16CA9A]">Dubai Distribution Facility</div>
                    <div className="text-sm sm:text-base font-extrabold text-gray-900 font-montserrat">Al Raffa, Bur Dubai • Genuine IT Supply</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#16CA9A]/15 flex items-center justify-center text-[#16CA9A] flex-shrink-0">
                    <HiOutlineGlobeAlt className="w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>

            {/* Accent decorative ring */}
            <div className="absolute -top-4 -left-4 w-28 h-28 border-2 border-dashed border-[#16CA9A]/30 rounded-full -z-10" />
          </div>

          {/* Right: Detailed Capabilities & Secondary Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 font-montserrat mb-5">
              Authentic Sourcing, Technical Verification, and Reliable Fulfillment
            </h3>

            <p className="text-base sm:text-lg text-gray-600 font-roboto leading-relaxed mb-8">
              {safeRender(
                fields.paragraph_2,
                "Our Dubai warehousing and distribution operations maintain ready stock of rackmount servers, managed switches, enterprise storage, commercial laptops, and cyber security firewalls. Whether fulfilling bulk hardware orders for regional dealers or supporting scheduled corporate IT infrastructure rollouts, Crown Excel prioritizes authentic product delivery, competitive commercial terms, and prompt order turnaround."
              )}
            </p>

            {/* Quick checkmarks */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="w-5 h-5 text-[#16CA9A] flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  Authorized supply channels covering HPE, Dell, Lenovo, Cisco, and Apple.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="w-5 h-5 text-[#16CA9A] flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  Full commercial trade compliance with official UAE Tax Invoices (5% VAT).
                </span>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="w-5 h-5 text-[#16CA9A] flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  Pre-sales technical assistance to verify part numbers and hardware compatibility.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="w-5 h-5 text-[#16CA9A] flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  Fast quotation responses tailored for tenders, RFQs, and recurring corporate procurement.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-white bg-[#16CA9A] hover:bg-[#14b589] shadow-md shadow-[#16CA9A]/20 transition-all cursor-pointer text-sm sm:text-base"
              >
                Inquire Corporate Hardware Procurement
              </button>

              <a
                href="#hardware-categories"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all text-sm sm:text-base"
              >
                Browse Product Categories
              </a>
            </div>

          </div>

        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-gray-100">
          
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-[#16CA9A] hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#16CA9A]/15 text-[#16CA9A] flex items-center justify-center mb-5">
              <HiOutlineCube className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-montserrat mb-2.5">
              {pillar1Title}
            </h3>
            <p className="text-sm text-gray-600 font-roboto leading-relaxed">
              {pillar1Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-[#16CA9A] hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-600 flex items-center justify-center mb-5">
              <HiOutlineShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-montserrat mb-2.5">
              {pillar2Title}
            </h3>
            <p className="text-sm text-gray-600 font-roboto leading-relaxed">
              {pillar2Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-[#16CA9A] hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-600 flex items-center justify-center mb-5">
              <HiOutlineCog className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-montserrat mb-2.5">
              {pillar3Title}
            </h3>
            <p className="text-sm text-gray-600 font-roboto leading-relaxed">
              {pillar3Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-[#16CA9A] hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-5">
              <HiOutlineGlobeAlt className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-montserrat mb-2.5">
              {pillar4Title}
            </h3>
            <p className="text-sm text-gray-600 font-roboto leading-relaxed">
              {pillar4Desc}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
