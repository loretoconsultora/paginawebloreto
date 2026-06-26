"use client";

import Link from "next/link";
import { MapPin, Clock, Calendar, Radio } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";

// ─── Masterclasses ──────────────────────────────────────────────────────────

const MASTERCLASSES = [
  { titulo: "Cómo posicionarte como especialista y dejar de competir por precio", dia: "Jueves 18 de junio", numero: "01", imagen: "/eventos/masterclass-1.png", terminada: true },
  { titulo: "Cómo comenzar a crear contenido para tu marca personal", dia: "Martes 23 de junio", numero: "02", imagen: "/eventos/masterclass-2.png" },
  { titulo: "Cómo convertir tu audiencia en clientes y tus clientes en una comunidad rentable", dia: "Jueves 25 de junio", numero: "03", imagen: "/eventos/masterclass-3.png" },
  { titulo: "Cómo elevar el valor de tu negocio con Inteligencia Artificial", dia: "Martes 30 de junio", numero: "04", imagen: "/eventos/masterclass-4.png" },
];

const HORARIOS_MASTERCLASS = [
  { bandera: "🇲🇽", pais: "CDMX", hora: "7:30 pm" },
  { bandera: "🇨🇴", pais: "Bogotá", hora: "8:30 pm" },
  { bandera: "🇦🇷", pais: "Bs. Aires", hora: "10:30 pm" },
];

