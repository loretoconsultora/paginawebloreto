import { createClient } from "@/lib/supabase/server";
import { FileText } from "lucide-react";

function formatFecha(fecha: string) {
  return new Date(fecha + "T00:00:00").toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function ReportesPage() {
  const supabase = await createClient();

  const { data: cliente } = await supabase
    .from("clientes")
    .select("id")
    .single();

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

      <div className="bg-white rounded-2xl p-6 border border-grafito/10">
        {!reportes || reportes.length === 0 ? (
          <p className="text-sm text-grafito/50">Todavía no hay reportes cargados.</p>
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
