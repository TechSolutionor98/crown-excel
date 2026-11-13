import ManagedITBanner from '@/app/_components/OurServicesPages/ManagedIT/ManagedITBanner/ManagedITBanner'
import ManagedITCabling from '@/app/_components/OurServicesPages/ManagedIT/ManagedITCabling/ManagedITCabling'
import ManagedITEmpowering from '@/app/_components/OurServicesPages/ManagedIT/ManagedITEmpowering/ManagedITEmpowering'
import ManagedITFaq from '@/app/_components/OurServicesPages/ManagedIT/ManagedITFaq/ManagedITFaq'
import ManagedITSmart from '@/app/_components/OurServicesPages/ManagedIT/ManagedITSmart/ManagedITSmart'
import ManagedITWeareBest from '@/app/_components/OurServicesPages/ManagedIT/ManagedITWeareBest/ManagedITWeareBest'
import ManagedITWhyChooseUs from '@/app/_components/OurServicesPages/ManagedIT/ManagedITWhyChooseUs/ManagedITWhyChooseUs'
import React from 'react'
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export const revalidate = 86400;

export async function generateMetadata() {
  return await generateCmsMetadata('/our-services/it-infrastructure', {
    title: 'IT Infrastructure Management | Crown Excel',
    description: 'Managed IT infrastructure, system setup, cabling, and monitoring services in Dubai.',
  });
}

const ManagedIT = async () => {
  const { content: cmsContent } = await getCmsData('/our-services/it-infrastructure');
  const sections = cmsContent?.sections || {};

  return (
    <div>
      <ManagedITBanner cmsData={sections.manageditbanner} />
      <ManagedITSmart cmsData={sections.manageditsmart} />
      {/* <ManagedITEmpowering/>
      <ManagedITWhyChooseUs/>
      <ManagedITCabling/>
      <ManagedITWeareBest/>
      <ManagedITFaq/> */}
    </div>
  );
};

export default ManagedIT

