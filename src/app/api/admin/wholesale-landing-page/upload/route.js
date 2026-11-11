import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Cloudinary config
cloudinary.v2.config({
  cloud_name: 'dqghun7oj',
  api_key: '281487587427693',
  api_secret: 'bxbrN76auL9pNUINMVdKJwqv6Uo',
});

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400, headers: CORS_HEADERS });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'wholesale-products',
        },
        (error, res) => {
          if (error) return reject(error);
          resolve(res);
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json(
      { ok: true, url: result.secure_url },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error('Wholesale product image upload error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to upload image' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

