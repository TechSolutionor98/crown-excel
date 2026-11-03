import ContactUsForm from '@/app/_components/ContactUsPage/ContactUsForm/ContactUsForm'
import NetworkCoreAreas from '@/app/_components/OurServicesPages/Networking/NetworkCoreAreas/NetworkCoreAreas'
import NetworkEmpowering from '@/app/_components/OurServicesPages/Networking/NetworkEmpowering/NetworkEmpowering_new'
import NetworkingBanner from '@/app/_components/OurServicesPages/Networking/NetworkingBanner/NetworkingBanner'
import React from 'react';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';

export const revalidate = 120;

export async function generateMetadata() {
  return await generateCmsMetadata('/our-services/networking', {
    title: 'Networking & Cabling Solutions | Crown Excel',
    description: 'Structured cabling, network switches, routers, and enterprise network setup in Dubai.',
  });
}

const Networking = async () => {
  const { content: cmsContent } = await getCmsData('/our-services/networking');
  const sections = cmsContent?.sections || {};

  return (
    <div>
      <NetworkingBanner cmsData={sections.networkingbanner} />
      {/* <NetworkingSmart/> */}
      <NetworkEmpowering cmsData={sections.networkempowering} />
        {/* <div className="header text-center">
        <h1 className='text-[32px] text-black -mb-10 lg:text-[32px] font-montserrat font-[600]'>Get a Quote</h1> */}
        {/* <p className='text-[14px] lg:text-[24px] font-roboto'>Reach out to us, and we’ll be happy to assist you.</p> */}
      {/* </div> */}
      {/* <ContactUsForm/>  */}
      {/* <NetworkEmpowering/> */}
      {/* <NetworkCoreAreas/>
      <NetworkingCabling/>
      <NetworkingFirewall/>
      <NetworkingFAQ/> */}
    </div>
  );
};

export default Networking;
