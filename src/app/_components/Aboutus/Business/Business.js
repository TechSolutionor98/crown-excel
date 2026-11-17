"use client"
import React, { useState } from 'react'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import BusinessImage from '../../../../Components/Images/aboutbusiness.jpg'
import Image from 'next/image';
import Link from 'next/link';
import { safeRender, safeImage } from '@/lib/safe-html';

const Business = ({ cmsData }) => {
    const fields = cmsData?.fields || cmsData || {};
    const headingText = safeRender(fields.heading, "Keep Your Business Safe & Ensure High Availability.");
    const paragraphText = safeRender(fields.paragraph, "Ever find yourself staring at your computer's good consulting slogan to come to mind? Frequently.");
    const bizImg = safeImage(fields.image_businessimage, BusinessImage);

    const faq = [
        { title: 'What services does Crown Excel provide?', desc: 'We offer IT consultancy, managed IT services, hardware/software maintenance, server support, and hardware repair.' },
        { title: 'How long has Crown Excel been in business?', desc: 'We have been providing top-notch IT solutions for over 15 years.' },
        { title: 'Does Crown Excel offer Hardware AMC service?', desc: 'Hardware AMC (Annual Maintenance Contract) ensures your hardware stays in optimal condition with regular maintenance.' },
        { title: 'Does Crown Excel provide server and IT support?', desc: 'Yes, Crown Excel provides reliable IT support and  comprehensive server management, maintenance, and troubleshooting to ensure maximum uptime.' },
        { title: 'How can I inquire about your services?', desc: 'You can contact us through our website’s inquiry form, and our team will assist you with your requirements.' },
    ]
    const [openIndex, setOpenIndex] = useState(null);
    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section className="relative w-full max-w-[1536px] mx-auto bg-[#1D8B6E] overflow-hidden">
                <div className='bg-[#1D8B6E] relative h-[600px] px-8 py-12 hidden lg:flex'>
                    <div className="left-part  z-10">
                        <h2 className='text-3xl lg:text-[40px] leading-[48px] font-montserrat text-shadow-2xs font-[600] text-white mb-4'>{headingText}</h2>
                        <p className='text-lg text-white mb-8 font-jakarta'>{paragraphText}</p>
                        <div className='max-w-2xl mx-auto font-montserrat'>
                            {faq.map((item, idx) => (
                                <div key={idx} className=''>
                                    <button
                                        className={`w-full flex items-center gap-5 border-[1px] border-white bg-[#0d5c47] text-white px-1 py-1 font-[500] text-[16px] shadow rounded transition-colors duration-200 focus:outline-none`}
                                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    >
                                        <span className='ml-4 transition-transform duration-300'>
                                            {openIndex === idx ? <FaMinus /> : <FaPlus />}
                                        </span>
                                        <span>{item.title}</span>

                                    </button>
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className='bg-[#1D8B6E] text-white px-6 py-4 border-t border rounded-b shadow'>
                                            {item.desc}

                                            <Link href="/contact-us" className="text-sm ml-2 underline text-white">Inquire Now</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="right-part flex-1 flex items-center justify-end">
                        <Image
                            src={bizImg}
                            className={`transition-all  duration-700 ease-in-out ${openIndex !== null ? 'scale-90' : 'scale-70'} object-cover rounded-2xl shadow-2xl`}
                            width={700}
                            height={500}
                            alt='Business'
                            style={{ maxWidth: '800px', maxHeight: '500px' }}
                        />
                    </div>
                </div>
                <div className="mobile lg:hidden w-full h-auto py-5 md:py-20 md:px-10 flex flex-col items-center md:items-start md:justify-normal justify-center relative" style={{
                    backgroundImage: `linear-gradient(rgba(13, 44, 92, 0.9), rgba(13, 44, 92, 0.9)), url(${bizImg.src || bizImg})`,
                    backgroundSize: openIndex !== null ? '110%' : '100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transition: 'background-size 0.7s ease-in-out',
                }}>
                    <h2 className="text-2xl md:text-[35px] md:text-start md:w-[550px] font-bold text-white mb-4 text-center px-4">{headingText}</h2>
                    <p className='text-white text-[12px] px-4 mb-4 md:text-[14px]'>{paragraphText}</p>
                    <div className="w-full max-w-md md:max-w-full px-2 ">
                        {faq.map((item, idx) => (
                            <div key={idx} className="mb-2">
                                <button
                                    className={`w-full  text-[12px] flex items-center gap-3 border-[1px] border-white bg-[#0d5c47] text-white px-2 py-2 font-semibold text-base shadow  transition-colors duration-200 focus:outline-none`}
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                >
                                    <span className="transition-transform duration-300">
                                        {openIndex === idx ? <FaMinus /> : <FaPlus />}
                                    </span>
                                    <span className="text-left">{item.title}</span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="bg-[#0d5c47] text-white px-4 py-3 border border-white  shadow">
                                        {item.desc}
                                        <Link href="/contact-us" className="text-sm ml-2 underline text-white">Inquire Now</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Business
