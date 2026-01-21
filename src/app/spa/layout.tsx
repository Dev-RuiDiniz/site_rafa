import type { Metadata } from "next";
import { DynamicFavicon } from "@/components/DynamicFavicon";

export const metadata: Metadata = {
  title: "SPA Profissional | Equipamentos Maletti para Wellness",
  description: "Transforme seu espaço em um SPA de alto padrão com equipamentos Maletti. Design italiano, tecnologia de ponta e experiências sensoriais únicas para seus clientes.",
  keywords: [
    "spa profissional",
    "head spa",
    "Maletti",
    "Heaven",
    "Shirobody",
    "Total Body",
    "Spa Garçon",
    "wellness",
    "spa cabin",
  ],
};

export default function SpaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DynamicFavicon forceFavicon="maletti" />
      {children}
    </>
  );
}
