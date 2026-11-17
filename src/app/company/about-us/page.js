import React from 'react';
import AboutUs from './_components/page';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export const revalidate = 86400;

export async function generateMetadata() {
  return await generateCmsMetadata('/company/about-us', {
    title: 'About Us | Crown Excel',
    description: 'Learn about Crown Excel, a leading IT hardware and infrastructure solutions provider based in Dubai.',
  });
}

export default async function AboutUsPage() {
  const { content: cmsContent } = await getCmsData('/company/about-us');
  return (
    <div>
      <AboutUs cmsContent={cmsContent} />
    </div>
  );
}
