"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, List, Calendar as CalendarIcon } from "lucide-react";

export type EventoAgenda = {
  id: string;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  tipo: string;
  emoji: string | null;
};

const TIPO_LABEL: Record<string, string> = {
  produccion: "Producción de contenido",
  sesion_semanal: "Revisión programada",
  especial: "Sesión especial",
};

const MEET_LINK = "https://meet.google.com/uaq-trnz-atq";

const TIPO_EMOJI: Record<string, string> = {
  produccion: "🎬",
  sesion_semanal: "🟢",
  especial: "✨",
};

function emojiDe(e: EventoAgenda) {
  return e.emoji || TIPO_EMOJI[e.tipo] || "📌";
}

function labelDe(e: EventoAgenda) {
  return TIPO_LABEL[e.tipo] || e.tipo;
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

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const DIAS = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

function inicioDeSemana(d: Date) {
  const r = new Date(d);
  const dia = (r.getDay() + 6) % 7;
  r.setDate(r.getDate() - dia);
  r.setHours(0, 0, 0, 0);
  return r;
}

function diasMismaFecha(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function AgendaView({ eventos }: { eventos: EventoAgenda[] }) {
  const [vista, setVista] = useState<"lista" | "calendario">("lista");
  const hoy = useMemo(() => new Date(), []);
  const [mesActual, setMesActual] = useState(() => new Date(hoy.getFullYear(), hoy.getMonth(), 1));

  const eventosPorMes = useMemo(() => {
    const grupos = new Map<string, EventoAgenda[]>();
    for (const e of eventos) {
      const d = new Date(e.fecha);
      const clave = `${d.getFullYear()}-${d.getMonth()}`;
      if (!grupos.has(clave)) grupos.set(clave, []);
      grupos.get(clave)!.push(e);
    }
    return grupos;
  }, [eventos]);

  const mesesOrdenados = useMemo(() => {
    return Array.from(eventosPorMes.keys()).sort((a, b) => {
      const [ay, am] = a.split("-").map(Number);
      const [by, bm] = b.split("-").map(Number);
      return ay - by || am - bm;
    });
  }, [eventosPorMes]);

  const diasCalendario = useMemo(() => {
    const primerDia = inicioDeSemana(mesActual);
    const dias: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(primerDia);
      d.setDate(primerDia.getDate() + i);
      dias.push(d);
    }
    return dias;
  }, [mesActual]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex gap-2 bg-white rounded-full p-1 border border-grafito/10">
          <button
            onClick={() => setVista("lista")}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
            style={
              vista === "lista"
                ? { background: "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)", color: "#fff" }
                : { color: "#3A3F4B99" }
            }
          >
            <List size={14} />
            Lista
          </button>
          <button
            onClick={() => setVista("calendario")}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
            style={
              vista === "calendario"
                ? { background: "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)", color: "#fff" }
                : { color: "#3A3F4B99" }
            }
          >
            <CalendarIcon size={14} />
            Calendario
          </button>
        </div>
      </div>

      {eventos.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 border border-grafito/10">
          <p className="text-sm text-grafito/50">Todavía no hay eventos agendados.</p>
        </div>
      ) : vista === "lista" ? (
        <div className="space-y-8">
          {mesesOrdenados.map((clave) => {
            const [anio, mes] = clave.split("-").map(Number);
            const items = eventosPorMes.get(clave)!.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
            return (
              <div key={clave}>
                <p className="text-xs text-grafito/40 uppercase tracking-widest mb-3">
                  {MESES[mes]} {anio}
                </p>
                <div className="bg-white rounded-2xl p-3 border border-grafito/10 space-y-2">
                  {items.map((e) => (
                    <div key={e.id} className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-grafito/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xl flex-shrink-0">{emojiDe(e)}</span>
                        <div>
                          <p className="font-semibold text-grafito text-sm">{e.titulo}</p>
                          <p className="text-xs text-grafito/50 mt-0.5 capitalize">{formatFechaHora(e.fecha)}</p>
                          {e.descripcion && <p className="text-xs text-grafito/50 mt-0.5">{e.descripcion}</p>}
                          {e.tipo === "sesion_semanal" && (
                            <a
                              href={MEET_LINK}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold mt-0.5 inline-block"
                              style={{ color: "#c0005a" }}
                            >
                              {MEET_LINK}
                            </a>
                          )}
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex-shrink-0"
                        style={{ color: "#c0005a", background: "rgba(192,0,90,0.1)" }}
                      >
                        {labelDe(e)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 border border-grafito/10">
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1, 1))}
              className="p-2 rounded-full hover:bg-grafito/5 transition-colors"
            >
              <ChevronLeft size={18} style={{ color: "#3A3F4B" }} />
            </button>
            <p className="font-playfair text-lg font-bold text-grafito capitalize">
              {MESES[mesActual.getMonth()]} {mesActual.getFullYear()}
            </p>
            <button
              onClick={() => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 1))}
              className="p-2 rounded-full hover:bg-grafito/5 transition-colors"
            >
              <ChevronRight size={18} style={{ color: "#3A3F4B" }} />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DIAS.map((d) => (
              <p key={d} className="text-[10px] text-grafito/40 uppercase tracking-widest text-center">
                {d}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {diasCalendario.map((d, i) => {
              const delMes = d.getMonth() === mesActual.getMonth();
              const esHoy = diasMismaFecha(d, hoy);
              const eventosDelDia = eventos.filter((e) => diasMismaFecha(new Date(e.fecha), d));
              return (
                <div
                  key={i}
                  className="rounded-xl p-2 min-h-[90px] border"
                  style={{
                    borderColor: esHoy ? "#c0005a" : "#3A3F4B0F",
                    background: delMes ? "#fff" : "#3A3F4B05",
                  }}
                >
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: esHoy ? "#c0005a" : delMes ? "#3A3F4B" : "#3A3F4B66" }}
                  >
                    {d.getDate()}
                  </p>
                  <div className="space-y-1">
                    {eventosDelDia.map((e) => (
                      <p
                        key={e.id}
                        title={e.titulo}
                        className="text-[10px] leading-tight rounded-md px-1.5 py-1 truncate"
                        style={{ color: "#c0005a", background: "rgba(192,0,90,0.08)" }}
                      >
                        {emojiDe(e)} {e.titulo}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
