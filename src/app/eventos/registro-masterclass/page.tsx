"use client";

import { useState } from "react";
import { Radio, MessageCircle, HelpCircle, CheckCircle2, Clock } from "lucide-react";
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

const CLASES = [
  { id: "mc1", label: "Cómo posicionarte como especialista y dejar de competir por precio", dia: "18 de junio" },
  { id: "mc2", label: "Cómo comenzar a crear contenido para tu marca personal", dia: "23 de junio" },
  { id: "mc3", label: "Cómo convertir tu audiencia en clientes y tus clientes en una comunidad rentable", dia: "25 de junio" },
  { id: "mc4", label: "Cómo elevar el valor de tu negocio con Inteligencia Artificial", dia: "30 de junio" },
];

const BENEFICIOS = [
  { icon: Radio, texto: "4 masterclasses en vivo por Instagram, sin costo" },
  { icon: HelpCircle, texto: "30 min privados de preguntas y respuestas con Any Villegas" },
  { icon: MessageCircle, texto: "Acceso a un grupo de WhatsApp con contenido exclusivo" },
];

export default function RegistroMasterclassPage() {
  const [form, setForm] = useState({ nombre: "", correo: "", lada: "52", telefono: "" });
  const [clases, setClases] = useState<string[]>(CLASES.map((c) => c.id));
  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const inputClass = "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-grafito placeholder:text-gray-400 focus:outline-none focus:border-pink-300 transition-colors";

  const toggle = (id: string) =>
    setClases((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clases.length === 0) return;
    setEstado("loading");

    const clasesSeleccionadas = CLASES.filter((c) => clases.includes(c.id)).map((c) => c.label);

    try {
      if (N8N_WEBHOOK) {
        await fetch(N8N_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, clases: clasesSeleccionadas }),
        });
      }
      setEstado("ok");
      // Redirige a WhatsApp después de 2.5s
      setTimeout(() => {
        window.location.href = WHATSAPP_URL;
      }, 2500);
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
              4 clases en vivo con <span className="font-semibold text-white">Any Villegas (@anyvillegas.v)</span> para construir y posicionar tu marca personal — completamente gratis.
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
              <div className="flex flex-col items-center justify-center gap-3 text-center py-10">
                <CheckCircle2 size={48} style={{ color: "#c0005a" }} />
                <p className="font-playfair text-2xl font-bold text-grafito">¡Listo, ya tienes tu lugar!</p>
                <p className="text-sm text-grafito/60 max-w-xs">
                  Te llevamos al grupo de WhatsApp donde recibirás los accesos y el contenido exclusivo de las masterclasses.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="font-playfair text-xl font-bold text-center mb-1" style={{ color: "#1a0a2e" }}>
                  Regístrate gratis
                </h2>
                <p className="text-xs text-grafito/50 text-center -mt-1 mb-2">
                  Cupo limitado por el formato en vivo. Completa tus datos y entrarás al grupo de WhatsApp donde recibirás los accesos.
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
                    Seleccionadas todas por default — desmarca las que no te interesen. El live es abierto a todos, pero solo quien se registra accede a los 30 min privados de preguntas y al grupo de WhatsApp.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {CLASES.map((c) => {
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
