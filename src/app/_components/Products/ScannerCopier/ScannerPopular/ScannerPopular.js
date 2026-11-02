import React from 'react'
import Popular1 from '../../../../../Components/Images/scannerpopular1.png'
import Popular2 from '../../../../../Components/Images/scannerpopular2.png'
import Popular3 from '../../../../../Components/Images/scannerpopular3.png'
import Popular4 from '../../../../../Components/Images/scannerpopular4.png'
import Popular5 from '../../../../../Components/Images/scannerpopular5.png'
import Popular6 from '../../../../../Components/Images/scannerpopular6.png'
import Image from 'next/image'

const Business = [
    { Image: Popular1, Title: 'CANON LIDE SCANNER' },
    { Image: Popular2, Title: 'HP LaserJet Pro' },
    { Image: Popular3, Title: 'HP SCANJET 5000' },
]
const Individuals = [
    { Image: Popular4, Title: 'HP SCANJET 4600' },
    { Image: Popular5, Title: 'HP SCANJET 7500' },
    { Image: Popular6, Title: 'HP SCANJET 3600' },
]

const ScannerPopular = () => {
    return (
        <div className="w-full bg-[#FFFFFF] overflow-hidden">
            <section
                id="popular-all-in-one-solutions"
                aria-label="Popular all-in-one solutions"
                className="w-full max-w-[1536px] mx-auto bg-[#FFFFFF] mt-5 lg:mt-10 overflow-hidden"
            >
                <h2 className='bg-[#ffd900] font-[700] flex items-center justify-center w-full h-[90px] text-center text-black text-[24px] lg:text-[50px] font-montserrat uppercase'>Popular all-in-one solutions</h2>
                <div className="for- mt-5 lg:mt-10">
                    <div className="text-button flex md:flex-row lg:flex-row flex-col items-center justify-between px-6 md:px-20 py-7">
                        <h3 className='text-[#147d61] text-[27px] lg:text-[50px] font-[600]'>For Businesses:</h3>
                        <button className='p-[5px] lg:p-[10px] mt-5 lg:mt-0 bg-[#147d61] text-white flex items-center justify-center text-[18px] lg:text-[20px] font-[500] w-[166px] h-[40px] rounded-[10px]'>Visit Our Store</button>
                    </div>
                    <div className="products flex flex-col md:flex-row lg:flex-row items-center justify-between lg:px-20 py-7" style={{
                        background: 'linear-gradient(to left, #000000 0%, #1a1a1a 50%, #2b2b2b 100%)'
                    }}
                    >
                        {Business.map((item, i) => (
                            <div className="product-item flex flex-col items-center w-[285px] h-[400px]" key={i}>
                                {item.Image  && <Image className='w-full h-[285px]' src={item.Image} alt={item.Title} width={285} height={285} />}
                                {item.Title && <h4 className='text-[26px] font-[700] mt-5 w-[285px] text-center '>{item.Title}</h4>}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="for- mt-10">
                    <div className="text-button flex md:flex-row lg:flex-row flex-col items-center justify-between px-6 md:px-20 py-7">
                        <h3 className='text-[#147d61] text-[27px] lg:text-[50px] font-[600]'>For Individuals:</h3>
                        <button className='p-[5px] lg:p-[10px] mt-5 lg:mt-0 bg-[#147d61] text-white flex items-center justify-center text-[18px] lg:text-[20px] font-[500] w-[166px] h-[40px] rounded-[10px]'>Visit Our Store</button>
                    </div>
                    <div className="products flex flex-col md:flex-row lg:flex-row items-center justify-between lg:px-20 py-7" style={{
                        background: 'linear-gradient(to left, #000000 0%, #1a1a1a 50%, #2b2b2b 100%)'
                    }}
                    >
                        {Individuals.map((item, i) => (
                            <div className="product-item flex flex-col items-center w-[285px] h-[400px]" key={i}>
                                {item.Image  && <Image className='w-full h-[285px]' src={item.Image} alt={item.Title} width={285} height={285} />}
                                {item.Title && <h4 className='text-[26px] font-[700] mt-5 w-[285px] text-center '>{item.Title}</h4>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ScannerPopular
