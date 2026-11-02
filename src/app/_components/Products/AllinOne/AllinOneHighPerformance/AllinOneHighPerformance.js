import React from 'react'
import HighPerformanceImage from '../../../../../Components/Images/HighPerformance.png'
import Comma from '../../../../../Components/Images/comma.png'
import Image from 'next/image'
const AllinOneHighPerformance = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="creative-professional-all-in-one"
        aria-label="High-Performance All-In-One for Creative Professionals"
        className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] flex md:flex-row lg:flex-row flex-col items-center justify-between h-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16 relative overflow-hidden"
      >
        <div className="highperformance-left basis-[60%] lg:basis-[65%] flex justify-center">
          <Image alt='' src={HighPerformanceImage} width={727} height={416} className="object-contain max-w-full h-auto" />
        </div>
        <div className="highperformance-right basis-[40%] lg:basis-[35%] flex flex-col mt-5 lg:mt-0">
          <h2 className='text-[30px] md:leading-[36px] leading-[34px] lg:text-[44px] font-[700] font-montserrat lg:leading-[52px] text-black'>HIGH-PERFORMANCE ALL-IN-ONE FOR CREATIVE PROFESSIONALS</h2>
          <Image className='mt-7 mb-7' alt='' src={Comma} width={150} height={75}/>
          <p className='text-[16px] leading-[27px] text-[#687799] font-montserrat'>We offer high-performance all-in-one systems ideal for creative professionals, combining sleek design with powerful features.</p>
        </div>
      </section>
    </div>
  )
}

export default AllinOneHighPerformance
