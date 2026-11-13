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
  });
}

export default async function Home() {
  const { content } = await getCmsData('/');
  return <Page cmsContent={content} />;
}
