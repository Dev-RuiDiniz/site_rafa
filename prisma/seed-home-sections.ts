import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🏠 Seeding home sections...");

  // Seção: Por que nos escolher
  await prisma.homeSection.upsert({
    where: { sectionId: "why-choose-us" },
    update: {},
    create: {
      sectionId: "why-choose-us",
      title: "Excelência em cada detalhe",
      subtitle: "Por que nos escolher",
      description: "Há mais de uma década, a SHR é referência no mercado brasileiro de mobiliário para salões de beleza e spas. Nossa parceria exclusiva com a Maletti nos permite oferecer o que há de mais sofisticado em design e tecnologia italiana.",
      order: 1,
      content: {
        features: [
          {
            icon: "shield",
            title: "Distribuidor Exclusivo",
            description: "Somos o único representante oficial da Maletti no Brasil, garantindo produtos originais e suporte direto da fábrica.",
          },
          {
            icon: "cube",
            title: "Design Italiano",
            description: "Cada peça é projetada na Itália com os mais altos padrões de design, ergonomia e qualidade de materiais.",
          },
          {
            icon: "support",
            title: "Suporte Especializado",
            description: "Equipe técnica treinada para instalação, manutenção e suporte completo durante toda a vida útil do produto.",
          },
          {
            icon: "sparkles",
            title: "Experiência Premium",
            description: "Transforme seu salão em um ambiente de luxo e proporcione aos seus clientes uma experiência inesquecível.",
          },
        ],
        stats: [
          { value: "10+", label: "Anos de mercado" },
          { value: "500+", label: "Clientes atendidos" },
          { value: "100%", label: "Original Maletti" },
        ],
      },
    },
  });
  console.log("  ✓ why-choose-us");

  // Seção: Parceria Maletti
  await prisma.homeSection.upsert({
    where: { sectionId: "maletti-partnership" },
    update: {},
    create: {
      sectionId: "maletti-partnership",
      title: "A tradição italiana no seu salão",
      subtitle: "Parceria Exclusiva",
      description: "",
      image: "/images/site/Shirobody_showroom.jpg",
      order: 2,
      content: {
        paragraphs: [
          "A Maletti é uma das mais prestigiadas fabricantes de mobiliário para salões de beleza do mundo. Fundada em 1965 na Itália, a marca é sinônimo de inovação, qualidade e design sofisticado.",
          "Como distribuidor exclusivo no Brasil, a SHR traz toda a excelência Maletti para o mercado nacional, com garantia de originalidade, suporte técnico especializado e peças de reposição originais.",
        ],
        features: [
          "Produtos 100% originais importados da Itália",
          "Garantia estendida e suporte técnico nacional",
          "Showroom exclusivo para visitação",
          "Consultoria personalizada para seu projeto",
        ],
        foundationYear: "1965",
        button1Text: "Conhecer a Maletti",
        button1Link: "/maletti",
        button2Text: "Agendar Visita",
        button2Link: "/contato",
      },
    },
  });
  console.log("  ✓ maletti-partnership");

  // Seção: Manutenção
  await prisma.homeSection.upsert({
    where: { sectionId: "maintenance-preview" },
    update: {},
    create: {
      sectionId: "maintenance-preview",
      title: "Manutenção",
      subtitle: "Suporte Técnico",
      description: "Nossa equipe técnica especializada está preparada para manter seus equipamentos Maletti sempre em perfeito funcionamento. Oferecemos suporte completo, desde a instalação até a manutenção preventiva e corretiva.",
      order: 3,
      content: {
        services: [
          {
            icon: "wrench",
            title: "Manutenção Preventiva",
            description: "Prolongue a vida útil dos seus equipamentos com revisões periódicas.",
          },
          {
            icon: "clock",
            title: "Atendimento Rápido",
            description: "Equipe técnica disponível para atendimento em todo o Brasil.",
          },
          {
            icon: "check",
            title: "Peças Originais",
            description: "Utilizamos apenas peças originais Maletti em todos os reparos.",
          },
        ],
        buttonText: "Solicitar Manutenção",
        buttonLink: "/manutencao",
      },
    },
  });
  console.log("  ✓ maintenance-preview");

  // Seção: CTA Catálogo
  await prisma.homeSection.upsert({
    where: { sectionId: "catalog-cta" },
    update: {},
    create: {
      sectionId: "catalog-cta",
      title: "Receba nosso catálogo completo",
      subtitle: "Catálogo Digital",
      description: "Conheça toda a linha de produtos Maletti disponível no Brasil. Deixe seu e-mail e receba o catálogo digital com especificações técnicas e fotos em alta resolução.",
      order: 4,
      content: {
        phone: "(11) 98198-2279",
        phoneRaw: "+5511981982279",
        whatsappMessage: "Olá! Gostaria de falar com um consultor sobre os produtos Maletti.",
        buttonText: "Receber Catálogo",
        consultorButtonText: "Falar com Consultor",
      },
    },
  });
  console.log("  ✓ catalog-cta");

  console.log("✅ Home sections seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
