/**
 * CMS Frontend Integration Helper
 * 
 * Use this in your page server components to fetch CMS content and SEO data.
 * CMS data is an overlay — if it exists, it overrides defaults. If not, originals render.
 * 
 * Usage:
 *   import { getCmsData, getCmsSeo, getCmsContent } from '@/lib/cms-fetch';
 *   
 *   export default async function Page() {
 *     const cms = await getCmsData('/products/laptops');
 *     return <h1>{cms.content?.hero?.heading || "Default Heading"}</h1>;
 *   }
 *   
 *   export async function generateMetadata() {
 *     const seo = await getCmsSeo('/products/laptops');
 *     return {
 *       title: seo.metaTitle || 'Default Title',
 *       description: seo.metaDescription || 'Default description',
 *     };
 *   }
 */

import { getDb } from '@/lib/mongodb';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';

/**
 * Fetch CMS SEO data directly from DB
 */
async function fetchCmsSeoFromDb(path, websiteId = 'default') {
  try {
    if (!path) return null;
    const db = await getDb();
    const cleanPath = path.trim();
    const withoutTrailing = cleanPath.length > 1 && cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
    const withTrailing = withoutTrailing === '/' ? '/' : withoutTrailing + '/';

    // 1. Search directly by path
    let seo = await db.collection('cms_seo').findOne({
      path: { $in: [cleanPath, withoutTrailing, withTrailing] },
      websiteId,
    });

    if (!seo) {
      // 2. Search via routeId in cms_routes
      const route = await db.collection('cms_routes').findOne({
        path: { $in: [cleanPath, withoutTrailing, withTrailing] },
        websiteId,
      });

      if (route) {
        const routeIdStr = route._id.toString();
        seo = await db.collection('cms_seo').findOne({
          $or: [
            { routeId: routeIdStr },
            { routeId: route._id }
          ],
          websiteId,
        });
      }
    }
    return seo ? JSON.parse(JSON.stringify(seo)) : null;
  } catch (err) {
    console.error(`getCmsSeo error for ${path}:`, err);
    return null;
  }
}

/**
 * Fetch CMS page content directly from DB
 */
async function fetchCmsContentFromDb(path, websiteId = 'default') {
  try {
    if (!path && path !== '') return null;
    const db = await getDb();
    const cleanPath = path ? path.trim() : '/';
    const withoutTrailing = cleanPath.length > 1 && cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
    const withTrailing = withoutTrailing === '/' ? '/' : withoutTrailing + '/';

    // 1. Search directly by path
    let content = await db.collection('cms_page_content').findOne({
      path: { $in: [cleanPath, withoutTrailing, withTrailing] },
      websiteId,
      status: 'published', // Only fetch published content
    });

    if (!content) {
      // 2. Search via routeId in cms_routes
      const route = await db.collection('cms_routes').findOne({
        path: { $in: [cleanPath, withoutTrailing, withTrailing] },
        websiteId,
      });

      if (route) {
        const routeIdStr = route._id.toString();
        content = await db.collection('cms_page_content').findOne({
          $or: [
            { routeId: routeIdStr },
            { routeId: route._id }
          ],
          websiteId,
          status: 'published',
        });

        // Fallback to any content if not explicitly marked published
        if (!content) {
          content = await db.collection('cms_page_content').findOne({
            $or: [
              { routeId: routeIdStr },
              { routeId: route._id },
              { path: { $in: [cleanPath, withoutTrailing, withTrailing] } }
            ],
            websiteId,
          });
        }
      } else {
        // Fallback search without published restriction
        content = await db.collection('cms_page_content').findOne({
          path: { $in: [cleanPath, withoutTrailing, withTrailing] },
          websiteId,
        });
      }
    }

    if (!content) return null;

    // Convert sections array to a keyed object for easy access
    const sections = {};
    for (const section of content.sections || []) {
      const key = section.sectionId?.split('_')[0]?.toLowerCase() || 
                  section.sectionName?.toLowerCase().replace(/\s+/g, '_') || 
                  `section_${section.order}`;
      const fields = {};
      for (const [fieldKey, field] of Object.entries(section.fields || {})) {
        fields[fieldKey] = (field && typeof field === 'object' && field.value !== undefined) ? field.value : field;
      }
      const secObj = {
        name: section.sectionName,
        fields,
        raw: section.fields,
      };
      sections[key] = secObj;

      // Smart hero aliases
      if (key === 'smartsolutions' && !sections.hero) {
        sections.hero = secObj;
      } else if (key === 'hero' && !sections.smartsolutions) {
        sections.smartsolutions = secObj;
      } else if (key === 'directormessage' && !sections.main) {
        sections.main = secObj;
      } else if (key === 'main' && !sections.directormessage) {
        sections.directormessage = secObj;
      }
    }

    const result = {
      sections,
      status: content.status,
      version: content.version,
      updatedAt: content.updatedAt,
    };
    return JSON.parse(JSON.stringify(result));
  } catch (err) {
    console.error(`getCmsContent error for ${path}:`, err);
    return null;
  }
}

