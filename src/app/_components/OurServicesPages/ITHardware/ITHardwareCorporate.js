'use client';

import React from 'react';
import Image from 'next/image';
import { 
  HiOutlineBriefcase, 
  HiOutlineDesktopComputer, 
  HiOutlineServer, 
  HiOutlineSupport, 
  HiOutlineRefresh, 
  HiOutlineKey, 
  HiOutlineShieldCheck,
  HiArrowRight 
} from 'react-icons/hi';
import { safeRender } from '@/lib/safe-html';

export default function ITHardwareCorporate({ cmsData, onOpenInquiry }) {
  const fields = cmsData?.fields || cmsData || {};

  const eyebrow = safeRender(fields.eyebrow, 'ENTERPRISE HARDWARE PROCUREMENT');

  const solution1Title = safeRender(fields.solution_1_title, 'Corporate Fleet Rollouts');
  const solution1Desc = safeRender(fields.solution_1_desc, 'Bulk provisioning of standardized commercial laptops, desktops, and monitors with custom corporate OS imaging, BIOS hardening, and barcode asset tagging.');

  const solution2Title = safeRender(fields.solution_2_title, 'Server Room & Data Center Staging');
  const solution2Desc = safeRender(fields.solution_2_desc, 'Server rack mounting, component staging (RAM/SSD upgrades, RAID array initialization), structured cabling integration, and UPS power configuration.');

  const solution3Title = safeRender(fields.solution_3_title, 'Hardware Maintenance & AMC Support');
  const solution3Desc = safeRender(fields.solution_3_desc, 'Annual Maintenance Contracts (AMC) with scheduled hardware health audits, preventive maintenance, and priority replacement SLA for mission-critical systems.');

  const solution4Title = safeRender(fields.solution_4_title, 'IT Asset Disposition (ITAD) & Trade-In');
  const solution4Desc = safeRender(fields.solution_4_desc, 'Secure data wiping, compliant disposal of legacy IT assets, and corporate trade-in credits to offset new hardware procurement budgets.');

  const solution5Title = safeRender(fields.solution_5_title, 'Software & OS Licensing Bundling');
  const solution5Desc = safeRender(fields.solution_5_desc, 'Authentic Microsoft Windows 11 Pro, Windows Server, VMware vSphere, and commercial endpoint security software bundled directly with hardware shipments.');

  const solution6Title = safeRender(fields.solution_6_title, 'Dedicated Spares & Buffer Inventory');
  const solution6Desc = safeRender(fields.solution_6_desc, 'Reserved local buffer stock for corporate clients, ensuring replacement power supplies, storage drives, and components are ready for same-day delivery.');

  return (
    <section className="relative w-full bg-gray-50 text-gray-900 py-20 lg:py-28 overflow-hidden border-b border-gray-200/80">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16CA9A]/10 text-[#0F9F78] text-xs sm:text-sm font-bold tracking-wide uppercase font-urbanist mb-4">
            <HiOutlineBriefcase className="w-4 h-4 text-[#16CA9A]" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-montserrat tracking-tight leading-tight mb-5">
            {safeRender(fields.heading, "B2B & Corporate IT Solutions Tailored for Scalability")}
          </h2>

          <div className="w-20 h-1.5 bg-[#16CA9A] mx-auto rounded-full mb-6" />

          <p className="text-base sm:text-lg text-gray-600 font-roboto leading-relaxed">
            {safeRender(
              fields.paragraph,
              "Crown Excel delivers end-to-end hardware procurement and staging services for businesses in Dubai and the UAE. We support corporate IT departments with standardized fleet rollouts, server room installations, hardware lifecycle support, and dedicated B2B account management."
            )}
          </p>
        </div>

        {/* 6 Solution Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          <div className="p-8 rounded-2xl bg-white border border-gray-200/80 hover:border-[#16CA9A] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#16CA9A]/15 text-[#16CA9A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineDesktopComputer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-montserrat mb-3 group-hover:text-[#16CA9A] transition-colors">
                {solution1Title}
              </h3>
              <p className="text-sm text-gray-600 font-roboto leading-relaxed mb-6">
                {solution1Desc}
              </p>
            </div>
            <div className="text-xs font-bold text-[#16CA9A] flex items-center gap-1">
              <span>Standardized Deployment</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-200/80 hover:border-cyan-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineServer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-montserrat mb-3 group-hover:text-cyan-600 transition-colors">
                {solution2Title}
              </h3>
              <p className="text-sm text-gray-600 font-roboto leading-relaxed mb-6">
                {solution2Desc}
              </p>
            </div>
            <div className="text-xs font-bold text-cyan-600 flex items-center gap-1">
              <span>Server Staging & Cabling</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-200/80 hover:border-amber-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineSupport className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-montserrat mb-3 group-hover:text-amber-600 transition-colors">
                {solution3Title}
              </h3>
              <p className="text-sm text-gray-600 font-roboto leading-relaxed mb-6">
                {solution3Desc}
              </p>
            </div>
            <div className="text-xs font-bold text-amber-600 flex items-center gap-1">
              <span>Comprehensive Maintenance</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-200/80 hover:border-purple-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineRefresh className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-montserrat mb-3 group-hover:text-purple-600 transition-colors">
                {solution4Title}
              </h3>
              <p className="text-sm text-gray-600 font-roboto leading-relaxed mb-6">
                {solution4Desc}
              </p>
            </div>
            <div className="text-xs font-bold text-purple-600 flex items-center gap-1">
              <span>Secure Sanitization & Trade-In</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-200/80 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineKey className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-montserrat mb-3 group-hover:text-blue-600 transition-colors">
                {solution5Title}
              </h3>
              <p className="text-sm text-gray-600 font-roboto leading-relaxed mb-6">
                {solution5Desc}
              </p>
            </div>
            <div className="text-xs font-bold text-blue-600 flex items-center gap-1">
              <span>Genuine Enterprise Licenses</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-gray-200/80 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-montserrat mb-3 group-hover:text-emerald-600 transition-colors">
                {solution6Title}
              </h3>
              <p className="text-sm text-gray-600 font-roboto leading-relaxed mb-6">
                {solution6Desc}
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <span>Local Dubai Stock Buffers</span>
            </div>
          </div>

        </div>

        {/* Corporate Consultation CTA Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/80 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-montserrat text-gray-900 mb-2">
              Plan Your Corporate IT Hardware Refresh with Crown Excel
            </h3>
            <p className="text-sm sm:text-base text-gray-600 font-roboto">
              Consult with our technology procurement specialists to prepare standardized bills of materials, volume price schedules, and staged delivery timelines.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenInquiry('Corporate IT Procurement Consultation')}
            className="flex-shrink-0 inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#16CA9A] hover:bg-[#14b589] shadow-md shadow-[#16CA9A]/20 transition-all cursor-pointer"
          >
            <span>Book Corporate Consultation</span>
            <HiArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
