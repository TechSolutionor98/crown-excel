import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('crownexceladmin');

    const routePath = '/our-services/it-hardware-supplier-and-distributor';
    const filePath = 'src/app/our-services/it-hardware-supplier-and-distributor/page.js';
    const websiteId = 'default';
    const now = new Date().toISOString();

    console.log(`Checking route: ${routePath}`);

    // 1. Check or Insert into cms_routes
    let route = await db.collection('cms_routes').findOne({ path: routePath, websiteId });
    if (!route) {
      const insertResult = await db.collection('cms_routes').insertOne({
        path: routePath,
        type: 'static',
        dynamicSegment: null,
        parentPath: '/our-services',
        depth: 2,
        fileName: 'page.js',
        filePath: filePath,
        hasLayout: false,
        status: 'active',
        websiteId,
        lastScannedAt: now,
        createdAt: now,
        updatedAt: now,
      });
      route = { _id: insertResult.insertedId, path: routePath };
      console.log(`Created new cms_route with _id: ${route._id}`);
    } else {
      await db.collection('cms_routes').updateOne(
        { _id: route._id },
        {
          $set: {
            filePath,
            status: 'active',
            lastScannedAt: now,
            updatedAt: now,
          },
        }
      );
      console.log(`Updated existing cms_route: ${route._id}`);
    }

    const routeIdStr = route._id.toString();

    // 2. Check or Upsert into cms_seo
    const seoData = {
      routeId: routeIdStr,
      path: routePath,
      websiteId,
      metaTitle: 'IT Hardware Supplier & Distributor in Dubai UAE | Crown Excel',
      metaDescription:
        'Premier IT hardware supplier and wholesale distributor in Dubai & UAE. Genuine enterprise servers, networking equipment, storage arrays, commercial laptops, and firewalls with rapid GCC delivery.',
      metaKeywords: [
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
      canonicalUrl: 'https://www.crownexcel.ae/our-services/it-hardware-supplier-and-distributor',
      robots: {
        index: true,
        follow: true,
        noArchive: false,
        noSnippet: false,
      },
      openGraph: {
        title: 'IT Hardware Supplier & Distributor in Dubai UAE | Crown Excel',
        description:
          'Leading B2B IT hardware distributor in Dubai & UAE. Enterprise servers, switches, commercial laptops, and storage solutions with bulk wholesale pricing.',
        url: 'https://www.crownexcel.ae/our-services/it-hardware-supplier-and-distributor',
        image: 'https://www.crownexcel.ae/logo.png',
        siteName: 'Crown Excel',
        type: 'website',
      },
      twitterCard: {
        cardType: 'summary_large_image',
        title: 'IT Hardware Supplier & Distributor in Dubai UAE | Crown Excel',
        description:
          'Enterprise IT hardware supplier and wholesale distributor in Dubai & UAE. Servers, networking, laptops, and cyber security hardware.',
        image: 'https://www.crownexcel.ae/logo.png',
      },
      updatedAt: now,
    };

    await db.collection('cms_seo').updateOne(
      { path: routePath, websiteId },
      { $set: seoData, $setOnInsert: { createdAt: now } },
      { upsert: true }
    );
    console.log('Successfully upserted cms_seo data');

    // 3. Upsert cms_page_content with all 9 published sections
    const initialSections = [
      {
        sectionId: 'ithardwarehero',
        sectionName: 'Hero Banner',
        order: 1,
        fields: {
          badge_text: {
            type: 'text',
            value: 'OFFICIAL IT HARDWARE SUPPLIER & DISTRIBUTOR | DUBAI, UAE',
            originalValue: 'OFFICIAL IT HARDWARE SUPPLIER & DISTRIBUTOR | DUBAI, UAE',
            label: 'Badge Text',
          },
          heading: {
            type: 'text',
            value: 'IT Hardware Supplier &',
            originalValue: 'IT Hardware Supplier &',
            tag: 'h1',
            label: 'Heading (Part 1)',
          },
          heading_accent: {
            type: 'text',
            value: 'Wholesale Distributor',
            originalValue: 'Wholesale Distributor',
            label: 'Heading Accent',
          },
          heading_suffix: {
            type: 'text',
            value: 'in Dubai & the United Arab Emirates',
            originalValue: 'in Dubai & the United Arab Emirates',
            label: 'Heading Suffix',
          },
          paragraph: {
            type: 'richtext',
            value:
              'Crown Excel delivers authentic IT hardware distribution and bulk supply solutions for businesses, corporate enterprises, and IT resellers across Dubai and the UAE. We source directly from authorized channels to provide enterprise servers, networking switches, commercial laptops, storage arrays, and cyber security firewalls with official manufacturer warranty and dedicated B2B procurement support.',
            originalValue:
              'Crown Excel delivers authentic IT hardware distribution and bulk supply solutions for businesses, corporate enterprises, and IT resellers across Dubai and the UAE.',
            label: 'Hero Description',
          },
          button_1_text: {
            type: 'text',
            value: 'Request Wholesale Quotation',
            originalValue: 'Request Wholesale Quotation',
            label: 'Button 1 Text',
          },
          button_2_text: {
            type: 'text',
            value: 'Instant WhatsApp Inquiry',
            originalValue: 'Instant WhatsApp Inquiry',
            label: 'Button 2 Text',
          },
        },
      },
      {
        sectionId: 'ithardwareabout',
        sectionName: 'About Our IT Hardware Distribution',
        order: 2,
        fields: {
          eyebrow: {
            type: 'text',
            value: 'ABOUT OUR IT HARDWARE DISTRIBUTION',
            originalValue: 'ABOUT OUR IT HARDWARE DISTRIBUTION',
            label: 'Section Eyebrow',
          },
          heading: {
            type: 'text',
            value: 'Powering Technology Infrastructure Across Dubai, the UAE & GCC',
            originalValue: 'Powering Technology Infrastructure Across Dubai, the UAE & GCC',
            tag: 'h2',
            label: 'About Heading',
          },
          paragraph: {
            type: 'richtext',
            value:
              'Crown Excel General Trading LLC is an established technology hardware supplier and wholesale distributor headquartered in Dubai, UAE. Backed by more than 15 years of industry presence and relationships with authorized global technology distributors, we provide reliable, scalable, and authenticated IT equipment for enterprises, educational institutions, government bodies, and regional IT resellers.',
            originalValue:
              'Crown Excel General Trading LLC is an established technology hardware supplier and wholesale distributor headquartered in Dubai, UAE.',
            label: 'About Paragraph 1',
          },
          paragraph_2: {
            type: 'richtext',
            value:
              'Our Dubai warehousing and distribution operations maintain ready stock of rackmount servers, managed switches, enterprise storage, commercial laptops, and cyber security firewalls. Whether fulfilling bulk hardware orders for regional dealers or supporting scheduled corporate IT infrastructure rollouts, Crown Excel prioritizes authentic product delivery, competitive commercial terms, and prompt order turnaround.',
            originalValue:
              'Our Dubai warehousing and distribution operations maintain ready stock of rackmount servers, managed switches, enterprise storage, commercial laptops, and cyber security firewalls.',
            label: 'About Paragraph 2',
          },
        },
      },
      {
        sectionId: 'ithardwarecategories',
        sectionName: 'IT Hardware Categories',
        order: 3,
        fields: {
          eyebrow: {
            type: 'text',
            value: 'ENTERPRISE HARDWARE CATALOG',
            originalValue: 'ENTERPRISE HARDWARE CATALOG',
            label: 'Catalog Eyebrow',
          },
          heading: {
            type: 'text',
            value: 'Comprehensive IT Hardware Categories We Distribute',
            originalValue: 'Comprehensive IT Hardware Categories We Distribute',
            tag: 'h2',
            label: 'Catalog Heading',
          },
          paragraph: {
            type: 'richtext',
            value:
              'From enterprise server and storage infrastructure to corporate office computing, explore genuine hardware product lines sourced from authorized channels for businesses in Dubai and the UAE.',
            originalValue:
              'From enterprise server and storage infrastructure to corporate office computing, explore genuine hardware product lines sourced from authorized channels for businesses in Dubai and the UAE.',
            label: 'Catalog Description',
          },
        },
      },
      {
        sectionId: 'ithardwarebrands',
        sectionName: 'Brands We Deal In',
        order: 4,
        fields: {
          eyebrow: {
            type: 'text',
            value: 'GLOBAL TECHNOLOGY PARTNERS',
            originalValue: 'GLOBAL TECHNOLOGY PARTNERS',
            label: 'Brands Eyebrow',
          },
          heading: {
            type: 'text',
            value: 'World-Class Brands We Distribute',
            originalValue: 'World-Class Brands We Distribute',
            tag: 'h2',
            label: 'Brands Heading',
          },
          paragraph: {
            type: 'richtext',
            value:
              'Crown Excel maintains direct supply channels with the world’s foremost technology brands. All distributed equipment is 100% authentic, factory-sealed, serialized, and backed by comprehensive manufacturer warranty across the UAE and GCC.',
            originalValue:
              'Crown Excel maintains direct supply channels with the world’s foremost technology brands.',
            label: 'Brands Description',
          },
        },
      },
      {
        sectionId: 'ithardwarewholesale',
        sectionName: 'Wholesale IT Hardware Supply',
        order: 5,
        fields: {
          eyebrow: {
            type: 'text',
            value: 'HIGH-VOLUME B2B DISTRIBUTION',
            originalValue: 'HIGH-VOLUME B2B DISTRIBUTION',
            label: 'Wholesale Eyebrow',
          },
          heading: {
            type: 'text',
            value: 'Wholesale IT Hardware Supply for Resellers & Integrators',
            originalValue: 'Wholesale IT Hardware Supply for Resellers & Integrators',
            tag: 'h2',
            label: 'Wholesale Heading',
          },
          paragraph: {
            type: 'richtext',
            value:
              'Crown Excel operates wholesale technology distribution services in Dubai, supplying IT traders, system integrators, corporate buyers, and retail partners across the UAE, GCC, and regional export markets with authentic equipment.',
            originalValue:
              'Crown Excel operates wholesale technology distribution services in Dubai.',
            label: 'Wholesale Description',
          },
        },
      },
      {
        sectionId: 'ithardwarecorporate',
        sectionName: 'B2B & Corporate IT Solutions',
        order: 6,
        fields: {
          eyebrow: {
            type: 'text',
            value: 'ENTERPRISE HARDWARE PROCUREMENT',
            originalValue: 'ENTERPRISE HARDWARE PROCUREMENT',
            label: 'Corporate Eyebrow',
          },
          heading: {
            type: 'text',
            value: 'B2B & Corporate IT Solutions Tailored for Scalability',
            originalValue: 'B2B & Corporate IT Solutions Tailored for Scalability',
            tag: 'h2',
            label: 'Corporate Heading',
          },
          paragraph: {
            type: 'richtext',
            value:
              'Crown Excel delivers end-to-end hardware procurement and staging services for businesses in Dubai and the UAE. We support corporate IT departments with standardized fleet rollouts, server room installations, hardware lifecycle support, and dedicated B2B account management.',
            originalValue:
              'Crown Excel delivers end-to-end hardware procurement and staging services for businesses in Dubai and the UAE.',
            label: 'Corporate Description',
          },
        },
      },
      {
        sectionId: 'ithardwarewhowesupply',
        sectionName: 'Who We Supply',
        order: 7,
        fields: {
          eyebrow: {
            type: 'text',
            value: 'CLIENTELE & INDUSTRY VERTICALS',
            originalValue: 'CLIENTELE & INDUSTRY VERTICALS',
            label: 'Who We Supply Eyebrow',
          },
          heading: {
            type: 'text',
            value: 'Who We Supply Across Dubai, UAE & the Middle East',
            originalValue: 'Who We Supply Across Dubai, UAE & the Middle East',
            tag: 'h2',
            label: 'Who We Supply Heading',
          },
          paragraph: {
            type: 'richtext',
            value:
              'Crown Excel provides dedicated IT hardware procurement programs tailored to the compliance, durability, and performance requirements of diverse commercial, enterprise, and institutional sectors.',
            originalValue:
              'Crown Excel provides dedicated IT hardware procurement programs.',
            label: 'Who We Supply Description',
          },
        },
      },
      {
        sectionId: 'ithardwarewhychooseus',
        sectionName: 'Why Choose Crown Excel',
        order: 8,
        fields: {
          eyebrow: {
            type: 'text',
            value: 'THE CROWN EXCEL ADVANTAGE',
            originalValue: 'THE CROWN EXCEL ADVANTAGE',
            label: 'Why Choose Us Eyebrow',
          },
          heading: {
            type: 'text',
            value: 'Why Leading Businesses Choose Crown Excel as Their IT Hardware Partner',
            originalValue: 'Why Leading Businesses Choose Crown Excel as Their IT Hardware Partner',
            tag: 'h2',
            label: 'Why Choose Us Heading',
          },
          paragraph: {
            type: 'richtext',
            value:
              'For more than 15 years, Crown Excel has served as a reliable technology partner for enterprises, system integrators, and IT resellers across the UAE. Here is what defines our commitment to quality and service.',
            originalValue:
              'For more than 15 years, Crown Excel has served as a reliable technology partner for enterprises.',
            label: 'Why Choose Us Description',
          },
        },
      },
      {
        sectionId: 'ithardwarecta',
        sectionName: 'Final Inquiry CTA',
        order: 9,
        fields: {
          eyebrow: {
            type: 'text',
            value: 'GET IN TOUCH WITH OUR WHOLESALE DESK',
            originalValue: 'GET IN TOUCH WITH OUR WHOLESALE DESK',
            label: 'CTA Eyebrow',
          },
          heading: {
            type: 'text',
            value: 'Ready to Source Your IT Hardware with Crown Excel?',
            originalValue: 'Ready to Source Your IT Hardware with Crown Excel?',
            tag: 'h2',
            label: 'CTA Heading',
          },
          paragraph: {
            type: 'richtext',
            value:
              'Whether you require server infrastructure for a corporate deployment, commercial laptops for an enterprise fleet, or wholesale pricing for ongoing reseller bids, our Dubai distribution desk is ready to assist with rapid stock verification and formal price quotes.',
            originalValue:
              'Whether you require server infrastructure for a corporate deployment, commercial laptops for an enterprise fleet, or wholesale pricing for ongoing reseller bids.',
            label: 'CTA Description',
          },
          phone: {
            type: 'text',
            value: '+971 4-354 0566',
            originalValue: '+971 4-354 0566',
            label: 'Phone',
          },
          whatsapp_phone: {
            type: 'text',
            value: '+971 50 503 3860',
            originalValue: '+971 50 503 3860',
            label: 'WhatsApp Phone',
          },
          email: {
            type: 'text',
            value: 'contact@crownexcel.com',
            originalValue: 'contact@crownexcel.com',
            label: 'Email',
          },
          address: {
            type: 'text',
            value: 'Al Jahra Building, 2nd floor, 18th St - Al Raffa - Dubai, UAE',
            originalValue: 'Al Jahra Building, 2nd floor, 18th St - Al Raffa - Dubai, UAE',
            label: 'Office Address',
          },
          button_1_text: {
            type: 'text',
            value: 'Request a Custom Quotation',
            originalValue: 'Request a Custom Quotation',
            label: 'Button 1 Text',
          },
          button_2_text: {
            type: 'text',
            value: 'Chat on WhatsApp',
            originalValue: 'Chat on WhatsApp',
            label: 'Button 2 Text',
          },
        },
      },
    ];

    const contentDoc = {
      routeId: routeIdStr,
      path: routePath,
      websiteId,
      sections: initialSections,
      status: 'published',
      version: 2,
      publishedAt: now,
      updatedAt: now,
      createdAt: now,
    };

    await db.collection('cms_page_content').updateOne(
      { path: routePath, websiteId },
      { $set: contentDoc },
      { upsert: true }
    );
    console.log('Successfully upserted cms_page_content with 9 published sections');

    console.log('Registration complete! Verification:');
    const verifyRoute = await db.collection('cms_routes').findOne({ path: routePath });
    const verifySeo = await db.collection('cms_seo').findOne({ path: routePath });
    const verifyContent = await db.collection('cms_page_content').findOne({ path: routePath });

    console.log({
      routeFound: !!verifyRoute,
      routeId: verifyRoute?._id,
      seoFound: !!verifySeo,
      contentFound: !!verifyContent,
      sectionsCount: verifyContent?.sections?.length,
    });

  } catch (err) {
    console.error('Error during registration:', err);
  } finally {
    await client.close();
  }
}

run();
