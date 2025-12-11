"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";

export function MalettiPartnership() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image/Video placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
              {/* Placeholder for Maletti factory/showroom image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl font-serif font-semibold text-white/20">
                    MALETTI
                  </span>
                  <p className="text-white/40 text-sm mt-2">Since 1965</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/20" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-white text-black p-6 shadow-2xl"
            >
              <span className="text-4xl font-serif font-bold">1965</span>
              <p className="text-xs uppercase tracking-wider text-gray-600 mt-1">
                Fundação Maletti
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">
              Parceria Exclusiva
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6 leading-tight">
              A tradição italiana
              <br />
              no seu salão
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
              <p>
                A Maletti é uma das mais prestigiadas fabricantes de mobiliário 
                para salões de beleza do mundo. Fundada em 1965 na Itália, a marca 
                é sinônimo de inovação, qualidade e design sofisticado.
              </p>
              <p>
                Como distribuidor exclusivo no Brasil, a SHR traz toda a excelência 
                Maletti para o mercado nacional, com garantia de originalidade, 
                suporte técnico especializado e peças de reposição originais.
              </p>
            </div>

            {/* Features list */}
            <ul className="space-y-3 mb-10">
              {[
                "Produtos 100% originais importados da Itália",
                "Garantia estendida e suporte técnico nacional",
                "Showroom exclusivo para visitação",
                "Consultoria personalizada para seu projeto",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/maletti">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 transition-all duration-300 group"
                >
                  Conhecer a Maletti
                  <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-transparent hover:bg-white/10 transition-all duration-300"
                >
                  Agendar Visita
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
