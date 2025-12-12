import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header, Footer, WhatsAppButton } from "@/components/layout";

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
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
