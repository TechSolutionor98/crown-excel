import React from 'react'

const AccessoriesWhyFromUs = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="why-buy-accessories-from-us"
        aria-label="Why Buy Accessories From Us"
        className="w-full max-w-[1536px] mx-auto flex lg:flex-row md:flex-row flex-col items-center md:gap-10 lg:gap-0 justify-between my-10 px-6 sm:px-10 lg:px-20 py-10 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #3d3f3f 30%, #232323 100%)',
          padding: '60px 20px',
        }}
      >
        <div className="fromus-left w-full lg:w-[607px]">
          <h2 className='text-[30px] lg:text-[45px] font-[600] leading-[35px] lg:leading-[60px] font-montserrat'>Why Buy <br /> <span className='text-[#0f7459] font-[900]'>Accessories</span> From Us?</h2>
          <p className='text-[16px] mt-5 w-full lg:w-[425px] leading-[27px]'>Purchasing accessories can be a challenging task—finding the right, compatible products with reliable customer support is not always easy.
</p>
          <p className='text-[16px] mt-5 w-full lg:w-[425px] leading-[27px]'>
            That’s why Crown Excel is the ideal destination for all your hardware and accessory needs. We understand the value of your time, productivity, and the importance of dependable after-sales support. Our goal is to ensure you have everything you need to stay focused, efficient, and exactly where you want to be.</p>
        </div>
        <div className="fromus flex flex-col gap-5 mt-5 lg:mt-0">
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[173px] bg-[#f1f1f1] rounded-[20px] flex flex-col  text-left justify-center gap-3 hover:bg-yellow-300 transition px-3 py-5  lg:pt-6 lg:px-10 lg:pb-5" >
            <h3 className='text-left text-[24px] lg:text-[32px] font-[600] leading-[32px]'>World&apos;s Best Brands</h3>
            <p className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[27px]'>We bring you trusted names worldwide, providing high-quality accessories that are both reliable and efficient, giving you peace of mind.</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[173px] bg-[#f1f1f1] rounded-[20px] flex flex-col  text-left justify-center gap-3 hover:bg-yellow-300 transition px-3 py-5 lg:pt-6 lg:px-10 lg:pb-5" >
            <h3 className='text-left text-[24px] lg:text-[32px] font-[600] leading-[32px]'>Competitive Pricing</h3>
            <p className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[27px]'>Get the best deals on premium accessories without compromising on performance or durability.</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[173px] bg-[#f1f1f1] rounded-[20px] flex flex-col  text-left justify-center gap-3 hover:bg-yellow-300 transition px-3 py-5 lg:pt-6 lg:px-10 lg:pb-5" >
            <h3 className='text-left text-[24px] lg:text-[32px] font-[600] leading-[32px]'>Warranty & Support</h3>
            <p className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[27px]'>All our accessories come with a manufacturer’s warranty, and we provide full support to ensure your devices remain operational and well-maintained.</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[173px] bg-[#f1f1f1] rounded-[20px] flex flex-col  text-left justify-center gap-3 hover:bg-yellow-300 transition px-3 py-5 lg:pt-6 lg:px-10 lg:pb-5">
            <h3 className='text-left text-[24px] lg:text-[32px] font-[600] leading-[32px]'>Expert Guidance</h3>
            <p className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[27px]'>Our team helps you select the right accessories tailored to your specific requirements, offering expert recommendations for functionality, design, and value.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AccessoriesWhyFromUs
