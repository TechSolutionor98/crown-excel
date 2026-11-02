"use client"
import React from 'react';
import LatestProduct1 from '../../../../../Components/Images/keyboardlatest1.png';
import LatestProduct2 from '../../../../../Components/Images/keyboardlatest2.png';
import LatestProduct3 from '../../../../../Components/Images/keyboardlatest3.png';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const products = [
    { title: 'AULA F99 Pro ', desc: 'AULA F99 Pro wireless mechanical keyboards work with Bluetooth, 2.4GHz wireless and USB wired connection, can connect up to five devices at the same time.', Image: LatestProduct1 },
    { title: 'RedThunder K10 Wireless Gaming Keyboard', desc: 'High-performance 2.4G Wireless Keyboard and Mouse', Image: LatestProduct2 },
    { title: 'J JOYACCESS Wireless Keyboard Mouse', desc: 'Sleek and Compact Design', Image: LatestProduct3 },
   { title: 'AULA F99 Pro ', desc: 'AULA F99 Pro wireless mechanical keyboards work with Bluetooth, 2.4GHz wireless and USB wired connection, can connect up to five devices at the same time.', Image: LatestProduct1 },
    { title: 'RedThunder K10 Wireless Gaming Keyboard', desc: 'High-performance 2.4G Wireless Keyboard and Mouse', Image: LatestProduct2 },
    { title: 'J JOYACCESS Wireless Keyboard Mouse', desc: 'Sleek and Compact Design', Image: LatestProduct3 },
];

const KeyboardLatest = () => (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
        <section
            id="our-latest-product-keyboard"
            aria-label="Our Latest Product"
            className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] mt-10 py-4 flex flex-col items-center overflow-hidden"
        >
            <h2 className="text-[#147d61] text-center text-[26px] md:text-[50px] lg:text-[60px] font-[800] font-montserrat">OUR LATEST PRODUCT</h2>
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
                        640: { slidesPerView: 2 },
                        900: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    }}
                    style={{ width: '100%', padding: '0 0 40px 0' }}
                >
                    {products.map((product, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="w-full md:w-[300px] lg:min-w-[400px] max-w-full bg-white rounded-xl  flex-shrink-0 flex flex-col items-center p-4 transition-transform duration-300 mx-auto">
                                <Image
                                    src={product.Image}
                                    alt={product.title}
                                    width={500}
                                    height={400}
                                    className="rounded-lg object-contain mb-4 w-full"
                                />
                                <h2 className="text-[30px] lg:text-[34] leading-[34px] font-[600] text-black text-center font-montserrat mb-2 uppercase">{product.title}</h2>
                                <p className="text-gray-600 text-base text-center mt-2 text-[16px] leading-[27px]">{product.desc}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    </div>
);

export default KeyboardLatest;