import React from 'react'
import Image from 'next/image'
import director from '@/Components/Images/director.png'
import directorbg from '@/Components/Images/directorbg.png'
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import { safeRender, safeImage } from '@/lib/safe-html';

export const revalidate = 120;

export async function generateMetadata() {
  return await generateCmsMetadata('/company/director-message', {
    title: "Director's Message | Crown Excel",
    description: "Read the Director's message and vision for Crown Excel General Trading LLC.",
  });
}

async function DirectorMessage() {
  const { content: cmsContent } = await getCmsData('/company/director-message');
  const sections = cmsContent?.sections || {};
  const mainSec = sections.directormessage || sections.main || {};
  const fields = mainSec.fields || {};

  const headingText = safeRender(fields.heading, "Director's Message");
  const quoteText = safeRender(fields.paragraph || fields.subheading, "Together, let’s embrace technology and build a better tomorrow.");
  const p1Text = safeRender(fields.paragraph_2 || fields.paragraph_1, "At Crown Excel General Trading LLC, our journey has always been guided by innovation, integrity, and an unwavering commitment to excellence. From our humble beginnings in 2009, in one of the world’s most vibrant and adaptable modern hubs, we embarked on our mission. Today, after two decades, we have grown into a trusted name in the market, it was never been easy or not by chance, but through a clear vision and relentless dedication to delivering value to our customers and partners and I believe if we do our best, we will surely get success by the grace of Allah.");
  const p2Text = safeRender(fields.paragraph_3, "I still remember the early days when we started with just a few products and limited experience. By the grace of the Almighty, today we proudly offer a wide range of products and services to meet the diverse needs of our customers and clients. Our mission goes far beyond products; we strive to build lasting relationships, provide tailored IT and business solutions, and contribute to the sustainable growth of the communities we serve. In today’s fast-paced and ever-changing world, adaptability is our strength, and customer satisfaction is our ultimate reward.");
  const p3Text = safeRender(fields.paragraph_4, "I believe in empowering our team, fostering a culture of trust, and embracing emerging technologies to stay ahead. As we look to the future, we will continue to expand our horizons, explore new markets, and enhance our services to meet the evolving needs of our clients.");
  const p4Text = safeRender(fields.paragraph_5, "Together, with the dedication of our people and the trust of our partners, we will not just keep pace with change — we will lead it.");
  const directorName = safeRender(fields.paragraph_6 || fields.director_name, "Muhammad Qais");
  const directorDesignation = safeRender(fields.paragraph_7 || fields.director_designation, "Managing Director & CEO");
  const companyName = safeRender(fields.paragraph_8 || fields.company_name, "Crown Excel General Trading LLC");

  const directorPhoto = safeImage(fields.image_director || fields.image, director);

  return (
    <div className="min-h-screen ">
      <div className='flex flex-col items-center'>
        <div className="flex-shrink-0 relative mb-0">
          <Image
            src={directorPhoto}
            alt="Director's Photo"
            width={320}
            height={220}
            className="h-auto object-cover w-[500px] max-h-[620px] rounded-xl mx-auto mt-2"
          />
          <div className="absolute inset-0 rounded-xl"></div>
        </div>
        {/* Director's Message below the image */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden mb-16">
              <div className="flex flex-col">
                <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                  <h1 className="text-2xl md:text-5xl font-bold text-[#16806b] font-montserrat mb-4">
                    {headingText}
                  </h1>
                  <div className="w-16 h-1 bg-[#61ce70] mb-6"></div>
                  <div className="space-y-6 text-gray-700 font-muli leading-8">
                    <p className="text-xl font-semibold mb-2">
                      {quoteText}
                    </p>
                    <p className="text-lg">
                      {p1Text}
                    </p>
                    <p className="text-lg">
                      {p2Text}
                    </p>
                    <p className="text-lg">
                      {p3Text}
                    </p>
                    <p className="text-lg">
                      {p4Text}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="font-bold text-[#16806b] text-lg mb-1">{directorName}</p>
                    <p className="font-semibold text-gray-700">{directorDesignation}</p>
                    <p className="text-gray-700">{companyName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectorMessage;