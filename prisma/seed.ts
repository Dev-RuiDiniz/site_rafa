import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...\n");

  // ========== ADMIN ==========
  const securePassword = "Shr@Admin2024!";
  const hashedPassword = await bcrypt.hash(securePassword, 12);

  await prisma.user.upsert({
    where: { email: "admin@shr.com.br" },
    update: { password: hashedPassword },
    create: {
      email: "admin@shr.com.br",
      password: hashedPassword,
      name: "Administrador",
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Admin criado: admin@shr.com.br / " + securePassword);

  // ========== MARCAS ==========
  const brandsData = [
    {
      name: "Maletti",
      slug: "maletti",
      description: "A referência mundial em design e inovação para salões de beleza. A Maletti Group, fundada em 1959, é líder global em mobiliário e equipamentos para o setor de beleza profissional.",
      logo: "/images/brands/maletti-logo.png",
      image: "/images/hero/1.jpg",
      highlights: ["Design Italiano", "Tradição desde 1959", "Líder Global", "Inovação Tecnológica"],
    },
    {
      name: "Nilo",
      slug: "nilo",
      description: "O design a serviço do bem-estar. Referência global em mobiliário de luxo para SPAs, hotéis e clínicas de estética.",
      logo: "/images/brands/nilo-logo.png",
      image: "/images/hero/2.jpg",
      highlights: ["Mobiliário de Luxo", "SPAs e Hotéis", "Bem-estar", "Design Premium"],
    },
    {
      name: "UKI",
      slug: "uki",
      description: "Inovação e estilo com a autêntica assinatura italiana. A UKI International une moda e tecnologia para traduzir o 'Italian Sense of Beauty'.",
      logo: "/images/brands/uki-logo.png",
      image: "/images/hero/3.jpg",
      highlights: ["Assinatura Italiana", "Moda e Tecnologia", "Alta Performance", "Design Exclusivo"],
    },
    {
      name: "Marco Boni",
      slug: "marco-boni",
      description: "Excelência e precisão em cada detalhe. Seleção exclusiva da linha profissional Marco Boni, essencial para o acabamento perfeito.",
      logo: "/images/brands/marcoboni-logo.png",
      image: "/images/site/Shirobody_showroom.jpg",
      highlights: ["Linha Profissional", "Alta Durabilidade", "Precisão", "Hair Design"],
    },
  ];

  const brands: Record<string, string> = {};
  for (const brand of brandsData) {
    const created = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
    brands[brand.slug] = created.id;
  }
  console.log("✅ " + brandsData.length + " marcas criadas");

  // ========== CATEGORIAS ==========
  const categoriesData = [
    {
      name: "Lavatórios",
      slug: "lavatorios",
      description: "Lavatórios de design italiano com tecnologia de ponta para lavagem de cabelos.",
      image: "/images/site/heaven2.jpg",
      order: 1,
    },
    {
      name: "Macas",
      slug: "macas",
      description: "Macas de massagem e tratamentos corporais com design e conforto premium.",
      image: "/images/site/nilo.jpg",
      order: 2,
    },
    {
      name: "Poltronas",
      slug: "poltronas",
      description: "Poltronas de corte e tratamento com ergonomia e design assinado.",
      image: "/images/site/Shirobody_showroom.jpg",
      order: 3,
    },
    {
      name: "Elétricos",
      slug: "eletricos",
      description: "Equipamentos elétricos profissionais para tratamentos capilares avançados.",
      image: "/images/site/SPA_GARCON_nuovo_03.png",
      order: 4,
    },
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories[cat.slug] = created.id;
  }
  console.log("✅ " + categoriesData.length + " categorias criadas");

  // ========== PRODUTOS ==========
  const productsData = [
    // LAVATÓRIOS
    { name: "Shirobody", slug: "shirobody", categorySlug: "lavatorios", shortDescription: "Tecnologia shiatsu integrada para uma experiência única.", description: "O Shirobody combina a tradição milenar da massagem shiatsu japonesa com o design sofisticado italiano. Este equipamento revolucionário oferece uma experiência completa de relaxamento durante o tratamento capilar.", features: ["Sistema de massagem shiatsu", "Múltiplos programas", "Intensidade ajustável", "Aquecimento integrado"], image: "/images/site/Shirobody_showroom.jpg", gallery: ["/images/site/Shirobody_showroom.jpg"], featured: true, brandSlugs: ["maletti", "nilo"] },
    { name: "Heaven", slug: "heaven", categorySlug: "lavatorios", shortDescription: "A perfeição em design e conforto para lavagem de cabelos.", description: "O Heaven representa o ápice da engenharia italiana aplicada ao bem-estar.", features: ["Ajuste elétrico de altura", "Apoio de pescoço ergonômico", "Cuba em cerâmica italiana", "Design premiado"], image: "/images/site/heaven2.jpg", gallery: ["/images/site/heaven2.jpg"], featured: true, brandSlugs: ["maletti"] },
    { name: "Dream Flow", slug: "dream-flow", categorySlug: "lavatorios", shortDescription: "Lavatório com design fluido e ergonomia avançada.", description: "O Dream Flow oferece uma experiência de lavagem incomparável com seu design inovador.", features: ["Design fluido", "Ergonomia avançada", "Cuba em cerâmica", "Conforto superior"], image: "/images/site/heaven2.jpg", gallery: ["/images/site/heaven2.jpg"], featured: false, brandSlugs: ["maletti"] },
    { name: "Shirodara", slug: "shirodara", categorySlug: "lavatorios", shortDescription: "Lavatório com sistema de tratamento ayurvédico.", description: "O Shirodara combina o lavatório tradicional com tecnologia de tratamento ayurvédico.", features: ["Sistema ayurvédico", "Relaxamento profundo", "Design elegante", "Tratamento holístico"], image: "/images/site/heaven2.jpg", gallery: ["/images/site/heaven2.jpg"], featured: false, brandSlugs: ["maletti"] },
    { name: "Hub", slug: "hub", categorySlug: "lavatorios", shortDescription: "Lavatório multifuncional para espaços modernos.", description: "O Hub é um lavatório versátil que se adapta a diferentes configurações de salão.", features: ["Multifuncional", "Design moderno", "Fácil instalação", "Alta durabilidade"], image: "/images/site/heaven2.jpg", gallery: ["/images/site/heaven2.jpg"], featured: false, brandSlugs: ["maletti", "nilo"] },
    { name: "Divina Armchair Easy", slug: "divina-armchair-easy", categorySlug: "lavatorios", shortDescription: "Poltrona de lavatório com design italiano elegante.", description: "A Divina Armchair Easy combina conforto e estilo em um design atemporal.", features: ["Design italiano", "Conforto premium", "Estofamento de qualidade", "Fácil manutenção"], image: "/images/site/heaven2.jpg", gallery: ["/images/site/heaven2.jpg"], featured: false, brandSlugs: ["maletti"] },
    { name: "Divina Armchair Super", slug: "divina-armchair-super", categorySlug: "lavatorios", shortDescription: "Versão premium da poltrona Divina com recursos adicionais.", description: "A Divina Armchair Super oferece recursos premium para máximo conforto.", features: ["Recursos premium", "Ajustes avançados", "Materiais nobres", "Conforto superior"], image: "/images/site/heaven2.jpg", gallery: ["/images/site/heaven2.jpg"], featured: false, brandSlugs: ["maletti"] },
    { name: "Eden", slug: "eden", categorySlug: "lavatorios", shortDescription: "Lavatório com design orgânico inspirado na natureza.", description: "O Eden traz um design orgânico que harmoniza com qualquer ambiente.", features: ["Design orgânico", "Linhas suaves", "Alta qualidade", "Durabilidade"], image: "/images/site/heaven2.jpg", gallery: ["/images/site/heaven2.jpg"], featured: false, brandSlugs: ["maletti"] },
    { name: "Zen", slug: "zen", categorySlug: "lavatorios", shortDescription: "Lavatório minimalista para ambientes contemporâneos.", description: "O Zen oferece linhas limpas e design minimalista.", features: ["Design minimalista", "Linhas limpas", "Contemporâneo", "Elegante"], image: "/images/site/heaven2.jpg", gallery: ["/images/site/heaven2.jpg"], featured: false, brandSlugs: ["maletti"] },
    { name: "Lady Lion", slug: "lady-lion", categorySlug: "lavatorios", shortDescription: "Lavatório clássico com toques de sofisticação.", description: "O Lady Lion combina estilo clássico com funcionalidade moderna.", features: ["Estilo clássico", "Sofisticação", "Funcionalidade", "Durabilidade"], image: "/images/site/heaven2.jpg", gallery: ["/images/site/heaven2.jpg"], featured: false, brandSlugs: ["maletti"] },
    { name: "Igloo", slug: "igloo", categorySlug: "lavatorios", shortDescription: "Lavatório com design envolvente e aconchegante.", description: "O Igloo oferece uma experiência envolvente durante o tratamento.", features: ["Design envolvente", "Conforto", "Privacidade", "Relaxamento"], image: "/images/site/heaven2.jpg", gallery: ["/images/site/heaven2.jpg"], featured: false, brandSlugs: ["maletti"] },
    // MACAS
    { name: "Abu Dhabi", slug: "abu-dhabi", categorySlug: "macas", shortDescription: "Maca de luxo para tratamentos corporais exclusivos.", description: "A Abu Dhabi é uma maca de luxo que oferece conforto excepcional.", features: ["Design luxuoso", "Ajustes elétricos", "Conforto premium", "Materiais nobres"], image: "/images/site/nilo.jpg", gallery: ["/images/site/nilo.jpg"], featured: true, brandSlugs: ["nilo"] },
    { name: "Daisy", slug: "daisy", categorySlug: "macas", shortDescription: "Maca versátil para diversos tipos de tratamento.", description: "A Daisy é uma maca versátil ideal para múltiplos tratamentos.", features: ["Versátil", "Fácil ajuste", "Confortável", "Durável"], image: "/images/site/nilo.jpg", gallery: ["/images/site/nilo.jpg"], featured: false, brandSlugs: ["nilo"] },
    { name: "Yas Island", slug: "yas-island", categorySlug: "macas", shortDescription: "Maca inspirada no luxo do Oriente Médio.", description: "A Yas Island traz o luxo e sofisticação para seu spa.", features: ["Luxo oriental", "Conforto superior", "Design exclusivo", "Alta qualidade"], image: "/images/site/nilo.jpg", gallery: ["/images/site/nilo.jpg"], featured: false, brandSlugs: ["nilo"] },
    { name: "Omnia", slug: "omnia", categorySlug: "macas", shortDescription: "Maca multifuncional para spa completo.", description: "A Omnia é uma maca multifuncional para diversos tratamentos.", features: ["Multifuncional", "Ajustes múltiplos", "Conforto", "Durabilidade"], image: "/images/site/nilo.jpg", gallery: ["/images/site/nilo.jpg"], featured: false, brandSlugs: ["nilo"] },
    { name: "Ninfea", slug: "ninfea", categorySlug: "macas", shortDescription: "Maca com design floral elegante.", description: "A Ninfea combina beleza e funcionalidade em um design único.", features: ["Design floral", "Elegância", "Funcionalidade", "Conforto"], image: "/images/site/nilo.jpg", gallery: ["/images/site/nilo.jpg"], featured: false, brandSlugs: ["nilo"] },
    { name: "Sensus Basic", slug: "sensus-basic", categorySlug: "macas", shortDescription: "Maca essencial com qualidade premium.", description: "A Sensus Basic oferece qualidade premium em formato essencial.", features: ["Qualidade premium", "Preço acessível", "Conforto", "Durabilidade"], image: "/images/site/nilo.jpg", gallery: ["/images/site/nilo.jpg"], featured: false, brandSlugs: ["nilo"] },
    { name: "Dubai", slug: "dubai", categorySlug: "macas", shortDescription: "Maca de luxo inspirada na opulência de Dubai.", description: "A Dubai representa o máximo em luxo e sofisticação.", features: ["Luxo máximo", "Opulência", "Conforto excepcional", "Design exclusivo"], image: "/images/site/nilo.jpg", gallery: ["/images/site/nilo.jpg"], featured: false, brandSlugs: ["nilo"] },
    { name: "Total Body", slug: "total-body", categorySlug: "macas", shortDescription: "Experiência completa de spa com tecnologia avançada.", description: "O Total Body é a solução definitiva para tratamentos corporais de alto padrão.", features: ["Cápsula de tratamento", "Sistema de vapor", "Cromoterapia LED", "Aromaterapia"], image: "/images/site/Total-Body-356.jpg", gallery: ["/images/site/Total-Body-356.jpg"], featured: true, brandSlugs: ["nilo"] },
    // POLTRONAS
    { name: "Lioness", slug: "lioness", categorySlug: "poltronas", shortDescription: "Poltrona de corte com design imponente.", description: "A Lioness é uma poltrona que combina força e elegância.", features: ["Design imponente", "Conforto", "Durabilidade", "Estilo clássico"], image: "/images/site/Shirobody_showroom.jpg", gallery: ["/images/site/Shirobody_showroom.jpg"], featured: true, brandSlugs: ["maletti"] },
    { name: "Lioness Reclinável", slug: "lioness-reclinavel", categorySlug: "poltronas", shortDescription: "Versão reclinável da icônica Lioness.", description: "A Lioness Reclinável oferece conforto extra com sistema de recline.", features: ["Sistema reclinável", "Conforto extra", "Design imponente", "Versatilidade"], image: "/images/site/Shirobody_showroom.jpg", gallery: ["/images/site/Shirobody_showroom.jpg"], featured: false, brandSlugs: ["maletti"] },
    { name: "Angelina", slug: "angelina", categorySlug: "poltronas", shortDescription: "Poltrona elegante com linhas suaves.", description: "A Angelina traz elegância e conforto em linhas suaves.", features: ["Linhas suaves", "Elegância", "Conforto", "Design feminino"], image: "/images/site/Shirobody_showroom.jpg", gallery: ["/images/site/Shirobody_showroom.jpg"], featured: false, brandSlugs: ["maletti"] },
    { name: "Lord Wellington", slug: "lord-wellington", categorySlug: "poltronas", shortDescription: "Poltrona clássica com estilo britânico.", description: "A Lord Wellington evoca a tradição e elegância britânica.", features: ["Estilo britânico", "Tradição", "Elegância", "Conforto clássico"], image: "/images/site/Shirobody_showroom.jpg", gallery: ["/images/site/Shirobody_showroom.jpg"], featured: false, brandSlugs: ["maletti"] },
    { name: "Sarah", slug: "sarah", categorySlug: "poltronas", shortDescription: "Poltrona contemporânea e versátil.", description: "A Sarah é uma poltrona contemporânea para qualquer ambiente.", features: ["Contemporânea", "Versátil", "Design moderno", "Conforto"], image: "/images/site/Shirobody_showroom.jpg", gallery: ["/images/site/Shirobody_showroom.jpg"], featured: false, brandSlugs: ["maletti"] },
    // ELÉTRICOS
    { name: "Spa Garçon", slug: "spa-garcon", categorySlug: "eletricos", shortDescription: "Tratamento capilar com tecnologia de vapor.", description: "O Spa Garçon é o equipamento profissional ideal para tratamentos capilares.", features: ["Sistema de vapor", "Timer digital", "Design ergonômico", "Múltiplas funções"], image: "/images/site/SPA_GARCON_nuovo_03.png", gallery: ["/images/site/SPA_GARCON_nuovo_03.png"], featured: true, brandSlugs: ["maletti"] },
    { name: "Vapomist 2", slug: "vapomist-2", categorySlug: "eletricos", shortDescription: "Sistema de vaporização profissional.", description: "O Vapomist 2 oferece vaporização de alta qualidade para tratamentos.", features: ["Vaporização profissional", "Controle de temperatura", "Fácil uso", "Durabilidade"], image: "/images/site/SPA_GARCON_nuovo_03.png", gallery: ["/images/site/SPA_GARCON_nuovo_03.png"], featured: false, brandSlugs: ["maletti"] },
    { name: "Hair Station", slug: "hair-station", categorySlug: "eletricos", shortDescription: "Estação completa para tratamentos capilares.", description: "A Hair Station é uma estação completa e versátil.", features: ["Estação completa", "Múltiplas funções", "Praticidade", "Profissional"], image: "/images/site/SPA_GARCON_nuovo_03.png", gallery: ["/images/site/SPA_GARCON_nuovo_03.png"], featured: false, brandSlugs: ["maletti"] },
  ];

  let productCount = 0;
  for (const prod of productsData) {
    const { brandSlugs, categorySlug, ...productData } = prod;
    
    const existing = await prisma.product.findUnique({ where: { slug: prod.slug } });
    
    if (existing) {
      await prisma.product.update({
        where: { slug: prod.slug },
        data: {
          ...productData,
          categoryId: categories[categorySlug],
        },
      });
    } else {
      const created = await prisma.product.create({
        data: {
          ...productData,
          categoryId: categories[categorySlug],
        },
      });

      // Vincular marcas
      if (brandSlugs && brandSlugs.length > 0) {
        for (const brandSlug of brandSlugs) {
          if (brands[brandSlug]) {
            await prisma.productBrand.create({
              data: {
                productId: created.id,
                brandId: brands[brandSlug],
              },
            }).catch(() => {}); // Ignora se já existir
          }
        }
      }
    }
    productCount++;
  }
  console.log("✅ " + productCount + " produtos criados");

  // ========== BANNERS ==========
  const bannersData = [
    {
      badge: "Distribuidor Exclusivo Maletti no Brasil",
      title: "Maletti",
      subtitle: "A referência mundial em design e inovação",
      description: "Como distribuidor exclusivo no Brasil, a SHR traz a excelência da Maletti Group, unindo tradição artesanal e tecnologia avançada.",
      image: "/images/hero/1.jpg",
      button1Text: "Conhecer Produtos",
      button1Link: "/produtos",
      button1Color: "white",
      button2Text: "Fale Conosco",
      button2Link: "/contato",
      button2Color: "outline",
      order: 0,
    },
    {
      badge: "Distribuidor Exclusivo Maletti no Brasil",
      title: "Nilo",
      subtitle: "O design a serviço do bem-estar",
      description: "Referência global em mobiliário de luxo para SPAs, hotéis e clínicas de estética. Soluções que transformam tratamentos em experiências sensoriais completas.",
      image: "/images/hero/2.jpg",
      button1Text: "Ver Coleção",
      button1Link: "/produtos?categoria=macas",
      button1Color: "white",
      order: 1,
    },
    {
      badge: "Distribuidor Exclusivo Maletti no Brasil",
      title: "UKI",
      subtitle: "Inovação e estilo com a autêntica assinatura italiana",
      description: "A UKI International une moda e tecnologia para traduzir o 'Italian Sense of Beauty' em equipamentos de alta performance.",
      image: "/images/hero/3.jpg",
      button1Text: "Explorar",
      button1Link: "/marcas",
      button1Color: "white",
      order: 2,
    },
    {
      badge: "Distribuidor Exclusivo Maletti no Brasil",
      title: "Marco Boni",
      subtitle: "Excelência e precisão em cada detalhe",
      description: "Seleção exclusiva da linha profissional Marco Boni, essencial para o acabamento perfeito. Hair design e cuidados pessoais com alta durabilidade.",
      image: "/images/site/Shirobody_showroom.jpg",
      button1Text: "Conhecer",
      button1Link: "/marcas",
      button1Color: "white",
      order: 3,
    },
  ];

  for (const banner of bannersData) {
    await prisma.banner.upsert({
      where: { id: `banner-${banner.order}` },
      update: banner,
      create: { id: `banner-${banner.order}`, ...banner },
    });
  }
  console.log("✅ " + bannersData.length + " banners criados");

  console.log("\n🎉 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
