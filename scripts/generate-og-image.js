const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generate() {
  const footerLogoPath = path.join(__dirname, '../src/Components/Images/footerlogo.png');
  const footerLogoBuf = fs.readFileSync(footerLogoPath);
  
  // Resize logo for inclusion in Open Graph image
  const resizedLogo = await sharp(footerLogoBuf)
    .resize({ height: 110, fit: 'inside' })
    .toBuffer();
  
  const base64Logo = resizedLogo.toString('base64');
  
  const svg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#031a14" />
        <stop offset="50%" stop-color="#084032" />
        <stop offset="100%" stop-color="#0d5946" />
      </linearGradient>
      <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FF7A00" />
        <stop offset="100%" stop-color="#FFA800" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(22, 202, 154, 0.08)" stroke-width="1" />
      </pattern>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="60" result="blur" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bgGrad)" />
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Ambient glowing accents -->
    <circle cx="1100" cy="100" r="280" fill="#16CA9A" opacity="0.25" filter="url(#glow)" />
    <circle cx="120" cy="540" r="240" fill="#119472" opacity="0.3" filter="url(#glow)" />
    <circle cx="950" cy="500" r="180" fill="#FF7A00" opacity="0.12" filter="url(#glow)" />

    <!-- Top Badge -->
    <g transform="translate(80, 65)">
      <rect width="375" height="40" rx="20" fill="rgba(22, 202, 154, 0.15)" stroke="rgba(22, 202, 154, 0.4)" stroke-width="1.5" />
      <circle cx="22" cy="20" r="6" fill="#16CA9A" />
      <text x="38" y="25" fill="#e6fffa" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" letter-spacing="1.2">LEADING IT HARDWARE SUPPLIER</text>
    </g>

    <!-- Logo -->
    <image href="data:image/png;base64,${base64Logo}" x="80" y="125" height="110" />

    <!-- Main Headline -->
    <text x="80" y="295" fill="#ffffff" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" letter-spacing="-0.5">
      IT Hardware &amp; Enterprise Solutions
    </text>
    <text x="80" y="348" fill="#16CA9A" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="700">
      Dubai &amp; UAE
    </text>

    <!-- Subtitle / Value proposition -->
    <text x="80" y="410" fill="#e2e8f0" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400">
      Servers • Laptops • Switches &amp; Routers • Workstations • Storage • Wholesale IT
    </text>

    <!-- Divider Line -->
    <line x1="80" y1="455" x2="1120" y2="455" stroke="rgba(255,255,255,0.15)" stroke-width="1" />

    <!-- Footer Features / Highlights -->
    <g transform="translate(80, 485)">
      <!-- Feature 1 -->
      <g transform="translate(0, 0)">
        <rect width="210" height="52" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
        <text x="20" y="32" fill="#ffffff" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600">✓ 100% Genuine IT</text>
      </g>
      <!-- Feature 2 -->
      <g transform="translate(230, 0)">
        <rect width="210" height="52" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
        <text x="20" y="32" fill="#ffffff" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600">✓ Wholesale Pricing</text>
      </g>
      <!-- Feature 3 -->
      <g transform="translate(460, 0)">
        <rect width="210" height="52" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
        <text x="20" y="32" fill="#ffffff" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600">✓ Fast UAE Delivery</text>
      </g>
    </g>

    <!-- Website URL badge in bottom-right -->
    <g transform="translate(860, 485)">
      <rect width="260" height="52" rx="26" fill="url(#goldAccent)" />
      <text x="130" y="32" fill="#042019" text-anchor="middle" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" letter-spacing="0.5">www.crownexcel.ae</text>
    </g>
  </svg>
  `;

  const svgBuf = Buffer.from(svg);
  const outPng = await sharp(svgBuf).png().toBuffer();
  // WhatsApp prefers JPEG under 300KB
  const outJpg = await sharp(svgBuf).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  
  console.log(`Generated PNG: ${outPng.length} bytes, JPEG: ${outJpg.length} bytes`);
  
  // Save to public/
  fs.writeFileSync(path.join(__dirname, '../public/og-image.jpg'), outJpg);
  fs.writeFileSync(path.join(__dirname, '../public/og-image.png'), outPng);
  
  // Also save as Next.js app metadata opengraph-image
  fs.writeFileSync(path.join(__dirname, '../src/app/opengraph-image.png'), outPng);
  fs.writeFileSync(path.join(__dirname, '../src/app/twitter-image.png'), outPng);

  // Also ensure logo.png is in public/ for any direct https://www.crownexcel.ae/logo.png requests
  const logoPngPath = path.join(__dirname, '../src/Components/Images/logo.png');
  if (fs.existsSync(logoPngPath)) {
    fs.copyFileSync(logoPngPath, path.join(__dirname, '../public/logo.png'));
    console.log('Copied src/Components/Images/logo.png to public/logo.png');
  }
}

generate()
  .then(() => console.log('Successfully generated Open Graph images'))
  .catch((err) => {
    console.error('Error generating image:', err);
    process.exit(1);
  });
