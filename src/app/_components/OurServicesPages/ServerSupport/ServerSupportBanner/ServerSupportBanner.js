import React from 'react';
import icon1 from '../../../../../Components/Images/networkingbannericon.png';
import icon2 from '../../../../../Components/Images/networkingbannericon2.png';
// import BannerImage from '../../../../../Components/Images/networkingbanner.png';
// import BannerImage from '../../../../../Components/Images/storage1.png';
import BannerImage from '../../../../../Components/Images/storage1.webp';
import Image from 'next/image';

const ServerSupportBanner = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hero-section"
        aria-label="Storage and Virtualization Hero Section"
        className="relative flex md:flex-row items-center justify-between w-full max-w-[1536px] mx-auto h-[350px] lg:h-[500px] px-6 md:px-10 overflow-hidden"
        style={{
          backgroundImage: `url(${BannerImage.src})`,
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
          <h1 className="text-[30px] md:text-[48px] font-bold leading-[30px] md:leading-[52px]">
            Storage and<br className="block md:hidden" /> Virtualization
          </h1>

          {/* Short paragraph about Storage & Virtualization */}
          <p className="mt-3 text-[14px] md:text-[16px] max-w-lg">
            Our server support services specialize in enterprise-grade storage and virtualization solutions. We provide end-to-end support, including SAN/NAS architecture design, capacity planning, VM provisioning, and comprehensive backup and disaster recovery strategies. Our approach ensures optimal resource utilization, high availability, and streamlined infrastructure management to support scalable and resilient IT environments.
          </p>
          <Image
            src={icon1}
            alt="icon1"
            width={40}
            height={40}
            className="absolute -bottom-15 lg:-bottom-10 right-70 md:right-130 lg:right-220"
          />
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

export default ServerSupportBanner;
