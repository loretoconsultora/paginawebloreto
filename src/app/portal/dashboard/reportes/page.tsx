import { createClient } from "@/lib/supabase/server";
import ResumenReportes, { ResumenRow } from "./ResumenReportes";

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

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-grafito mb-1">Reportes</h1>
      <p className="text-grafito/50 text-sm mb-8">Resultados META Ads</p>

      <ResumenReportes semanal={semanal} mensual={mensual} />
    </div>
  );
}
