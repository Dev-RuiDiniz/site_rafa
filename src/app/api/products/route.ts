import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const categorySlug = searchParams.get("category");

    const where: Record<string, unknown> = { active: true };
    
    if (featured === "true") {
      where.featured = true;
    }
    
    if (categorySlug) {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });
      if (category) {
        // Filtrar por categorias (many-to-many) OU categoryId (legado)
        where.OR = [
          { categoryId: category.id },
          { categories: { some: { categoryId: category.id } } }
        ];
      }
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        categories: {
          include: {
            category: true,
          },
        },
        brands: {
          include: {
            brand: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}
