import React from 'react'
import GamingLaptop1 from '../../../../../Components/Images/unlimitedkeyboard1.png'
import GamingLaptop2 from '../../../../../Components/Images/unlimitedkeyboard2.png'
import Eclipse from '../../../../../Components/Images/ecclipse.png'
import Stars from '../../../../../Components/Images/stars.png'
import Image from 'next/image'
const UnlimitedGamingKeyboards = () => {
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="unlimited-gaming-keyboards"
        aria-label="Unlimited Gaming Keyboards and Mice for Unmatched Performance"
        className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] py-8 lg:py-12 px-5 lg:px-10 overflow-hidden flex flex-col gap-5 lg:gap-8 md:flex-row lg:flex-row items-center justify-between"
      >
        <div className="gaming-left relative w-full h-auto lg:w-[797px] lg:h-[590px] rounded-[30px] px-5 pt-5 pb-20 lg:pt-[60px] lg:px-[40px] lg:pb-[200px]" style={{
          background: 'linear-gradient(135deg, #3d3f3f 30%, #232323 100%)'
        }}>
          <Image alt='' width={50} height={50} src={Stars} className='absolute right-20 top-18 lg:top-6 lg:right-50 '/>
          <h2 className='text-[#ffd900] font-montserrat text-[20px] lg:text-[34px] font-[700] leading-[30px] lg:leading-[40px]'>UNLIMITED GAMING KEYBOARDS AND<br className='hidden lg:block'/> MICE FOR UNMATCHED PERFORMANCE</h2>
          <p className='text-[14px] lg:text-[16px] leading-[27px] font-montserrat mt-5'>Our gaming keyboards and mice are crafted to deliver exceptional precision and responsiveness. Equipped with customizable RGB lighting, high-DPI sensors, and ergonomic designs, these peripherals enhance your gaming experience with unmatched accuracy and comfort. With durable switches, programmable keys, and efficient build quality, our gaming keyboards and mice are designed to handle even the most demanding games, offering ultimate control and performance in one package.</p>
          <div className="eclipse absolute bottom-0 left-0 w-[150px] lg:w-[350px]">
              <Image alt='' width={323} height={180} src={Eclipse}/>
              <Image alt='' width={50} height={50} src={Stars} className='absolute top-0 right-0 w-[30px] lg:w-[50px]'/>
          </div>
        </div>
        <div className="gaming-right flex flex-row md:flex-col md:items-center md:justify-center md:gap-20 lg:flex-col gap-0 lg:gap-10">
          <Image src={GamingLaptop1} alt="Gaming Laptop 1" width={400} height={300} className="object-cover rounded-[30px] w-[150px] md:w-[467px] lg:w-[467px] h-full" />
          <Image src={GamingLaptop2} alt="Gaming Laptop 2" width={400} height={300} className="object-cover rounded-[30px] w-[150px] md:w-[467px] lg:w-[467px] h-full mt-0 lg:mt-4" />
        </div>
      </section>
    </div>
  )
}

export default UnlimitedGamingKeyboards
