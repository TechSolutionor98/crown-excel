import React from 'react';
import icon1 from '../../../../../Components/Images/networkingbannericon.png';
import icon2 from '../../../../../Components/Images/networkingbannericon2.png';
import BannerImage from '../../../../../Components/Images/itinfastructure.webp';
import Image from 'next/image';
import { safeRender, safeImage } from '@/lib/safe-html';

const ManagedITBanner = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const headingText = safeRender(fields.heading, <>IT Infrastructure <br className="block md:block" /> & Managed Services</>);
  const paragraphText = safeRender(fields.paragraph, "Our managed IT services offer 24/7 monitoring, proactive maintenance, patching and performance tuning to keep your systems secure and available, helping reduce downtime and operational risk.");

  const bannerImg = safeImage(fields.image_bannerimage, BannerImage);
  const bannerBgUrl = typeof bannerImg === 'string' ? bannerImg : (bannerImg?.src || BannerImage.src);
  const icon2Img = safeImage(fields.image_icon2, icon2);

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hero-section"
        aria-label="IT Infrastructure Hero Section"
        className="relative w-full max-w-[1536px] mx-auto flex md:flex-row items-center justify-between h-[350px] lg:h-[500px] px-6 md:px-10 overflow-hidden"
        style={{
          backgroundImage: `url(${bannerBgUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Left Text and Icons */}
        <div className="relative z-10 w-full md:w-1/2 text-white">
          <Image
            src={icon2Img}
            alt="icon2"
            width={40}
            height={40}
            className="absolute -top-10 left-10 md:left-0"
          />
          <h1 className="text-[28px] md:text-[48px] lg:text-[60px] font-bold leading-[34px] md:leading-[52px] lg:leading-[64px]">
            {headingText}
          </h1>
          <p className="mt-3 text-[14px] md:text-[16px] lg:text-[17px] max-w-lg text-white">
            {paragraphText}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ManagedITBanner;

