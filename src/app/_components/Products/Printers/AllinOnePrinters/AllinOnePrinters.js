import React from 'react'
import Allinone1 from '../../../../../Components/Images/allinoneprinters1.png'
import Allinone2 from '../../../../../Components/Images/allinoneprinters2.png'
import Allinone3 from '../../../../../Components/Images/allinoneprinters3.png'
import Allinone4 from '../../../../../Components/Images/allinoneprinters4.png'
import Allinone5 from '../../../../../Components/Images/allinoneprinters5.png'
import Allinone6 from '../../../../../Components/Images/allinoneprinters6.png'
import Image from 'next/image'
const AllinOnePrinters = () => {
    const Business = [
        { Image: Allinone1, title: 'HP LaserJet MFP', desc: 'The HP LaserJet MFP M141a is a compact, monochrome multifunction printer perfect for home offices and small businesses.' },
        { Image: Allinone2, title: 'Canon PIXMA G3410', desc: 'The Canon PIXMA G3410 is an all-in-one ink tank printer that combines printing, scanning, and copying functionalities in a single, compact device.' },
        { Image: Allinone3, title: 'Canon PIXMA G2430', desc: 'The Canon PIXMA G2430 is a versatile 3-in-1 refillable Mega Tank printer designed for users who need an efficient and cost-effective solution for high-volume color printing.' },
    ]
    const Individuals = [
        { Image: Allinone4,title: 'HP Enterprise M880z', desc: 'The HP Enterprise M880z MFP Printer is a high-performing, all-in-one printer designed for businesses and offices with high-volume printing needs.'},
        { Image: Allinone5,title: 'HP Color LaserJet', desc: 'Introducing the HP Color LaserJet Enterprise M776z Printer, the ultimate solution for all your printing needs.'},
        { Image: Allinone6,title: 'HP PageWide 477dw', desc: 'Introducing the HP PageWide 477dw Printer – the ultimate all-in-one printer for your home or office needs.'},
    ]
    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="all-in-one-printers"
                aria-label="The Best All-in-one Desktops For Space-Saving Power"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] pt-10 sm:pt-14 lg:pt-20 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            >
                <h2 className='text-[24px] md:text-[50px] md:leading-[60px] lg:text-[50px] leading-[30px] lg:leading-[60px] font-[700] text-black font-montserrat text-montserrat text-center'>The Best All-in-one Desktops <br /> For Space-Saving Power</h2>
                <div className="allinone-bottom">
                <div className="allinone-bottom-top mt-10">
                    <div className="title-button flex flex-col md:flex-row lg:flex-row items-center justify-between px-5 mt-10">
                        <h3 className='text-[30px] md:text-[50px] lg:text-[50px] leading-[30px] lg:leading-[50px] font-[600] font-montserrat text-[#147d61]'>For Businesses:</h3>
                        <button className='bg-[#ffd900] mt-5 lg:mt-0 p-[10px] rounded-[10px] text-black text-[20px] font-[500] leading-[20px] font-montserrat' style={{ boxShadow: '4px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}>Visit Our Store</button>
                    </div>
                    <div className="cards flex flex-col md:flex-row lg:flex-row items-center justify-center gap-25 md:gap-15 lg:gap-15 mt-30 px-3 lg:px-0">
                        {Business.map((item, i) => (
                            <div className="card-1 bg-[#ececec] flex flex-col items-center w-full lg:w-[311px] h-auto lg:h-[475px] rounded-[30px]" style={{ padding: '30px' }} key={i}>
                                <Image alt='' className='-mt-20' src={item.Image} width={251} height={251} />
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
                            <div className="card-1 bg-[#ececec] flex flex-col items-center w-full lg:w-[311px] h-auto lg:h-[475px] rounded-[30px]" style={{ padding: '30px' }} key={i}>
                                <Image alt='' className='-mt-20' src={item.Image} width={251} height={251} />
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

export default AllinOnePrinters
