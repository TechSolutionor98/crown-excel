import React from 'react'
import BestNetworkSwitches from '@/app/_components/Products/Switching/BestNetworkSwitches/BestNetworkSwitches'
import SwitchingBanner from '@/app/_components/Products/Switching/SwitchingBanner/SwitchingBanner'
import SwitchingBrandsWeDeal from '@/app/_components/Products/Switching/SwitchingBrandsWeDeal/SwitchingBrandsWeDeal'
import SwitchingHeavyComputing from '@/app/_components/Products/Switching/SwitchingHeavyComputing/SwitchingHeavyComputing'
import SwitchingHighPerformance from '@/app/_components/Products/Switching/SwitchingHighPerformance/SwitchingHighPerformance'
import SwitchingLatestProduct from '@/app/_components/Products/Switching/SwitchingLatestProduct/SwitchingLatestProduct'
import SwitchingUnlease from '@/app/_components/Products/Switching/SwitchingUnlease/SwitchingUnlease'
import SwitchingWhyBuyFromUs from '@/app/_components/Products/Switching/SwitchingWhyBuyFromUs/SwitchingWhyBuyFromUs'
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export const revalidate = 86400;

export async function generateMetadata() {
  return await generateCmsMetadata('/products/switching', {
    title: 'Network Switches & Managed Switches | Crown Excel',
    description: 'Gigabit network switches, PoE switches, and managed network switching solutions in Dubai.',
  });
}

const Switching = async () => {
  const { content: cmsContent } = await getCmsData('/products/switching');
  const sections = cmsContent?.sections || {};

  return (
    <div>
      <SwitchingBanner cmsData={sections.switchingbanner} />
      <SwitchingLatestProduct cmsData={sections.switchinglatestproduct} />
      <SwitchingUnlease cmsData={sections.switchingunlease} />
      <SwitchingHighPerformance cmsData={sections.switchinghighperformance} />
      <SwitchingHeavyComputing cmsData={sections.switchingheavycomputing} />
      <BestNetworkSwitches cmsData={sections.bestnetworkswitches} />
      <SwitchingWhyBuyFromUs cmsData={sections.switchingwhybuyfromus} />
      <SwitchingBrandsWeDeal cmsData={sections.switchingbrandswedeal} />
    </div>
  )
}

export default Switching
