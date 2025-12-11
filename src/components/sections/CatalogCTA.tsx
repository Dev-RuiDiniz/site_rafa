"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiOutlineDownload, HiOutlinePhone } from "react-icons/hi";

export function CatalogCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envio do formulário
    console.log("Email:", email);
  };

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              Catálogo Digital
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-6">
              Receba nosso catálogo
              <br />
              completo
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Conheça toda a linha de produtos Maletti disponível no Brasil. 
              Deixe seu e-mail e receba o catálogo digital com especificações 
              técnicas e fotos em alta resolução.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-12"
          >
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 px-6 border-gray-200 focus:border-black focus:ring-black"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 bg-black text-white hover:bg-gray-800 transition-all duration-300 group"
            >
              <HiOutlineDownload className="mr-2 w-5 h-5" />
              Receber Catálogo
            </Button>
          </motion.form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 max-w-xl mx-auto mb-12"
          >
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </motion.div>

          {/* Alternative CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="tel:+5511981982279"
              className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors group"
            >
              <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                <HiOutlinePhone className="w-5 h-5" />
              </span>
              <div className="text-left">
                <span className="text-xs text-gray-400 block">Ligue para nós</span>
                <span className="font-medium">(11) 98198-2279</span>
              </div>
            </a>

            <div className="hidden sm:block w-px h-12 bg-gray-200" />

            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white transition-all duration-300"
              asChild
            >
              <a
                href="https://wa.me/5511981982279?text=Olá! Gostaria de falar com um consultor sobre os produtos Maletti."
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com Consultor
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
