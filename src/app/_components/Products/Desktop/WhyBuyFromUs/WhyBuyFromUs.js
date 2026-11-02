import React from 'react'
import YelloBckground from '../../../../../Components/Images/yellowbackground.png'
import Image from 'next/image'
import { safeRender, safeImage } from '@/lib/safe-html'

const WhyBuyFromUs = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const headingText = safeRender(fields.heading, <>Why Buy <span className='text-[#118264]'>Desktops</span> From <br /> Us?</>);
  const paragraphText = safeRender(fields.paragraph, "Our desktop PCs are built to provide good performance for work, gaming, or personal purposes. Here’s why Crown Excel is your best bet for desktops:");

  const f1Title = safeRender(fields.feature_1_title || fields.heading_2, "Top Brands");
  const f1Desc = safeRender(fields.feature_1_desc || fields.paragraph_2, "We provide desktop PCs from leading manufacturers like Dell, HP, Lenovo, and many others, promising peak quality and dependability.");

  const f2Title = safeRender(fields.feature_2_title || fields.heading_3, "Latest Technology");
  const f2Desc = safeRender(fields.feature_2_desc || fields.paragraph_3, "Desktops have incorporated the latest in processors, high-capacity storage, and top-of-the-line graphics cards to ensure superb performance to clients.");

  const f3Title = safeRender(fields.feature_3_title || fields.heading_4, "Customization & Upgrades");
  const f3Desc = safeRender(fields.feature_3_desc || fields.paragraph_4, "Need specific configurations? We can provide customization services so that the desktop PC is tailored specifically to your needs-whether business or game-related.");

  const f4Title = safeRender(fields.feature_4_title || fields.heading_5, "Warranty & After-Sales Support");
  const f4Desc = safeRender(fields.feature_4_desc || fields.paragraph_5, "All our products carry warranties and offer technical support, which keeps your system up and running.");

  const yellowBg = safeImage(fields.image_yellobckground, YelloBckground);

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="why-buy-desktops-from-us"
        aria-label="Why Buy Desktops From Us"
        className="why-buy-from-us w-full max-w-[1536px] mx-auto bg-[#FFFFFF] flex flex-col md:flex-row lg:flex-row items-center gap-5 lg:gap-24 xl:gap-40 h-auto lg:h-[700px] my-10 sm:my-14 lg:my-20 relative overflow-hidden"
      >
        <div className="left-part w-full h-auto md:h-[782px] md:w-[436px] lg:w-[518px] lg:h-[700px] bg-[#ffd900] flex-shrink-0">
          <Image alt='' src={yellowBg} width={518} height={300} className="w-full object-cover" />
          <div className="text-part w-full h-full -mt-5 lg:mt-0 px-10 pt-0 pb-8 md:pt-[120px] md:pr-[82px] md:pb-[82px] md:pl-[82px] lg:pt-[120px] lg:pr-[82px] lg:pb-[82px] lg:pl-[82px]">
            <h2 className='text-[30px] md:text-[50px] md:leading-[60px] leading-[30px] lg:text-[50px] w-[250px] lg:w-[354px] font-[600] lg:leading-[60px] text-black font-montserrat'>{headingText}</h2>
            <p className='text-black mt-5 text-[16px] leading-[27px]'>{paragraphText}</p>
          </div>
        </div>
        <div className="right-part flex flex-col items-center gap-5 px-4 lg:px-0 py-6 md:py-0">
          <div className="right-part-divs text-black p-[14px] w-full h-auto lg:w-[476px] lg:h-[147px]">
            <h3 className='font-montserrat text-[22px] font-[600] leading-[26px]'>{f1Title}</h3>
            <p className='text-[16px] leading-[27px] font-montserrat mt-5'>{f1Desc}</p>
          </div>
          <div className="right-part-divs text-black p-[14px] w-full h-auto lg:w-[476px] lg:h-[147px]">
            <h3 className='font-montserrat text-[22px] font-[600] leading-[26px]'>{f2Title}</h3>
            <p className='text-[16px] leading-[27px] font-montserrat mt-5'>{f2Desc}</p>
          </div>
          <div className="right-part-divs text-white rounded-[20px] p-[30px] w-full h-auto lg:w-[476px] lg:h-auto" style={{backgroundImage: 'linear-gradient(339deg, #084032 25%, #118264 52%)'}}>
            <h3 className='font-montserrat text-[22px] font-[600] leading-[26px]'>{f3Title}</h3>
            <p className='text-[16px] leading-[27px] font-montserrat mt-5'>{f3Desc}</p>
          </div>
          <div className="right-part-divs text-black p-[14px] w-full h-auto lg:w-[476px] lg:h-[147px]">
            <h3 className='font-montserrat text-[22px] font-[600] leading-[26px]'>{f4Title}</h3>
            <p className='text-[16px] leading-[27px] font-montserrat mt-5'>{f4Desc}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhyBuyFromUs

