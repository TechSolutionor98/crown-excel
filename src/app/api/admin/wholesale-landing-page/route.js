import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { DEFAULT_WHOLESALE_PRODUCTS } from '@/lib/wholesaleProductsSeed';

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

// GET /api/admin/wholesale-landing-page → Fetch all wholesale landing page products
export async function GET(request) {
  try {
    const db = await getDb();
    const collection = db.collection('wholesale_products');

    const count = await collection.countDocuments();
    if (count === 0) {
      // Auto-seed initial 28 products
      const now = new Date().toISOString();
      const seedDocs = DEFAULT_WHOLESALE_PRODUCTS.map((prod, idx) => ({
        ...prod,
        order: prod.order || idx + 1,
        isActive: prod.isActive !== undefined ? prod.isActive : true,
        createdAt: now,
        updatedAt: now,
      }));
      await collection.insertMany(seedDocs);
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }

    const products = await collection
      .find(filter)
      .sort({ category: 1, order: 1, _id: 1 })
      .toArray();

    const normalized = products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }));

    return jsonResponse({
      ok: true,
      products: normalized,
      total: normalized.length,
    });
  } catch (err) {
    console.error('GET /api/admin/wholesale-landing-page error:', err);
    return jsonResponse({ error: 'Failed to fetch wholesale products' }, 500);
  }
}

// POST /api/admin/wholesale-landing-page → Add new product card
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      category,
      name,
      brand = '',
      description = '',
      particular = '',
      barcode = '',
      image = '',
      imageClassName = 'scale-[1.05]',
      order = 999,
      isActive = true,
    } = body;

    if (!category || !name) {
      return jsonResponse({ error: 'Category and Product Name are required' }, 400);
    }

    const db = await getDb();
    const collection = db.collection('wholesale_products');
    const now = new Date().toISOString();

    const newProduct = {
      category: category.trim(),
      name: name.trim(),
      brand: brand.trim(),
      description: description.trim(),
      particular: particular.trim() || `${name.trim()} (${description.trim()})`,
      barcode: barcode.trim(),
      image: image.trim(),
      imageClassName: imageClassName || 'scale-[1.05]',
      order: Number(order) || 1,
      isActive: Boolean(isActive),
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(newProduct);

    try {
      revalidatePath('/it-hardware-wholesale-supplier-in-dubai-or-uae');
    } catch (e) {
      // ignore
    }

    return jsonResponse({
      ok: true,
      product: { ...newProduct, _id: result.insertedId.toString() },
    });
  } catch (err) {
    console.error('POST /api/admin/wholesale-landing-page error:', err);
    return jsonResponse({ error: 'Failed to create product' }, 500);
  }
}

// PUT /api/admin/wholesale-landing-page → Edit / Update existing product card
export async function PUT(request) {
  try {
    const body = await request.json();
    const { _id, ...updateFields } = body;

    if (!_id) {
      return jsonResponse({ error: 'Product _id is required' }, 400);
    }

    const db = await getDb();
    const collection = db.collection('wholesale_products');
    const now = new Date().toISOString();

    const allowed = {};
    if (updateFields.category !== undefined) allowed.category = updateFields.category.trim();
    if (updateFields.name !== undefined) allowed.name = updateFields.name.trim();
    if (updateFields.brand !== undefined) allowed.brand = updateFields.brand.trim();
    if (updateFields.description !== undefined) allowed.description = updateFields.description.trim();
    if (updateFields.particular !== undefined) allowed.particular = updateFields.particular.trim();
    if (updateFields.barcode !== undefined) allowed.barcode = updateFields.barcode.trim();
    if (updateFields.image !== undefined) allowed.image = updateFields.image.trim();
    if (updateFields.imageClassName !== undefined) allowed.imageClassName = updateFields.imageClassName;
    if (updateFields.order !== undefined) allowed.order = Number(updateFields.order);
    if (updateFields.isActive !== undefined) allowed.isActive = Boolean(updateFields.isActive);
    allowed.updatedAt = now;

    let filter;
    try {
      filter = { _id: new ObjectId(_id) };
    } catch {
      filter = { _id };
    }

    const result = await collection.updateOne(filter, { $set: allowed });

    try {
      revalidatePath('/it-hardware-wholesale-supplier-in-dubai-or-uae');
    } catch (e) {
      // ignore
    }

    return jsonResponse({ ok: true, modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error('PUT /api/admin/wholesale-landing-page error:', err);
    return jsonResponse({ error: 'Failed to update product' }, 500);
  }
}

// DELETE /api/admin/wholesale-landing-page?id=... → Delete product card
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return jsonResponse({ error: 'Product id parameter is required' }, 400);
    }

    const db = await getDb();
    const collection = db.collection('wholesale_products');

    let filter;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { _id: id };
    }

    const result = await collection.deleteOne(filter);

    try {
      revalidatePath('/it-hardware-wholesale-supplier-in-dubai-or-uae');
    } catch (e) {
      // ignore
    }

    return jsonResponse({ ok: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error('DELETE /api/admin/wholesale-landing-page error:', err);
    return jsonResponse({ error: 'Failed to delete product' }, 500);
  }
}

