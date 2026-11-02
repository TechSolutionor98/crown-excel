import React from 'react';
import { safeRender } from '@/lib/safe-html';

const CCTVWhyFromUs = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};

  let headingTop = safeRender(fields.heading, 'Why Buy');
  const headingHighlight = safeRender(fields.heading_highlight, 'CCTV Systems in Wholesale');
  const headingEnd = safeRender(fields.heading_end, 'From Us?');

  // Prevent duplicate text if full heading was accidentally stored in headingTop
  if (headingTop && headingHighlight && headingTop.includes(headingHighlight)) {
    headingTop = headingTop.replace(headingHighlight, '').replace(headingEnd || '', '').replace(/\s+/g, ' ').trim();
  }

  const paragraphText = safeRender(
    fields.paragraph,
    'Crown Excel is a leading supplier of professional video surveillance equipment in Dubai. We supply security contractors, system integrators, and businesses across the UAE:'
  );

  const feature1Title = safeRender(fields.feature1_title, 'High-Definition IP Security');
  const feature1Desc = safeRender(
    fields.feature1_desc,
    'Access crystal-clear 2MP, 4MP, and 4K cameras with advanced night vision, wide dynamic range, and smart AI tracking.'
  );

  const feature2Title = safeRender(fields.feature2_title, 'Official Brand Warranty');
  const feature2Desc = safeRender(
    fields.feature2_desc,
    'All surveillance cameras, NVRs, and accessories are backed by direct manufacturer warranty and local technical assistance.'
  );

  const feature3Title = safeRender(fields.feature3_title, 'Bulk Wholesale Pricing');
  const feature3Desc = safeRender(
    fields.feature3_desc,
    'Get unmatched tiered distributor pricing on bulk orders for Hikvision and Dahua security equipment in Dubai and the UAE.'
  );

  const feature4Title = safeRender(fields.feature4_title, 'Pre-Sales Technical Consultation');
  const feature4Desc = safeRender(
    fields.feature4_desc,
    'Our certified CCTV engineers assist you in specifying cameras, lenses, storage calculations, and network requirements for any project.'
  );

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="why-buy-cctv-from-us"
        aria-label="Why Buy CCTV Systems in Wholesale From Us"
        className="w-full max-w-[1536px] mx-auto flex lg:flex-row flex-col items-center justify-between my-6 sm:my-8 lg:my-10 px-6 lg:px-20 py-10 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1b2826 30%, #084032 100%)',
          padding: '60px 20px',
        }}
      >
        <div className="fromus-left w-full lg:w-[607px] text-white">
          <h2 className='text-[30px] lg:text-[45px] font-[600] leading-[35px] lg:leading-[60px] font-montserrat'>
            {headingTop || 'Why Buy'} <br /> <span className='text-[#ffd900] font-[900]'>{headingHighlight || 'CCTV Systems in Wholesale'}</span> {headingEnd || 'From Us?'}
          </h2>
          <p className='text-[16px] mt-5 w-full lg:w-[425px] leading-[27px] font-montserrat text-gray-300'>
            {paragraphText || 'Crown Excel is a leading supplier of professional video surveillance equipment in Dubai. We supply security contractors, system integrators, and businesses across the UAE:'}
          </p>
        </div>
        <div className="fromus flex flex-col gap-5 mt-8 lg:mt-0">
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[160px] bg-[#f1f1f1] rounded-[20px] flex flex-col text-left justify-center gap-2 hover:bg-yellow-300 transition px-6 py-5">
              <h3 className='text-left text-[20px] lg:text-[26px] font-[700] leading-[28px] font-montserrat'>{feature1Title || 'High-Definition IP Security'}</h3>
              <p className='text-[14px] lg:text-[15px] leading-[22px] font-montserrat text-gray-700'>{feature1Desc || 'Access crystal-clear 2MP, 4MP, and 4K cameras with advanced night vision, wide dynamic range, and smart AI tracking.'}</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[160px] bg-[#f1f1f1] rounded-[20px] flex flex-col text-left justify-center gap-2 hover:bg-yellow-300 transition px-6 py-5">
              <h3 className='text-left text-[20px] lg:text-[26px] font-[700] leading-[28px] font-montserrat'>{feature2Title || 'Official Brand Warranty'}</h3>
              <p className='text-[14px] lg:text-[15px] leading-[22px] font-montserrat text-gray-700'>{feature2Desc || 'All surveillance cameras, NVRs, and accessories are backed by direct manufacturer warranty and local technical assistance.'}</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[160px] bg-[#f1f1f1] rounded-[20px] flex flex-col text-left justify-center gap-2 hover:bg-yellow-300 transition px-6 py-5">
              <h3 className='text-left text-[20px] lg:text-[26px] font-[700] leading-[28px] font-montserrat'>{feature3Title || 'Bulk Wholesale Pricing'}</h3>
              <p className='text-[14px] lg:text-[15px] leading-[22px] font-montserrat text-gray-700'>{feature3Desc || 'Get unmatched tiered distributor pricing on bulk orders for Hikvision and Dahua security equipment in Dubai and the UAE.'}</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[160px] bg-[#f1f1f1] rounded-[20px] flex flex-col text-left justify-center gap-2 hover:bg-yellow-300 transition px-6 py-5">
              <h3 className='text-left text-[20px] lg:text-[26px] font-[700] leading-[28px] font-montserrat'>{feature4Title || 'Pre-Sales Technical Consultation'}</h3>
              <p className='text-[14px] lg:text-[15px] leading-[22px] font-montserrat text-gray-700'>{feature4Desc || 'Our certified CCTV engineers assist you in specifying cameras, lenses, storage calculations, and network requirements for any project.'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CCTVWhyFromUs;
