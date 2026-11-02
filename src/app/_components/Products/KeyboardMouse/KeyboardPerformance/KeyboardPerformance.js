import React from 'react'
import Background from '../../../../../Components/Images/PerformanceBackground.png'
const KeyboardPerformance = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="power-portability-performance-keyboard"
        aria-label="Power, Portability and Performance in One Keyboard"
        className="w-full max-w-[1536px] mx-auto h-auto min-h-[800px] md:h-[550px] lg:h-[650px] mt-10 lg:mt-20 py-10 md:py-0 relative overflow-hidden flex flex-col justify-center"
        style={{
          backgroundImage: `url(${Background.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h2 className='text-center text-[30px] lg:text-[42px] leading-[40px] lg:leading-[55px] text-black font-[700] '>POWER, PORTABILITY AND <br className='lg:block hidden'/> <span className='bg-[#ffd900] text-[#147d61]'>PERFOR</span>MANCE IN ONE <span className='bg-[#ffd900]'>KEYBOARD</span></h2>
        <div className="texts-area flex flex-col items-center justify-center gap-5 lg:gap-10 mt-10 lg:mt-20 px-3 lg:px-0 w-full max-w-[1240px] mx-auto">
          <div className="top-texts flex flex-col md:flex-row lg:flex-row gap-5 lg:gap-0  items-center justify-between w-full">
            <div className="text-area-1 bg-[#f1f1f1] rounded-[20px] text-black w-full lg:w-[582px] lg:h-auto flex flex-col items-center text-center px-2 py-[24px] lg:py-[24px] lg:px-[40px]">
              <h3 className='text-[25px] font-[600] text-center mb-3'>Dell KEYBOARD</h3>
              <p className=' text-[16px] text-[#687799] leading-[27px] font-montserrat'>Sleek, spill-resistant design with comfortable typing, customizable backlighting, and reliable connectivity for enhanced productivity.</p>
            </div>
            <div className="text-area-1 text-center bg-[#f1f1f1] rounded-[20px] text-black w-full lg:w-[582px] lg:h-auto flex flex-col px-2 py-[24px] lg:py-[24px] lg:px-[40px]" >
              <h3 className='text-[25px] font-[600] text-center mb-3'>HP KEYBOARD</h3>
              <p className='text-[16px] text-[#687799]  leading-[27px] font-montserrat'>Durable, ergonomic design with spill-resistant keys, customizable backlighting, and seamless connectivity for efficient typing and productivity.</p>
            </div>
          </div>
          <div className="bottom-te">
            <div className="text-area-1 text-center bg-[#f1f1f1] rounded-[20px] text-black w-full lg:w-[582px] md:w-[582px] lg:h-auto flex flex-col px-2 py-[24px] lg:py-[24px] lg:px-[40px]" >
              <h3 className='text-[25px] font-[600] text-center mb-3'>Lenovo KEYBOARD</h3>
              <p className='text-[16px] text-[#687799]  leading-[27px] font-montserrat'>Sleek, ergonomic design with precision keys, spill-resistance, and customizable backlighting for comfortable typing and enhanced productivity.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default KeyboardPerformance
