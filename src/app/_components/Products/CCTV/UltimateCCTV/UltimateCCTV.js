import React from 'react';
import CCTVProductImg from '@/Components/Images/allinonephones3.png';
import Image from 'next/image';
import { safeRender, safeImage } from '@/lib/safe-html';

const UltimateCCTV = ({ cmsData }) => {
    const fields = cmsData?.fields || cmsData || {};
    let headingTop = safeRender(fields.heading, 'THE ULTIMATE SOLUTION FOR');
    const headingHighlight = safeRender(fields.heading_highlight, 'CCTV & SURVEILLANCE SYSTEMS');

    // Prevent duplicate text if full heading was accidentally stored in headingTop
    if (headingTop && headingHighlight && headingTop.includes(headingHighlight)) {
        headingTop = headingTop.replace(headingHighlight, '').replace(/\s+/g, ' ').trim();
    }

    const card1Title = safeRender(fields.card1_title, 'High-Definition Clarity & Night Vision');
    const card1Desc = safeRender(
        fields.card1_desc,
        'Safeguard your commercial properties, offices, and warehouses with industry-leading CCTV security cameras. Featuring 4K resolution, ultra-low-light night vision, smart motion detection, and wide-angle surveillance.'
    );

    const card2Title = safeRender(fields.card2_title, 'IP67 Weatherproof Durability');
    const card2Desc = safeRender(
        fields.card2_desc,
        'Engineered specifically to endure extreme desert heat, humidity, and outdoor dust in Dubai and across the UAE. Rugged metal housing guarantees 24/7 continuous operation in challenging environments.'
    );

    const centerImg = safeImage(fields.image_cctvproductimg, CCTVProductImg);

    const card3Title = safeRender(fields.card3_title, 'Scalable NVR & Cloud Integration');
    const card3Desc = safeRender(
        fields.card3_desc,
        'Easily expand your security infrastructure from standalone cameras to 32-channel enterprise NVR systems with remote cloud viewing, secure local backup, and encrypted mobile access.'
    );

    const card4Title = safeRender(fields.card4_title, 'Wholesale Supply & SIRA-Compliant Tech');
    const card4Desc = safeRender(
        fields.card4_desc,
        'We provide wholesale bulk pricing for security integrators, contractors, and businesses seeking approved, certified CCTV hardware with complete manufacturer guarantees.'
    );

    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="ultimate-cctv"
                aria-label="The Ultimate Solution for CCTV & Surveillance Systems"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] flex flex-col items-center justify-center h-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-16 relative overflow-hidden"
            >
                <h2 className='text-[#147d61] text-[20px] md:text-[45px] lg:text-[45px] font-[700] font-montserrat text-center'>
                    {headingTop || 'THE ULTIMATE SOLUTION FOR'} <br /> <span className='text-black bg-[#ffd900]' style={{ padding: '5px 15px' }}>{headingHighlight || 'CCTV & SURVEILLANCE SYSTEMS'}</span>
                </h2>
                <div className="heavycomputing-bottom flex flex-col items-center justify-center w-full h-auto mt-10 md:mt-20 lg:mt-10">
                    <div className="heavycomputing-bottom-divs flex flex-col md:flex-row lg:flex-row items-center justify-between w-full h-auto lg:h-[400px] px-2 lg:px-5 gap-30 lg:gap-50">
                        <div className="left-part text-white rounded-[20px] p-[20px] lg:p-[32px]" style={{ backgroundImage: 'linear-gradient(300deg, #084032 0%, #118264 60%)' }}>
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>{card1Title || 'High-Definition Clarity & Night Vision'}</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>{card1Desc || 'Safeguard your commercial properties, offices, and warehouses with industry-leading CCTV security cameras. Featuring 4K resolution, ultra-low-light night vision, smart motion detection, and wide-angle surveillance.'}</p>
                        </div>
                        <div className="right-part -mt-20 text-black bg-[#e9e9e9] rounded-[20px] p-[20px] lg:p-[32px]">
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>{card2Title || 'IP67 Weatherproof Durability'}</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>{card2Desc || 'Engineered specifically to endure extreme desert heat, humidity, and outdoor dust in Dubai and across the UAE. Rugged metal housing guarantees 24/7 continuous operation in challenging environments.'}</p>
                        </div>
                    </div>
                    <div className="heavycomputing-bottom-divs my-20 md:my-10">
                        <Image alt='CCTV surveillance system kit' src={centerImg} width={622} height={326} className='lg:w-[622px] rounded-[30px] lg:h-[326px] md:w-[406px] md:h-[250px] object-contain bg-[#f3f4f6] p-4' priority />
                    </div>
                    <div className="heavycomputing-bottom-divs flex flex-col md:flex-row lg:flex-row items-center justify-between w-full h-auto lg:h-[400px] px-2 lg:px-5 gap-30 lg:gap-50 mt-0 md:mt-10 lg:mt-0">
                        <div className="right-part text-black bg-[#e9e9e9] rounded-[20px] p-[20px] lg:p-[32px]">
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>{card3Title || 'Scalable NVR & Cloud Integration'}</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>{card3Desc || 'Easily expand your security infrastructure from standalone cameras to 32-channel enterprise NVR systems with remote cloud viewing, secure local backup, and encrypted mobile access.'}</p>
                        </div>
                        <div className="left-part -mt-20 text-white rounded-[20px] p-[20px] lg:p-[32px]" style={{ backgroundImage: 'linear-gradient(300deg, #084032 0%, #118264 60%)' }}>
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>{card4Title || 'Wholesale Supply & SIRA-Compliant Tech'}</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>{card4Desc || 'We provide wholesale bulk pricing for security integrators, contractors, and businesses seeking approved, certified CCTV hardware with complete manufacturer guarantees.'}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UltimateCCTV;
