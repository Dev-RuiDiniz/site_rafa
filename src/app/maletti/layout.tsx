import type { Metadata } from "next";
import { DynamicFavicon } from "@/components/DynamicFavicon";

export const metadata: Metadata = {
  title: "Maletti | Design Italiano de Luxo para Salões",
  description: "Transforme espaços, eleve experiências. As estações Maletti Head SPA unem o design italiano a tecnologia inovadora para redefinir o luxo em seu salão.",
};

export default function MalettiLayout({
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
