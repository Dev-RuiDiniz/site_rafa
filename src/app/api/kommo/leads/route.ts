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

    // 1. Criar contato primeiro
    const contactResponse = await fetch(`https://${KOMMO_API_DOMAIN}/api/v4/contacts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${KOMMO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          name: name,
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
      ]),
    });

    let contactId = null;
    if (contactResponse.ok) {
      const contactData = await contactResponse.json();
      contactId = contactData._embedded?.contacts?.[0]?.id;
    }

    // 2. Criar o lead
    const leadPayload: Record<string, unknown>[] = [
      {
        name: `${source || "Site SHR"} - ${name}`,
        ...(contactId && {
          _embedded: {
            contacts: [{ id: contactId }]
          }
        })
      }
    ];

    const leadResponse = await fetch(`https://${KOMMO_API_DOMAIN}/api/v4/leads`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${KOMMO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadPayload),
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
    const leadId = leadData._embedded?.leads?.[0]?.id;

    // 3. Adicionar nota com a mensagem
    if (message && leadId) {
      const noteText = `📧 Email: ${email || "Não informado"}\n📱 Telefone: ${phone || "Não informado"}\n📍 Origem: ${source || "Site SHR"}\n\n💬 Mensagem:\n${message}`;
      
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
              text: noteText
            }
          }
        ]),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Lead criado com sucesso",
      leadId: leadId,
      contactId: contactId
    });

  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar lead" },
      { status: 500 }
    );
  }
}
