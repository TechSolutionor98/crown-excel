const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://admin:admin@cluster0.ac1fznk.mongodb.net';
const client = new MongoClient(uri);

async function updateDb() {
  await client.connect();
  const db = client.db('crownexceladmin');
  
  // 1. Update /
  const res1 = await db.collection('cms_seo').updateOne(
    { path: '/' },
    { $set: { 'openGraph.image': 'https://www.crownexcel.ae/og-image.jpg', updatedAt: new Date().toISOString() } }
  );
  console.log('Updated /:', res1.modifiedCount);

  // 2. Also check if any other seo records have empty or logo.png openGraph.image
  const allSeo = await db.collection('cms_seo').find({}).toArray();
  for (const s of allSeo) {
    if (!s.openGraph?.image || s.openGraph.image === 'https://www.crownexcel.ae/logo.png') {
      await db.collection('cms_seo').updateOne(
        { _id: s._id },
        { $set: { 'openGraph.image': 'https://www.crownexcel.ae/og-image.jpg', updatedAt: new Date().toISOString() } }
      );
      console.log(`Updated path ${s.path} to og-image.jpg`);
    }
  }

  await client.close();
}

updateDb().catch(console.error);
