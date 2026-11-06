import React from 'react';
import { generateCmsMetadata, getCmsData, getCmsSeo } from '@/lib/cms-fetch';
import WholesaleClientPage from './WholesaleClientPage';

export async function generateMetadata() {
  return await generateCmsMetadata('/it-hardware-wholesale-supplier-in-dubai-or-uae', {
    title: 'Best IT Hardware Wholesale Supplier in Dubai UAE',
    description:
      'Leading IT hardware and laptop wholesale supplier in Dubai & UAE. Bulk business laptops, gaming laptops, workstations, everyday portables & certified refurbished units for resellers and corporate clients.',
    keywords: [
      'IT Hardware Wholesale Supplier in Dubai',
      'Wholesale IT Hardware in Dubai',
      'IT Hardware Wholesaler in UAE',
      'Laptop Wholesale Supplier in Dubai',
      'Wholesale Laptops in Dubai',
      'Laptop Wholesaler in UAE',
      'Bulk Laptop Suppliers in UAE',
      'Wholesale Gaming Laptops in Dubai',
      'Business Laptop Suppliers in UAE',
      'Bulk Laptop Orders for Resellers and Businesses',
      'Wholesale refurbished laptops Dubai',
      'Bulk laptop distributors UAE',
      'Corporate laptop procurement Dubai',
    ],
    alternates: {
      canonical: 'https://www.crownexcel.ae/it-hardware-wholesale-supplier-in-dubai-or-uae',
    },
    openGraph: {
      title: 'IT Hardware Wholesale Supplier in Dubai | Bulk IT Hardware in UAE - Crown Excel',
      description:
        'Leading IT hardware and laptop wholesale supplier in Dubai & UAE. Bulk business laptops, gaming laptops, workstations, everyday portables & certified refurbished units for resellers and corporate clients.',
      url: 'https://www.crownexcel.ae/it-hardware-wholesale-supplier-in-dubai-or-uae',
      siteName: 'Crown Excel',
      locale: 'en_AE',
      type: 'website',
      images: [
        {
          url: 'https://www.crownexcel.ae/logo.png',
          width: 800,
          height: 600,
          alt: 'Crown Excel Wholesale IT Hardware in Dubai and UAE',
        },
      ],
    },
    Author: { name: 'Crown Excel General Trading LLC' },
    publisher: { name: 'Crown Excel General Trading LLC' },
    
    twitter: {
      card: 'summary_large_image',
      title: 'IT Hardware Wholesale Supplier in Dubai | Bulk IT Hardware in UAE',
      description:
        'Wholesale IT hardware and laptops in Dubai & UAE. Business, gaming, workstation & refurbished bulk supply for resellers and enterprises.',
      images: ['https://www.crownexcel.ae/logo.png'],
    },
  });
}

// Enable Incremental Static Regeneration (ISR)
export const revalidate = 300;

export default async function ITHardwareWholesalePage() {
  let { content: cmsContent } = await getCmsData('/it-hardware-wholesale-supplier-in-dubai-or-uae');
  if (!cmsContent || Object.keys(cmsContent).length === 0) {
    const legacy = await getCmsData('/laptop-wholesale-supplier-in-dubai-or-uae');
    cmsContent = legacy?.content;
  }
  let cmsSeo = await getCmsSeo('/it-hardware-wholesale-supplier-in-dubai-or-uae');
  if (!cmsSeo) {
    cmsSeo = await getCmsSeo('/laptop-wholesale-supplier-in-dubai-or-uae');
  }
  let customSchemaObj = null;
  if (cmsSeo?.schema?.customSchema && typeof cmsSeo.schema.customSchema === 'string') {
    try {
      customSchemaObj = JSON.parse(cmsSeo.schema.customSchema);
    } catch (e) {
      console.error('Failed to parse CMS customSchema in ITHardwareWholesalePage:', e);
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
            name: 'IT Hardware Wholesale Supplier in Dubai or UAE',
            item: 'https://www.crownexcel.ae/it-hardware-wholesale-supplier-in-dubai-or-uae',
          },
        ],
      },
      {
        '@type': ['WholesaleStore', 'LocalBusiness'],
        '@id': 'https://www.crownexcel.ae/it-hardware-wholesale-supplier-in-dubai-or-uae#store',
        name: 'Crown Excel - IT Hardware Wholesale Supplier in Dubai',
        url: 'https://www.crownexcel.ae/it-hardware-wholesale-supplier-in-dubai-or-uae',
        logo: 'https://www.crownexcel.ae/logo.png',
        telephone: '+971-4-354-0566',
        email: 'contact@crownexcel.com',
        priceRange: '$$$',
        currenciesAccepted: 'AED, USD',
        paymentAccepted: 'Cash, Credit Card, Bank Wire, Corporate Cheque',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Al Jahra Building, 2nd floor, 18th St, Al Raffa',
          addressLocality: 'Dubai',
          addressRegion: 'Dubai',
          addressCountry: 'AE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '25.2582',
          longitude: '55.2917',
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
        '@type': 'Product',
        name: 'Wholesale Laptops in Dubai and UAE',
        description:
          'Commercial bulk laptops, gaming laptops, workstations, everyday portables and certified refurbished lots for corporate enterprises and IT resellers.',
        category: 'Electronics > Computers > Laptops',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'AED',
          lowPrice: '999',
          highPrice: '15000',
          offerCount: '500',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the Minimum Order Quantity (MOQ) for wholesale laptops in Dubai?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our standard Minimum Order Quantity (MOQ) starts from 5 units for high-performance gaming laptops and mobile workstations, 10 units for commercial business notebooks, and 20 units for palletized refurbished laptop lots.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you supply genuine laptops with manufacturer warranties in Dubai?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. All brand-new wholesale laptops supplied by Crown Excel are 100% authentic, factory-sealed, and backed by manufacturer warranties with verified serial numbers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can Crown Excel customize laptop hardware specifications before bulk delivery?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Our in-house technical department in Dubai provides value-added hardware provisioning including RAM upgrades, NVMe SSD storage expansions, laser engraving of bilingual Arabic/English keyboards, and BIOS pre-configuration.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you deliver laptops across all UAE emirates and export to GCC countries?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. We offer same-day express delivery in Dubai and next-day scheduled delivery to Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain, as well as export customs documentation for GCC countries.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you inspect and grade refurbished laptops?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every refurbished unit passes through a rigorous 35-point quality check including motherboard diagnostics, battery health testing (guaranteed 80%+ capacity), display panel uniformity, and thermal stress tests.',
            },
          },
          {
            '@type': 'Question',
            name: 'What payment options and credit terms are available for bulk orders?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We accept Bank Wire Transfer (TT), Corporate Cheques, major credit cards, and cash on delivery/collection for local Dubai transactions. Structured credit terms are available for verified corporate clients.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I physically inspect the laptops before placing or receiving my order?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, B2B clients can visit our Experience Centre at Shop No. 2, Building 716 Khalid Bin Al Waleed Road (Bur Dubai) or our Head Office in Al Raffa to inspect samples and verify hardware quality.',
            },
          },
        ],
      },
    ],
  };

  if (customSchemaObj) {
    if (Array.isArray(customSchemaObj)) {
      jsonLdData['@graph'].push(...customSchemaObj);
    } else if (customSchemaObj['@graph']) {
      jsonLdData['@graph'].push(...customSchemaObj['@graph']);
    } else {
      jsonLdData['@graph'].push(customSchemaObj);
    }
  }

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <WholesaleClientPage cmsContent={cmsContent} />
    </>
  );
}
