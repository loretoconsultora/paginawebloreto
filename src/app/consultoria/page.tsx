"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CALENDAR = "https://links.victoranza.com/widget/booking/gn3nH4IgtAreQ9jPQ7C2";

// ─── Planeta principal ───────────────────────────────────────────────
const PLANET_STATES = [
  { x: 0,    y: 60,   scale: 1,    size: 280 },  // posibilidades
  { x: 190,  y: 0,    scale: 1.35, size: 280 },  // oportunidades
  { x: 160,  y: 40,   scale: 0.85, size: 280 },  // encuentra la tuya
];


// ─── Tierra con imagen real ───────────────────────────────────────────
function EarthGlobe({ size }: { size: number }) {
  return (
    <img
      src="/planet/tierra.png"
      alt="Tierra"
      style={{ width: size, height: size, objectFit: "contain", opacity: 1, flexShrink: 0 }}
    />
  );
}

// ─── Contenido de texto por escena ───────────────────────────────────
const SCENES = [
  { pre: "Un universo de",   bold: "posibilidades",         boldSmall: null,                           boldThird: null,               sub: null, layout: "center", preCursive: true,  boldCursive: false },
  { pre: null,               bold: "Infinitas",             boldSmall: "oportunidades",                boldThird: "caminos y versiones de ti",  sub: null, layout: "left",   preCursive: false, boldCursive: true  },
  { pre: "Encuentra la tuya con nuestras", bold: "consultorías", boldSmall: null,                    boldThird: null,               sub: null, layout: "left-shifted",   preCursive: true,  boldCursive: false, boldAtSmallSize: true },
];

