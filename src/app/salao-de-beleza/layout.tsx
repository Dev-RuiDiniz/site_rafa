import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salão de Beleza Premium | Equipamentos Maletti para Head SPA",
  description: "O Padrão Ouro do Head SPA: Design Italiano e Tecnologia de Wellness. Crie rituais sensoriais únicos que encantam seus clientes e justificam seu alto valor.",
  keywords: [
    "salão de beleza",
    "head spa",
    "Maletti",
    "Heaven",
    "Shirobody",
    "Total Body",
    "equipamentos salão",
    "mobiliário salão de luxo",
  ],
};

export default function SalaoDeBelezaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
