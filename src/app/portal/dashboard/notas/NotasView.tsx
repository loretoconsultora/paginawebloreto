"use client";

import { useMemo, useState } from "react";

export type Nota = {
  id: string;
  titulo: string | null;
  contenido: string;
  autor: string | null;
  categoria: string | null;
  creado_en: string;
};

type CategoriaInfo = { label: string; bg: string; tape: string; texto: string };

const CATEGORIAS: Record<string, CategoriaInfo> = {
  publicidad: { label: "Publicidad (Campañas)", bg: "#FFE3EC", tape: "#FF6A92", texto: "#c0005a" },
  local: { label: "Local Físico", bg: "#E1F5F5", tape: "#67c6c8", texto: "#1b7d7e" },
  app: { label: "Victoranza App", bg: "#EBEEFF", tape: "#6A8AFF", texto: "#3a4eb0" },
  contenido: { label: "Contenido", bg: "#F8E9FF", tape: "#E894FF", texto: "#9b2fc4" },
  otros: { label: "Otros", bg: "#EFEFF1", tape: "#9aa0ab", texto: "#3A3F4B" },
};

const CATEGORIA_DEFAULT: CategoriaInfo = CATEGORIAS.otros;

function infoDe(categoria: string | null) {
  return (categoria && CATEGORIAS[categoria]) || CATEGORIA_DEFAULT;
}

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const ROTACIONES = ["-1.5deg", "1deg", "-0.5deg", "1.5deg", "0deg", "-1deg"];

export default function NotasView({ notas }: { notas: Nota[] }) {
  const [filtro, setFiltro] = useState<string | null>(null);

  const categoriasUsadas = useMemo(() => {
    const set = new Set<string>();
    for (const n of notas) set.add(n.categoria && CATEGORIAS[n.categoria] ? n.categoria : "otros");
    return Object.keys(CATEGORIAS).filter((c) => set.has(c));
  }, [notas]);

  const notasFiltradas = filtro
    ? notas.filter((n) => (n.categoria && CATEGORIAS[n.categoria] ? n.categoria : "otros") === filtro)
    : notas;

  return (
    <div>
      {categoriasUsadas.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setFiltro(null)}
            className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-colors"
            style={
              filtro === null
                ? { background: "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)", color: "#fff" }
                : { color: "#3A3F4B99", background: "#fff", border: "1px solid #3A3F4B1A" }
            }
          >
            Todas
          </button>
          {categoriasUsadas.map((c) => {
            const info = CATEGORIAS[c];
            const activo = filtro === c;
            return (
              <button
                key={c}
                onClick={() => setFiltro(c)}
                className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-colors"
                style={
                  activo
                    ? { background: info.tape, color: "#fff" }
                    : { color: info.texto, background: info.bg }
                }
              >
                {info.label}
              </button>
            );
          })}
        </div>
      )}

      {notasFiltradas.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 border border-grafito/10">
          <p className="text-sm text-grafito/50">Todavía no hay ideas registradas.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {notasFiltradas.map((n, i) => {
            const info = infoDe(n.categoria);
            return (
              <div
                key={n.id}
                className="relative mb-5 break-inside-avoid rounded-2xl p-5 shadow-sm"
                style={{ background: info.bg, transform: `rotate(${ROTACIONES[i % ROTACIONES.length]})` }}
              >
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm opacity-80"
                  style={{ background: info.tape, transform: "rotate(-3deg)" }}
                />
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: info.texto }}
                >
                  {info.label}
                </p>
                {n.titulo && (
                  <p className="font-playfair text-base font-bold text-grafito mb-1">{n.titulo}</p>
                )}
                <p className="text-sm text-grafito/80 whitespace-pre-wrap mb-3">{n.contenido}</p>
                <div className="flex items-center justify-between text-[11px] text-grafito/40">
                  <span>{n.autor || "Equipo"}</span>
                  <span>{formatFecha(n.creado_en)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
