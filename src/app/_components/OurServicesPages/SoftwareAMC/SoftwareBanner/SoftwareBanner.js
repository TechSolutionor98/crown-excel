import React from 'react';
import icon1 from '../../../../../Components/Images/networkingbannericon.png';
import icon2 from '../../../../../Components/Images/networkingbannericon2.png';
import BannerImage from '../../../../../Components/Images/softwaresolution.webp';
import Image from 'next/image';
import { safeRender, safeImage } from '@/lib/safe-html';

const SoftwareBanner = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const headingText = safeRender(fields.heading, "Software Solutions");
  const paragraphText = safeRender(
    fields.paragraph,
    "We build custom software solutions that accelerate business processes — from web and mobile apps to integrations and automation. Our team focuses on scalability, security and maintainability to deliver measurable results."
  );
  const bannerImgSrc = fields.image_bannerimage ? (typeof fields.image_bannerimage === 'object' ? fields.image_bannerimage.value : fields.image_bannerimage) : BannerImage.src;

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hero-section"
        aria-label="Software Solutions Hero Section"
        className="relative flex md:flex-row items-center justify-between w-full max-w-[1536px] mx-auto h-[350px] lg:h-[500px] px-6 md:px-10 overflow-hidden"
        style={{
          backgroundImage: `url(${bannerImgSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Left Text and Icons */}
        <div className="relative z-10 w-full md:w-1/2 text-white font-montserrat">
          <Image
            src={icon2}
            alt="icon2"
            width={40}
            height={40}
            className="absolute -top-10 left-10 md:left-0"
          />
          <h1 className="text-[30px] text-white md:text-[48px] font-bold leading-[30px] md:leading-[52px]">
            {headingText}
          </h1>

          {/* Short paragraph about software solutions */}
          <p className="mt-3 max-w-lg text-[14px] md:text-[16px] text-white">
            {paragraphText}
          </p>
        </div>
      </section>
    </div>
  );
};

export default SoftwareBanner;
