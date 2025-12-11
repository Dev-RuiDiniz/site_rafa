"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

const footerLinks = {
  produtos: [
    { href: "/produtos/heaven", label: "Heaven" },
    { href: "/produtos/shirobody", label: "Shirobody" },
    { href: "/produtos/total-body", label: "Total Body" },
    { href: "/produtos/spa-garcon", label: "Spa Garçon" },
    { href: "/produtos/vapomist", label: "Vapomist" },
  ],
  institucional: [
    { href: "/sobre", label: "Sobre a SHR" },
    { href: "/maletti", label: "Parceria Maletti" },
    { href: "/manutencao", label: "Manutenção" },
    { href: "/contato", label: "Contato" },
  ],
  suporte: [
    { href: "/catalogo", label: "Solicitar Catálogo" },
    { href: "/consultor", label: "Falar com Consultor" },
    { href: "/garantia", label: "Garantia" },
    { href: "/faq", label: "FAQ" },
  ],
};

const socialLinks = [
  { href: "https://instagram.com/shrhair", icon: FaInstagram, label: "Instagram" },
  { href: "https://facebook.com/shrhair", icon: FaFacebookF, label: "Facebook" },
  { href: "https://linkedin.com/company/shrhair", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "https://youtube.com/@shrhair", icon: FaYoutube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="inline-block mb-6">
                <span className="text-3xl font-serif font-semibold tracking-tight">SHR</span>
                <span className="block text-xs tracking-[0.2em] text-gray-400 uppercase mt-1">
                  Distribuidor Exclusivo Maletti
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
                Somos o único distribuidor exclusivo da Maletti no Brasil, 
                trazendo o que há de mais sofisticado em mobiliário para 
                salões de beleza e spas.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="mailto:marketing@shrhair.com.br"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <HiOutlineMail className="w-5 h-5" />
                  marketing@shrhair.com.br
                </a>
                <a
                  href="tel:+5511981982279"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <HiOutlinePhone className="w-5 h-5" />
                  (11) 98198-2279
                </a>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <HiOutlineLocationMarker className="w-5 h-5 flex-shrink-0" />
                  São Paulo, SP
                </div>
              </div>
            </motion.div>
          </div>

          {/* Products Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Produtos
            </h4>
            <ul className="space-y-3">
              {footerLinks.produtos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Institutional Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Institucional
            </h4>
            <ul className="space-y-3">
              {footerLinks.institucional.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Suporte
            </h4>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SHR. Todos os direitos reservados.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
