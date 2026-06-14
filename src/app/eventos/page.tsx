"use client";

import Link from "next/link";
import { MapPin, Clock, Calendar, Radio } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const WHATSAPP = "https://chat.whatsapp.com/EB9jvFzRAzD0nLxoGqLJHi?s=cl&p=i&ilr=0";

// ─── The Art of Brand ───────────────────────────────────────────────────────

const ART_OF_BRAND = {
  titulo: "The Art of Brand",
  subtitulo: "Colección de Eventos",
  descripcion: "Una serie de experiencias creativas donde el branding deja de ser teoría y se convierte en algo que se siente, se piensa y se crea con las manos.",
  descripcionLarga: "Aquí no vienes a tomar un taller de branding. Vienes a explorar tu identidad, darle forma a tu narrativa y materializar la esencia de tu marca a través del arte.",
};

const EXPERIENCIAS = [
  {
    nombre: "Brand & Bloom",
    subtipo: "Diseño floral + branding",
    desc: "Explora la esencia de tu marca desde lo orgánico, lo simbólico y lo emocional mientras diseñas tu propio arreglo floral.",
    color: "#c0005a",
    bgColor: "rgba(192,0,90,0.07)",
    borderColor: "rgba(192,0,90,0.2)",
  },
  {
    nombre: "The Brand Atelier",
    subtipo: "Cerámica + branding",
    desc: "Construye la identidad visual y narrativa de tu marca desde la forma, la textura y la intención mientras interfieres una pieza de cerámica.",
    color: "#7a5800",
    bgColor: "rgba(245,200,66,0.09)",
    borderColor: "rgba(245,200,66,0.35)",
  },
  {
    nombre: "Brand Muse",
    subtipo: "Self Portrait + branding",
    desc: "Explora tu marca personal desde la autenticidad, la narrativa y la autoimagen mientras construyes un self portrait guiado.",
    color: "#0d6b6d",
    bgColor: "rgba(13,107,109,0.07)",
    borderColor: "rgba(13,107,109,0.2)",
  },
];

const SESIONES = [
  // Querétaro
  {
    ciudad: "Querétaro",
    venue: "Alva Coffee & Health Bar",
    experiencia: "Brand & Bloom",
    fecha: "Miércoles 25 de junio",
    hora: "5:00 pm",
    colorExp: "#c0005a",
  },
  {
    ciudad: "Querétaro",
    venue: "Alva Coffee & Health Bar",
    experiencia: "The Brand Atelier",
    fecha: "Jueves 26 de junio",
    hora: "4:00 pm",
    colorExp: "#7a5800",
  },
  {
    ciudad: "Querétaro",
    venue: "Alva Coffee & Health Bar",
    experiencia: "The Brand Atelier",
    fecha: "Jueves 26 de junio",
    hora: "7:30 pm",
    colorExp: "#7a5800",
  },
  // CDMX
  {
    ciudad: "Ciudad de México",
    venue: "Tierra Garat Masaryk",
    experiencia: "Brand & Bloom",
    fecha: "Viernes 27 de junio",
    hora: "5:00 pm",
    colorExp: "#c0005a",
  },
  {
    ciudad: "Ciudad de México",
    venue: "Tierra Garat Masaryk",
    experiencia: "The Brand Atelier",
    fecha: "Sábado 28 de junio",
    hora: "10:00 am",
    colorExp: "#7a5800",
  },
  {
    ciudad: "Ciudad de México",
    venue: "Tierra Garat Masaryk",
    experiencia: "The Brand Atelier",
    fecha: "Sábado 28 de junio",
    hora: "5:00 pm",
    colorExp: "#7a5800",
  },
];

// ─── Masterclasses ──────────────────────────────────────────────────────────

const MASTERCLASSES = [
  {
    titulo: "Cómo posicionarte como especialista y dejar de competir por precio",
    dia: "Jueves 18 de junio",
    numero: "01",
  },
  {
    titulo: "Cómo comenzar a crear contenido para tu marca personal",
    dia: "Martes 23 de junio",
    numero: "02",
  },
  {
    titulo: "Cómo convertir tu audiencia en clientes y tus clientes en una comunidad rentable",
    dia: "Jueves 25 de junio",
    numero: "03",
  },
  {
    titulo: "Cómo elevar el valor de tu negocio",
    dia: "Martes 30 de junio",
    numero: "04",
  },
];

// ─── Componentes ────────────────────────────────────────────────────────────

function SesionCard({ s, index }: { s: typeof SESIONES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="bg-white rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid rgba(58,63,75,0.08)" }}
    >
      {/* Badge experiencia */}
      <span
        className="self-start text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
        style={{ color: s.colorExp, background: `${s.colorExp}14`, border: `1px solid ${s.colorExp}33` }}
      >
        {s.experiencia}
      </span>

      {/* Venue */}
      <div className="flex items-start gap-2 text-sm text-grafito/70">
        <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#c0005a" }} />
        <span className="font-medium">{s.venue}</span>
      </div>

      {/* Fecha */}
      <div className="flex items-center gap-2 text-sm text-grafito/70">
        <Calendar size={14} className="flex-shrink-0" style={{ color: "#c0005a" }} />
        <span>{s.fecha}</span>
      </div>

      {/* Hora */}
      <div className="flex items-center gap-2 text-sm text-grafito/70">
        <Clock size={14} className="flex-shrink-0" style={{ color: "#c0005a" }} />
        <span>{s.hora}</span>
      </div>

      <Link
        href="/eventos/the-art-of-brand"
        className="mt-1 inline-flex items-center justify-center text-sm font-semibold px-5 py-2.5 rounded-full text-white hover:opacity-90 transition-opacity"
        style={{ background: GRADIENT }}
      >
        Ver experiencia →
      </Link>
    </motion.div>
  );
}

