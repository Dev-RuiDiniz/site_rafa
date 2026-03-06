/*
Arquivo: src/app/api/instagram/sync/route.ts
Objetivo: Endpoint de API do Next.js (App Router).
Guia rapido: consulte imports no topo, depois tipos/constantes, e por fim a exportacao principal.
*/

import { NextResponse } from "next/server";
import { syncInstagramPosts } from "@/lib/instagram-sync";

// POST /api/instagram/sync - Sincronizar posts do Apify para o banco
export async function POST() {
  try {
    const result = await syncInstagramPosts({ force: true });
    if (!result.success) {
      if (result.message.includes("APIFY_API_TOKEN")) {
        return NextResponse.json({ error: result.message }, { status: 503 });
      }
      if (result.message.includes("Database")) {
        return NextResponse.json({ error: result.message }, { status: 503 });
      }
      if (result.message.includes("Nenhum post")) {
        return NextResponse.json({ error: result.message }, { status: 404 });
      }
      return NextResponse.json({ error: result.message }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro na sincronização:", error);
    return NextResponse.json(
      { error: "Erro na sincronização" },
      { status: 500 }
    );
  }
}
