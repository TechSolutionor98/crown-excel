import Image from 'next/image'
import Background from '../../../../../Components/Images/ProductsBrandBackground.png'
import React from 'react'
import Lenovo from '../../../../../Components/Images/Lenovo.png'
import Hp from '../../../../../Components/Images/HP2.png'
import Asus from '../../../../../Components/Images/Asus2.png'
import Dell from '../../../../../Components/Images/Dell2.png'
import Accer from '../../../../../Components/Images/Acer2.png'
import Eclipse from '../../../../../Components/Images/Eclipse4.png'
import { safeRender, safeImage } from '@/lib/safe-html'

const DesktopBrands = ({ cmsData }) => {
    const fields = cmsData?.fields || cmsData || {};
    const headingText = safeRender(fields.heading, "BRANDS WE DEAL");

    const lenovoImg = safeImage(fields.image_lenovo, Lenovo);
    const hpImg = safeImage(fields.image_hp, Hp);
    const acerImg = safeImage(fields.image_accer, Accer);
    const asusImg = safeImage(fields.image_asus, Asus);
    const dellImg = safeImage(fields.image_dell, Dell);
    const bgImg = safeImage(fields.image_background, Background);
    const eclipseImg = safeImage(fields.image_eclipse, Eclipse);

    const BrandIconsTop = [
        { Image: lenovoImg, alt: 'Lenovo', width: 149, height: 31 },
        { Image: hpImg, alt: 'HP', width: 81, height: 80 },
        { Image: acerImg, alt: 'Accer', width: 144, height: 34 },      
    ];
    const BrandIconsBottom = [
        { Image: asusImg, alt: 'Asus', width: 167, height: 42 },
        { Image: dellImg, alt: 'Dell', width: 135, height: 42 }  
    ];

    return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="desktop-brands"
        aria-label="Brands We Deal"
        className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] my-8 sm:my-12 lg:my-16 overflow-hidden"
      >
        {/* Heading */}
        <h2 className="text-center text-[30px] lg:text-[40px] md:text-[3rem] font-[700] leading-[40px] text-[#16806b] uppercase mb-8 font-montserrat">
          {headingText}
        </h2>
        <div
          className="w-full min-h-[220px] md:min-h-[202px] relative flex flex-col lg:flex-row items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #54595f 0%, #232426 70%, #18191b 100%)',
          }}
        >
          {/* Yellow Eclipse on the left */}
          <div className="absolute hidden lg:block left-0 top-1/2 -translate-y-1/2 z-10 w-[130px] h-[470px] pointer-events-none select-none">
            <Image src={eclipseImg} alt="Eclipse" fill style={{objectFit: 'contain'}} />
          </div>
          {/* Overlay background image with blend for dots/stars */}
          <div className="absolute z-0 right-0 top-0 w-full h-full pointer-events-none select-none" style={{mixBlendMode: 'screen', opacity: 0.7}}>
            <Image alt='' src={bgImg} fill style={{objectFit: 'cover', objectPosition: 'right'}}/>
          </div>
          {/* Brand Icons Grid */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[1200px] px-4 py-8">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center gap-5 md:gap-50 lg:gap-70 w-full">
              {BrandIconsTop.map((brand, index) => (
                <div key={index} className="flex items-center justify-center">
                  <Image src={brand.Image} alt={brand.alt} width={brand.width} height={brand.height} className="object-contain" />
                </div>
              ))}
            </div>
            <div className="flex items-center mt-10 justify-center gap-5 md:gap-50 lg:gap-90 w-full">
              {BrandIconsBottom.map((brand, index) => (
                <div key={index} className="flex items-center justify-center">
                  <Image src={brand.Image} alt={brand.alt} width={brand.width} height={brand.height} className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DesktopBrands

