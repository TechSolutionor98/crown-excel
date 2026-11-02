import React from 'react'

const WhyBuyKeyboardFromUs = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="why-buy-keyboards-from-us"
        aria-label="Why Buy Keyboards and Mice From Us"
        className="w-full max-w-[1536px] mx-auto flex md:flex-row lg:flex-row flex-col items-center justify-between my-10 px-6 sm:px-10 lg:px-20 py-10 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #3d3f3f 30%, #232323 100%)',
          padding: '60px 20px',
        }}
      >
        <div className="fromus-left w-full lg:w-[607px]">
          <h2 className='text-[30px] lg:text-[45px] font-[600] leading-[35px] lg:leading-[60px] font-montserrat'>Why Buy <br className='hidden md:block'/> <span className='text-[#0f7459] font-[900]'>Keyboards and Mice</span> From <br className='hidden md:block'/> Us?</h2>
          <p className='text-[16px] mt-5 w-full lg:w-[425px] leading-[27px]'>Our keyboards and mice are carefully selected to <br className='hidden md:block'/> cater to a variety of users, whether for professional <br className='hidden md:block'/> productivity, gaming, or everyday tasks. Here’s why <br className='hidden md:block'/> choosing keyboards and mice from Crown Excel is <br className='hidden md:block'/> your best option:</p>
        </div>
        <div className="fromus flex flex-col gap-5 mt-5 lg:mt-0">
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[173px] bg-[#f1f1f1] rounded-[20px] flex flex-col  text-left justify-center gap-3 hover:bg-yellow-300 transition px-3 py-5  lg:pt-6 lg:px-10 lg:pb-5" >
              <h3 className='text-left text-[24px] lg:text-[32px] font-[600] leading-[32px]'>World&apos;s Best Brands</h3>
              <p className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[27px]'>We source products from globally trusted brands, ensuring top-notch quality and innovative designs that provide a seamless experience.</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[173px] bg-[#f1f1f1] rounded-[20px] flex flex-col  text-left justify-center gap-3 hover:bg-yellow-300 transition px-3 py-5 lg:pt-6 lg:px-10 lg:pb-5" >
              <h3 className='text-left text-[24px] lg:text-[32px] font-[600] leading-[32px]'>Competitive Pricing</h3>
              <p className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[27px]'>Get the best value for your money with our affordable yet high-performance keyboards and mice.</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[173px] bg-[#f1f1f1] rounded-[20px] flex flex-col  text-left justify-center gap-3 hover:bg-yellow-300 transition px-3 py-5 lg:pt-6 lg:px-10 lg:pb-5" >
              <h3 className='text-left text-[24px] lg:text-[32px] font-[600] leading-[32px]'>Warranty & Support</h3>
              <p className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[27px]'>All our keyboards and mice come with a manufacturer’s warranty and our comprehensive after-sales support to ensure satisfaction.</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[173px] bg-[#f1f1f1] rounded-[20px] flex flex-col  text-left justify-center gap-3 hover:bg-yellow-300 transition px-3 py-5 lg:pt-6 lg:px-10 lg:pb-5">
              <h3 className='text-left text-[24px] lg:text-[32px] font-[600] leading-[32px]'>Expert Guidance</h3>
              <p className='text-[14px] lg:text-[16px] leading-[20px] lg:leading-[27px]'>Our team offers expert recommendations to help you choose the right peripherals based on your requirements for comfort, performance, and design.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhyBuyKeyboardFromUs
