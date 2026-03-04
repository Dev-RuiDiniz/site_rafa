import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🏠 Seeding Home page blocks...");

  // Encontrar ou criar a página Home
  let homePage = await prisma.page.findUnique({
    where: { slug: "home" },
  });

  if (!homePage) {
    homePage = await prisma.page.create({
      data: {
        name: "Página Inicial",
        slug: "home",
        title: "SHR Hair - Mobiliário Premium para Salões",
        description: "Distribuidor exclusivo Maletti no Brasil",
        isSystem: true,
        published: true,
      },
    });
    console.log("✅ Created Home page");
  }

  // Deletar blocos existentes
  await prisma.pageBlock.deleteMany({
    where: { pageId: homePage.id },
  });
  console.log("🗑️ Cleared existing blocks");

  // Criar blocos da Home
  const blocks = [
    {
      type: "hero-slider",
      order: 0,
      active: true,
      content: {
        slides: [
          {
            badge: "",
            title: "Maletti",
            subtitle: "A referência mundial em design e inovação",
            description: "Como distribuidor exclusivo no Brasil, a SHR traz a excelência da Maletti Group, unindo tradição artesanal e tecnologia avançada.",
            image: "/images/hero/1.jpg",
            button1Text: "Conhecer Produtos",
            button1Link: "/produtos",
            button2Text: "Assistir Vídeo",
            button2Link: "#video",
          },
          {
            badge: "",
            title: "Nilo",
            subtitle: "O design a serviço do bem-estar",
            description: "Referência global em mobiliário de luxo para SPAs, hotéis e clínicas de estética. Soluções que transformam tratamentos em experiências sensoriais completas.",
            image: "/images/hero/2.jpg",
            button1Text: "Ver Coleção",
            button1Link: "/produtos",
            button2Text: "",
            button2Link: "",
          },
          {
            badge: "",
            title: "UKI",
            subtitle: "Inovação e estilo com a autêntica assinatura italiana",
            description: "A UKI International une moda e tecnologia para traduzir o \"Italian Sense of Beauty\" em equipamentos de alta performance.",
            image: "/images/hero/3.jpg",
            button1Text: "Conhecer Produtos",
            button1Link: "/produtos",
            button2Text: "",
            button2Link: "",
          },
          {
            badge: "",
            title: "Marco Boni",
            subtitle: "Excelência e precisão em cada detalhe",
            description: "Seleção exclusiva da linha profissional Marco Boni, essencial para o acabamento perfeito. Hair design e cuidados pessoais com alta durabilidade.",
            image: "/images/site/Shirobody_showroom.jpg",
            button1Text: "Conhecer Produtos",
            button1Link: "/produtos",
            button2Text: "",
            button2Link: "",
          },
        ],
        autoplaySpeed: 6000,
      },
    },
    {
      type: "featured-products",
      order: 1,
      active: true,
      content: {
        title: "Produtos em Destaque",
        subtitle: "Coleção",
        showNavigation: true,
        limit: 10,
      },
    },
    {
      type: "why-choose-us",
      order: 2,
      active: true,
      content: {
        title: "Excelência em cada detalhe",
        subtitle: "Por que nos escolher",
        description: "Há mais de uma década, a SHR é referência no mercado brasileiro de mobiliário para salões de beleza e spas. Nossa parceria exclusiva com a Maletti nos permite oferecer o que há de mais sofisticado em design e tecnologia italiana.",
        features: [
          { icon: "shield", title: "Distribuidor Exclusivo", description: "Somos o único representante oficial da Maletti no Brasil, garantindo produtos originais e suporte direto da fábrica." },
          { icon: "cube", title: "Design Italiano", description: "Cada peça é projetada na Itália com os mais altos padrões de design, ergonomia e qualidade de materiais." },
          { icon: "support", title: "Suporte Especializado", description: "Equipe técnica treinada para instalação, manutenção e suporte completo durante toda a vida útil do produto." },
          { icon: "sparkles", title: "Experiência Premium", description: "Transforme seu salão em um ambiente de luxo e proporcione aos seus clientes uma experiência inesquecível." },
        ],
        stats: [
          { value: "10+", label: "Anos de mercado" },
          { value: "500+", label: "Clientes atendidos" },
          { value: "100%", label: "Original Maletti" },
        ],
      },
    },
    {
      type: "maletti-partnership",
      order: 3,
      active: true,
      content: {
        title: "A tradição italiana no seu salão",
        subtitle: "Parceria Exclusiva",
        image: "/images/site/Shirobody_showroom.jpg",
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
    {
      type: "maintenance-preview",
      order: 4,
      active: true,
      content: {
        title: "Manutenção",
        subtitle: "Suporte Técnico",
        description: "Nossa equipe técnica especializada está preparada para manter seus equipamentos Maletti sempre em perfeito funcionamento. Oferecemos suporte completo, desde a instalação até a manutenção preventiva e corretiva.",
        services: [
          { icon: "wrench", title: "Manutenção Preventiva", description: "Prolongue a vida útil dos seus equipamentos com revisões periódicas." },
          { icon: "clock", title: "Atendimento Rápido", description: "Equipe técnica disponível para atendimento em todo o Brasil." },
          { icon: "check", title: "Peças Originais", description: "Utilizamos apenas peças originais Maletti em todos os reparos." },
        ],
        buttonText: "Solicitar Manutenção",
        buttonLink: "/manutencao",
      },
    },
    {
      type: "catalog-cta",
      order: 5,
      active: true,
      content: {
        title: "Receba nosso catálogo completo",
        subtitle: "Catálogo Digital",
        description: "Conheça toda a linha de produtos Maletti disponível no Brasil. Deixe seu e-mail e receba o catálogo digital com especificações técnicas e fotos em alta resolução.",
        phone: "(11) 98198-2279",
        phoneRaw: "+5511981982279",
        whatsappMessage: "Olá! Gostaria de falar com um consultor sobre os produtos Maletti.",
        buttonText: "Receber Catálogo",
        consultorButtonText: "Falar com Consultor",
      },
    },
  ];

  for (const block of blocks) {
    await prisma.pageBlock.create({
      data: {
        pageId: homePage.id,
        type: block.type,
        content: block.content,
        order: block.order,
        active: block.active,
      },
    });
    console.log(`✅ Created block: ${block.type}`);
  }

  console.log("🎉 Home page blocks seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
