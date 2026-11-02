import React from 'react'
import Popular1 from '../../../../../Components/Images/popularkeyboard1.png'
import Popular2 from '../../../../../Components/Images/popularkeyboard2.png'
import Popular3 from '../../../../../Components/Images/popularkeyboard3.png'
import Popular4 from '../../../../../Components/Images/popularkeyboard4.png'
import Popular5 from '../../../../../Components/Images/popularkeyboard5.png'
import Popular6 from '../../../../../Components/Images/popularkeyboard6.png'
import Image from 'next/image'
import Link from 'next/link'

const Business = [
    { Image: Popular1, Title: 'TopMate Wireless Keyboard and Mouse' },
    { Image: Popular2, Title: 'Wireless Gaming Keyboard and Mouse' },
    { Image: Popular3, Title: 'Rii Gaming Keyboard and Mouse' },
]
const Individuals = [
    { Image: Popular4, Title: 'Foldable Keyboard and Mouse for Laptop' },
    { Image: Popular5, Title: 'Wireless Keyboard and Mouse Combo' },
    { Image: Popular6, Title: 'Wireless Keyboard and Mouse' },
]

const PopularKeyboard = () => {
    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="popular-all-in-one-solutions-keyboard"
                aria-label="Popular all-in-one solutions"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] mt-5 lg:mt-10 overflow-hidden"
            >
                <h2 className='bg-[#ffd900] font-[700] flex items-center justify-center w-full h-[90px] text-center text-black text-[24px] md:text-[40px] lg:text-[50px] font-montserrat uppercase'>Popular all-in-one solutions</h2>
                <div className="for- mt-5 lg:mt-10">
                    <div className="text-button flex md:flex-row lg:flex-row flex-col items-center justify-between px-6 md:px-20 py-7">
                        <h3 className='text-[#147d61] text-[27px] lg:text-[50px] font-[600]'>For Businesses:</h3>
                        <Link href={'https://grabatoz.ae'}>
                            <button className='p-[5px] lg:p-[10px] mt-5 lg:mt-0 bg-[#147d61] text-white flex items-center justify-center text-[18px] lg:text-[20px] font-[500] w-[166px] h-[40px] rounded-[10px]'>Visit Our Store</button>
                        </Link>
                    </div>
                    <div className="products flex flex-col md:flex-row lg:flex-row items-center justify-between gap-10 lg:gap-0 px-4 lg:px-20 py-7" style={{
                        background: 'linear-gradient(to left, #000000 0%, #1a1a1a 50%, #2b2b2b 100%)'
                    }}
                    >
                        {Business.map((item, i) => (
                            <div className="product-item flex flex-col items-center md:w-[250px]  lg:w-[285px] h-[297px]" key={i}>
                                {item.Image && <Image className='w-full h-[190px]' src={item.Image} alt={item.Title} width={285} height={190} />}
                                {item.Title && <h4 className='text-[20px] lg:text-[26px] font-[700] mt-5 w-[285px] text-center '>{item.Title}</h4>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="for- mt-10">
                    <div className="text-button flex md:flex-row lg:flex-row flex-col items-center  justify-between px-6 md:px-20 py-7">
                        <h3 className='text-[#147d61] text-[27px] lg:text-[50px] font-[600]'>For Individuals:</h3>
                        <Link href={'https://grabatoz.ae'}>
                        <button className='p-[5px] lg:p-[10px] mt-5 lg:mt-0 bg-[#147d61] text-white flex items-center justify-center text-[18px] lg:text-[20px] font-[500] w-[166px] h-[40px] rounded-[10px]'>Visit Our Store</button>
                        </Link>
                    </div>
                    <div className="products flex flex-col md:flex-row lg:flex-row items-center gap-10 lg:gap-0 justify-between px-4 lg:px-20 py-7" style={{
                        background: 'linear-gradient(to left, #000000 0%, #1a1a1a 50%, #2b2b2b 100%)'
                    }}
                    >
                        {Individuals.map((item, i) => (
                            <div className="product-item flex  flex-col items-center md:w-[250px]  lg:w-[285px] h-[297px]" key={i}>
                                {item.Image && <Image className='w-full h-[190px]' src={item.Image} alt={item.Title} width={285} height={190} />}
                                {item.Title && <h4 className='text-[20px] lg:text-[26px] font-[700] mt-5 w-[285px] text-center '>{item.Title}</h4>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PopularKeyboard
