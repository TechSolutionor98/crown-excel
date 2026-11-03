import React from 'react';
import CCTVBanner from '@/app/_components/Products/CCTV/CCTVBanner/CCTVBanner';
import BestSellingCCTV from '@/app/_components/Products/CCTV/BestSellingCCTV/BestSellingCCTV';
import UltimateCCTV from '@/app/_components/Products/CCTV/UltimateCCTV/UltimateCCTV';
import AllinOneCCTV from '@/app/_components/Products/CCTV/AllinOneCCTV/AllinOneCCTV';
import CCTVBrand from '@/app/_components/Products/CCTV/CCTVBrand/CCTVBrand';
import CCTVWhyFromUs from '@/app/_components/Products/CCTV/CCTVWhyFromUs/CCTVWhyFromUs';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export const revalidate = 120;

export async function generateMetadata() {
  return await generateCmsMetadata('/products/cctv', {
    title: 'CCTV Wholesale Supplier',
    description: 'Top CCTV wholesale supplier in Dubai, UAE. Wholesale IP security cameras, PTZ domes, bullet cameras, NVRs, DVRs, and complete surveillance systems from Hikvision & Dahua.',
    alternates: {
      canonical: 'https://www.crownexcel.ae/products/cctv',
    },
    openGraph: {
      title: 'CCTV Wholesale Supplier | Crown Excel',
      description: 'Top CCTV wholesale supplier in Dubai, UAE. Wholesale IP security cameras, PTZ domes, bullet cameras, NVRs, DVRs, and complete surveillance systems from Hikvision & Dahua.',
      url: 'https://www.crownexcel.ae/products/cctv',
    },
  });
}

const CCTVPage = async () => {
  const { content: cmsContent } = await getCmsData('/products/cctv');
  const sections = cmsContent?.sections || {};

  return (
    <main>
      <CCTVBanner cmsData={sections.cctvbanner} />
      <BestSellingCCTV cmsData={sections.bestsellingcctv} />
      <UltimateCCTV cmsData={sections.ultimatecctv} />
      <AllinOneCCTV cmsData={sections.allinonecctv} />
      <CCTVBrand cmsData={sections.cctvbrand} />
      <CCTVWhyFromUs cmsData={sections.cctvwhyfromus} />
    </main>
  );
};

export default CCTVPage;
