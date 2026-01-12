"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowRight, HiPlay, HiX } from "react-icons/hi";
import { Button } from "@/components/ui/button";

interface MalettiHeroProps {
  onNavigate: (id: string) => void;
}

export function MalettiHero({ onNavigate }: MalettiHeroProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/Vídeo Home.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 leading-tight">
              Transforme Espaços.
              <span className="text-gray-300"> Eleve Experiências.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Apresentamos a revolução do bem-estar capilar no Brasil. As estações Maletti Head SPA 
              unem o design italiano a uma tecnologia inovadora para criar uma experiência sensorial 
              que redefine o luxo em seu salão, spa ou clínica.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 transition-all duration-300 group"
                onClick={() => onNavigate("catalogo")}
              >
                Solicitar Catálogo
                <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-transparent hover:bg-white/10 transition-all duration-300 group"
                onClick={() => setShowVideo(true)}
              >
                <HiPlay className="mr-2 w-5 h-5" />
                Assistir Vídeo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-gray-300 transition-colors"
          >
            <HiX className="w-8 h-8" />
          </button>
          <div className="w-full max-w-4xl aspect-video bg-black">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
