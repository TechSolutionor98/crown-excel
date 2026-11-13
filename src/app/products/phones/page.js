import React from 'react';
import PhonesBanner from '@/app/_components/Products/Phones/PhonesBanner/PhonesBanner';
import BestSellingPhones from '@/app/_components/Products/Phones/BestSellingPhones/BestSellingPhones';
import UltimatePhones from '@/app/_components/Products/Phones/UltimatePhones/UltimatePhones';
import AllinOnePhones from '@/app/_components/Products/Phones/AllinOnePhones/AllinOnePhones';
import PhonesBrand from '@/app/_components/Products/Phones/PhonesBrand/PhonesBrand';
import PhonesWhyFromUs from '@/app/_components/Products/Phones/PhonesWhyFromUs/PhonesWhyFromUs';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export const revalidate = 86400;

export async function generateMetadata() {
  return await generateCmsMetadata('/products/phones', {
    title: 'Phones Wholesale Supplier',
    description: 'Leading phones wholesale supplier in Dubai, UAE. Bulk supply of smartphones, Apple iPhone, Samsung Galaxy, VoIP phones, PBX systems, and enterprise mobile hardware.',
    alternates: {
      canonical: 'https://www.crownexcel.ae/products/phones',
    },
    openGraph: {
      title: 'Phones Wholesale Supplier | Crown Excel',
      description: 'Leading phones wholesale supplier in Dubai, UAE. Bulk supply of smartphones, Apple iPhone, Samsung Galaxy, VoIP phones, PBX systems, and enterprise mobile hardware.',
      url: 'https://www.crownexcel.ae/products/phones',
    },
  });
}

const PhonesPage = async () => {
  const { content: cmsContent } = await getCmsData('/products/phones');
  const sections = cmsContent?.sections || {};

  return (
    <main>
      <PhonesBanner cmsData={sections.phonesbanner} />
      <BestSellingPhones cmsData={sections.bestsellingphones} />
      <UltimatePhones cmsData={sections.ultimatephones} />
      <AllinOnePhones cmsData={sections.allinonephones} />
      <PhonesBrand cmsData={sections.phonesbrand} />
      <PhonesWhyFromUs cmsData={sections.phoneswhyfromus} />
    </main>
  );
};

export default PhonesPage;
