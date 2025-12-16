"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";

const brands = [
  {
    id: "maletti",
    name: "Maletti",
    logo: "/images/site/Maletti - Logo bianco.png",
    logoDark: "/images/site/malliti-preto.png",
    description: "A referência mundial em design e inovação. Como distribuidor exclusivo no Brasil, a SHR traz a excelência da Maletti Group, unindo tradição artesanal e tecnologia avançada.",
    highlights: [
      "Lavatórios com sistemas de massagem e cromoterapia",
      "Poltronas de corte com design assinado e ergonomia superior",
      "Bancadas, recepções e expositores de alto padrão",
    ],
    image: "/images/site/heaven2.jpg",
    featured: true,
  },
  {
    id: "nilo",
    name: "Nilo",
    logo: "/images/site/nilo.jpg",
    logoDark: "/images/site/nilo.jpg",
    description: "O design a serviço do bem-estar. A SHR representa a Nilo no Brasil, referência global em mobiliário de luxo para SPAs, hotéis e clínicas de estética.",
    highlights: [
      "Macas de massagem e camas multifuncionais",
      "Poltronas para tratamentos faciais e podologia",
      "Mobiliário e complementos para áreas de relaxamento",
    ],
    image: "/images/site/nilo.jpg",
    featured: true,
  },
  {
    id: "uki",
    name: "UKI",
    logo: "/images/site/UKI.jpg",
    logoDark: "/images/site/UKI.jpg",
    description: "Inovação e estilo com a autêntica assinatura italiana. A SHR traz a UKI International, unindo moda e tecnologia para traduzir o \"Italian Sense of Beauty\".",
    highlights: [
      "Secadores profissionais e difusores de design exclusivo",
      "Pranchas e modeladores com controle térmico avançado",
      "Acessórios elétricos e carrinhos auxiliares",
    ],
    image: "/images/site/UKI.jpg",
    featured: true,
  },
  {
    id: "marco-boni",
    name: "Marco Boni",
    logo: "/images/site/marco boni.mp4",
    logoDark: "/images/site/marco boni.mp4",
    description: "Excelência e precisão em cada detalhe. A SHR apresenta uma seleção exclusiva da linha profissional Marco Boni, essencial para o acabamento perfeito.",
    highlights: [
      "Escovas de finalização e pentes técnicos",
      "Pincéis de aplicação e acessórios de coloração",
      "Linha completa de cutelaria em aço inox",
    ],
    image: "/images/site/Shirobody_showroom.jpg",
    featured: true,
    isVideo: true,
  },
];

export default function MarcasPage() {
  const brandsRef = useRef(null);
  const brandsInView = useInView(brandsRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pb-32 bg-black text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 block">
                Nossas Marcas
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 leading-tight">
                Excelência
                <br />
                em cada
                <br />
                detalhe
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Trabalhamos com as marcas mais prestigiadas do mercado mundial 
                de mobiliário para salões de beleza e spas. Cada marca em nosso 
                portfólio representa o compromisso com qualidade, inovação e design.
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 transition-all duration-300 group"
                asChild
              >
                <Link href="/produtos">
                  Ver Produtos
                  <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                <Image
                  src="/images/site/DK3E3179-MOD.jpg"
                  alt="Showroom"
                  fill
                  className="object-cover opacity-60"
                />
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
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white/20" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-white/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section ref={brandsRef} className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={brandsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              Portfólio
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black">
              Marcas que representamos
            </h2>
          </motion.div>

          <div className="space-y-24">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 40 }}
                animate={brandsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={120}
                        height={48}
                      />
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h3 className="text-3xl md:text-4xl font-serif font-semibold text-black mb-4">
                    {brand.name}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {brand.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {brand.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-3 text-gray-700">
                        <span className="w-2 h-2 bg-black rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white transition-all duration-300 group"
                    asChild
                  >
                    <Link href="/produtos">
                      Ver Produtos {brand.name}
                      <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                Nossas Parcerias
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-black mb-8 leading-tight">
                Marcas que confiam na SHR
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-12">
                A SHR é o elo entre as maiores marcas internacionais e o mercado 
                brasileiro. Nossas parcerias exclusivas garantem que você tenha acesso 
                ao que há de melhor em mobiliário e equipamentos para salões.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src="/images/site/malliti-preto.png"
                    alt="Maletti"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src="/images/site/nilo.jpg"
                    alt="Nilo"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src="/images/site/UKI.jpg"
                    alt="UKI"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-700">Marco Boni</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
              Quer conhecer nossos produtos?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Explore nosso catálogo completo e descubra como as marcas que 
              representamos podem transformar seu salão.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 transition-all duration-300"
                asChild
              >
                <Link href="/produtos">
                  Ver Produtos
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-transparent hover:bg-white/10 transition-all duration-300"
                asChild
              >
                <Link href="/contato">
                  Falar com Consultor
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
