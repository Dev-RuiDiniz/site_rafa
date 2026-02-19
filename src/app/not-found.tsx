"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiArrowRight, HiOutlineHome, HiOutlineSearch } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header simples */}
      <header className="flex items-center justify-between px-6 lg:px-12 h-20 border-b border-gray-100">
        <Link href="/">
          <Image
            src="/logoshr.png"
            alt="SHR"
            width={100}
            height={40}
            className="object-contain"
          />
        </Link>
      </header>

      {/* Conteúdo 404 */}
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Número 404 */}
            <div className="relative mb-8 select-none">
              <span className="text-[160px] lg:text-[220px] font-serif font-semibold text-gray-100 leading-none block">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <HiOutlineSearch className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">
                Página não encontrada
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-black mb-4">
                Ops! Esta página não existe.
              </h1>
              <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
                A página que você está procurando pode ter sido removida, renomeada ou nunca existiu.
              </p>
            </motion.div>

            {/* Ações */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 group px-8"
                asChild
              >
                <Link href="/">
                  <HiOutlineHome className="mr-2 w-5 h-5" />
                  Voltar para a Home
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white transition-all duration-300 group px-8"
                asChild
              >
                <Link href="/produtos">
                  Ver Produtos
                  <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            {/* Links rápidos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 pt-8 border-t border-gray-100"
            >
              <p className="text-sm text-gray-400 mb-4">Ou acesse diretamente:</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {[
                  { label: "Produtos", href: "/produtos" },
                  { label: "Marcas", href: "/marcas" },
                  { label: "Sobre", href: "/sobre" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contato", href: "/contato" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-black transition-colors underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer simples */}
      <footer className="px-6 lg:px-12 py-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} SHR — Distribuidor Exclusivo Maletti no Brasil
        </p>
      </footer>
    </div>
  );
}
