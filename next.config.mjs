import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  compress: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      '@phosphor-icons/react',
      'phosphor-react',
      'hugeicons-react',
      'framer-motion',
      'lottie-react',
    ],
  },
  async redirects() {
    return [
      {
        source: '/laptop-wholesale-supplier-in-dubai-or-uae',
        destination: '/it-hardware-wholesale-supplier-in-dubai-or-uae',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/company/about-us',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/company/about-us',
        permanent: true,
      },
      {
        source: '/career',
        destination: '/company/career',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/company/career',
        permanent: true,
      },
      {
        source: '/about-us/career',
        destination: '/company/career',
        permanent: true,
      },
      {
        source: '/company-history',
        destination: '/company/company-history',
        permanent: true,
      },
      {
        source: '/history',
        destination: '/company/company-history',
        permanent: true,
      },
      {
        source: '/director-message',
        destination: '/company/director-message',
        permanent: true,
      },
      {
        source: '/events',
        destination: '/company/events',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/company/faq',
        permanent: true,
      },
      {
        source: '/faqs',
        destination: '/company/faq',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/products/laptops',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/our-services',
        permanent: true,
      },
      {
        source: '/management',
        destination: '/our-management',
        permanent: true,
      },
      {
        source: '/company/leader-team',
        destination: '/our-management',
        permanent: true,
      },
      {
        source: '/our-services/amc',
        destination: '/our-services/long/short-term-amc',
        permanent: true,
      },
      {
        source: '/products/phones-cctv',
        destination: '/products/phones',
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: path.join(__dirname),
  },
  outputFileTracingExcludes: {
    '/api/**/*': [
      'node_modules/lucide-react/**/*',
      'node_modules/react-icons/**/*',
      'node_modules/@phosphor-icons/**/*',
      'node_modules/hugeicons-react/**/*',
      'node_modules/swiper/**/*',
      'node_modules/framer-motion/**/*',
      'node_modules/lottie-react/**/*',
      'node_modules/@hcaptcha/**/*',
      'node_modules/react-google-recaptcha/**/*',
      'node_modules/react-google-recaptcha-v3/**/*',
      'src/Components/**/*',
      'src/app/_components/**/*',
    ],
  },
};

export default nextConfig;

