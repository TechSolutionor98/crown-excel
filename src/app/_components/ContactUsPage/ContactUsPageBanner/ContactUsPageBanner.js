'use client'
import React from 'react'
import Background from '../../../../Components/Images/aboutheader.jpg'
const ContactUsPageBanner = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="hero-section"
        aria-label="Contact Us Hero Section"
        className="relative w-full max-w-[1536px] mx-auto flex flex-col px-6 py-10 lg:py-8 lg:px-15 h-[250px] lg:h-[200px] text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(14,70,55,0.8), rgba(14,70,55,0.8)), url(${Background.src || Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <h1 className='text-white text-[40px] lg:text-[48px] font-montserrat font-[600]'>Contact Us</h1>
        <p className='text-white text-[12px] lg:text-[16px] leading-[20px] lg:leading-[27px] lg:w-[975px] font-montserrat'>Fill out the form below, give us a call, or send us an email, and we’ll get back to you promptly. At Crown Excel, we value your time and are committed to providing fast and efficient support. Let’s connect!</p>
      </section>
    </div>
  )
}

export default ContactUsPageBanner
