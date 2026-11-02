import React from 'react';
import Popular1 from '@/Components/Images/bestsellingphone1.png';
import Popular2 from '@/Components/Images/allinonephones2.png';
import Popular3 from '@/Components/Images/allinonephones3.png';
import Popular4 from '@/Components/Images/allinonephones4.png';
import Popular5 from '@/Components/Images/allinonephones5.png';
import Image from 'next/image';
import Link from 'next/link';
import { safeRender, safeImage } from '@/lib/safe-html';

const AllinOneCCTV = ({ cmsData }) => {
    const fields = cmsData?.fields || cmsData || {};

    const bannerHeading = safeRender(fields.banner_heading, 'ALL-IN-ONE CCTV & SECURITY SOLUTIONS');

    const commercialHeading = safeRender(fields.commercial_heading, 'For Commercial & Enterprise:');
    const commercialBtnText = safeRender(fields.commercial_btn_text, 'Inquire Bulk Orders');
    const commercialBtnLink = typeof fields.commercial_btn_link === 'object' && fields.commercial_btn_link?.value !== undefined
        ? fields.commercial_btn_link.value
        : (fields.commercial_btn_link || '/contact-us');

    const commercialItem1Title = safeRender(fields.commercial_item1_title, 'Hikvision 4MP IP Network Camera');
    const commercialItem2Title = safeRender(fields.commercial_item2_title, 'Hikvision Outdoor Bullet Camera');
    const commercialItem3Title = safeRender(fields.commercial_item3_title, 'XVIM 8CH 1080P DVR Surveillance Kit');

    const commercialItem1Img = safeImage(fields.image_popular1, Popular1);
    const commercialItem2Img = safeImage(fields.image_popular2, Popular2);
    const commercialItem3Img = safeImage(fields.image_popular3, Popular3);

    const residentialHeading = safeRender(fields.residential_heading, 'For Residential & Small Business:');
    const residentialBtnText = safeRender(fields.residential_btn_text, 'Get Wholesale Price');
    const residentialBtnLink = typeof fields.residential_btn_link === 'object' && fields.residential_btn_link?.value !== undefined
        ? fields.residential_btn_link.value
        : (fields.residential_btn_link || '/contact-us');

    const residentialItem1Title = safeRender(fields.residential_item1_title, 'Hikvision PTZ Dome Security Camera');
    const residentialItem2Title = safeRender(fields.residential_item2_title, 'Hikvision Outdoor Night Vision');
    const residentialItem3Title = safeRender(fields.residential_item3_title, 'Hikvision Weatherproof Security Bullet');

    const residentialItem1Img = safeImage(fields.image_popular4, Popular4);
    const residentialItem2Img = safeImage(fields.image_popular5, Popular5);
    const residentialItem3Img = safeImage(fields.image_popular2, Popular2);

    const Commercial = [
        { Image: commercialItem1Img, Title: commercialItem1Title },
        { Image: commercialItem2Img, Title: commercialItem2Title },
        { Image: commercialItem3Img, Title: commercialItem3Title },
    ];

    const Residential = [
        { Image: residentialItem1Img, Title: residentialItem1Title },
        { Image: residentialItem2Img, Title: residentialItem2Title },
        { Image: residentialItem3Img, Title: residentialItem3Title },
    ];

    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="all-in-one-cctv"
                aria-label="All-in-One CCTV & Security Solutions"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] pt-6 sm:pt-8 lg:pt-10 pb-10 lg:pb-16 relative overflow-hidden"
            >
                <h2 className='bg-[#ffd900] font-[700] flex items-center justify-center w-full h-[90px] text-center text-black text-[20px] md:text-[40px] lg:text-[50px] font-montserrat uppercase'>
                    {bannerHeading || 'ALL-IN-ONE CCTV & SECURITY SOLUTIONS'}
                </h2>
                <div className="for- mt-5 lg:mt-10">
                    <div className="text-button flex md:flex-row lg:flex-row flex-col items-center justify-between px-6 lg:px-20 py-7">
                        <h3 className='text-[#147d61] text-[27px] lg:text-[50px] font-[600] font-montserrat'>{commercialHeading || 'For Commercial & Enterprise:'}</h3>
                        <Link href={commercialBtnLink} className="inline-flex items-center justify-center whitespace-nowrap font-montserrat font-semibold text-[15px] sm:text-[16px] lg:text-[17px] tracking-wide text-white bg-[#147d61] hover:bg-[#0e5d47] h-[48px] lg:h-[50px] px-6 lg:px-8 rounded-xl shadow-md shadow-[#147d61]/20 hover:shadow-lg hover:shadow-[#147d61]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-in-out mt-4 md:mt-0">
                            {commercialBtnText || 'Inquire Bulk Orders'}
                        </Link>
                    </div>
                    <div className="products flex flex-col md:flex-row lg:flex-row items-center justify-around gap-10 lg:gap-0 lg:px-20 py-7" style={{
                        background: 'linear-gradient(to left, #000000 0%, #1a1a1a 50%, #2b2b2b 100%)'
                    }}>
                        {Commercial.map((item, i) => (
                            <div className="product-item flex flex-col items-center md:w-[250px] lg:w-[285px] h-auto" key={i}>
                                {item.Image && <Image className='w-full h-[285px] object-contain' src={item.Image} alt={typeof item.Title === 'string' ? item.Title : 'CCTV Product'} width={285} height={285} />}
                                {item.Title && <h4 className='text-[20px] lg:text-[24px] font-[700] mt-5 w-[285px] text-center text-white font-montserrat'>{item.Title}</h4>}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="for- mt-10">
                    <div className="text-button flex md:flex-row lg:flex-row flex-col items-center justify-between px-6 lg:px-20 py-7">
                        <h3 className='text-[#147d61] text-[27px] lg:text-[50px] font-[600] font-montserrat'>{residentialHeading || 'For Residential & Small Business:'}</h3>
                        <Link href={residentialBtnLink} className="inline-flex items-center justify-center whitespace-nowrap font-montserrat font-semibold text-[15px] sm:text-[16px] lg:text-[17px] tracking-wide text-white bg-[#147d61] hover:bg-[#0e5d47] h-[48px] lg:h-[50px] px-6 lg:px-8 rounded-xl shadow-md shadow-[#147d61]/20 hover:shadow-lg hover:shadow-[#147d61]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-in-out mt-4 md:mt-0">
                            {residentialBtnText || 'Get Wholesale Price'}
                        </Link>
                    </div>
                    <div className="products flex flex-col md:flex-row lg:flex-row items-center gap-10 lg:gap-0 justify-around lg:px-20 py-7" style={{
                        background: 'linear-gradient(to left, #000000 0%, #1a1a1a 50%, #2b2b2b 100%)'
                    }}>
                        {Residential.map((item, i) => (
                            <div className="product-item flex flex-col items-center md:w-[250px] lg:w-[285px] h-auto" key={i}>
                                {item.Image && <Image className='w-full h-[285px] object-contain' src={item.Image} alt={typeof item.Title === 'string' ? item.Title : 'CCTV Product'} width={285} height={285} />}
                                {item.Title && <h4 className='text-[20px] lg:text-[24px] font-[700] mt-5 w-[285px] text-center text-white font-montserrat'>{item.Title}</h4>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AllinOneCCTV;
