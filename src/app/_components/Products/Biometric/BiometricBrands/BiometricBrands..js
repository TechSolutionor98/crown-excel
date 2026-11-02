import React from 'react'
import Background from '../../../../../Components/Images/ProductsBrandBackground.png'
import Image from 'next/image'
import Lenovo from '../../../../../Components/Images/Lenovo.png'
import Hp from '../../../../../Components/Images/HP2.png'
import Asus from '../../../../../Components/Images/Asus2.png'
import Apple from '../../../../../Components/Images/Apple.png'
import Xiomi from '../../../../../Components/Images/Xiomi.png'
import Dell from '../../../../../Components/Images/Dell2.png'
import Accer from '../../../../../Components/Images/Acer2.png'
import Asus2 from '../../../../../Components/Images/Asus2.png'
import Intel from '../../../../../Components/Images/Intel2.png'
import Amd from '../../../../../Components/Images/Amd2.png'
import Microsft from '../../../../../Components/Images/Microsoft.png'
import Msi from '../../../../../Components/Images/Msi.png'
const BiometricBrands = () => {
  const BrandIcons = [
    {Image: Lenovo, alt: 'Lenovo'},
    {Image: Hp, alt: 'HP'},
    {Image: Asus, alt: 'Asus'},
    {Image: Apple, alt: 'Apple'},
    {Image: Xiomi, alt: 'Xiomi'},
    {Image: Dell, alt: 'Dell'},
    {Image: Accer, alt: 'Accer'},
    {Image: Asus2, alt: 'Asus2'},
    {Image: Intel, alt: 'Intel'},
    {Image: Amd, alt: 'Amd'},
    {Image: Microsft, alt: 'Microsoft'},
    {Image: Msi, alt: 'Msi'}
  ]
  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="brands-we-deal-biometrics"
        aria-label="Brands We Deal"
        className="w-full max-w-[1536px] mx-auto min-h-[320px] md:min-h-[279px] relative mt-6 lg:mt-10 flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, #54595f 0%, #232426 70%, #18191b 100%)',
        }}
      >
        {/* Overlay background image with blend for dots/stars */}
        <div className="absolute z-0 right-0 top-0 w-full h-full pointer-events-none select-none" style={{mixBlendMode: 'screen', opacity: 0.7}}>
          <Image alt='' src={Background} fill style={{objectFit: 'cover', objectPosition: 'right'}}/>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] px-4 md:px-20 py-8 md:py-0 gap-8 md:gap-20">
          {/* Heading */}
          <div className="flex-1 flex items-center md:items-start justify-center md:justify-start w-full">
            <h2 className="text-[2.2rem] md:text-[2rem] text-[#ffd900] font-bold uppercase tracking-wide text-center md:text-left leading-tight drop-shadow-lg">
              BRANDS WE DEAL
            </h2>
          </div>
          {/* Brand Icons Grid */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="grid grid-cols-4 grid-rows-3 gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8 w-[320px] md:w-[500px] lg:w-[600px]">
              {BrandIcons.map((brand, index) => (
                <div key={index} className="flex items-center justify-center">
                  <Image src={brand.Image} alt={brand.alt} width={90} height={60} className="w-[70px] h-[40px] md:w-[90px] md:h-[60px] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BiometricBrands
