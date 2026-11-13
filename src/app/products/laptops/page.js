import React from 'react';
import { generateCmsMetadata, getCmsData } from '@/lib/cms-fetch';
import LaptopPageClient from './LaptopPageClient';

export async function generateMetadata() {
  return await generateCmsMetadata('/products/laptops', {
    title: 'Laptop Wholesale Supplier in Dubai & UAE | Bulk Commercial, Gaming & Business Laptops — Crown Excel',
    description:
      'Leading laptop wholesale supplier in Dubai & UAE. Direct factory-sealed bulk supply of gaming laptops, business laptops, personal portables, and mobile workstations from Lenovo, HP, Dell, ASUS, Acer, and Apple for IT resellers and corporate fleets.',
    keywords: [
      'Laptop Wholesale Supplier in Dubai',
      'Wholesale Laptops in Dubai',
      'Laptop Wholesaler in UAE',
      'Bulk Laptop Suppliers in UAE',
      'Wholesale Gaming Laptops in Dubai',
      'Business Laptop Suppliers in UAE',
      'Commercial Laptops Bulk Dubai',
      'Bulk Laptop Orders for Resellers',
      'Corporate laptop procurement Dubai',
      'Lenovo wholesale laptops Dubai',
      'HP laptops wholesale UAE',
      'ASUS laptops bulk distributor',
      'Acer laptops wholesale Dubai',
    ],
    alternates: {
      canonical: 'https://www.crownexcel.ae/products/laptops',
    },
    openGraph: {
      title: 'Laptop Wholesale Supplier in Dubai & UAE | Crown Excel',
      description:
        'Leading laptop wholesale supplier in Dubai & UAE. Direct factory-sealed bulk supply of gaming, business, and enterprise laptops for IT resellers and corporations.',
      url: 'https://www.crownexcel.ae/products/laptops',
      siteName: 'Crown Excel',
      locale: 'en_AE',
      type: 'website',
      images: [
        {
          url: 'https://www.crownexcel.ae/logo.png',
          width: 800,
          height: 600,
          alt: 'Crown Excel Wholesale Laptops in Dubai & UAE',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Laptop Wholesale Supplier in Dubai & UAE | Crown Excel',
      description:
        'Direct factory-sealed bulk laptops from Lenovo, HP, Dell, ASUS, and Acer in Dubai & UAE. Fast UAE & GCC delivery.',
      images: ['https://www.crownexcel.ae/logo.png'],
    },
  });
}

export const revalidate = 86400;

export default async function LaptopsPage() {
  const { content: cmsContent, seo: cmsSeo } = await getCmsData('/products/laptops');
  let customSchemaObj = null;
  if (cmsSeo?.schema?.customSchema && typeof cmsSeo.schema.customSchema === 'string') {
    try {
      customSchemaObj = JSON.parse(cmsSeo.schema.customSchema);
    } catch (e) {
      console.error('Failed to parse CMS customSchema in LaptopsPage:', e);
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
            name: 'Products',
            item: 'https://www.crownexcel.ae/products',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Laptops',
            item: 'https://www.crownexcel.ae/products/laptops',
          },
        ],
      },
      {
        '@type': ['WholesaleStore', 'LocalBusiness'],
        '@id': 'https://www.crownexcel.ae/products/laptops#store',
        name: 'Crown Excel - Wholesale Laptop Supplier in Dubai',
        url: 'https://www.crownexcel.ae/products/laptops',
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
          latitude: '25.2532',
          longitude: '55.2891',
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
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the Minimum Order Quantity (MOQ) for wholesale laptop pricing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our standard wholesale tier starts at 5 to 10 units for mixed commercial models. For volume pallet or container consignments (50 to 500+ units), we provide customized volume tier discounts.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are all laptops factory-sealed with authentic manufacturer warranties?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. 100% of our laptop inventory is brand-new, factory-sealed in original manufacturer packaging with valid brand warranty. We do not sell grey-market or unverified stock.',
            },
          },
          {
            '@type': 'Question',
            name: 'How fast can Crown Excel deliver laptops across Dubai and the UAE?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Orders confirmed before 1:00 PM are dispatched same-day within Dubai, Sharjah, and Ajman. Deliveries to Abu Dhabi, Al Ain, Ras Al Khaimah, and Fujairah are completed next business day.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you support international export to Saudi Arabia and other GCC countries?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. We provide daily road and air cargo dispatch to Saudi Arabia, Oman, Qatar, Bahrain, Kuwait, and African markets with complete customs documentation and export packing.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchemaObj || jsonLdData) }}
      />

      <LaptopPageClient cmsContent={cmsContent} />
    </>
  );
}
