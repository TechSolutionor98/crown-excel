'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { HiOutlineBadgeCheck, HiOutlineSparkles } from 'react-icons/hi';
import { safeRender } from '@/lib/safe-html';

import DellLogo from '@/Components/Images/dell (1).png';
import HPLogo from '@/Components/Images/hp (1).png';
import LenovoLogo from '@/Components/Images/lenovo (1).png';
import IntelLogo from '@/Components/Images/intell.png';
import AmdLogo from '@/Components/Images/amdd.png';
import AppleLogo from '@/Components/Images/apple (3).png';
import AsusLogo from '@/Components/Images/asus (1).png';
import AcerLogo from '@/Components/Images/acer (2).png';
import MicrosoftLogo from '@/Components/Images/microsof.png';
import SamsungLogo from '@/Components/Images/samsung (1).png';
import LogitechLogo from '@/Components/Images/logitech.png';
import KingstonLogo from '@/Components/Images/Kingston.png';
import CrucialLogo from '@/Components/Images/crucial.png';
import BrotherLogo from '@/Components/Images/brother.png';
import CanonLogo from '@/Components/Images/canon.png';
import EpsonLogo from '@/Components/Images/epson.png';
import XeroxLogo from '@/Components/Images/Xerox.png';
import TpLinkLogo from '@/Components/Images/tp link.png';
import BenqLogo from '@/Components/Images/benq.png';
import ViewSonicLogo from '@/Components/Images/view sonic.png';
import RicohLogo from '@/Components/Images/ricoh.png';
import DahuaLogo from '@/Components/Images/adhua.png';

