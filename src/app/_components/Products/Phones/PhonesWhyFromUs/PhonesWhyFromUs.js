import React from 'react';
import { safeRender } from '@/lib/safe-html';

const PhonesWhyFromUs = ({ cmsData }) => {
  const fields = cmsData?.fields || cmsData || {};

  let headingTop = safeRender(fields.heading, 'Why Buy');
  const headingHighlight = safeRender(fields.heading_highlight, 'Phones in Wholesale');
  const headingEnd = safeRender(fields.heading_end, 'From Us?');

  // Prevent duplicate text if full heading was accidentally stored in headingTop
  if (headingTop && headingHighlight && headingTop.includes(headingHighlight)) {
    headingTop = headingTop.replace(headingHighlight, '').replace(headingEnd || '', '').replace(/\s+/g, ' ').trim();
  }

  const paragraphText = safeRender(
    fields.paragraph,
    'Crown Excel is Dubai’s reputable supplier for wholesale smartphones and enterprise mobile communications. Here is why corporations, retailers, and traders partner with us:'
  );

  const feature1Title = safeRender(fields.feature1_title, '100% Original & Brand New');
  const feature1Desc = safeRender(
    fields.feature1_desc,
    'All mobile phones and accessories are factory sealed, genuine, and sourced directly from official global supply chains.'
  );

  const feature2Title = safeRender(fields.feature2_title, 'Aggressive Wholesale Pricing');
  const feature2Desc = safeRender(
    fields.feature2_desc,
    'Maximize your profit margins with highly competitive wholesale tier rates on top-demand Apple and Samsung smartphones.'
  );

  const feature3Title = safeRender(fields.feature3_title, 'Local Warranty & Support');
  const feature3Desc = safeRender(
    fields.feature3_desc,
    'Enjoy peace of mind with manufacturer-backed warranties and dedicated account managers to handle post-sales support.'
  );

  const feature4Title = safeRender(fields.feature4_title, 'Fast UAE & GCC Fulfillment');
  const feature4Desc = safeRender(
    fields.feature4_desc,
    'Rapid dispatch from our Dubai warehouse with same-day local UAE deliveries and efficient international GCC export logistics.'
  );

  return (
    <div className="w-full bg-[#FFFFFF] overflow-hidden">
      <section
        id="why-buy-phones-from-us"
        aria-label="Why Buy Phones in Wholesale From Us"
        className="w-full max-w-[1536px] mx-auto flex lg:flex-row flex-col items-center justify-between my-6 sm:my-8 lg:my-10 px-6 lg:px-20 py-10 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #3d3f3f 30%, #232323 100%)',
          padding: '60px 20px',
        }}
      >
        <div className="fromus-left w-full lg:w-[607px] text-white">
          <h2 className='text-[30px] lg:text-[45px] font-[600] leading-[35px] lg:leading-[60px] font-montserrat'>
            {headingTop || 'Why Buy'} <br /> <span className='text-[#ffd900] font-[900]'>{headingHighlight || 'Phones in Wholesale'}</span> {headingEnd || 'From Us?'}
          </h2>
          <p className='text-[16px] mt-5 w-full lg:w-[425px] leading-[27px] font-montserrat text-gray-300'>
            {paragraphText || 'Crown Excel is Dubai’s reputable supplier for wholesale smartphones and enterprise mobile communications. Here is why corporations, retailers, and traders partner with us:'}
          </p>
        </div>
        <div className="fromus flex flex-col gap-5 mt-8 lg:mt-0">
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[160px] bg-[#f1f1f1] rounded-[20px] flex flex-col text-left justify-center gap-2 hover:bg-yellow-300 transition px-6 py-5">
              <h3 className='text-left text-[20px] lg:text-[26px] font-[700] leading-[28px] font-montserrat'>{feature1Title || '100% Original & Brand New'}</h3>
              <p className='text-[14px] lg:text-[15px] leading-[22px] font-montserrat text-gray-700'>{feature1Desc || 'All mobile phones and accessories are factory sealed, genuine, and sourced directly from official global supply chains.'}</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[160px] bg-[#f1f1f1] rounded-[20px] flex flex-col text-left justify-center gap-2 hover:bg-yellow-300 transition px-6 py-5">
              <h3 className='text-left text-[20px] lg:text-[26px] font-[700] leading-[28px] font-montserrat'>{feature2Title || 'Aggressive Wholesale Pricing'}</h3>
              <p className='text-[14px] lg:text-[15px] leading-[22px] font-montserrat text-gray-700'>{feature2Desc || 'Maximize your profit margins with highly competitive wholesale tier rates on top-demand Apple and Samsung smartphones.'}</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[160px] bg-[#f1f1f1] rounded-[20px] flex flex-col text-left justify-center gap-2 hover:bg-yellow-300 transition px-6 py-5">
              <h3 className='text-left text-[20px] lg:text-[26px] font-[700] leading-[28px] font-montserrat'>{feature3Title || 'Local Warranty & Support'}</h3>
              <p className='text-[14px] lg:text-[15px] leading-[22px] font-montserrat text-gray-700'>{feature3Desc || 'Enjoy peace of mind with manufacturer-backed warranties and dedicated account managers to handle post-sales support.'}</p>
          </div>
          <div className="fromus-right-text text-black w-full h-auto lg:w-[607px] lg:h-[160px] bg-[#f1f1f1] rounded-[20px] flex flex-col text-left justify-center gap-2 hover:bg-yellow-300 transition px-6 py-5">
              <h3 className='text-left text-[20px] lg:text-[26px] font-[700] leading-[28px] font-montserrat'>{feature4Title || 'Fast UAE & GCC Fulfillment'}</h3>
              <p className='text-[14px] lg:text-[15px] leading-[22px] font-montserrat text-gray-700'>{feature4Desc || 'Rapid dispatch from our Dubai warehouse with same-day local UAE deliveries and efficient international GCC export logistics.'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhonesWhyFromUs;
