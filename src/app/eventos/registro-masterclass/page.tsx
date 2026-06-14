"use client";

import { useState } from "react";
import { Radio } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const WHATSAPP_URL = "https://chat.whatsapp.com/EB9jvFzRAzD0nLxoGqLJHi?s=cl&p=i&ilr=0";
// Reemplaza con tu webhook de n8n cuando lo tengas
const N8N_WEBHOOK = process.env.NEXT_PUBLIC_N8N_MASTERCLASS_WEBHOOK ?? "";

const CLASES = [
  { id: "mc1", label: "Cómo posicionarte como especialista y dejar de competir por precio", dia: "Jue 18 jun" },
  { id: "mc2", label: "Cómo comenzar a crear contenido para tu marca personal", dia: "Mar 23 jun" },
  { id: "mc3", label: "Cómo convertir tu audiencia en clientes y tus clientes en una comunidad rentable", dia: "Jue 25 jun" },
  { id: "mc4", label: "Cómo elevar el valor de tu negocio", dia: "Mar 30 jun" },
];

export default function RegistroMasterclassPage() {
  const [form, setForm] = useState({ nombre: "", correo: "", lada: "52", telefono: "" });
  const [clases, setClases] = useState<string[]>([]);
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
      // Redirige a WhatsApp después de 1.5s
      setTimeout(() => {
        window.location.href = WHATSAPP_URL;
      }, 1500);
    } catch {
      setEstado("error");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: "#fafafa" }}>
        <div className="pt-36 pb-20 max-w-xl mx-auto px-4 sm:px-6">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-2 justify-center mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-xs font-bold text-red-500 tracking-widest uppercase">En vivo · Instagram</span>
            <Radio size={12} className="text-red-500" />
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-4xl sm:text-5xl font-bold text-center mb-2"
            style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.15 }}
          >
            Masterclasses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}
            className="text-center text-grafito/55 mb-10 text-sm"
          >
            con Any Villegas &amp; Loreto Consultora
          </motion.p>

          {/* Card formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-2xl p-6 sm:p-8"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}
          >
            {estado === "ok" ? (
              <div className="flex flex-col items-center justify-center gap-4 text-center py-10">
                <div className="text-4xl">✅</div>
                <p className="font-playfair text-2xl font-bold text-grafito">¡Registro exitoso!</p>
                <p className="text-sm text-grafito/60">Redirigiendo al grupo de WhatsApp…</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="font-playfair text-xl font-bold text-center mb-1" style={{ color: "#1a0a2e" }}>
                  Asegura tu lugar
                </h2>
                <p className="text-xs text-grafito/50 text-center -mt-1 mb-2">
                  Completa el formulario y te unirás al grupo de WhatsApp donde recibirás los accesos.
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
                  <input required name="telefono" placeholder="Teléfono *" value={form.telefono} onChange={handleChange} className={`${inputClass} flex-1`} />
                </div>

                {/* Selección de clases */}
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs font-semibold text-grafito/50 uppercase tracking-widest mb-3">
                    Clases de interés <span className="normal-case text-grafito/35">(selecciona al menos una)</span>
                  </p>
                  <div className="flex flex-col gap-3">
                    {CLASES.map((c) => (
                      <label key={c.id} className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={clases.includes(c.id)}
                          onChange={() => toggle(c.id)}
                          className="mt-0.5 accent-pink-500 flex-shrink-0"
                        />
                        <div>
                          <span className="text-sm text-grafito/80 group-hover:text-grafito transition-colors leading-snug">{c.label}</span>
                          <p className="text-xs text-grafito/40 mt-0.5">{c.dia}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={estado === "loading" || clases.length === 0}
                  className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ background: GRADIENT }}
                >
                  {estado === "loading" ? "Registrando…" : "Registrarme y unirme al grupo →"}
                </button>

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
