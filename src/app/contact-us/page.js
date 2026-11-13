import React from 'react';
import ContactUsPageBanner from '../_components/ContactUsPage/ContactUsPageBanner/ContactUsPageBanner';
import ContactUsForm from '../_components/ContactUsPage/ContactUsForm/ContactUsForm';
import ContactUsMap from '../_components/ContactUsPage/ContactUsMap/ContactUsMap';
import AppointmentSection from '../_components/ContactUsPage/AppointmentSection/AppointmentSection';
import { getDb } from '@/lib/mongodb';
import { generateCmsMetadata } from '@/lib/cms-fetch';

export async function generateMetadata() {
  return await generateCmsMetadata('/contact-us', {
    title: 'Contact Us | Crown Excel',
    description: 'Get in touch with Crown Excel for IT hardware, server support, networking solutions, and tech inquiries in Dubai and UAE.',
  });
}

// Enable Incremental Static Regeneration (ISR) to deliver instant HTML (0ms - 20ms TTFB)
export const revalidate = 86400;

const ContactUs = async () => {
  let appointmentLinks = [];

  try {
    const db = await getDb();
    const docs = await db.collection('appointment_links').find({ active: { $ne: false } }).toArray();
    appointmentLinks = docs.map(d => ({
      _id: d._id.toString(),
      title: d.title || '',
      url: d.url || '',
      active: d.active !== false,
    }));
  } catch (err) {
    console.error('Failed to fetch appointment links in ContactUs:', err);
  }

  return (
    <div>
      <ContactUsPageBanner />
      <ContactUsForm />
      <AppointmentSection links={appointmentLinks} />
      <ContactUsMap />
    </div>
  );
};

export default ContactUs;
