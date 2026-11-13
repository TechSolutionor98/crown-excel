import AppointmentLinksView from './AppointmentLinksView';
import { getDb } from '@/lib/mongodb';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export async function generateMetadata() {
  return await generateCmsMetadata('/appointments', {
    title: 'Book an Appointment - Crown Excel',
    description: 'Schedule an appointment with Crown Excel using our easy online booking system powered by Google Calendar.',
  });
}

export const revalidate = 86400;

export default async function AppointmentsPublicPage() {
  let links = [];

  try {
    const db = await getDb();
    const docs = await db.collection('appointment_links').find({ active: { $ne: false } }).toArray();
    links = docs.map(d => ({
      _id: d._id.toString(),
      title: d.title || '',
      url: d.url || '',
      active: d.active !== false,
    }));
  } catch (err) {
    console.error('Error fetching appointment links:', err);
  }

  return <AppointmentLinksView links={links} />;
}
