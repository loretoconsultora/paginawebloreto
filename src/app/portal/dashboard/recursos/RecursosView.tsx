"use client";

import { ExternalLink, Video, FileText, Link as LinkIcon, Download, FolderOpen } from "lucide-react";

type Recurso = {
  id: string;
  titulo: string;
  descripcion: string | null;
  url: string;
  tipo: string;
  es_archivo: boolean;
  creado_en: string;
};

function getTipoConfig(tipo: string, es_archivo: boolean) {
  const t = tipo.toLowerCase();
  if (es_archivo || t.includes("document") || t.includes("pdf") || t.includes("archivo")) {
    return { label: tipo, icon: FileText, color: "#0d6b6d", bg: "rgba(13,107,109,0.07)", border: "rgba(13,107,109,0.2)" };
  }
  if (t.includes("video") || t.includes("grabaci") || t.includes("loom") || t.includes("youtube")) {
    return { label: tipo, icon: Video, color: "#7c3aed", bg: "rgba(124,58,237,0.07)", border: "rgba(124,58,237,0.2)" };
  }
  return { label: tipo, icon: LinkIcon, color: "#c0005a", bg: "rgba(192,0,90,0.07)", border: "rgba(192,0,90,0.2)" };
}

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
}

export default function RecursosView({ recursos }: { recursos: Recurso[] }) {
  if (recursos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(192,0,90,0.08)" }}>
          <FolderOpen size={26} style={{ color: "#c0005a" }} />
        </div>
        <p className="font-semibold text-grafito mb-1">Aún no hay recursos</p>
        <p className="text-sm text-grafito/45 max-w-xs">
          Aquí aparecerán los links, materiales y videos que el equipo comparta contigo.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recursos.map((r) => <RecursoCard key={r.id} recurso={r} />)}
    </div>
  );
}

function RecursoCard({ recurso }: { recurso: Recurso }) {
  const cfg = getTipoConfig(recurso.tipo, recurso.es_archivo);
  const Icon = cfg.icon;

  return (
    <a
      href={recurso.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-2xl p-5 bg-white transition-shadow hover:shadow-md"
      style={{ border: `1px solid ${cfg.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
    >
      {/* Ícono + acción */}
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg }}>
          <Icon size={18} style={{ color: cfg.color }} />
        </div>
        {recurso.es_archivo
          ? <Download size={14} className="flex-shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: cfg.color }} />
          : <ExternalLink size={14} className="flex-shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: cfg.color }} />
        }
      </div>

      {/* Título y descripción */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-grafito leading-snug mb-1">{recurso.titulo}</p>
        {recurso.descripcion && (
          <p className="text-xs text-grafito/55 leading-relaxed">{recurso.descripcion}</p>
        )}
      </div>

      {/* Tipo + fecha */}
      <div className="flex items-center justify-between mt-1">
        <span
          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize"
          style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
        >
          {recurso.tipo}
        </span>
        <span className="text-[11px] text-grafito/35">{formatFecha(recurso.creado_en)}</span>
      </div>
    </a>
  );
}
