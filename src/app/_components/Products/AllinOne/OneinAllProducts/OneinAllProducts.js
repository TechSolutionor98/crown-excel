import React from 'react'
import Allinone1 from '../../../../../Components/Images/oneinall1.png'
import Allinone2 from '../../../../../Components/Images/oneinall2.png'
import Allinone3 from '../../../../../Components/Images/oneinall3.png'
import Allinone4 from '../../../../../Components/Images/oneinall4.png'
import Allinone5 from '../../../../../Components/Images/oneinall5.png'
import Allinone6 from '../../../../../Components/Images/oneinall6.png'
import Image from 'next/image'
const OneinAllProducts = () => {
    const Business = [
        { Image: Allinone1, title: 'ASUS EXPERT CENTER D700 SC', desc: 'ASUS EXPERT CENTER D700 SC best for business use with optimized speed.' },
        { Image: Allinone2, title: 'Envy 34-C1098Nh', desc: 'The HP Envy 34-C1098Nh All-in-One (AIO) PC is a premium computing solution that elevates your digital experience.' },
        { Image: Allinone3, title: 'HP All-in-One', desc: 'The HP All-in-One 22-dd2267nh Bundle PC offers a compact and efficient computing solution suitable for various tasks.' },
    ]
    const Individuals = [
        { Image: Allinone4,title: 'HP All-in-One', desc: 'Experience enhanced computing with the HP All-in-One 24-cr0122nh, powered by the latest 13th Generation Intel Core i5-1335U processor.'},
        { Image: Allinone5,title: 'HP Pavilion', desc: 'Introducing the HP Pavilion 27-CA2151NH – a powerhouse desktop that combines high-performance with sleek design.'},
        { Image: Allinone6,title: 'Lenovo AIO 3 27IAP7', desc: 'The Lenovo AIO 3 27IAP7 Desktop PC is a powerful all-in-one computing solution designed to meet the demands'},
    ]
    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="all-in-one-products"
                aria-label="The Best All-in-one Desktops For Space-Saving Power"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] pt-10 sm:pt-14 lg:pt-20 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            >
                <h2 className='text-[24px] md:text-[50px] md:leading-[60px] lg:text-[50px] leading-[30px] lg:leading-[60px] font-[700] text-black font-montserrat text-center'>The Best All-in-one Desktops <br /> For Space-Saving Power</h2>
                <div className="allinone-bottom">
                    <div className="allinone-bottom-top mt-10">
                        <div className="title-button flex flex-col md:flex-row lg:flex-row items-center justify-between px-5 mt-10">
                            <h3 className='text-[30px] md:text-[50px] lg:text-[50px] leading-[30px] lg:leading-[50px] font-[600] font-montserrat text-[#147d61]'>{`For Businesses:`}</h3>
                            <button className='bg-[#ffd900] mt-5 lg:mt-0 p-[10px] rounded-[10px] text-black text-[20px] font-[500] leading-[20px] font-montserrat' style={{ boxShadow: '4px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}>Visit Our Store</button>
                        </div>
                        <div className="cards flex flex-col md:flex-row lg:flex-row items-center justify-center gap-25 md:gap-15 lg:gap-15 mt-30 px-3 lg:px-0">
                            {Business.map((item, i) => (
                                <div className="card-1 bg-[#ececec] flex flex-col items-center w-full lg:w-[311px] h-auto lg:h-[475px] rounded-[30px]" style={{ padding: '30px' }} key={i}>
                                    <Image alt='' className='-mt-25' src={item.Image} width={251} height={251} />
                                    <h4 className="text-[20px] lg:text-[26px] mt-10 text-center font-[800] leading-[34px] font-montserrat text-black uppercase mb-3">
                                        {item.title}
                                    </h4>
                                    <p className=" text-[#222] text-center text-[16px] leading-[27px] mt-1 font-montserrat">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="allinone-bottom-bottom mt-20">
                        <div className="title-button flex flex-col md:flex-row lg:flex-row items-center justify-between px-5 mt-10">
                            <h3 className='text-[30px] md:text-[50px] lg:text-[50px] leading-[30px] lg:leading-[50px] font-[600] font-montserrat text-[#147d61]'>{`For Individuals:`}</h3>
                            <button className='bg-[#ffd900] mt-5 lg:mt-0 p-[10px] rounded-[10px] text-black text-[20px] font-[500] leading-[20px] font-montserrat' style={{ boxShadow: '4px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}>Visit Our Store</button>
                        </div>
                        <div className="cards flex flex-col md:flex-row lg:flex-row items-center justify-center gap-25 md:gap-15 lg:gap-15 mt-30 px-3 lg:px-0">
                            {Individuals.map((item, i) => (
                                <div className="card-1 bg-[#ececec] flex flex-col items-center w-full lg:w-[311px] h-auto lg:h-[475px] rounded-[30px]" style={{ padding: '30px' }} key={i}>
                                    <Image alt='' className='-mt-25' src={item.Image} width={251} height={251} />
                                    <h4 className="text-[20px] lg:text-[26px] mt-10 text-center font-[800] leading-[34px] font-montserrat text-black uppercase mb-3">
                                        {item.title}
                                    </h4>
                                    <p className=" text-[#222] text-center text-[16px] leading-[27px] mt-1 font-montserrat">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default OneinAllProducts
