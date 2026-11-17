import SoftwareBanner from '@/app/_components/OurServicesPages/SoftwareAMC/SoftwareBanner/SoftwareBanner'
import SoftwareSmart from '@/app/_components/OurServicesPages/SoftwareAMC/SoftwareSmart/SoftwareSmart'
import React from 'react'
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export const revalidate = 86400;

export async function generateMetadata() {
  return await generateCmsMetadata('/our-services/software-solutions', {
    title: 'Software Solutions & Maintenance | Crown Excel',
    description: 'Corporate software maintenance, license management, and software support solutions in Dubai.',
  });
}

const SoftwareAMC = async () => {
  const { content: cmsContent } = await getCmsData('/our-services/software-solutions');
  const sections = cmsContent?.sections || {};

  return (
    <div>
      <SoftwareBanner cmsData={sections.softwarebanner} />
      <SoftwareSmart cmsData={sections.softwaresmart} />
    </div>
  )
}

export default SoftwareAMC