export default function ITHardwareBrands({ cmsData, onOpenInquiry }) {
  const fields = cmsData?.fields || cmsData || {};

  const eyebrow = safeRender(fields.eyebrow, 'GLOBAL TECHNOLOGY PARTNERS');
  const heading = safeRender(fields.heading, 'World-Class Brands We Distribute');
  const description = safeRender(
    fields.paragraph,
    'Crown Excel maintains direct supply channels with the world’s foremost technology brands. All distributed equipment is 100% authentic, factory-sealed, serialized, and backed by comprehensive manufacturer warranty across the UAE and GCC.'
  );

  const [activeTier, setActiveTier] = useState('all');

  const brands = useMemo(() => [
    { name: 'HPE / HP', category: 'compute', specialization: 'ProLiant Servers, EliteBooks, Z-Workstations & LaserJets', logo: HPLogo },
    { name: 'Dell Technologies', category: 'compute', specialization: 'PowerEdge Servers, PowerVault, Latitude, OptiPlex & Precision', logo: DellLogo },
    { name: 'Lenovo', category: 'compute', specialization: 'ThinkSystem Servers, ThinkPad, ThinkCentre & All-in-Ones', logo: LenovoLogo },
    { name: 'Apple', category: 'endpoints', specialization: 'MacBook Pro, MacBook Air, Mac Studio, Mac Mini & iPad Pro', logo: AppleLogo },
    { name: 'Intel', category: 'compute', specialization: 'Xeon Scalable, Core Ultra Processors, Optane & Enterprise NUCs', logo: IntelLogo },
    { name: 'AMD', category: 'compute', specialization: 'EPYC Server Processors, Ryzen Pro & Radeon Pro GPUs', logo: AmdLogo },
    { name: 'Microsoft', category: 'endpoints', specialization: 'Surface Pro For Business, Windows Server & Commercial Licensing', logo: MicrosoftLogo },
    { name: 'ASUS', category: 'endpoints', specialization: 'ExpertBook Commercial Laptops, ProArt Displays & Motherboards', logo: AsusLogo },
    { name: 'Acer', category: 'endpoints', specialization: 'TravelMate Enterprise Portables, Veriton Desktops & Monitors', logo: AcerLogo },
    { name: 'Samsung', category: 'endpoints', specialization: 'Enterprise NVMe SSDs, Commercial Displays & Tablets', logo: SamsungLogo },
    { name: 'TP-Link', category: 'networking', specialization: 'Omada Enterprise Switches, Access Points & SafeStream Routers', logo: TpLinkLogo },
    { name: 'Logitech', category: 'endpoints', specialization: 'Rally Bar Video Conferencing, MX Keys & Ergonomic Peripherals', logo: LogitechLogo },
    { name: 'Kingston', category: 'compute', specialization: 'Server Premier DDR5 RAM, Industrial SSDs & Encrypted Drives', logo: KingstonLogo },
    { name: 'Crucial', category: 'compute', specialization: 'Micron Enterprise Memory, Pro DDR5 & Gen5 NVMe Storage', logo: CrucialLogo },
    { name: 'Canon', category: 'printing', specialization: 'imageRUNNER ADVANCE Copiers, MAXIFY & Document Scanners', logo: CanonLogo },
    { name: 'Xerox', category: 'printing', specialization: 'AltaLink, VersaLink Enterprise Multifunction Printers', logo: XeroxLogo },
    { name: 'Brother', category: 'printing', specialization: 'High-Speed Commercial Laser Printers & Labeling Solutions', logo: BrotherLogo },
    { name: 'Epson', category: 'printing', specialization: 'WorkForce Enterprise Heat-Free Printers & Pro Projectors', logo: EpsonLogo },
    { name: 'Ricoh', category: 'printing', specialization: 'Production Printing, Digital Copiers & Interactive Displays', logo: RicohLogo },
    { name: 'BenQ', category: 'endpoints', specialization: 'Corporate Interactive Touch Panels & High-Lumen Projectors', logo: BenqLogo },
    { name: 'ViewSonic', category: 'endpoints', specialization: 'ViewBoard Displays, Commercial Monitors & Docking Screens', logo: ViewSonicLogo },
    { name: 'Dahua', category: 'networking', specialization: 'Network Video Surveillance, AI Cameras & Commercial NVRs', logo: DahuaLogo },
  ], []);

  const filteredBrands = useMemo(() => {
    if (activeTier === 'all') return brands;
    return brands.filter((b) => b.category === activeTier);
  }, [brands, activeTier]);

  return (
    <section className="relative w-full bg-white text-gray-900 py-20 lg:py-28 overflow-hidden border-b border-gray-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16CA9A]/10 text-[#0F9F78] text-xs sm:text-sm font-bold tracking-wide uppercase font-urbanist mb-4">
            <HiOutlineSparkles className="w-4 h-4 text-[#16CA9A]" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-montserrat tracking-tight leading-tight mb-5">
            {heading}
          </h2>

          <div className="w-20 h-1.5 bg-[#16CA9A] mx-auto rounded-full mb-6" />

          <p className="text-base sm:text-lg text-gray-600 font-roboto leading-relaxed">
            {description}
          </p>

          {/* Tier Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              type="button"
              onClick={() => setActiveTier('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTier === 'all'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Brands ({brands.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTier('compute')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTier === 'compute'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Servers & Compute
            </button>
            <button
              type="button"
              onClick={() => setActiveTier('endpoints')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTier === 'endpoints'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Laptops & Workstations
            </button>
            <button
              type="button"
              onClick={() => setActiveTier('networking')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTier === 'networking'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Networking & Security
            </button>
            <button
              type="button"
              onClick={() => setActiveTier('printing')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTier === 'printing'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Commercial Printing
            </button>
          </div>
        </div>

        {/* Brands Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {filteredBrands.map((brand, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-gray-50 hover:bg-white border border-gray-200/80 hover:border-[#16CA9A] hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="relative w-28 h-14 flex items-center justify-center mb-3">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} official IT hardware distributor`}
                  className="max-h-12 w-auto object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 font-montserrat group-hover:text-[#16CA9A] transition-colors mb-1">
                {brand.name}
              </h3>
              <p className="text-[11px] text-gray-500 line-clamp-2 leading-tight">
                {brand.specialization}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Guarantee Badge Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-gray-50 via-teal-50/40 to-gray-50 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#16CA9A]/15 text-[#16CA9A] flex items-center justify-center flex-shrink-0">
              <HiOutlineBadgeCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-gray-900 font-montserrat">
                100% Genuine Certified Hardware Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 font-roboto">
                Every unit shipped from Crown Excel carries factory serial numbers verifiable through official vendor portals.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenInquiry('Brand Distribution & Stock Inquiries')}
            className="flex-shrink-0 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gray-900 hover:bg-[#16CA9A] hover:text-gray-950 transition-all cursor-pointer"
          >
            Inquire Brand Pricing
          </button>
        </div>

      </div>
    </section>
  );
}
