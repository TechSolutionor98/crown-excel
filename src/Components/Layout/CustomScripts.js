"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import React from "react";
import parse, { domToReact } from "html-react-parser";

export default function CustomScripts({ settings }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin || !settings) return null;

  // Options for html-react-parser to upgrade <script> to next/script
  const parseOptions = {
    replace: (domNode) => {
      if (domNode.name === "script") {
        const { src, id, async, defer, ...otherAttribs } = domNode.attribs || {};
        
        // Extract inner HTML if there is a text child
        let innerHTML = "";
        if (domNode.children && domNode.children.length > 0) {
          // Join text content of all children
          innerHTML = domNode.children.map(child => child.data).join("");
        }
        
        // Generate a stable key/id
        const scriptId = id || `custom-script-${Math.random().toString(36).substr(2, 9)}`;

        return (
          <Script
            key={scriptId}
            id={scriptId}
            src={src}
            async={async !== undefined ? true : undefined}
            defer={defer !== undefined ? true : undefined}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={innerHTML ? { __html: innerHTML } : undefined}
            {...otherAttribs}
          />
        );
      }
    }
  };

  // Filter active third-party apps
  const activeThirdPartyApps = settings.thirdPartyApps?.filter(app => app.active) || [];
  
  // Combine custom scripts with third-party app scripts
  const combinedHeadScript = [
    settings.customHeadScript || '',
    settings.googleTagManagerHeadCode || '',
    settings.facebookPixelHeadCode || '',
    ...activeThirdPartyApps.map(app => app.headCode || '')
  ].filter(Boolean).join('\n');

  const combinedBodyScript = [
    settings.customBodyScript || '',
    settings.googleAnalyticsBodyCode || '',
    settings.googleTagManagerBodyCode || '',
    settings.facebookPixelBodyCode || '',
    ...activeThirdPartyApps.map(app => app.bodyCode || '')
  ].filter(Boolean).join('\n');

  return (
    <>
      {combinedHeadScript.trim() && parse(combinedHeadScript, parseOptions)}
      {combinedBodyScript.trim() && parse(combinedBodyScript, parseOptions)}
    </>
  );
}
