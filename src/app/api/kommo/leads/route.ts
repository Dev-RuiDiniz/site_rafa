import { NextRequest, NextResponse } from "next/server";

const KOMMO_ACCESS_TOKEN = process.env.KOMMO_ACCESS_TOKEN;
const KOMMO_API_DOMAIN = process.env.KOMMO_API_DOMAIN || "api-c.kommo.com";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, message, source } = data;

    if (!KOMMO_ACCESS_TOKEN) {
      console.error("KOMMO_ACCESS_TOKEN not configured");
      return NextResponse.json(
        { error: "Integração não configurada" },
        { status: 500 }
      );
    }

    // Criar o lead no Kommo
    const leadResponse = await fetch(`https://${KOMMO_API_DOMAIN}/api/v4/leads/complex`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${KOMMO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          name: `Lead Site - ${name}`,
          source_name: source || "Site SHR",
          _embedded: {
            contacts: [
              {
                name: name,
                first_name: name.split(" ")[0],
                last_name: name.split(" ").slice(1).join(" ") || "",
                custom_fields_values: [
                  ...(email ? [{
                    field_code: "EMAIL",
                    values: [{ value: email, enum_code: "WORK" }]
                  }] : []),
                  ...(phone ? [{
                    field_code: "PHONE",
                    values: [{ value: phone, enum_code: "WORK" }]
                  }] : [])
                ]
              }
            ]
          },
          custom_fields_values: [],
          _embedded_tags: source ? [{ name: source }] : []
        }
      ]),
    });

    if (!leadResponse.ok) {
      const errorText = await leadResponse.text();
      console.error("Kommo API Error:", errorText);
      return NextResponse.json(
        { error: "Erro ao criar lead no CRM", details: errorText },
        { status: 500 }
      );
    }

    const leadData = await leadResponse.json();

    // Adicionar nota com a mensagem se houver
    if (message && leadData._embedded?.leads?.[0]?.id) {
      const leadId = leadData._embedded.leads[0].id;
      
      await fetch(`https://${KOMMO_API_DOMAIN}/api/v4/leads/${leadId}/notes`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${KOMMO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            note_type: "common",
            params: {
              text: `Mensagem do formulário:\n\n${message}`
            }
          }
        ]),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Lead criado com sucesso",
      leadId: leadData._embedded?.leads?.[0]?.id
    });

  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar lead" },
      { status: 500 }
    );
  }
}
