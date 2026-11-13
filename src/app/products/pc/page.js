import React from 'react'
import DesktopBanner from '../../_components/Products/Desktop/DesktopBanner/DesktopBanner'
import DesktopLatestProduct from '@/app/_components/Products/Desktop/LatestProduct/DesktopLatestProduct'
import DesktopBestSelling from '@/app/_components/Products/Desktop/BestSelling/DesktopBestSelling'
import UnleasePowerDesktop from '@/app/_components/Products/Desktop/UnleasePowerDesktop/UnleasePowerDesktop'
import HighPerformance from '@/app/_components/Products/Desktop/HighPerformance/HighPerformance'
import HeavyComputing from '@/app/_components/Products/Desktop/HeavyComputing/HeavyComputing'
import AllinOneDesktops from '@/app/_components/Products/Desktop/AllinOneDesktops/AllinOneDesktops'
import WhyBuyFromUs from '@/app/_components/Products/Desktop/WhyBuyFromUs/WhyBuyFromUs'
import DesktopBrands from '@/app/_components/Products/Desktop/DesktopBrandsWeDeal/DesktopBrands'
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export const revalidate = 86400;

export async function generateMetadata() {
  return await generateCmsMetadata('/products/pc', {
    title: 'Desktops & PCs | Crown Excel',
    description: 'Business PCs, desktop computers, and customized workstations at Crown Excel Dubai.',
  });
}

const page = async () => {
  const { content: cmsContent } = await getCmsData('/products/pc');
  const sections = cmsContent?.sections || {};

  return (
    <div>
      <DesktopBanner cmsData={sections.desktopbanner} />
      {/* <DesktopLatestProduct cmsData={sections.desktoplatestproduct} /> */}
      <DesktopBestSelling cmsData={sections.desktopbestselling} />
      <UnleasePowerDesktop cmsData={sections.unleasepowerdesktop} />
      <HighPerformance cmsData={sections.highperformance} />
      <HeavyComputing cmsData={sections.heavycomputing} />
      <AllinOneDesktops cmsData={sections.allinonedesktops} />
      <WhyBuyFromUs cmsData={sections.whybuyfromus} />
      <DesktopBrands cmsData={sections.desktopbrands} />
    </div>
  );
};

export default page;
