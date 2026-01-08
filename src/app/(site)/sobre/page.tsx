"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  HiArrowRight,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserGroup
} from "react-icons/hi";
import { Button } from "@/components/ui/button";

const timeline = [
  {
    year: "1965",
    title: "Fundação da Maletti",
    description: "A Maletti é fundada na Itália, iniciando sua trajetória de excelência em mobiliário para salões.",
  },
  {
    year: "2010",
    title: "Chegada ao Brasil",
    description: "A SHR inicia suas operações como representante da Maletti no mercado brasileiro.",
  },
  {
    year: "2015",
    title: "Distribuidor Exclusivo",
    description: "A SHR se torna o único distribuidor exclusivo da Maletti em todo o território nacional.",
  },
  {
    year: "2020",
    title: "Expansão Nacional",
    description: "Ampliação da rede de atendimento para todas as regiões do Brasil.",
  },
  {
    year: "Hoje",
    title: "Referência no Mercado",
    description: "Mais de 500 clientes atendidos e reconhecimento como líder em mobiliário premium.",
  },
];

const values = [
  {
    icon: HiOutlineSparkles,
    title: "Excelência",
    description: "Buscamos a perfeição em cada detalhe, desde o atendimento até a entrega final.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Confiança",
    description: "Construímos relacionamentos duradouros baseados em transparência e honestidade.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Inovação",
    description: "Trazemos as últimas tendências e tecnologias do mercado internacional.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Parceria",
    description: "Trabalhamos lado a lado com nossos clientes para alcançar seus objetivos.",
  },
];

export default function SobrePage() {
  const timelineRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pb-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                Sobre Nós
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-black mb-6 leading-tight">
                A arte de
                <br />
                transformar
                <br />
                salões
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Há mais de uma década, a SHR é referência no mercado brasileiro 
                de mobiliário para salões de beleza e spas. Como distribuidor 
                exclusivo da Maletti, trazemos o melhor do design italiano para 
                transformar espaços em experiências únicas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 transition-all duration-300 group"
                  asChild
                >
                  <Link href="/produtos">
                    Conhecer Produtos
                    <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                  asChild
                >
                  <Link href="/contato">
                    Falar Conosco
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {/* Showroom image */}
                <Image
                  src="/images/site/Shirobody_showroom.jpg"
                  alt="Showroom SHR"
                  fill
                  className="object-cover"
                />
                {/* Overlay with logo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <Image
                    src="/logoshr-white.png"
                    alt="SHR"
                    width={100}
                    height={40}
                    className="mb-3"
                  />
                  <p className="text-white/80 text-sm">Distribuidor Exclusivo Maletti</p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-white/30" />
              </div>

              {/* Stats overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-8 -right-8 bg-black text-white p-8 shadow-2xl"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-3xl font-serif font-bold">10+</span>
                    <p className="text-xs text-gray-400 mt-1">Anos de mercado</p>
                  </div>
                  <div>
                    <span className="text-3xl font-serif font-bold">500+</span>
                    <p className="text-xs text-gray-400 mt-1">Clientes</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                Nossa Missão
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-black mb-8 leading-tight">
                &ldquo;Transformar salões de beleza em espaços de excelência, 
                proporcionando aos profissionais as melhores ferramentas para 
                encantar seus clientes.&rdquo;
              </h2>
              <p className="text-gray-600 text-lg">
                — Equipe SHR
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              Nossos Valores
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black">
              O que nos guia
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Maletti Partnership */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                Parceria Exclusiva
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-6">
                Maletti: Tradição italiana desde 1965
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                A Maletti é uma das mais prestigiadas fabricantes de mobiliário 
                para salões de beleza do mundo. Com mais de 55 anos de história, 
                a marca italiana é sinônimo de inovação, qualidade e design sofisticado.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Como distribuidor exclusivo no Brasil, a SHR oferece toda a linha 
                de produtos Maletti com garantia de originalidade, suporte técnico 
                especializado e peças de reposição originais.
              </p>
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 group"
                asChild
              >
                <Link href="/produtos">
                  Ver Produtos Maletti
                  <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-black relative overflow-hidden">
                {/* Product image */}
                <Image
                  src="/images/site/heaven2.jpg"
                  alt="Maletti Heaven"
                  fill
                  className="object-cover opacity-60"
                />
                {/* Overlay with Maletti logo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <Image
                    src="/images/site/Maletti - Logo bianco.png"
                    alt="Maletti"
                    width={180}
                    height={70}
                    className="mb-4"
                  />
                  <p className="text-white/70 text-sm tracking-widest">SINCE 1965</p>
                </div>
                {/* Decorative corner */}
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/20" />
              </div>
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-white text-black p-6 shadow-2xl"
              >
                <span className="text-3xl font-serif font-bold">55+</span>
                <p className="text-xs text-gray-500 mt-1">Anos de história</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-black mb-6">
              Pronto para transformar seu salão?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Entre em contato conosco e descubra como os produtos Maletti 
              podem elevar o padrão do seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
                asChild
              >
                <Link href="/contato">
                  Entrar em Contato
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                asChild
              >
                <a
                  href="https://wa.me/5511981982279"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
