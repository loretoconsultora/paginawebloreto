import { readFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import sharp from "sharp";
import { createClient } from "@/lib/supabase/server";
import ReportePdf, { ResumenPdfRow } from "./ReportePdf";

async function aPngDataUri(input: Buffer | string): Promise<string> {
  const buffer = typeof input === "string" ? Buffer.from(await (await fetch(input)).arrayBuffer()) : input;
  const png = await sharp(buffer).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

export async function GET(request: NextRequest) {
  const tipoParam = request.nextUrl.searchParams.get("tipo");
  const tipo = tipoParam === "mensual" ? "mensual" : "semanal";

  const supabase = await createClient();

  const { data: cliente } = await supabase.from("clientes").select("id, nombre, logo_url").single();
  if (!cliente) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const loretoLogoSvg = await readFile(path.join(process.cwd(), "public", "logo.svg"));
  const [loretoLogo, clienteLogo] = await Promise.all([
    aPngDataUri(loretoLogoSvg),
    cliente.logo_url ? aPngDataUri(cliente.logo_url).catch(() => null) : Promise.resolve(null),
  ]);

  const { data: servicios } = await supabase.from("servicios").select("id").eq("cliente_id", cliente.id);
  const servicioIds = (servicios ?? []).map((s) => s.id);

  if (!servicioIds.length) {
    return NextResponse.json({ error: "Sin servicios" }, { status: 404 });
  }

  const { data: ultimo } = await supabase
    .from("reportes_resumen")
    .select("periodo")
    .in("servicio_id", servicioIds)
    .eq("tipo", tipo)
    .order("periodo", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: filas } = ultimo
    ? await supabase
        .from("reportes_resumen")
        .select(
          "conjunto_anuncios, campana, estado, resultados, unidad_resultados, costo_por_resultado, inversion_total, ctr, cpm, meta_resultados, meta_costo_por_resultado, semaforo_resultados, semaforo_costo, periodo"
        )
        .in("servicio_id", servicioIds)
        .eq("tipo", tipo)
        .eq("periodo", ultimo.periodo)
        .order("conjunto_anuncios", { ascending: true })
        .returns<ResumenPdfRow[]>()
    : { data: [] };

  const buffer = await renderToBuffer(
    ReportePdf({ cliente: cliente.nombre, tipo, filas: filas ?? [], loretoLogo, clienteLogo })
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="reporte-${tipo}-${cliente.nombre.replace(/\s+/g, "-").toLowerCase()}.pdf"`,
    },
  });
}
