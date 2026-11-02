import React from 'react';
import ComputingImage from '@/Components/Images/ultimatephones.png';
import Image from 'next/image';
import { safeRender, safeImage } from '@/lib/safe-html';

const UltimatePhones = ({ cmsData }) => {
    const fields = cmsData?.fields || cmsData || {};
    const headingTop = safeRender(fields.heading, 'THE ULTIMATE SOLUTION FOR');
    const headingHighlight = safeRender(fields.heading_highlight, 'SMARTPHONES & BUSINESS PHONES');

    const card1Title = safeRender(fields.card1_title, 'Enterprise Reliability & Speed');
    const card1Desc = safeRender(
        fields.card1_desc,
        'Empower your workforce with top-tier smartphones and corporate communication devices. Featuring the latest iOS and Android operating systems, enterprise encryption, and dependable battery life to ensure seamless productivity anywhere.'
    );

    const card2Title = safeRender(fields.card2_title, 'Global Compatibility');
    const card2Desc = safeRender(
        fields.card2_desc,
        'All our phones are factory unlocked with multi-band 5G and international carrier compatibility. Ideal for international businesses, UAE corporations, and retail traders requiring versatile, high-demand devices.'
    );

    const centerImg = safeImage(fields.image_computingimage, ComputingImage);

    const card3Title = safeRender(fields.card3_title, 'Wholesale Volume & Bulk Supply');
    const card3Desc = safeRender(
        fields.card3_desc,
        'Crown Excel specializes in wholesale smartphone distribution with competitive pricing on large volumes. Whether purchasing for corporate fleets or retail resale, we guarantee reliable inventory and fast fulfillment.'
    );

    const card4Title = safeRender(fields.card4_title, 'Authenticity & Warranty Support');
    const card4Desc = safeRender(
        fields.card4_desc,
        'Every device is 100% brand new, authentic, and supported with official manufacturer warranty. Our technical team ensures hassle-free procurement and dedicated support for every client.'
    );

    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="ultimate-phones"
                aria-label="The Ultimate Solution for Smartphones & Business Phones"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] flex flex-col items-center justify-center h-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-16 relative overflow-hidden"
            >
                <h2 className='text-[#147d61] text-[20px] md:text-[45px] lg:text-[45px] font-[700] font-montserrat text-center'>
                    {headingTop} <br /> <span className='text-black bg-[#ffd900]' style={{ padding: '5px 15px' }}>{headingHighlight}</span>
                </h2>
                <div className="heavycomputing-bottom flex flex-col items-center justify-center w-full h-auto mt-10 md:mt-20 lg:mt-10">
                    <div className="heavycomputing-bottom-divs flex flex-col md:flex-row lg:flex-row items-center justify-between w-full h-auto lg:h-[400px] px-2 lg:px-5 gap-30 lg:gap-50">
                        <div className="left-part text-white rounded-[20px] p-[20px] lg:p-[32px]" style={{ backgroundImage: 'linear-gradient(300deg, #084032 0%, #118264 60%)' }}>
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>{card1Title}</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>{card1Desc}</p>
                        </div>
                        <div className="right-part -mt-20 text-black bg-[#e9e9e9] rounded-[20px] p-[20px] lg:p-[32px]">
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>{card2Title}</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>{card2Desc}</p>
                        </div>
                    </div>
                    <div className="heavycomputing-bottom-divs my-20 md:my-10">
                        <Image alt='Phones solutions' src={centerImg} width={622} height={326} className='lg:w-[622px] rounded-[30px] lg:h-[326px] md:w-[406px] md:h-[250px]' priority />
                    </div>
                    <div className="heavycomputing-bottom-divs flex flex-col md:flex-row lg:flex-row items-center justify-between w-full h-auto lg:h-[400px] px-2 lg:px-5 gap-30 lg:gap-50 mt-0 md:mt-10 lg:mt-0">
                        <div className="right-part text-black bg-[#e9e9e9] rounded-[20px] p-[20px] lg:p-[32px]">
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
    );
};

export default UltimatePhones;
