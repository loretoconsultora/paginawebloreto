import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { Resend } from "resend";
import { emailBrandCompass, subjectBrandCompass } from "@/lib/email-brand-compass";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const resend = new Resend(process.env.RESEND_API_KEY);
const NOTION_DB_ID = process.env.NOTION_BRAND_COMPASS_DB_ID!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, correo, telefono, negocio, respuestas, puntaje, categoria, descripcionCategoria } = body as {
      nombre: string;
      correo: string;
      telefono?: string;
      negocio: string;
      respuestas: string[];
      puntaje: number;
      categoria: string;
      descripcionCategoria: string;
    };

    if (!nombre || !correo || !negocio) {
      return NextResponse.json({ error: "Nombre, correo y negocio son requeridos" }, { status: 400 });
    }

    await (notion as any).pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        Nombre: { title: [{ text: { content: nombre } }] },
        Correo: { email: correo },
        ...(telefono ? { Teléfono: { phone_number: telefono } } : {}),
        "Negocio / Marca": { rich_text: [{ text: { content: negocio } }] },
        Puntaje: { number: puntaje },
        Categoría: { select: { name: categoria } },
        Respuestas: { rich_text: [{ text: { content: respuestas.join(", ") } }] },
      },
    });

    await resend.emails.send({
      from: "Loreto Consultora <hello@loretoconsultora.com>",
      to: correo,
      subject: subjectBrandCompass(categoria),
      html: emailBrandCompass({ nombre, negocio, puntaje, categoria, descripcionCategoria }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/registro-brand-compass]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
