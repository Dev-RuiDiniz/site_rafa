"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: "heaven",
    name: "Heaven",
    category: "Lavatórios",
    description: "A perfeição em design e conforto para lavagem de cabelos.",
    image: "/images/products/heaven.jpg",
    href: "/produtos/heaven",
  },
  {
    id: "shirobody",
    name: "Shirobody",
    category: "Massagem",
    description: "Tecnologia shiatsu integrada para uma experiência única.",
    image: "/images/products/shirobody.jpg",
    href: "/produtos/shirobody",
  },
  {
    id: "total-body",
    name: "Total Body",
    category: "Spa",
    description: "Experiência completa de spa com tecnologia avançada.",
    image: "/images/products/total-body.jpg",
    href: "/produtos/total-body",
  },
  {
    id: "spa-garcon",
    name: "Spa Garçon",
    category: "Lavatórios",
    description: "Elegância e funcionalidade em um único produto.",
    image: "/images/products/spa-garcon.jpg",
    href: "/produtos/spa-garcon",
  },
  {
    id: "vapomist",
    name: "Vapomist",
    category: "Tratamento",
    description: "Vapor profissional para tratamentos capilares.",
    image: "/images/products/vapomist.jpg",
    href: "/produtos/vapomist",
  },
];

export function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
              Coleção
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-black">
              Produtos em
              <br />
              Destaque
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/produtos">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white transition-all duration-300 group"
              >
                Ver todos os produtos
                <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            >
              <Link href={product.href} className="group block">
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-gray-100 mb-6 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs uppercase tracking-wider text-gray-700">
                    {product.category}
                  </span>

                  {/* View Button */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black">
                      <HiArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-serif font-medium text-black mb-2 group-hover:text-gray-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {product.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Row - 2 products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {products.slice(3, 5).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + 0.1 * index }}
            >
              <Link href={product.href} className="group block">
                {/* Horizontal Card */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-full sm:w-48 aspect-square bg-gray-100 overflow-hidden flex-shrink-0">
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${product.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-wider text-gray-700">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-serif font-medium text-black mb-2 group-hover:text-gray-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-black group-hover:text-gray-600 transition-colors">
                      Conhecer produto
                      <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
