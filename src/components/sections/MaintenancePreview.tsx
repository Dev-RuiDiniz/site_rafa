"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiArrowRight, HiOutlineWrenchScrewdriver, HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi2";
import Link from "next/link";

const services = [
  {
    icon: HiOutlineWrenchScrewdriver,
    title: "Manutenção Preventiva",
    description: "Prolongue a vida útil dos seus equipamentos com revisões periódicas.",
  },
  {
    icon: HiOutlineClock,
    title: "Atendimento Rápido",
    description: "Equipe técnica disponível para atendimento em todo o Brasil.",
  },
  {
    icon: HiOutlineCheckCircle,
    title: "Peças Originais",
    description: "Utilizamos apenas peças originais Maletti em todos os reparos.",
  },
];

export function MaintenancePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              Suporte Técnico
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-6 leading-tight">
              Manutenção
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Nossa equipe técnica especializada está preparada para manter 
              seus equipamentos Maletti sempre em perfeito funcionamento. 
              Oferecemos suporte completo, desde a instalação até a manutenção 
              preventiva e corretiva.
            </p>

            <Link href="/manutencao">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 group"
              >
                Solicitar Manutenção
                <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Right - Services */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="flex gap-6 p-6 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <service.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
