'use client';
import React from 'react';
import icon2 from '../../../../../Components/Images/networkingbannericon2.png';
import BannerImage from '../../../../../Components/Images/security1.webp';
import Image from 'next/image';
import { safeRender, safeImage } from '@/lib/safe-html';

const HardwareRepairBanner = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const headingText = safeRender(fields.heading, <>Security<br className="block md:hidden" /> Solutions</>);
  const paragraphText = safeRender(
    fields.paragraph,
    "Security is built into every repair — malware and ransomware cleanup, firmware/BIOS hardening, secure configuration baselines, vulnerability patching, and replacement of compromised components — restoring reliability while strengthening your endpoint protection."
  );

  const bannerImg = safeImage(fields.image_bannerimage, BannerImage);
  const bannerBgUrl = typeof bannerImg === 'string' ? bannerImg : (bannerImg?.src || BannerImage.src);
  const icon2Img = safeImage(fields.image_icon2, icon2);

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hero-section"
        aria-label="Security Solutions Hero Section"
        className="relative flex md:flex-row items-center justify-between w-full max-w-[1536px] mx-auto h-[350px] lg:h-[500px] px-6 md:px-10 overflow-hidden"
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
            alt="icon2"
            width={40}
            height={40}
            className="absolute -top-10 left-10 md:left-0"
          />
          <h1 className="text-[30px] md:text-[48px] font-bold leading-[30px] md:leading-[52px]">
            {headingText}
          </h1>

          {/* Short paragraph about Security Solutions related to Hardware Repair */}
          <p className="mt-3 text-[14px] md:text-[16px] max-w-lg">
            {paragraphText}
          </p>
        </div>
      </section>
    </div>
  );
};

export default HardwareRepairBanner;