function MasterclassCard({ m, index }: { m: typeof MASTERCLASSES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid rgba(58,63,75,0.08)" }}
    >
      <div className="w-full aspect-square overflow-hidden relative">
        <img
          src={m.imagen}
          alt={m.titulo}
          className="w-full h-full object-contain"
          style={m.terminada ? { filter: "grayscale(1)" } : undefined}
          onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <span
          className="absolute top-3 left-3 font-playfair text-2xl font-bold leading-none text-white px-2.5 py-1 rounded-lg"
          style={{ background: "rgba(26,10,46,0.55)" }}
        >
          {m.numero}
        </span>
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
      <div className="flex items-center gap-1.5 self-start">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <span className="text-xs font-bold text-red-500 tracking-widest uppercase">En vivo</span>
        <span className="text-xs text-grafito/40 ml-1">· Instagram</span>
      </div>
      {m.terminada && (
        <span className="text-xs font-bold uppercase tracking-widest -mt-2" style={{ color: "#c0005a" }}>
          Terminada
        </span>
      )}
      <h3 className="font-playfair text-base sm:text-lg font-bold text-grafito leading-snug flex-1">{m.titulo}</h3>
      <div className="flex items-center gap-2 text-sm text-grafito/60">
        <Calendar size={14} style={{ color: "#c0005a" }} />
        <span>{m.dia}</span>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 -mt-1">
        {HORARIOS_MASTERCLASS.map((h) => (
          <span key={h.pais} className="text-xs text-grafito/50">
            {h.bandera} {h.pais} {h.hora}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-grafito/45 -mt-2">
        <Radio size={12} style={{ color: "#c0005a" }} />
        <span>@anyvillegas.v · @loreto.consultora</span>
      </div>
      <Link
        href="/eventos/registro-masterclass"
        className="inline-flex items-center justify-center text-sm font-semibold px-5 py-2.5 rounded-full text-white hover:opacity-90 transition-opacity"
        style={{ background: GRADIENT }}
      >
        Registrarme →
      </Link>
      </div>
    </motion.div>
  );
}

// ─── The Art of Brand ───────────────────────────────────────────────────────

const EXPERIENCIAS = [
  {
    nombre: "Brand & Bloom",
    subtipo: "Diseño floral + branding",
    paraQuien: "Experiencia de autor para emprendedor@s y dueñ@s de negocio que desean crecer su marca con autenticidad.",
    aprende: "Storytelling, arquetipos de marca, comunicación estratégica y estrategia de contenidos para redes sociales.",
    incluye: "Workshop de marketing (con manual post curso) + workshop de diseño floral (materiales incluidos) + bebida y aperitivos.",
    color: "#c0005a",
    bgColor: "rgba(192,0,90,0.07)",
    borderColor: "rgba(192,0,90,0.2)",
    imagen: "/eventos/brand-bloom.png",
  },
  {
    nombre: "The Brand Atelier",
    subtipo: "Cerámica + branding",
    paraQuien: "Experiencia de autor para emprendedor@s y dueñ@s de negocio que buscan cumplir sus metas 2026 con las herramientas más nuevas de marketing digital y ventas.",
    aprende: "Planeación estratégica, project management interno, herramientas de mejora continua y las últimas actualizaciones de los negocios digitales.",
    incluye: "Workshop de negocios (con manual post curso) + workshop de pintura de cerámica (materiales incluidos) + bebida y aperitivos.",
    color: "#7a5800",
    bgColor: "rgba(245,200,66,0.09)",
    borderColor: "rgba(245,200,66,0.35)",
    imagen: "/eventos/brand-atelier.png",
  },
  {
    nombre: "The Brand Muse",
    subtipo: "Self Portrait + branding",
    paraQuien: "Experiencia de autor para emprendedor@s y dueñ@s de negocio que se han sentido saturados o con incertidumbre últimamente, ideal para reconectar con claridad y certeza.",
    aprende: "Identidad de marca, cómo pasar de emprendedor a empresario, y diseño de sistemas de negocio escalables que te den libertad.",
    incluye: "Workshop de negocios (con manual post curso) + workshop de autorretrato en lienzo o espejo (materiales incluidos) + bebida y aperitivos.",
    color: "#0d6b6d",
    bgColor: "rgba(13,107,109,0.07)",
    borderColor: "rgba(13,107,109,0.2)",
    imagen: "/eventos/brand-muse.png",
  },
];

const CIUDADES = [
  {
    ciudad: "Ciudad de México",
    venue: "Mimbre",
    direccion: "Colonia San Rafael",
    mapsUrl: "https://maps.app.goo.gl/U3ARncK9UNJcLS8WA",
    sesiones: [
      { experiencia: "Brand & Bloom",      fecha: "Mar 7 jul", hora: "4:00 - 7:00 pm", colorExp: "#c0005a", estado: "proximamente" },
      { experiencia: "The Brand Atelier",  fecha: "Mié 8 jul", hora: "4:00 - 7:00 pm", colorExp: "#7a5800", estado: "proximamente" },
      { experiencia: "The Brand Muse",     fecha: "Jue 9 jul", hora: "4:00 - 7:00 pm",  colorExp: "#0d6b6d", estado: "proximamente" },
    ],
  },
  {
    ciudad: "Querétaro",
    venue: "Alva Coffee & Health Bar",
    direccion: "Colonia El Refugio",
    mapsUrl: "https://maps.app.goo.gl/jMxfjyQg3ZC7cKv48",
    sesiones: [
      { experiencia: "Brand & Bloom",      fecha: "Vie 10 jul", hora: "4:00 - 7:00 pm", colorExp: "#c0005a", estado: "proximamente" },
      { experiencia: "The Brand Atelier",  fecha: "Sáb 11 jul", hora: "10:00 am - 1:00 pm", colorExp: "#7a5800", estado: "proximamente" },
      { experiencia: "The Brand Muse",     fecha: "Sáb 11 jul", hora: "4:00 - 7:00 pm", colorExp: "#0d6b6d", estado: "proximamente" },
    ],
  },
];

// ─── Página ─────────────────────────────────────────────────────────────────

export default function EventosPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero — fondo degradado */}
        <section className="pt-36 pb-20 text-center" style={{ background: GRADIENT }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/70"
            >
              Junio 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-5xl sm:text-6xl font-bold mb-5 text-white"
              style={{ lineHeight: 1.1 }}
            >
              Eventos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/85 text-lg leading-relaxed"
            >
              Experiencias y encuentros diseñados para transformar tu marca con estrategia y presencia.
            </motion.p>
          </div>
        </section>

        {/* ── MASTERCLASSES — va primero ── */}
        <section className="py-20" style={{ background: "#fafafa" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Header centrado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-center mb-14"
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
              <h2
                className="font-playfair text-4xl sm:text-5xl font-bold mb-4"
                style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Masterclasses
              </h2>
              <p className="text-grafito/60 text-lg leading-relaxed">
                4 clases en vivo con nuestra Directora General <span className="font-semibold text-grafito">Any Villegas</span> para construir y posicionar tu marca personal.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {MASTERCLASSES.map((m, i) => <MasterclassCard key={i} m={m} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── THE ART OF BRAND ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Header centrado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-5"
                style={{ background: "rgba(192,0,90,0.07)", color: "#c0005a", border: "1px solid rgba(192,0,90,0.2)" }}
              >
                Colección de Eventos
              </div>
              <h2
                className="font-playfair text-4xl sm:text-5xl font-bold mb-5"
                style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                The Art of Brand
              </h2>
              <p className="text-grafito/60 text-lg max-w-3xl mx-auto leading-relaxed mb-3">
                Fusionamos el arte de hacer negocios con experiencias sensoriales, en una atmósfera creativa y segura. Aprende sobre:
              </p>
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm font-semibold" style={{ color: "#c0005a" }}>
                <span>Planeación estratégica</span>
                <span className="text-grafito/25 hidden sm:inline">|</span>
                <span>Estrategias de marca</span>
                <span className="text-grafito/25 hidden sm:inline">|</span>
                <span>Estrategias de comunicación</span>
                <span className="text-grafito/25 hidden sm:inline">|</span>
                <span>Herramientas de IA</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <div
                  className="inline-flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-full"
                  style={{ background: "rgba(192,0,90,0.07)", color: "#c0005a", border: "1px solid rgba(192,0,90,0.2)" }}
                >
                  $1,450 MXN por experiencia
                </div>
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-3 rounded-full"
                  style={{ background: "rgba(192,0,90,0.07)", color: "#c0005a", border: "1px solid rgba(192,0,90,0.2)" }}
                >
                  Bundle 2 Eventos — 10% de descuento
                </div>
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-3 rounded-full"
                  style={{ background: "rgba(192,0,90,0.07)", color: "#c0005a", border: "1px solid rgba(192,0,90,0.2)" }}
                >
                  Total Pass 3 Eventos — 20% de descuento
                </div>
                <Link
                  href="/eventos/registro-art-of-brand"
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 rounded-full text-white hover:opacity-90 transition-opacity"
                  style={{ background: GRADIENT }}
                >
                  Reservar mi lugar →
                </Link>
              </div>
            </motion.div>

            {/* Las 3 experiencias con imagen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {EXPERIENCIAS.map((e, i) => (
                <motion.div
                  key={e.nombre}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden flex flex-col h-full"
                  style={{ border: `1px solid ${e.borderColor}` }}
                >
                  <div className="w-full overflow-hidden flex-shrink-0" style={{ height: 220 }}>
                    <img
                      src={e.imagen}
                      alt={e.nombre}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "top center" }}
                      onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                  <div className="p-6 flex flex-col h-full" style={{ background: e.bgColor }}>
                    <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: e.color }}>{e.subtipo}</p>
                    <h3 className="font-playfair text-xl font-bold text-grafito mb-3">{e.nombre}</h3>
                    <p className="text-sm text-grafito/70 leading-relaxed mb-3">{e.paraQuien}</p>
                    <p className="text-sm text-grafito/60 leading-relaxed mb-3">
                      <span className="font-semibold" style={{ color: e.color }}>Aprende: </span>
                      {e.aprende}
                    </p>
                    <p className="text-sm text-grafito/60 leading-relaxed mb-4">
                      <span className="font-semibold" style={{ color: e.color }}>Incluye: </span>
                      {e.incluye}
                    </p>

                    {/* Fechas por ciudad — solo móvil, justo bajo el card */}
                    <div className="md:hidden mt-auto pt-4 space-y-3" style={{ borderTop: `1px solid ${e.borderColor}` }}>
                      {CIUDADES.map((c) => {
                        const sesion = c.sesiones.find((s) => s.experiencia === e.nombre);
                        if (!sesion) return null;
                        return (
                          <div key={c.ciudad}>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="flex items-center gap-1 text-xs font-semibold text-grafito/80 flex-shrink-0">
                              <MapPin size={12} style={{ color: e.color }} />
                              {c.ciudad}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-grafito/65 flex-shrink-0">
                              <Calendar size={11} style={{ color: e.color }} />
                              {sesion.fecha}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-grafito/65 flex-shrink-0">
                              <Clock size={11} style={{ color: e.color }} />
                              {sesion.hora}
                            </span>
                            <span
                              className="ml-auto text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0"
                              style={
                                sesion.estado === "cerrado"
                                  ? { color: "#9aa0aa", background: "rgba(58,63,75,0.07)", border: "1px solid rgba(58,63,75,0.12)" }
                                  : { color: "#c0005a", background: "rgba(192,0,90,0.08)", border: "1px solid rgba(192,0,90,0.2)" }
                              }
                            >
                              {sesion.estado === "cerrado" ? "Cupo cerrado" : "Próximamente"}
                            </span>
                          </div>
                          <a
                            href={c.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-grafito/45 hover:text-grafito/70 transition-colors pl-[18px]"
                          >
                            {c.venue}, {c.direccion}
                          </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fechas por ciudad — solo desktop, en móvil ya se muestran bajo cada card */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8">
              {CIUDADES.map((c, ci) => (
                <motion.div
                  key={c.ciudad}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: ci * 0.1 }}
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(58,63,75,0.1)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
                >
                  <div className="px-6 py-4 flex items-center gap-3" style={{ background: GRADIENT }}>
                    <MapPin size={16} className="text-white flex-shrink-0" />
                    <div>
                      <p className="text-white font-bold text-base leading-tight">{c.ciudad}</p>
                      <a
                        href={c.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 text-xs hover:text-white transition-colors"
                      >
                        {c.venue}, {c.direccion}
                      </a>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100 bg-white">
                    {c.sesiones.map((s, si) => (
                      <div key={si} className="flex items-center gap-3 px-5 py-3 flex-wrap sm:flex-nowrap">
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                          style={{ color: s.colorExp, background: `${s.colorExp}14`, border: `1px solid ${s.colorExp}33`, minWidth: 120, textAlign: "center" }}
                        >
                          {s.experiencia}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-grafito/65 flex-shrink-0">
                          <Calendar size={12} style={{ color: "#c0005a" }} />
                          {s.fecha}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-grafito/65 flex-shrink-0">
                          <Clock size={12} style={{ color: "#c0005a" }} />
                          {s.hora}
                        </span>
                        <span
                          className="ml-auto text-xs font-semibold px-4 py-1.5 rounded-full flex-shrink-0"
                          style={
                            s.estado === "cerrado"
                              ? { color: "#9aa0aa", background: "rgba(58,63,75,0.07)", border: "1px solid rgba(58,63,75,0.12)" }
                              : { color: "#c0005a", background: "rgba(192,0,90,0.08)", border: "1px solid rgba(192,0,90,0.2)" }
                          }
                        >
                          {s.estado === "cerrado" ? "Cupo cerrado" : "Próximamente"}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
