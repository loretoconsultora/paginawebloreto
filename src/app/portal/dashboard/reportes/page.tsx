import { createClient } from "@/lib/supabase/server";
import { FileText } from "lucide-react";
import ResumenReportes, { ResumenRow } from "./ResumenReportes";

function formatFecha(fecha: string) {
  return new Date(fecha + "T00:00:00").toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function ultimoPeriodo(
  supabase: Awaited<ReturnType<typeof createClient>>,
  servicioIds: string[],
  tipo: "semanal" | "mensual"
): Promise<ResumenRow[]> {
  if (!servicioIds.length) return [];

  const { data: ultimo } = await supabase
    .from("reportes_resumen")
    .select("periodo")
    .in("servicio_id", servicioIds)
    .eq("tipo", tipo)
    .order("periodo", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!ultimo) return [];

  const { data } = await supabase
    .from("reportes_resumen")
    .select(
      "conjunto_anuncios, campana, estado, resultados, unidad_resultados, costo_por_resultado, inversion_total, ctr, cpm, meta_resultados, meta_costo_por_resultado, semaforo_resultados, semaforo_costo, periodo"
    )
    .in("servicio_id", servicioIds)
    .eq("tipo", tipo)
    .eq("periodo", ultimo.periodo)
    .order("conjunto_anuncios", { ascending: true })
    .returns<ResumenRow[]>();

  return data ?? [];
}

export default async function ReportesPage() {
  const supabase = await createClient();

  const { data: cliente } = await supabase.from("clientes").select("id").single();

  const { data: servicios } = cliente
    ? await supabase.from("servicios").select("id").eq("cliente_id", cliente.id)
    : { data: null };

  const servicioIds = (servicios ?? []).map((s) => s.id);

  const [semanal, mensual] = await Promise.all([
    ultimoPeriodo(supabase, servicioIds, "semanal"),
    ultimoPeriodo(supabase, servicioIds, "mensual"),
  ]);

  const { data: reportes } = cliente
    ? await supabase
        .from("reportes")
        .select("id, titulo, archivo_url, fecha")
        .eq("cliente_id", cliente.id)
        .order("fecha", { ascending: false })
    : { data: null };

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-grafito mb-1">Reportes</h1>
      <p className="text-grafito/50 text-sm mb-8">Reportes y métricas de tu servicio</p>

      <ResumenReportes semanal={semanal} mensual={mensual} />

      <div className="bg-white rounded-2xl p-6 border border-grafito/10 mt-8">
        <h2 className="font-playfair text-lg font-bold text-grafito mb-4">Archivos descargables</h2>

        {!reportes || reportes.length === 0 ? (
          <p className="text-sm text-grafito/50">Todavía no hay archivos cargados.</p>
        ) : (
          <div className="space-y-3">
            {reportes.map((r) => (
              <a
                key={r.id}
                href={r.archivo_url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-grafito/10 px-5 py-4 hover:border-grafito/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} style={{ color: "#c0005a" }} className="flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-grafito text-sm">{r.titulo}</p>
                    <p className="text-xs text-grafito/50 mt-1">{formatFecha(r.fecha)}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
