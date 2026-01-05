"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineHeart,
  HiOutlineBadgeCheck
} from "react-icons/hi";

const features = [
  {
    icon: HiOutlineSparkles,
    title: "Design Italiano",
    description: "Cada peça é uma obra de arte que combina estética refinada com funcionalidade superior."
  },
  {
    icon: HiOutlineLightBulb,
    title: "Inovação Tecnológica",
    description: "Tecnologia de ponta integrada para proporcionar experiências únicas aos seus clientes."
  },
  {
    icon: HiOutlineHeart,
    title: "Experiência Sensorial",
    description: "Sistemas de massagem, cromoterapia e aromaterapia para o bem-estar completo."
  }
];

const achievements = [
  "Grand Prix de l'Innovation - Paris",
  "Credit Reputation Award",
  "Rede internacional de showrooms",
  "Presença em todos os continentes"
];

export function MalettiEssencia() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="essencia" ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
            Nossa História
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-black mb-6">
            A Essência Maletti
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Nossa essência vai além da criação de móveis para salão de beleza de luxo. 
            É uma tradição que une a arte do design italiano à inovação tecnológica em cada detalhe. 
            O resultado são peças que encantam pelo estilo, entregam performance, conforto absoluto 
            e a experiência de bem-estar que define a sua marca.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-black" />
              <h3 className="text-xl font-serif font-semibold text-black mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Liderança Global */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
              <Image
                src="/images/site/Shirobody_showroom.jpg"
                alt="Showroom Maletti"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-3xl md:text-4xl font-serif font-semibold text-black mb-6">
              Liderança Global e Reconhecimento
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              A Maletti é líder e referência mundial no setor, com presença como protagonista 
              nas feiras mais importantes do mundo, como a Cosmoprof Worldwide e a prestigiada 
              MCB em Paris.
            </p>
            <ul className="space-y-4">
              {achievements.map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <HiOutlineBadgeCheck className="w-5 h-5 text-black flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
