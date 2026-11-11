import React from 'react';
import WholesaleLandingPageClient from './WholesaleLandingPageClient';

export const metadata = {
  title: 'Wholesale Landing Page Products | Crown Excel Admin',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function WholesaleLandingPageAdmin() {
  return <WholesaleLandingPageClient />;
}

