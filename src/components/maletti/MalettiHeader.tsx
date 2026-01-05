"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface MalettiHeaderProps {
  onNavigate: (id: string) => void;
}

export function MalettiHeader({ onNavigate }: MalettiHeaderProps) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 hidden lg:block"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">
          <Image
            src="/images/site/malliti-preto.png"
            alt="Maletti"
            width={100}
            height={40}
            className="object-contain"
          />
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate("essencia")}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              A Essência
            </button>
            <button 
              onClick={() => onNavigate("head-spa")}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Head SPA
            </button>
            <button 
              onClick={() => onNavigate("design")}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Design & Experiências
            </button>
            <button 
              onClick={() => onNavigate("catalogo")}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Catálogo
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
