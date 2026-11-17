import React from 'react'
import LaptopImage1 from '../../../../../Components/Images/switchingbanner1.png'
import LaptopImage2 from '../../../../../Components/Images/switchingbanner2.png'
import Image from 'next/image'
import Stars from '../../../../../Components/Images/stars.png'
import { safeRender, safeImage } from '@/lib/safe-html'

const SwitchingBanner = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const bannerImg1 = safeImage(fields.image_laptopimage1, LaptopImage1);
  const bannerImg2 = safeImage(fields.image_laptopimage2, LaptopImage2);
  const starsImg = safeImage(fields.image_stars, Stars);

  const headingText = safeRender(fields.heading, (
    <>
      <span className="text-white font-montserrat w-[600px] font-extrabold text-2xl md:text-5xl leading-tight tracking-tight mb-0">DISCOVER TOP</span>
      <span className='text-[60px] font-montserrat font-[900] text-[#147d61]'>SWITCHING BRANDS</span>
      <span className="text-white font-montserrat w-[600px] font-extrabold text-2xl md:text-5xl leading-tight tracking-tight">FOR EVERY NEED</span>
    </>
  ));

  const paragraphText = safeRender(
    fields.paragraph,
    "Crown Excel offers a wide range of network switches designed to provide seamless connectivity. From small businesses to large enterprises, our switches ensure high performance, reliability, and scalability for every networking need."
  );

  const paragraphMobileText = safeRender(
    fields.paragraph_2 || fields.paragraph,
    "Crown Excel offers a wide range of network switches designed to provide seamless connectivity. From small businesses to large enterprises, our switches ensure high performance, reliability, and scalability for every networking need."
  );

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hero-section"
        aria-label="Switching Brands Hero Section"
        className="hidden lg:flex items-center justify-between w-full max-w-[1536px] mx-auto h-[180px] lg:h-[500px] md:h-[350px] px-3 md:px-1 relative overflow-hidden"
        style={{
          background: 'linear-gradient(87deg, #2D2D2D 35%, #147D61 100%)',
        }}
      >
        {/* Left Laptop Image */}
        <div className="laptop-banner-left flex-1 flex justify-start items-end">
          <Image src={bannerImg1} width={346} height={420} alt="Laptop 1" className="object-contain drop-shadow-2xl md:-mb-8" />
        </div>
        {/* Center Content */}
        <div className="laptop-banner-center z-10 absolute left-50 right-50 flex-1 flex flex-col items-center justify-center text-center px-2 md:px-8">
          <div className="flex justify-center gap-2 mb-2">
            <Image src={starsImg} width={94} height={100} alt="Stars" className="left-20 top-2 absolute" />
            <Image src={starsImg} width={51} height={50} alt="Stars" className="right-45 top-2 absolute" />
          </div>
          <h1 className="text flex flex-col items-center mb-4">
            {headingText}
          </h1>
          <p className="text-gray-200 text-sm md:text-lg font-medium max-w-xl mx-auto mb-2 md:mb-4 w-[510px]">
            {paragraphText}
          </p>
        </div>
        {/* Right Laptop Image */}
        <div className="laptop-banner-right flex-1 flex justify-end items-end">
          <Image src={bannerImg2} width={264} height={450} alt="Laptop 2" className="object-contain drop-shadow-2xl -mb-4 md:-mb-8" />
        </div>
      </section>
      <section
        id="hero-section-mobile"
        aria-label="Switching Brands Hero Section Mobile"
        className="small-screen flex flex-col items-center justify-center lg:hidden h-auto min-h-[600px] py-10 w-full max-w-[1536px] mx-auto overflow-hidden"
        style={{
          background: 'linear-gradient(87deg, #2D2D2D 35%, #147D61 100%)',
        }}
      >
        <div className="top mt-20">
          <div className="laptop-banner-center ">
            <div className="text relative flex flex-col items-center mb-4 leading-tight">
              <Image src={starsImg} width={50} height={50} alt="Stars" className="left-0 bottom-0 absolute" />
              {headingText}
              <Image src={starsImg} width={51} height={50} alt="Stars" className="right-10 -top-5 absolute" />
            </div>
            <p className="text-gray-200 text-[14px] text-center font-light">
              {paragraphMobileText}
            </p>
          </div>
        </div>
        <div className="bottom flex mt-10 justify-center gap-10 w-full px-10">
          <Image alt='' src={bannerImg1} width={125} height={100} className='md:w-[200px]'/>
          <Image alt='' src={bannerImg2} width={125} height={100} className='md:w-[200px]'/>
        </div>
      </section>
    </div>
  )
}

export default SwitchingBanner
