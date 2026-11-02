"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import CCTVProduct1 from '@/Components/Images/bestsellingphone1.png';
import CCTVProduct2 from '@/Components/Images/allinonephones2.png';
import CCTVProduct3 from '@/Components/Images/allinonephones3.png';
import CCTVProduct4 from '@/Components/Images/allinonephones4.png';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { safeRender, safeImage } from '@/lib/safe-html';

const BestSellingCCTV = ({ cmsData }) => {
    const fields = cmsData?.fields || cmsData || {};
    const heading = safeRender(fields.heading, 'OUR BEST-SELLING CCTV & SURVEILLANCE');

    const slide1Title = safeRender(fields.slide1_title, 'Hikvision 4MP IP Security Camera');
    const slide1Desc = safeRender(fields.slide1_desc, 'Model: DS-2CD1043G0-I. Weather and dust resistant (IP67), 4MP resolution, intelligent IR night vision up to 30 meters, PoE support.');
    const slide1Img = safeImage(fields.image_cctvproduct1, CCTVProduct1);

    const slide2Title = safeRender(fields.slide2_title, 'HIKVISION Outdoor Bullet Camera');
    const slide2Desc = safeRender(fields.slide2_desc, 'Rugged weatherproof outdoor bullet surveillance camera with smart EXIR illumination for 24/7 crystal-clear perimeter security.');
    const slide2Img = safeImage(fields.image_cctvproduct2, CCTVProduct2);

    const slide3Title = safeRender(fields.slide3_title, 'XVIM 8CH 1080P Wired CCTV System');
    const slide3Desc = safeRender(fields.slide3_desc, 'Complete multi-channel surveillance DVR kit with weatherproof night-vision cameras, remote smartphone monitoring, and motion alert detection.');
    const slide3Img = safeImage(fields.image_cctvproduct3, CCTVProduct3);

    const slide4Title = safeRender(fields.slide4_title, 'Hikvision PTZ Dome Security Camera');
    const slide4Desc = safeRender(fields.slide4_desc, 'Pan-tilt-zoom network dome security camera with optical zoom, intelligent auto-tracking, and 360-degree high-definition coverage for large facilities.');
    const slide4Img = safeImage(fields.image_cctvproduct4, CCTVProduct4);

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
        {
            title: slide4Title,
            description: slide4Desc,
            image: slide4Img,
        },
    ];

    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="best-selling-cctv"
                aria-label="Best Selling CCTV & Surveillance"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] py-8 relative lg:mt-10 overflow-hidden"
            >
                <h2 className="text-center text-[22px] sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[42px] leading-tight md:leading-snug lg:leading-[50px] font-[800] text-[#16795e] mb-8 font-montserrat px-4">
                    {heading || 'OUR BEST-SELLING CCTV & SURVEILLANCE'}
                </h2>

                {/* Desktop Swiper */}
                <div className="hidden md:block relative overflow-hidden max-w-full mx-auto lg:mt-30 isolate">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            nextEl: '.swiper-button-next-cctv-desktop',
                            prevEl: '.swiper-button-prev-cctv-desktop',
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
                                        <h2 className="text-[44px] leading-[46px] font-montserrat font-bold text-black">
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

                        <div className="swiper-button-prev-cctv-desktop absolute text-white text-[24px] font-[500] -left-4 top-1/2 -translate-y-1/2 z-10 bg-[#147d61] rounded-full shadow hover:cursor-pointer" style={{ padding: '10px' }}>
                            <FaAngleLeft />
                        </div>
                        <div className="swiper-button-next-cctv-desktop absolute text-white text-[24px] font-[500] -right-4 top-1/2 -translate-y-1/2 z-10 bg-[#147d61] rounded-full shadow hover:cursor-pointer" style={{ padding: '10px' }}>
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
                            nextEl: '.swiper-button-next-cctv-mobile',
                            prevEl: '.swiper-button-prev-cctv-mobile',
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

                        <div className="swiper-button-prev-cctv-mobile absolute text-white text-[20px] -left-2 top-60 -translate-y-1/2 z-10 bg-[#147d61] hover:text-[#ffd900] rounded-full" style={{ padding: '8px' }}>
                            <FaAngleLeft />
                        </div>
                        <div className="swiper-button-next-cctv-mobile absolute text-white text-[20px] -right-2 top-60 -translate-y-1/2 z-10 bg-[#147d61] hover:text-[#ffd900] rounded-full shadow" style={{ padding: '8px' }}>
                            <FaAngleRight />
                        </div>
                    </Swiper>
                </div>
            </section>
        </div>
    );
};

export default BestSellingCCTV;
