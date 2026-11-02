"use client"
import React from 'react';
import DesktopLatestProduct1 from '../../../../../Components/Images/LatestProduct1.png';
import DesktopLatestProduct2 from '../../../../../Components/Images/LatestProduct2.png';
import DesktopLatestProduct3 from '../../../../../Components/Images/LatestProduct3.png';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const products = [
    { title: 'Acer Predator', desc: 'Enhanced with a 6GB NVIDIA GeForce RTX 3060 graphics card', Image: DesktopLatestProduct2 },
    { title: 'Acer Aspire Lite', desc: 'The Acer Aspire Lite AL16-52P-52JZ is a sleek, modern laptop designed for solid performance in everyday tasks.', Image: DesktopLatestProduct3 },
    { title: 'Acer Nitro V15', desc: 'Introducing the Acer Nitro V15 ANV15-41-R6Y1 Gaming Laptop', Image: DesktopLatestProduct1 },
   { title: 'Acer Predator', desc: 'Enhanced with a 6GB NVIDIA GeForce RTX 3060 graphics card', Image: DesktopLatestProduct2 },
    { title: 'Acer Aspire Lite', desc: 'The Acer Aspire Lite AL16-52P-52JZ is a sleek, modern laptop designed for solid performance in everyday tasks.', Image: DesktopLatestProduct3 },
    { title: 'Acer Nitro V15', desc: 'Introducing the Acer Nitro V15 ANV15-41-R6Y1 Gaming Laptop', Image: DesktopLatestProduct1 },
];

const DesktopLatestProduct = () => (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
        <section
            id="our-latest-product-slider"
            aria-label="Our Latest Product"
            className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] mt-10 flex flex-col items-center overflow-hidden"
        >
            <h2 className="text-[#147d61] text-center text-[60px] font-[800] font-montserrat">OUR LATEST PRODUCT</h2>
            <div className="relative flex items-center justify-center mt-8 w-full">
                <Swiper
                    modules={[Navigation]}
                    // navigation   
                    loop={true}
                    slidesPerView={3}
                    spaceBetween={25}
                    centeredSlides={false}
                    speed={500}
                    grabCursor={true}
                    allowTouchMove={true}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 1 },
                        900: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    }}
                    style={{ width: '100%', padding: '0 0 40px 0' }}
                >
                    {products.map((product, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="min-w-[400px] max-w-full bg-white rounded-xl flex-shrink-0 flex flex-col items-center p-4 transition-transform duration-300 mx-auto">
                                <Image
                                    src={product.Image}
                                    alt={product.title}
                                    width={500}
                                    height={400}
                                    className="rounded-lg object-contain mb-4 w-full"
                                />
                                <h2 className="text-[60px] leading-[60px] font-bold text-black text-center font-montserrat mb-2 uppercase">{product.title}</h2>
                                <p className="text-gray-600 text-base text-center mt-2 text-[16px] leading-[27px]">{product.desc}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    </div>
);

export default DesktopLatestProduct;