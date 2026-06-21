import { createClient } from "@/lib/supabase/server";

function formatFechaHora(fecha: string) {
  return new Date(fecha).toLocaleString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AgendaPage() {
  const supabase = await createClient();

  const { data: eventos } = await supabase
    .from("eventos_calendario")
    .select("id, titulo, fecha, tipo")
    .gte("fecha", new Date().toISOString())
    .order("fecha", { ascending: true });

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-grafito mb-1">Agenda</h1>
      <p className="text-grafito/50 text-sm mb-8">
        Reuniones, producciones, revisiones y sesiones especiales
      </p>

      <div className="bg-white rounded-2xl p-6 border border-grafito/10">
        {!eventos || eventos.length === 0 ? (
          <p className="text-sm text-grafito/50">Todavía no hay eventos agendados.</p>
        ) : (
          <div className="space-y-3">
            {eventos.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl border border-grafito/10 px-5 py-4">
                <div>
                  <p className="font-semibold text-grafito text-sm">{e.titulo}</p>
                  <p className="text-xs text-grafito/50 mt-1 capitalize">{formatFechaHora(e.fecha)}</p>
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ color: "#c0005a", background: "rgba(192,0,90,0.1)" }}
                >
                  {e.tipo}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
