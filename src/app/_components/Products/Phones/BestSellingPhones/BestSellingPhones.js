"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import BestPhone1 from '@/Components/Images/bestsellingphone2.png';
import BestPhone2 from '@/Components/Images/allinonephones6.png';
import BestPhone3 from '@/Components/Images/allinonephones1.png';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { safeRender, safeImage } from '@/lib/safe-html';

const BestSellingPhones = ({ cmsData }) => {
    const fields = cmsData?.fields || cmsData || {};
    const heading = safeRender(fields.heading, 'OUR BEST-SELLING PHONES');

    const slide1Title = safeRender(fields.slide1_title, 'Apple iPhone 16 (128GB)');
    const slide1Desc = safeRender(fields.slide1_desc, 'A18 Bionic chip, New 6-core CPU with 2 performance and 4 efficiency cores, Camera Control, and 48MP Fusion camera.');
    const slide1Img = safeImage(fields.image_bestphone1, BestPhone1);

    const slide2Title = safeRender(fields.slide2_title, 'Samsung Galaxy S24 Ultra');
    const slide2Desc = safeRender(fields.slide2_desc, 'Flagship smartphone featuring Snapdragon 8 Gen 3, titanium frame, quad-telephoto camera, Galaxy AI, and built-in S Pen.');
    const slide2Img = safeImage(fields.image_bestphone2, BestPhone2);

    const slide3Title = safeRender(fields.slide3_title, 'Apple iPhone 16 Standard');
    const slide3Desc = safeRender(fields.slide3_desc, 'Advanced dual-camera system, Action button, vibrant Super Retina XDR display, and all-day battery life for business and daily use.');
    const slide3Img = safeImage(fields.image_bestphone3, BestPhone3);

    const carouselData = [
        {
            title: slide1Title,
            description: slide1Desc,
            image: slide1Img,
        },
        {
            title: slide2Title,
            description: slide2Desc,
            image: slide2Img,
        },
        {
            title: slide3Title,
            description: slide3Desc,
            image: slide3Img,
        },
    ];

    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="best-selling-phones"
                aria-label="Best Selling Phones"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] py-8 relative lg:mt-10 overflow-hidden"
            >
                <h2 className="text-center text-3xl md:text-[40px] lg:text-[60px] lg:leading-[60px] lg:font-[800] font-[800] text-[#16795e] mb-8 font-montserrat">
                {heading}
            </h2>

            {/* Desktop Swiper */}
            <div className="hidden md:block relative overflow-hidden max-w-full mx-auto lg:mt-30 isolate">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        nextEl: '.swiper-button-next-desktop',
                        prevEl: '.swiper-button-prev-desktop',
                    }}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={20}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 1, spaceBetween: 15 },
                        768: { slidesPerView: 1, spaceBetween: 20 },
                        1024: { slidesPerView: 1, spaceBetween: 30 },
                    }}
                    className="w-full relative z-10"
                >
                    {carouselData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col md:flex-row items-center md:justify-center lg:justify-between min-w-full px-6 py-6 md:py-0">
                                <div className="text-center basis-[40%] ml-10 md:text-left space-y-4">
                                    <h2 className="text-[48px] leading-[48px] font-montserrat font-bold text-black">
                                        {item.title}
                                    </h2>
                                    <p className="text-[#7885a4] text-[16px] md:text-lg font-medium mt-10">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="flex basis-[60%] justify-center mt-6 ml-2 pl-10 md:mt-0 md:-mr-15">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={454}
                                        height={550}
                                        className="rounded-lg object-contain lg:w-[454px] lg:h-[550px] md:w-[350px] md:h-[450px]"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <div className="swiper-button-prev-desktop absolute text-white text-[24px] font-[500] -left-4 top-1/2 -translate-y-1/2 z-10 bg-[#147d61] rounded-full shadow hover:cursor-pointer" style={{ padding: '10px' }}>
                        <FaAngleLeft />
                    </div>
                    <div className="swiper-button-next-desktop absolute text-white text-[24px] font-[500] -right-4 top-1/2 -translate-y-1/2 z-10 bg-[#147d61] rounded-full shadow hover:cursor-pointer" style={{ padding: '10px' }}>
                        <FaAngleRight />
                    </div>
                </Swiper>
                <div className="yellow-div absolute bg-[#ffd900] z-0 h-[550px] w-[650px] top-0 right-0 hidden md:block pointer-events-none" style={{ borderRadius: '360px 0 0 360px' }}></div>
            </div>

            {/* Mobile Swiper */}
            <div className="md:hidden relative overflow-hidden h-[400px] isolate">
                <div className="absolute bg-[#ffd900] w-[350px] h-[250px] right-0 top-30 z-0 pointer-events-none" style={{ borderRadius: '160px 0px 0px 160px' }}></div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        nextEl: '.swiper-button-next-mobile',
                        prevEl: '.swiper-button-prev-mobile',
                    }}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={20}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                    }}
                    className="w-full relative z-10"
                >
                    {carouselData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full max-w-xs mx-auto flex flex-col items-center justify-center rounded-xl relative transition-all duration-700 ease-in-out min-w-full">
                                <h2 className="text-lg xs:text-xl font-bold text-[#16795e] text-center mt-2 mb-1 font-montserrat">{item.title}</h2>
                                <p className="text-gray-600 text-xs xs:text-sm text-center mb-1 w-[350px]">{item.description}</p>
                                <div className="relative w-full h-[200px] mt-10 flex items-center justify-center ml-10 mb-2">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={200}
                                        className="rounded-lg object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <div className="swiper-button-prev-mobile absolute text-white text-[20px] -left-2 top-60 -translate-y-1/2 z-10 bg-[#147d61] hover:text-[#ffd900] rounded-full" style={{ padding: '8px' }}>
                        <FaAngleLeft />
                    </div>
                    <div className="swiper-button-next-mobile absolute text-white text-[20px] -right-2 top-60 -translate-y-1/2 z-10 bg-[#147d61] hover:text-[#ffd900] rounded-full shadow" style={{ padding: '8px' }}>
                        <FaAngleRight />
                    </div>
                </Swiper>
            </div>
            </section>
        </div>
    );
};

export default BestSellingPhones;
