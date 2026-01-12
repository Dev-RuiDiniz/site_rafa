import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tricologia | Tecnologia Maletti para Clínicas Premium",
  description: "A união do Design Italiano com a Tecnologia Coreana: A revolução no tratamento capilar chegou à sua clínica. Conheça o ecossistema de equipamentos Maletti.",
  keywords: [
    "tricologia",
    "tratamento capilar",
    "Maletti",
    "Heaven",
    "Shirobody",
    "Total Body",
    "Spa Garçon",
    "Vapomist",
    "wellness",
    "clínica de estética",
  ],
};

export default function TricologiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
