"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/produtos", label: "Produtos" },
  { href: "/marcas", label: "Nossas Marcas" },
  { href: "/sobre", label: "Sobre" },
  { href: "/manutencao", label: "Manutenção" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Na home, header começa transparente. Em outras páginas, começa com fundo
  const isHome = pathname === "/";
  const showDarkElements = isScrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showDarkElements
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} className="relative h-14 w-[140px]">
              {/* Logo White - quando header transparente */}
              <Image
                src="/logoshr-white.png"
                alt="SHR - Distribuidor Exclusivo Maletti"
                fill
                className={`object-contain object-left transition-opacity duration-300 ${showDarkElements ? "opacity-0" : "opacity-100"}`}
                priority
              />
              {/* Logo Dark - quando header com fundo */}
              <Image
                src="/logoshr-dark.png"
                alt="SHR - Distribuidor Exclusivo Maletti"
                fill
                className={`object-contain object-left transition-opacity duration-300 ${showDarkElements ? "opacity-100" : "opacity-0"}`}
                priority
              />
            </motion.div>
            <div className={`hidden sm:block text-[10px] leading-tight uppercase tracking-wider transition-colors duration-300 ${showDarkElements ? "text-gray-500" : "text-white/70"}`}>
              <span className="block">Distribuidor Exclusivo</span>
              <span className="block font-medium">Maletti e Nilo</span>
            </div>
          </Link>

          {/* Right Side - CTAs + Menu */}
          <div className="flex items-center gap-6">
            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                className={`font-medium tracking-wide transition-all duration-300 ${showDarkElements ? "border-black text-black hover:bg-black hover:text-white" : "border-white/80 text-white bg-transparent hover:bg-white hover:text-black"}`}
              >
                Solicitar Catálogo
              </Button>
              <Button className={`font-medium tracking-wide transition-all duration-300 ${showDarkElements ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-100"}`}>
                Falar com Consultor
              </Button>
            </div>

            {/* Hamburger Menu - Always visible */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button 
                  className={`flex flex-col items-center justify-center gap-1.5 p-2 transition-colors duration-300 ${showDarkElements ? "text-black" : "text-white"}`}
                  aria-label="Menu"
                >
                  <span className={`block w-6 h-[2px] transition-all duration-300 ${showDarkElements ? "bg-black" : "bg-white"}`} />
                  <span className={`block w-6 h-[2px] transition-all duration-300 ${showDarkElements ? "bg-black" : "bg-white"}`} />
                  <span className={`block w-4 h-[2px] transition-all duration-300 ${showDarkElements ? "bg-black" : "bg-white"}`} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[450px] bg-black text-white border-none p-8 pt-12">
                <div className="flex flex-col h-full pt-16">
                  {/* Menu Links */}
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <SheetClose asChild>
                          <Link
                            href={link.href}
                            className="block py-4 text-4xl font-serif font-light text-white/80 hover:text-white transition-colors border-b border-white/10"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Contact Info */}
                  <div className="mt-auto pb-12">
                    <div className="mb-8 space-y-3 text-white/60 text-sm">
                      <p>marketing@shrhair.com.br</p>
                      <p>(11) 98198-2279</p>
                      <p>São Paulo, SP</p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        className="w-full border-white text-white bg-transparent hover:bg-white hover:text-black"
                      >
                        Solicitar Catálogo
                      </Button>
                      <Button className="w-full bg-white text-black hover:bg-gray-100">
                        Falar com Consultor
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
