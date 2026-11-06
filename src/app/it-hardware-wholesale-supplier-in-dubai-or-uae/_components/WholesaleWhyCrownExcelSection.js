import React from 'react';
import { FaHandshake, FaCreditCard, FaLaptop, FaGlobeAmericas } from 'react-icons/fa';

export default function WholesaleWhyCrownExcelSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="why-crown-excel">
      <div className="max-w-7xl mx-auto px-6">
        {/* Centered Heading and Subparagraph matching Reference Theme */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2
            className="font-anton font-normal uppercase text-center text-3xl sm:text-4xl lg:text-[46px] tracking-[-0.035em] leading-[1.05]"
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontWeight: 400,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              textTransform: 'uppercase',
            }}
          >
            <span className="block not-italic text-[#171717]">
              WHY{' '}
              <span className="text-[#147A5F] italic" style={{ fontStyle: 'italic' }}>
                CROWN EXCEL
              </span>
            </span>
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4b5563] font-inter leading-relaxed max-w-3xl mx-auto text-center mt-5 mb-16">
            Businesses rely on Crown Excel as a trusted IT hardware distributor delivering scalable, secure, and high-performance solutions across the Middle East. Our future-ready distribution model ensures seamless access, operational efficiency, and reliability, empowering businesses to stay competitive in today&apos;s tech-driven landscape.
          </p>
        </div>

        {/* 5 Connected Features with Alternating Curved Dashed Wave Line */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop SVG Sinusoidal Dashed Wave Line for 5 items */}
          <div className="hidden lg:block absolute inset-x-0 top-0 h-[280px] pointer-events-none z-0">
            <svg
              viewBox="0 0 1120 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 165 C 56 10, 168 10, 224 165 C 280 270, 392 270, 448 165 C 504 10, 616 10, 672 165 C 728 270, 840 270, 896 165 C 952 10, 1064 10, 1120 165"
                stroke="#147A5F"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 5 Feature Items */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-x-3 sm:gap-x-4 gap-y-8 sm:gap-10 lg:gap-0 relative z-10 text-center h-auto lg:h-[280px]">
            {/* Item 1 - Arch over top */}
            <div className="flex flex-col items-center justify-center px-1 sm:px-2 lg:px-3">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 sm:w-12 sm:h-12 text-[#147A5F] mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110"
              >
                <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.2 4.15 2.97 5.19L6.5 21.5l5.5-2.5 5.5 2.5-2.47-8.31C16.8 12.15 18 10.21 18 8c0-3.31-2.69-6-6-6zm0 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
              </svg>
              <h3 className="text-[13.5px] sm:text-[16px] lg:text-[17px] font-bold font-montserrat text-[#2D2D2D] leading-snug mb-1.5 sm:mb-2">
                16 Years of<br />Market Experience
              </h3>
              <p className="text-[11px] sm:text-[12px] text-[#6b7280] font-inter leading-relaxed max-w-[155px] sm:max-w-[185px] mx-auto">
                Established presence in Dubai with trusted vendor relationships and industry expertise.
              </p>
            </div>

            {/* Item 2 - Bowl under bottom */}
            <div className="flex flex-col items-center justify-center px-1 sm:px-2 lg:px-3">
              <FaCreditCard className="w-10 h-10 sm:w-12 sm:h-12 text-[#147A5F] mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="text-[13.5px] sm:text-[16px] lg:text-[17px] font-bold font-montserrat text-[#2D2D2D] leading-snug mb-1.5 sm:mb-2">
                Competitive Wholesale<br />&amp; Export Pricing
              </h3>
              <p className="text-[11px] sm:text-[12px] text-[#6b7280] font-inter leading-relaxed max-w-[155px] sm:max-w-[185px] mx-auto">
                Tiered volume rates designed to safeguard profit margins for resellers and traders.
              </p>
            </div>

            {/* Item 3 - Arch over top */}
            <div className="flex flex-col items-center justify-center px-1 sm:px-2 lg:px-3">
              <FaLaptop className="w-10 h-10 sm:w-12 sm:h-12 text-[#147A5F] mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="text-[13.5px] sm:text-[16px] lg:text-[17px] font-bold font-montserrat text-[#2D2D2D] leading-snug mb-1.5 sm:mb-2">
                Multiple Brands &amp;<br />Wide Selection
              </h3>
              <p className="text-[11px] sm:text-[12px] text-[#6b7280] font-inter leading-relaxed max-w-[155px] sm:max-w-[185px] mx-auto font-medium text-[#147A5F]">
                (Lenovo, HP, Dell, ASUS, Acer)
              </p>
            </div>

            {/* Item 4 - Bowl under bottom */}
            <div className="flex flex-col items-center justify-center px-1 sm:px-2 lg:px-3">
              <FaHandshake className="w-10 h-10 sm:w-12 sm:h-12 text-[#147A5F] mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="text-[13.5px] sm:text-[16px] lg:text-[17px] font-bold font-montserrat text-[#2D2D2D] leading-snug mb-1.5 sm:mb-2">
                Reliable Sourcing<br />&amp; Supply
              </h3>
              <p className="text-[11px] sm:text-[12px] text-[#6b7280] font-inter leading-relaxed max-w-[155px] sm:max-w-[185px] mx-auto">
                Direct authorized channels with verified serials and factory-sealed warranties.
              </p>
            </div>

            {/* Item 5 - Arch over top */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1 flex flex-col items-center justify-center px-1 sm:px-2 lg:px-3 max-w-[200px] sm:max-w-[240px] lg:max-w-none mx-auto">
              <FaGlobeAmericas className="w-10 h-10 sm:w-12 sm:h-12 text-[#147A5F] mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="text-[13.5px] sm:text-[16px] lg:text-[17px] font-bold font-montserrat text-[#2D2D2D] leading-snug mb-1.5 sm:mb-2">
                Dubai-Based Global<br />Export Support
              </h3>
              <p className="text-[11px] sm:text-[12px] text-[#6b7280] font-inter leading-relaxed max-w-[155px] sm:max-w-[185px] mx-auto">
                Bur Dubai distribution center with fast logistics across the UAE, GCC, and worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
