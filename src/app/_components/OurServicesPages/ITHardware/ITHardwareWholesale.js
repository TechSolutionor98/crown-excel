'use client';

import React from 'react';
import Image from 'next/image';
import { 
  HiOutlineCubeTransparent, 
  HiOutlineCurrencyDollar, 
  HiOutlineClock, 
  HiOutlineDocumentText, 
  HiOutlineTruck, 
  HiOutlineLockClosed,
  HiArrowRight,
  HiOutlineCheckCircle
} from 'react-icons/hi';
import { safeRender, safeImage } from '@/lib/safe-html';

import WholesaleWarehouseImg from '@/Components/Images/storage.jpg';

export default function ITHardwareWholesale({ cmsData, onOpenInquiry }) {
  const fields = cmsData?.fields || cmsData || {};

  const eyebrow = safeRender(fields.eyebrow, 'HIGH-VOLUME B2B DISTRIBUTION');
  const wholesaleImg = safeImage(fields.image_wholesalewarehouseimg, WholesaleWarehouseImg);

  const feature1Title = safeRender(fields.feature_1_title, 'Tiered Wholesale Pricing');
  const feature1Desc = safeRender(fields.feature_1_desc, 'Volume discount structures designed to support healthy margins for IT resellers, system integrators, and commercial contractors.');

  const feature2Title = safeRender(fields.feature_2_title, 'Fast RFQ Turnaround');
  const feature2Desc = safeRender(fields.feature_2_desc, 'Dedicated trade desk providing prompt price quotations, stock availability checks, and valid commercial validity windows.');

  const feature3Title = safeRender(fields.feature_3_title, 'Project Stock Allocation');
  const feature3Desc = safeRender(fields.feature_3_desc, 'Hold and secure hardware inventory for scheduled project rollouts, tenders, and multi-stage corporate deliveries.');

  const feature4Title = safeRender(fields.feature_4_title, 'Direct UAE & Regional Delivery');
  const feature4Desc = safeRender(fields.feature_4_desc, 'Flexible delivery options across Dubai, Abu Dhabi, and Northern Emirates, including direct site delivery for integrators.');

  const feature5Title = safeRender(fields.feature_5_title, 'Export & Customs Documentation');
  const feature5Desc = safeRender(fields.feature_5_desc, 'Support with Certificate of Origin, Dubai Chamber attestation, and export paperwork for regional shipments across the GCC.');

  const feature6Title = safeRender(fields.feature_6_title, 'Structured Commercial Terms');
  const feature6Desc = safeRender(fields.feature_6_desc, 'Flexible payment options and commercial terms available for verified corporate clients and established reseller partners.');

  return (
    <section className="relative w-full bg-white text-gray-900 py-20 lg:py-28 overflow-hidden border-b border-gray-100">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#16CA9A]/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16CA9A]/10 text-[#0F9F78] text-xs sm:text-sm font-bold tracking-wide uppercase font-urbanist mb-4">
            <HiOutlineCubeTransparent className="w-4 h-4 text-[#16CA9A]" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-montserrat tracking-tight leading-tight mb-5">
            {safeRender(fields.heading, "Wholesale IT Hardware Supply for Resellers & Integrators")}
          </h2>

          <div className="w-20 h-1.5 bg-[#16CA9A] mx-auto rounded-full mb-6" />

          <p className="text-base sm:text-lg text-gray-600 font-roboto leading-relaxed">
            {safeRender(
              fields.paragraph,
              "Crown Excel operates wholesale technology distribution services in Dubai, supplying IT traders, system integrators, corporate buyers, and retail partners across the UAE, GCC, and regional export markets with authentic equipment."
            )}
          </p>
        </div>

        {/* Highlight Grid & Visual Showcase */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left: 6 Wholesale Benefit Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-[#16CA9A] hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#16CA9A]/15 text-[#16CA9A] flex items-center justify-center mb-4">
                <HiOutlineCurrencyDollar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 font-montserrat mb-2">
                {feature1Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-roboto leading-relaxed">
                {feature1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-[#16CA9A] hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-cyan-600 flex items-center justify-center mb-4">
                <HiOutlineClock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 font-montserrat mb-2">
                {feature2Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-roboto leading-relaxed">
                {feature2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-[#16CA9A] hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-4">
                <HiOutlineLockClosed className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 font-montserrat mb-2">
                {feature3Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-roboto leading-relaxed">
                {feature3Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-[#16CA9A] hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#16CA9A]/15 text-[#16CA9A] flex items-center justify-center mb-4">
                <HiOutlineTruck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 font-montserrat mb-2">
                {feature4Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-roboto leading-relaxed">
                {feature4Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-[#16CA9A] hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-purple-500/15 text-purple-600 flex items-center justify-center mb-4">
                <HiOutlineDocumentText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 font-montserrat mb-2">
                {feature5Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-roboto leading-relaxed">
                {feature5Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-[#16CA9A] hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-4">
                <HiOutlineCheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 font-montserrat mb-2">
                {feature6Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-roboto leading-relaxed">
                {feature6Desc}
              </p>
            </div>

          </div>

          {/* Right: Visual Card with Wholesale Details */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-gray-50 border border-gray-200/80 p-6 sm:p-8 shadow-xl">
              
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 border border-gray-200 group">
                <Image
                  src={wholesaleImg}
                  alt="Crown Excel Bulk IT Hardware Warehousing Dubai"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-gray-900 border border-white/60 shadow-sm">
                  Dubai Wholesale Distribution
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-montserrat mb-3">
                Source Volume IT Hardware for Tenders & Resale
              </h3>

              <p className="text-sm text-gray-600 font-roboto leading-relaxed mb-6">
                Our wholesale desk collaborates directly with regional IT resellers, system integrators, and procurement officers to prepare competitive commercial quotes and stock allocations.
              </p>

              <button
                type="button"
                onClick={() => onOpenInquiry('Wholesale Reseller Inquiry / Bulk Pricing')}
                className="w-full inline-flex items-center justify-center py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-[#16CA9A] hover:bg-[#14b589] shadow-md shadow-[#16CA9A]/20 transition-all cursor-pointer"
              >
                <span>Inquire for Wholesale Reseller Pricing</span>
                <HiArrowRight className="ml-2 w-5 h-5" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
