'use client'
import React from 'react'
import Background from '../../../../Components/Images/aboutheader.jpg'
import { safeRender } from '@/lib/safe-html'

const Header = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const headingText = safeRender(fields.heading, "About Us");
  const paragraphText = safeRender(
    fields.paragraph,
    "At Crown Excel, we believe that our success is driven by the talent and passion of our team. We are always looking for dedicated, innovative, and skilled professionals to join us in delivering cutting-edge IT solutions, hardware services, and software products that shape the future of businesses"
  );

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <div
        className="relative w-full max-w-[1536px] mx-auto flex flex-col px-6 py-10 lg:py-8 lg:px-15 h-[250px] lg:h-[220px] text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(14,70,55,0.8), rgba(14,70,55,0.8)), url(${Background.src || Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <h1 className='text-white text-[40px] lg:text-[48px] font-montserrat font-[600]'>{headingText}</h1>
        <p className='text-white text-[12px] lg:text-[16px] leading-[20px] lg:leading-[27px] lg:w-[975px] font-montserrat'>{paragraphText}</p>
      </div>
    </div>
  )
}

export default Header
