import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { parsePageContent, updatePageFiles, cleanText } from '@/lib/cms-parser';
import path from 'path';
import fs from 'fs';
import { logActivity } from '@/lib/activity-logger';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS });
}

function getUserFromRequest(request) {
  const token = request.cookies.get("jwt")?.value;
  if (!token) return null;
  if (token === "demo-jwt-token") {
    return { role: "super_admin", roles: ["super_admin"] };
  }
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    return {
      ...decoded,
      roles: Array.isArray(decoded.roles) ? decoded.roles : (decoded.role ? [decoded.role] : [])
    };
  } catch (e) {
    return null;
  }
}

function canModifyContent(user) {
  if (!user) return false;
  const userRoles = Array.isArray(user.roles) && user.roles.length > 0
    ? user.roles
    : (user.role ? [user.role] : []);
  return userRoles.some(r => ['super_admin', 'admin', 'editor', 'client'].includes(r));
}

// Default section templates
const SECTION_TEMPLATES = {
  hero: {
    sectionName: 'Hero Section',
    fields: {
      heading: { type: 'text', value: '', tag: 'h1', label: 'Main Heading' },
      subheading: { type: 'text', value: '', tag: 'h2', label: 'Sub Heading' },
      paragraph: { type: 'richtext', value: '', label: 'Description' },
      buttonText: { type: 'text', value: '', label: 'Button Text' },
      buttonLink: { type: 'url', value: '', label: 'Button Link' },
      image: { type: 'image', value: '', alt: '', title: '', label: 'Hero Image' },
    },
  },
  about: {
    sectionName: 'About Section',
    fields: {
      heading: { type: 'text', value: '', tag: 'h2', label: 'Section Heading' },
      paragraph: { type: 'richtext', value: '', label: 'About Text' },
      image: { type: 'image', value: '', alt: '', title: '', label: 'About Image' },
    },
  },
  services: {
    sectionName: 'Services Section',
    fields: {
      heading: { type: 'text', value: '', tag: 'h2', label: 'Section Heading' },
      subheading: { type: 'text', value: '', tag: 'h3', label: 'Sub Heading' },
      paragraph: { type: 'richtext', value: '', label: 'Description' },
    },
  },
  faq: {
    sectionName: 'FAQ Section',
    fields: {
      heading: { type: 'text', value: '', tag: 'h2', label: 'Section Heading' },
      items: { type: 'json', value: '[]', label: 'FAQ Items (JSON array)' },
    },
  },
  contact: {
    sectionName: 'Contact Section',
    fields: {
      heading: { type: 'text', value: '', tag: 'h2', label: 'Section Heading' },
      paragraph: { type: 'richtext', value: '', label: 'Description' },
      email: { type: 'text', value: '', label: 'Email' },
      phone: { type: 'text', value: '', label: 'Phone' },
      address: { type: 'richtext', value: '', label: 'Address' },
    },
  },
  custom: {
    sectionName: 'Custom Section',
    fields: {
      heading: { type: 'text', value: '', tag: 'h2', label: 'Heading' },
      paragraph: { type: 'richtext', value: '', label: 'Content' },
      image: { type: 'image', value: '', alt: '', title: '', label: 'Image' },
      buttonText: { type: 'text', value: '', label: 'Button Text' },
      buttonLink: { type: 'url', value: '', label: 'Button Link' },
    },
  },
};

