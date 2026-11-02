'use client'
import React from 'react';
import icon1 from '../../../../../Components/Images/networkingbannericon.png';
import icon2 from '../../../../../Components/Images/networkingbannericon2.png';
// import BannerImage from '../../../../../Components/Images/networkingbanner.png';
// import BannerImage from '../../../../../Components/Images/networkingpic.png';
import BannerImage from '../../../../../Components/Images/networkingpic.webp';
import Image from 'next/image';
import { safeRender, safeImage } from '@/lib/safe-html';

const RMABanner = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const headingText = safeRender(fields.heading, <>Networking <br className="block md:block" /> Solutions</>);
  const paragraphText = safeRender(
    fields.paragraph,
    "Our networking team provides end-to-end services: network design, implementation, performance tuning, monitoring and 24/7 support to ensure high availability and secure connectivity for your organization."
  );

  const bannerImg = safeImage(fields.image_bannerimage, BannerImage);
  const bannerBgUrl = typeof bannerImg === 'string' ? bannerImg : (bannerImg?.src || BannerImage.src);
  const icon2Img = safeImage(fields.image_icon2, icon2);

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hero-section"
        aria-label="Networking Solutions Hero Section"
        className="relative w-full max-w-[1536px] mx-auto flex md:flex-row items-center justify-between h-[350px] lg:h-[500px] px-6 md:px-10 overflow-hidden"
        style={{
          backgroundImage: `url(${bannerBgUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Left Text and Icons */}
        <div className="relative z-10 w-full md:w-1/2 text-white font-montserrat">
          <Image
            src={icon2Img}
            alt="network icon"
            width={40}
            height={40}
            className="absolute -top-10 left-10 md:left-0"
          />
          <h1 className="text-[30px] md:text-[48px] font-bold leading-[30px] md:leading-[52px]">
            {headingText}
          </h1>

          {/* Additional short paragraph about networking offerings */}
          <p className="mt-3 max-w-lg text-[14px] md:text-[16px] text-white">
            {paragraphText}
          </p>
        </div>
      </section>
    </div>
  );
};

export default RMABanner;
