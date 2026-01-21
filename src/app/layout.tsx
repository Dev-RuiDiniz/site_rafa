import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { TrackingScripts, TrackingNoscript } from "@/components/TrackingScripts";
import { DynamicFavicon } from "@/components/DynamicFavicon";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SHR | Distribuidor Exclusivo Maletti no Brasil",
  description:
    "Somos o único distribuidor exclusivo da Maletti no Brasil. Conheça nossa linha completa de lavatórios, cadeiras e mobiliário para salões de beleza e spas.",
  keywords: [
    "Maletti",
    "SHR",
    "lavatórios",
    "salão de beleza",
    "mobiliário",
    "Heaven",
    "Shirobody",
    "Total Body",
    "Spa Garçon",
    "Vapomist",
  ],
  openGraph: {
    title: "SHR | Distribuidor Exclusivo Maletti no Brasil",
    description:
      "Somos o único distribuidor exclusivo da Maletti no Brasil. Conheça nossa linha completa de lavatórios e mobiliário premium.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Site Verification - Maletti */}
        <meta name="google-site-verification" content="SkrI3t5Q5vQ_OvnnTNksc-gx1nKisw0Gq0oANsuLvM0" />
        <DynamicFavicon />
        <TrackingScripts />
      </head>
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <TrackingNoscript />
        {children}
      </body>
    </html>
  );
}
