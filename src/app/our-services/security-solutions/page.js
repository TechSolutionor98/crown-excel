import HardwareRepairBanner from '@/app/_components/OurServicesPages/HardwareRepair/HardwareRepairBanner/HardwareRepairBanner'
import SecuritySolutionsEmpowering from '@/app/_components/OurServicesPages/HardwareRepair/HardwareRepairEmpowering/HardwareRepairEmpowering'
import React from 'react'
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export const revalidate = 86400;

export async function generateMetadata() {
  return await generateCmsMetadata('/our-services/security-solutions', {
    title: 'Cybersecurity & Security Solutions | Crown Excel',
    description: 'Comprehensive cybersecurity, firewall management, antivirus, and threat monitoring in Dubai.',
  });
}

const HardwareRepair = async () => {
  const { content: cmsContent } = await getCmsData('/our-services/security-solutions');
  const sections = cmsContent?.sections || {};

  return (
    <div>
      <HardwareRepairBanner cmsData={sections.hardwarerepairbanner} />
      <SecuritySolutionsEmpowering cmsData={sections.securitysolutionsempowering} />
    </div>
  );
};

export default HardwareRepair;
