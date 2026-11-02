import React from 'react'
import Allinone1 from '../../../../../Components/Images/allinonedesktop1.png'
import Allinone2 from '../../../../../Components/Images/allinonedesktop2.png'
import Allinone3 from '../../../../../Components/Images/allinonedesktop3.png'
import Allinone4 from '../../../../../Components/Images/allinonedesktop4.png'
import Allinone5 from '../../../../../Components/Images/allinonedesktop5.png'
import Allinone6 from '../../../../../Components/Images/allinonedesktop6.png'
import Image from 'next/image'
import { safeRender, safeImage } from '@/lib/safe-html'

const AllinOneDesktops = ({ cmsData }) => {
    const fields = cmsData?.fields || cmsData || {};
    const headingText = safeRender(fields.heading, <>The Best All-in-one Desktops <br /> For Space-Saving Power</>);

    const sub1 = safeRender(fields.subheading_1 || fields.heading_2, "For Businesses:");
    const btn1 = safeRender(fields.button_1_text, "Visit Our Store");

    const sub2 = safeRender(fields.subheading_2 || fields.heading_3, "For Individuals:");
    const btn2 = safeRender(fields.button_2_text, "Visit Our Store");

    const img1 = safeImage(fields.image_allinone1, Allinone1);
    const img2 = safeImage(fields.image_allinone2, Allinone2);
    const img3 = safeImage(fields.image_allinone3, Allinone3);
    const img4 = safeImage(fields.image_allinone4, Allinone4);
    const img5 = safeImage(fields.image_allinone5, Allinone5);
    const img6 = safeImage(fields.image_allinone6, Allinone6);

    const Business = [
        { 
            Image: img1, 
            title: safeRender(fields.card_1_title, 'ASUS EXPERT CENTER D700 SC'), 
            desc: safeRender(fields.card_1_desc, 'ASUS EXPERT CENTER D700 SC best for business use with optimized speed.') 
        },
        { 
            Image: img2, 
            title: safeRender(fields.card_2_title, 'Lenovo M70q G4 Tiny'), 
            desc: safeRender(fields.card_2_desc, 'The Lenovo M70q G4 Tiny is a compact yet powerful desktop computer designed for optimal performance and space-saving efficiency.') 
        },
        { 
            Image: img3, 
            title: safeRender(fields.card_3_title, 'Acer Veriton VS'), 
            desc: safeRender(fields.card_3_desc, 'The Acer Veriton VS2690G Desktop Tower is the perfect choice for anyone in need of a reliable and efficient computer.') 
        },
    ];

    const Individuals = [
        { 
            Image: img4, 
            title: safeRender(fields.card_4_title, 'DELL OPTIPLEX 3000'), 
            desc: safeRender(fields.card_4_desc, 'Introducing the Dell OptiPlex 3000 MT (DTDELLOPT3000I54256GBD), a dependable desktop solution.') 
        },
        { 
            Image: img5, 
            title: safeRender(fields.card_5_title, 'HP 290 G3 Small'), 
            desc: safeRender(fields.card_5_desc, 'Introducing the HP 290 G3 Small Form Factor PC Bundle, the perfect choice for all your computing needs.') 
        },
        { 
            Image: img6, 
            title: safeRender(fields.card_6_title, 'Dell Alienware Aurora'), 
            desc: safeRender(fields.card_6_desc, 'The Dell Alienware Aurora R15 Gaming Desktop is the ultimate choice for any gaming enthusiast.') 
        },
    ];

    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="all-in-one-desktops"
                aria-label="The Best All-in-one Desktops For Space-Saving Power"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] pt-10 sm:pt-14 lg:pt-20 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            >
                <h2 className='text-[24px] md:text-[50px] md:leading-[60px] lg:text-[50px] leading-[30px] lg:leading-[60px] font-[700] text-black font-montserrat text-center'>{headingText}</h2>
                <div className="allinone-bottom">
                    <div className="allinone-bottom-top mt-10">
                        <div className="title-button flex flex-col md:flex-row lg:flex-row items-center justify-between px-5 mt-10">
                            <h3 className='text-[30px] md:text-[50px] lg:text-[50px] leading-[30px] lg:leading-[50px] font-[600] font-montserrat text-[#147d61]'>{sub1}</h3>
                            <button className='bg-[#ffd900] mt-5 lg:mt-0 p-[10px] rounded-[10px] text-black text-[20px] font-[500] leading-[20px] font-montserrat' style={{ boxShadow: '4px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}>{btn1}</button>
                        </div>
                        <div className="cards flex flex-col md:flex-row lg:flex-row items-center justify-center gap-25 md:gap-15 lg:gap-15 mt-30 px-3 lg:px-0">
                            {Business.map((item, i) => (
                                <div className="card-1 bg-[#ececec] flex flex-col items-center w-full lg:w-[311px] h-auto lg:h-[475px] rounded-[30px]" style={{ padding: '30px' }} key={i}>
                                    <Image alt='' className='-mt-20' src={item.Image} width={251} height={251} />
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
                            <h3 className='text-[30px] md:text-[50px] lg:text-[50px] leading-[30px] lg:leading-[50px] font-[600] font-montserrat text-[#147d61]'>{sub2}</h3>
                            <button className='bg-[#ffd900] mt-5 lg:mt-0 p-[10px] rounded-[10px] text-black text-[20px] font-[500] leading-[20px] font-montserrat' style={{ boxShadow: '4px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}>{btn2}</button>
                        </div>
                        <div className="cards flex flex-col md:flex-row lg:flex-row items-center justify-center gap-25 md:gap-15 lg:gap-15 mt-30 px-3 lg:px-0">
                            {Individuals.map((item, i) => (
                                <div className="card-1 bg-[#ececec] flex flex-col items-center w-full lg:w-[311px] h-auto lg:h-[475px] rounded-[30px]" style={{ padding: '30px' }} key={i}>
                                    <Image alt='' className='-mt-20' src={item.Image} width={251} height={251} />
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

export default AllinOneDesktops

