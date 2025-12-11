"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineCube, HiOutlineSupport, HiOutlineSparkles } from "react-icons/hi";

const features = [
  {
    icon: HiOutlineShieldCheck,
    title: "Distribuidor Exclusivo",
    description:
      "Somos o único representante oficial da Maletti no Brasil, garantindo produtos originais e suporte direto da fábrica.",
  },
  {
    icon: HiOutlineCube,
    title: "Design Italiano",
    description:
      "Cada peça é projetada na Itália com os mais altos padrões de design, ergonomia e qualidade de materiais.",
  },
  {
    icon: HiOutlineSupport,
    title: "Suporte Especializado",
    description:
      "Equipe técnica treinada para instalação, manutenção e suporte completo durante toda a vida útil do produto.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Experiência Premium",
    description:
      "Transforme seu salão em um ambiente de luxo e proporcione aos seus clientes uma experiência inesquecível.",
  },
];

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
              Por que nos escolher
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-6 leading-tight">
              Excelência em cada detalhe
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Há mais de uma década, a SHR é referência no mercado brasileiro de 
              mobiliário para salões de beleza e spas. Nossa parceria exclusiva 
              com a Maletti nos permite oferecer o que há de mais sofisticado 
              em design e tecnologia italiana.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-4xl font-serif font-semibold text-black">10+</span>
                <p className="text-sm text-gray-500 mt-1">Anos de mercado</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="text-4xl font-serif font-semibold text-black">500+</span>
                <p className="text-sm text-gray-500 mt-1">Clientes atendidos</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-4xl font-serif font-semibold text-black">100%</span>
                <p className="text-sm text-gray-500 mt-1">Original Maletti</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="group"
              >
                <div className="p-6 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-12 h-12 flex items-center justify-center bg-black text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
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
