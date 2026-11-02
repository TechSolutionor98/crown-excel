import React from 'react'
import Allinone1 from '../../../../../Components/Images/toprouter1.png'
import Allinone2 from '../../../../../Components/Images/toprouter2.png'
import Allinone3 from '../../../../../Components/Images/toprouter3.png'
import Allinone4 from '../../../../../Components/Images/toprouter4.png'
import Allinone5 from '../../../../../Components/Images/toprouter5.png'
import Allinone6 from '../../../../../Components/Images/toprouter6.png'
import Image from 'next/image'
const TopRouters = () => {
    const Business = [
        { Image: Allinone1, title: 'Omada EAP783 Wireless Access Point', desc: 'The Omada EAP783 is a powerful and versatile wireless access point that is perfect for businesses of all sizes' },
        { Image: Allinone2, title: 'TP-LINK EAP115-WALL Wireless', desc: 'The TP-LINK EAP115-WALL Wireless N Wall-Plate Access Point is a compact and convenient solution for providing wireless access in your home or office.' },
        { Image: Allinone3, title: 'TP-LINK TL-WA1201 wireless', desc: 'The TL-WA1201 supports wireless connectivity with data transfer rates of up to 867Mbps on the 5GHz frequency band, providing fast and reliable Wi-Fi access for indoor and outdoor environments.' },
    ]
    const Individuals = [
        { Image: Allinone4,title: 'TP-Link CPE605 CPE Outdoor', desc: 'Introducing the TP-Link CPE605 CPE Outdoor 5GHz 150Mbps 23dBi – the ultimate solution for outdoor wireless networking.'},
        { Image: Allinone5,title: 'TP-LINK EAP110 300Mbps Wireless', desc: 'The TP-LINK EAP110 300Mbps Wireless N Ceiling Mount Access Point is a high-performance wireless access point designed for small to medium-sized businesses and homes.'},
        { Image: Allinone6,title: 'TP-Link EAP655-Wall | Omada', desc: 'Introducing the TP-Link EAP655-Wall, your gateway to seamless connectivity and enhanced wireless performance.'},
    ]
    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="top-routers-access-points"
                aria-label="Top Routers & Access Points For Seamless Connectivity"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] pt-10 sm:pt-14 lg:pt-20 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            >
                <h2 className='text-[24px] md:text-[50px] md:leading-[60px] lg:text-[50px] leading-[30px] lg:leading-[60px] font-[700] text-black font-montserrat text-montserrat text-center'>Top Routers & Access Points <br /> For Seamless Connectivity</h2>
                <div className="allinone-bottom">
                <div className="allinone-bottom-top mt-10">
                    <div className="title-button flex flex-col md:flex-row lg:flex-row items-center justify-between px-5 mt-10">
                        <h3 className='text-[30px] md:text-[50px] lg:text-[50px] leading-[30px] lg:leading-[50px] font-[600] font-montserrat text-[#147d61]'>For Businesses:</h3>
                        <button className='bg-[#ffd900] mt-5 lg:mt-0 p-[10px] rounded-[10px] text-black text-[20px] font-[500] leading-[20px] font-montserrat' style={{ boxShadow: '4px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}>Visit Our Store</button>
                    </div>
                    <div className="cards flex flex-col md:flex-row lg:flex-row items-center justify-center gap-25 md:gap-15 lg:gap-15 mt-30 px-3 lg:px-0">
                        {Business.map((item, i) => (
                            <div className="card-1 bg-[#ececec] flex flex-col items-center w-full lg:w-[311px] h-auto md:h-[550px] lg:h-[582px] rounded-[30px]" style={{ padding: '30px' }} key={i}>
                                <Image alt='' className='-mt-25' src={item.Image} width={251} height={251} />
                                <h4 className="text-[20px] lg:text-[26px] mt-10 text-center font-[800] leading-[34px]   font-montserrat text-black uppercase mb-3">
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
                        <h3 className='text-[30px] md:text-[50px] lg:text-[50px] leading-[30px] lg:leading-[50px] font-[600] font-montserrat text-[#147d61]'>For Individuals:</h3>
                        <button className='bg-[#ffd900] mt-5 lg:mt-0 p-[10px] rounded-[10px] text-black text-[20px] font-[500] leading-[20px] font-montserrat' style={{ boxShadow: '4px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}>Visit Our Store</button>
                    </div>
                    <div className="cards flex flex-col md:flex-row lg:flex-row items-center justify-center gap-25 md:gap-15 lg:gap-15 mt-30 px-3 lg:px-0">
                        {Individuals.map((item, i) => (
                            <div className="card-1 bg-[#ececec] flex flex-col items-center w-full lg:w-[311px] h-auto md:h-[550px] lg:h-[582px] rounded-[30px]" style={{ padding: '30px' }} key={i}>
                                <Image alt='' className='-mt-25' src={item.Image} width={251} height={251} />
                                <h4 className="text-[20px] lg:text-[26px] mt-10 text-center font-[800] leading-[34px]   font-montserrat text-black uppercase mb-3">
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

export default TopRouters
