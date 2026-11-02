import React from 'react';
import CCTVImage1 from '@/Components/Images/cctv.png';
import CCTVImage2 from '@/Components/Images/allinonephones2.png';
import Image from 'next/image';
import Stars from '@/Components/Images/stars.png';
import { safeRender, safeImage } from '@/lib/safe-html';

const CCTVBanner = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};

  let headingTop = safeRender(fields.heading, 'ADVANCED CCTV &');
  const headingHighlight = safeRender(fields.heading_highlight, 'SECURITY CAMERAS');
  const headingEnd = safeRender(fields.heading_end, 'FOR TOTAL SECURITY');

  // Prevent duplicate text if full heading was accidentally stored in headingTop
  if (headingTop && headingHighlight && headingTop.includes(headingHighlight)) {
    headingTop = headingTop.replace(headingHighlight, '').replace(headingEnd || '', '').replace(/\s+/g, ' ').trim();
  }

  const paragraphText = safeRender(
    fields.paragraph,
    'Crown Excel is Dubai’s premier CCTV wholesale supplier. We supply high-resolution IP security cameras, night-vision outdoor bullet cameras, PTZ domes, and complete DVR/NVR surveillance packages from Hikvision, Dahua, and leading global security brands.'
  );

  const leftCameraImg = safeImage(fields.image_cctvimage1, CCTVImage1);
  const rightCameraImg = safeImage(fields.image_cctvimage2, CCTVImage2);
  const starsImg = safeImage(fields.image_stars, Stars);

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hero-section"
        aria-label="CCTV Hero Section"
        className="hidden lg:flex items-center justify-between w-full max-w-[1536px] mx-auto h-[180px] lg:h-[600px] md:h-[350px] px-3 md:px-1 relative overflow-hidden"
        style={{
          background: 'linear-gradient(87deg, #1b2826 35%, #084032 100%)',
        }}
      >
        {/* Left CCTV Graphic */}
        <div className="laptop-banner-left flex-1 flex justify-start items-center pl-0.5">
          <Image src={leftCameraImg} width={410} height={435} alt="CCTV Wholesale Supplier Dubai" className="object-contain drop-shadow-2xl" priority />
        </div>
        {/* Center Content */}
        <div className="laptop-banner-center z-10 absolute left-50 right-50 flex-1 flex flex-col items-center justify-center text-center px-2 md:px-8">
          <div className="flex justify-center gap-2 mb-2">
            <Image src={starsImg} width={94} height={100} alt="Stars" className="left-20 -top-2 absolute" />
            <Image src={starsImg} width={51} height={50} alt="Stars" className="right-45 top-2 absolute" />
          </div>
          <h1 className="text flex flex-col items-center mb-4">
            <span className="text-white font-montserrat w-[600px] font-extrabold text-2xl md:text-5xl leading-tight tracking-tight mb-0">{headingTop || 'ADVANCED CCTV &'}</span>
            <span className="text-2xl md:text-[50px] lg:text-[52px] font-montserrat font-[900] text-[#147d61] leading-tight tracking-tight">{headingHighlight || 'SECURITY CAMERAS'}</span>
            <span className="text-white font-montserrat w-[600px] font-extrabold text-2xl md:text-5xl leading-tight tracking-tight">{headingEnd || 'FOR TOTAL SECURITY'}</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-lg font-medium max-w-xl mx-auto mb-2 md:mb-4 w-[520px]">
            {paragraphText || 'Crown Excel is Dubai’s premier CCTV wholesale supplier. We supply high-resolution IP security cameras, night-vision outdoor bullet cameras, PTZ domes, and complete DVR/NVR surveillance packages from Hikvision, Dahua, and leading global security brands.'}
          </p>
        </div>
        {/* Right CCTV Graphic */}
        <div className="laptop-banner-right flex-1 flex justify-end items-center pr-10">
          <Image src={rightCameraImg} width={265} height={290} alt="Security Cameras Wholesale" className="object-contain drop-shadow-2xl" priority />
        </div>
      </section>

      <section
        id="hero-section-mobile"
        aria-label="CCTV Hero Section Mobile"
        className="small-screen flex flex-col items-center justify-center lg:hidden h-[600px] w-full max-w-[1536px] mx-auto overflow-hidden"
        style={{
          background: 'linear-gradient(87deg, #1b2826 35%, #084032 100%)',
        }}
      >
        <div className="top mt-20">
          <div className="laptop-banner-center">
            <div className="text text-center relative flex flex-col items-center mb-4 leading-tight">
              <Image src={starsImg} width={50} height={50} alt="Stars" className="left-0 bottom-0 absolute" />
              <span className="text-white font-montserrat font-extrabold text-[26px] sm:text-[30px] leading-tight tracking-tight mb-0">{headingTop || 'ADVANCED CCTV &'}</span>
              <span className="text-[26px] sm:text-[30px] font-montserrat font-[900] text-[#147d61] leading-tight tracking-tight">{headingHighlight || 'SECURITY CAMERAS'}</span>
              <span className="text-white font-montserrat font-extrabold text-[26px] sm:text-[30px] leading-tight tracking-tight">{headingEnd || 'FOR TOTAL SECURITY'}</span>
              <Image src={starsImg} width={51} height={50} alt="Stars" className="right-10 -top-5 absolute" />
            </div>
            <p className="text-gray-200 text-[14px] text-center font-light px-4">
              {paragraphText || 'Crown Excel is a leading CCTV wholesale supplier in Dubai, offering cutting-edge IP security cameras, PTZ dome systems, and complete multi-channel surveillance setups for commercial and residential premises.'}
            </p>
          </div>
        </div>
        <div className="bottom flex mt-10 justify-center gap-10 w-full px-10">
          <Image alt="CCTV Cameras" src={leftCameraImg} width={130} height={130} className="object-contain" />
          <Image alt="Bullet Camera" src={rightCameraImg} width={130} height={130} className="object-contain" />
        </div>
      </section>
    </div>
  );
};

export default CCTVBanner;
