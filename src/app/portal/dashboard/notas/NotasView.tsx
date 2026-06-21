"use client";

import { useMemo, useState, useTransition } from "react";
import { Plus, X, Trash2, LayoutGrid, Columns3 } from "lucide-react";
import { crearNota, eliminarNota } from "./actions";

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

function claveDe(categoria: string | null) {
  return categoria && CATEGORIAS[categoria] ? categoria : "otros";
}

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const ROTACIONES = ["-1.5deg", "1deg", "-0.5deg", "1.5deg", "0deg", "-1deg"];

function BotonEliminar({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => eliminarNota(id))}
      className="absolute top-3 right-3 p-1 rounded-full hover:bg-black/10 transition-colors disabled:opacity-40"
      title="Eliminar idea"
    >
      <Trash2 size={14} style={{ color: "#3A3F4B99" }} />
    </button>
  );
}

function TarjetaNota({ n, rotacion }: { n: Nota; rotacion?: string }) {
  const info = infoDe(n.categoria);
  return (
    <div
      className="relative rounded-2xl p-5 pr-9 shadow-sm"
      style={{ background: info.bg, transform: rotacion ? `rotate(${rotacion})` : undefined }}
    >
      {rotacion !== undefined && (
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm opacity-80"
          style={{ background: info.tape, transform: "rotate(-3deg)" }}
        />
      )}
      <BotonEliminar id={n.id} />
      <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: info.texto }}>
        {info.label}
      </p>
      {n.titulo && <p className="font-playfair text-base font-bold text-grafito mb-1">{n.titulo}</p>}
      <p className="text-sm text-grafito/80 whitespace-pre-wrap mb-3">{n.contenido}</p>
      <div className="flex items-center justify-between text-[11px] text-grafito/40">
        <span>{n.autor || "Equipo"}</span>
        <span>{formatFecha(n.creado_en)}</span>
      </div>
    </div>
  );
}

function ModalNuevaIdea({ onClose }: { onClose: () => void }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <form
        action={(formData) => {
          startTransition(async () => {
            await crearNota(formData);
            onClose();
          });
        }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-playfair text-lg font-bold text-grafito">Nueva idea</h2>
          <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-grafito/5">
            <X size={18} style={{ color: "#3A3F4B" }} />
          </button>
        </div>

        <label className="block text-xs font-semibold text-grafito/60 mb-1">Tipo de idea</label>
        <select
          name="categoria"
          required
          defaultValue="otros"
          className="w-full mb-4 rounded-xl border border-grafito/15 px-3 py-2 text-sm text-grafito"
        >
          {Object.entries(CATEGORIAS).map(([clave, info]) => (
            <option key={clave} value={clave}>
              {info.label}
            </option>
          ))}
        </select>

        <label className="block text-xs font-semibold text-grafito/60 mb-1">Título (opcional)</label>
        <input
          type="text"
          name="titulo"
          maxLength={80}
          className="w-full mb-4 rounded-xl border border-grafito/15 px-3 py-2 text-sm text-grafito"
          placeholder="Ej. Promo de fin de mes"
        />

        <label className="block text-xs font-semibold text-grafito/60 mb-1">Idea</label>
        <textarea
          name="contenido"
          required
          rows={4}
          className="w-full mb-5 rounded-xl border border-grafito/15 px-3 py-2 text-sm text-grafito resize-none"
          placeholder="Escribe la idea aquí..."
        />

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)" }}
        >
          {pending ? "Guardando..." : "Guardar idea"}
        </button>
      </form>
    </div>
  );
}

export default function NotasView({ notas }: { notas: Nota[] }) {
  const [filtro, setFiltro] = useState<string | null>(null);
  const [vista, setVista] = useState<"tablero" | "kanban">("tablero");
  const [modalAbierto, setModalAbierto] = useState(false);

  const categoriasUsadas = useMemo(() => {
    const set = new Set<string>();
    for (const n of notas) set.add(claveDe(n.categoria));
    return Object.keys(CATEGORIAS).filter((c) => set.has(c));
  }, [notas]);

  const notasFiltradas = filtro ? notas.filter((n) => claveDe(n.categoria) === filtro) : notas;

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex gap-2 bg-white rounded-full p-1 border border-grafito/10">
          <button
            onClick={() => setVista("tablero")}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
            style={
              vista === "tablero"
                ? { background: "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)", color: "#fff" }
                : { color: "#3A3F4B99" }
            }
          >
            <LayoutGrid size={14} />
            Tablero
          </button>
          <button
            onClick={() => setVista("kanban")}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
            style={
              vista === "kanban"
                ? { background: "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)", color: "#fff" }
                : { color: "#3A3F4B99" }
            }
          >
            <Columns3 size={14} />
            Kanban
          </button>
        </div>

        <button
          onClick={() => setModalAbierto(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white"
          style={{ background: "#3A3F4B" }}
        >
          <Plus size={14} />
          Nueva idea
        </button>
      </div>

      {vista === "tablero" && categoriasUsadas.length > 0 && (
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
                style={activo ? { background: info.tape, color: "#fff" } : { color: info.texto, background: info.bg }}
              >
                {info.label}
              </button>
            );
          })}
        </div>
      )}

      {notas.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 border border-grafito/10">
          <p className="text-sm text-grafito/50">Todavía no hay ideas registradas.</p>
        </div>
      ) : vista === "tablero" ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {notasFiltradas.map((n, i) => (
            <div key={n.id} className="mb-5 break-inside-avoid">
              <TarjetaNota n={n} rotacion={ROTACIONES[i % ROTACIONES.length]} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Object.entries(CATEGORIAS).map(([clave, info]) => {
            const items = notas.filter((n) => claveDe(n.categoria) === clave);
            return (
              <div key={clave} className="flex-shrink-0 w-72">
                <div
                  className="flex items-center justify-between rounded-t-xl px-4 py-2"
                  style={{ background: info.bg }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: info.texto }}>
                    {info.label}
                  </p>
                  <span
                    className="text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ background: info.tape, color: "#fff" }}
                  >
                    {items.length}
                  </span>
                </div>
                <div className="bg-grafito/5 rounded-b-xl p-2 space-y-2 min-h-[120px]">
                  {items.map((n) => (
                    <TarjetaNota key={n.id} n={n} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalAbierto && <ModalNuevaIdea onClose={() => setModalAbierto(false)} />}
    </div>
  );
}
