import Page from "./_components/page";
import { getCmsData, generateCmsMetadata } from "@/lib/cms-fetch";

export const revalidate = 86400;

export async function generateMetadata() {
  return await generateCmsMetadata('/', {
    title: 'Crown Excel | IT Hardware and Solutions in Dubai',
    description: 'Crown Excel provides IT hardware, infrastructure, networking, and managed technology solutions for businesses in Dubai and the UAE.',
    alternates: {
      canonical: 'https://www.crownexcel.ae/',
    },
    openGraph: {
      title: 'Crown Excel | IT Hardware and Solutions in Dubai',
      description: 'Crown Excel provides IT hardware, infrastructure, networking, and managed technology solutions for businesses in Dubai and the UAE.',
      url: 'https://www.crownexcel.ae/',
      siteName: 'Crown Excel',
      locale: 'en_AE',
      type: 'website',
      images: [
        {
          url: 'https://www.crownexcel.ae/og-image.jpg',
          secureUrl: 'https://www.crownexcel.ae/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Crown Excel - IT Hardware and Enterprise Solutions in Dubai & UAE',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Crown Excel | IT Hardware and Solutions in Dubai',
      description: 'Crown Excel provides IT hardware, infrastructure, networking, and managed technology solutions for businesses in Dubai and the UAE.',
      images: ['https://www.crownexcel.ae/og-image.jpg'],
    },
  });
}

export default async function Home() {
  const { content } = await getCmsData('/');
  return <Page cmsContent={content} />;
}
