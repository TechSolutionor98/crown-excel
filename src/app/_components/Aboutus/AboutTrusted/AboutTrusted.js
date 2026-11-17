'use client'
import React from 'react'
import TrustedImage from '../../../../Components/Images/abouttrusted.jpg'
import Image from 'next/image'
import MobileImage from '../../../../Components/Images/aboutusMobile.jpg'
import { safeRender, safeImage } from '@/lib/safe-html'

const AboutTrusted = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const headingText = safeRender(fields.heading, "Your Trusted Technology Partner");
  const paragraphText = safeRender(
    fields.paragraph,
    "At Crown Excel, we are passionate about delivering high-quality IT solutions. With over 15 years of expertise, we specialize in providing premium hardware, software, and managed IT services to both businesses and individuals. Our comprehensive offerings include IT consultancy, hardware and software maintenance, server support, and repair services. We take pride in offering personalized, reliable solutions that enhance productivity and efficiency. Join our community of over 17,000 satisfied clients, and let us help you stay ahead in the ever-evolving tech landscape."
  );
  const trustedImg = safeImage(fields.image_trustedimage, TrustedImage);
  const mobileImg = safeImage(fields.image_mobileimage, MobileImage);

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section className="relative w-full max-w-[1536px] mx-auto bg-[#F7F7F7] overflow-hidden">
        <div className='py-8 px-15 hidden md:flex md:flex-row lg:flex items-center justify-between gap-5 flex-col lg:flex-row w-full h-full'>
          <div className="image basis-[50%]" >
            <Image className='w-[100%] h-auto rounded-[20px]' alt='' width={3000} height={362} src={trustedImg} />
          </div>
          <div className="info basis-[50%]">
            <h2 className='text-[40px] md:text-[40px] md:leading-[48px] leading-[48px] text-[#084032] font-[800] font-urbanist'>{headingText}</h2>
            <p className='text-[16px] leading-[27.2px] text-black font-montserrat mt-5'>{paragraphText}</p>
          </div>
        </div>
        <div className="mobile md:hidden lg:hidden py-8 px-7">
          <div className="mobile-top flex items-start gap-3">
            <div className="mobile-top-left flex flex-col justify-between">
              <h2 className='text-[23px] text-[#084032] font-[600] leading-[23px] font-roboto'>{headingText}</h2>
              <p className='text-[10px] font-lucida mt-5 leading-[15px] text-black font-montserrat'>{safeRender(fields.paragraph_2, "At Crown Excel, we are passionate about delivering high-quality IT solutions.")}</p>
            </div>
            <div className="mobile-top-right  ">
              <Image src={mobileImg} alt='' className='w-[450px] h-[150px] rounded-[20px]' width={450} height={150} />
            </div>
          </div>
          <div className="mobile-bottom">
            <p className='text-[10px] font-lucida mt-5 leading-[15px] text-black font-montserrat'>{safeRender(fields.paragraph_3, "With over 15 years of expertise, we specialize in providing premium hardware, software, and managed IT services to both businesses and individuals.")}</p>
            <br />
            <p className='text-[10px] font-lucida leading-[15px] text-black font-montserrat'>{safeRender(fields.paragraph_4, "Our comprehensive offerings include IT consultancy, hardware and software maintenance, server support, and repair services. We take pride in offering personalized, reliable solutions that enhance productivity and efficiency. Join our community of over 17,000 satisfied clients, and let us help you stay ahead in the ever-evolving tech landscape.")}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutTrusted
