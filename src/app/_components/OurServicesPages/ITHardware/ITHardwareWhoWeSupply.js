'use client';

import React from 'react';
import { 
  HiOutlineUserGroup, 
  HiOutlineOfficeBuilding, 
  HiOutlineAcademicCap, 
  HiOutlineLibrary, 
  HiOutlineShoppingCart, 
  HiOutlineCloud,
  HiOutlinePlusCircle,
  HiOutlineCurrencyDollar,
  HiArrowRight 
} from 'react-icons/hi';
import { safeRender } from '@/lib/safe-html';

export default function ITHardwareWhoWeSupply({ cmsData, onOpenInquiry }) {
  const fields = cmsData?.fields || cmsData || {};

  const eyebrow = safeRender(fields.eyebrow, 'CLIENTELE & INDUSTRY VERTICALS');

  const verticals = [
    {
      title: 'IT Resellers, Traders & System Integrators',
      desc: 'Bulk wholesale pricing, project stock reservation, local stock availability in Dubai, and flexible delivery for regional IT trade partners.',
      hardware: 'Rack Servers, Managed Switches, Transceivers, Commercial Laptops',
      icon: <HiOutlineUserGroup className="w-6 h-6 text-[#16CA9A]" />,
      badge: 'Wholesale Partner',
    },
    {
      title: 'Corporate Enterprises & Commercial Offices',
      desc: 'Standardized employee computer fleets, commercial ultrabooks, docking monitors, video meeting bars, and secure file storage.',
      hardware: 'Business Laptops, Workstation Desktops, Monitors, Meeting Bars',
      icon: <HiOutlineOfficeBuilding className="w-6 h-6 text-cyan-600" />,
      badge: 'Corporate Fleet',
    },
    {
      title: 'Educational Institutions, Schools & Universities',
      desc: 'High-density computer lab desktop PCs, interactive digital whiteboards, campus-wide Wi-Fi 6 access points, and volume student devices.',
      hardware: 'Lab Desktops, Interactive Displays, Access Points, Laptops',
      icon: <HiOutlineAcademicCap className="w-6 h-6 text-amber-600" />,
      badge: 'Education Bulk',
    },
    {
      title: 'Healthcare Facilities, Clinics & Hospitals',
      desc: 'High-reliability computer systems for electronic health records (EHR), diagnostic-quality monitors, and quiet workstation PCs for clinics.',
      hardware: 'Medical Displays, Compact All-in-Ones, Storage Arrays',
      icon: <HiOutlinePlusCircle className="w-6 h-6 text-emerald-600" />,
      badge: 'Healthcare Sector',
    },
    {
      title: 'Government & Public Sector Entities',
      desc: 'Authentic hardware sourcing through authorized local distributors, full regulatory compliance, and official UAE VAT tax documentation.',
      hardware: 'Rackmount Servers, Encrypted Storage, Enterprise Firewalls',
      icon: <HiOutlineLibrary className="w-6 h-6 text-purple-600" />,
      badge: 'Public Sector',
    },
    {
      title: 'Financial Institutions & Banking',
      desc: 'High-availability servers with redundant power supplies, multi-display workstations for trading and finance, and enterprise network security.',
      hardware: 'Dual-Power Servers, SAN Storage, Dual-Screen Workstations',
      icon: <HiOutlineCurrencyDollar className="w-6 h-6 text-blue-600" />,
      badge: 'Financial Services',
    },
    {
      title: 'Hospitality, Hotels & Retail Chains',
      desc: 'Commercial Point of Sale (POS) terminals, thermal receipt printers, commercial digital signage screens, and secure guest network controllers.',
      hardware: 'POS Terminals, Barcode Scanners, Commercial Displays',
      icon: <HiOutlineShoppingCart className="w-6 h-6 text-teal-600" />,
      badge: 'Retail & Hospitality',
    },
    {
      title: 'Data Centers & Managed Service Providers',
      desc: 'Dense compute rack servers, 10G/40G/100G fiber switches, storage expansion enclosures, and fast-turnaround replacement components.',
      hardware: 'High-Density Compute, Fiber Switches, Storage Shelves',
      icon: <HiOutlineCloud className="w-6 h-6 text-indigo-600" />,
      badge: 'Data Centers',
    },
  ];

  return (
    <section className="relative w-full bg-white text-gray-900 py-20 lg:py-28 overflow-hidden border-b border-gray-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16CA9A]/10 text-[#0F9F78] text-xs sm:text-sm font-bold tracking-wide uppercase font-urbanist mb-4">
            <HiOutlineUserGroup className="w-4 h-4 text-[#16CA9A]" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-montserrat tracking-tight leading-tight mb-5">
            {safeRender(fields.heading, "Who We Supply Across Dubai, UAE & the Middle East")}
          </h2>

          <div className="w-20 h-1.5 bg-[#16CA9A] mx-auto rounded-full mb-6" />

          <p className="text-base sm:text-lg text-gray-600 font-roboto leading-relaxed">
            {safeRender(
              fields.paragraph,
              "Crown Excel provides dedicated IT hardware procurement programs tailored to the compliance, durability, and performance requirements of diverse commercial, enterprise, and institutional sectors."
            )}
          </p>
        </div>

        {/* 8 Industry Vertical Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verticals.map((v, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-[#16CA9A] hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    {v.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm">
                    {v.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 font-montserrat mb-2.5 group-hover:text-[#16CA9A] transition-colors">
                  {v.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 font-roboto leading-relaxed mb-4">
                  {v.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/80">
                <div className="text-[11px] font-medium text-gray-700 mb-3">
                  <span className="font-bold text-[#16CA9A]">Hardware: </span>{v.hardware}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenInquiry(`Inquiry for ${v.title}`)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold text-gray-800 hover:text-white bg-white hover:bg-[#16CA9A] border border-gray-200 hover:border-[#16CA9A] transition-all cursor-pointer shadow-sm"
                >
                  <span>Inquire Sector Solution</span>
                  <HiArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
