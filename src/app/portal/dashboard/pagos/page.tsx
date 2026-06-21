import { createClient } from "@/lib/supabase/server";
import { CreditCard, Info } from "lucide-react";

type ConceptoDetalle = { nombre: string; monto: number };

type Pago = {
  id: string;
  mes: string;
  conceptos: string[];
  detalle: ConceptoDetalle[] | null;
  estado: string;
};

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function formatMes(mes: string) {
  const d = new Date(mes + "T00:00:00");
  return `${MESES[d.getMonth()]} ${d.getFullYear()}`;
}

function estadoEstilo(estado: string) {
  return estado === "pagado"
    ? { color: "#16a34a", background: "rgba(22,163,74,0.1)" }
    : { color: "#d97706", background: "rgba(217,119,6,0.1)" };
}

function formatMonto(monto: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 }).format(monto);
}

export default async function PagosPage() {
  const supabase = await createClient();

  const { data: cliente } = await supabase.from("clientes").select("id").single();

  const { data: pagos } = cliente
    ? await supabase
        .from("pagos")
        .select("id, mes, conceptos, detalle, estado")
        .eq("cliente_id", cliente.id)
        .order("mes", { ascending: false })
        .returns<Pago[]>()
    : { data: null };

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-grafito mb-1">Pagos</h1>
      <p className="text-grafito/50 text-sm mb-6">Historial de servicios mensuales y su estatus de pago</p>

      <div
        className="flex items-center gap-3 rounded-2xl p-5 mb-6"
        style={{ background: "#eab308" }}
      >
        <Info size={22} style={{ color: "#fff" }} className="flex-shrink-0" />
        <p className="text-lg sm:text-xl text-white">
          Próxima fecha de pago: <span className="font-bold">del 1 al 7 de cada mes.</span>
        </p>
      </div>

      {!pagos || pagos.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 border border-grafito/10">
          <p className="text-sm text-grafito/50">Todavía no hay pagos registrados.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pagos.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-5 border border-grafito/10 flex items-start justify-between gap-4 flex-wrap"
            >
              <div className="flex items-start gap-3">
                <CreditCard size={18} style={{ color: "#c0005a" }} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-grafito text-sm capitalize mb-1">{formatMes(p.mes)}</p>
                  {p.detalle && p.detalle.length > 0 ? (
                    <ul className="text-xs text-grafito/60 space-y-0.5">
                      {p.detalle.map((d) => (
                        <li key={d.nombre} className="flex items-center gap-2">
                          <span>• {d.nombre}</span>
                          <span className="font-semibold text-grafito/80">{formatMonto(d.monto)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="text-xs text-grafito/60 space-y-0.5">
                      {p.conceptos.map((c) => (
                        <li key={c}>• {c}</li>
                      ))}
                    </ul>
                  )}
                  {p.detalle && p.detalle.length > 0 && (
                    <p className="text-xs font-bold text-grafito mt-2">
                      Total: {formatMonto(p.detalle.reduce((sum, d) => sum + d.monto, 0))}
                    </p>
                  )}
                </div>
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full flex-shrink-0"
                style={estadoEstilo(p.estado)}
              >
                {p.estado}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
