import React from 'react'
import ComputingImage from '../../../../../Components/Images/accessoriesultimatesolution.png'
import Image from 'next/image'
const AccessoriesUltimateSolution = () => {
    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="ultimate-solution-accessories"
                aria-label="The Ultimate Solution for Accessories"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] flex flex-col items-center justify-center h-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-16 relative overflow-hidden"
            >
                <h2 className='text-[#147d61] text-[20px] md:text-[45px] lg:text-[45px] font-[700] font-monterrat text-center'>THE ULTIMATE SOLUTION FOR <br /> <span className='text-black bg-[#ffd900]' style={{ padding: '5px 15px 5px 15px' }}>ACCESSORIES</span></h2>
                <div className="heavycomputing-bottom flex flex-col items-center justify-center w-full h-auto mt-10 md:mt-20 lg:mt-10">
                    <div className="heavycomputing-bottom-divs flex flex-col md:flex-row lg:flex-row items-center justify-between w-full h-auto lg:h-[400px] px-2 lg:px-5 gap-30 lg:gap-50">
                        <div className="left-part text-white rounded-[20px] p-[20px] lg:p-[32px]" style={{ backgroundImage: 'linear-gradient(300deg, #084032 0%, #118264 60%)' }}>
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>Exceptional Utility and Functionality</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>Optimize your workspace with high-quality accessories designed to enhance productivity. From ergonomic designs to multi-functional tools, our accessories provide reliability and efficiency for every task.</p>
                        </div>
                        <div className="right-part -mt-20 text-black bg-[#e9e9e9]  rounded-[20px] p-[20px] lg:p-[32px]" >
                            <h3 className=' text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>Advanced Compatibility</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>Experience seamless integration with devices using accessories engineered for universal compatibility. Ideal for professionals and everyday users, these tools deliver exceptional performance across all setups.</p>
                        </div>
                    </div>
                    <div className="heavycomputing-bottom-divs my-1">
                        <Image alt='' src={ComputingImage} width={248} height={248} className='lg:w-[248px] lg:h-[248px] md:w-[406px] md:h-[200px]'/>
                    </div>
                    <div className="heavycomputing-bottom-divs flex flex-col md:flex-row lg:flex-row items-center justify-between w-full h-auto lg:h-[400px] px-2 lg:px-5 gap-30 lg:gap-50 mt-0 md:mt-10 lg:mt-0">
                        <div className="right-part text-black bg-[#e9e9e9]  rounded-[20px] p-[20px] lg:p-[32px]" >
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>Enhanced Compatibility and Storage</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>Expand your workspace effortlessly with accessories that provide seamless compatibility and ample storage solutions. These tools optimize your setup, ensuring efficiency for all tasks.</p>
                        </div>
                        <div className="left-part -mt-20 text-white rounded-[20px] p-[20px] lg:p-[32px]" style={{ backgroundImage: 'linear-gradient(300deg, #084032 0%, #118264 60%)' }}>
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>Customizable and Reliable
                            </h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>Design your ideal workspace with accessories tailored to your specific needs. Future-proof your system with durable, reliable, and easily customizable options for a flawless experience.</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default AccessoriesUltimateSolution
