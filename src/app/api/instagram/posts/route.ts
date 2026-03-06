/*
Arquivo: src/app/api/instagram/posts/route.ts
Objetivo: Endpoint de API do Next.js (App Router).
Guia rapido: consulte imports no topo, depois tipos/constantes, e por fim a exportacao principal.
*/

import { NextResponse } from "next/server";
import { syncInstagramPosts } from "@/lib/instagram-sync";

export const dynamic = "force-dynamic";

// GET /api/instagram/posts - Buscar posts do banco
export async function GET(request: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    if (!prisma) {
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);
    const requestedLimit = Number.parseInt(searchParams.get("limit") || "12", 10);
    const limit = Number.isFinite(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, 24)
      : 12;
    const syncMode = searchParams.get("sync") || "auto";

    if (syncMode !== "off") {
      await syncInstagramPosts({ minIntervalMs: 60 * 60 * 1000 });
    }

    const posts = await prisma.instagramPost.findMany({
      where: { isActive: true },
      orderBy: { timestamp: "desc" },
      take: limit,
    });

    return NextResponse.json(posts);
  } catch {
    // Retorna array vazio se tabela não existir ou outro erro
    return NextResponse.json([]);
  }
}