// GET /api/cms/content → Get content for a page
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const routeId = url.searchParams.get('routeId');
    const pathParam = url.searchParams.get('path');
    const websiteId = url.searchParams.get('websiteId') || 'default';
    const listAll = url.searchParams.get('all') === 'true';

    const db = await getDb();
    const collection = db.collection('cms_page_content');

    if (listAll) {
      const contents = await collection
        .find({ websiteId })
        .sort({ path: 1 })
        .toArray();

      // Also get routes
      const routes = await db.collection('cms_routes')
        .find({ websiteId, status: 'active' })
        .sort({ path: 1 })
        .toArray();

      const merged = routes.map(route => {
        const content = contents.find(c => c.routeId === route._id.toString());
        return {
          _id: route._id.toString(),
          path: route.path,
          type: route.type,
          hasContent: !!content,
          sectionsCount: content?.sections?.length || 0,
          status: content?.status || 'none',
          updatedAt: content?.updatedAt || null,
        };
      });

      return jsonResponse({ total: merged.length, pages: merged });
    }

    // Get single page content
    let filter = { websiteId };
    if (routeId) {
      const ids = [routeId];
      if (ObjectId.isValid(routeId)) {
        ids.push(new ObjectId(routeId));
      }
      filter.routeId = { $in: ids };
    } else if (pathParam) {
      filter.path = pathParam;
    } else {
      return jsonResponse({ error: 'routeId or path required' }, 400);
    }

    const content = await collection.findOne(filter);

    // Look up the route from the database to get its filePath
    let route = null;
    if (routeId && ObjectId.isValid(routeId)) {
      route = await db.collection('cms_routes').findOne({ _id: new ObjectId(routeId) });
    } else if (filter.path) {
      route = await db.collection('cms_routes').findOne({ path: filter.path, websiteId });
    }

    let parsedSections = [];
    if (route && route.filePath) {
      try {
        const absoluteFilePath = path.join(process.cwd(), route.filePath);
        parsedSections = parsePageContent(absoluteFilePath);
      } catch (parseErr) {
        console.error('Failed to parse page content dynamically:', parseErr);
      }
    }

    // Merge strategy: live client-side page JSX structure is the ground truth for section presence & order
    let mergedSections = [];
    if (parsedSections.length > 0) {
      const existingSections = (content && Array.isArray(content.sections)) ? content.sections : [];

      mergedSections = parsedSections.map((parsedSec, idx) => {
        const sec = { ...parsedSec, order: idx + 1 };
        const dbSec = existingSections.find(
          s => s.sectionId === parsedSec.sectionId || 
               s.sectionName?.toLowerCase() === parsedSec.sectionName?.toLowerCase() ||
               (parsedSec.sectionId === 'smartsolutions' && (s.sectionId === 'hero' || s.sectionName?.toLowerCase().includes('hero'))) ||
               ((parsedSec.sectionId === 'directormessage' || parsedSec.sectionId === 'main') && (s.sectionId === 'directormessage' || s.sectionId === 'main'))
        );

        if (dbSec && dbSec.fields) {
          if (dbSec.sectionName && !dbSec.sectionName.startsWith('Untitled')) {
            sec.sectionName = dbSec.sectionName;
          }

          const mergedFields = {};
          for (const [key, parsedField] of Object.entries(parsedSec.fields || {})) {
            let dbField = dbSec.fields[key];

            // Image matching fallback: if key not directly in dbSec.fields, find matching image field
            if (!dbField && parsedField.type === 'image') {
              const dbImgKey = Object.keys(dbSec.fields).find(k => 
                (k === 'image_banner' || k === 'image_smartsolutionsbanner' || k === 'image' || k.startsWith('image')) &&
                dbSec.fields[k]?.value
              );
              if (dbImgKey) {
                dbField = dbSec.fields[dbImgKey];
              }
            }

            if (dbField && dbField.value !== undefined && dbField.value !== null) {
              mergedFields[key] = {
                ...parsedField,
                value: dbField.value,
                originalValue: parsedField.originalValue,
                alt: dbField.alt || parsedField.alt || '',
                title: dbField.title || parsedField.title || '',
              };
            } else {
              mergedFields[key] = { ...parsedField };
            }
          }

          // Preserve any extra fields from dbSec (excluding unwanted artificial fields)
          for (const [dbKey, dbField] of Object.entries(dbSec.fields || {})) {
            if (['subheading', 'buttonText', 'buttonLink', 'button2Text', 'button2Link'].includes(dbKey)) {
              continue;
            }
            if (!mergedFields[dbKey] && dbField && dbField.value !== undefined) {
              mergedFields[dbKey] = { ...dbField };
            }
          }

          sec.fields = mergedFields;
        }

        // Special handling for Homepage Hero section (smartsolutions / hero)
        if (sec.sectionId === 'smartsolutions' || sec.sectionId === 'hero') {
          sec.sectionName = 'Hero Section (Smart Solutions)';

          // Deduplicate image keys in hero section so admin sees only one Hero Banner Image input
          if (sec.fields.image_smartsolutionsbanner && sec.fields.image_banner) {
            sec.fields.image_banner.value = sec.fields.image_smartsolutionsbanner.value || sec.fields.image_banner.value;
            sec.fields.image_banner.alt = sec.fields.image_smartsolutionsbanner.alt || sec.fields.image_banner.alt || '';
            delete sec.fields.image_smartsolutionsbanner;
          }

          // Find the image field and label it clearly
          const imgKey = Object.keys(sec.fields).find(k => k.startsWith('image'));
          if (imgKey) {
            sec.fields[imgKey].label = 'Hero Banner Image';
          }
        }

        // Special handling for Homepage Product Catalog (allproducts)
        if (sec.sectionId === 'allproducts') {
          sec.sectionName = 'Our Product Catalog (AllProducts)';

          const cleanedFields = {};
          const headingVal = dbSec?.fields?.heading?.value || dbSec?.fields?.heading_2?.value || sec.fields?.heading?.value || 'Our Product Catalog';
          cleanedFields.heading = {
            type: 'text',
            value: headingVal === 'All Products' ? 'Our Product Catalog' : headingVal,
            originalValue: 'Our Product Catalog',
            tag: 'h2',
            label: 'Catalog Section Heading'
          };

          // Ensure selected_products field is preserved and structured for the UI
          const dbSelection = dbSec?.fields?.selected_products?.value || dbSec?.fields?.selected_products;
          cleanedFields.selected_products = {
            type: 'product_catalog_selection',
            value: (dbSelection && typeof dbSelection === 'object') ? dbSelection : {},
            label: 'Homepage Featured Products'
          };

          sec.fields = cleanedFields;
        }

        // Professional Section Names & Comprehensive Fields for Laptops Page (/products/laptops)
        const getFld = (key, defaultVal, label, type = 'text') => {
          const dbVal = dbSec?.fields?.[key]?.value;
          const secVal = sec.fields?.[key]?.value;
          const val = (dbVal !== undefined && dbVal !== null && dbVal !== '')
            ? dbVal
            : ((secVal !== undefined && secVal !== null && secVal !== '') ? secVal : defaultVal);
          return {
            type,
            value: val,
            originalValue: defaultVal,
            label,
          };
        };

        if (sec.sectionId === 'laptopherosection') {
          sec.sectionName = 'Hero Section (Wholesale Laptops)';
          sec.fields = {
            heading: getFld('heading', 'Direct Wholesale & Bulk Laptops & Workstations', 'Hero Main Heading'),
            subheading: getFld('subheading', 'Looking for a reliable wholesale supplier of Laptops & Workstations', 'Hero Tagline / Subheading'),
            paragraph: getFld('paragraph', 'Crown Excel is among the leading wholesale suppliers of laptops in Dubai, UAE, providing 100% genuine products and the best after-sales support. We cover almost all major laptop brands, including Lenovo, HP, Dell, ASUS, Acer, and Apple, with competitive bulk pricing and extensive ready stock available in our Dubai warehouse.', 'Hero Description', 'richtext'),
            button_primary_text: getFld('button_primary_text', 'Request Wholesale Quote', 'Primary Button Label'),
            button_secondary_text: getFld('button_secondary_text', 'WhatsApp Instant Inquiries', 'Secondary Button (WhatsApp) Label')
          };
        } else if (sec.sectionId === 'laptopexperiencesection') {
          sec.sectionName = 'Experience & Market Expertise';
          const expImageFields = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) expImageFields[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) expImageFields[k] = { ...expImageFields[k], ...v };
          }
          sec.fields = {
            badge: getFld('badge', 'PROVEN TRACK RECORD IN WHOLESALE & ENTERPRISE COMPUTING', 'Section Top Badge'),
            heading: getFld('heading', 'Crown Excel’s Experience & Market Expertise in Laptops', 'Section Main Heading'),
            paragraph: getFld('paragraph', 'Over the past decade and a half, Crown Excel has solidified its reputation as Dubai’s premier laptop wholesale distributor. We bridge global PC manufacturers with regional resellers, corporations, educational institutions, and international export channels.', 'Experience Overview Description', 'richtext'),
            metric_1_val: getFld('metric_1_val', '15+', 'Metric 1 Number'),
            metric_1_label: getFld('metric_1_label', 'Years of Laptop Expertise', 'Metric 1 Label'),
            metric_1_desc: getFld('metric_1_desc', 'Pioneering IT hardware distribution across UAE & GCC since 2010.', 'Metric 1 Description'),
            metric_2_val: getFld('metric_2_val', '200M+', 'Metric 2 Number'),
            metric_2_label: getFld('metric_2_label', 'Orders Delivered', 'Metric 2 Label'),
            metric_2_desc: getFld('metric_2_desc', 'Trusted by corporations, government entities, and retail chains.', 'Metric 2 Description'),
            metric_3_val: getFld('metric_3_val', '1,200+', 'Metric 3 Number'),
            metric_3_label: getFld('metric_3_label', 'Active B2B & Reseller Clients', 'Metric 3 Label'),
            metric_3_desc: getFld('metric_3_desc', 'Consistent recurring partnerships backed by wholesale pricing.', 'Metric 3 Description'),
            metric_4_val: getFld('metric_4_val', '100%', 'Metric 4 Number'),
            metric_4_label: getFld('metric_4_label', 'Genuine Factory Stock', 'Metric 4 Label'),
            metric_4_desc: getFld('metric_4_desc', 'Authentic manufacturer warranties with verified serial tracking.', 'Metric 4 Description'),
            capability_1_title: getFld('capability_1_title', 'Global Sourcing & Priority Stock Allocations', 'Capability 1 Title'),
            capability_1_desc: getFld('capability_1_desc', 'Direct procurement lines with authorized international tier-1 distributors guarantee uninterrupted supply of high-demand gaming rigs, commercial notebooks, and mobile workstations.', 'Capability 1 Description', 'richtext'),
            capability_2_title: getFld('capability_2_title', 'Technical Consultation & Fleet Sizing', 'Capability 2 Title'),
            capability_2_desc: getFld('capability_2_desc', 'Our certified B2B laptop specialists guide enterprise procurement teams, ensuring optimal CPU, GPU, RAM, and thermal configurations tailored to corporate workloads and budget parameters.', 'Capability 2 Description', 'richtext'),
            capability_3_title: getFld('capability_3_title', 'Reseller Profitability & Protected Margins', 'Capability 3 Title'),
            capability_3_desc: getFld('capability_3_desc', 'We empower regional computer shops and e-commerce merchants with flexible MOQs, competitive tier discounts, and price drop buffers to sustain healthy retail margins.', 'Capability 3 Description', 'richtext'),
            capability_4_title: getFld('capability_4_title', 'Enterprise Security & Custom Deployment', 'Capability 4 Title'),
            capability_4_desc: getFld('capability_4_desc', 'From TPM 2.0 provisioning and Windows 11 Pro staging to BIOS lockups and bulk asset barcode labeling, we streamline seamless turnkey rollout for corporate IT teams.', 'Capability 4 Description', 'richtext'),
            brands_badge: getFld('brands_badge', 'AUTHORIZED HARDWARE SUPPLY', 'Brands Ribbon Badge'),
            heading_2: getFld('heading_2', 'Leading Laptop Brands Available in Volume', 'Brands Ribbon Heading'),
            paragraph_2: getFld('paragraph_2', 'Authentic original stock with manufacturer global warranties and full compliance certificates.', 'Brands Ribbon Description', 'richtext'),
            ...expImageFields
          };
        } else if (sec.sectionId === 'laptopcategoriessection') {
          sec.sectionName = 'Core Laptop Categories';
          sec.fields = {
            badge: getFld('badge', 'CORE COMPUTING CATEGORIES', 'Section Badge'),
            heading: getFld('heading', 'Comprehensive Laptop Categories for Resellers & Enterprises', 'Categories Section Heading'),
            paragraph: getFld('paragraph', 'Discover our core laptop categories structured for wholesale and enterprise requirements, from high-performance gaming to mission-critical mobile workstations.', 'Categories Description', 'richtext'),
            cat_1_title: getFld('cat_1_title', 'Gaming Laptops', 'Category 1 Title'),
            cat_1_tagline: getFld('cat_1_tagline', 'High Performance & Graphics', 'Category 1 Tagline'),
            cat_1_desc: getFld('cat_1_desc', 'Engineered for competitive gaming, 3D graphics rendering, and heavy multitasking with high-refresh displays and advanced cooling.', 'Category 1 Description', 'richtext'),
            cat_2_title: getFld('cat_2_title', 'Personal Laptops', 'Category 2 Title'),
            cat_2_tagline: getFld('cat_2_tagline', 'Portability & Everyday Tasks', 'Category 2 Tagline'),
            cat_2_desc: getFld('cat_2_desc', 'Sleek, lightweight notebooks crafted for everyday productivity, study, remote work, and all-day mobile battery endurance.', 'Category 2 Description', 'richtext'),
            cat_3_title: getFld('cat_3_title', 'Business Laptops', 'Category 3 Title'),
            cat_3_tagline: getFld('cat_3_tagline', 'Enterprise Security & Reliability', 'Category 3 Tagline'),
            cat_3_desc: getFld('cat_3_desc', 'Commercial workhorses built with hardware-level security, durable mil-spec construction, and business-grade operating systems.', 'Category 3 Description', 'richtext'),
            cat_4_title: getFld('cat_4_title', 'Workstations', 'Category 4 Title'),
            cat_4_tagline: getFld('cat_4_tagline', 'Heavy Computing & ISV Power', 'Category 4 Tagline'),
            cat_4_desc: getFld('cat_4_desc', 'Certified mobile workstations designed for architectural CAD, engineering simulations, data science, and demanding creative workflows.', 'Category 4 Description', 'richtext')
          };
        } else if (sec.sectionId === 'laptopproductsgridsection') {
          sec.sectionName = 'Available Laptop Models (Product Grid)';
          const gridImageFields = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) gridImageFields[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) gridImageFields[k] = { ...gridImageFields[k], ...v };
          }
          sec.fields = {
            badge: getFld('badge', 'READY WAREHOUSE STOCK IN DUBAI', 'Section Badge'),
            heading: getFld('heading', 'Factory-Sealed Laptop Inventory Available for Dispatch', 'Products Grid Heading'),
            paragraph: getFld('paragraph', 'Browse our current catalog of factory-sealed laptops available for immediate bulk dispatch across Dubai, the UAE, and GCC export hubs. Filter by series or search by SKU barcode.', 'Products Grid Description', 'richtext'),
            search_placeholder: getFld('search_placeholder', 'Search by model, SKU or CPU...', 'Search Input Placeholder'),
            moq_note: getFld('moq_note', 'MOQ: 5-10 units for wholesale pricing', 'MOQ Notice'),
            inquire_button_text: getFld('inquire_button_text', 'Inquire Now', 'Card Inquire Button Label'),
            empty_message: getFld('empty_message', 'No laptop models match your current filter or search query.', 'Empty Search Result Message'),
            reset_button_text: getFld('reset_button_text', 'Reset Filters', 'Reset Filters Button Label'),
            ...gridImageFields
          };
        } else if (sec.sectionId === 'laptopsolutionssection') {
          sec.sectionName = 'Wholesale, Retail & B2B Solutions';
          sec.fields = {
            badge: getFld('badge', 'TAILORED PURCHASING & COMMERCIAL SOLUTIONS', 'Section Badge'),
            heading: getFld('heading', 'Procurement Solutions for Every Commercial Scale', 'Solutions Section Heading'),
            paragraph: getFld('paragraph', 'Crown Excel structures tailored commercial terms, volume discount matrices, and operational workflows matching the exact purchasing requirements of your business tier.', 'Solutions Description', 'richtext'),
            segment_1_title: getFld('segment_1_title', 'Wholesale & Volume Traders', 'Segment 1 Title'),
            segment_1_badge: getFld('segment_1_badge', 'High Volume / Export', 'Segment 1 Badge'),
            segment_1_summary: getFld('segment_1_summary', 'Engineered for large-scale IT importers, cross-border traders, and GCC regional distributors requiring continuous pallet and container volumes.', 'Segment 1 Summary', 'richtext'),
            segment_1_feat_1: getFld('segment_1_feat_1', 'Aggressive tiered discounts on 20, 50, 100+ unit consignments', 'Segment 1 Feature 1'),
            segment_1_feat_2: getFld('segment_1_feat_2', 'Direct factory allocations from Lenovo, HP, Dell, ASUS & Acer', 'Segment 1 Feature 2'),
            segment_1_feat_3: getFld('segment_1_feat_3', 'Customs-ready export packing & airway/sea cargo manifests', 'Segment 1 Feature 3'),
            segment_1_feat_4: getFld('segment_1_feat_4', 'Bonded warehouse transit across JAFZA, DAFZA & Dubai Cargo Village', 'Segment 1 Feature 4'),
            segment_1_feat_5: getFld('segment_1_feat_5', 'Multi-currency invoicing with verified certificate of origin (COO)', 'Segment 1 Feature 5'),
            segment_1_audience: getFld('segment_1_audience', 'Regional distributors, national wholesalers, export-import companies in GCC, Africa & CIS.', 'Segment 1 Target Audience'),
            segment_2_title: getFld('segment_2_title', 'Retailers & Computer Resellers', 'Segment 2 Title'),
            segment_2_badge: getFld('segment_2_badge', 'High Margins / Fast Turnaround', 'Segment 2 Badge'),
            segment_2_summary: getFld('segment_2_summary', 'Designed to help brick-and-mortar computer shops, showroom owners, and e-commerce merchants maintain healthy profitability and fast stock turnover.', 'Segment 2 Summary', 'richtext'),
            segment_2_feat_1: getFld('segment_2_feat_1', 'Flexible Low MOQs (from 5–10 units per order)', 'Segment 2 Feature 1'),
            segment_2_feat_2: getFld('segment_2_feat_2', 'Immediate same-day pickup from Dubai central showroom/warehouse', 'Segment 2 Feature 2'),
            segment_2_feat_3: getFld('segment_2_feat_3', 'High-demand consumer & gaming laptops that sell fast', 'Segment 2 Feature 3'),
            segment_2_feat_4: getFld('segment_2_feat_4', 'Price drop buffer protections on recurring wholesale accounts', 'Segment 2 Feature 4'),
            segment_2_feat_5: getFld('segment_2_feat_5', 'Official brand promotional materials and digital collateral', 'Segment 2 Feature 5'),
            segment_2_audience: getFld('segment_2_audience', 'Computer retail shops, electronics showroom chains, online market merchants, IT boutique vendors.', 'Segment 2 Target Audience'),
            segment_3_title: getFld('segment_3_title', 'B2B Clients & Enterprise Procurement', 'Segment 3 Title'),
            segment_3_badge: getFld('segment_3_badge', 'Turnkey IT Fleet Deployment', 'Segment 3 Badge'),
            segment_3_summary: getFld('segment_3_summary', 'Comprehensive computing solutions for corporate offices, financial institutions, educational academies, and healthcare networks.', 'Segment 3 Summary', 'richtext'),
            segment_3_feat_1: getFld('segment_3_feat_1', 'Standardized multi-tier laptop fleets (Executive, Staff & Technical)', 'Segment 3 Feature 1'),
            segment_3_feat_2: getFld('segment_3_feat_2', 'Custom OS staging, BIOS configurations, and corporate asset tagging', 'Segment 3 Feature 2'),
            segment_3_feat_3: getFld('segment_3_feat_3', 'Flexible credit terms (PDC, LC, 30-day corporate facility upon approval)', 'Segment 3 Feature 3'),
            segment_3_feat_4: getFld('segment_3_feat_4', 'Consolidated multi-branch delivery across all 7 UAE Emirates', 'Segment 3 Feature 4'),
            segment_3_feat_5: getFld('segment_3_feat_5', 'Post-procurement warranty facilitation and optional AMC maintenance', 'Segment 3 Feature 5'),
            segment_3_audience: getFld('segment_3_audience', 'Enterprises, banks, universities, hospitals, call centers, and expanding UAE startups.', 'Segment 3 Target Audience'),
            cta_badge: getFld('cta_badge', 'FLEXIBLE PROCUREMENT ENGAGEMENTS', 'Corporate Plan CTA Badge'),
            heading_2: getFld('heading_2', 'Need a Custom Corporate IT Procurement Plan?', 'Corporate Plan CTA Heading'),
            paragraph_2: getFld('paragraph_2', 'Connect with our commercial sales desk to set up a credit application, review specialized batch quotations, or organize a customized pilot deployment for your company.', 'Corporate Plan CTA Description', 'richtext'),
            cta_button_text: getFld('cta_button_text', 'Consult with B2B Sales', 'Corporate Plan CTA Button Label')
          };
        } else if (sec.sectionId === 'laptopoperationssection') {
          sec.sectionName = 'Laptop Handling & Logistical Operations';
          sec.fields = {
            badge: getFld('badge', 'RELIABLE END-TO-END SUPPLY CHAIN EXECUTION', 'Section Badge'),
            heading: getFld('heading', 'Laptop Handling, Delivery & Support Expertise', 'Operations Section Heading'),
            paragraph: getFld('paragraph', 'Wholesale IT procurement demands precision, integrity, and swift logistical delivery. Here is how Crown Excel safeguards your orders from dock intake to customer handoff.', 'Operations Description', 'richtext'),
            pillar_1_badge: getFld('pillar_1_badge', 'Step 1: Verification', 'Pillar 1 Badge'),
            pillar_1_title: getFld('pillar_1_title', 'Laptop Handling & Quality Checks', 'Pillar 1 Title'),
            pillar_1_subtitle: getFld('pillar_1_subtitle', 'Zero Compromise on Factory Authenticity', 'Pillar 1 Subtitle'),
            pillar_1_pt_1_heading: getFld('pillar_1_pt_1_heading', 'Tamper-Evident Factory Seal Audit', 'Pillar 1 Point 1 Heading'),
            pillar_1_pt_1_detail: getFld('pillar_1_pt_1_detail', 'Every laptop master carton and individual packaging box is audited upon intake to guarantee untouched, 100% factory-sealed integrity.', 'Pillar 1 Point 1 Detail', 'richtext'),
            pillar_1_pt_2_heading: getFld('pillar_1_pt_2_heading', 'Serial Number & Barcode Serialization', 'Pillar 1 Point 2 Heading'),
            pillar_1_pt_2_detail: getFld('pillar_1_pt_2_detail', 'Every unit is scanned into our enterprise ERP with manufacturer serial tracking, preventing grey-market cross-contamination.', 'Pillar 1 Point 2 Detail', 'richtext'),
            pillar_1_pt_3_heading: getFld('pillar_1_pt_3_heading', 'ESD-Safe Climate-Controlled Storage', 'Pillar 1 Point 3 Heading'),
            pillar_1_pt_3_detail: getFld('pillar_1_pt_3_detail', 'Warehoused in humidity-regulated, anti-static facility in Dubai, protecting sensitive high-refresh screens and microprocessors.', 'Pillar 1 Point 3 Detail', 'richtext'),

            pillar_2_badge: getFld('pillar_2_badge', 'Step 2: Fulfillment', 'Pillar 2 Badge'),
            pillar_2_title: getFld('pillar_2_title', 'Order Processing & Express Delivery', 'Pillar 2 Title'),
            pillar_2_subtitle: getFld('pillar_2_subtitle', 'Fast Turnaround Across UAE & Regional Hubs', 'Pillar 2 Subtitle'),
            pillar_2_pt_1_heading: getFld('pillar_2_pt_1_heading', 'Same-Day Dispatch in Central UAE', 'Pillar 2 Point 1 Heading'),
            pillar_2_pt_1_detail: getFld('pillar_2_pt_1_detail', 'Orders confirmed before 1:00 PM are dispatched same-day via Crown Excel’s dedicated delivery fleet across Dubai, Sharjah & Ajman.', 'Pillar 2 Point 1 Detail', 'richtext'),
            pillar_2_pt_2_heading: getFld('pillar_2_pt_2_heading', 'Next-Day Delivery Across All Emirates', 'Pillar 2 Point 2 Heading'),
            pillar_2_pt_2_detail: getFld('pillar_2_pt_2_detail', 'Overnight ground fulfillment servicing Abu Dhabi, Al Ain, Ras Al Khaimah, Fujairah, and Umm Al Quwain.', 'Pillar 2 Point 2 Detail', 'richtext'),
            pillar_2_pt_3_heading: getFld('pillar_2_pt_3_heading', 'Cross-Border GCC & Cargo Logistical Links', 'Pillar 2 Point 3 Heading'),
            pillar_2_pt_3_detail: getFld('pillar_2_pt_3_detail', 'Daily road and air cargo shipments to Saudi Arabia, Oman, Qatar, Bahrain, Kuwait, Africa, and Central Asia with full customs clearance support.', 'Pillar 2 Point 3 Detail', 'richtext'),

            pillar_3_badge: getFld('pillar_3_badge', 'Step 3: Post-Sales', 'Pillar 3 Badge'),
            pillar_3_title: getFld('pillar_3_title', 'Customer Support & Warranty Assistance', 'Pillar 3 Title'),
            pillar_3_subtitle: getFld('pillar_3_subtitle', 'Dedicated Partnership Beyond the Sale', 'Pillar 3 Subtitle'),
            pillar_3_pt_1_heading: getFld('pillar_3_pt_1_heading', 'Direct Manufacturer Warranty Liaison', 'Pillar 3 Point 1 Heading'),
            pillar_3_pt_1_detail: getFld('pillar_3_pt_1_detail', 'We coordinate authorized brand warranty assistance for Lenovo, HP, Dell, ASUS, and Acer, eliminating administrative friction for clients.', 'Pillar 3 Point 1 Detail', 'richtext'),
            pillar_3_pt_2_heading: getFld('pillar_3_pt_2_heading', 'Dead-On-Arrival (DOA) Rapid Protocol', 'Pillar 3 Point 2 Heading'),
            pillar_3_pt_2_detail: getFld('pillar_3_pt_2_detail', 'Expedited replacement procedures for any verified defective hardware on initial unboxing to protect business continuity.', 'Pillar 3 Point 2 Detail', 'richtext'),
            pillar_3_pt_3_heading: getFld('pillar_3_pt_3_heading', 'Dedicated B2B Account Representatives', 'Pillar 3 Point 3 Heading'),
            pillar_3_pt_3_detail: getFld('pillar_3_pt_3_detail', 'Direct phone, email, and WhatsApp line with a named logistics executive for stock reservations, invoices, and tracking updates.', 'Pillar 3 Point 3 Detail', 'richtext')
          };
        } else if (sec.sectionId === 'laptopinquirysection') {
          sec.sectionName = 'Inquiry Banner & FAQs';
          sec.fields = {
            badge: getFld('badge', 'START YOUR WHOLESALE PARTNERSHIP TODAY', 'Inquiry Banner Badge'),
            heading: getFld('heading', 'Ready to Order or Request Wholesale Laptop Pricing?', 'Inquiry Banner Heading'),
            paragraph: getFld('paragraph', 'Contact our sales desk now to check real-time stock availability, request official quotation manifests, or discuss customized fleet configurations. We respond within 2 business hours.', 'Inquiry Banner Description', 'richtext'),
            button_submit_text: getFld('button_submit_text', 'Submit Inquiry Form', 'Inquiry Form Button Label'),
            button_whatsapp_text: getFld('button_whatsapp_text', 'Chat on WhatsApp', 'WhatsApp Button Label'),
            perk_1: getFld('perk_1', 'Quotes in 2 Hours', 'Response Perk 1'),
            perk_2: getFld('perk_2', 'Full VAT Invoices', 'Response Perk 2'),
            perk_3: getFld('perk_3', 'Bonded Export Ready', 'Response Perk 3'),
            faq_badge: getFld('faq_badge', 'GOT QUESTIONS?', 'FAQ Section Badge'),
            heading_2: getFld('heading_2', 'Frequently Asked Questions', 'FAQ Section Heading'),
            faq_1_q: getFld('faq_1_q', 'What is the Minimum Order Quantity (MOQ) for wholesale laptop pricing?', 'FAQ 1 Question'),
            faq_1_a: getFld('faq_1_a', 'Our standard wholesale pricing tier starts at 5 to 10 units for mixed commercial models. For volume pallet or container consignments (50 to 500+ units), we provide customized volume tier discounts tailored to your procurement schedule.', 'FAQ 1 Answer', 'richtext'),
            faq_2_q: getFld('faq_2_q', 'Are all laptops factory-sealed with authentic manufacturer warranties?', 'FAQ 2 Question'),
            faq_2_a: getFld('faq_2_a', 'Yes. 100% of our laptop inventory is brand-new, factory-sealed in original manufacturer packaging with valid brand warranty. We do not sell grey-market or unverified stock. Serial numbers are logged upon dock intake.', 'FAQ 2 Answer', 'richtext'),
            faq_3_q: getFld('faq_3_q', 'How fast can Crown Excel deliver laptops across Dubai and the UAE?', 'FAQ 3 Question'),
            faq_3_a: getFld('faq_3_a', 'Orders confirmed before 1:00 PM are dispatched same-day within Dubai, Sharjah, and Ajman. Deliveries to Abu Dhabi, Al Ain, Ras Al Khaimah, and Fujairah are completed next business day via our insured logistics fleet.', 'FAQ 3 Answer', 'richtext'),
            faq_4_q: getFld('faq_4_q', 'Do you support international export to Saudi Arabia and other GCC countries?', 'FAQ 4 Question'),
            faq_4_a: getFld('faq_4_a', 'Yes. We provide comprehensive export services including daily road and air cargo dispatch to Saudi Arabia (Riyadh, Jeddah, Dammam), Oman, Qatar, Bahrain, Kuwait, and African markets with complete customs documentation, COO, and export packing.', 'FAQ 4 Answer', 'richtext'),
            faq_5_q: getFld('faq_5_q', 'What payment terms are available for corporate and reseller accounts?', 'FAQ 5 Question'),
            faq_5_a: getFld('faq_5_a', 'We accept wire transfers (AED/USD), corporate cheques (PDC), company credit cards, and cash on delivery for established clients. Formal corporate credit facilities (30-day billing) are available for verified businesses subject to credit assessment.', 'FAQ 5 Answer', 'richtext')
          };
        } else if (sec.sectionId === 'directormessage' || sec.sectionId === 'main') {
          sec.sectionName = "Director's Message";
          sec.fields = {
            heading: getFld('heading', "Director's Message", "Main Page Heading (h1)", 'text'),
            image_director: {
              type: 'image',
              value: dbSec?.fields?.image_director?.value || dbSec?.fields?.image?.value || "@/Components/Images/director.png",
              originalValue: "@/Components/Images/director.png",
              varName: 'director',
              isImport: true,
              label: "Director's Photo"
            },
            paragraph: getFld('paragraph', "Together, let’s embrace technology and build a better tomorrow.", "Subheading / Quote", 'richtext'),
            paragraph_2: getFld('paragraph_2', "At Crown Excel General Trading LLC, our journey has always been guided by innovation, integrity, and an unwavering commitment to excellence. From our humble beginnings in 2009, in one of the world’s most vibrant and adaptable modern hubs, we embarked on our mission. Today, after two decades, we have grown into a trusted name in the market, it was never been easy or not by chance, but through a clear vision and relentless dedication to delivering value to our customers and partners and I believe if we do our best, we will surely get success by the grace of Allah.", "Story & Mission (Paragraph 1)", 'richtext'),
            paragraph_3: getFld('paragraph_3', "I still remember the early days when we started with just a few products and limited experience. By the grace of the Almighty, today we proudly offer a wide range of products and services to meet the diverse needs of our customers and clients. Our mission goes far beyond products; we strive to build lasting relationships, provide tailored IT and business solutions, and contribute to the sustainable growth of the communities we serve. In today’s fast-paced and ever-changing world, adaptability is our strength, and customer satisfaction is our ultimate reward.", "Company Growth & Purpose (Paragraph 2)", 'richtext'),
            paragraph_4: getFld('paragraph_4', "I believe in empowering our team, fostering a culture of trust, and embracing emerging technologies to stay ahead. As we look to the future, we will continue to expand our horizons, explore new markets, and enhance our services to meet the evolving needs of our clients.", "Team & Future Vision (Paragraph 3)", 'richtext'),
            paragraph_5: getFld('paragraph_5', "Together, with the dedication of our people and the trust of our partners, we will not just keep pace with change — we will lead it.", "Closing Statement (Paragraph 4)", 'richtext'),
            paragraph_6: getFld('paragraph_6', "Muhammad Qais", "Managing Director Name", 'text'),
            paragraph_7: getFld('paragraph_7', "Managing Director & CEO", "Executive Designation", 'text'),
            paragraph_8: getFld('paragraph_8', "Crown Excel General Trading LLC", "Company Name", 'text'),
          };
        } else if (sec.sectionId === 'desktopbanner') {
          sec.sectionName = 'Hero Banner (Desktop Banner)';
          const bannerImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = { ...bannerImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'DISCOVER TOP', 'Banner Top Line'),
            heading_2: getFld('heading_2', 'DESKTOP BRANDS', 'Banner Highlighted Line'),
            heading_3: getFld('heading_3', 'FOR EVERY NEED', 'Banner Bottom Line'),
            paragraph: getFld('paragraph', 'From an array of high-quality products, Crown Excel presents you with the best desktop PCs and their accessories from world-class manufacturers like Dell, HP, Lenovo, and many more.', 'Banner Description', 'richtext'),
            ...bannerImgs,
          };
          if (sec.fields.image_desktopimage1) sec.fields.image_desktopimage1.label = 'Left Desktop PC Image';
          if (sec.fields.image_desktopimage2) sec.fields.image_desktopimage2.label = 'Right Desktop PC Image';
          if (sec.fields.image_stars) sec.fields.image_stars.label = 'Decorative Stars Graphic';
        } else if (sec.sectionId === 'desktopbestselling') {
          sec.sectionName = 'Latest Products Carousel';
          const bestImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) bestImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) bestImgs[k] = { ...bestImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'Our Latest Product', 'Section Heading'),
            card_1_title: getFld('card_1_title', 'Dell Alienware', 'Product 1 Title'),
            card_1_desc: getFld('card_1_desc', 'The Dell Alienware Aurora R15 Gaming Desktop is the ultimate choice for any gaming enthusiast.', 'Product 1 Description', 'richtext'),
            card_2_title: getFld('card_2_title', 'Asus Expert', 'Product 2 Title'),
            card_2_desc: getFld('card_2_desc', 'ASUS EXPERT CENTER D700 SC best for business use with optimized speed.', 'Product 2 Description', 'richtext'),
            ...bestImgs,
          };
          if (sec.fields.image_desktopbestproduct1) sec.fields.image_desktopbestproduct1.label = 'Product 1 Image (Dell Alienware)';
          if (sec.fields.image_desktopbestproduct2) sec.fields.image_desktopbestproduct2.label = 'Product 2 Image (Asus Expert)';
          if (sec.fields.image_buttonbackground) sec.fields.image_buttonbackground.label = 'Carousel Button Background Graphic';
        } else if (sec.sectionId === 'unleasepowerdesktop') {
          sec.sectionName = 'Performance Solutions Banner';
          const unleaseImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) unleaseImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) unleaseImgs[k] = { ...unleaseImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'UNLEASH POWER AND PERFORMANCE IN ONE DESKTOP SOLUTIONS', 'Top Banner Heading'),
            heading_2: getFld('heading_2', 'GET MORE WITH EFFICIENT DESKTOP SOLUTIONS', 'Main Feature Heading'),
            paragraph: getFld('paragraph', 'All these from powerful workstations for your business to perfect gaming PCs and affordable desktops for everyday use, Crown Excel has the right product to suit your needs. Other than desktop computers,', 'Feature Description', 'richtext'),
            ...unleaseImgs,
          };
          if (sec.fields.image_computers) sec.fields.image_computers.label = 'Desktop Computer Showcase Image';
          if (sec.fields.image_backgroundimage) sec.fields.image_backgroundimage.label = 'Background Graphic';
        } else if (sec.sectionId === 'highperformance') {
          sec.sectionName = 'Creative Professionals Desktop';
          const hpImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) hpImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) hpImgs[k] = { ...hpImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'HIGH-PERFORMANCE DESKTOP FOR CREATIVE PROFESSIONAL', 'Section Heading'),
            paragraph: getFld('paragraph', 'we also offer an assortment of computer accessories designed to enhance your configuration, for example, monitors, keyboards, mice, etc.', 'Section Description', 'richtext'),
            ...hpImgs,
          };
          if (sec.fields.image_highperformanceimage) sec.fields.image_highperformanceimage.label = 'High Performance Desktop Image';
          if (sec.fields.image_comma) sec.fields.image_comma.label = 'Decorative Quote/Comma Graphic';
        } else if (sec.sectionId === 'heavycomputing') {
          sec.sectionName = 'Heavy Computing Solutions';
          const hcImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) hcImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) hcImgs[k] = { ...hcImgs[k], ...v };
          }
          const getHcTitle = (key, fallbackKey, def, lbl) => {
            const dbVal = dbSec?.fields?.[key]?.value || dbSec?.fields?.[fallbackKey]?.value;
            const secVal = sec.fields?.[key]?.value || sec.fields?.[fallbackKey]?.value;
            const val = (dbVal !== undefined && dbVal !== null && dbVal !== '') ? dbVal : ((secVal !== undefined && secVal !== null && secVal !== '') ? secVal : def);
            return { type: 'text', value: val, originalValue: def, label: lbl };
          };
          const getHcDesc = (key, fallbackKey, def, lbl) => {
            const dbVal = dbSec?.fields?.[key]?.value || dbSec?.fields?.[fallbackKey]?.value;
            const secVal = sec.fields?.[key]?.value || sec.fields?.[fallbackKey]?.value;
            const val = (dbVal !== undefined && dbVal !== null && dbVal !== '') ? dbVal : ((secVal !== undefined && secVal !== null && secVal !== '') ? secVal : def);
            return { type: 'richtext', value: val, originalValue: def, label: lbl };
          };
          sec.fields = {
            heading: getFld('heading', 'THE ULTIMATE SOLUTION FOR HEAVY COMPUTING', 'Main Section Heading'),
            card_1_title: getHcTitle('card_1_title', 'heading_2', 'Exceptional Processing Power', 'Card 1 Title'),
            card_1_desc: getHcDesc('card_1_desc', 'paragraph', 'Unleash unparalleled speed with cutting-edge processors built for multitasking and high-performance tasks. Designed to handle demanding applications with efficiency and reliability.', 'Card 1 Description'),
            card_2_title: getHcTitle('card_2_title', 'heading_3', 'Advanced Graphics Capabilities', 'Card 2 Title'),
            card_2_desc: getHcDesc('card_2_desc', 'paragraph_2', 'Experience stunning visuals and superior rendering with state-of-the-art graphics technology. Ideal for gamers, creators, and professionals seeking immersive and detailed displays.', 'Card 2 Description'),
            card_3_title: getHcTitle('card_3_title', 'heading_4', 'Ample RAM and Storage', 'Card 3 Title'),
            card_3_desc: getHcDesc('card_3_desc', 'paragraph_3', 'Seamlessly multitask and store more with high-capacity drives and ample RAM. Optimized for speed, ensuring smooth and efficient performance for all tasks.', 'Card 3 Description'),
            card_4_title: getHcTitle('card_4_title', 'heading_5', 'Customizable and Scalable', 'Card 4 Title'),
            card_4_desc: getHcDesc('card_4_desc', 'paragraph_4', 'Build your perfect system with customizable and upgradeable options. Future-proof your investment with scalable features tailored to your needs.', 'Card 4 Description'),
            ...hcImgs,
          };
          if (sec.fields.image_computingimage) sec.fields.image_computingimage.label = 'Computing Center Showcase Graphic';
        } else if (sec.sectionId === 'allinonedesktops') {
          sec.sectionName = 'All-in-One Desktops';
          const aioImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) aioImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) aioImgs[k] = { ...aioImgs[k], ...v };
          }
          const getAioVal = (key, fallbackKey, def, lbl, type = 'text') => {
            const dbVal = dbSec?.fields?.[key]?.value || dbSec?.fields?.[fallbackKey]?.value;
            const secVal = sec.fields?.[key]?.value || sec.fields?.[fallbackKey]?.value;
            const val = (dbVal !== undefined && dbVal !== null && dbVal !== '') ? dbVal : ((secVal !== undefined && secVal !== null && secVal !== '') ? secVal : def);
            return { type, value: val, originalValue: def, label: lbl };
          };
          sec.fields = {
            heading: getFld('heading', 'The Best All-in-one Desktops For Space-Saving Power', 'Section Main Heading'),
            subheading_1: getAioVal('subheading_1', 'heading_2', 'For Businesses:', 'Business Group Subheading'),
            button_1_text: getFld('button_1_text', 'Visit Our Store', 'Business Group Button Label'),
            card_1_title: getFld('card_1_title', 'ASUS EXPERT CENTER D700 SC', 'Business Model 1 Title'),
            card_1_desc: getFld('card_1_desc', 'ASUS EXPERT CENTER D700 SC best for business use with optimized speed.', 'Business Model 1 Description', 'richtext'),
            card_2_title: getFld('card_2_title', 'Lenovo M70q G4 Tiny', 'Business Model 2 Title'),
            card_2_desc: getFld('card_2_desc', 'The Lenovo M70q G4 Tiny is a compact yet powerful desktop computer designed for optimal performance and space-saving efficiency.', 'Business Model 2 Description', 'richtext'),
            card_3_title: getFld('card_3_title', 'Acer Veriton VS', 'Business Model 3 Title'),
            card_3_desc: getFld('card_3_desc', 'The Acer Veriton VS2690G Desktop Tower is the perfect choice for anyone in need of a reliable and efficient computer.', 'Business Model 3 Description', 'richtext'),
            subheading_2: getAioVal('subheading_2', 'heading_3', 'For Individuals:', 'Individuals Group Subheading'),
            button_2_text: getFld('button_2_text', 'Visit Our Store', 'Individuals Group Button Label'),
            card_4_title: getFld('card_4_title', 'DELL OPTIPLEX 3000', 'Individual Model 1 Title'),
            card_4_desc: getFld('card_4_desc', 'Introducing the Dell OptiPlex 3000 MT (DTDELLOPT3000I54256GBD), a dependable desktop solution.', 'Individual Model 1 Description', 'richtext'),
            card_5_title: getFld('card_5_title', 'HP 290 G3 Small', 'Individual Model 2 Title'),
            card_5_desc: getFld('card_5_desc', 'Introducing the HP 290 G3 Small Form Factor PC Bundle, the perfect choice for all your computing needs.', 'Individual Model 2 Description', 'richtext'),
            card_6_title: getFld('card_6_title', 'Dell Alienware Aurora', 'Individual Model 3 Title'),
            card_6_desc: getFld('card_6_desc', 'The Dell Alienware Aurora R15 Gaming Desktop is the ultimate choice for any gaming enthusiast.', 'Individual Model 3 Description', 'richtext'),
            ...aioImgs,
          };
          if (sec.fields.image_allinone1) sec.fields.image_allinone1.label = 'Business Model 1 Image (ASUS Expert Center)';
          if (sec.fields.image_allinone2) sec.fields.image_allinone2.label = 'Business Model 2 Image (Lenovo M70q Tiny)';
          if (sec.fields.image_allinone3) sec.fields.image_allinone3.label = 'Business Model 3 Image (Acer Veriton VS)';
          if (sec.fields.image_allinone4) sec.fields.image_allinone4.label = 'Individual Model 1 Image (Dell OptiPlex 3000)';
          if (sec.fields.image_allinone5) sec.fields.image_allinone5.label = 'Individual Model 2 Image (HP 290 G3 Small)';
          if (sec.fields.image_allinone6) sec.fields.image_allinone6.label = 'Individual Model 3 Image (Dell Alienware Aurora)';
        } else if (sec.sectionId === 'whybuyfromus') {
          sec.sectionName = 'Why Buy Desktops From Us';
          const wImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) wImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) wImgs[k] = { ...wImgs[k], ...v };
          }
          const getWTitle = (key, fallbackKey, def, lbl) => {
            const dbVal = dbSec?.fields?.[key]?.value || dbSec?.fields?.[fallbackKey]?.value;
            const secVal = sec.fields?.[key]?.value || sec.fields?.[fallbackKey]?.value;
            const val = (dbVal !== undefined && dbVal !== null && dbVal !== '') ? dbVal : ((secVal !== undefined && secVal !== null && secVal !== '') ? secVal : def);
            return { type: 'text', value: val, originalValue: def, label: lbl };
          };
          const getWDesc = (key, fallbackKey, def, lbl) => {
            const dbVal = dbSec?.fields?.[key]?.value || dbSec?.fields?.[fallbackKey]?.value;
            const secVal = sec.fields?.[key]?.value || sec.fields?.[fallbackKey]?.value;
            const val = (dbVal !== undefined && dbVal !== null && dbVal !== '') ? dbVal : ((secVal !== undefined && secVal !== null && secVal !== '') ? secVal : def);
            return { type: 'richtext', value: val, originalValue: def, label: lbl };
          };
          sec.fields = {
            heading: getFld('heading', 'Why Buy Desktops From Us?', 'Section Main Heading'),
            paragraph: getFld('paragraph', 'Our desktop PCs are built to provide good performance for work, gaming, or personal purposes. Here’s why Crown Excel is your best bet for desktops:', 'Section Main Description', 'richtext'),
            feature_1_title: getWTitle('feature_1_title', 'heading_2', 'Top Brands', 'Feature 1 Title'),
            feature_1_desc: getWDesc('feature_1_desc', 'paragraph_2', 'We provide desktop PCs from leading manufacturers like Dell, HP, Lenovo, and many others, promising peak quality and dependability.', 'Feature 1 Description'),
            feature_2_title: getWTitle('feature_2_title', 'heading_3', 'Latest Technology', 'Feature 2 Title'),
            feature_2_desc: getWDesc('feature_2_desc', 'paragraph_3', 'Desktops have incorporated the latest in processors, high-capacity storage, and top-of-the-line graphics cards to ensure superb performance to clients.', 'Feature 2 Description'),
            feature_3_title: getWTitle('feature_3_title', 'heading_4', 'Customization & Upgrades', 'Feature 3 Title'),
            feature_3_desc: getWDesc('feature_3_desc', 'paragraph_4', 'Need specific configurations? We can provide customization services so that the desktop PC is tailored specifically to your needs-whether business or game-related.', 'Feature 3 Description'),
            feature_4_title: getWTitle('feature_4_title', 'heading_5', 'Warranty & After-Sales Support', 'Feature 4 Title'),
            feature_4_desc: getWDesc('feature_4_desc', 'paragraph_5', 'All our products carry warranties and offer technical support, which keeps your system up and running.', 'Feature 4 Description'),
            ...wImgs,
          };
          if (sec.fields.image_yellobckground) sec.fields.image_yellobckground.label = 'Left Graphic Banner (Yellow Background)';
        } else if (sec.sectionId === 'desktopbrands') {
          sec.sectionName = 'Desktop Brands We Deal';
          const brandImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) brandImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) brandImgs[k] = { ...brandImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'BRANDS WE DEAL', 'Section Heading'),
            ...brandImgs,
          };
          if (sec.fields.image_lenovo) sec.fields.image_lenovo.label = 'Lenovo Brand Logo';
          if (sec.fields.image_hp) sec.fields.image_hp.label = 'HP Brand Logo';
          if (sec.fields.image_accer) sec.fields.image_accer.label = 'Acer Brand Logo';
          if (sec.fields.image_asus) sec.fields.image_asus.label = 'ASUS Brand Logo';
          if (sec.fields.image_dell) sec.fields.image_dell.label = 'Dell Brand Logo';
          if (sec.fields.image_background) sec.fields.image_background.label = 'Background Texture Graphic';
          if (sec.fields.image_eclipse) sec.fields.image_eclipse.label = 'Eclipse Accent Graphic';
        } else if (sec.sectionId === 'manageditbanner') {
          sec.sectionName = 'Hero Banner (Managed IT Infrastructure)';
          const bannerImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = { ...bannerImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'IT Infrastructure & Managed Services', 'Banner Main Heading'),
            paragraph: getFld('paragraph', 'Our managed IT services offer 24/7 monitoring, proactive maintenance, patching and performance tuning to keep your systems secure and available, helping reduce downtime and operational risk.', 'Banner Description', 'richtext'),
            ...bannerImgs,
          };
          if (sec.fields.image_bannerimage) sec.fields.image_bannerimage.label = 'Hero Banner Background Image';
          if (sec.fields.image_icon2) sec.fields.image_icon2.label = 'Banner Floating Icon';
        } else if (sec.sectionId === 'manageditsmart') {
          sec.sectionName = 'Infrastructure Core, Services & Partners';
          const smartImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) smartImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) smartImgs[k] = { ...smartImgs[k], ...v };
          }
          sec.fields = {
            // Hero Subsection
            heading: getFld('heading', 'IT.', 'Hero Accent Title (Top)'),
            heading_2: getFld('heading_2', 'Infrastructure', 'Hero Main Title'),
            paragraph: getFld('paragraph', 'Excellence Redefined', 'Hero Subtitle'),
            paragraph_2: getFld('paragraph_2', 'Revolutionary IT infrastructure management combining cutting-edge technology, enterprise security, and 24/7 operational excellence for unstoppable business growth.', 'Hero Description Card', 'richtext'),
            button_1_text: getFld('button_1_text', 'Transform My Infrastructure', 'Primary CTA Button Label'),
            button_1_link: getFld('button_1_link', '/contact-us', 'Primary CTA Button Link', 'url'),
            button_2_text: getFld('button_2_text', 'Watch Demo', 'Secondary Button Label'),

            // Core Infrastructure Subsection
            heading_3: getFld('heading_3', 'CORE INFRASTRUCTURE', 'Core Infrastructure Heading'),
            paragraph_3: getFld('paragraph_3', 'Six pillars of excellence forming the foundation of modern enterprise infrastructure', 'Core Infrastructure Subtitle', 'richtext'),

            // 6 Pillars
            pillar_1_title: getFld('pillar_1_title', 'Server Infrastructure', 'Pillar 1 Title'),
            pillar_1_desc: getFld('pillar_1_desc', 'Enterprise-grade server solutions with high availability, load balancing, and redundancy for mission-critical applications.', 'Pillar 1 Description', 'richtext'),
            pillar_1_metric: getFld('pillar_1_metric', '99.9%', 'Pillar 1 Metric Value'),
            pillar_1_metric_label: getFld('pillar_1_metric_label', 'Uptime', 'Pillar 1 Metric Label'),

            pillar_2_title: getFld('pillar_2_title', 'Network Infrastructure', 'Pillar 2 Title'),
            pillar_2_desc: getFld('pillar_2_desc', 'Robust network architecture design with advanced security, optimal performance, and seamless connectivity across all locations.', 'Pillar 2 Description', 'richtext'),
            pillar_2_metric: getFld('pillar_2_metric', '24/7', 'Pillar 2 Metric Value'),
            pillar_2_metric_label: getFld('pillar_2_metric_label', 'Monitoring', 'Pillar 2 Metric Label'),

            pillar_3_title: getFld('pillar_3_title', 'Storage Solutions', 'Pillar 3 Title'),
            pillar_3_desc: getFld('pillar_3_desc', 'Scalable storage systems with automated backup, disaster recovery, and data protection for business continuity.', 'Pillar 3 Description', 'richtext'),
            pillar_3_metric: getFld('pillar_3_metric', '100%', 'Pillar 3 Metric Value'),
            pillar_3_metric_label: getFld('pillar_3_metric_label', 'Data Security', 'Pillar 3 Metric Label'),

            pillar_4_title: getFld('pillar_4_title', 'Virtualization', 'Pillar 4 Title'),
            pillar_4_desc: getFld('pillar_4_desc', 'Complete virtualization solutions to maximize resource utilization, reduce costs, and improve system flexibility.', 'Pillar 4 Description', 'richtext'),
            pillar_4_metric: getFld('pillar_4_metric', '60%', 'Pillar 4 Metric Value'),
            pillar_4_metric_label: getFld('pillar_4_metric_label', 'Cost Savings', 'Pillar 4 Metric Label'),

            pillar_5_title: getFld('pillar_5_title', 'Security Infrastructure', 'Pillar 5 Title'),
            pillar_5_desc: getFld('pillar_5_desc', 'Multi-layered security framework protecting your IT assets from cyber threats and ensuring compliance.', 'Pillar 5 Description', 'richtext'),
            pillar_5_metric: getFld('pillar_5_metric', 'Zero', 'Pillar 5 Metric Value'),
            pillar_5_metric_label: getFld('pillar_5_metric_label', 'Breaches', 'Pillar 5 Metric Label'),

            pillar_6_title: getFld('pillar_6_title', 'Monitoring & Management', 'Pillar 6 Title'),
            pillar_6_desc: getFld('pillar_6_desc', '24/7 proactive monitoring with real-time alerts, performance optimization, and automated maintenance.', 'Pillar 6 Description', 'richtext'),
            pillar_6_metric: getFld('pillar_6_metric', '15min', 'Pillar 6 Metric Value'),
            pillar_6_metric_label: getFld('pillar_6_metric_label', 'Response Time', 'Pillar 6 Metric Label'),

            // Management Cycle Subsection
            heading_4: getFld('heading_4', 'MANAGEMENT CYCLE', 'Management Cycle Heading'),
            cycle_center_1: getFld('cycle_center_1', 'IT', 'Cycle Center Top Word'),
            cycle_center_2: getFld('cycle_center_2', 'EXCELLENCE', 'Cycle Center Bottom Word'),
            phase_1_name: getFld('phase_1_name', 'ACCESS', 'Phase 1 Name'),
            phase_1_title: getFld('phase_1_title', 'Infrastructure Analysis', 'Phase 1 Title'),
            phase_2_name: getFld('phase_2_name', 'PLAN', 'Phase 2 Name'),
            phase_2_title: getFld('phase_2_title', 'Strategic Roadmap', 'Phase 2 Title'),
            phase_3_name: getFld('phase_3_name', 'DEPLOY', 'Phase 3 Name'),
            phase_3_title: getFld('phase_3_title', 'Implementation', 'Phase 3 Title'),
            phase_4_name: getFld('phase_4_name', 'MANAGE', 'Phase 4 Name'),
            phase_4_title: getFld('phase_4_title', 'Ongoing Support', 'Phase 4 Title'),

            // Split CTA Subsection
            heading_5: getFld('heading_5', 'Ready to Transform?', 'Transform CTA Heading'),
            paragraph_4: getFld('paragraph_4', 'Join the infrastructure revolution with enterprise-grade solutions that scale with your ambitions.', 'Transform CTA Description', 'richtext'),
            cta_1_button_text: getFld('cta_1_button_text', 'Start Revolution', 'Transform CTA Button Label'),
            cta_1_button_link: getFld('cta_1_button_link', '/contact-us', 'Transform CTA Button Link', 'url'),

            heading_6: getFld('heading_6', 'Need Consultation?', 'Consultation CTA Heading'),
            paragraph_5: getFld('paragraph_5', 'Expert guidance for complex infrastructure challenges and strategic technology decisions.', 'Consultation CTA Description', 'richtext'),
            cta_2_button_text: getFld('cta_2_button_text', 'Book Consultation', 'Consultation CTA Button Label'),
            cta_2_button_link: getFld('cta_2_button_link', '/our-services', 'Consultation CTA Button Link', 'url'),

            // Technology Partners Subsection
            heading_7: getFld('heading_7', 'Technology Partners', 'Technology Partners Heading'),
            paragraph_6: getFld('paragraph_6', 'We work with industry-leading technology partners to deliver best-in-class solutions', 'Technology Partners Subtitle', 'richtext'),

            // Partner & feature images
            ...smartImgs,
          };
          if (sec.fields.image_networkingsmartimage) sec.fields.image_networkingsmartimage.label = 'Hero Feature Image (Networking Smart)';
          if (sec.fields.image_signaltower) sec.fields.image_signaltower.label = 'Hero Signal Tower Icon';
          if (sec.fields.image_server) sec.fields.image_server.label = 'Pillar 1 Image (Server)';
          if (sec.fields.image_network) sec.fields.image_network.label = 'Pillar 2 Image (Network)';
          if (sec.fields.image_storage) sec.fields.image_storage.label = 'Pillar 3 Image (Storage)';
          if (sec.fields.image_virtualization) sec.fields.image_virtualization.label = 'Pillar 4 Image (Virtualization)';
          if (sec.fields.image_security) sec.fields.image_security.label = 'Pillar 5 Image (Security)';
          if (sec.fields.image_monitoring) sec.fields.image_monitoring.label = 'Pillar 6 Image (Monitoring)';
        } else if (sec.sectionId === 'hardwareamcbanner') {
          sec.sectionName = 'Hero Banner (Hardware AMC)';
          const bannerImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = { ...bannerImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'Hardware', 'Banner Main Heading'),
            paragraph: getFld('paragraph', 'We offer both short-term and long-term AMC (Annual Maintenance Contract) plans — short-term contracts for immediate, limited-period support, and long-term plans for continued proactive maintenance, priority response, and minimized downtime.', 'Banner Description', 'richtext'),
            ...bannerImgs,
          };
          if (sec.fields.image_bannerimage) sec.fields.image_bannerimage.label = 'Hero Banner Background Image';
          if (sec.fields.image_icon2) sec.fields.image_icon2.label = 'Banner Floating Icon';
          if (sec.fields.image_icon1) sec.fields.image_icon1.label = 'Banner Accent Icon';
        } else if (sec.sectionId === 'hardwareempowering') {
          sec.sectionName = 'Business AMC Plans & Services';
          const empImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) empImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) empImgs[k] = { ...empImgs[k], ...v };
          }
          sec.fields = {
            // Hero Subsection
            badge: getFld('badge', 'BUSINESS MANAGEMENT SERVICES', 'Hero Badge'),
            heading: getFld('heading', 'Hand Over All Your Business Work', 'Hero Main Title (Part 1)'),
            heading_2: getFld('heading_2', 'We Handle Everything', 'Hero Highlighted Title (Part 2)'),
            heading_3: getFld('heading_3', 'POS, Software, Operations—No Worries!', 'Hero Sub-title (Part 3)'),
            paragraph: getFld('paragraph', 'With Crown Excel, you don’t need to worry about your business systems, POS, or software. We take full responsibility for your operations—maintenance, repairs, upgrades, software management, and support. Just hand over your business work and relax. We’ll keep everything running, secure, and up-to-date, so you can focus on growth.', 'Hero Overview Description', 'richtext'),
            button_1_text: getFld('button_1_text', 'Get AMC Quote', 'Hero Primary Button Label'),
            button_1_link: getFld('button_1_link', '/contact-us', 'Hero Primary Button Link', 'url'),
            button_2_text: getFld('button_2_text', 'Emergency Support', 'Hero Secondary Button Label'),

            // Key Industry Stats
            stat_1_number: getFld('stat_1_number', '500+', 'Stat 1 Number'),
            stat_1_label: getFld('stat_1_label', 'Ongoing AMC Contracts', 'Stat 1 Label'),
            stat_1_sublabel: getFld('stat_1_sublabel', 'Across all business types', 'Stat 1 Sublabel'),
            stat_2_number: getFld('stat_2_number', '99.9%', 'Stat 2 Number'),
            stat_2_label: getFld('stat_2_label', 'Average Uptime', 'Stat 2 Label'),
            stat_2_sublabel: getFld('stat_2_sublabel', 'Business systems managed', 'Stat 2 Sublabel'),
            stat_3_number: getFld('stat_3_number', '30 mins', 'Stat 3 Number'),
            stat_3_label: getFld('stat_3_label', 'Avg. Response', 'Stat 3 Label'),
            stat_3_sublabel: getFld('stat_3_sublabel', 'Emergency support', 'Stat 3 Sublabel'),
            stat_4_number: getFld('stat_4_number', '50%+', 'Stat 4 Number'),
            stat_4_label: getFld('stat_4_label', 'Cost Savings', 'Stat 4 Label'),
            stat_4_sublabel: getFld('stat_4_sublabel', 'Annual client savings', 'Stat 4 Sublabel'),

            // AMC Plans Section
            heading_4: getFld('heading_4', 'AMC PLANS', 'AMC Plans Section Heading'),
            paragraph_2: getFld('paragraph_2', 'Short or long term—choose the AMC that fits your business. We handle everything for you!', 'AMC Plans Section Subtitle', 'richtext'),
            plan_1_type: getFld('plan_1_type', 'Short Term AMC', 'Plan 1 Type Name'),
            plan_1_duration: getFld('plan_1_duration', '1-6 Months', 'Plan 1 Duration'),
            plan_1_title: getFld('plan_1_title', 'Quick Business & IT Support', 'Plan 1 Title'),
            plan_1_subtitle: getFld('plan_1_subtitle', 'Immediate help for your business systems, software, POS, and more', 'Plan 1 Subtitle', 'richtext'),
            plan_1_uptime: getFld('plan_1_uptime', '99.5%', 'Plan 1 Uptime SLA'),
            plan_1_response: getFld('plan_1_response', '4 Hours', 'Plan 1 Response Time'),
            plan_1_benefits: getFld('plan_1_benefits', 'Best for startups, shops, and urgent business needs', 'Plan 1 Benefits'),
            plan_1_button_text: getFld('plan_1_button_text', 'Request Short Term AMC Consultation', 'Plan 1 Button Label'),
            plan_1_feat_1: getFld('plan_1_feat_1', 'Rapid troubleshooting for business systems', 'Plan 1 Feature 1'),
            plan_1_feat_2: getFld('plan_1_feat_2', 'Emergency support for POS, billing, and software', 'Plan 1 Feature 2'),
            plan_1_feat_3: getFld('plan_1_feat_3', 'Software installation, updates & bug fixes', 'Plan 1 Feature 3'),
            plan_1_feat_4: getFld('plan_1_feat_4', 'Basic preventive maintenance schedules', 'Plan 1 Feature 4'),
            plan_1_feat_5: getFld('plan_1_feat_5', '24/7 technical support hotline', 'Plan 1 Feature 5'),
            plan_1_feat_6: getFld('plan_1_feat_6', 'On-site visits for business operations (monthly)', 'Plan 1 Feature 6'),
            plan_1_feat_7: getFld('plan_1_feat_7', 'System health monitoring reports', 'Plan 1 Feature 7'),

            plan_2_type: getFld('plan_2_type', 'Long Term AMC', 'Plan 2 Type Name'),
            plan_2_duration: getFld('plan_2_duration', '6 Months - 3 Years', 'Plan 2 Duration'),
            plan_2_title: getFld('plan_2_title', 'Complete Business & IT Management', 'Plan 2 Title'),
            plan_2_subtitle: getFld('plan_2_subtitle', 'We handle all your business operations, software, POS, and IT needs', 'Plan 2 Subtitle', 'richtext'),
            plan_2_uptime: getFld('plan_2_uptime', '99.9%', 'Plan 2 Uptime SLA'),
            plan_2_response: getFld('plan_2_response', '2 Hours', 'Plan 2 Response Time'),
            plan_2_benefits: getFld('plan_2_benefits', 'Ideal for enterprises, retail, and those who want total peace of mind', 'Plan 2 Benefits'),
            plan_2_button_text: getFld('plan_2_button_text', 'Request Long Term AMC Consultation', 'Plan 2 Button Label'),
            plan_2_feat_1: getFld('plan_2_feat_1', 'Full system maintenance & upgrades', 'Plan 2 Feature 1'),
            plan_2_feat_2: getFld('plan_2_feat_2', 'POS & billing software management', 'Plan 2 Feature 2'),
            plan_2_feat_3: getFld('plan_2_feat_3', 'Regular check-ups for business operations', 'Plan 2 Feature 3'),
            plan_2_feat_4: getFld('plan_2_feat_4', 'Software license management & renewals', 'Plan 2 Feature 4'),
            plan_2_feat_5: getFld('plan_2_feat_5', 'Priority support & rapid issue resolution', 'Plan 2 Feature 5'),
            plan_2_feat_6: getFld('plan_2_feat_6', 'Advanced monitoring & reporting dashboards', 'Plan 2 Feature 6'),
            plan_2_feat_7: getFld('plan_2_feat_7', 'Dedicated account manager & technical team', 'Plan 2 Feature 7'),
            plan_2_feat_8: getFld('plan_2_feat_8', 'Annual business technology consultation', 'Plan 2 Feature 8'),

            // Why Choose AMC Section
            heading_5: getFld('heading_5', 'WHY CHOOSE CROWN EXCEL AMC?', 'Why Choose AMC Heading'),
            feature_1_title: getFld('feature_1_title', 'Business & IT Experts', 'Feature 1 Title'),
            feature_1_desc: getFld('feature_1_desc', 'Specialists in business operations, POS, billing, and software management', 'Feature 1 Description', 'richtext'),
            feature_1_metric: getFld('feature_1_metric', '200+ Certified Engineers', 'Feature 1 Metric'),

            feature_2_title: getFld('feature_2_title', '24/7 Priority Support', 'Feature 2 Title'),
            feature_2_desc: getFld('feature_2_desc', 'Round-the-clock help for any business, POS, or software issue', 'Feature 2 Description', 'richtext'),
            feature_2_metric: getFld('feature_2_metric', '2-4 Hour Response', 'Feature 2 Metric'),

            feature_3_title: getFld('feature_3_title', 'Proactive Monitoring', 'Feature 3 Title'),
            feature_3_desc: getFld('feature_3_desc', 'Real-time tracking of business systems, POS, and software updates', 'Feature 3 Description', 'richtext'),
            feature_3_metric: getFld('feature_3_metric', '99.9% Uptime Guarantee', 'Feature 3 Metric'),

            feature_4_title: getFld('feature_4_title', 'Cost Optimization', 'Feature 4 Title'),
            feature_4_desc: getFld('feature_4_desc', 'Reduce expenses and improve business efficiency with smart management', 'Feature 4 Description', 'richtext'),
            feature_4_metric: getFld('feature_4_metric', '40% Cost Reduction', 'Feature 4 Metric'),

            feature_5_title: getFld('feature_5_title', 'Rapid Deployment', 'Feature 5 Title'),
            feature_5_desc: getFld('feature_5_desc', 'Quick setup and integration for your business and POS systems', 'Feature 5 Description', 'richtext'),
            feature_5_metric: getFld('feature_5_metric', '24 Hour Setup', 'Feature 5 Metric'),

            feature_6_title: getFld('feature_6_title', 'Security & Compliance', 'Feature 6 Title'),
            feature_6_desc: getFld('feature_6_desc', 'We keep your business data and software secure and compliant', 'Feature 6 Description', 'richtext'),
            feature_6_metric: getFld('feature_6_metric', '100% Compliant', 'Feature 6 Metric'),

            // Coverage Areas Section
            heading_6: getFld('heading_6', 'WHAT WE HANDLE FOR YOU', 'Coverage Section Heading'),
            paragraph_3: getFld('paragraph_3', 'Hardware, software, support, and more—just hand over your IT work and be worry-free!', 'Coverage Section Subtitle', 'richtext'),
            category_1_name: getFld('category_1_name', 'What We Manage', 'Category 1 Title'),
            cat_1_item_1: getFld('cat_1_item_1', 'Business Operations', 'Cat 1 Item 1'),
            cat_1_item_2: getFld('cat_1_item_2', 'POS & Billing Software', 'Cat 1 Item 2'),
            cat_1_item_3: getFld('cat_1_item_3', 'Inventory & CRM Systems', 'Cat 1 Item 3'),
            cat_1_item_4: getFld('cat_1_item_4', 'Cloud Services', 'Cat 1 Item 4'),
            cat_1_item_5: getFld('cat_1_item_5', 'Software Licensing', 'Cat 1 Item 5'),
            cat_1_item_6: getFld('cat_1_item_6', 'Data Backup & Security', 'Cat 1 Item 6'),
            cat_1_item_7: getFld('cat_1_item_7', 'Multi-location Management', 'Cat 1 Item 7'),

            category_2_name: getFld('category_2_name', 'Service Locations', 'Category 2 Title'),
            cat_2_item_1: getFld('cat_2_item_1', 'On-site Support', 'Cat 2 Item 1'),
            cat_2_item_2: getFld('cat_2_item_2', 'Remote Monitoring', 'Cat 2 Item 2'),
            cat_2_item_3: getFld('cat_2_item_3', 'Multi-location Coverage', 'Cat 2 Item 3'),
            cat_2_item_4: getFld('cat_2_item_4', 'Emergency Call-outs', 'Cat 2 Item 4'),
            cat_2_item_5: getFld('cat_2_item_5', 'Planned Maintenance', 'Cat 2 Item 5'),

            category_3_name: getFld('category_3_name', 'Industry Expertise', 'Category 3 Title'),
            cat_3_item_1: getFld('cat_3_item_1', 'Retail & E-commerce', 'Cat 3 Item 1'),
            cat_3_item_2: getFld('cat_3_item_2', 'Healthcare', 'Cat 3 Item 2'),
            cat_3_item_3: getFld('cat_3_item_3', 'Manufacturing', 'Cat 3 Item 3'),
            cat_3_item_4: getFld('cat_3_item_4', 'Financial Services', 'Cat 3 Item 4'),
            cat_3_item_5: getFld('cat_3_item_5', 'Education', 'Cat 3 Item 5'),
            cat_3_item_6: getFld('cat_3_item_6', 'Government', 'Cat 3 Item 6'),

            // Bottom CTA Section
            heading_7: getFld('heading_7', 'Be Worry-Free—Let Us Handle Everything!', 'Bottom CTA Heading'),
            paragraph_4: getFld('paragraph_4', 'With Crown Excel AMC, you can focus on your business while we take care of all your hardware, software, and IT support. No stress, no downtime—just hand over your work and relax!', 'Bottom CTA Description', 'richtext'),
            cta_benefit_1: getFld('cta_benefit_1', 'Full responsibility for your IT & hardware', 'CTA Benefit 1'),
            cta_benefit_2: getFld('cta_benefit_2', 'Software management & updates', 'CTA Benefit 2'),
            cta_benefit_3: getFld('cta_benefit_3', '24/7 support & rapid response', 'CTA Benefit 3'),
            cta_button_1_text: getFld('cta_button_1_text', 'Start Free Assessment', 'CTA Button 1 Label'),
            cta_button_2_text: getFld('cta_button_2_text', 'Contact Support', 'CTA Button 2 Label'),
            cta_stat_1_number: getFld('cta_stat_1_number', '500+', 'CTA Overlay Stat 1 Number'),
            cta_stat_1_label: getFld('cta_stat_1_label', 'Active Contracts', 'CTA Overlay Stat 1 Label'),
            cta_stat_2_number: getFld('cta_stat_2_number', '24/7', 'CTA Overlay Stat 2 Number'),
            cta_stat_2_label: getFld('cta_stat_2_label', 'Expert Support', 'CTA Overlay Stat 2 Label'),

            ...empImgs,
          };
          if (sec.fields.image_empoweringimage) sec.fields.image_empoweringimage.label = 'Hero Feature Image (Network Empower)';
          if (sec.fields.image_networkit) sec.fields.image_networkit.label = 'Bottom CTA Feature Image (Hardware Maintenance)';
          if (sec.fields.image_dirham) sec.fields.image_dirham.label = 'Dirham Currency Symbol Icon';
          if (sec.fields.image_itservice) sec.fields.image_itservice.label = 'Feature 1 Image (IT Service)';
          if (sec.fields.image_support) sec.fields.image_support.label = 'Feature 2 Image (Support)';
          if (sec.fields.image_proactive) sec.fields.image_proactive.label = 'Feature 3 Image (Proactive)';
          if (sec.fields.image_cost) sec.fields.image_cost.label = 'Feature 4 Image (Cost)';
          if (sec.fields.image_rapid) sec.fields.image_rapid.label = 'Feature 5 Image (Rapid)';
          if (sec.fields.image_security) sec.fields.image_security.label = 'Feature 6 Image (Security)';
        } else if (sec.sectionId === 'networkingbanner') {
          sec.sectionName = 'Hero Banner (Networking & Cabling)';
          const bannerImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = { ...bannerImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'Networking Solutions', 'Banner Main Heading'),
            paragraph: getFld('paragraph', 'Our networking team provides end-to-end services: network design, implementation, performance tuning, monitoring and 24/7 support to ensure high availability and secure connectivity for your organization.', 'Banner Description', 'richtext'),
            ...bannerImgs,
          };
          if (sec.fields.image_bannerimage) sec.fields.image_bannerimage.label = 'Hero Banner Background Image';
          if (sec.fields.image_icon2) sec.fields.image_icon2.label = 'Banner Floating Icon';
        } else if (sec.sectionId === 'networkempowering') {
          sec.sectionName = 'Enterprise Networking & Infrastructure Solutions';
          const netImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) netImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) netImgs[k] = { ...netImgs[k], ...v };
          }
          sec.fields = {
            // Header Subsection
            badge: getFld('badge', 'Enterprise Networking Solutions', 'Section Badge'),
            heading: getFld('heading', 'Complete Network Infrastructure', 'Section Main Heading'),
            paragraph: getFld('paragraph', 'From design to deployment, we provide end-to-end networking solutions that scale with your business and ensure seamless connectivity.', 'Section Subtitle', 'richtext'),

            // 4 Core Services
            service_1_title: getFld('service_1_title', 'Network Infrastructure Design', 'Service 1 Title'),
            service_1_desc: getFld('service_1_desc', 'Complete network architecture planning with scalable solutions for enterprise growth.', 'Service 1 Description', 'richtext'),
            service_1_feat_1: getFld('service_1_feat_1', 'LAN/WAN Setup', 'Service 1 Feature 1'),
            service_1_feat_2: getFld('service_1_feat_2', 'Network Topology', 'Service 1 Feature 2'),
            service_1_feat_3: getFld('service_1_feat_3', 'Bandwidth Planning', 'Service 1 Feature 3'),
            service_1_feat_4: getFld('service_1_feat_4', 'Future Scaling', 'Service 1 Feature 4'),

            service_2_title: getFld('service_2_title', 'Wireless Solutions', 'Service 2 Title'),
            service_2_desc: getFld('service_2_desc', 'High-performance WiFi networks with seamless coverage and advanced security protocols.', 'Service 2 Description', 'richtext'),
            service_2_feat_1: getFld('service_2_feat_1', 'WiFi 6 Technology', 'Service 2 Feature 1'),
            service_2_feat_2: getFld('service_2_feat_2', 'Mesh Networks', 'Service 2 Feature 2'),
            service_2_feat_3: getFld('service_2_feat_3', 'Guest Access', 'Service 2 Feature 3'),
            service_2_feat_4: getFld('service_2_feat_4', 'Coverage Analysis', 'Service 2 Feature 4'),

            service_3_title: getFld('service_3_title', 'Network Security', 'Service 3 Title'),
            service_3_desc: getFld('service_3_desc', 'Comprehensive security framework to protect your network from cyber threats.', 'Service 3 Description', 'richtext'),
            service_3_feat_1: getFld('service_3_feat_1', 'Firewall Setup', 'Service 3 Feature 1'),
            service_3_feat_2: getFld('service_3_feat_2', 'VPN Solutions', 'Service 3 Feature 2'),
            service_3_feat_3: getFld('service_3_feat_3', 'Threat Detection', 'Service 3 Feature 3'),
            service_3_feat_4: getFld('service_3_feat_4', 'Access Control', 'Service 3 Feature 4'),

            service_4_title: getFld('service_4_title', 'Network Monitoring', 'Service 4 Title'),
            service_4_desc: getFld('service_4_desc', '24/7 network monitoring and maintenance to ensure optimal performance and uptime.', 'Service 4 Description', 'richtext'),
            service_4_feat_1: getFld('service_4_feat_1', 'Real-time Monitoring', 'Service 4 Feature 1'),
            service_4_feat_2: getFld('service_4_feat_2', 'Performance Analytics', 'Service 4 Feature 2'),
            service_4_feat_3: getFld('service_4_feat_3', 'Fault Detection', 'Service 4 Feature 3'),
            service_4_feat_4: getFld('service_4_feat_4', 'Remote Support', 'Service 4 Feature 4'),

            // Why Choose Subsection
            heading_2: getFld('heading_2', 'Why Choose Our Networking Solutions?', 'Why Choose Heading'),
            paragraph_2: getFld('paragraph_2', 'Our comprehensive networking approach ensures your business stays connected, secure, and scalable. We combine cutting-edge technology with proven methodologies to deliver exceptional results.', 'Why Choose Description', 'richtext'),
            benefit_1_title: getFld('benefit_1_title', 'Enterprise-Grade Security', 'Benefit 1 Title'),
            benefit_1_desc: getFld('benefit_1_desc', 'Advanced security protocols and monitoring systems protect your network 24/7.', 'Benefit 1 Description', 'richtext'),
            benefit_2_title: getFld('benefit_2_title', 'Scalable Architecture', 'Benefit 2 Title'),
            benefit_2_desc: getFld('benefit_2_desc', 'Future-ready infrastructure that grows with your business needs.', 'Benefit 2 Description', 'richtext'),
            benefit_3_title: getFld('benefit_3_title', 'Expert Support Team', 'Benefit 3 Title'),
            benefit_3_desc: getFld('benefit_3_desc', 'Dedicated network engineers available round-the-clock for support.', 'Benefit 3 Description', 'richtext'),
            button_text: getFld('button_text', 'Schedule Network Consultation', 'Consultation Button Label'),
            button_link: getFld('button_link', '/contact-us', 'Consultation Button Link', 'url'),

            // Cutting-Edge Network Technologies
            heading_3: getFld('heading_3', 'Cutting-Edge Network Technologies', 'Technologies Heading'),
            paragraph_3: getFld('paragraph_3', 'We leverage the latest networking technologies to deliver superior performance and reliability', 'Technologies Subtitle', 'richtext'),
            tech_1_title: getFld('tech_1_title', '5G Integration', 'Tech 1 Title'),
            tech_1_desc: getFld('tech_1_desc', 'Ultra-fast connectivity with low latency for mission-critical applications', 'Tech 1 Description', 'richtext'),
            tech_2_title: getFld('tech_2_title', 'Cloud Networking', 'Tech 2 Title'),
            tech_2_desc: getFld('tech_2_desc', 'Hybrid cloud solutions for seamless on-premise and cloud integration', 'Tech 2 Description', 'richtext'),
            tech_3_title: getFld('tech_3_title', 'AI-Powered Analytics', 'Tech 3 Title'),
            tech_3_desc: getFld('tech_3_desc', 'Intelligent network optimization with predictive maintenance capabilities', 'Tech 3 Description', 'richtext'),

            // Industry-Specific Network Solutions
            heading_4: getFld('heading_4', 'Industry-Specific Network Solutions', 'Industries Heading'),
            paragraph_4: getFld('paragraph_4', 'Tailored networking solutions designed for your industry\'s unique requirements', 'Industries Subtitle', 'richtext'),
            ind_1_title: getFld('ind_1_title', 'Healthcare', 'Industry 1 Title'),
            ind_1_desc: getFld('ind_1_desc', 'Crown Excel is one of the leading providers in the UAE, delivering high-class networking, IT hardware, and software solutions tailored to healthcare industry standards.', 'Industry 1 Description', 'richtext'),
            ind_2_title: getFld('ind_2_title', 'Education', 'Industry 2 Title'),
            ind_2_desc: getFld('ind_2_desc', 'Crown Excel empowers educational institutions across the UAE with cutting-edge networking, IT hardware, and software solutions designed to support modern learning environments and academic excellence.', 'Industry 2 Description', 'richtext'),
            ind_3_title: getFld('ind_3_title', 'Manufacturing', 'Industry 3 Title'),
            ind_3_desc: getFld('ind_3_desc', 'Crown Excel delivers robust and reliable IT infrastructure, networking, and software solutions tailored to meet the dynamic needs of the manufacturing sector in the UAE, driving efficiency, productivity, and innovation.', 'Industry 3 Description', 'richtext'),
            ind_4_title: getFld('ind_4_title', 'Retail', 'Industry 4 Title'),
            ind_4_desc: getFld('ind_4_desc', 'Crown Excel equips retail businesses in the UAE with smart IT hardware, seamless networking, and customized software solutions that enhance operational performance and customer engagement across every touchpoint.', 'Industry 4 Description', 'richtext'),

            // Implementation Process
            heading_5: getFld('heading_5', 'Our Proven Implementation Process', 'Process Heading'),
            paragraph_5: getFld('paragraph_5', 'A systematic approach ensuring successful network deployment from planning to optimization', 'Process Subtitle', 'richtext'),
            step_1_number: getFld('step_1_number', '1', 'Step 1 Number'),
            step_1_title: getFld('step_1_title', 'Assessment', 'Step 1 Title'),
            step_1_desc: getFld('step_1_desc', 'Comprehensive analysis of current infrastructure and future requirements', 'Step 1 Description', 'richtext'),
            step_2_number: getFld('step_2_number', '2', 'Step 2 Number'),
            step_2_title: getFld('step_2_title', 'Design', 'Step 2 Title'),
            step_2_desc: getFld('step_2_desc', 'Custom network architecture tailored to your specific business needs', 'Step 2 Description', 'richtext'),
            step_3_number: getFld('step_3_number', '3', 'Step 3 Number'),
            step_3_title: getFld('step_3_title', 'Deployment', 'Step 3 Title'),
            step_3_desc: getFld('step_3_desc', 'Professional installation with minimal disruption to operations', 'Step 3 Description', 'richtext'),
            step_4_number: getFld('step_4_number', '4', 'Step 4 Number'),
            step_4_title: getFld('step_4_title', 'Optimization', 'Step 4 Title'),
            step_4_desc: getFld('step_4_desc', 'Continuous monitoring and performance tuning for optimal results', 'Step 4 Description', 'richtext'),

            // Performance Metrics
            heading_6: getFld('heading_6', 'Network Performance Metrics', 'Metrics Heading'),
            paragraph_6: getFld('paragraph_6', 'Proven results across enterprise deployments', 'Metrics Subtitle', 'richtext'),
            stat_1_value: getFld('stat_1_value', '99.9%', 'Stat 1 Value'),
            stat_1_label: getFld('stat_1_label', 'Network Uptime', 'Stat 1 Label'),
            stat_2_value: getFld('stat_2_value', '24/7', 'Stat 2 Value'),
            stat_2_label: getFld('stat_2_label', 'Technical Support', 'Stat 2 Label'),
            stat_3_value: getFld('stat_3_value', '500+', 'Stat 3 Value'),
            stat_3_label: getFld('stat_3_label', 'Networks Deployed', 'Stat 3 Label'),
            stat_4_value: getFld('stat_4_value', '10Gb', 'Stat 4 Value'),
            stat_4_label: getFld('stat_4_label', 'Maximum Speed', 'Stat 4 Label'),

            ...netImgs,
          };
          if (sec.fields.image_networkit) sec.fields.image_networkit.label = 'Showcase Image (Networking Solutions)';
          if (sec.fields.image_infraicon) sec.fields.image_infraicon.label = 'Service 1 Icon (Infrastructure)';
          if (sec.fields.image_wirelessicon) sec.fields.image_wirelessicon.label = 'Service 2 Icon (Wireless)';
          if (sec.fields.image_securityicon) sec.fields.image_securityicon.label = 'Service 3 Icon (Security)';
          if (sec.fields.image_monitoringicon) sec.fields.image_monitoringicon.label = 'Service 4 Icon (Monitoring)';
          if (sec.fields.image_icon5g) sec.fields.image_icon5g.label = 'Tech 1 Icon (5G)';
          if (sec.fields.image_iconcloud) sec.fields.image_iconcloud.label = 'Tech 2 Icon (Cloud)';
          if (sec.fields.image_iconai) sec.fields.image_iconai.label = 'Tech 3 Icon (AI)';
          if (sec.fields.image_iconhealthcare) sec.fields.image_iconhealthcare.label = 'Industry 1 Icon (Healthcare)';
          if (sec.fields.image_iconeducation) sec.fields.image_iconeducation.label = 'Industry 2 Icon (Education)';
          if (sec.fields.image_iconmanufacturing) sec.fields.image_iconmanufacturing.label = 'Industry 3 Icon (Manufacturing)';
          if (sec.fields.image_iconretail) sec.fields.image_iconretail.label = 'Industry 4 Icon (Retail)';
          if (sec.fields.image_iconcheck) sec.fields.image_iconcheck.label = 'Checkmark Icon';
        } else if (sec.sectionId === 'hardwarerepairbanner') {
          sec.sectionName = 'Hero Banner (Security Solutions)';
          const bannerImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = { ...bannerImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'Security Solutions', 'Banner Main Heading'),
            paragraph: getFld('paragraph', 'Security is built into every repair — malware and ransomware cleanup, firmware/BIOS hardening, secure configuration baselines, vulnerability patching, and replacement of compromised components — restoring reliability while strengthening your endpoint protection.', 'Banner Description', 'richtext'),
            ...bannerImgs,
          };
          if (sec.fields.image_bannerimage) sec.fields.image_bannerimage.label = 'Hero Banner Background Image';
          if (sec.fields.image_icon2) sec.fields.image_icon2.label = 'Banner Floating Icon';
        } else if (sec.sectionId === 'securitysolutionsempowering') {
          sec.sectionName = 'Cybersecurity & Protection Overview';
          const empImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) empImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) empImgs[k] = { ...empImgs[k], ...v };
          }
          sec.fields = {
            // Hero Subsection
            badge: getFld('badge', 'SECURITY SOLUTIONS', 'Hero Badge'),
            heading: getFld('heading', 'Complete Security,', 'Hero Main Title (Part 1)'),
            heading_2: getFld('heading_2', 'Protecting Your Business', 'Hero Highlighted Title (Part 2)'),
            heading_3: getFld('heading_3', 'Peace of Mind, 24/7 Protection', 'Hero Subtitle (Part 3)'),
            paragraph: getFld('paragraph', 'Crown Excel delivers advanced security solutions for your business. From network security, endpoint protection, firewalls, and surveillance to compliance and risk management—our experts keep your data, devices, and people safe. Focus on growth, knowing your business is protected by the latest technology and proactive support.', 'Hero Overview Description', 'richtext'),
            bullet_1: getFld('bullet_1', 'Network security & firewalls', 'Hero Feature Bullet 1'),
            bullet_2: getFld('bullet_2', 'Endpoint protection & antivirus', 'Hero Feature Bullet 2'),
            bullet_3: getFld('bullet_3', 'Surveillance & access control', 'Hero Feature Bullet 3'),
            bullet_4: getFld('bullet_4', 'Data privacy & compliance', 'Hero Feature Bullet 4'),
            bullet_5: getFld('bullet_5', 'Threat monitoring & response', 'Hero Feature Bullet 5'),
            bullet_6: getFld('bullet_6', 'Security consulting & audits', 'Hero Feature Bullet 6'),
            button_1_text: getFld('button_1_text', 'Get Free Security Audit', 'Primary CTA Button Label'),
            button_1_link: getFld('button_1_link', '/contact-us', 'Primary CTA Button Link', 'url'),
            button_2_text: getFld('button_2_text', 'Request Solution', 'Secondary Modal Button Label'),

            // Why Choose Section
            heading_4: getFld('heading_4', 'WHY CHOOSE CROWN EXCEL?', 'Why Choose Section Heading'),
            paragraph_2: getFld('paragraph_2', 'We secure your business with the latest technology and expert support.', 'Why Choose Subtitle', 'richtext'),
            card_1_title: getFld('card_1_title', 'Advanced Protection', 'Card 1 Title'),
            card_1_desc: getFld('card_1_desc', 'Multi-layered security for networks, devices, and data.', 'Card 1 Description', 'richtext'),
            card_2_title: getFld('card_2_title', 'Surveillance & Access', 'Card 2 Title'),
            card_2_desc: getFld('card_2_desc', 'CCTV, access control, and monitoring for total safety.', 'Card 2 Description', 'richtext'),
            card_3_title: getFld('card_3_title', 'Expert Team', 'Card 3 Title'),
            card_3_desc: getFld('card_3_desc', 'Certified security professionals and rapid response.', 'Card 3 Description', 'richtext'),
            card_4_title: getFld('card_4_title', 'Compliance & Audits', 'Card 4 Title'),
            card_4_desc: getFld('card_4_desc', 'Stay compliant with regular audits and reporting.', 'Card 4 Description', 'richtext'),

            // We Secure Everything Section
            heading_5: getFld('heading_5', 'WE SECURE EVERYTHING', 'Security Scope Section Heading'),
            paragraph_3: getFld('paragraph_3', 'Networks, devices, data, people, and more', 'Security Scope Subtitle', 'richtext'),
            tag_1: getFld('tag_1', 'Firewalls', 'Security Tag 1'),
            tag_2: getFld('tag_2', 'Antivirus', 'Security Tag 2'),
            tag_3: getFld('tag_3', 'CCTV', 'Security Tag 3'),
            tag_4: getFld('tag_4', 'Access Control', 'Security Tag 4'),
            tag_5: getFld('tag_5', 'Data Encryption', 'Security Tag 5'),
            tag_6: getFld('tag_6', 'Threat Monitoring', 'Security Tag 6'),
            tag_7: getFld('tag_7', 'Compliance', 'Security Tag 7'),
            tag_8: getFld('tag_8', 'Security Consulting', 'Security Tag 8'),
            tag_9: getFld('tag_9', 'Risk Management', 'Security Tag 9'),
            tag_10: getFld('tag_10', 'Incident Response', 'Security Tag 10'),

            // Bottom CTA Section
            heading_6: getFld('heading_6', 'Stay Secure—Let Us Protect Your Business!', 'Bottom CTA Heading'),
            paragraph_4: getFld('paragraph_4', 'Don’t leave your business vulnerable. Crown Excel provides complete security solutions, so you can focus on success while we keep you protected. Call us for a free security audit!', 'Bottom CTA Description', 'richtext'),
            cta_bullet_1: getFld('cta_bullet_1', 'Network & endpoint security', 'CTA Bullet 1'),
            cta_bullet_2: getFld('cta_bullet_2', 'Surveillance & access control', 'CTA Bullet 2'),
            cta_bullet_3: getFld('cta_bullet_3', 'Compliance & risk management', 'CTA Bullet 3'),
            cta_button_1_text: getFld('cta_button_1_text', 'Call Now For Free Security Audit', 'CTA Primary Button Label'),
            cta_button_1_link: getFld('cta_button_1_link', '/contact-us', 'CTA Primary Button Link', 'url'),
            cta_button_2_text: getFld('cta_button_2_text', 'Request Solution', 'CTA Secondary Button Label'),
            cta_badge: getFld('cta_badge', 'SECURED', 'CTA Overlay Badge Text'),

            ...empImgs,
          };
          if (sec.fields.image_empoweringimage) sec.fields.image_empoweringimage.label = 'Hero Feature Hex Image';
          if (sec.fields.image_networkit) sec.fields.image_networkit.label = 'Bottom CTA Feature Image (Stay Secure)';
        } else if (sec.sectionId === 'phonesbanner') {
          sec.sectionName = 'Hero Banner (Wholesale Smartphones)';
          const bannerImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = { ...bannerImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'DISCOVER TOP', 'Banner Top Line'),
            heading_highlight: getFld('heading_highlight', 'PHONE BRANDS', 'Banner Highlighted Line'),
            heading_end: getFld('heading_end', 'FOR EVERY NEED', 'Banner Bottom Line'),
            paragraph: getFld('paragraph', 'Crown Excel is a premier phones wholesale supplier in Dubai. We offer brand-new smartphones, business VoIP phones, and mobile communication devices from global market leaders including Apple, Samsung, Xiaomi, and more.', 'Banner Description', 'richtext'),
            ...bannerImgs,
          };
          if (sec.fields.image_laptopimage1) sec.fields.image_laptopimage1.label = 'Left Smartphone Image (iPhone)';
          if (sec.fields.image_laptopimage2) sec.fields.image_laptopimage2.label = 'Right Smartphone Image (Galaxy S24 Ultra)';
          if (sec.fields.image_stars) sec.fields.image_stars.label = 'Decorative Sparkles Graphic';
        } else if (sec.sectionId === 'bestsellingphones') {
          sec.sectionName = 'Best-Selling Phones Carousel';
          const bestImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) bestImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) bestImgs[k] = { ...bestImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'OUR BEST-SELLING PHONES', 'Section Heading'),
            slide1_title: getFld('slide1_title', 'Apple iPhone 16 (128GB)', 'Slide 1 Product Title'),
            slide1_desc: getFld('slide1_desc', 'A18 Bionic chip, New 6-core CPU with 2 performance and 4 efficiency cores, Camera Control, and 48MP Fusion camera.', 'Slide 1 Description', 'richtext'),
            slide2_title: getFld('slide2_title', 'Samsung Galaxy S24 Ultra', 'Slide 2 Product Title'),
            slide2_desc: getFld('slide2_desc', 'Flagship smartphone featuring Snapdragon 8 Gen 3, titanium frame, quad-telephoto camera, Galaxy AI, and built-in S Pen.', 'Slide 2 Description', 'richtext'),
            slide3_title: getFld('slide3_title', 'Apple iPhone 16 Standard', 'Slide 3 Product Title'),
            slide3_desc: getFld('slide3_desc', 'Advanced dual-camera system, Action button, vibrant Super Retina XDR display, and all-day battery life for business and daily use.', 'Slide 3 Description', 'richtext'),
            ...bestImgs,
          };
          if (sec.fields.image_bestphone1) sec.fields.image_bestphone1.label = 'Slide 1 Image (iPhone 16 Colors)';
          if (sec.fields.image_bestphone2) sec.fields.image_bestphone2.label = 'Slide 2 Image (Galaxy S24 Ultra)';
          if (sec.fields.image_bestphone3) sec.fields.image_bestphone3.label = 'Slide 3 Image (iPhone 16 White)';
        } else if (sec.sectionId === 'ultimatephones') {
          sec.sectionName = 'The Ultimate Phone Solutions';
          const ultImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) ultImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) ultImgs[k] = { ...ultImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'THE ULTIMATE SOLUTION FOR', 'Section Heading'),
            heading_highlight: getFld('heading_highlight', 'SMARTPHONES & BUSINESS PHONES', 'Highlighted Badge Heading'),
            card1_title: getFld('card1_title', 'Enterprise Reliability & Speed', 'Card 1 Title'),
            card1_desc: getFld('card1_desc', 'Empower your workforce with top-tier smartphones and corporate communication devices. Featuring the latest iOS and Android operating systems, enterprise encryption, and dependable battery life to ensure seamless productivity anywhere.', 'Card 1 Description', 'richtext'),
            card2_title: getFld('card2_title', 'Global Compatibility', 'Card 2 Title'),
            card2_desc: getFld('card2_desc', 'All our phones are factory unlocked with multi-band 5G and international carrier compatibility. Ideal for international businesses, UAE corporations, and retail traders requiring versatile, high-demand devices.', 'Card 2 Description', 'richtext'),
            card3_title: getFld('card3_title', 'Wholesale Volume & Bulk Supply', 'Card 3 Title'),
            card3_desc: getFld('card3_desc', 'Crown Excel specializes in wholesale smartphone distribution with competitive pricing on large volumes. Whether purchasing for corporate fleets or retail resale, we guarantee reliable inventory and fast fulfillment.', 'Card 3 Description', 'richtext'),
            card4_title: getFld('card4_title', 'Authenticity & Warranty Support', 'Card 4 Title'),
            card4_desc: getFld('card4_desc', 'Every device is 100% brand new, authentic, and supported with official manufacturer warranty. Our technical team ensures hassle-free procurement and dedicated support for every client.', 'Card 4 Description', 'richtext'),
            ...ultImgs,
          };
          if (sec.fields.image_computingimage) sec.fields.image_computingimage.label = 'Center Showcase Image';
        } else if (sec.sectionId === 'allinonephones') {
          sec.sectionName = 'All-in-One Phone Solutions';
          const allImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) allImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) allImgs[k] = { ...allImgs[k], ...v };
          }
          sec.fields = {
            banner_heading: getFld('banner_heading', 'ALL-IN-ONE PHONE SOLUTIONS', 'Banner Heading Ribbon'),
            biz_heading: getFld('biz_heading', 'For Businesses:', 'Businesses Subsection Heading'),
            biz_btn_text: getFld('biz_btn_text', 'Visit Our Store', 'Business Button Label'),
            biz_btn_link: getFld('biz_btn_link', 'https://www.grabatoz.ae/ae-en', 'Business Button URL', 'url'),
            biz_item1_title: getFld('biz_item1_title', 'Apple iPhone 16 128GB', 'Business Product 1 Title'),
            biz_item2_title: getFld('biz_item2_title', 'Samsung Galaxy S24 Ultra', 'Business Product 2 Title'),
            biz_item3_title: getFld('biz_item3_title', 'Apple iPhone 16 Pro', 'Business Product 3 Title'),
            reseller_heading: getFld('reseller_heading', 'For Retailers & Resellers:', 'Resellers Subsection Heading'),
            reseller_btn_text: getFld('reseller_btn_text', 'Get Wholesale Price', 'Reseller Button Label'),
            reseller_btn_link: getFld('reseller_btn_link', '/contact-us', 'Reseller Button URL', 'url'),
            reseller_item1_title: getFld('reseller_item1_title', 'Samsung Galaxy S24 Ultra', 'Reseller Product 1 Title'),
            reseller_item2_title: getFld('reseller_item2_title', 'Apple iPhone 16', 'Reseller Product 2 Title'),
            reseller_item3_title: getFld('reseller_item3_title', 'Apple iPhone 16 Dual-SIM', 'Reseller Product 3 Title'),
            ...allImgs,
          };
          if (sec.fields.image_phone1) sec.fields.image_phone1.label = 'Product Image 1 (Apple iPhone 16)';
          if (sec.fields.image_phone2) sec.fields.image_phone2.label = 'Product Image 2 (Galaxy S24 Ultra)';
          if (sec.fields.image_phone3) sec.fields.image_phone3.label = 'Product Image 3 (iPhone 16 Pro / Lineup)';
        } else if (sec.sectionId === 'phonesbrand') {
          sec.sectionName = 'Phone Brands We Deal';
          const brandImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) brandImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) brandImgs[k] = { ...brandImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'PHONE BRANDS WE DEAL', 'Section Heading'),
            ...brandImgs,
          };
          if (sec.fields.image_background) sec.fields.image_background.label = 'Background Pattern Graphic';
          if (sec.fields.image_apple) sec.fields.image_apple.label = 'Brand Logo 1 (Apple)';
          if (sec.fields.image_samsung) sec.fields.image_samsung.label = 'Brand Logo 2 (Samsung)';
          if (sec.fields.image_xiomi) sec.fields.image_xiomi.label = 'Brand Logo 3 (Xiaomi)';
          if (sec.fields.image_lenovo) sec.fields.image_lenovo.label = 'Brand Logo 4 (Lenovo)';
          if (sec.fields.image_asus) sec.fields.image_asus.label = 'Brand Logo 5 (Asus)';
          if (sec.fields.image_hp) sec.fields.image_hp.label = 'Brand Logo 6 (HP)';
          if (sec.fields.image_dell) sec.fields.image_dell.label = 'Brand Logo 7 (Dell)';
          if (sec.fields.image_microsft) sec.fields.image_microsft.label = 'Brand Logo 8 (Microsoft)';
        } else if (sec.sectionId === 'phoneswhyfromus') {
          sec.sectionName = 'Why Buy Wholesale Phones From Us';
          const pWhyTop = getFld('heading', 'Why Buy', 'Heading Prefix');
          const pWhyHighlight = getFld('heading_highlight', 'Phones in Wholesale', 'Heading Highlighted (Yellow)');
          const pWhyEnd = getFld('heading_end', 'From Us?', 'Heading Suffix');
          if (pWhyTop.value && pWhyHighlight.value && pWhyTop.value.includes(pWhyHighlight.value)) {
            pWhyTop.value = pWhyTop.value.replace(pWhyHighlight.value, '').replace(pWhyEnd.value || '', '').replace(/\s+/g, ' ').trim();
          }
          sec.fields = {
            heading: pWhyTop,
            heading_highlight: pWhyHighlight,
            heading_end: pWhyEnd,
            paragraph: getFld('paragraph', 'Crown Excel is Dubai’s reputable supplier for wholesale smartphones and enterprise mobile communications. Here is why corporations, retailers, and traders partner with us:', 'Overview Description', 'richtext'),
            feature1_title: getFld('feature1_title', '100% Original & Brand New', 'Feature 1 Title'),
            feature1_desc: getFld('feature1_desc', 'All mobile phones and accessories are factory sealed, genuine, and sourced directly from official global supply chains.', 'Feature 1 Description', 'richtext'),
            feature2_title: getFld('feature2_title', 'Aggressive Wholesale Pricing', 'Feature 2 Title'),
            feature2_desc: getFld('feature2_desc', 'Maximize your profit margins with highly competitive wholesale tier rates on top-demand Apple and Samsung smartphones.', 'Feature 2 Description', 'richtext'),
            feature3_title: getFld('feature3_title', 'Local Warranty & Support', 'Feature 3 Title'),
            feature3_desc: getFld('feature3_desc', 'Enjoy peace of mind with manufacturer-backed warranties and dedicated account managers to handle post-sales support.', 'Feature 3 Description', 'richtext'),
            feature4_title: getFld('feature4_title', 'Fast UAE & GCC Fulfillment', 'Feature 4 Title'),
            feature4_desc: getFld('feature4_desc', 'Rapid dispatch from our Dubai warehouse with same-day local UAE deliveries and efficient international GCC export logistics.', 'Feature 4 Description', 'richtext'),
          };
        } else if (sec.sectionId === 'cctvbanner') {
          sec.sectionName = 'Hero Banner (Wholesale CCTV & Surveillance)';
          const bannerImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) bannerImgs[k] = { ...bannerImgs[k], ...v };
          }
          const cctvTop = getFld('heading', 'ADVANCED CCTV &', 'Banner Top Line');
          const cctvHighlight = getFld('heading_highlight', 'SECURITY CAMERAS', 'Banner Highlighted Line');
          const cctvEnd = getFld('heading_end', 'FOR TOTAL SECURITY', 'Banner Bottom Line');
          if (cctvTop.value && cctvHighlight.value && cctvTop.value.includes(cctvHighlight.value)) {
            cctvTop.value = cctvTop.value.replace(cctvHighlight.value, '').replace(cctvEnd.value || '', '').replace(/\s+/g, ' ').trim();
          }
          sec.fields = {
            heading: cctvTop,
            heading_highlight: cctvHighlight,
            heading_end: cctvEnd,
            paragraph: getFld('paragraph', 'Crown Excel is Dubai’s premier CCTV wholesale supplier. We supply high-resolution IP security cameras, night-vision outdoor bullet cameras, PTZ domes, and complete DVR/NVR surveillance packages from Hikvision, Dahua, and leading global security brands.', 'Banner Description', 'richtext'),
            ...bannerImgs,
          };
          if (sec.fields.image_cctvimage1) sec.fields.image_cctvimage1.label = 'Left Security Camera Image (Hikvision IP)';
          if (sec.fields.image_cctvimage2) sec.fields.image_cctvimage2.label = 'Right Security Camera Image (Outdoor Bullet)';
          if (sec.fields.image_stars) sec.fields.image_stars.label = 'Decorative Sparkles Graphic';
        } else if (sec.sectionId === 'bestsellingcctv') {
          sec.sectionName = 'Best-Selling CCTV & Surveillance Carousel';
          const bestImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) bestImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) bestImgs[k] = { ...bestImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'OUR BEST-SELLING CCTV & SURVEILLANCE', 'Section Heading'),
            slide1_title: getFld('slide1_title', 'Hikvision 4MP IP Security Camera', 'Slide 1 Product Title'),
            slide1_desc: getFld('slide1_desc', 'Model: DS-2CD1043G0-I. Weather and dust resistant (IP67), 4MP resolution, intelligent IR night vision up to 30 meters, PoE support.', 'Slide 1 Description', 'richtext'),
            slide2_title: getFld('slide2_title', 'HIKVISION Outdoor Bullet Camera', 'Slide 2 Product Title'),
            slide2_desc: getFld('slide2_desc', 'Rugged weatherproof outdoor bullet surveillance camera with smart EXIR illumination for 24/7 crystal-clear perimeter security.', 'Slide 2 Description', 'richtext'),
            slide3_title: getFld('slide3_title', 'XVIM 8CH 1080P Wired CCTV System', 'Slide 3 Product Title'),
            slide3_desc: getFld('slide3_desc', 'Complete multi-channel surveillance DVR kit with weatherproof night-vision cameras, remote smartphone monitoring, and motion alert detection.', 'Slide 3 Description', 'richtext'),
            slide4_title: getFld('slide4_title', 'Hikvision PTZ Dome Security Camera', 'Slide 4 Product Title'),
            slide4_desc: getFld('slide4_desc', 'Pan-tilt-zoom network dome security camera with optical zoom, intelligent auto-tracking, and 360-degree high-definition coverage for large facilities.', 'Slide 4 Description', 'richtext'),
            ...bestImgs,
          };
          if (sec.fields.image_cctvproduct1) sec.fields.image_cctvproduct1.label = 'Slide 1 Image (4MP IP Camera)';
          if (sec.fields.image_cctvproduct2) sec.fields.image_cctvproduct2.label = 'Slide 2 Image (Outdoor Bullet Camera)';
          if (sec.fields.image_cctvproduct3) sec.fields.image_cctvproduct3.label = 'Slide 3 Image (8CH CCTV Kit)';
          if (sec.fields.image_cctvproduct4) sec.fields.image_cctvproduct4.label = 'Slide 4 Image (PTZ Dome Camera)';
        } else if (sec.sectionId === 'ultimatecctv') {
          sec.sectionName = 'The Ultimate CCTV & Surveillance Solutions';
          const ultImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) ultImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) ultImgs[k] = { ...ultImgs[k], ...v };
          }
          const ultTop = getFld('heading', 'THE ULTIMATE SOLUTION FOR', 'Section Heading');
          const ultHighlight = getFld('heading_highlight', 'CCTV & SURVEILLANCE SYSTEMS', 'Highlighted Ribbon Heading');
          if (ultTop.value && ultHighlight.value && ultTop.value.includes(ultHighlight.value)) {
            ultTop.value = ultTop.value.replace(ultHighlight.value, '').replace(/\s+/g, ' ').trim();
          }
          sec.fields = {
            heading: ultTop,
            heading_highlight: ultHighlight,
            card1_title: getFld('card1_title', 'High-Definition Clarity & Night Vision', 'Card 1 Title'),
            card1_desc: getFld('card1_desc', 'Safeguard your commercial properties, offices, and warehouses with industry-leading CCTV security cameras. Featuring 4K resolution, ultra-low-light night vision, smart motion detection, and wide-angle surveillance.', 'Card 1 Description', 'richtext'),
            card2_title: getFld('card2_title', 'IP67 Weatherproof Durability', 'Card 2 Title'),
            card2_desc: getFld('card2_desc', 'Engineered specifically to endure extreme desert heat, humidity, and outdoor dust in Dubai and across the UAE. Rugged metal housing guarantees 24/7 continuous operation in challenging environments.', 'Card 2 Description', 'richtext'),
            card3_title: getFld('card3_title', 'Scalable NVR & Cloud Integration', 'Card 3 Title'),
            card3_desc: getFld('card3_desc', 'Easily expand your security infrastructure from standalone cameras to 32-channel enterprise NVR systems with remote cloud viewing, secure local backup, and encrypted mobile access.', 'Card 3 Description', 'richtext'),
            card4_title: getFld('card4_title', 'Wholesale Supply & SIRA-Compliant Tech', 'Card 4 Title'),
            card4_desc: getFld('card4_desc', 'We provide wholesale bulk pricing for security integrators, contractors, and businesses seeking approved, certified CCTV hardware with complete manufacturer guarantees.', 'Card 4 Description', 'richtext'),
            ...ultImgs,
          };
          if (sec.fields.image_cctvproductimg) sec.fields.image_cctvproductimg.label = 'Center Showcase Image (Surveillance System Kit)';
        } else if (sec.sectionId === 'allinonecctv') {
          sec.sectionName = 'All-in-One CCTV & Security Solutions';
          const allImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) allImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) allImgs[k] = { ...allImgs[k], ...v };
          }
          sec.fields = {
            banner_heading: getFld('banner_heading', 'ALL-IN-ONE CCTV & SECURITY SOLUTIONS', 'Banner Heading Ribbon'),
            commercial_heading: getFld('commercial_heading', 'For Commercial & Enterprise:', 'Commercial Subsection Heading'),
            commercial_btn_text: getFld('commercial_btn_text', 'Inquire Bulk Orders', 'Commercial Button Label'),
            commercial_btn_link: getFld('commercial_btn_link', '/contact-us', 'Commercial Button URL', 'url'),
            commercial_item1_title: getFld('commercial_item1_title', 'Hikvision 4MP IP Network Camera', 'Commercial Product 1 Title'),
            commercial_item2_title: getFld('commercial_item2_title', 'Hikvision Outdoor Bullet Camera', 'Commercial Product 2 Title'),
            commercial_item3_title: getFld('commercial_item3_title', 'XVIM 8CH 1080P DVR Surveillance Kit', 'Commercial Product 3 Title'),
            residential_heading: getFld('residential_heading', 'For Residential & Small Business:', 'Residential Subsection Heading'),
            residential_btn_text: getFld('residential_btn_text', 'Get Wholesale Price', 'Residential Button Label'),
            residential_btn_link: getFld('residential_btn_link', '/contact-us', 'Residential Button URL', 'url'),
            residential_item1_title: getFld('residential_item1_title', 'Hikvision PTZ Dome Security Camera', 'Residential Product 1 Title'),
            residential_item2_title: getFld('residential_item2_title', 'Hikvision Outdoor Night Vision', 'Residential Product 2 Title'),
            residential_item3_title: getFld('residential_item3_title', 'Hikvision Weatherproof Security Bullet', 'Residential Product 3 Title'),
            ...allImgs,
          };
          if (sec.fields.image_popular1) sec.fields.image_popular1.label = 'Product Image 1 (Hikvision 4MP IP Network Camera)';
          if (sec.fields.image_popular2) sec.fields.image_popular2.label = 'Product Image 2 (Hikvision Outdoor Bullet Camera)';
          if (sec.fields.image_popular3) sec.fields.image_popular3.label = 'Product Image 3 (XVIM 8CH 1080P DVR Kit)';
          if (sec.fields.image_popular4) sec.fields.image_popular4.label = 'Product Image 4 (Hikvision PTZ Dome Camera)';
          if (sec.fields.image_popular5) sec.fields.image_popular5.label = 'Product Image 5 (Hikvision Outdoor Night Vision)';
        } else if (sec.sectionId === 'cctvbrand') {
          sec.sectionName = 'Surveillance Brands We Deal';
          const brandImgs = {};
          for (const [k, v] of Object.entries(sec.fields || {})) {
            if (k.startsWith('image')) brandImgs[k] = v;
          }
          for (const [k, v] of Object.entries(dbSec?.fields || {})) {
            if (k.startsWith('image')) brandImgs[k] = { ...brandImgs[k], ...v };
          }
          sec.fields = {
            heading: getFld('heading', 'SURVEILLANCE BRANDS WE DEAL', 'Section Heading'),
            ...brandImgs,
          };
          if (sec.fields.image_background) sec.fields.image_background.label = 'Background Pattern Graphic';
          if (sec.fields.image_dahua) sec.fields.image_dahua.label = 'Brand Logo 1 (Dahua)';
          if (sec.fields.image_tplink) sec.fields.image_tplink.label = 'Brand Logo 2 (TP-Link Tapo)';
          if (sec.fields.image_intel) sec.fields.image_intel.label = 'Brand Logo 3 (Intel AI Surveillance)';
          if (sec.fields.image_dell) sec.fields.image_dell.label = 'Brand Logo 4 (Dell Enterprise Surveillance)';
          if (sec.fields.image_lenovo) sec.fields.image_lenovo.label = 'Brand Logo 5 (Lenovo Security Solutions)';
          if (sec.fields.image_asus) sec.fields.image_asus.label = 'Brand Logo 6 (Asus IoT)';
          if (sec.fields.image_hp) sec.fields.image_hp.label = 'Brand Logo 7 (HP Enterprise)';
          if (sec.fields.image_microsoft) sec.fields.image_microsoft.label = 'Brand Logo 8 (Microsoft Azure IoT)';
        } else if (sec.sectionId === 'cctvwhyfromus') {
          sec.sectionName = 'Why Buy Wholesale CCTV From Us';
          const cWhyTop = getFld('heading', 'Why Buy', 'Heading Prefix');
          const cWhyHighlight = getFld('heading_highlight', 'CCTV Systems in Wholesale', 'Heading Highlighted (Yellow)');
          const cWhyEnd = getFld('heading_end', 'From Us?', 'Heading Suffix');
          if (cWhyTop.value && cWhyHighlight.value && cWhyTop.value.includes(cWhyHighlight.value)) {
            cWhyTop.value = cWhyTop.value.replace(cWhyHighlight.value, '').replace(cWhyEnd.value || '', '').replace(/\s+/g, ' ').trim();
          }
          sec.fields = {
            heading: cWhyTop,
            heading_highlight: cWhyHighlight,
            heading_end: cWhyEnd,
            paragraph: getFld('paragraph', 'Crown Excel is a leading supplier of professional video surveillance equipment in Dubai. We supply security contractors, system integrators, and businesses across the UAE:', 'Overview Description', 'richtext'),
            feature1_title: getFld('feature1_title', 'High-Definition IP Security', 'Feature 1 Title'),
            feature1_desc: getFld('feature1_desc', 'Access crystal-clear 2MP, 4MP, and 4K cameras with advanced night vision, wide dynamic range, and smart AI tracking.', 'Feature 1 Description', 'richtext'),
            feature2_title: getFld('feature2_title', 'Official Brand Warranty', 'Feature 2 Title'),
            feature2_desc: getFld('feature2_desc', 'All surveillance cameras, NVRs, and accessories are backed by direct manufacturer warranty and local technical assistance.', 'Feature 2 Description', 'richtext'),
            feature3_title: getFld('feature3_title', 'Bulk Wholesale Pricing', 'Feature 3 Title'),
            feature3_desc: getFld('feature3_desc', 'Get unmatched tiered distributor pricing on bulk orders for Hikvision and Dahua security equipment in Dubai and the UAE.', 'Feature 3 Description', 'richtext'),
            feature4_title: getFld('feature4_title', 'Pre-Sales Technical Consultation', 'Feature 4 Title'),
            feature4_desc: getFld('feature4_desc', 'Our certified CCTV engineers assist you in specifying cameras, lenses, storage calculations, and network requirements for any project.', 'Feature 4 Description', 'richtext'),
          };
        }

        return sec;
      });

      // Preserve any custom sections manually added by the user in the CMS that contain actual content
      const customDbSections = existingSections.filter(
        s => !s.filePath && 
             !parsedSections.some(p => p.sectionId === s.sectionId || p.sectionName?.toLowerCase() === s.sectionName?.toLowerCase()) &&
             Object.values(s.fields || {}).some(f => f.value && f.value.toString().trim() !== '')
      );
      for (const customSec of customDbSections) {
        mergedSections.push({ ...customSec, order: mergedSections.length + 1 });
      }
    } else if (content && Array.isArray(content.sections)) {
      mergedSections = content.sections;
    }

    const responseContent = {
      sections: mergedSections,
      status: content?.status || 'draft',
      version: content?.version || 1,
    };
    if (content && content._id) {
      responseContent._id = content._id.toString();
    }

    return jsonResponse({
      content: responseContent,
      isNew: !content,
      templates: Object.entries(SECTION_TEMPLATES).map(([id, tmpl]) => ({
        id,
        name: tmpl.sectionName,
        fieldCount: Object.keys(tmpl.fields).length,
      })),
    });
  } catch (err) {
    console.error('GET /api/cms/content error:', err);
    try {
      fs.writeFileSync(path.join(process.cwd(), 'debug-api.log'), `ERROR: ${err.message}\nSTACK: ${err.stack}`, 'utf-8');
    } catch (logErr) {}
    return jsonResponse({ error: 'Failed to fetch content' }, 500);
  }
}

