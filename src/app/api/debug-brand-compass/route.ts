import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { Resend } from "resend";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const resend = new Resend(process.env.RESEND_API_KEY);
const NOTION_DB_ID = process.env.NOTION_BRAND_COMPASS_DB_ID!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const correo = searchParams.get("correo") ?? "loretoconsultora@gmail.com";

  const results: Record<string, unknown> = {
    env: {
      NOTION_SECRET: !!process.env.NOTION_SECRET,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      NOTION_BRAND_COMPASS_DB_ID: NOTION_DB_ID ?? "MISSING",
    },
  };

  // Test Notion
  try {
    const page = await (notion as any).pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        Nombre: { title: [{ text: { content: "Debug Test" } }] },
        Correo: { email: correo },
        "Negocio / Marca": { rich_text: [{ text: { content: "Debug" } }] },
        Puntaje: { number: 30 },
        Categoría: { select: { name: "Marca en desarrollo" } },
        Respuestas: { rich_text: [{ text: { content: "A,B,C" } }] },
      },
    });
    results.notion = { ok: true, id: page.id };
  } catch (e: any) {
    results.notion = { ok: false, error: e?.message ?? String(e) };
  }

  // Test Resend
  try {
    const r = await resend.emails.send({
      from: "Loreto Consultora <hello@loretoconsultora.com>",
      to: correo,
      subject: "Debug Brand Compass",
      html: "<p>Debug test OK</p>",
    });
    results.resend = { ok: true, id: (r as any).id ?? r };
  } catch (e: any) {
    results.resend = { ok: false, error: e?.message ?? String(e) };
  }

  return NextResponse.json(results);
}
