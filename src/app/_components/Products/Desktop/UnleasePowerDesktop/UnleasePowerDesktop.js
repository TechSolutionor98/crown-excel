import React from 'react'
import BackgroundImage from '../../../../../Components/Images/ButtonBackground.png'
import Computers from '../../../../../Components/Images/UnleaseDesktop1.png'
import Image from 'next/image'
import { safeRender, safeImage } from '@/lib/safe-html'

const UnleasePowerDesktop = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const headingText = safeRender(fields.heading, "UNLEASH POWER AND PERFORMANCE IN ONE DESKTOP SOLUTIONS");
  const heading2Text = safeRender(fields.heading_2, <>GET MORE WITH <br /> EFFICIENT DESKTOP SOLUTIONS</>);
  const paragraphText = safeRender(fields.paragraph, <>All these from powerful workstations for your business to perfect gaming PCs and affordable <br/> desktops for everyday use, Crown Excel has the right product to suit your needs. Other than <br/> desktop  computers,</>);

  const bgImage = safeImage(fields.image_backgroundimage, BackgroundImage);
  const compImage = safeImage(fields.image_computers, Computers);

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="efficient-desktop-solutions"
        aria-label="Efficient Desktop Solutions"
        className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] flex flex-col items-center justify-center h-auto md:px-3 px-5 py-10 lg:py-16 relative overflow-hidden"
      >
        <div className="heading w-full h-auto lg:w-[1140px] lg:h-[150px] px-2 md:px-5 lg:px-10 flex items-center lg:justify-center text-white" style={{backgroundImage: 'linear-gradient(126deg, #54595f 0%, #000000 100%)', borderRadius: '30px 0px 30px 0px', padding:'15px'}}>
          <h2 className='text-[14px] leading-[20px] md:text-[30px] lg:text-[48px] md:leading-[40px] lg:leading-[60px] font-[700] font-montserrat px-5 lg:px-10 text-center text-white'>{headingText}</h2>
        </div>
        <div className="info flex md:flex-row lg:flex-row flex-col items-center justify-between w-full h-auto lg:h-[400px] mt-12 lg:mt-20 max-w-[1400px] mx-auto" style={{borderRadius: '40px 0px 40px 0px'}}>
          <div className="info-left">
            <div className="heading px-5 py-2 rounded-[20px]" style={{background: 'linear-gradient(90deg, #ffd900 0%, #FFFFFF 31%)'}}>
              <h2 className='text-black text-[20px] leading-[25px] md:text-[50px] lg:text-[50px] font-[800] md:leading-[65px] lg:leading-[65px] tracking-[2px]'>{heading2Text}</h2>
            </div>
            <p className='font-montserrat text-black mt-5 text-[16px] lg:text-[16px] leading-[27px]'>{paragraphText}</p>
          </div>
          <div className="info-right relative mt-5 lg:mt-0 flex items-center justify-center">
            <div className="Background z-0">
              <Image alt='' src={bgImage} width={500} height={600}/>
            </div>
            <div className="computer absolute lg:absolute z-10">
              <Image alt='' src={compImage} width={415} height={300} className='z-10' />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UnleasePowerDesktop

