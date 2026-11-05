import React from 'react';
import { generateCmsMetadata, getCmsData, getCmsSeo } from '@/lib/cms-fetch';
import ITHardwareClientPage from '@/app/_components/OurServicesPages/ITHardware/ITHardwareClientPage';

export const revalidate = 120;

export async function generateMetadata() {
  return await generateCmsMetadata('/our-services/it-hardware-supplier-and-distributor', {
    title: 'IT Hardware Supplier & Distributor in Dubai UAE | Crown Excel',
    description:
      'Premier IT hardware supplier and wholesale distributor in Dubai & UAE. Genuine enterprise servers, networking infrastructure, commercial laptops, storage arrays, and firewalls with rapid UAE delivery and GCC re-export.',
    keywords: [
      'IT Hardware Supplier in Dubai',
      'IT Hardware Distributor UAE',
      'Wholesale IT Hardware Dubai',
      'Enterprise Server Distributor Dubai',
      'Bulk IT Hardware Suppliers in UAE',
      'Networking Hardware Supplier Dubai',
      'Corporate Laptop Procurement Dubai',
      'IT Hardware Wholesaler Middle East',
      'Dell HPE Lenovo Distributor Dubai',
      'Cisco Fortinet Firewall Supplier UAE',
    ],
    alternates: {
      canonical: 'https://www.crownexcel.ae/our-services/it-hardware-supplier-and-distributor',
    },
    openGraph: {
      title: 'IT Hardware Supplier & Distributor in Dubai UAE | Crown Excel',
      description:
        'Leading B2B IT hardware distributor in Dubai & UAE. Enterprise servers, switches, commercial laptops, and storage solutions with bulk wholesale pricing.',
      url: 'https://www.crownexcel.ae/our-services/it-hardware-supplier-and-distributor',
      siteName: 'Crown Excel',
      locale: 'en_AE',
      type: 'website',
      images: [
        {
          url: 'https://www.crownexcel.ae/logo.png',
          width: 800,
          height: 600,
          alt: 'Crown Excel IT Hardware Supplier & Distributor Dubai',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'IT Hardware Supplier & Distributor in Dubai UAE | Crown Excel',
      description:
        'Enterprise IT hardware supplier and wholesale distributor in Dubai & UAE. Servers, networking, laptops, and cyber security hardware.',
      images: ['https://www.crownexcel.ae/logo.png'],
    },
  });
}

export default async function ITHardwarePage() {
  const { content: cmsContent } = await getCmsData('/our-services/it-hardware-supplier-and-distributor');
  const cmsSeo = await getCmsSeo('/our-services/it-hardware-supplier-and-distributor');

  let customSchemaObj = null;
  if (cmsSeo?.schema?.customSchema && typeof cmsSeo.schema.customSchema === 'string') {
    try {
      customSchemaObj = JSON.parse(cmsSeo.schema.customSchema);
    } catch (e) {
      console.error('Failed to parse CMS customSchema:', e);
    }
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.crownexcel.ae',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Our Services',
            item: 'https://www.crownexcel.ae/our-services',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'IT Hardware Supplier & Distributor',
            item: 'https://www.crownexcel.ae/our-services/it-hardware-supplier-and-distributor',
          },
        ],
      },
      {
        '@type': ['WholesaleStore', 'LocalBusiness'],
        '@id': 'https://www.crownexcel.ae/our-services/it-hardware-supplier-and-distributor#store',
        name: 'Crown Excel - IT Hardware Supplier & Distributor',
        url: 'https://www.crownexcel.ae/our-services/it-hardware-supplier-and-distributor',
        logo: 'https://www.crownexcel.ae/logo.png',
        telephone: '+971-4-354-0566',
        email: 'contact@crownexcel.com',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Al Jahra Building, 2nd floor, 18th St - Al Raffa',
          addressLocality: 'Dubai',
          addressRegion: 'Dubai',
          addressCountry: 'AE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 25.2532,
          longitude: 55.2972,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '19:00',
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(customSchemaObj || jsonLdData),
        }}
      />
      <ITHardwareClientPage cmsContent={cmsContent} />
    </>
  );
}
