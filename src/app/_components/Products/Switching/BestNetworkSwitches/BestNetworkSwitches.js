import React from 'react'
import Allinone1 from '../../../../../Components/Images/bestnetworkswitches1.png'
import Allinone2 from '../../../../../Components/Images/bestnetworkswitches2.png'
import Allinone3 from '../../../../../Components/Images/bestnetworkswitches3.png'
import Allinone4 from '../../../../../Components/Images/bestnetworkswitches4.png'
import Allinone5 from '../../../../../Components/Images/bestnetworkswitches5.png'
import Allinone6 from '../../../../../Components/Images/bestnetworkswitches6.png'
import Image from 'next/image'
const BestNetworkSwitches = () => {
    const Business = [
        { Image: Allinone1, title: 'NETGEAR 5-Port Ethernet Switch', desc: 'Home Network Hub, Office Ethernet Splitter, Plug-and-Play, Silent Operation, Desktop or Wall Mount', width: 251, height: 98 },
        { Image: Allinone2, title: 'YuanLey Industrial Ethernet Switch', desc: '8 Gigabit Ethernet Ports, DIN-Rail Switch IP30 Rated, Unmanaged Network Switch (-40 to 176°F), Lifetime Protection, Fanless, Metal Case', width: 251, height: 213 },
        { Image: Allinone3, title: 'TP-Link Litewave 5 Port Gigabit Ethernet Switch', desc: 'Desktop Ethernet Splitter | Plastic Case | Unshielded Network Switch | Plug & Play | Fanless Quiet | Unmanaged (LS1005G)', width: 251, height: 125 },
    ]
    const Individuals = [
        { Image: Allinone4,title: 'YuanLey 8 Port PoE Switch', desc: '2 Gigabit Uplink, 8 PoE+ Port 100Mbps, 120W 802.3af/at, Extend Function, Metal, Fanless, Unmanaged Plug and Play Network Switch', width: 251, height: 116},
        { Image: Allinone5,title: '4 Port PoE+ Switch', desc: '4 PoE+ Ports &2 Fast Ethernet uplink,65W 802.3af/at, Extend Function, Fanless Metal,Plug & Play Unmanaged Network Switch', width: 251, height: 269},
        { Image: Allinone6,title: 'TP-Link TL-SG105', desc: '5 Port Gigabit Unmanaged Ethernet Switch, Network Hub, Ethernet Splitter, Plug & Play, Fanless Metal Design, Shielded Ports, Traffic Optimization,Navy Blue', width: 251, height: 106},
    ]
    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="best-network-switches"
                aria-label="The Best Network Switches For Space-Saving Power"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] pt-10 sm:pt-14 lg:pt-20 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            >
                <h2 className='text-[24px] md:text-[50px] md:leading-[60px] lg:text-[50px] leading-[30px] lg:leading-[60px] font-[700] text-black text-montserrat text-center'>THE BEST NETWORK SWITCHES FOR <br className='hidden lg:block'/> SPACE-SAVING POWER</h2>
                <div className="allinone-bottom">
                    <div className="allinone-bottom-top mt-10">
                        <div className="title-button flex flex-col md:flex-row lg:flex-row items-center justify-between px-5 mt-10">
                            <h3 className='text-[30px] md:text-[50px] lg:text-[50px] leading-[30px] lg:leading-[50px] font-[600] font-montserrat text-[#147d61]'>For Businesses:</h3>
                            <button className='bg-[#ffd900] mt-5 lg:mt-0 p-[10px] rounded-[10px] text-black text-[20px] font-[500] leading-[20px] font-montserrat' style={{ boxShadow: '4px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}>Visit Our Store</button>
                        </div>
                        <div className="cards flex flex-col md:flex-row lg:flex-row items-center justify-center gap-25 md:gap-15 lg:gap-15 mt-30 px-3 lg:px-0">
                            {Business.map((item, i) => (
                                <div className="card-1 bg-[#ececec] flex flex-col items-center justify-center w-full lg:w-[311px] h-auto md:h-[582px] lg:h-[487px] rounded-[30px]" style={{ padding: '30px' }} key={i}>
                                    <Image alt='' className='-mt-20' style={{height: `${item.height}px`}} src={item.Image} width={item.width} height={item.height} />
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
                                <div className="card-1 bg-[#ececec] flex flex-col items-center justify-center w-full lg:w-[311px] h-auto md:h-[582px] lg:h-[582px] rounded-[30px]" style={{ padding: '30px' }} key={i}>
                                    <Image alt='' className='-mt-20' style={{height: `${item.height}px`}} src={item.Image} width={item.width} height={item.height} />
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

export default BestNetworkSwitches
