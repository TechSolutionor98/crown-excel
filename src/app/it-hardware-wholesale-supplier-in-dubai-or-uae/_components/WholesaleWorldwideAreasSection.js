import React from 'react';
import Image from 'next/image';

const worldwideServiceMarkets = [
  { code: 'sa', name: 'Saudi Arabia', region: 'GCC Hub', hub: 'Riyadh, Jeddah, Dammam', freight: 'Active Customer Market' },
  { code: 'ae', name: 'United Arab Emirates', region: 'Domestic Hub', hub: 'Dubai, Abu Dhabi, Sharjah', freight: 'Active Customer Market' },
  { code: 'kw', name: 'Kuwait', region: 'GCC Hub', hub: 'Kuwait City, Hawalli', freight: 'Active Customer Market' },
  { code: 'qa', name: 'Qatar', region: 'GCC Hub', hub: 'Doha, Al Rayyan', freight: 'Active Customer Market' },
  { code: 'bh', name: 'Bahrain', region: 'GCC Hub', hub: 'Manama, Riffa', freight: 'Active Customer Market' },
  { code: 'om', name: 'Oman', region: 'GCC Hub', hub: 'Muscat, Sohar, Salalah', freight: 'Active Customer Market' },
  { code: 'iq', name: 'Iraq', region: 'Middle East', hub: 'Baghdad, Erbil, Basra', freight: 'Active Customer Market' },
  { code: 'in', name: 'India', region: 'South Asia', hub: 'Mumbai, Delhi, Bengaluru', freight: 'Active Customer Market' },
  { code: 'pk', name: 'Pakistan', region: 'South Asia', hub: 'Karachi, Lahore, Islamabad', freight: 'Active Customer Market' },
  { code: 'az', name: 'Azerbaijan', region: 'Central Asia', hub: 'Baku, Ganja, Sumqayit', freight: 'Active Customer Market' },
  { code: 'uz', name: 'Uzbekistan', region: 'Central Asia', hub: 'Tashkent, Samarkand', freight: 'Active Customer Market' },
  { code: 'kz', name: 'Kazakhstan', region: 'Central Asia', hub: 'Almaty, Astana, Shymkent', freight: 'Active Customer Market' },
  { code: 'eg', name: 'Egypt', region: 'North Africa', hub: 'Cairo, Alexandria', freight: 'Active Customer Market' },
  { code: 'ng', name: 'Nigeria', region: 'West Africa', hub: 'Lagos, Abuja, Kano', freight: 'Active Customer Market' },
  { code: 'ke', name: 'Kenya', region: 'East Africa', hub: 'Nairobi, Mombasa', freight: 'Active Customer Market' },
  { code: 'tz', name: 'Tanzania', region: 'East Africa', hub: 'Dar es Salaam, Arusha', freight: 'Active Customer Market' },
];

export default function WholesaleWorldwideAreasSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F8FAFC] via-[#F4F8F6] to-white border-t border-gray-200/80 relative overflow-hidden" id="global-customer-presence">
      {/* Subtle Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[350px] bg-emerald-100/35 blur-[120px] rounded-full pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#147A5F] mb-3 block font-montserrat">
            OUR GLOBAL CUSTOMER PRESENCE
          </span>

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
            <span className="text-[#171717] block not-italic">
              SERVING BUYERS ACROSS 16 KEY INTERNATIONAL MARKETS
            </span>
            <span
              className="text-[#147A5F] italic block mt-1 sm:mt-1.5"
              style={{ fontStyle: 'italic' }}
            >
              AND EXPANDING OUR GLOBAL REACH
            </span>
          </h2>

          <p className="text-gray-600 font-jakarta text-xs sm:text-sm md:text-[15.5px] leading-relaxed mt-4 max-w-3xl mx-auto font-normal">
            From the GCC and Middle East to Africa, CIS and Asia, Crown Excel supports wholesalers, distributors, retailers and corporate buyers with brand-new laptops sourced from Dubai, competitive B2B pricing and international export support.
          </p>
        </div>

        {/* 16 Active Markets Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-4.5 lg:gap-5 items-stretch">
          {worldwideServiceMarkets.map((country) => (
            <div
              key={country.name}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-300 hover:border-[#147A5F] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Flag Alongside Country Name (No Badges) */}
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <div className="relative w-6 h-4 sm:w-8 sm:h-5.5 rounded-[3px] sm:rounded-[4px] overflow-hidden border border-gray-200/90 shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={`/flags/${country.code}.svg`}
                      alt={`${country.name} flag`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3
                    className="font-montserrat font-bold text-gray-900 text-[13px] sm:text-[15px] leading-tight sm:leading-snug group-hover:text-[#147A5F] transition-colors"
                    title={country.name}
                  >
                    {country.name}
                  </h3>
                </div>

                {/* Delivery Hub Cities */}
                <p className="text-[11px] sm:text-[12.5px] text-gray-500 font-inter leading-relaxed mb-2.5 sm:mb-3.5" title={country.hub}>
                  {country.hub}
                </p>
              </div>

              {/* Footer: Freight Route Badge (#084032) */}
              <div className="mt-auto pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center justify-end">
                <span
                  className="text-white font-medium text-[9.5px] sm:text-[10.5px] bg-[#084032] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-[#084032] truncate min-w-0 text-right"
                  title={country.freight}
                >
                  {country.freight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