/**
 * Fetch CMS SEO data for a given path (cached & deduplicated)
 */
export const getCmsSeo = cache(async (path, websiteId = 'default') => {
  if (!path) return null;
  const cleanPath = path.trim();
  const cachedFn = unstable_cache(
    () => fetchCmsSeoFromDb(cleanPath, websiteId),
    [`cms-seo-${cleanPath}-${websiteId}`],
    { revalidate: 86400, tags: ['cms', 'cms-seo'] }
  );
  return await cachedFn();
});

/**
 * Fetch CMS page content for a given path (cached & deduplicated)
 */
export const getCmsContent = cache(async (path, websiteId = 'default') => {
  if (!path && path !== '') return null;
  const cleanPath = path ? path.trim() : '/';
  const cachedFn = unstable_cache(
    () => fetchCmsContentFromDb(cleanPath, websiteId),
    [`cms-content-${cleanPath}-${websiteId}`],
    { revalidate: 86400, tags: ['cms', 'cms-content'] }
  );
  return await cachedFn();
});

/**
 * Fetch both CMS content and SEO data in one call (deduplicated)
 */
export const getCmsData = cache(async (path, websiteId = 'default') => {
  const [content, seo] = await Promise.all([
    getCmsContent(path, websiteId),
    getCmsSeo(path, websiteId),
  ]);

  return { content, seo };
});

/**
 * Generate Next.js metadata from CMS SEO data
 * Merges CMS data with defaults, CMS values override defaults
 * 
 * @param {string} path - Route path
 * @param {Object} defaults - Default metadata
 * @param {string} websiteId - Website ID
 * @returns {Object} Next.js metadata object
 */
