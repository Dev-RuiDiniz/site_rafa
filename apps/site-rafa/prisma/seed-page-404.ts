import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔧 Creating 404 page...");

  const existing = await prisma.page.findUnique({ where: { slug: "404" } });
  if (existing) {
    console.log("  - Página 404 já existe, pulando.");
  } else {
    await prisma.page.create({
      data: {
        name: "Página 404",
        slug: "404",
        title: "Página Não Encontrada",
        description: "Página exibida quando o conteúdo não é encontrado",
        isSystem: true,
        published: true,
      },
    });
    console.log("  ✓ Página 404 criada!");
  }

  console.log("✅ Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
