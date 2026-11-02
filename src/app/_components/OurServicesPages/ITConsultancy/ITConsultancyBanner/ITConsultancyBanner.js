import React from 'react';
import icon1 from '../../../../../Components/Images/networkingbannericon.png';
import icon2 from '../../../../../Components/Images/networkingbannericon2.png';
// import BannerImage from '../../../../../Components/Images/itconsultancy.png';
import BannerImage from '../../../../../Components/Images/itconsultancy.webp';
import Image from 'next/image';

const ITConsultancyBanner = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hero-section"
        aria-label="IT Consultancy Hero Section"
        className="relative w-full max-w-[1536px] mx-auto h-[350px] lg:h-[500px] px-6 md:px-10 overflow-hidden flex items-center"
      >
        {/* Background using next/image fill + object-cover to avoid stretching */}
        <div className="absolute inset-0 z-0">
          <Image
            src={BannerImage}
            alt="IT Consultancy background"
            fill
            priority
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031d26]/60 to-transparent" />
        </div>

        {/* Left Text and Icons */}
        <div className="relative z-10 w-full md:w-3/5 lg:w-1/2 text-white font-montserrat py-8">
          <Image
            src={icon2}
            alt="icon2"
            width={40}
            height={40}
            className="absolute -top-10 left-6 md:left-0"
          />
          <h1 className="text-[28px] md:text-[48px] lg:text-[60px] font-bold leading-[34px] md:leading-[52px] lg:leading-[64px]">
            IT Consultancy
          </h1>

          {/* New paragraph about IT consultancy */}
          <p className="mt-4 max-w-lg text-[14px] md:text-[16px] lg:text-[17px] text-white">
            We align your IT strategy with business goals — optimizing systems,
            improving security, and delivering scalable solutions for measurable
            growth.
          </p>

          {/* <Image
            src={icon1}
            alt="icon1"
            width={40}
            height={40}
            className="absolute bottom-0 md:-bottom-4 right-6"
          /> */}
        </div>
      </section>
    </div>
  );
};

export default ITConsultancyBanner;
