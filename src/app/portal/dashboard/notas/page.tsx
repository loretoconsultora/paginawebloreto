import { createClient } from "@/lib/supabase/server";

function formatFechaHora(fecha: string) {
  return new Date(fecha).toLocaleString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function NotasPage() {
  const supabase = await createClient();

  const { data: cliente } = await supabase
    .from("clientes")
    .select("id")
    .single();

  const { data: notas } = cliente
    ? await supabase
        .from("notas")
        .select("id, autor, contenido, creado_en")
        .eq("cliente_id", cliente.id)
        .order("creado_en", { ascending: false })
    : { data: null };

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-grafito mb-1">Notas</h1>
      <p className="text-grafito/50 text-sm mb-8">Comunicación y notas de seguimiento</p>

      <div className="bg-white rounded-2xl p-6 border border-grafito/10">
        {!notas || notas.length === 0 ? (
          <p className="text-sm text-grafito/50">Todavía no hay notas registradas.</p>
        ) : (
          <div className="space-y-3">
            {notas.map((n) => (
              <div key={n.id} className="rounded-xl border border-grafito/10 px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-grafito text-sm">{n.autor}</p>
                  <p className="text-xs text-grafito/40">{formatFechaHora(n.creado_en)}</p>
                </div>
                <p className="text-sm text-grafito/70 whitespace-pre-wrap">{n.contenido}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
