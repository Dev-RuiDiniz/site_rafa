import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// POST - Trocar código de autorização por access token
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { authorizationCode } = await request.json();

    if (!authorizationCode) {
      return NextResponse.json({ error: "Código de autorização não fornecido" }, { status: 400 });
    }

    const settings = await (prisma as any).kommoSettings.findFirst();

    if (!settings || !settings.subdomain || !settings.clientId || !settings.clientSecret) {
      return NextResponse.json({ 
        error: "Configure o subdomínio, Client ID e Client Secret antes de autorizar" 
      }, { status: 400 });
    }

    // Trocar código de autorização por access token
    const tokenResponse = await fetch(`https://${settings.subdomain}.kommo.com/oauth2/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: settings.clientId,
        client_secret: settings.clientSecret,
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: `https://${settings.subdomain}.kommo.com`,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Kommo token error:", errorData);
      return NextResponse.json({ 
        error: errorData.hint || errorData.detail || "Erro ao obter token",
        details: errorData
      }, { status: 400 });
    }

    const tokenData = await tokenResponse.json();

    // Calcular data de expiração
    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    // Salvar tokens no banco
    await (prisma as any).kommoSettings.update({
      where: { id: settings.id },
      data: {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        tokenExpiresAt: expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Autorização concluída com sucesso!",
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error("Error in Kommo auth:", error);
    return NextResponse.json({ error: "Erro interno ao processar autorização" }, { status: 500 });
  }
}
