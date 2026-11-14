"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export default function AnalyticsTracker({ settings }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathRef = useRef("");

  const isAdminRoute = pathname?.startsWith("/admin");
  const gaId = settings?.googleAnalyticsId || "G-VFS3Y19LDP";

  useEffect(() => {
    // Only track if we are NOT on an admin route
    if (isAdminRoute) return;

    // Build the full path
    const searchString = searchParams?.toString();
    const currentPath = pathname + (searchString ? `?${searchString}` : "");

    // Avoid double tracking on initialization if already fired
    if (prevPathRef.current === currentPath) return;
    prevPathRef.current = currentPath;

    // Track Facebook Pixel PageView
    if (settings?.facebookPixelId && typeof window !== "undefined" && window.fbq) {
      try {
        window.fbq("track", "PageView");
      } catch (err) {
        console.error("Facebook Pixel tracking error:", err);
      }
    }

    // Track Google Analytics 4 PageView on route navigation
    if (gaId && typeof window !== "undefined" && window.gtag) {
      try {
        window.gtag("config", gaId, {
          page_path: currentPath,
        });
      } catch (err) {
        console.error("Google Analytics tracking error:", err);
      }
    }

    // Track Google Tag Manager Custom Pageview Event
    if (settings?.googleTagManagerId && typeof window !== "undefined" && window.dataLayer) {
      try {
        window.dataLayer.push({
          event: "pageview",
          page: currentPath,
        });
      } catch (err) {
        console.error("Google Tag Manager dataLayer push error:", err);
      }
    }
  }, [pathname, searchParams, settings, isAdminRoute, gaId]);

  // If on admin route, don't inject tracking scripts
  if (isAdminRoute) return null;

  return (
    <>
      {/* Google Tag Manager Script */}
      {settings?.googleTagManagerId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${settings.googleTagManagerId}');
            `,
          }}
        />
      )}

      {/* Facebook Pixel Script */}
      {settings?.facebookPixelId && (
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${settings.facebookPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  );
}
