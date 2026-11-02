import React from 'react';
import Phone1 from '@/Components/Images/allinonephones1.png';
import Phone2 from '@/Components/Images/allinonephones6.png';
import Phone3 from '@/Components/Images/bestsellingphone2.png';
import Image from 'next/image';
import Link from 'next/link';
import { safeRender, safeImage } from '@/lib/safe-html';

const AllinOnePhones = ({ cmsData }) => {
    const fields = cmsData?.fields || cmsData || {};

    const bannerHeading = safeRender(fields.banner_heading, 'ALL-IN-ONE PHONE SOLUTIONS');

    const bizHeading = safeRender(fields.biz_heading, 'For Businesses:');
    const bizBtnText = safeRender(fields.biz_btn_text, 'Visit Our Store');
    const bizBtnLink = typeof fields.biz_btn_link === 'object' && fields.biz_btn_link?.value !== undefined
        ? fields.biz_btn_link.value
        : (fields.biz_btn_link || 'https://www.grabatoz.ae/ae-en');

    const bizItem1Title = safeRender(fields.biz_item1_title, 'Apple iPhone 16 128GB');
    const bizItem2Title = safeRender(fields.biz_item2_title, 'Samsung Galaxy S24 Ultra');
    const bizItem3Title = safeRender(fields.biz_item3_title, 'Apple iPhone 16 Pro');

    const bizItem1Img = safeImage(fields.image_phone1, Phone1);
    const bizItem2Img = safeImage(fields.image_phone2, Phone2);
    const bizItem3Img = safeImage(fields.image_phone3, Phone3);

    const resellerHeading = safeRender(fields.reseller_heading, 'For Retailers & Resellers:');
    const resellerBtnText = safeRender(fields.reseller_btn_text, 'Get Wholesale Price');
    const resellerBtnLink = typeof fields.reseller_btn_link === 'object' && fields.reseller_btn_link?.value !== undefined
        ? fields.reseller_btn_link.value
        : (fields.reseller_btn_link || '/contact-us');

    const resellerItem1Title = safeRender(fields.reseller_item1_title, 'Samsung Galaxy S24 Ultra');
    const resellerItem2Title = safeRender(fields.reseller_item2_title, 'Apple iPhone 16');
    const resellerItem3Title = safeRender(fields.reseller_item3_title, 'Apple iPhone 16 Dual-SIM');

    const resellerItem1Img = safeImage(fields.image_phone2, Phone2);
    const resellerItem2Img = safeImage(fields.image_phone1, Phone1);
    const resellerItem3Img = safeImage(fields.image_phone3, Phone3);

    const Business = [
        { Image: bizItem1Img, Title: bizItem1Title },
        { Image: bizItem2Img, Title: bizItem2Title },
        { Image: bizItem3Img, Title: bizItem3Title },
    ];

    const Individuals = [
        { Image: resellerItem1Img, Title: resellerItem1Title },
        { Image: resellerItem2Img, Title: resellerItem2Title },
        { Image: resellerItem3Img, Title: resellerItem3Title },
    ];

    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="all-in-one-phones"
                aria-label="All-in-One Phone Solutions"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] pt-6 sm:pt-8 lg:pt-10 pb-10 lg:pb-16 relative overflow-hidden"
            >
                <h2 className='bg-[#ffd900] font-[700] flex items-center justify-center w-full h-[90px] text-center text-black text-[20px] md:text-[40px] lg:text-[50px] font-montserrat uppercase'>
                    {bannerHeading}
                </h2>
                <div className="for- mt-5 lg:mt-10">
                    <div className="text-button flex md:flex-row lg:flex-row flex-col items-center justify-between px-6 lg:px-20 py-7">
                        <h3 className='text-[#147d61] text-[27px] lg:text-[50px] font-[600] font-montserrat'>{bizHeading}</h3>
                        <Link href={bizBtnLink} className='p-[5px] lg:p-[10px] mt-5 lg:mt-0 bg-[#147d61] hover:bg-[#0f5f4a] text-white flex items-center justify-center text-[18px] lg:text-[20px] font-[500] w-[180px] h-[45px] rounded-[10px] transition-all'>
                            {bizBtnText}
                        </Link>
                    </div>
                    <div className="products flex flex-col md:flex-row lg:flex-row items-center justify-around gap-10 lg:gap-0 lg:px-20 py-7" style={{
                        background: 'linear-gradient(to left, #000000 0%, #1a1a1a 50%, #2b2b2b 100%)'
                    }}>
                        {Business.map((item, i) => (
                            <div className="product-item flex flex-col items-center md:w-[250px] lg:w-[285px] h-auto" key={i}>
                                {item.Image && <Image className='w-full h-[285px] object-contain' src={item.Image} alt={typeof item.Title === 'string' ? item.Title : 'Phone'} width={285} height={285} />}
                                {item.Title && <h4 className='text-[20px] lg:text-[24px] font-[700] mt-5 w-[285px] text-center text-white font-montserrat'>{item.Title}</h4>}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="for- mt-10">
                    <div className="text-button flex md:flex-row lg:flex-row flex-col items-center justify-between px-6 lg:px-20 py-7">
                        <h3 className='text-[#147d61] text-[27px] lg:text-[50px] font-[600] font-montserrat'>{resellerHeading}</h3>
                        <Link href={resellerBtnLink} className='p-[5px] lg:p-[10px] mt-5 lg:mt-0 bg-[#147d61] hover:bg-[#0f5f4a] text-white flex items-center justify-center text-[18px] lg:text-[20px] font-[500] w-[180px] h-[45px] rounded-[10px] transition-all'>
                            {resellerBtnText}
                        </Link>
                    </div>
                    <div className="products flex flex-col md:flex-row lg:flex-row items-center gap-10 lg:gap-0 justify-around lg:px-20 py-7" style={{
                        background: 'linear-gradient(to left, #000000 0%, #1a1a1a 50%, #2b2b2b 100%)'
                    }}>
                        {Individuals.map((item, i) => (
                            <div className="product-item flex flex-col items-center md:w-[250px] lg:w-[285px] h-auto" key={i}>
                                {item.Image && <Image className='w-full h-[285px] object-contain' src={item.Image} alt={typeof item.Title === 'string' ? item.Title : 'Phone'} width={285} height={285} />}
                                {item.Title && <h4 className='text-[20px] lg:text-[24px] font-[700] mt-5 w-[285px] text-center text-white font-montserrat'>{item.Title}</h4>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AllinOnePhones;