function MasterclassCard({ m, index }: { m: typeof MASTERCLASSES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid rgba(58,63,75,0.08)" }}
    >
      {/* Número */}
      <span
        className="font-playfair text-5xl font-bold leading-none"
        style={{ color: "rgba(192,0,90,0.1)" }}
      >
        {m.numero}
      </span>

      {/* Badge en vivo */}
      <div className="flex items-center gap-1.5 self-start">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <span className="text-xs font-bold text-red-500 tracking-widest uppercase">En vivo</span>
        <span className="text-xs text-grafito/40 ml-1">· Instagram</span>
      </div>

      <h3 className="font-playfair text-base sm:text-lg font-bold text-grafito leading-snug flex-1">
        {m.titulo}
      </h3>

      <div className="flex items-center gap-2 text-sm text-grafito/60">
        <Calendar size={14} style={{ color: "#c0005a" }} />
        <span>{m.dia}</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-grafito/45 -mt-2">
        <Radio size={12} style={{ color: "#c0005a" }} />
        <span>@anyvillegas · @loretoconsultora</span>
      </div>

      <Link
        href="/eventos/registro-masterclass"
        className="inline-flex items-center justify-center text-sm font-semibold px-5 py-2.5 rounded-full text-white hover:opacity-90 transition-opacity"
        style={{ background: GRADIENT }}
      >
        Registrarme →
      </Link>
    </motion.div>
  );
}

// ─── Página ─────────────────────────────────────────────────────────────────

const qro = SESIONES.filter((s) => s.ciudad === "Querétaro");
const cdmx = SESIONES.filter((s) => s.ciudad === "Ciudad de México");

export default function EventosPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-36 pb-20 text-center" style={{ background: "#fafafa" }}>
          <div className="max-w-3xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#c0005a" }}
            >
              Junio 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-5xl sm:text-6xl font-bold mb-5"
              style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.1 }}
            >
              Eventos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-grafito/60 text-lg leading-relaxed"
            >
              Experiencias y encuentros diseñados para transformar tu marca con intención, estrategia y presencia.
            </motion.p>
          </div>
        </section>

        {/* ── THE ART OF BRAND ── */}
        <section className="py-20" style={{ background: "white" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-5"
                style={{ background: "rgba(192,0,90,0.07)", color: "#c0005a", border: "1px solid rgba(192,0,90,0.2)" }}
              >
                Colección de Eventos · by Loreto Consultora
              </div>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#1a0a2e" }}>
                The Art of Brand
              </h2>
              <p className="text-grafito/60 text-lg max-w-2xl leading-relaxed mb-2">
                {ART_OF_BRAND.descripcion}
              </p>
              <p className="text-grafito/50 max-w-xl leading-relaxed">
                {ART_OF_BRAND.descripcionLarga}
              </p>
            </motion.div>

            {/* Las 3 experiencias */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
              {EXPERIENCIAS.map((e, i) => (
                <motion.div
                  key={e.nombre}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl p-6"
                  style={{ background: e.bgColor, border: `1px solid ${e.borderColor}` }}
                >
                  <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: e.color }}>{e.subtipo}</p>
                  <h3 className="font-playfair text-xl font-bold text-grafito mb-3">{e.nombre}</h3>
                  <p className="text-sm text-grafito/60 leading-relaxed">{e.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Sesiones por ciudad */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* Querétaro */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: "rgba(192,0,90,0.2)" }} />
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: "rgba(192,0,90,0.07)", border: "1px solid rgba(192,0,90,0.2)" }}>
                    <MapPin size={13} style={{ color: "#c0005a" }} />
                    <span className="text-sm font-bold" style={{ color: "#c0005a" }}>Querétaro</span>
                  </div>
                  <div className="h-px flex-1" style={{ background: "rgba(192,0,90,0.2)" }} />
                </div>
                <div className="flex flex-col gap-4">
                  {qro.map((s, i) => <SesionCard key={i} s={s} index={i} />)}
                </div>
              </div>

              {/* CDMX */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: "rgba(192,0,90,0.2)" }} />
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: "rgba(192,0,90,0.07)", border: "1px solid rgba(192,0,90,0.2)" }}>
                    <MapPin size={13} style={{ color: "#c0005a" }} />
                    <span className="text-sm font-bold" style={{ color: "#c0005a" }}>Ciudad de México</span>
                  </div>
                  <div className="h-px flex-1" style={{ background: "rgba(192,0,90,0.2)" }} />
                </div>
                <div className="flex flex-col gap-4">
                  {cdmx.map((s, i) => <SesionCard key={i} s={s} index={i} />)}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── MASTERCLASSES ── */}
        <section className="py-20" style={{ background: "#fafafa" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-5"
                style={{ background: "rgba(192,0,90,0.07)", color: "#c0005a", border: "1px solid rgba(192,0,90,0.2)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                Junio 2026 · En vivo · Instagram
              </div>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#1a0a2e" }}>
                Masterclasses
              </h2>
              <p className="text-grafito/60 text-lg max-w-xl leading-relaxed">
                Cuatro clases en vivo con <span className="font-semibold text-grafito">Any Villegas</span> y <span className="font-semibold text-grafito">Loreto Consultora</span> para construir y posicionar tu marca personal.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {MASTERCLASSES.map((m, i) => <MasterclassCard key={i} m={m} index={i} />)}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
