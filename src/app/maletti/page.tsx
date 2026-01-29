"use client";

import { useState, useEffect } from "react";
import {
  MalettiHeader,
  MalettiHero,
  MalettiEssencia,
  MalettiBrasil,
  MalettiHeadSpa,
  MalettiDesign,
  MalettiCatalogo,
  MalettiFooter,
} from "@/components/maletti";

interface PageBlock {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
  active: boolean;
}

export default function MalettiPage() {
  const [blocks, setBlocks] = useState<PageBlock[]>([]);

  useEffect(() => {
    fetch("/api/pages/maletti").then(r => r.json()).then(data => setBlocks(data.page?.blocks || [])).catch(console.error);
  }, []);

  const getBlockContent = (type: string) => blocks.find(b => b.type === type)?.content || {};

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="maletti-page">
      <MalettiHeader onNavigate={scrollToSection} />
      <MalettiHero onNavigate={scrollToSection} content={getBlockContent("maletti-hero")} />
      <MalettiEssencia content={getBlockContent("maletti-essencia")} />
      <MalettiBrasil content={getBlockContent("maletti-brasil")} />
      <MalettiHeadSpa content={getBlockContent("maletti-headspa")} />
      <MalettiDesign content={getBlockContent("maletti-design")} />
      <MalettiCatalogo content={getBlockContent("maletti-catalogo")} />
      <MalettiFooter />
    </div>
  );
}
