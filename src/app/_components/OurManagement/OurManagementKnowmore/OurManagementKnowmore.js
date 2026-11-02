'use client'
import React, { useState } from 'react'
import ExploreMore from '../../../../Components/Images/ourmanagementknowmore.jpg'
import Image from 'next/image'
import Link from 'next/link'

const OurManagementKnowmore = () => {
    const [hovered, setHovered] = useState(false)

    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="management-intro-section"
                aria-label="Management Introduction"
                className="w-full max-w-[1536px] mx-auto bg-gradient-to-br from-[#e5e0c8] to-[#f5f0d8] lg:px-[50px] py-16 overflow-hidden"
            >
                <div className="container mx-auto p-[20px] flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                        <Image
                            src={ExploreMore}
                            alt="Crown Excel Management Team"
                            width={500}
                            height={496.4}
                            className='w-full md:w-[100%] md:h-[380px] lg:w-[100%] h-[400px] lg:h-[496.4px] object-cover transition-transform duration-300 hover:scale-105'
                            priority
                            quality={90}
                        />
                    </div>
                    <div className="div-textss flex-1">
                        <p className='text-gray-700 font-muli text-lg leading-[1.8] mb-8'>
                        At Crown Excel, we have an experienced management team dedicated to handling both hardware and software orders with efficiency and precision. Every project and order is managed with the utmost care, supported by comprehensive corporate services and deep technical expertise.
                        </p>
                        <p className='text-gray-700 font-muli text-lg leading-[1.8] mb-8'>
                        Our leadership fosters a collaborative and inclusive work environment, enabling every team member to operate seamlessly across departments. This unified approach ensures that we consistently deliver exceptional results and exceed client expectations.
                        </p>

                        {/* Animated Button */}
                        <Link href='/company/about-us'>
                            <button
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            onTouchStart={() => setHovered(true)}
                            onTouchEnd={() => setHovered(false)}
                            className="relative cursor-pointer w-[180px] h-[50px] overflow-hidden bg-[#084032] rounded-lg font-montserrat font-[600] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {/* Default text */}
                            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? 'translate-y-full' : 'translate-y-0'}`}>
                                Know More
                            </span>

                            {/* Hovered text */}
                            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 bg-[#0D5C47] ${hovered ? 'translate-x-0' : '-translate-x-full'}`}>
                                Learn More
                            </span>
                        </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default OurManagementKnowmore
