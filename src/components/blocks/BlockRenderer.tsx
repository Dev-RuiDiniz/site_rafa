"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowRight, HiPlay } from "react-icons/hi";
import { Button } from "@/components/ui/button";

interface Block {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
  active: boolean;
}

interface BlockRendererProps {
  blocks: Block[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks
        .filter((block) => block.active)
        .sort((a, b) => a.order - b.order)
        .map((block) => (
          <RenderBlock key={block.id} block={block} />
        ))}
    </>
  );
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock content={block.content} />;
    case "text":
      return <TextBlock content={block.content} />;
    case "gallery":
      return <GalleryBlock content={block.content} />;
    case "video":
      return <VideoBlock content={block.content} />;
    case "features":
      return <FeaturesBlock content={block.content} />;
    case "cta":
      return <CTABlock content={block.content} />;
    case "cards":
      return <CardsBlock content={block.content} />;
    default:
      return null;
  }
}

// Hero Block
function HeroBlock({ content }: { content: Record<string, unknown> }) {
  const align = (content.align as string) || "center";
  const overlay = (content.overlay as number) || 60;

  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align] || "text-center items-center";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {(content.image as string) && (
        <div className="absolute inset-0">
          <Image
            src={content.image as string}
            alt=""
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlay / 100 }}
          />
        </div>
      )}

      <div className={`relative z-10 container mx-auto px-6 lg:px-12 text-white flex flex-col ${alignClass} py-32`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`max-w-4xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {(content.badge as string) && (
            <span className="inline-block px-4 py-1 text-xs uppercase tracking-[0.2em] border border-white/30 text-white/80 mb-6">
              {content.badge as string}
            </span>
          )}

          {(content.subtitle as string) && (
            <p className="text-lg md:text-xl text-gray-300 mb-4">
              {content.subtitle as string}
            </p>
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 leading-tight">
            {content.title as string}
          </h1>

          {(content.description as string) && (
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
              {content.description as string}
            </p>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            {(content.button1Text as string) && (
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100"
                asChild
              >
                <Link href={(content.button1Link as string) || "#"}>
                  {content.button1Text as string}
                  <HiArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            )}
            {(content.button2Text as string) && (
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-transparent hover:bg-white/10"
                asChild
              >
                <Link href={(content.button2Link as string) || "#"}>
                  <HiPlay className="mr-2 w-5 h-5" />
                  {content.button2Text as string}
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Text Block
function TextBlock({ content }: { content: Record<string, unknown> }) {
  const align = (content.align as string) || "left";
  const background = (content.background as string) || "white";

  const bgClass = {
    white: "bg-white text-gray-900",
    gray: "bg-gray-50 text-gray-900",
    black: "bg-black text-white",
  }[background] || "bg-white text-gray-900";

  const alignClass = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }[align] || "text-left";

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`max-w-4xl ${alignClass}`}
        >
          {(content.subtitle as string) && (
            <span className={`text-sm uppercase tracking-[0.2em] ${background === "black" ? "text-gray-400" : "text-gray-500"} mb-4 block`}>
              {content.subtitle as string}
            </span>
          )}

          {(content.title as string) && (
            <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
              {content.title as string}
            </h2>
          )}

          {(content.content as string) && (
            <div
              className={`text-lg leading-relaxed ${background === "black" ? "text-gray-300" : "text-gray-600"}`}
              dangerouslySetInnerHTML={{ __html: (content.content as string).replace(/\n/g, "<br/>") }}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Gallery Block
function GalleryBlock({ content }: { content: Record<string, unknown> }) {
  const images = (content.images as string[]) || [];
  const columns = (content.columns as number) || 3;

  const colsClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  }[columns] || "grid-cols-3";

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {(content.title as string) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {(content.subtitle as string) && (
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                {content.subtitle as string}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black">
              {content.title as string}
            </h2>
          </motion.div>
        )}

        <div className={`grid ${colsClass} gap-4`}>
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square bg-gray-100 overflow-hidden group"
            >
              <Image
                src={img}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Video Block
function VideoBlock({ content }: { content: Record<string, unknown> }) {
  const url = (content.url as string) || "";
  const autoplay = (content.autoplay as boolean) || false;

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}${autoplay ? "?autoplay=1" : ""}` : url;
    }
    if (url.includes("vimeo.com")) {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}${autoplay ? "?autoplay=1" : ""}` : url;
    }
    return url;
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        {(content.title as string) && (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-semibold text-black text-center mb-12"
          >
            {content.title as string}
          </motion.h2>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video bg-black overflow-hidden"
        >
          <iframe
            src={getEmbedUrl(url)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}

// Features Block
function FeaturesBlock({ content }: { content: Record<string, unknown> }) {
  const items = (content.items as Array<{ icon: string; title: string; description: string }>) || [];
  const columns = (content.columns as number) || 3;

  const colsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns] || "md:grid-cols-3";

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {(content.title as string) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {(content.subtitle as string) && (
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                {content.subtitle as string}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black">
              {content.title as string}
            </h2>
          </motion.div>
        )}

        <div className={`grid grid-cols-1 ${colsClass} gap-8`}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-black text-white flex items-center justify-center">
                <span className="text-xl">★</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-black mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Block
function CTABlock({ content }: { content: Record<string, unknown> }) {
  const background = (content.background as string) || "black";

  const bgClass = {
    white: "bg-white text-black",
    gray: "bg-gray-100 text-black",
    black: "bg-black text-white",
  }[background] || "bg-black text-white";

  const btnClass = background === "black"
    ? "bg-white text-black hover:bg-gray-100"
    : "bg-black text-white hover:bg-gray-800";

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
            {content.title as string}
          </h2>

          {(content.description as string) && (
            <p className={`text-lg mb-8 ${background === "black" ? "text-gray-400" : "text-gray-600"}`}>
              {content.description as string}
            </p>
          )}

          {(content.buttonText as string) && (
            <Button size="lg" className={btnClass} asChild>
              <Link href={(content.buttonLink as string) || "#"}>
                {content.buttonText as string}
                <HiArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Cards Block
function CardsBlock({ content }: { content: Record<string, unknown> }) {
  const cards = (content.cards as Array<{ image: string; title: string; description: string; link: string }>) || [];
  const columns = (content.columns as number) || 3;

  const colsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns] || "md:grid-cols-3";

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        {(content.title as string) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {(content.subtitle as string) && (
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block">
                {content.subtitle as string}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black">
              {content.title as string}
            </h2>
          </motion.div>
        )}

        <div className={`grid grid-cols-1 ${colsClass} gap-6`}>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white overflow-hidden group"
            >
              {card.image && (
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-black mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
                {card.link && (
                  <Link
                    href={card.link}
                    className="text-sm font-medium text-black hover:underline inline-flex items-center"
                  >
                    Saiba mais
                    <HiArrowRight className="ml-1 w-3 h-3" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
