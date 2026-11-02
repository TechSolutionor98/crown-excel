import React from 'react';
import LaptopImage1 from '@/Components/Images/phonesbanner1.png';
import LaptopImage2 from '@/Components/Images/phonesbanner2.png';
import Image from 'next/image';
import Stars from '@/Components/Images/stars.png';
import { safeRender, safeImage } from '@/lib/safe-html';

const PhonesBanner = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const headingTop = safeRender(fields.heading, 'DISCOVER TOP');
  const headingHighlight = safeRender(fields.heading_highlight, 'PHONE BRANDS');
  const headingEnd = safeRender(fields.heading_end, 'FOR EVERY NEED');
  const paragraphText = safeRender(
    fields.paragraph,
    'Crown Excel is a premier phones wholesale supplier in Dubai. We offer brand-new smartphones, business VoIP phones, and mobile communication devices from global market leaders including Apple, Samsung, Xiaomi, and more.'
  );

  const leftPhoneImg = safeImage(fields.image_laptopimage1, LaptopImage1);
  const rightPhoneImg = safeImage(fields.image_laptopimage2, LaptopImage2);
  const starsImg = safeImage(fields.image_stars, Stars);

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hero-section"
        aria-label="Phones Hero Section"
        className="hidden lg:flex items-center justify-between w-full max-w-[1536px] mx-auto h-[180px] lg:h-[600px] md:h-[350px] px-3 md:px-1 relative overflow-hidden"
        style={{
          background: 'linear-gradient(87deg, #2D2D2D 35%, #147D61 100%)',
        }}
      >
        {/* Left Phone Graphic */}
        <div className="laptop-banner-left flex-1 flex justify-start items-end">
          <Image src={leftPhoneImg} width={346} height={420} alt="Smartphone Wholesale Dubai" className="object-contain drop-shadow-2xl md:-mb-8" priority />
        </div>
        {/* Center Content */}
        <div className="laptop-banner-center z-10 absolute left-50 right-50 flex-1 flex flex-col items-center justify-center text-center px-2 md:px-8">
          <div className="flex justify-center gap-2 mb-2">
            <Image src={starsImg} width={94} height={100} alt="Stars" className="left-20 -top-2 absolute" />
            <Image src={starsImg} width={51} height={50} alt="Stars" className="right-45 top-2 absolute" />
          </div>
          <h1 className="text flex flex-col items-center mb-4">
            <span className="text-white font-montserrat w-[600px] font-extrabold text-2xl md:text-5xl leading-tight tracking-tight mb-0">{headingTop}</span>
            <span className="text-[60px] font-montserrat font-[900] text-[#147d61]">{headingHighlight}</span>
            <span className="text-white font-montserrat w-[600px] font-extrabold text-2xl md:text-5xl leading-tight tracking-tight">{headingEnd}</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-lg font-medium max-w-xl mx-auto mb-2 md:mb-4 w-[510px]">
            {paragraphText}
          </p>
        </div>
        {/* Right Phone Graphic */}
        <div className="laptop-banner-right flex-1 flex justify-end items-end pr-2 md:pr-4 lg:pr-6">
          <Image src={rightPhoneImg} width={315} height={450} alt="Wholesale Mobile Phones" className="object-contain drop-shadow-2xl -mb-4 md:-mb-8" priority />
        </div>
      </section>

      <section
        id="hero-section-mobile"
        aria-label="Phones Hero Section Mobile"
        className="small-screen flex flex-col items-center justify-center lg:hidden h-[600px] w-full max-w-[1536px] mx-auto overflow-hidden"
        style={{
          background: 'linear-gradient(87deg, #2D2D2D 35%, #147D61 100%)',
        }}
      >
        <div className="top mt-20">
          <div className="laptop-banner-center">
            <div className="text text-center relative flex flex-col items-center mb-4 leading-tight">
              <Image src={starsImg} width={50} height={50} alt="Stars" className="left-0 bottom-0 absolute" />
              <span className="text-white font-montserrat font-extrabold text-[30px] leading-tight tracking-tight mb-0">{headingTop}</span>
              <span className="text-[30px] font-montserrat font-[900] text-[#147d61]">{headingHighlight}</span>
              <span className="text-white font-montserrat font-extrabold text-[30px] leading-tight tracking-tight">{headingEnd}</span>
              <Image src={starsImg} width={51} height={50} alt="Stars" className="right-10 -top-5 absolute" />
            </div>
            <p className="text-gray-200 text-[14px] text-center font-light px-4">
              {paragraphText}
            </p>
          </div>
        </div>
        <div className="bottom flex mt-10 justify-center gap-10 w-full px-10">
          <Image alt="Smartphones" src={leftPhoneImg} width={150} height={100} />
          <Image alt="Mobile Phones" src={rightPhoneImg} width={150} height={100} />
        </div>
      </section>
    </div>
  );
};

export default PhonesBanner;
