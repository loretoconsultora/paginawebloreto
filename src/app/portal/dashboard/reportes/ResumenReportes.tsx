"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download } from "lucide-react";

export type ResumenRow = {
  conjunto_anuncios: string;
  campana: string | null;
  estado: string | null;
  resultados: number;
  unidad_resultados: string | null;
  costo_por_resultado: number | null;
  inversion_total: number | null;
  ctr: number | null;
  cpm: number | null;
  meta_resultados: number | null;
  meta_costo_por_resultado: number | null;
  semaforo_resultados: string | null;
  semaforo_costo: string | null;
  periodo: string;
};

function formatPeriodo(periodo: string, tipo: "semanal" | "mensual") {
  const d = new Date(periodo + "T00:00:00");
  if (tipo === "mensual") {
    return d.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
  }
  const fin = new Date(d);
  fin.setDate(d.getDate() + 6);
  return `${d.toLocaleDateString("es-MX", { day: "numeric", month: "short" })} – ${fin.toLocaleDateString("es-MX", { day: "numeric", month: "short" })}`;
}

function wrapLabel(texto: string): [string, string] {
  const palabras = texto.split(" ");
  if (palabras.length < 2) return [texto, ""];
  const mitad = Math.ceil(palabras.length / 2);
  return [palabras.slice(0, mitad).join(" "), palabras.slice(mitad).join(" ")];
}

type EjeXTickProps = { x?: number | string; y?: number | string; payload?: { value: string } };

function EjeXTick({ x = 0, y = 0, payload }: EjeXTickProps) {
  const [linea1, linea2] = wrapLabel(payload?.value ?? "");
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={12} textAnchor="middle" fontSize={11} fill="#3A3F4B99">
        <tspan x={0}>{linea1}</tspan>
        {linea2 && <tspan x={0} dy={14}>{linea2}</tspan>}
      </text>
    </g>
  );
}

function semaforoColor(valor: string | null) {
  return valor === "Cumple"
    ? { color: "#16a34a", background: "rgba(22,163,74,0.1)" }
    : { color: "#d97706", background: "rgba(217,119,6,0.1)" };
}

const num = (n: number | null) => new Intl.NumberFormat("es-MX").format(n ?? 0);
const money = (n: number | null) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n ?? 0);

export default function ResumenReportes({
  semanal,
  mensual,
}: {
  semanal: ResumenRow[];
  mensual: ResumenRow[];
}) {
  const [tipo, setTipo] = useState<"semanal" | "mensual">("semanal");
  const filas = tipo === "semanal" ? semanal : mensual;
  const periodo = filas[0]?.periodo;

  const chartData = useMemo(
    () =>
      filas.map((f) => ({
        nombre: f.conjunto_anuncios.replace(/^\[.*?\]\s*-?\s*/, ""),
        resultados: f.resultados,
        meta: f.meta_resultados ?? 0,
      })),
    [filas]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex gap-2 bg-white rounded-full p-1 border border-grafito/10">
          {(["semanal", "mensual"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTipo(t)}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
              style={
                tipo === t
                  ? { background: "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)", color: "#fff" }
                  : { color: "#3A3F4B99" }
              }
            >
              {t === "semanal" ? "Resumen semanal" : "Resumen mensual"}
            </button>
          ))}
        </div>

        <a
          href={`/api/reportes/pdf?tipo=${tipo}`}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white"
          style={{ background: "#3A3F4B" }}
        >
          <Download size={14} />
          Descargar PDF
        </a>
      </div>

      {filas.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 border border-grafito/10">
          <p className="text-sm text-grafito/50">Todavía no hay datos de {tipo === "semanal" ? "esta semana" : "este mes"}.</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-grafito/40 uppercase tracking-widest mb-4">
            Periodo: {periodo ? formatPeriodo(periodo, tipo) : "—"}
          </p>

          <div className="bg-white rounded-2xl p-6 border border-grafito/10 mb-6">
            <h2 className="font-playfair text-lg font-bold text-grafito mb-4">Resultados vs. meta</h2>
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={chartData} margin={{ left: 0, right: 10, top: 5, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3A3F4B15" vertical={false} />
                  <XAxis dataKey="nombre" tick={EjeXTick} interval={0} height={50} />
                  <YAxis tick={{ fontSize: 11, fill: "#3A3F4B99" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #3A3F4B1A", fontSize: 12, background: "#fff" }}
                    labelStyle={{ color: "#3A3F4B", fontWeight: 600 }}
                    itemStyle={{ color: "#3A3F4B" }}
                  />
                  <Bar dataKey="meta" name="Meta" fill="#67c6c8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="resultados" name="Resultados" fill="#f393ae" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filas.map((f) => {
              const avance = f.meta_resultados ? Math.min(100, Math.round((f.resultados / f.meta_resultados) * 100)) : 0;
              return (
                <div key={f.conjunto_anuncios} className="bg-white rounded-2xl p-6 border border-grafito/10">
                  <p className="text-xs text-grafito/40 uppercase tracking-widest mb-1">{f.campana || f.conjunto_anuncios}</p>
                  <p className="font-semibold text-grafito text-sm mb-4">{f.conjunto_anuncios}</p>

                  <div className="flex items-end justify-between mb-2">
                    <p className="font-playfair text-3xl font-bold" style={{ color: "#c0005a" }}>{num(f.resultados)}</p>
                    <p className="text-xs text-grafito/40 mb-1">meta {num(f.meta_resultados)}</p>
                  </div>
                  <p className="text-[11px] text-grafito/40 mb-3 capitalize">{f.unidad_resultados}</p>

                  <div className="h-1.5 rounded-full bg-grafito/10 mb-4 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${avance}%`, background: "linear-gradient(90deg, #c0005a, #FF6A92)" }} />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-grafito/50">Costo por resultado</span>
                    <span className="text-xs font-semibold text-grafito">{money(f.costo_por_resultado)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-grafito/50">Inversión total</span>
                    <span className="text-xs font-semibold text-grafito">{money(f.inversion_total)}</span>
                  </div>

                  <div className="flex gap-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={semaforoColor(f.semaforo_resultados)}
                    >
                      Resultados {f.semaforo_resultados}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={semaforoColor(f.semaforo_costo)}
                    >
                      Costo {f.semaforo_costo}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
