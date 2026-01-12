"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const carouselImages = [
  { src: "/images/site/Shirobody_showroom.jpg", alt: "Shirobody Showroom" },
  { src: "/images/site/heaven2.jpg", alt: "Heaven" },
  { src: "/images/site/Total-Body-356.jpg", alt: "Total Body" },
  { src: "/images/site/DK3E3179-MOD.jpg", alt: "Maletti Design" },
  { src: "/images/site/Head-spa-1.jpg", alt: "Head Spa" },
];

export function MalettiBrasil() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => setCurrentIndex(index);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  const next = () => setCurrentIndex((prev) => (prev + 1) % carouselImages.length);

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">
              Distribuidor Exclusivo
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
              Maletti no Brasil
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Como parceira exclusiva da Maletti no Brasil, a <strong className="text-white">SHR HAIR</strong> garante 
              o sucesso do seu negócio, transformando seu investimento em alta rentabilidade 
              e experiências inesquecíveis.
            </p>
            <p className="text-gray-400 mb-8">
              Nosso suporte completo assegura essa excelência com instalação, 
              treinamento e manutenção preventiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 transition-all duration-300"
                asChild
              >
                <Link href="/contato">
                  Falar com Especialista
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-transparent hover:bg-white/10"
                asChild
              >
                <Link href="/manutencao">
                  Suporte Técnico
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] relative overflow-hidden bg-gray-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={carouselImages[currentIndex].src}
                    alt={carouselImages[currentIndex].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <HiChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <HiChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-white w-6" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
