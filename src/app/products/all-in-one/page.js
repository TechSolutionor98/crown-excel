import React from 'react'
import AllinOneBanner from '../../_components/Products/AllinOne/AllinOneBanner/AllinOneBanner'
import AllinOneLatestProduct from '@/app/_components/Products/AllinOne/AllinOneLatestProduct/AllinOneLatestProduct'
import AllinOneUnlease from '@/app/_components/Products/AllinOne/AllinOneUnlease/AllinOneUnlease'
import AllinOneHighPerformance from '@/app/_components/Products/AllinOne/AllinOneHighPerformance/AllinOneHighPerformance'
import AllinOneHeavyComputing from '@/app/_components/Products/AllinOne/AllinOneHighComputing/AllinOneHeavyComputing'
import OneinAllProducts from '@/app/_components/Products/AllinOne/OneinAllProducts/OneinAllProducts'
import AllinOneFromUs from '@/app/_components/Products/AllinOne/AllinOneFromUs/AllinOneFromUs'
import AllinOneBrandsWeDeal from '@/app/_components/Products/AllinOne/AllinOneBrandsWeDeal/AllinOneBrandsWeDeal'
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export const revalidate = 86400;

export async function generateMetadata() {
  return await generateCmsMetadata('/products/all-in-one', {
    title: 'All-In-One PCs & Desktops | Crown Excel',
    description: 'High-performance All-In-One desktop computers for office and business solutions in Dubai.',
  });
}

const AllinOne = async () => {
  const { content: cmsContent } = await getCmsData('/products/all-in-one');
  const sections = cmsContent?.sections || {};

  return (
    <div>
      <AllinOneBanner cmsData={sections.allinonebanner} />
      <AllinOneLatestProduct cmsData={sections.allinonelatestproduct} />
      <AllinOneUnlease cmsData={sections.allinoneunlease} />
      <AllinOneHighPerformance cmsData={sections.allinonehighperformance} />
      <AllinOneHeavyComputing cmsData={sections.allinoneheavycomputing} />
      <OneinAllProducts cmsData={sections.oneinallproducts} />
      <AllinOneFromUs cmsData={sections.allinonefromus} />
      <AllinOneBrandsWeDeal cmsData={sections.allinonebrandswedeal} />
    </div>
  )
}

export default AllinOne
