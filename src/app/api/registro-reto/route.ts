import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { Resend } from "resend";
import { emailConfirmacionReto } from "@/lib/email-confirmacion-reto";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const resend = new Resend(process.env.RESEND_API_KEY);
const NOTION_DB_ID = process.env.NOTION_RETO_DATABASE_ID!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, correo, telefono, negocio, confirmaProximo } = body as {
      nombre: string;
      correo: string;
      telefono?: string;
      negocio?: string;
      confirmaProximo?: boolean;
    };

    if (!nombre || !correo) {
      return NextResponse.json({ error: "Nombre y correo son requeridos" }, { status: 400 });
    }

    // Guardar en Notion
    await (notion as any).pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        Nombre: { title: [{ text: { content: nombre } }] },
        Correo: { email: correo },
        ...(telefono ? { Teléfono: { phone_number: telefono } } : {}),
        ...(negocio ? { "Negocio / Marca": { rich_text: [{ text: { content: negocio } }] } } : {}),
        "Confirma próximo reto": { checkbox: Boolean(confirmaProximo) },
      },
    });

    // Enviar correo de confirmación
    await resend.emails.send({
      from: "Loreto Consultora <hello@loretoconsultora.com>",
      to: correo,
      subject: "🌸 ¡Estás dentro del Reto Boost & Bloom!",
      html: emailConfirmacionReto({
        nombre,
        negocio: negocio ?? "",
        confirmaProximo: Boolean(confirmaProximo),
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/registro-reto]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
