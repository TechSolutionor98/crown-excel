import React from 'react'

const BestKeyboards = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="best-keyboards-and-mice"
        aria-label="Best Keyboards and Mice with Great Quality From Prestigious Brands"
        className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] py-10 lg:py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center overflow-hidden"
      >
        <h2 className='text-center text-[30px] lg:text-[50px] font-[700] text-[#318d74] leading-[35px] lg:leading-[57px] font-montserrat'>BEST KEYBOARDS AND MICE WITH GREAT QUALITY FROM PRESTIGIOUS BRANDS</h2>
        <div className="best-laptops-text relative mt-10 mb-4">
          {/* <div className="box-left hidden lg:block absolute left-0 -top-5 border-l-[0px] border-t-[10px] border-r-[10px] border-b-[10px] border-[#272827]  z-0 w-[300px] h-[120px]"></div> */}
          <div className="text-center flex items-center justify-center flex-col gap-5">
              <p className='text-black z-10 text-[16px] leading-[27px] text-center font-montserrat'>Our keyboards and mice come from esteemed manufacturers, offering the latest features and ergonomic <br /> designs to keep you comfortable, productive, and in control.</p>
              <button className='bg-[#0f7459] rounded shadow-lg font-[500] font-montserrat w-[133px] h-[35px] text-[15px] flex items-center justify-center' style={{padding: '10px 20px 10px 20px'}}>Get A Quote</button>
          </div>
          {/* <div className="box-left hidden lg:hidden absolute right-0 -top-5 border-l-[10px] border-t-[10px] border-r-[0px] border-b-[10px] border-[#272827]  z-0 w-[300px] h-[120px]"></div> */}
        </div>
      </section>
    </div>
  )
}

export default BestKeyboards
