import React from 'react';
import Background from '@/Components/Images/ProductsBrandBackground.png';
import Image from 'next/image';
import Apple from '@/Components/Images/Apple.png';
import Samsung from '@/Components/Images/samsung.png';
import Xiomi from '@/Components/Images/Xiomi.png';
import Lenovo from '@/Components/Images/Lenovo.png';
import Asus from '@/Components/Images/Asus2.png';
import Hp from '@/Components/Images/HP2.png';
import Dell from '@/Components/Images/Dell2.png';
import Microsft from '@/Components/Images/Microsoft.png';
import { safeRender, safeImage } from '@/lib/safe-html';

const PhonesBrand = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const heading = safeRender(fields.heading, 'PHONE BRANDS WE DEAL');
  const bgImage = safeImage(fields.image_background, Background);

  const BrandIcons = [
    { Image: safeImage(fields.image_apple, Apple), alt: 'Apple iPhone' },
    { Image: safeImage(fields.image_samsung, Samsung), alt: 'Samsung Galaxy' },
    { Image: safeImage(fields.image_xiomi, Xiomi), alt: 'Xiaomi' },
    { Image: safeImage(fields.image_lenovo, Lenovo), alt: 'Lenovo' },
    { Image: safeImage(fields.image_asus, Asus), alt: 'Asus' },
    { Image: safeImage(fields.image_hp, Hp), alt: 'HP' },
    { Image: safeImage(fields.image_dell, Dell), alt: 'Dell' },
    { Image: safeImage(fields.image_microsft, Microsft), alt: 'Microsoft' },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="phone-brands"
        aria-label="Phone Brands We Deal"
        className="w-full max-w-[1536px] mx-auto min-h-[320px] md:min-h-[279px] relative my-6 sm:my-8 lg:my-10 flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, #54595f 0%, #232426 70%, #18191b 100%)',
        }}
      >
        <div className="absolute z-0 right-0 top-0 w-full h-full pointer-events-none select-none" style={{ mixBlendMode: 'screen', opacity: 0.7 }}>
          <Image alt='' src={bgImage} fill style={{ objectFit: 'cover', objectPosition: 'right' }} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] px-4 md:px-20 py-8 md:py-0 gap-8 md:gap-20">
          <div className="flex-1 flex items-center md:items-start justify-center md:justify-start w-full">
            <h2 className="text-[2.2rem] md:text-[2rem] text-[#ffd900] font-bold uppercase tracking-wide text-center md:text-left leading-tight drop-shadow-lg font-montserrat">
              {heading}
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="grid grid-cols-4 grid-rows-2 gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8 w-[320px] md:w-[500px] lg:w-[600px]">
              {BrandIcons.map((brand, index) => (
                <div key={index} className="flex items-center justify-center p-2 bg-white/5 rounded-lg backdrop-blur-sm">
                  <Image src={brand.Image} alt={brand.alt} width={90} height={60} className="w-[70px] h-[40px] md:w-[90px] md:h-[60px] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhonesBrand;
