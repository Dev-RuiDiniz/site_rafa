"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiArrowRight, HiPlay } from "react-icons/hi";

const heroSlides = [
  {
    id: 1,
    title: "Heaven",
    subtitle: "A perfeição em lavatórios",
    description: "Design italiano que transforma a experiência do seu cliente em um momento de puro relaxamento.",
    image: "/images/hero/heaven.jpg",
    video: null,
  },
  {
    id: 2,
    title: "Shirobody",
    subtitle: "Massagem shiatsu integrada",
    description: "Tecnologia japonesa com design europeu. A evolução do bem-estar no seu salão.",
    image: "/images/hero/shirobody.jpg",
    video: null,
  },
  {
    id: 3,
    title: "Total Body",
    subtitle: "Experiência completa de spa",
    description: "O máximo em conforto e tecnologia para tratamentos corporais de alto padrão.",
    image: "/images/hero/totalbody.jpg",
    video: null,
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Placeholder gradient - replace with actual images */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 h-full flex items-center">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm">
              <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
              Distribuidor Exclusivo Maletti no Brasil
            </span>
          </motion.div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-white/60 text-lg md:text-xl font-light tracking-wide mb-2">
                {heroSlides[currentSlide].subtitle}
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold text-white tracking-tight mb-6">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
                {heroSlides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 transition-all duration-300 group px-8"
            >
              Conhecer Produtos
              <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/80 text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 group px-8"
            >
              <HiPlay className="mr-2 w-5 h-5" />
              Assistir Vídeo
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => handleSlideChange(index)}
            className={`relative h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-12 bg-white" : "w-6 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          >
            {index === currentSlide && (
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                className="absolute inset-0 bg-white/50 rounded-full origin-left"
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-12 right-12 z-20 hidden lg:flex items-center gap-4 text-white">
        <span className="text-4xl font-bold">
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        <span className="text-white/40">/</span>
        <span className="text-white/40">
          {String(heroSlides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-12 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs tracking-widest uppercase rotate-90 origin-center translate-y-8">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
