"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function MalettiBrasil() {
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <Image
                  src="/images/site/Maletti - Logo bianco.png"
                  alt="Maletti"
                  width={160}
                  height={60}
                  className="mb-6"
                />
                <div className="w-12 h-px bg-white/30 mb-6" />
                <Image
                  src="/logoshr-white.png"
                  alt="SHR"
                  width={100}
                  height={40}
                />
                <p className="text-gray-400 text-sm mt-6 text-center">
                  Parceria exclusiva no Brasil
                </p>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white/20" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-white/20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
