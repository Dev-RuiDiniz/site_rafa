"use client";

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

export default function MalettiPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="maletti-page">
      <MalettiHeader onNavigate={scrollToSection} />
      <MalettiHero onNavigate={scrollToSection} />
      <MalettiEssencia />
      <MalettiBrasil />
      <MalettiHeadSpa />
      <MalettiDesign />
      <MalettiCatalogo />
      <MalettiFooter />
    </div>
  );
}
