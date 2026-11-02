import React from 'react';
import icon1 from '../../../../../Components/Images/networkingbannericon.png';
import icon2 from '../../../../../Components/Images/networkingbannericon2.png';
// import BannerImage from '../../../../../Components/Images/networkingbanner.png';
// import BannerImage from '../../../../../Components/Images/amc.png';
import BannerImage from '../../../../../Components/Images/amc.webp';
import Image from 'next/image';
import { safeRender, safeImage } from '@/lib/safe-html';

const HardwareAmcBanner = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const headingText = safeRender(fields.heading, "Hardware");
  const paragraphText = safeRender(
    fields.paragraph,
    "We offer both short-term and long-term AMC (Annual Maintenance Contract) plans — short-term contracts for immediate, limited-period support, and long-term plans for continued proactive maintenance, priority response, and minimized downtime."
  );

  const bannerImg = safeImage(fields.image_bannerimage, BannerImage);
  const bannerBgUrl = typeof bannerImg === 'string' ? bannerImg : (bannerImg?.src || BannerImage.src);
  const icon2Img = safeImage(fields.image_icon2, icon2);

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hero-section"
        aria-label="Hardware AMC Hero Section"
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

          {/* Short paragraph about Long-Term and Short-Term AMC */}
          <p className="mt-3 text-[14px] md:text-[16px] max-w-lg">
            {paragraphText}
          </p>
        </div>

        {/* Right Side Background */}
        {/* <div
          className="absolute right-0 bottom-0 top-0 w-full md:w-1/2 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${BannerImage.src})`,
          }}
        ></div> */}

        {/* Overlay Gradient (optional for glow effect) */}
        {/* <div className="absolute inset-0 bg-gradient-to-l from-[#031d26] via-[#031d26]/80 to-transparent z-[1]" /> */}

      </section>
    </div>
  );
};

export default HardwareAmcBanner;
