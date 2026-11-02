import React from 'react'
import Background from '../../../../../Components/Images/PerformanceBackground.png'
const PerformancePrinters = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="power-portability-performance"
        aria-label="Power, Portability and Performance in One Printer"
        className="w-full max-w-[1536px] mx-auto h-auto min-h-[900px] md:h-[700px] lg:h-[700px] py-10 md:py-0 relative overflow-hidden flex flex-col justify-center"
        style={{
          backgroundImage: `url(${Background.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h2 className='text-center text-[26px] md:text-[40px] lg:text-[42px] leading-[35px] md:leading-[44px] lg:leading-[55px] text-black font-[700] '>POWER, PORTABILITY AND <br className='md:block hidden'/> <span className='bg-[#ffd900] text-[#147d61]'>PERFOR</span>MANCE IN ONE <span className='bg-[#ffd900]'>PRINTER</span></h2>
        <div className="texts-area flex flex-col items-center justify-center gap-5 lg:gap-10 mt-10 lg:mt-20 px-3 lg:px-0 w-full max-w-[1240px] mx-auto">
          <div className="top-texts flex flex-col md:flex-row lg:flex-row gap-5 lg:gap-0  items-center justify-between w-full">
            <div className="text-area-1 bg-[#f1f1f1] rounded-[20px] text-black w-full lg:w-[582px] md:h-[217px] lg:h-[217px] flex flex-col items-center text-center px-2 py-[24px] lg:py-[24px] lg:px-[40px]">
              <h3 className='text-[25px] font-[600] text-center mb-3'>HP Printers</h3>
              <p className=' text-[16px] text-[#687799] leading-[27px] font-montserrat'>Designed to deliver a balance between quality, efficiency, and innovation. HP printers are perfect for both home and office use, with options for high-volume printing or vibrant color printing needs.</p>
            </div>
            <div className="text-area-1 text-center bg-[#f1f1f1] rounded-[20px] text-black w-full md:h-[217px] lg:w-[582px] lg:h-[217px] flex flex-col px-2 py-[24px] lg:py-[24px] lg:px-[40px]" >
              <h3 className='text-[25px] font-[600] text-center mb-3'>Canon Printers</h3>
              <p className='text-[16px] text-[#687799]  leading-[27px] font-montserrat'>Renowned for their exceptional image quality and durability, Canon printers are ideal for creative professionals and enterprises requiring precision.</p>
            </div>
          </div>
          <div className="bottom-te">
            <div className="text-area-1 text-center bg-[#f1f1f1] rounded-[20px] text-black w-full md:w-[500px] md:h-[217px] lg:w-[582px] lg:h-[189px] flex flex-col px-2 py-[24px] lg:py-[24px] lg:px-[40px]" >
              <h3 className='text-[25px] font-[600] text-center mb-3'>Epson Printers</h3>
              <p className='text-[16px] text-[#687799]  leading-[27px] font-montserrat'>Reliable and efficient, Epson printers offer advanced technology for eco-friendly printing and long-lasting performance, making them perfect for everyday tasks or specialized projects.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PerformancePrinters