export async function generateCmsMetadata(path, defaults = {}, websiteId = 'default') {
  const seo = await getCmsSeo(path, websiteId);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.crownexcel.ae';
  const defaultOgImageUrl = `${siteUrl}/og-image.jpg`;

  const cleanPath = path === '/' ? '' : (path.startsWith('/') ? path : '/' + path);
  let canonicalToUse = null;
  if (seo?.canonicalUrl && typeof seo.canonicalUrl === 'string' && seo.canonicalUrl.trim()) {
    canonicalToUse = seo.canonicalUrl.trim();
  } else if (defaults?.alternates?.canonical) {
    canonicalToUse = defaults.alternates.canonical;
  } else {
    canonicalToUse = `${siteUrl}${cleanPath}`;
  }

  if (canonicalToUse) {
    if (!canonicalToUse.startsWith('http://') && !canonicalToUse.startsWith('https://')) {
      const cleanRel = canonicalToUse.startsWith('/') ? canonicalToUse : '/' + canonicalToUse;
      canonicalToUse = `${siteUrl}${cleanRel}`;
    }
  }

  const title = seo?.metaTitle || defaults.title || 'Crown Excel | IT Hardware and Solutions in Dubai';
  const description =
    seo?.metaDescription ||
    defaults.description ||
    'Crown Excel provides IT hardware, infrastructure, networking, and managed technology solutions for businesses in Dubai and the UAE.';

  // Open Graph Image resolution
  const rawOgImage =
    seo?.openGraph?.image ||
    defaults?.openGraph?.images?.[0]?.url ||
    defaults?.openGraph?.images?.[0] ||
    defaultOgImageUrl;

  let ogImageUrl = typeof rawOgImage === 'string' ? rawOgImage : (rawOgImage?.url || defaultOgImageUrl);
  if (!ogImageUrl.startsWith('http://') && !ogImageUrl.startsWith('https://')) {
    const cleanRel = ogImageUrl.startsWith('/') ? ogImageUrl : '/' + ogImageUrl;
    ogImageUrl = `${siteUrl}${cleanRel}`;
  }

  const isPng = ogImageUrl.toLowerCase().endsWith('.png');

  const baseOpenGraph = {
    title: seo?.openGraph?.title || title,
    description: seo?.openGraph?.description || description,
    url: seo?.openGraph?.url || canonicalToUse,
    siteName: seo?.openGraph?.siteName || defaults?.openGraph?.siteName || 'Crown Excel',
    type: seo?.openGraph?.type || defaults?.openGraph?.type || 'website',
    locale: seo?.openGraph?.locale || defaults?.openGraph?.locale || 'en_AE',
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: seo?.openGraph?.title || title,
        type: isPng ? 'image/png' : 'image/jpeg',
      },
    ],
  };

  // Twitter Image resolution
  const rawTwitterImage =
    seo?.twitterCard?.image ||
    defaults?.twitter?.images?.[0] ||
    ogImageUrl;
  let twitterImageUrl = typeof rawTwitterImage === 'string' ? rawTwitterImage : (rawTwitterImage?.url || ogImageUrl);
  if (!twitterImageUrl.startsWith('http://') && !twitterImageUrl.startsWith('https://')) {
    const cleanRel = twitterImageUrl.startsWith('/') ? twitterImageUrl : '/' + twitterImageUrl;
    twitterImageUrl = `${siteUrl}${cleanRel}`;
  }

  const baseTwitter = {
    card: seo?.twitterCard?.cardType || defaults?.twitter?.card || 'summary_large_image',
    title: seo?.twitterCard?.title || title,
    description: seo?.twitterCard?.description || description,
    images: [twitterImageUrl],
  };

  if (!seo) {
    return {
      ...defaults,
      title,
      description,
      alternates: {
        canonical: canonicalToUse,
        ...(defaults.alternates || {}),
      },
      openGraph: {
        ...baseOpenGraph,
        ...(defaults.openGraph || {}),
      },
      twitter: {
        ...baseTwitter,
        ...(defaults.twitter || {}),
      },
    };
  }

  // Base metadata merging defaults with CMS SEO
  const metadata = {
    ...defaults,
    title,
    description,
    alternates: { canonical: canonicalToUse },
  };

  // Keywords: CMS takes precedence; fall back to defaults
  if (seo.metaKeywords) {
    if (Array.isArray(seo.metaKeywords) && seo.metaKeywords.length > 0) {
      metadata.keywords = seo.metaKeywords;
    } else if (typeof seo.metaKeywords === 'string' && seo.metaKeywords.trim()) {
      metadata.keywords = seo.metaKeywords.split(',').map(k => k.trim()).filter(Boolean);
    }
  } else if (defaults.keywords) {
    metadata.keywords = defaults.keywords;
  }

  // Robots
  if (seo.robots) {
    metadata.robots = {
      index: seo.robots.index !== false,
      follow: seo.robots.follow !== false,
      noarchive: seo.robots.noArchive || false,
      nosnippet: seo.robots.noSnippet || false,
    };
  }

  metadata.openGraph = baseOpenGraph;
  metadata.twitter = baseTwitter;

  return metadata;
}