// POST /api/cms/content → Save page content
export async function POST(request) {
  try {
    const user = getUserFromRequest(request);
    if (!canModifyContent(user)) {
      return jsonResponse({ error: 'Access denied. Content Editor permission required.' }, 403);
    }
    const body = await request.json();
    const { routeId, path, websiteId = 'default', sections, status = 'draft' } = body;

    if (!routeId && !path) {
      return jsonResponse({ error: 'routeId or path required' }, 400);
    }

    const db = await getDb();
    const collection = db.collection('cms_page_content');
    const now = new Date().toISOString();

    const filter = { websiteId };
    if (routeId) {
      const ids = [routeId];
      if (ObjectId.isValid(routeId)) {
        ids.push(new ObjectId(routeId));
      }
      filter.routeId = { $in: ids };
    } else {
      filter.path = path;
    }

    const existing = await collection.findOne(filter);
    const version = existing ? (existing.version || 1) + 1 : 1;

    let finalPath = path;
    if (!finalPath && routeId) {
      try {
        const routeDoc = await db.collection('cms_routes').findOne({
          _id: ObjectId.isValid(routeId) ? new ObjectId(routeId) : routeId
        });
        if (routeDoc?.path) {
          finalPath = routeDoc.path;
        }
      } catch (rErr) {
        console.error('Failed to resolve route path:', rErr);
      }
    }

    const isDynamicPage = 
      finalPath === '/' || path === '/' || routeId === '6a2016a8a0608271b7524e94' ||
      finalPath === '/products/phones' || path === '/products/phones' || routeId === '6ae5c9a66688da764d5abb87' ||
      finalPath === '/products/cctv' || path === '/products/cctv' || routeId === '6ae5c9a56688da764d5abb86' ||
      finalPath === '/products/laptops' || path === '/products/laptops' || routeId === '6a2016aca0608271b7524ead' ||
      finalPath === '/products/pc' || path === '/products/pc' || routeId === '6a2016aca0608271b7524eae' ||
      finalPath === '/our-services/it-infrastructure' || path === '/our-services/it-infrastructure' || routeId === '6a2016aaa0608271b7524ea2' ||
      finalPath === '/our-services/it-hardware-supplier-and-distributor' || path === '/our-services/it-hardware-supplier-and-distributor' || routeId === '6aead11910c353706f75a8c3' ||
      finalPath === '/our-services/long/short-term-amc' || path === '/our-services/long/short-term-amc' || routeId === '6a2016aba0608271b7524ea3' ||
      finalPath === '/our-services/networking' || path === '/our-services/networking' || routeId === '6a2016aba0608271b7524ea4' ||
      finalPath === '/our-services/security-solutions' || path === '/our-services/security-solutions' || routeId === '6a2016aba0608271b7524ea5' ||
      finalPath === '/company/director-message' || path === '/company/director-message';

    // Update JSX files on disk with the new values (never for dynamic pages like homepage and laptops, which are rendered from DB)
    if (Array.isArray(sections) && !isDynamicPage) {
      try {
        updatePageFiles(sections);
        
        // Update originalValue to match the newly written value in files
        for (const section of sections) {
          for (const field of Object.values(section.fields || {})) {
            field.originalValue = field.value;
          }
        }
      } catch (fileErr) {
        console.error('Failed to update page component files:', fileErr);
      }
    }

    const contentData = {
      routeId: routeId || null,
      path: finalPath || null,
      websiteId,
      sections: Array.isArray(sections) ? sections : [],
      status,
      version,
      publishedAt: status === 'published' ? now : (existing?.publishedAt || null),
      updatedAt: now,
      createdAt: existing?.createdAt || now,
    };

    await collection.replaceOne(
      filter,
      contentData,
      { upsert: true }
    );

    await logActivity(request, 'update_content', finalPath || `Route ID: ${routeId}`, { status, version });

    // Trigger on-demand cache revalidation
    if (finalPath) {
      try {
        revalidatePath(finalPath);
        if (finalPath !== '/') {
          revalidatePath('/');
        }
      } catch (revalErr) {
        console.error('revalidatePath error in POST /api/cms/content:', revalErr);
      }
    }

    return jsonResponse({ ok: true, version });
  } catch (err) {
    console.error('POST /api/cms/content error:', err);
    return jsonResponse({ error: 'Failed to save content' }, 500);
  }
}

