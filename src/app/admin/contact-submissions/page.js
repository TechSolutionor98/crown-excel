import React from 'react';
import ContactTableClient from './ContactTableClient';
import { getApiBase } from '@/lib/api-helper';

export const metadata = {
  title: 'Contact Submissions - Admin',
};
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactSubmissionsPage() {
  const apiBase = getApiBase();
  let submissions = [];

  try {
    const res = await fetch(`${apiBase}/api/contact-submissions`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.ok) {
      submissions = await res.json();
    } else {
      console.error('Failed to fetch contact submissions', res.status);
    }
  } catch (err) {
    console.error('Error fetching contact submissions', err);
  }

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#084032]">Inquiry Forms</h1>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-semibold text-gray-700">Total Inquiries:</span> {submissions.length}
          </p>
        </div>
      </div>
      <ContactTableClient initialData={submissions} apiBase={apiBase} />
    </div>
  );
}
