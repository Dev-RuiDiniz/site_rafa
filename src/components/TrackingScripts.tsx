"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Configurações de tracking por domínio
const TRACKING_CONFIG = {
  shr: {
    gtmId: "GTM-M4LJXG68",
    ga4Id: "G-Z2EQWFFMQC",
    metaPixelId: "1609509633385345",
  },
  maletti: {
    gtmId: "GTM-NHTPW27K",
    ga4Id: "G-SCQRQ9F9LD",
    metaPixelId: null, // Maletti não tem Meta Pixel por enquanto
    siteVerification: "SkrI3t5Q5vQ_OvnnTNksc-gx1nKisw0Gq0oANsuLvM0",
  },
};

export function TrackingScripts() {
  const [config, setConfig] = useState<typeof TRACKING_CONFIG.shr | typeof TRACKING_CONFIG.maletti | null>(null);
  const [isMaletti, setIsMaletti] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    const isMalettiDomain = hostname.includes("maletti");
    setIsMaletti(isMalettiDomain);
    setConfig(isMalettiDomain ? TRACKING_CONFIG.maletti : TRACKING_CONFIG.shr);
  }, []);

  if (!config) return null;

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${config.gtmId}');
          `,
        }}
      />

      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.ga4Id}');
          `,
        }}
      />

      {/* Meta Pixel - apenas para SHR (carrega após página completa) */}
      {!isMaletti && config.metaPixelId && (
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
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
              fbq('init', '${config.metaPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  );
}

export function TrackingNoscript() {
  const [config, setConfig] = useState<typeof TRACKING_CONFIG.shr | typeof TRACKING_CONFIG.maletti | null>(null);
  const [isMaletti, setIsMaletti] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    const isMalettiDomain = hostname.includes("maletti");
    setIsMaletti(isMalettiDomain);
    setConfig(isMalettiDomain ? TRACKING_CONFIG.maletti : TRACKING_CONFIG.shr);
  }, []);

  if (!config) return null;

  return (
    <>
      {/* GTM noscript */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${config.gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      {/* Meta Pixel noscript - apenas SHR */}
      {!isMaletti && config.metaPixelId && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${config.metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  );
}
