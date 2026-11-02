import React from 'react'
import ComputingImage from '../../../../../Components/Images/heavycomputingimage.png'
import Image from 'next/image'
import { safeRender, safeImage } from '@/lib/safe-html'

const HeavyComputing = ({ cmsData }) => {
    const fields = cmsData?.fields || cmsData || {};
    const headingText = safeRender(fields.heading, <>THE ULTIMATE SOLUTION FOR <br /> <span className='text-black bg-[#ffd900]' style={{ padding: '5px 15px 5px 15px' }}>HEAVY COMPUTING</span></>);

    const card1Title = safeRender(fields.card_1_title || fields.heading_2, "Exceptional Processing Power");
    const card1Desc = safeRender(fields.card_1_desc || fields.paragraph, "Unleash unparalleled speed with cutting-edge processors built for multitasking and high-performance tasks. Designed to handle demanding applications with efficiency and reliability.");

    const card2Title = safeRender(fields.card_2_title || fields.heading_3, "Advanced Graphics Capabilities");
    const card2Desc = safeRender(fields.card_2_desc || fields.paragraph_2, "Experience stunning visuals and superior rendering with state-of-the-art graphics technology. Ideal for gamers, creators, and professionals seeking immersive and detailed displays.");

    const card3Title = safeRender(fields.card_3_title || fields.heading_4, "Ample RAM and Storage");
    const card3Desc = safeRender(fields.card_3_desc || fields.paragraph_3, "Seamlessly multitask and store more with high-capacity drives and ample RAM. Optimized for speed, ensuring smooth and efficient performance for all tasks.");

    const card4Title = safeRender(fields.card_4_title || fields.heading_5, "Customizable and Scalable");
    const card4Desc = safeRender(fields.card_4_desc || fields.paragraph_4, "Build your perfect system with customizable and upgradeable options. Future-proof your investment with scalable features tailored to your needs.");

    const compImg = safeImage(fields.image_computingimage, ComputingImage);

    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="heavy-computing"
                aria-label="The Ultimate Solution for Heavy Computing"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] flex flex-col items-center justify-center h-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-16 relative overflow-hidden"
            >
                <h2 className='text-[#147d61] text-[20px] md:text-[45px] lg:text-[45px] font-[700] font-montserrat text-center'>{headingText}</h2>
                <div className="heavycomputing-bottom flex flex-col items-center justify-center w-full h-auto mt-10 md:mt-20 lg:mt-10">
                    <div className="heavycomputing-bottom-divs flex flex-col md:flex-row lg:flex-row items-center justify-between w-full h-auto lg:h-[400px] px-2 lg:px-5 gap-30 lg:gap-50">
                        <div className="left-part text-white rounded-[20px] p-[20px] lg:p-[32px]" style={{ backgroundImage: 'linear-gradient(300deg, #084032 0%, #118264 60%)' }}>
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>{card1Title}</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>{card1Desc}</p>
                        </div>
                        <div className="right-part -mt-20 text-black bg-[#e9e9e9] rounded-[20px] p-[20px] lg:p-[32px]" >
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>{card2Title}</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>{card2Desc}</p>
                        </div>
                    </div>
                    <div className="heavycomputing-bottom-divs my-10">
                        <Image alt='' src={compImg} width={602} height={204} className='lg:w-[602px] lg:h-[204px] md:w-[406px] md:h-[137px]'/>
                    </div>
                    <div className="heavycomputing-bottom-divs flex flex-col md:flex-row lg:flex-row items-center justify-between w-full h-auto lg:h-[400px] px-2 lg:px-5 gap-30 lg:gap-50 mt-0 md:mt-10 lg:mt-0">
                        <div className="right-part text-black bg-[#e9e9e9] rounded-[20px] p-[20px] lg:p-[32px]" >
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>{card3Title}</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>{card3Desc}</p>
                        </div>
                        <div className="left-part -mt-20 text-white rounded-[20px] p-[20px] lg:p-[32px]" style={{ backgroundImage: 'linear-gradient(300deg, #084032 0%, #118264 60%)' }}>
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>{card4Title}</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>{card4Desc}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HeavyComputing

