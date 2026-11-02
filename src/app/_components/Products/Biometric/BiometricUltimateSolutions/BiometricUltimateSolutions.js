import React from 'react'
import ComputingImage from '../../../../../Components/Images/biometricultimatesolutions.jpg'
import Image from 'next/image'
const BiometricUltimateSolutions = () => {
    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="ultimate-solution-biometrics"
                aria-label="The Ultimate Solution for Biometrics"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] flex flex-col items-center justify-center h-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-16 relative overflow-hidden"
            >
                <h2 className='text-[#147d61] text-[20px] md:text-[45px] lg:text-[45px] font-[700] font-monterrat text-center'>THE ULTIMATE SOLUTION FOR <br /> <span className='text-black bg-[#ffd900]' style={{ padding: '5px 15px 5px 15px' }}>BIOMETRICS</span></h2>
                <div className="heavycomputing-bottom flex flex-col items-center justify-center w-full h-auto mt-10 md:mt-20 lg:mt-10">
                    <div className="heavycomputing-bottom-divs flex flex-col md:flex-row lg:flex-row items-center justify-between w-full h-auto lg:h-[400px] px-2 lg:px-5 gap-30 lg:gap-50">
                        <div className="left-part text-white rounded-[20px] p-[20px] lg:p-[32px]" style={{ backgroundImage: 'linear-gradient(300deg, #084032 0%, #118264 60%)' }}>
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>Exceptional Utility and Functionality</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>Elevate your security systems with cutting-edge biometric solutions designed to deliver unmatched precision and reliability. From fingerprint scanners to facial recognition devices, our biometric tools offer enhanced access control and seamless functionality for both personal and professional use.</p>
                        </div>
                        <div className="right-part -mt-20 text-black bg-[#e9e9e9]  rounded-[20px] p-[20px] lg:p-[32px]" >
                            <h3 className=' text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>Advanced Compatibility</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>Integrate effortlessly with existing systems using biometric devices engineered for universal compatibility. Whether for corporate environments, educational institutions, or residential setups, these tools ensure peak performance and advanced security across all platforms.</p>
                        </div>
                    </div>
                    <div className="heavycomputing-bottom-divs my-20 md:my-10">
                        <Image alt='' src={ComputingImage} width={622} height={266} className='lg:w-[622px] lg:h-[266px] md:w-[406px] md:h-[137px]'/>
                    </div>
                    <div className="heavycomputing-bottom-divs flex flex-col md:flex-row lg:flex-row items-center justify-between w-full h-auto lg:h-[400px] px-2 lg:px-5 gap-30 lg:gap-50 mt-0 md:mt-10 lg:mt-0">
                        <div className="right-part text-black bg-[#e9e9e9]  rounded-[20px] p-[20px] lg:p-[32px]" >
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>Enhanced Security and Compatibility</h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>Expand your security infrastructure effortlessly with biometric devices that provide seamless integration and advanced compatibility. These solutions optimize access control, ensuring reliability and efficiency for all environments.</p>
                        </div>
                        <div className="left-part -mt-20 text-white rounded-[20px] p-[20px] lg:p-[32px]" style={{ backgroundImage: 'linear-gradient(300deg, #084032 0%, #118264 60%)' }}>
                            <h3 className='text-[24px] lg:text-[28px] font-montserrat font-[600] leading-[25px] lg:leading-[33px]'>Customizable and Reliable
                            </h3>
                            <p className='mt-4 text-[14px] lg:text-[16px] font-montserrat leading-[27px]'>Design your ideal security system with biometric tools tailored to your specific needs. Future-proof your setup with durable, accurate, and easily customizable options for a flawless and secure experience.</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default BiometricUltimateSolutions
