"use client";

import { useState } from "react";
import { Radio, MessageCircle, HelpCircle, CheckCircle2, Clock, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const WHATSAPP_URL = "https://chat.whatsapp.com/EB9jvFzRAzD0nLxoGqLJHi?s=cl&p=i&ilr=0";
// Reemplaza con tu webhook de n8n cuando lo tengas
const N8N_WEBHOOK = process.env.NEXT_PUBLIC_N8N_MASTERCLASS_WEBHOOK ?? "";

const HORARIOS = [
  { bandera: "🇲🇽", pais: "CDMX", hora: "7:30 pm" },
  { bandera: "🇨🇴", pais: "Bogotá", hora: "8:30 pm" },
  { bandera: "🇦🇷", pais: "Bs. Aires", hora: "10:30 pm" },
];

// Horario CDMX (UTC-6) usado como referencia para los eventos de calendario
const CLASES = [
  { id: "mc1", label: "Cómo posicionarte como especialista y dejar de competir por precio", dia: "18 de junio", inicioUTC: "20260619T013000Z", finUTC: "20260619T030000Z" },
  { id: "mc2", label: "Cómo comenzar a crear contenido para tu marca personal", dia: "23 de junio", inicioUTC: "20260624T013000Z", finUTC: "20260624T030000Z" },
  { id: "mc3", label: "Cómo convertir tu audiencia en clientes y tus clientes en una comunidad rentable", dia: "25 de junio", inicioUTC: "20260626T013000Z", finUTC: "20260626T030000Z" },
  { id: "mc4", label: "Cómo elevar el valor de tu negocio con Inteligencia Artificial", dia: "30 de junio", inicioUTC: "20260701T013000Z", finUTC: "20260701T030000Z" },
];

const BENEFICIOS = [
  { icon: Radio, texto: "4 masterclasses en vivo por Instagram" },
  { icon: HelpCircle, texto: "Al finalizar, 30 min extra de preguntas y respuestas solo para registrados — haz todas tus consultas de cómo aterrizar a tu marca lo visto en la sesión del día" },
  { icon: MessageCircle, texto: "Acceso a un grupo de WhatsApp con contenido exclusivo" },
];

function googleCalendarUrl(titulo: string, inicioUTC: string, finUTC: string) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Masterclass: ${titulo}`,
    dates: `${inicioUTC}/${finUTC}`,
    details: "Masterclass en vivo por Instagram con Any Villegas (@anyvillegas.v), CEO & Founder de Loreto Consultora.",
    location: "Instagram @anyvillegas.v",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function icsDate(utc: string) {
  return utc;
}

function buildIcs(clasesSeleccionadas: typeof CLASES) {
  const eventos = clasesSeleccionadas.map((c) => [
    "BEGIN:VEVENT",
    `UID:${c.id}-loretoconsultora@loretoconsultora.lat`,
    `DTSTAMP:${icsDate(c.inicioUTC)}`,
    `DTSTART:${icsDate(c.inicioUTC)}`,
    `DTEND:${icsDate(c.finUTC)}`,
    `SUMMARY:Masterclass: ${c.label}`,
    "DESCRIPTION:Masterclass en vivo por Instagram con Any Villegas (@anyvillegas.v)\\, CEO & Founder de Loreto Consultora.",
    "LOCATION:Instagram @anyvillegas.v",
    "END:VEVENT",
  ].join("\r\n")).join("\r\n");

  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Loreto Consultora//Masterclasses//ES", eventos, "END:VCALENDAR"].join("\r\n");
}

function descargarIcs(clasesSeleccionadas: typeof CLASES) {
  const contenido = buildIcs(clasesSeleccionadas);
  const blob = new Blob([contenido], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "masterclasses-loreto-consultora.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export default function RegistroMasterclassPage() {
  const [form, setForm] = useState({ nombre: "", correo: "", lada: "52", telefono: "" });
  const [clases, setClases] = useState<string[]>(CLASES.map((c) => c.id));
  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [clasesRegistradas, setClasesRegistradas] = useState<typeof CLASES>([]);

  const inputClass = "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-grafito placeholder:text-gray-400 focus:outline-none focus:border-pink-300 transition-colors";

  const toggle = (id: string) =>
    setClases((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clases.length === 0) return;
    setEstado("loading");

    const seleccionadas = CLASES.filter((c) => clases.includes(c.id));
    const clasesSeleccionadas = seleccionadas.map((c) => c.label);

    try {
      if (N8N_WEBHOOK) {
        await fetch(N8N_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, clases: clasesSeleccionadas }),
        });
      }
      setClasesRegistradas(seleccionadas);
      setEstado("ok");
    } catch {
      setEstado("error");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: "#fafafa" }}>

        {/* ── Hero con propuesta de valor ── */}
        <section className="pt-32 pb-12 text-center px-4 sm:px-6" style={{ background: GRADIENT }}>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
              </span>
              <span className="text-xs font-bold text-white tracking-widest uppercase">En vivo · Gratis · Instagram</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-4xl sm:text-5xl font-bold mb-4 text-white"
              style={{ lineHeight: 1.15 }}
            >
              Asegura tu lugar en las Masterclasses de Junio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/85 text-base sm:text-lg leading-relaxed mb-7"
            >
              4 clases en vivo con <span className="font-semibold text-white">Any Villegas (@anyvillegas.v)</span>, CEO &amp; Founder de Loreto Consultora, para construir y posicionar tu marca personal — completamente <span className="font-semibold text-white">GRATIS</span>.
            </motion.p>

            {/* Stack de beneficios */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-2.5 max-w-md mx-auto"
            >
              {BENEFICIOS.map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-left bg-white/10 rounded-xl px-4 py-2.5">
                  <b.icon size={16} className="text-white flex-shrink-0" />
                  <span className="text-sm text-white/90">{b.texto}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="max-w-xl mx-auto px-4 sm:px-6 -mt-6 pb-20">

          {/* Card formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-2xl p-6 sm:p-8 relative z-10"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}
          >
            {estado === "ok" ? (
              <div className="flex flex-col items-center gap-4 text-center py-6">
                <CheckCircle2 size={48} style={{ color: "#c0005a" }} />
                <div>
                  <p className="font-playfair text-2xl font-bold text-grafito mb-1.5">¡Listo, ya tienes tu lugar!</p>
                  <p className="text-sm text-grafito/60 max-w-sm">
                    No te lo dejes pasar: agrega cada clase a tu calendario para que te llegue el recordatorio.
                  </p>
                </div>

                {/* Agregar a calendario */}
                <div className="w-full flex flex-col gap-2 my-1">
                  {clasesRegistradas.map((c, i) => (
                    <a
                      key={c.id}
                      href={googleCalendarUrl(c.label, c.inicioUTC, c.finUTC)}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-left rounded-xl border px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      style={{ borderColor: "rgba(58,63,75,0.12)" }}
                    >
                      <CalendarPlus size={16} className="flex-shrink-0" style={{ color: "#c0005a" }} />
                      <span className="text-xs text-grafito/75">
                        <span className="font-semibold">Masterclass {i + 1}</span> · {c.dia} → agregar a Google Calendar
                      </span>
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={() => descargarIcs(clasesRegistradas)}
                    className="flex items-center justify-center gap-2 text-xs font-semibold rounded-xl border px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "rgba(58,63,75,0.12)", color: "#3A3F4B" }}
                  >
                    <CalendarPlus size={14} />
                    Descargar para Apple / Outlook Calendar (.ics)
                  </button>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity w-full"
                  style={{ background: GRADIENT, boxShadow: "0 8px 24px rgba(192,0,90,0.3)" }}
                >
                  Unirme al grupo de WhatsApp →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="font-playfair text-xl font-bold text-center mb-1" style={{ color: "#1a0a2e" }}>
                  Regístrate gratis
                </h2>
                <p className="text-xs text-grafito/50 text-center -mt-1 mb-2">
                  ¡Accede a todos los beneficios! Un nivel más profundo de aprendizaje para quienes están realmente comprometidos con su marca.
                </p>

                {/* Nombre */}
                <input required name="nombre" placeholder="Nombre completo *" value={form.nombre} onChange={handleChange} className={inputClass} />

                {/* Correo */}
                <input required name="correo" type="email" placeholder="Correo electrónico *" value={form.correo} onChange={handleChange} className={inputClass} />

                {/* Teléfono */}
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2.5 w-24 flex-shrink-0">
                    <span className="text-sm text-grafito/50">+</span>
                    <input name="lada" placeholder="52" value={form.lada} onChange={handleChange} className="w-full text-sm text-grafito focus:outline-none bg-transparent" />
                  </div>
                  <input required name="telefono" placeholder="WhatsApp *" value={form.telefono} onChange={handleChange} className={`${inputClass} flex-1`} />
                </div>

                {/* Selección de clases con horarios por país */}
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs font-semibold text-grafito/50 uppercase tracking-widest mb-1">
                    Tu agenda de masterclasses
                  </p>
                  <p className="text-[11px] text-grafito/40 mb-3">
                    Seleccionamos las 4 clases por ti, si alguna no es de tu interés, solo desmárcala 😉
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {CLASES.map((c, i) => {
                      const checked = clases.includes(c.id);
                      return (
                        <label
                          key={c.id}
                          className="flex items-start gap-3 cursor-pointer rounded-lg p-2.5 transition-colors"
                          style={{ background: checked ? "rgba(192,0,90,0.05)" : "transparent", border: `1px solid ${checked ? "rgba(192,0,90,0.18)" : "transparent"}` }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggle(c.id)}
                            className="mt-0.5 accent-pink-500 flex-shrink-0"
                          />
                          <div className="flex-1">
                            <span className="block text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#c0005a" }}>
                              Masterclass {i + 1}
                            </span>
                            <span className="text-sm text-grafito/85 leading-snug font-medium">{c.label}</span>
                            <div className="flex items-center gap-1.5 mt-1 mb-1.5">
                              <Clock size={11} style={{ color: "#c0005a" }} />
                              <span className="text-xs font-semibold" style={{ color: "#c0005a" }}>{c.dia}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                              {HORARIOS.map((h) => (
                                <span key={h.pais} className="text-[11px] text-grafito/45">
                                  {h.bandera} {h.pais} {h.hora}
                                </span>
                              ))}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={estado === "loading" || clases.length === 0}
                  className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ background: GRADIENT, boxShadow: "0 8px 24px rgba(192,0,90,0.3)" }}
                >
                  {estado === "loading" ? "Registrando…" : "Quiero mi lugar gratis →"}
                </button>
                <p className="text-[11px] text-grafito/40 text-center -mt-1">
                  100% gratis · Sin spam · Tu registro es lo único que te da acceso al Q&amp;A privado y al grupo de WhatsApp
                </p>

                {estado === "error" && (
                  <p className="text-xs text-red-500 text-center">Hubo un error. Intenta de nuevo.</p>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
