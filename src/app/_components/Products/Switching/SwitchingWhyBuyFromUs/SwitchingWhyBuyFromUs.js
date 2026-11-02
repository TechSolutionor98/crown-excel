import React from 'react'
import YelloBckground from '../../../../../Components/Images/yellowbackground.png'
import Image from 'next/image'
const SwitchingWhyBuyFromUs = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="why-buy-switches-from-us"
        aria-label="Why Buy Switches Devices From Us"
        className="why-buy-from-us w-full max-w-[1536px] mx-auto bg-[#FFFFFF] flex flex-col md:flex-row lg:flex-row items-center gap-5 lg:gap-24 xl:gap-40 h-auto lg:h-[700px] my-10 sm:my-14 lg:my-20 relative overflow-hidden"
      >
        <div className="left-part w-full h-auto md:h-[782px] md:w-[436px] lg:w-[518px] lg:h-[700px] bg-[#ffd900] flex-shrink-0">
          <Image alt='' src={YelloBckground} width={518} height={300} className="w-full object-cover" />
          <div className="text-part w-full h-full -mt-5 lg:mt-0 px-10 pt-0 pb-8 md:pt-[120px] md:pr-[82px] md:pb-[82px] md:pl-[82px] lg:pt-[120px] lg:pr-[82px] lg:pb-[82px] lg:pl-[82px]">
              <h2 className='text-[30px] md:text-[50px] md:leading-[60px] leading-[30px] lg:text-[50px] w-[250px] lg:w-[354px] font-[600] lg:leading-[60px] text-black font-montserrat'>Why Buy <br /> <span className='text-[#118264]'>Switches</span> <br /> Devices From Us?</h2>
              <p className='text-[#687799] mt-5 text-[16px] leading-[27px]'>Our network switches are designed to deliver top-tier performance for your networking needs, whether for a small office or large-scale enterprise. Here’s why Crown Excel is your trusted partner for network solutions:</p>
          </div>
        </div>
        <div className="right-part flex flex-col items-center gap-5 px-4 lg:px-0 py-6 md:py-0">
          <div className="right-part-divs text-black p-[14px] w-full h-auto lg:w-[476px] lg:h-[147px]" >
              <h3 className='font-montserrat text-[22px] font-[600] leading-[26px]'>Brands Availability</h3>
              <p className='text-[16px] leading-[27px] font-montserrat mt-5'>We provide network switches from top brands like Cisco, Netgear, and TP-Link, ensuring quality and reliability for all your networking needs.</p>
          </div>
          <div className="right-part-divs text-black p-[14px] w-full h-auto lg:w-[476px] lg:h-[147px]" >
              <h3 className='font-montserrat text-[22px] font-[600] leading-[26px]'>Competitive Pricing</h3>
              <p className='text-[16px] leading-[27px] font-montserrat mt-5'>Our network switches are priced competitively to offer the best value without compromising on performance and features.</p>
          </div>
          <div className="right-part-divs text-white rounded-[20px] p-[30px] w-full h-auto lg:w-[476px] lg:h-auto" style={{backgroundImage: 'linear-gradient(339deg, #084032 25%, #118264 52%)'}} >
              <h3 className='font-montserrat text-[22px] font-[600] leading-[26px]'>Warranty & Support</h3>
              <p className='text-[16px] leading-[27px] font-montserrat mt-5'>All our switches come with comprehensive warranties and dedicated customer support, ensuring peace of mind and long-term reliability.</p>
          </div>
          <div className="right-part-divs text-black p-[14px] w-full h-auto lg:w-[476px] lg:h-[147px]" >
              <h3 className='font-montserrat text-[22px] font-[600] leading-[26px]'>Expert Guidance</h3>
              <p className='text-[16px] leading-[27px] font-montserrat mt-5'>Our team of experts is available to help you select the right switches and provide guidance on installation and configuration to meet your specific requirements.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SwitchingWhyBuyFromUs
