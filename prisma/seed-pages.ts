import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔧 Seeding system pages...");

  // Páginas do sistema SHR
  const shrPages = [
    {
      name: "Home",
      slug: "home",
      title: "SHR - Distribuidor Exclusivo Maletti",
      description: "Página inicial do site SHR",
      isSystem: true,
      published: true,
    },
    {
      name: "Sobre",
      slug: "sobre",
      title: "Sobre a SHR",
      description: "Página sobre a empresa",
      isSystem: true,
      published: true,
    },
    {
      name: "Produtos",
      slug: "produtos",
      title: "Produtos",
      description: "Catálogo de produtos",
      isSystem: true,
      published: true,
    },
    {
      name: "Marcas",
      slug: "marcas",
      title: "Marcas",
      description: "Nossas marcas parceiras",
      isSystem: true,
      published: true,
    },
    {
      name: "Manutenção",
      slug: "manutencao",
      title: "Manutenção",
      description: "Serviços de manutenção",
      isSystem: true,
      published: true,
    },
    {
      name: "Contato",
      slug: "contato",
      title: "Contato",
      description: "Entre em contato conosco",
      isSystem: true,
      published: true,
    },
    {
      name: "Blog",
      slug: "blog",
      title: "Blog",
      description: "Artigos e novidades",
      isSystem: true,
      published: true,
    },
  ];

  // Páginas Maletti (LPs)
  const malettiPages = [
    {
      name: "Maletti - Home",
      slug: "maletti",
      title: "Maletti Brasil",
      description: "Página principal Maletti",
      isSystem: true,
      published: true,
    },
    {
      name: "Salão de Beleza",
      slug: "salao-de-beleza",
      title: "Mobiliário para Salão de Beleza",
      description: "LP Salão de Beleza",
      isSystem: true,
      published: true,
    },
    {
      name: "SPA",
      slug: "spa",
      title: "Equipamentos para SPA",
      description: "LP SPA e Bem-estar",
      isSystem: true,
      published: true,
    },
    {
      name: "Tricologia",
      slug: "tricologia",
      title: "Equipamentos para Tricologia",
      description: "LP Tricologia",
      isSystem: true,
      published: true,
    },
  ];

  // Inserir páginas
  for (const page of [...shrPages, ...malettiPages]) {
    const existing = await prisma.page.findUnique({ where: { slug: page.slug } });
    if (!existing) {
      await prisma.page.create({ data: page });
      console.log(`  ✓ ${page.name}`);
    } else {
      console.log(`  - ${page.name} (já existe)`);
    }
  }

  console.log("✅ System pages seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
