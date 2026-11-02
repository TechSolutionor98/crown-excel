"use client"
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

// Assets
import ButtonBackground from '../../../../../Components/Images/ButtonBackground.png'
import DesktopBestProduct1 from '../../../../../Components/Images/DesktopBestProduct1.png'
import DesktopBestProduct2 from '../../../../../Components/Images/DesktopBestProduct2.png'
import { safeRender, safeImage } from '@/lib/safe-html'

const DesktopBestSelling = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};
  const headingText = safeRender(fields.heading, 'Our Latest Product');

  const p1Title = safeRender(fields.card_1_title, 'Dell Alienware');
  const p1Desc = safeRender(fields.card_1_desc, 'The Dell Alienware Aurora R15 Gaming Desktop is the ultimate choice for any gaming enthusiast.');
  const p1Img = safeImage(fields.image_desktopbestproduct1, DesktopBestProduct1);

  const p2Title = safeRender(fields.card_2_title, 'Asus Expert');
  const p2Desc = safeRender(fields.card_2_desc, 'ASUS EXPERT CENTER D700 SC best for business use with optimized speed.');
  const p2Img = safeImage(fields.image_desktopbestproduct2, DesktopBestProduct2);

  const btnBg = safeImage(fields.image_buttonbackground, ButtonBackground);

  const carouselData = [
    {
      title: p1Title,
      description: p1Desc,
      image: p1Img,
    },
    {
      title: p2Title,
      description: p2Desc,
      image: p2Img,
    },
  ];

  // Desktop Swiper refs
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [swiperReady, setSwiperReady] = useState(false)
  // Mobile Swiper refs
  const mobilePrevRef = useRef(null)
  const mobileNextRef = useRef(null)
  const [mobileSwiperReady, setMobileSwiperReady] = useState(false)

  useEffect(() => {
    setSwiperReady(true)
    setMobileSwiperReady(true)
  }, [])

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="our-latest-product"
        aria-label="Our Latest Product"
        className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] py-12 relative overflow-hidden"
      >
        {/* Heading */}
        <h2 className="text-center text-4xl md:text-[60px] leading-[60px] font-[800] text-[#16806b] uppercase font-montserrat mb-14">
          {headingText}
        </h2>

    {/* Desktop View */}
    <div className="hidden md:flex items-center justify-center max-w-7xl mx-auto relative min-h-[500px] overflow-x-hidden">
      {/* Left Button */}
      <div className="absolute left-[-170px] top-1/2 -translate-y-1/2 z-20 md:w-[250px] md:h-[250px] lg:w-[328px] lg:h-[328px]">
        <Image
          src={btnBg}
          alt="Left Button Background"
          fill
          className="object-contain"
          style={{ borderRadius: '50%' }}
        />
        <button
          ref={prevRef}
          className="absolute inset-0 flex items-center justify-end md:pr-6 lg:pr-10"
        >
          <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#16806b] text-2xl shadow-md hover:scale-110 transition">
            <FaAngleLeft />
          </span>
        </button>
      </div>

      {/* Swiper */}
      {swiperReady && (
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
          loop={true}
          speed={800}
          slidesPerView={1}
          className="w-full px-16"
        >
          {carouselData.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-row items-center justify-center md:gap-0 lg:gap-4 min-h-[420px] transition-all duration-700 ease-in-out">
                {/* Product Image */}
                <div className="md:w-[250px] lg:max-w-[360px] flex justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="object-contain drop-shadow-xl"
                  />
                </div>
                {/* Product Info */}
                <div className="max-w-[500px] md:px-0 lg:px-4">
                  <h2 className="text-[60px] font-[600] leading-[60px]   font-montserrat text-black uppercase mb-3">
                    {item.title}
                  </h2>
                  <p className="text-base text-[#222] text-[16px] leading-[27px] mt-10 font-montserrat">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Right Button */}
      <div className="absolute right-[-170px] top-1/2 -translate-y-1/2 z-20 md:w-[250px] md:h-[250px] lg:w-[328px] lg:h-[328px]">
        <Image
          src={btnBg}
          alt="Right Button Background"
          fill
          className="object-contain"
          style={{ borderRadius: '50%' }}
        />
        <button
          ref={nextRef}
          className="absolute inset-0 flex items-center md:ml-6 lg:ml-10"
        >
          <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#16806b] text-2xl shadow-md hover:scale-110 transition">
            <FaAngleRight />
          </span>
        </button>
      </div>
    </div>

    {/* Mobile View */}
    <div className="md:hidden px-4 flex items-center">
      {/* Left Button */}
      <div className="-ml-25 left-[-170px] top-1/2 -translate-y-1/2 z-20 w-[208px] h-[100px]">
        <Image
          src={btnBg}
          alt="Left Button Background"
          fill
          className="object-contain"
          style={{ borderRadius: '50%' }}
        />
        <button
          ref={mobilePrevRef}
          className="absolute inset-0 flex items-center justify-end pr-10"
        >
          <span className=" rounded-full flex items-center justify-center text-[#fffff] text-2xl  hover:scale-110 transition">
            <FaAngleLeft />
          </span>
        </button>
      </div>

      {mobileSwiperReady && (
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: mobilePrevRef.current, nextEl: mobileNextRef.current }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = mobilePrevRef.current
            // @ts-ignore
            swiper.params.navigation.nextEl = mobileNextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
          loop={true}
          speed={700}
          slidesPerView={1}
          className="w-full"
        >
          {carouselData.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center text-center px-4 py-6 transition-all duration-700 ease-in-out">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={180}
                  height={180}
                  className="object-contain mb-4"
                  priority
                />
                <h2 className="text-xl font-bold text-[#16806b] uppercase mb-2 font-montserrat">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-700 font-montserrat">{item.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {/* Right Button */}
      <div className="overflow-hidden -mr-25 right-[-170px] top-1/2 -translate-y-1/2 z-20 w-[200px] h-[100px]">
        <Image
          src={btnBg}
          alt="Right Button Background"
          fill
          className="object-contain"
          style={{ borderRadius: '50%' }}
        />
        <button
          ref={mobileNextRef}
          className="absolute inset-0 flex items-center ml-7"
        >
          <span className="w-10 h-10 bg-green rounded-full flex items-center justify-center text-[#fffff] text-2xl  hover:scale-110 transition">
            <FaAngleRight />
          </span>
        </button>
      </div>
    </div>
      </section>
    </div>
  );
};

export default DesktopBestSelling;

