import { createClient } from "@/lib/supabase/server";
import { CalendarClock } from "lucide-react";

const KPI_NOMBRES = [
  "Conversaciones iniciadas",
  "Visitas a iPhone Market",
  "Visitas a Cotizador Plan Canje",
  "Alcance",
];

type Kpi = {
  nombre: string;
  valor: number;
  fecha: string;
};

type Servicio = {
  id: string;
  nombre: string;
  estado: string;
  periodos_servicio: { mes_inicio: string; mes_fin: string }[];
};

function formatFecha(fecha: string) {
  return new Date(fecha + "T00:00:00").toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatFechaHora(fecha: string) {
  return new Date(fecha).toLocaleString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: cliente } = await supabase
    .from("clientes")
    .select("id, nombre, logo_url")
    .single();

  const { data: servicios } = await supabase
    .from("servicios")
    .select("id, nombre, estado, periodos_servicio(mes_inicio, mes_fin)")
    .returns<Servicio[]>();

  const servicioIds = (servicios ?? []).map((s) => s.id);

  const { data: ultimoKpi } = servicioIds.length
    ? await supabase
        .from("kpis")
        .select("fecha")
        .in("servicio_id", servicioIds)
        .order("fecha", { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null };

  const { data: kpisRecientes } = servicioIds.length
    ? await supabase
        .from("kpis")
        .select("nombre, valor, fecha")
        .in("servicio_id", servicioIds)
        .in("nombre", KPI_NOMBRES)
        .order("fecha", { ascending: false })
        .returns<Kpi[]>()
    : { data: null };

  const kpisPorNombre = new Map<string, Kpi>();
  for (const k of kpisRecientes ?? []) {
    if (!kpisPorNombre.has(k.nombre)) kpisPorNombre.set(k.nombre, k);
  }

  const kpis = KPI_NOMBRES.map((nombre) => ({
    label: nombre,
    value: kpisPorNombre.has(nombre)
      ? new Intl.NumberFormat("es-MX").format(kpisPorNombre.get(nombre)!.valor)
      : "—",
  }));

  const { data: proximoEvento } = cliente
    ? await supabase
        .from("eventos_calendario")
        .select("titulo, fecha, tipo")
        .eq("cliente_id", cliente.id)
        .gte("fecha", new Date().toISOString())
        .order("fecha", { ascending: true })
        .limit(1)
        .maybeSingle()
    : { data: null };

  return (
    <div
      className="rounded-3xl p-6 sm:p-10 -m-6 sm:-m-10"
      style={{ background: "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)" }}
    >
      <div className="glass rounded-3xl p-6 sm:p-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-grafito/40 text-center mb-4">
          Vista rápida
        </p>

        {cliente?.logo_url && (
          <div className="flex justify-center mb-4">
            <img src={cliente.logo_url} alt={cliente.nombre} style={{ height: "48px", width: "auto" }} />
          </div>
        )}

        {cliente?.nombre && (
          <h1 className="font-playfair text-4xl font-bold text-grafito text-center mb-10">
            {cliente.nombre}
          </h1>
        )}

        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          <div className="rounded-2xl p-5 border border-grafito/10 flex items-center justify-between">
            <div>
              <p className="text-xs text-grafito/50 uppercase tracking-widest mb-1">Última actualización</p>
              <p className="text-sm font-semibold text-grafito">
                {ultimoKpi?.fecha ? formatFecha(ultimoKpi.fecha) : "Sin datos todavía"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-5 border border-grafito/10 flex items-center gap-3">
            <CalendarClock size={18} style={{ color: "#c0005a" }} className="flex-shrink-0" />
            <div>
              <p className="text-xs text-grafito/50 uppercase tracking-widest mb-1">Agenda</p>
              <p className="text-sm font-semibold text-grafito capitalize">
                {proximoEvento ? `${proximoEvento.titulo} — ${formatFechaHora(proximoEvento.fecha)}` : "Sin eventos próximos"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl p-6 border border-grafito/10">
              <p className="text-xs text-grafito/50 uppercase tracking-widest mb-2">{k.label}</p>
              <p className="font-playfair text-3xl font-bold text-grafito">{k.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 border border-grafito/10">
          <h2 className="font-playfair text-lg font-bold text-grafito mb-4">Servicios activos</h2>

          {!servicios || servicios.length === 0 ? (
            <p className="text-sm text-grafito/50">
              Todavía no hay servicios cargados a tu cuenta.
            </p>
          ) : (
            <div className="space-y-3">
              {servicios.map((s) => {
                const ultimoPeriodo = [...s.periodos_servicio].sort(
                  (a, b) => new Date(b.mes_inicio).getTime() - new Date(a.mes_inicio).getTime()
                )[0];

                return (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-xl border border-grafito/10 px-5 py-4"
                  >
                    <div>
                      <p className="font-semibold text-grafito text-sm">{s.nombre}</p>
                      {ultimoPeriodo && (
                        <p className="text-xs text-grafito/50 mt-1">
                          {formatFecha(ultimoPeriodo.mes_inicio)} – {formatFecha(ultimoPeriodo.mes_fin)}
                        </p>
                      )}
                    </div>
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ color: "#c0005a", background: "rgba(192,0,90,0.08)" }}
                    >
                      {s.estado}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
