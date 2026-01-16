import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// POST - Salvar access token diretamente (long-lived token)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: "Token de acesso não fornecido" }, { status: 400 });
    }

    const settings = await (prisma as any).kommoSettings.findFirst();

    if (!settings || !settings.subdomain) {
      return NextResponse.json({ 
        error: "Configure o subdomínio antes de salvar o token" 
      }, { status: 400 });
    }

    // Validar token fazendo uma requisição de teste
    const testResponse = await fetch(`https://${settings.subdomain}.kommo.com/api/v4/account`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!testResponse.ok) {
      return NextResponse.json({ 
        error: "Token inválido ou expirado",
      }, { status: 400 });
    }

    // Token é long-lived, expira em ~3 anos
    const expiresAt = new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000);

    // Salvar token no banco
    await (prisma as any).kommoSettings.update({
      where: { id: settings.id },
      data: {
        accessToken: accessToken,
        tokenExpiresAt: expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Token salvo com sucesso!",
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error("Error in Kommo auth:", error);
    return NextResponse.json({ error: "Erro interno ao processar token" }, { status: 500 });
  }
}
