import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { Resend } from "resend";
import { emailRecordatorio } from "@/lib/email-recordatorio";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const resend = new Resend(process.env.RESEND_API_KEY);
const NOTION_DB_ID = process.env.NOTION_DATABASE_ID!;

const MEET_LINK: Record<string, string> = {
  "Costa Rica": "https://meet.google.com/urs-bqnz-syp",
  "Colombia":   "https://meet.google.com/wup-pizh-xta",
  "Chile":      "https://meet.google.com/qaa-tizw-ctu",
  "Panamá":     "https://meet.google.com/agg-fmpb-sxg",
};

const MASTERCLASS_MAP: Record<string, string> = {
  "Costa Rica": "Tu negocio en piloto automático: IA en tu Marketing, Ventas y Operaciones",
  "Colombia":   "Tu negocio en piloto automático: IA en tu Marketing, Ventas y Operaciones",
  "Chile":      "Publicidad Digital que sí convierte: El método para escalar tu negocio este 2027",
  "Panamá":     "Publicidad Digital que sí convierte: El método para escalar tu negocio este 2027",
};

const FECHA_MAP: Record<string, string> = {
  "Costa Rica": "Jueves 26 de noviembre · 7:00 pm hora local",
  "Colombia":   "Miércoles 2 de diciembre · 7:00 pm hora local",
  "Chile":      "Jueves 3 de diciembre · 7:00 pm hora local",
  "Panamá":     "Jueves 3 de diciembre · 7:00 pm hora local",
};

// Vercel inyecta Authorization: Bearer <CRON_SECRET> en cada llamada de cron
function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // sin secret configurado, permitir (útil en dev)
  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const paisParam = searchParams.get("pais") ?? "";
  const tipo = (searchParams.get("tipo") ?? "1h") as "8h" | "1h";

  // "Panama" sin tilde en la URL → mapear a "Panamá"
  const pais = paisParam === "Panama" ? "Panamá" : paisParam;

  if (!pais || !MEET_LINK[pais]) {
    return NextResponse.json({ error: `País inválido: ${pais}` }, { status: 400 });
  }

  // Obtener todos los registrados de ese país en Notion
  const response = await (notion as any).databases.query({
    database_id: NOTION_DB_ID,
    filter: {
      property: "País",
      select: { equals: pais },
    },
  });

  const registrados = (response.results as any[]).map((page: any) => ({
    nombre: (page.properties["Nombre"]?.title?.[0]?.plain_text ?? "") as string,
    correo: (page.properties["Correo"]?.email ?? "") as string,
  })).filter((r: { nombre: string; correo: string }) => r.correo);

  const meetLink  = MEET_LINK[pais];
  const masterclass = MASTERCLASS_MAP[pais];
  const fechaEvento = FECHA_MAP[pais];

  const resultados = await Promise.allSettled(
    registrados.map((r: { nombre: string; correo: string }) =>
      resend.emails.send({
        from: "Loreto Consultora <hello@loretoconsultora.com>",
        to: r.correo,
        subject: tipo === "1h"
          ? `⏰ El evento empieza en 1 hora · ${pais}`
          : `Hoy es el día · Networking & Masterclass · ${pais}`,
        html: emailRecordatorio({ nombre: r.nombre, pais, tipo, fechaEvento, masterclass, meetLink }),
      })
    )
  );

  const enviados = resultados.filter((r: PromiseSettledResult<unknown>) => r.status === "fulfilled").length;
  const fallidos = resultados.filter((r: PromiseSettledResult<unknown>) => r.status === "rejected").length;

  console.log(`[/api/recordatorio] ${pais} ${tipo}: ${enviados} enviados, ${fallidos} fallidos`);
  return NextResponse.json({ ok: true, pais, tipo, enviados, fallidos });
}
