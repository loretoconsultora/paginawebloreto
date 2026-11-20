import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { Resend } from "resend";
import { emailConfirmacion } from "@/lib/email-confirmacion";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const resend = new Resend(process.env.RESEND_API_KEY);

const NOTION_DB_ID = process.env.NOTION_DATABASE_ID!;

// Mapeo país → masterclass
const MASTERCLASS_MAP: Record<string, string> = {
  "Costa Rica": "Tu negocio en piloto automático: IA en tu Marketing Ventas y Operaciones",
  "Colombia":   "Tu negocio en piloto automático: IA en tu Marketing Ventas y Operaciones",
  "Chile":      "Publicidad Digital que sí convierte: El método para escalar tu negocio este 2027",
  "Panamá":     "Publicidad Digital que sí convierte: El método para escalar tu negocio este 2027",
};

const FECHA_MAP: Record<string, string> = {
  "Costa Rica": "Jueves 26 de noviembre · 7:00 pm hora local",
  "Colombia":   "Miércoles 2 de diciembre · 7:00 pm hora local",
  "Chile":      "Jueves 3 de diciembre · 7:00 pm hora local",
  "Panamá":     "Jueves 3 de diciembre · 7:00 pm hora local",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, correo, telefono, lada, empresa, pais } = body;

    if (!nombre || !correo || !pais) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const telefonoCompleto = lada && telefono ? `${lada} ${telefono}` : telefono ?? "";
    const masterclass = MASTERCLASS_MAP[pais] ?? "";
    const fechaEvento = FECHA_MAP[pais] ?? "";

    // ── 1. Guardar en Notion ─────────────────────────────────────────────────
    await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        Nombre: { title: [{ text: { content: nombre } }] },
        Correo: { email: correo },
        Teléfono: { phone_number: telefonoCompleto },
        País: { select: { name: pais } },
        Masterclass: { select: { name: masterclass } },
        "Negocio / Marca": { rich_text: [{ text: { content: empresa ?? "" } }] },
      },
    });

    // ── 2. Enviar correo de confirmación ─────────────────────────────────────
    await resend.emails.send({
      from: "Loreto Consultora <hello@loretoconsultora.com>",
      to: correo,
      subject: `¡Tu lugar está reservado! Networking & Masterclass Digital · ${pais}`,
      html: emailConfirmacion({ nombre, pais, fechaEvento, masterclass }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/registro]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