// PUT /api/cms/content → Add a section template to a page
export async function PUT(request) {
  try {
    const user = getUserFromRequest(request);
    if (!canModifyContent(user)) {
      return jsonResponse({ error: 'Access denied. Content Editor permission required.' }, 403);
    }
    const body = await request.json();
    const { routeId, path, websiteId = 'default', templateId, customName } = body;

    if (!templateId || !SECTION_TEMPLATES[templateId]) {
      return jsonResponse({ error: 'Invalid template ID' }, 400);
    }

    const template = SECTION_TEMPLATES[templateId];
    const newSection = {
      sectionId: `${templateId}_${Date.now()}`,
      sectionName: customName || template.sectionName,
      order: 0,
      fields: { ...template.fields },
    };

    const db = await getDb();
    const collection = db.collection('cms_page_content');

    const filter = { websiteId };
    if (routeId) {
      const ids = [routeId];
      if (ObjectId.isValid(routeId)) {
        ids.push(new ObjectId(routeId));
      }
      filter.routeId = { $in: ids };
    } else if (path) {
      filter.path = path;
    }

    const existing = await collection.findOne(filter);

    if (existing) {
      newSection.order = (existing.sections?.length || 0) + 1;
      await collection.updateOne(
        filter,
        {
          $push: { sections: newSection },
          $set: { updatedAt: new Date().toISOString() },
        }
      );
    } else {
      newSection.order = 1;
      await collection.insertOne({
        routeId: routeId || null,
        path: path || null,
        websiteId,
        sections: [newSection],
        status: 'draft',
        version: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    await logActivity(request, 'update_content', path || `Route ID: ${routeId}`, { action: 'add_section', sectionName: newSection.sectionName });

    return jsonResponse({ ok: true, section: newSection });
  } catch (err) {
    console.error('PUT /api/cms/content error:', err);
    return jsonResponse({ error: 'Failed to add section' }, 500);
  }
}
