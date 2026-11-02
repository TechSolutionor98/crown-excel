import React from 'react'
import HighPerformanceImage from '../../../../../Components/Images/switchinghighperformance.png'
import Comma from '../../../../../Components/Images/comma.png'
import Image from 'next/image'
const SwitchingHighPerformance = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="creative-professionals-switching"
        aria-label="High-Performance Switches for Creative Professionals"
        className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] flex md:flex-row lg:flex-row flex-col items-center justify-between gap-5 h-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16 relative overflow-hidden"
      >
        <div className="highperformance-left basis-[65%] flex justify-center">
          <Image alt='' src={HighPerformanceImage} width={727} height={416} className="object-contain max-w-full h-auto" />
        </div>
        <div className="highperformance-right basis-[40%] flex flex-col mt-5 lg:mt-0">
          <h2 className='text-[30px] md:leading-[32px] leading-[30px] lg:text-[44px] font-[700] font-montserrat lg:leading-[52px] text-black'>HIGH-PERFORMANCE SWITCHES FOR CREATIVE PROFESSIONALS</h2>
          <Image className='mt-7 mb-7' alt='' src={Comma} width={150} height={75}/>
          <p className='text-[16px] leading-[27px] text-[#687799] font-montserrat'>Our high-performance network switches are tailored for creative professionals who demand reliable and fast connectivity.</p>
        </div>
      </section>
    </div>
  )
}

export default SwitchingHighPerformance
