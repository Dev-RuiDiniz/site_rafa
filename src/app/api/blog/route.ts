import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const tagSlug = searchParams.get("tag");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = {
      published: true,
    };

    if (categorySlug) {
      where.categories = {
        some: {
          category: { slug: categorySlug },
        },
      };
    }

    if (tagSlug) {
      where.tags = {
        some: {
          tag: { slug: tagSlug },
        },
      };
    }

    const [posts, categories, tags] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        take: limit,
        include: {
          categories: { include: { category: true } },
          tags: { include: { tag: true } },
        },
      }),
      prisma.blogCategory.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { posts: true } } },
      }),
      prisma.blogTag.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { posts: true } } },
      }),
    ]);

    return NextResponse.json({ posts, categories, tags });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: "Erro ao buscar posts" }, { status: 500 });
  }
}
