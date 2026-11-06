'use client';

import React from 'react';
import { 
  HiOutlinePhone, 
  HiOutlineMail, 
  HiOutlineLocationMarker, 
  HiOutlineDocumentText,
  HiArrowRight
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { safeRender } from '@/lib/safe-html';

export default function ITHardwareCTA({ cmsData, onOpenInquiry, onWhatsApp }) {
  const fields = cmsData?.fields || cmsData || {};

  const eyebrow = safeRender(fields.eyebrow, 'GET IN TOUCH WITH OUR WHOLESALE DESK');

  const phone = safeRender(fields.phone, '+971 4-354 0566');
  const whatsappPhone = safeRender(fields.whatsapp_phone, '+971 54 309 0680');
  const email = safeRender(fields.email, 'contact@crownexcel.com');
  const address = safeRender(fields.address, 'Al Jahra Building, 2nd floor, 18th St - Al Raffa - Dubai, UAE');

  const btn1Text = safeRender(fields.button_1_text, 'Request a Custom Quotation');
  const btn2Text = safeRender(fields.button_2_text, 'Chat on WhatsApp');

  return (
    <section className="relative w-full bg-white text-gray-900 py-16 lg:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Card */}
        <div className="relative rounded-3xl bg-[#0F172A] text-white p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden text-center">
          
          {/* Ambient subtle glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#16CA9A]/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#16CA9A]/30 text-[#16CA9A] text-xs sm:text-sm font-bold tracking-wide uppercase font-urbanist mb-6">
              <HiOutlineDocumentText className="w-4 h-4 text-[#16CA9A]" />
              <span>{eyebrow}</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-montserrat tracking-tight leading-tight mb-6">
              {safeRender(fields.heading, "Ready to Source Your IT Hardware with Crown Excel?")}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 font-roboto leading-relaxed mb-10">
              {safeRender(
                fields.paragraph,
                "Whether you require server infrastructure for a corporate deployment, commercial laptops for an enterprise fleet, or wholesale pricing for ongoing reseller bids, our Dubai distribution desk is ready to assist with rapid stock verification and formal price quotes."
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="group inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-gray-950 bg-[#16CA9A] hover:bg-[#19E4AE] shadow-xl shadow-[#16CA9A]/25 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{btn1Text}</span>
                <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onWhatsApp}
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#16CA9A]/50 backdrop-blur-sm transition-all duration-300 cursor-pointer"
              >
                <FaWhatsapp className="mr-2.5 w-5 h-5 text-[#25D366]" />
                <span>{btn2Text}</span>
              </button>
            </div>

            {/* 4 Contact Channels */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-white/10 text-left">
              
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-2.5 text-[#16CA9A] text-xs font-bold uppercase tracking-wider mb-1.5">
                  <HiOutlinePhone className="w-4 h-4" />
                  <span>Telephone</span>
                </div>
                <a href={`tel:${phone}`} className="text-sm font-semibold text-white hover:text-[#16CA9A] transition-colors block">
                  {phone}
                </a>
                <span className="text-[11px] text-gray-400">Direct B2B Hotline</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-2.5 text-[#25D366] text-xs font-bold uppercase tracking-wider mb-1.5">
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp</span>
                </div>
                <button
                  type="button"
                  onClick={onWhatsApp}
                  className="text-sm font-semibold text-white hover:text-[#25D366] transition-colors block text-left cursor-pointer"
                >
                  {whatsappPhone}
                </button>
                <span className="text-[11px] text-gray-400">Instant Quotes & RFQ</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                  <HiOutlineMail className="w-4 h-4" />
                  <span>Email BOM / RFQ</span>
                </div>
                <a href={`mailto:${email}`} className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors block truncate">
                  {email}
                </a>
                <span className="text-[11px] text-gray-400">Commercial Inquiries</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                  <HiOutlineLocationMarker className="w-4 h-4" />
                  <span>Distribution Office</span>
                </div>
                <p className="text-xs text-gray-300 leading-snug line-clamp-2">
                  {address}
                </p>
                <span className="text-[11px] text-gray-400">Bur Dubai, United Arab Emirates</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
