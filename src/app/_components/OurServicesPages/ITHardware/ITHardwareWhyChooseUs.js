'use client';

import React from 'react';
import { 
  HiOutlineBadgeCheck, 
  HiOutlineShieldCheck, 
  HiOutlineCurrencyDollar, 
  HiOutlineTruck, 
  HiOutlineUserGroup, 
  HiOutlineSupport,
  HiOutlineGlobeAlt,
  HiOutlineSparkles,
  HiArrowRight 
} from 'react-icons/hi';
import { safeRender } from '@/lib/safe-html';

export default function ITHardwareWhyChooseUs({ cmsData, onOpenInquiry }) {
  const fields = cmsData?.fields || cmsData || {};

  const eyebrow = safeRender(fields.eyebrow, 'THE CROWN EXCEL ADVANTAGE');

  const reasons = [
    {
      title: '15+ Years UAE Market Experience',
      desc: 'Established presence in Dubai with trusted vendor relationships, strong distribution channels, and extensive experience serving regional businesses.',
      icon: <HiOutlineBadgeCheck className="w-6 h-6 text-[#16CA9A]" />,
    },
    {
      title: '100% Genuine & Warrantied Equipment',
      desc: 'Authentic products sourced exclusively through authorized channels, complete with verifiable serial numbers and official local manufacturer warranties.',
      icon: <HiOutlineShieldCheck className="w-6 h-6 text-cyan-600" />,
    },
    {
      title: 'Competitive B2B Wholesale Pricing',
      desc: 'Direct purchasing scale enables competitive commercial rates, safeguarding profit margins for IT dealers and optimizing corporate procurement budgets.',
      icon: <HiOutlineCurrencyDollar className="w-6 h-6 text-amber-600" />,
    },
    {
      title: 'Central Dubai Ready Inventory',
      desc: 'Our distribution hub in Al Raffa, Bur Dubai holds active ready stock of enterprise servers, network switches, and commercial laptops for immediate dispatch.',
      icon: <HiOutlineTruck className="w-6 h-6 text-[#16CA9A]" />,
    },
    {
      title: 'Dedicated Account Managers',
      desc: 'Work with a dedicated trade specialist who understands your business requirements, providing prompt responses and regular order status updates.',
      icon: <HiOutlineUserGroup className="w-6 h-6 text-purple-600" />,
    },
    {
      title: 'Pre-Sales Technical Verification',
      desc: 'Technical consultation to verify part numbers, check hardware compatibility, and provide custom server component staging prior to delivery.',
      icon: <HiOutlineSupport className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'GCC Re-Export & Freight Logistics',
      desc: 'Experienced in international trade documentation, Chamber of Commerce attestation, and reliable road and air freight across the GCC and Africa.',
      icon: <HiOutlineGlobeAlt className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: 'Full UAE Tax Invoicing Compliance',
      desc: 'Commercial operations with official 5% UAE VAT invoices, structured payment terms, and compliant financial documentation for corporate auditing.',
      icon: <HiOutlineSparkles className="w-6 h-6 text-teal-600" />,
    },
  ];

  return (
    <section className="relative w-full bg-gray-50 text-gray-900 py-20 lg:py-28 overflow-hidden border-b border-gray-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16CA9A]/10 text-[#0F9F78] text-xs sm:text-sm font-bold tracking-wide uppercase font-urbanist mb-4">
            <HiOutlineBadgeCheck className="w-4 h-4 text-[#16CA9A]" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-montserrat tracking-tight leading-tight mb-5">
            {safeRender(fields.heading, "Why Leading Businesses Choose Crown Excel as Their IT Hardware Partner")}
          </h2>

          <div className="w-20 h-1.5 bg-[#16CA9A] mx-auto rounded-full mb-6" />

          <p className="text-base sm:text-lg text-gray-600 font-roboto leading-relaxed">
            {safeRender(
              fields.paragraph,
              "For more than 15 years, Crown Excel has served as a reliable technology partner for enterprises, system integrators, and IT resellers across the UAE. Here is what defines our commitment to quality and service."
            )}
          </p>
        </div>

        {/* 8 Differentiator Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reasons.map((r, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-[#16CA9A] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#16CA9A]/10 transition-all">
                  {r.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-montserrat mb-2.5 group-hover:text-[#16CA9A] transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-roboto leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust & Commitment Strip */}
        <div className="rounded-3xl bg-white border border-gray-200/80 p-8 sm:p-10 shadow-lg">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            
            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#16CA9A] font-montserrat mb-1">
                15+ Years
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                UAE Technology Market Presence
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 font-montserrat mb-1">
                Authorized
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Genuine Channel Sourced Hardware
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-montserrat mb-1">
                Dubai Based
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Al Raffa, Bur Dubai Distribution Desk
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-montserrat mb-1">
                Full Warranty
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Official Manufacturer Warranty
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
