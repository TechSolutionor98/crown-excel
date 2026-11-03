import HardwareAmcBanner from '@/app/_components/OurServicesPages/HardwareAMC/HardwareAmcBanner/HardwareAmcBanner'
import HardwareEmpowering from '@/app/_components/OurServicesPages/HardwareAMC/HardwareEmpowering/HardwareEmpowering_new'
import HardwareFaq from '@/app/_components/OurServicesPages/HardwareAMC/HardwareFaq/HardwareFaq'
import HardwareServices from '@/app/_components/OurServicesPages/HardwareAMC/HardwareServices/HardwareServices'
import HardwareSmart from '@/app/_components/OurServicesPages/HardwareAMC/HardwareSmart/HardwareSmart'
import HardwareWeAreBest from '@/app/_components/OurServicesPages/HardwareAMC/HardwareWeAreBest/HardwareWeAreBest'
import HardwareWhyChooseUS from '@/app/_components/OurServicesPages/HardwareAMC/HardwareWhyChooseUS/HardwareWhyChooseUS'
import React from 'react';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export const revalidate = 120;

export async function generateMetadata() {
  return await generateCmsMetadata('/our-services/long/short-term-amc', {
    title: 'Hardware AMC Contracts | Crown Excel',
    description: 'Long and short-term Annual Maintenance Contracts (AMC) for corporate IT hardware.',
  });
}

const HardwareAMC = async () => {
  const { content: cmsContent } = await getCmsData('/our-services/long/short-term-amc');
  const sections = cmsContent?.sections || {};

  return (
    <div>
      <HardwareAmcBanner cmsData={sections.hardwareamcbanner} />
      {/* <HardwareSmart/> */}
      <HardwareEmpowering cmsData={sections.hardwareempowering} />
      {/* <HardwareWhyChooseUS/>
      <HardwareServices/>
      <HardwareWeAreBest/>
      <HardwareFaq/> */}
    </div>
  );
};

export default HardwareAMC;
