"use client";

import { ExternalLink, Video, FileText, Link as LinkIcon, FolderOpen } from "lucide-react";

type Recurso = {
  id: string;
  titulo: string;
  descripcion: string | null;
  url: string;
  tipo: string;
  creado_en: string;
};

const TIPO_CONFIG: Record<string, { label: string; icon: typeof LinkIcon; color: string; bg: string; border: string }> = {
  link: {
    label: "Link",
    icon: LinkIcon,
    color: "#c0005a",
    bg: "rgba(192,0,90,0.07)",
    border: "rgba(192,0,90,0.2)",
  },
  video: {
    label: "Video",
    icon: Video,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.07)",
    border: "rgba(124,58,237,0.2)",
  },
  documento: {
    label: "Documento",
    icon: FileText,
    color: "#0d6b6d",
    bg: "rgba(13,107,109,0.07)",
    border: "rgba(13,107,109,0.2)",
  },
};

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
}

export default function RecursosView({ recursos }: { recursos: Recurso[] }) {
  if (recursos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "rgba(192,0,90,0.08)" }}
        >
          <FolderOpen size={26} style={{ color: "#c0005a" }} />
        </div>
        <p className="font-semibold text-grafito mb-1">Aún no hay recursos</p>
        <p className="text-sm text-grafito/45 max-w-xs">
          Aquí aparecerán los links, materiales y videos que el equipo comparta contigo.
        </p>
      </div>
    );
  }

  const porTipo = ["video", "documento", "link"] as const;
  const grupos = porTipo
    .map((tipo) => ({ tipo, items: recursos.filter((r) => r.tipo === tipo) }))
    .filter((g) => g.items.length > 0);

  // Si no hay agrupación útil, mostrar todo plano
  const sinGrupos = grupos.length <= 1 || recursos.length <= 3;

  return (
    <div className="flex flex-col gap-8">
      {sinGrupos ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recursos.map((r) => <RecursoCard key={r.id} recurso={r} />)}
        </div>
      ) : (
        grupos.map(({ tipo, items }) => {
          const cfg = TIPO_CONFIG[tipo] ?? TIPO_CONFIG.link;
          return (
            <div key={tipo}>
              <div className="flex items-center gap-2 mb-4">
                <cfg.icon size={14} style={{ color: cfg.color }} />
                <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: cfg.color }}>
                  {cfg.label}s
                </h2>
                <span className="text-xs text-grafito/35 ml-1">({items.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((r) => <RecursoCard key={r.id} recurso={r} />)}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function RecursoCard({ recurso }: { recurso: Recurso }) {
  const cfg = TIPO_CONFIG[recurso.tipo] ?? TIPO_CONFIG.link;
  const Icon = cfg.icon;

  return (
    <a
      href={recurso.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-2xl p-5 bg-white transition-shadow hover:shadow-md"
      style={{ border: `1px solid ${cfg.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: cfg.bg }}
        >
          <Icon size={16} style={{ color: cfg.color }} />
        </div>
        <ExternalLink
          size={14}
          className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: cfg.color }}
        />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-grafito leading-snug mb-1">{recurso.titulo}</p>
        {recurso.descripcion && (
          <p className="text-xs text-grafito/55 leading-relaxed">{recurso.descripcion}</p>
        )}
      </div>

      <div className="flex items-center justify-between mt-1">
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ color: cfg.color, background: cfg.bg }}
        >
          {cfg.label}
        </span>
        <span className="text-[11px] text-grafito/35">{formatFecha(recurso.creado_en)}</span>
      </div>
    </a>
  );
}
