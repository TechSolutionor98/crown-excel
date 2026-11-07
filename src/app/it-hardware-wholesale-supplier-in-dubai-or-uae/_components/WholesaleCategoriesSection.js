import React from 'react';
import {
  Laptop,
  Gamepad2,
  Briefcase,
  Monitor,
  Printer,
  Server,
  Headphones,
} from 'lucide-react';

const wholesaleCategories = [
  {
    name: 'Consumer Laptops',
    icon: Laptop,
  },
  {
    name: 'Gaming Laptops',
    icon: Gamepad2,
  },
  {
    name: 'Business Laptops',
    icon: Briefcase,
  },
  {
    name: 'All-In-One',
    icon: Monitor,
  },
  {
    name: 'Print & Scan',
    icon: Printer,
  },
  {
    name: 'Servers & Workstation',
    icon: Server,
  },
  {
    name: 'Accessories (Crownyx)',
    icon: Headphones,
  },
];

export default function WholesaleCategoriesSection() {
  return (
    <section
      className="py-12 sm:py-16 bg-[#F8FAF9] border-b border-gray-200/80 relative overflow-hidden"
      id="wholesale-categories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        
        {/* 7 Categories Icon Cards Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 lg:gap-3.5 items-stretch">
          {wholesaleCategories.map((cat) => {
            const Icon = cat.icon;
            const targetId = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return (
              <a
                key={cat.name}
                href={`#${targetId}`}
                className="group bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 hover:border-[#147A5F] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer last:col-span-2 sm:last:col-span-1 last:max-w-[240px] sm:last:max-w-none last:mx-auto w-full"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 text-[#147A5F] group-hover:bg-[#147A5F] group-hover:text-white flex items-center justify-center mb-3 sm:mb-3.5 transition-all duration-300 shadow-2xs group-hover:scale-110 shrink-0">
                  <Icon
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="font-montserrat font-bold text-gray-900 group-hover:text-[#147A5F] text-xs sm:text-[13px] lg:text-[12.5px] xl:text-[13.5px] leading-snug transition-colors">
                  {cat.name}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

