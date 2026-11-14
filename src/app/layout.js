import { Geist, Geist_Mono, Montserrat, Mulish, Anton } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/Components/Layout/LayoutShell";
import { getDb } from "@/lib/mongodb";
import CustomScripts from "@/Components/Layout/CustomScripts";
import { Suspense } from "react";
import AnalyticsTracker from "@/Components/Layout/AnalyticsTracker";
import { unstable_cache } from "next/cache";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton-font",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.crownexcel.ae"),
  title: {
    default: "Crown Excel | IT Hardware and Solutions in Dubai",
    template: "%s | Crown Excel",
  },
  description:
    "Crown Excel provides IT hardware, infrastructure, networking, and managed technology solutions for businesses in Dubai and the UAE.",
};

const getCachedWebsiteData = unstable_cache(
  async () => {
    let settings = null;
    let inactiveRoutes = [];
    try {
      const db = await getDb();
      settings = await db.collection("settings").findOne({ _id: "website_settings" });
      const inactiveDocs = await db.collection("cms_routes").find({ status: "inactive" }, { projection: { path: 1 } }).toArray();
      inactiveRoutes = inactiveDocs.map(d => d.path).filter(Boolean);
    } catch (err) {
      console.error("Failed to load settings in RootLayout:", err);
    }
    return {
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      inactiveRoutes,
    };
  },
  ['website-settings-and-routes'],
  { revalidate: 86400, tags: ['settings', 'routes'] }
);

export default async function RootLayout({ children }) {
  const { settings, inactiveRoutes } = await getCachedWebsiteData();
  const gaId = settings?.googleAnalyticsId || "G-VFS3Y19LDP";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager / Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtm.js?id=${gaId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        style={{ backgroundColor: "white" }}
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${mulish.variable} ${anton.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        {settings?.googleTagManagerId && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=${settings.googleTagManagerId}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `
            }}
          />
        )}

        {/* Facebook Pixel (noscript) */}
        {settings?.facebookPixelId && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${settings.facebookPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}

        {/* Dynamic tracking pixel script loader and transition tracker */}
        <Suspense fallback={null}>
          <AnalyticsTracker settings={settings} />
        </Suspense>

        {/* Client side custom head & body scripts injector */}
        <CustomScripts settings={settings} />

        <LayoutShell initialInactiveRoutes={inactiveRoutes}>{children}</LayoutShell>
      </body>
    </html>
  );
}
