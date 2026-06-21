import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import ReportePdf, { ResumenPdfRow } from "./ReportePdf";

export async function GET(request: NextRequest) {
  const tipoParam = request.nextUrl.searchParams.get("tipo");
  const tipo = tipoParam === "mensual" ? "mensual" : "semanal";

  const supabase = await createClient();

  const { data: cliente } = await supabase.from("clientes").select("id, nombre").single();
  if (!cliente) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

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
    ReportePdf({ cliente: cliente.nombre, tipo, filas: filas ?? [] })
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="reporte-${tipo}-${cliente.nombre.replace(/\s+/g, "-").toLowerCase()}.pdf"`,
    },
  });
}