// ─── Componente de texto por escena ──────────────────────────────────
function SceneText({ scene, index }: { scene: typeof SCENES[0]; index: number }) {
  const posClass: Record<string, string> = {
    "center":        "inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none",
    "left":          "inset-0 flex flex-col justify-center text-left px-8 sm:px-16 max-w-lg pointer-events-none",
    "left-shifted":  "inset-0 flex flex-col justify-center text-left px-16 sm:px-32 max-w-xl pointer-events-none",
    "bottom-left":   "bottom-12 left-8 sm:left-14 text-left max-w-xs sm:max-w-sm pointer-events-none",
    "center-bottom": "bottom-12 left-0 right-0 text-center px-6 pointer-events-none",
    "left-cta":      "inset-0 flex flex-col justify-center text-left px-8 sm:px-16 max-w-md pointer-events-auto",
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute select-none ${posClass[scene.layout]}`}
        style={{ zIndex: 20 }}
      >
        {/* Pre-título */}
        {scene.pre && (scene.preCursive ? (
          <p
            className="font-dancing text-white mb-1"
            style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.8rem)", lineHeight: 1.2 }}
          >
            {scene.pre}
          </p>
        ) : (
          <p className="text-white/50 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2">
            {scene.pre}
          </p>
        ))}

        {/* Título principal */}
        {(scene as any).boldAtSmallSize ? (
          <h2
            className="font-playfair font-bold leading-tight mb-3 text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            {scene.bold}
          </h2>
        ) : scene.boldSmall ? (
          <>
            {/* "Infinitas" — cursiva, mismo tamaño que "Un universo de" */}
            <h2
              className="font-dancing text-white leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {scene.bold}
            </h2>
            <h2
              className="font-playfair font-bold leading-tight text-white"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              {scene.boldSmall}
            </h2>
            {(scene as any).boldThird && (
              <h2
                className="font-playfair font-bold leading-tight mb-3 text-white"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                {(scene as any).boldThird}
              </h2>
            )}
          </>
        ) : (
          <h2
            className="font-playfair font-bold leading-tight mb-3 text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
          >
            {scene.bold}
          </h2>
        )}
        {scene.layout === "left-cta" && (
          <Link
            href={CALENDAR}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #c0005a, #FF6A92, #E894FF)", boxShadow: "0 8px 28px rgba(192,0,90,0.45)" }}
          >
            Agendar mi consultoría <ArrowRight size={15} />
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
}


// ─── Hero cinematográfico ─────────────────────────────────────────────
function CinematicHero() {
  const [scene, setScene] = useState(0);
  const TOTAL = SCENES.length;

  useEffect(() => {
    const id = setInterval(() => setScene((s) => (s + 1) % TOTAL), 3800);
    return () => clearInterval(id);
  }, [TOTAL]);

  const ps = PLANET_STATES[scene];
  const showOrbit = true;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#5c0030" }}
    >
      {/* Video de estrellas de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.14, zIndex: 1 }}
      >
        <source src="/consultoria/stars.mp4" type="video/mp4" />
      </video>

      {/* Nebulosas de fondo — halos suaves en colores marca */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { w: 500, h: 500, top: "-10%", left: "-5%",  bg: "rgba(192,0,90,0.22)",   blur: 120 },
          { w: 400, h: 400, top: "50%",  left: "65%",  bg: "rgba(255,106,146,0.18)",blur: 100 },
          { w: 300, h: 300, top: "20%",  left: "75%",  bg: "rgba(212,0,90,0.14)",   blur: 90  },
          { w: 250, h: 250, top: "70%",  left: "10%",  bg: "rgba(192,0,90,0.16)",   blur: 80  },
        ].map((b, i) => (
          <div key={i} style={{ position: "absolute", width: b.w, height: b.h, top: b.top, left: b.left, background: b.bg, borderRadius: "50%", filter: `blur(${b.blur}px)` }} />
        ))}

        {/* Estrellas — puntos blancos/rosas pequeños */}
        {[
          { top: "8%",  left: "12%", s: 2.5, o: 0.6 }, { top: "14%", left: "68%", s: 2,   o: 0.5 },
          { top: "22%", left: "88%", s: 1.5, o: 0.7 }, { top: "35%", left: "5%",  s: 2,   o: 0.4 },
          { top: "48%", left: "92%", s: 2.5, o: 0.6 }, { top: "58%", left: "22%", s: 1.5, o: 0.5 },
          { top: "72%", left: "78%", s: 2,   o: 0.6 }, { top: "82%", left: "42%", s: 1.5, o: 0.4 },
          { top: "90%", left: "15%", s: 2.5, o: 0.5 }, { top: "5%",  left: "45%", s: 2,   o: 0.6 },
          { top: "65%", left: "55%", s: 1.5, o: 0.45 },{ top: "30%", left: "35%", s: 2,   o: 0.35 },
        ].map((d, i) => (
          <div key={i} style={{ position: "absolute", top: d.top, left: d.left, width: d.s, height: d.s, borderRadius: "50%", background: i % 3 === 0 ? "#FF6A92" : "white", opacity: d.o }} />
        ))}
      </div>

      {/* Anillos de órbita — elipse inclinada que coincide con el movimiento de los planetas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
        {[{ r: 210, alpha: 0.22 }, { r: 320, alpha: 0.15 }].map(({ r, alpha }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: showOrbit ? 1 : 0 }}
            transition={{ duration: 1.2, delay: i * 0.15 }}
            style={{
              position: "absolute",
              width: r * 2,
              height: r * 2 * 0.4,   // mismo factor 0.4 que el OrbitPlanet
              borderRadius: "50%",
              border: `1px solid rgba(255,106,146,${alpha})`,
            }}
          />
        ))}
      </div>

      {/* Sistema solar — absolute inset-0, mismo stacking context */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>

        {/* Tierra */}
        <motion.div
          animate={{ x: ps.x, y: ps.y, scale: ps.scale }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: "50%", top: "50%",
            marginLeft: -ps.size / 2,
            marginTop: -ps.size / 2,
            width: ps.size, height: ps.size,
            zIndex: 5,
          }}
        >
          <EarthGlobe size={ps.size} />
        </motion.div>

      </div>

      {/* Texto de la escena */}
      <SceneText scene={SCENES[scene]} index={scene} />

      {/* Dots de navegación */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {SCENES.map((_, i) => (
          <button
            key={i}
            onClick={() => setScene(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === scene ? 24 : 7,
              height: 7,
              background: i === scene ? "#FF6A92" : "rgba(255,106,146,0.25)",
            }}
          />
        ))}
      </div>

    </div>
  );
}

// ─── Datos de consultorías ────────────────────────────────────────────
const GRUPOS = [
  {
    label: "Auditorías",
    icon: "🔍",
    gradient: "linear-gradient(135deg, #3ab8ba, #67c6c8, #9de8ea)",
    color: "#0d6b6d",
    bg: "rgba(13,107,109,0.07)",
    border: "rgba(13,107,109,0.3)",
    items: [
      { titulo: "Activos digitales",      icon: "📊" },
      { titulo: "Optimización de oferta", icon: "🎯" },
      { titulo: "Marca",                  icon: "✨" },
      { titulo: "Mercado",                icon: "🌐" },
    ],
  },
  {
    label: "Estratégicas",
    icon: "📡",
    gradient: "linear-gradient(135deg, #c0005a, #FF6A92, #E894FF)",
    color: "#c0005a",
    bg: "rgba(192,0,90,0.07)",
    border: "rgba(192,0,90,0.3)",
    items: [
      { titulo: "Estrategia de Comunicación y Posicionamiento", icon: "📡" },
      { titulo: "Estrategia de Marca y Dirección Creativa",     icon: "🎨" },
      { titulo: "Procesos comerciales y Customer Journey",      icon: "🛤️" },
      { titulo: "Estrategia Digital",                          icon: "💻" },
      { titulo: "Estrategia RRSS",                             icon: "📱" },
      { titulo: "Estrategias de Relaciones Públicas",          icon: "🤝" },
    ],
  },
  {
    label: "Business Intelligence",
    icon: "🧠",
    gradient: "linear-gradient(135deg, #1a0a2e, #6a00c8, #E894FF)",
    color: "#6a00c8",
    bg: "rgba(106,0,200,0.07)",
    border: "rgba(106,0,200,0.3)",
    items: [
      { titulo: "Construcción y Lanzamiento de Oferta",              icon: "🚀" },
      { titulo: "Sistema Comercial: Estrategias, Equipos y Activos", icon: "⚙️" },
      { titulo: "Internacionalización de mercado",                   icon: "🌍" },
      { titulo: "Herramientas de IA a la medida de mi negocio",      icon: "🤖" },
    ],
  },
];

// ─── Página completa ──────────────────────────────────────────────────
export default function ConsultoriaPage() {
  return (
    <>
      <Navbar />
      <main>
        <CinematicHero />

        {/* Sección de consultorías */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* Header */}
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#c0005a" }}>
                Nuestras consultorías
              </p>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-4" style={{
                background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 50%, #E894FF 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Tu camino, tu ritmo
              </h2>
              <p className="text-grafito/60 text-lg leading-relaxed max-w-xl mx-auto">
                Sesiones estratégicas diseñadas para el momento exacto de tu negocio.
              </p>
            </div>

            {/* 3 columnas verticales */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {GRUPOS.map((g) => (
                <div key={g.label} className="rounded-3xl p-[3px] flex flex-col" style={{ background: g.gradient }}>
                  <div className="rounded-[22px] bg-white px-6 py-7 flex flex-col gap-5 h-full">

                    {/* Encabezado del grupo */}
                    <div className="flex items-center justify-between">
                      <div
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border"
                        style={{ color: g.color, borderColor: g.border, background: g.bg }}
                      >
                        {g.icon} {g.label}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col gap-3 flex-1">
                      {g.items.map((item) => (
                        <div
                          key={item.titulo}
                          className="flex items-start gap-3 rounded-2xl px-4 py-3"
                          style={{ background: g.bg }}
                        >
                          <span className="text-lg mt-0.5 flex-shrink-0">{item.icon}</span>
                          <span className="font-playfair text-sm font-bold text-grafito leading-snug">
                            {item.titulo}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Botón agendar */}
                    <Link
                      href={CALENDAR}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity w-full"
                      style={{ background: g.gradient }}
                    >
                      Agendar <ArrowRight size={14} />
                    </Link>

                  </div>
                </div>
              ))}
            </div>

            {/* CTA final */}
            <div className="text-center mt-14">
              <p className="text-grafito/55 text-sm mb-5">¿No sabes cuál es la indicada para ti?</p>
              <Link
                href={CALENDAR}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #1a0a2e, #c0005a, #E894FF)", boxShadow: "0 8px 28px rgba(192,0,90,0.35)" }}
              >
                Hablemos y lo encontramos juntos <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
