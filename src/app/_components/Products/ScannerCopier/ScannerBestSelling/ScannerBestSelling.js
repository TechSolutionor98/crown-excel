"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import BestProduct1 from '../../../../../Components/Images/scannerbestselling1.png';
import BestProduct2 from '../../../../../Components/Images/scannerbestselling2.png';
import BestProduct3 from '../../../../../Components/Images/scannerbestselling3.png';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const carouselData = [
    {
        title: 'HP LaserJet Pro',
        description: `The HP LaserJet Pro MFP 4103fdw is a high-performance multifunction monochrome laser printer designed for medium to large-sized offices.`,
        image: BestProduct1,
    },
    {
        title: 'Epson EcoTank L8050',
        description: 'The Epson EcoTank L8050 is a top choice for anyone who loves photography but hates high printing costs.',
        image: BestProduct2,
    },
    {
        title: 'HP ScanJet Flow N9120',
        description: 'Introducing the HP ScanJet Flow N9120 FN2 A3 Scanner – the ultimate scanner for your document management needs.',
        image: BestProduct3,
    },
];

const ScannerBestSelling = () => {
    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="best-selling-scanners"
                aria-label="Our Best-Selling Scanners"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] py-8 relative overflow-hidden"
            >
                <h2 className="text-center text-3xl lg:text-[60px] lg:leading-[60px] lg:font-[800] font-bold text-[#16795e] mb-8 font-montserrat">
                    OUR BEST-SELLING SCANNERS
                </h2>

                {/* Desktop Swiper */}
                <div className="hidden md:block relative overflow-hidden max-w-full  mx-auto">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            nextEl: '.swiper-button-next-desktop', // or mobile
                            prevEl: '.swiper-button-prev-desktop', // or mobile
                        }}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={20}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 15,
                            },
                            768: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 1,
                                spaceBetween: 30,
                            },
                        }}
                        className="w-full"
                    >

                        {carouselData.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col md:flex-row items-center md:justify-center lg:justify-between min-w-full px-6 py-6 md:py-12">
                                    <div className="text-center basis-[40%] ml-10 md:text-left space-y-4">
                                        <h2 className="text-[48px] leading-[48px] font-montserrat font-bold text-black">
                                            {item.title}
                                        </h2>
                                        <p className="text-[#7885a4] text-[16px] md:text-lg font-medium mt-10">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex basis-[60%] justify-center  mt-6 ml-2 pl-10 md:mt-0 md:-mr-15">
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
                    <div className="yellow-div absolute bg-[#ffd900] -z-10 h-[550px] w-[650px] top-0 right-0 hidden md:block" style={{ borderRadius: '360px 0 0 360px' }}></div>
                </div>

                {/* Mobile Swiper */}
                <div className="md:hidden relative overflow-hidden  h-[400px]">
                    <div className="absolute bg-[#ffd900] w-[350px] h-[250px] right-0 top-30 -z-10" style={{ borderRadius: '160px 0px 0px 160px' }}></div>

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
                        className="w-full"
                    >

                        {carouselData.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="w-full max-w-xs mx-auto flex flex-col items-center justify-center rounded-xl p-4 relative transition-all duration-700 ease-in-out min-w-full">
                                    <h2 className="text-lg xs:text-xl font-bold text-[#16795e] text-center mt-2 mb-1 font-montserrat">{item.title}</h2>
                                    <p className="text-gray-600 text-xs xs:text-sm text-center mb-1 w-[350px]">{item.description}</p>
                                    <div className="relative w-full h-[150px] mt-20 flex items-center justify-center ml-10 mb-2">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={250}
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

export default ScannerBestSelling;
