import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔧 Seeding page blocks with existing content...");

  // Blocos para página Tricologia
  const tricologiaPage = await prisma.page.findUnique({ where: { slug: "tricologia" } });
  if (tricologiaPage) {
    // Limpar blocos existentes
    await prisma.pageBlock.deleteMany({ where: { pageId: tricologiaPage.id } });

    const tricologiaBlocks = [
      {
        type: "hero",
        order: 1,
        active: true,
        pageId: tricologiaPage.id,
        content: {
          title: "A união do Design Italiano com a Tecnologia Coreana: A revolução no tratamento capilar chegou à sua clínica.",
          subtitle: "Conheça o ecossistema de equipamentos que está redefinindo o padrão mundial de wellness e tricologia.",
          description: "Aumente seu faturamento sem precisar aumentar o número de pacientes.",
          video: "/Vídeo Home.mp4",
          overlay: 60,
          button1Text: "Explorar a Coleção Completa",
          button1Link: "/produtos",
          align: "center",
        },
      },
      {
        type: "text",
        order: 2,
        active: true,
        pageId: tricologiaPage.id,
        content: {
          title: "Você entrega resultados clínicos, mas o cliente percebe o valor cobrado?",
          content: "Mesmo com a melhor técnica tricológica, muitas clínicas enfrentam o mesmo desafio: o paciente vê o tratamento como um processo funcional, e não como uma experiência premium.",
          align: "center",
          background: "white",
        },
      },
      {
        type: "features",
        order: 3,
        active: true,
        pageId: tricologiaPage.id,
        content: {
          title: "A Solução Maletti",
          subtitle: "Transforme a cadeira de tratamento no lugar mais desejado da sua clínica",
          columns: 3,
          items: [
            { icon: "star", title: 'Ergonomia "Zero Gravity"', description: "Conforto absoluto para terapias de longa duração." },
            { icon: "award", title: "Estética Premiada", description: "Assinada por designers renomados como Giovannoni e Alberto Apostoli." },
            { icon: "zap", title: "Tecnologia Integrada", description: "Vapor, luz e água trabalhando em sinergia." },
          ],
        },
      },
      {
        type: "cards",
        order: 4,
        active: true,
        pageId: tricologiaPage.id,
        content: {
          title: "Estações de Excelência",
          subtitle: "Equipamentos Premium",
          columns: 2,
          cards: [
            { image: "/images/site/heaven2.jpg", title: "Heaven", description: "O Símbolo do Bem-Estar - Projetada sob o conceito 'Washing becomes a wellness ritual'.", link: "/produtos/heaven" },
            { image: "/images/site/Shirobody_showroom.jpg", title: "Shirobody", description: "A Multifuncionalidade Holística - Inspirada na medicina Ayurveda.", link: "/produtos/shirobody" },
            { image: "/images/site/Total-Body-356.jpg", title: "Total Body", description: "A Estação Definitiva - Equipada com 4 motores, esta cama multifuncional permite massagens, pedicure, manicure.", link: "/produtos/total-body" },
            { image: "/images/site/SPA_GARCON_nuovo_03.png", title: "Spa Garçon", description: "Assistente Móvel Inteligente - Projetado para auxiliar o profissional.", link: "/produtos/spa-garcon" },
          ],
        },
      },
      {
        type: "features",
        order: 5,
        active: true,
        pageId: tricologiaPage.id,
        content: {
          title: "Potencialize seus resultados com Tecnologias Exclusivas",
          subtitle: "A Ciência por Trás do Ritual",
          columns: 2,
          background: "black",
          items: [
            { icon: "💨", title: "VAPOMIST - Infusão a Vapor", description: "Sistema de névoa ionizada que dilata os poros e potencializa a absorção de ativos." },
            { icon: "💧", title: "AQUA PEEL - Detox Profundo", description: "Sistema avançado de sucção e infusão que remove sebo e resíduos sem agredir." },
            { icon: "⚡", title: "CORRENTE GALVÂNICA", description: "Microcorrentes para estimular a atividade celular e melhora a microcirculação." },
            { icon: "🌡️", title: "IGLOO - Cúpula Térmica", description: "Cúpula que cria um microclima de sauna para intensificar o relaxamento." },
          ],
        },
      },
      {
        type: "gallery",
        order: 6,
        active: true,
        pageId: tricologiaPage.id,
        content: {
          title: "Design que transforma ambientes",
          columns: 3,
          images: [
            "/images/site/Shirobody_showroom.jpg",
            "/images/site/heaven2.jpg",
            "/images/site/Total-Body-356.jpg",
            "/images/site/DK3E3179-MOD.jpg",
            "/images/site/Head-spa-1.jpg",
            "/images/site/Head-spa-2.jpg",
          ],
        },
      },
      {
        type: "cta",
        order: 7,
        active: true,
        pageId: tricologiaPage.id,
        content: {
          title: "Sua clínica está pronta para o próximo nível?",
          description: "A tecnologia Maletti precisa ser vista e sentida para ser compreendida. Convidamos você a conhecer os detalhes técnicos que farão a diferença no seu protocolo.",
          buttonText: "Saber Mais Sobre os Produtos",
          buttonLink: "/produtos",
          background: "white",
        },
      },
    ];

    for (const block of tricologiaBlocks) {
      await prisma.pageBlock.create({ data: block });
    }
    console.log("  ✓ Tricologia - 7 blocos criados");
  }

  // Blocos para página SPA
  const spaPage = await prisma.page.findUnique({ where: { slug: "spa" } });
  if (spaPage) {
    await prisma.pageBlock.deleteMany({ where: { pageId: spaPage.id } });

    const spaBlocks = [
      {
        type: "hero",
        order: 1,
        active: true,
        pageId: spaPage.id,
        content: {
          title: "Equipamentos Premium para SPA & Bem-Estar",
          subtitle: "Transforme seu espaço em um santuário de relaxamento",
          description: "Design italiano premiado aliado à mais alta tecnologia para experiências inesquecíveis.",
          video: "/Vídeo Home.mp4",
          overlay: 60,
          button1Text: "Ver Equipamentos",
          button1Link: "/produtos",
          align: "center",
        },
      },
      {
        type: "cards",
        order: 2,
        active: true,
        pageId: spaPage.id,
        content: {
          title: "Equipamentos para SPA",
          columns: 2,
          cards: [
            { image: "/images/site/heaven2.jpg", title: "Heaven", description: "Estação de bem-estar com ajuste elétrico silencioso.", link: "/produtos/heaven" },
            { image: "/images/site/Total-Body-356.jpg", title: "Total Body", description: "Cama multifuncional com hidromassagem integrada.", link: "/produtos/total-body" },
            { image: "/images/site/Shirobody_showroom.jpg", title: "Shirobody", description: "Sistema completo para tratamentos holísticos.", link: "/produtos/shirobody" },
          ],
        },
      },
      {
        type: "cta",
        order: 3,
        active: true,
        pageId: spaPage.id,
        content: {
          title: "Pronto para elevar a experiência do seu SPA?",
          description: "Entre em contato conosco para conhecer as soluções ideais para o seu espaço.",
          buttonText: "Falar com Consultor",
          buttonLink: "https://wa.me/5511981982279",
          background: "black",
        },
      },
    ];

    for (const block of spaBlocks) {
      await prisma.pageBlock.create({ data: block });
    }
    console.log("  ✓ SPA - 3 blocos criados");
  }

  // Blocos para página Salão de Beleza
  const salaoPage = await prisma.page.findUnique({ where: { slug: "salao-de-beleza" } });
  if (salaoPage) {
    await prisma.pageBlock.deleteMany({ where: { pageId: salaoPage.id } });

    const salaoBlocks = [
      {
        type: "hero",
        order: 1,
        active: true,
        pageId: salaoPage.id,
        content: {
          title: "Mobiliário Premium para Salões de Beleza",
          subtitle: "Design italiano que transforma seu salão",
          description: "Lavatórios, cadeiras e móveis com qualidade e elegância Maletti.",
          image: "/images/site/lavatórios.jpg",
          overlay: 50,
          button1Text: "Ver Catálogo Completo",
          button1Link: "/produtos",
          align: "center",
        },
      },
      {
        type: "cards",
        order: 2,
        active: true,
        pageId: salaoPage.id,
        content: {
          title: "Linha Completa para Salões",
          columns: 3,
          cards: [
            { image: "/images/site/lavatórios.jpg", title: "Lavatórios", description: "Design ergonômico com máximo conforto para seus clientes.", link: "/produtos?categoria=lavatorios" },
            { image: "/images/site/cadeiras.jpg", title: "Cadeiras", description: "Estilo e funcionalidade para todos os serviços.", link: "/produtos?categoria=cadeiras" },
            { image: "/images/site/mobiliario.jpg", title: "Mobiliário", description: "Móveis auxiliares e bancadas de trabalho.", link: "/produtos?categoria=mobiliario" },
          ],
        },
      },
      {
        type: "cta",
        order: 3,
        active: true,
        pageId: salaoPage.id,
        content: {
          title: "Transforme seu Salão com Maletti",
          description: "Solicite um orçamento personalizado para o seu projeto.",
          buttonText: "Solicitar Orçamento",
          buttonLink: "https://wa.me/5511981982279",
          background: "black",
        },
      },
    ];

    for (const block of salaoBlocks) {
      await prisma.pageBlock.create({ data: block });
    }
    console.log("  ✓ Salão de Beleza - 3 blocos criados");
  }

  // Blocos para página Home
  const homePage = await prisma.page.findUnique({ where: { slug: "home" } });
  if (homePage) {
    await prisma.pageBlock.deleteMany({ where: { pageId: homePage.id } });

    const homeBlocks = [
      {
        type: "hero",
        order: 1,
        active: true,
        pageId: homePage.id,
        content: {
          badge: "Distribuidor Exclusivo",
          title: "Maletti no Brasil",
          subtitle: "A excelência italiana em equipamentos para salões de beleza e spas",
          description: "Há mais de 85 anos, a Maletti é referência mundial em design e inovação.",
          video: "/Vídeo Home.mp4",
          overlay: 60,
          button1Text: "Ver Produtos",
          button1Link: "/produtos",
          button2Text: "Fale Conosco",
          button2Link: "/contato",
          align: "center",
        },
      },
      {
        type: "features",
        order: 2,
        active: true,
        pageId: homePage.id,
        content: {
          title: "Por que escolher Maletti?",
          columns: 3,
          items: [
            { icon: "flag", title: "Made in Italy", description: "Qualidade e design italiano reconhecidos mundialmente." },
            { icon: "shield", title: "Garantia", description: "Suporte técnico especializado no Brasil." },
            { icon: "award", title: "Design Premiado", description: "Peças assinadas por designers renomados." },
          ],
        },
      },
      {
        type: "cta",
        order: 3,
        active: true,
        pageId: homePage.id,
        content: {
          title: "Pronto para transformar seu espaço?",
          description: "Entre em contato e descubra como a Maletti pode elevar o padrão do seu negócio.",
          buttonText: "Falar com Especialista",
          buttonLink: "https://wa.me/5511981982279",
          background: "black",
        },
      },
    ];

    for (const block of homeBlocks) {
      await prisma.pageBlock.create({ data: block });
    }
    console.log("  ✓ Home - 3 blocos criados");
  }

  // Blocos para página Sobre
  const sobrePage = await prisma.page.findUnique({ where: { slug: "sobre" } });
  if (sobrePage) {
    await prisma.pageBlock.deleteMany({ where: { pageId: sobrePage.id } });

    const sobreBlocks = [
      {
        type: "hero",
        order: 1,
        active: true,
        pageId: sobrePage.id,
        content: {
          title: "Sobre a SHR HAIR",
          subtitle: "Distribuidor exclusivo Maletti no Brasil",
          description: "Levamos a excelência italiana para os melhores salões e spas do país.",
          image: "/images/site/showroom.jpg",
          overlay: 50,
          align: "center",
        },
      },
      {
        type: "text",
        order: 2,
        active: true,
        pageId: sobrePage.id,
        content: {
          title: "Nossa História",
          content: "A SHR HAIR é o distribuidor exclusivo da Maletti no Brasil, trazendo para o mercado nacional o melhor do design e da engenharia italiana em equipamentos para salões de beleza e spas. Com anos de experiência no mercado de beleza, oferecemos não apenas produtos premium, mas também suporte técnico especializado e consultoria para projetos.",
          align: "center",
          background: "white",
        },
      },
      {
        type: "features",
        order: 3,
        active: true,
        pageId: sobrePage.id,
        content: {
          title: "Nossos Diferenciais",
          columns: 3,
          items: [
            { icon: "check", title: "Exclusividade", description: "Únicos distribuidores oficiais Maletti no Brasil." },
            { icon: "tool", title: "Suporte Técnico", description: "Equipe especializada para instalação e manutenção." },
            { icon: "truck", title: "Logística Nacional", description: "Entrega em todo o território brasileiro." },
          ],
        },
      },
    ];

    for (const block of sobreBlocks) {
      await prisma.pageBlock.create({ data: block });
    }
    console.log("  ✓ Sobre - 3 blocos criados");
  }

  // Blocos para página Contato
  const contatoPage = await prisma.page.findUnique({ where: { slug: "contato" } });
  if (contatoPage) {
    await prisma.pageBlock.deleteMany({ where: { pageId: contatoPage.id } });

    const contatoBlocks = [
      {
        type: "hero",
        order: 1,
        active: true,
        pageId: contatoPage.id,
        content: {
          title: "Entre em Contato",
          subtitle: "Estamos prontos para atender você",
          description: "Tire suas dúvidas, solicite orçamentos ou agende uma visita ao nosso showroom.",
          image: "/images/site/showroom.jpg",
          overlay: 60,
          align: "center",
        },
      },
      {
        type: "text",
        order: 2,
        active: true,
        pageId: contatoPage.id,
        content: {
          title: "Informações de Contato",
          content: "WhatsApp: (11) 98198-2279\nEmail: contato@shrhair.com.br\nEndereço: São Paulo - SP",
          align: "center",
          background: "gray",
        },
      },
    ];

    for (const block of contatoBlocks) {
      await prisma.pageBlock.create({ data: block });
    }
    console.log("  ✓ Contato - 2 blocos criados");
  }

  console.log("✅ Page blocks seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
