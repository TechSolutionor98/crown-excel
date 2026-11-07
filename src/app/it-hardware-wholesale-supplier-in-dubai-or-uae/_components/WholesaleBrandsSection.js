import React from 'react';
import Image from 'next/image';

import AcerLogo from '@/Components/Images/acer (2).png';
import AppleLogo from '@/Components/Images/apple (3).png';
import AsusLogo from '@/Components/Images/asus (1).png';
import CrownyxLogo from '@/Components/Images/crownyx.png';
import DellLogo from '@/Components/Images/dell (1).png';
import HPLogo from '@/Components/Images/hp.png';
import LenovoLogo from '@/Components/Images/lenovo (1).png';
import MicrosoftLogo from '@/Components/Images/microsof.png';
import MsiLogo from '@/Components/Images/msi (1).png';

const brandLogos = [
  { name: 'Acer', logo: AcerLogo },
  { name: 'Apple', logo: AppleLogo, scaleClass: 'scale-[1.7]', hoverScaleClass: 'group-hover:scale-[1.78]' },
  { name: 'ASUS', logo: AsusLogo },
  { name: 'Crownyx', logo: CrownyxLogo, scaleClass: 'scale-[1.45]', hoverScaleClass: 'group-hover:scale-[1.52]' },
  { name: 'Dell', logo: DellLogo },
  { name: 'HP', logo: HPLogo, scaleClass: 'scale-[1.7]', hoverScaleClass: 'group-hover:scale-[1.78]' },
  { name: 'Lenovo', logo: LenovoLogo },
  { name: 'Microsoft', logo: MicrosoftLogo },
  { name: 'MSI', logo: MsiLogo, scaleClass: 'scale-[1.7]', hoverScaleClass: 'group-hover:scale-[1.78]' },
];

export default function WholesaleBrandsSection() {
  // Repeating the 8 brands twice in each track (16 items per track) guarantees seamless continuous scrolling across any screen width
  const brandSequence = [...brandLogos, ...brandLogos];

  return (
    <div className="w-full relative overflow-hidden py-3 sm:py-4" id="brands-we-deal">
      {/* Inline styles guarantee continuous right-to-left scrolling on a single line regardless of bundler */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marqueeScrollLeft {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .brand-marquee-track {
              display: flex !important;
              flex-direction: row !important;
              flex-wrap: nowrap !important;
              width: max-content !important;
              animation: marqueeScrollLeft 26s linear infinite !important;
              will-change: transform;
            }
            .brand-marquee-track:hover {
              animation-play-state: paused !important;
            }
            @media (prefers-reduced-motion: reduce) {
              .brand-marquee-track {
                animation: none !important;
              }
            }
          `,
        }}
      />

      {/* Continuously Scrolling Track Moving Right to Left on a Single Line */}
      <div
        className="brand-marquee-track flex flex-row flex-nowrap w-max select-none"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          width: 'max-content',
        }}
      >
        {/* Track 1 */}
        <div className="flex flex-row flex-nowrap items-center gap-8 sm:gap-12 lg:gap-14 pr-8 sm:pr-12 lg:pr-14 shrink-0">
          {brandSequence.map((brand, idx) => (
            <div
              key={`t1-${brand.name}-${idx}`}
              className="flex flex-col items-center justify-center shrink-0 w-[115px] sm:w-[135px] lg:w-[145px] p-2 sm:p-2.5 rounded-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="w-full h-12 sm:h-14 lg:h-15 flex items-center justify-center mb-1.5 sm:mb-2">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} official laptop brand logo`}
                  width={140}
                  height={70}
                  className={`max-h-8 sm:max-h-10 lg:max-h-11 max-w-[85px] sm:max-w-[105px] lg:max-w-[115px] w-auto h-auto object-contain transition-transform duration-300 ${
                    brand.scaleClass
                      ? `${brand.scaleClass} ${brand.hoverScaleClass || 'group-hover:scale-110'}`
                      : 'group-hover:scale-105'
                  }`}
                />
              </div>
              <span className="text-gray-900 font-montserrat font-bold text-sm sm:text-[14px] tracking-wide text-center leading-none group-hover:text-[#147A5F] transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* Track 2 (Identical duplicate for seamless 50% loop) */}
        <div
          className="flex flex-row flex-nowrap items-center gap-8 sm:gap-12 lg:gap-14 pr-8 sm:pr-12 lg:pr-14 shrink-0"
          aria-hidden="true"
        >
          {brandSequence.map((brand, idx) => (
            <div
              key={`t2-${brand.name}-${idx}`}
              className="flex flex-col items-center justify-center shrink-0 w-[115px] sm:w-[135px] lg:w-[145px] p-2 sm:p-2.5 rounded-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="w-full h-12 sm:h-14 lg:h-15 flex items-center justify-center mb-1.5 sm:mb-2">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} official laptop brand logo`}
                  width={140}
                  height={70}
                  className={`max-h-8 sm:max-h-10 lg:max-h-11 max-w-[85px] sm:max-w-[105px] lg:max-w-[115px] w-auto h-auto object-contain transition-transform duration-300 ${
                    brand.scaleClass
                      ? `${brand.scaleClass} ${brand.hoverScaleClass || 'group-hover:scale-110'}`
                      : 'group-hover:scale-105'
                  }`}
                />
              </div>
              <span className="text-gray-900 font-montserrat font-bold text-sm sm:text-[14px] tracking-wide text-center leading-none group-hover:text-[#147A5F] transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
