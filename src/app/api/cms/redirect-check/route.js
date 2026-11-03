import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
    },
  });
}

// GET /api/cms/redirect-check?path=... → Check if there is a matching redirect path
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const path = url.searchParams.get('path');
    const websiteId = url.searchParams.get('websiteId') || 'default';

    if (!path) {
      return jsonResponse({ error: 'path param is required' }, 400);
    }

    // Normalize path by removing trailing slash (unless it is '/')
    const normalizedPath = path.replace(/\/+$/, '') || '/';

    const db = await getDb();

    // 1. Check if the page route is marked inactive in cms_routes
    let routeDoc = await db.collection('cms_routes').findOne({
      path: normalizedPath,
      websiteId,
    });

    if (!routeDoc && normalizedPath.startsWith('/blogs/')) {
      routeDoc = await db.collection('cms_routes').findOne({
        path: { $in: ['/blogs/[...slug]', '/blogs/[slug]'] },
        websiteId,
      });
    }

    if (routeDoc && routeDoc.status === 'inactive') {
      return jsonResponse({
        inactive: true,
        redirect: null,
      });
    }

    // 2. Find an active redirect rule for this path
    const collection = db.collection('cms_redirects');
    const redirect = await collection.findOne({
      fromPath: normalizedPath,
      websiteId,
      status: 'active',
    });

    if (redirect) {
      return jsonResponse({
        inactive: false,
        redirect: {
          fromPath: redirect.fromPath,
          toPath: redirect.toPath,
          type: redirect.type,
        }
      });
    }

    // 3. Fallback: If path matches a published blog post slug (e.g. /my-slug -> /blogs/my-slug)
    if (!normalizedPath.startsWith('/blogs')) {
      const cleanSlug = normalizedPath.replace(/^\/+|\/+$/g, '');
      if (cleanSlug) {
        const blogMatch = await db.collection('cms_blogs').findOne({
          slug: { $in: [cleanSlug, `${cleanSlug}/`] },
          published: true,
        });
        if (blogMatch) {
          const matchSlug = (blogMatch.slug || '').replace(/^\/+|\/+$/g, '');
          return jsonResponse({
            inactive: false,
            redirect: {
              fromPath: normalizedPath,
              toPath: `/blogs/${matchSlug}`,
              type: '301',
            }
          });
        }
      }
    }

    return jsonResponse({ inactive: false, redirect: null });
  } catch (err) {
    console.error('GET /api/cms/redirect-check error:', err);
    return jsonResponse({ error: 'Failed to verify redirect' }, 500);
  }
}
