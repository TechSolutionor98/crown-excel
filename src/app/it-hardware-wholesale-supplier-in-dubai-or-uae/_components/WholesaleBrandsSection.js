import React from 'react';
import Image from 'next/image';

import DellLogo from '@/Components/Images/dell (1).png';
import HPLogo from '@/Components/Images/hp.png';
import LenovoLogo from '@/Components/Images/lenovo (1).png';
import AppleLogo from '@/Components/Images/apple (3).png';
import AsusLogo from '@/Components/Images/asus (1).png';
import AcerLogo from '@/Components/Images/acer (2).png';
import MsiLogo from '@/Components/Images/msi (1).png';
import MicrosoftLogo from '@/Components/Images/microsof.png';

const brandLogos = [
  { name: 'Dell', logo: DellLogo },
  { name: 'HP', logo: HPLogo },
  { name: 'Lenovo', logo: LenovoLogo },
  { name: 'Apple', logo: AppleLogo },
  { name: 'ASUS', logo: AsusLogo },
  { name: 'Acer', logo: AcerLogo },
  { name: 'MSI', logo: MsiLogo },
  { name: 'Microsoft', logo: MicrosoftLogo },
];

export default function WholesaleBrandsSection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-100" id="brands-we-deal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#147A5F] mb-2 block font-montserrat">
            Authorized Distribution & Sourcing
          </span>
          <h2
            className="font-anton font-normal uppercase text-center text-2xl sm:text-3xl lg:text-[38px] tracking-[-0.035em] leading-[1.08] text-[#171717] mt-1"
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontWeight: 400,
              letterSpacing: '-0.035em',
              lineHeight: 1.08,
              textTransform: 'uppercase',
            }}
          >
            Top Laptop Brands Distributed Across Dubai & UAE
          </h2>
        </div>

        {/* 8 Official Laptop Brand Logos on Clean Transparent Background */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5 lg:gap-6 items-center justify-items-center w-full max-w-7xl mx-auto">
          {brandLogos.map((brand) => (
            <div
              key={brand.name}
              className="w-full flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl hover:bg-gray-50/80 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-full h-14 sm:h-16 flex items-center justify-center mb-2 sm:mb-2.5">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} official laptop brand logo`}
                  width={140}
                  height={70}
                  className="max-h-9 sm:max-h-11 lg:max-h-12 max-w-[95px] sm:max-w-[110px] lg:max-w-[120px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-gray-900 font-montserrat font-bold text-xs sm:text-[13px] tracking-wide text-center leading-none group-hover:text-[#147A5F] transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
