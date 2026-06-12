"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CALENDAR = "https://links.victoranza.com/widget/booking/gn3nH4IgtAreQ9jPQ7C2";

// ─── Planeta principal ───────────────────────────────────────────────
// Posición y escala para cada escena
const PLANET_STATES = [
  { x: 0,    y: 60,   scale: 1,    size: 260 }, // 0 – centro, tamaño medio
  { x: 190,  y: 0,    scale: 1.35, size: 260 }, // 1 – derecha, más grande
  { x: 0,    y: 0,    scale: 4.2,  size: 260 }, // 2 – enorme, cubre pantalla
  { x: 0,    y: 30,   scale: 1,    size: 200 }, // 3 – centro con órbitas
  { x: 160,  y: 40,   scale: 0.85, size: 260 }, // 4 – derecha pequeño + CTA
];

// ─── Planetas secundarios (sólo escenas 3 y 4) ───────────────────────
const SECONDARY = [
  { size: 72,  orbit: 190, speed: 10, start: 0,   bg: "radial-gradient(circle at 35% 35%, #9de8ea, #3ab8ba)",    shadow: "0 0 24px rgba(103,198,200,0.6)" },
  { size: 52,  orbit: 260, speed: 16, start: 120, bg: "radial-gradient(circle at 35% 35%, #ffe066, #b8860b)",    shadow: "0 0 20px rgba(245,200,66,0.6)"  },
  { size: 44,  orbit: 320, speed: 22, start: 240, bg: "radial-gradient(circle at 35% 35%, #E894FF, #6a00c8)",    shadow: "0 0 18px rgba(232,148,255,0.6)" },
];

// ─── Contenido de texto por escena ───────────────────────────────────
const SCENES = [
  {
    pre:  "Un universo de",
    bold: "posibilidades",
    sub:  null,
    layout: "center",
  },
  {
    pre:  "Infinitas",
    bold: "oportunidades",
    sub:  "Cada marca es un mundo único con su propio potencial de crecimiento.",
    layout: "left",
  },
  {
    pre:  "Y múltiples",
    bold: "caminos",
    sub:  "No existe una sola ruta al éxito. Exploramos la tuya.",
    layout: "bottom-left",
  },
  {
    pre:  "Tu marca,",
    bold: "tu sistema solar",
    sub:  "Cada pieza orbita con un propósito: hacer crecer tu negocio.",
    layout: "center-bottom",
  },
  {
    pre:  "Encuentra el tuyo",
    bold: "con nuestra consultoría",
    sub:  "Sesiones estratégicas diseñadas para tu momento de negocio.",
    layout: "left-cta",
  },
];

// ─── Componente de texto por escena ──────────────────────────────────
function SceneText({ scene, index }: { scene: typeof SCENES[0]; index: number }) {
  const base = "pointer-events-none select-none";

  const posClass: Record<string, string> = {
    "center":       "inset-0 flex flex-col items-center justify-center text-center px-6",
    "left":         "inset-0 flex flex-col justify-center text-left px-8 sm:px-16 max-w-lg",
    "bottom-left":  "bottom-10 left-8 sm:left-14 text-left max-w-xs sm:max-w-sm",
    "center-bottom":"bottom-10 left-0 right-0 text-center px-6",
    "left-cta":     "inset-0 flex flex-col justify-center text-left px-8 sm:px-16 max-w-md pointer-events-auto",
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute ${posClass[scene.layout]} ${base}`}
      >
        <p className="text-grafito/55 text-sm sm:text-base font-semibold tracking-widest uppercase mb-1">
          {scene.pre}
        </p>
        <h2
          className="font-playfair font-bold leading-tight mb-3"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 50%, #E894FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {scene.bold}
        </h2>
        {scene.sub && (
          <p className="text-grafito/65 text-sm sm:text-base leading-relaxed max-w-sm mb-5">
            {scene.sub}
          </p>
        )}
        {scene.layout === "left-cta" && (
          <Link
            href={CALENDAR}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #c0005a, #FF6A92, #E894FF)", boxShadow: "0 8px 28px rgba(192,0,90,0.35)" }}
          >
            Agendar mi consultoría <ArrowRight size={15} />
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Planeta secundario orbitando ─────────────────────────────────────
function OrbitPlanet({ p, visible }: { p: typeof SECONDARY[0]; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        left: "50%", top: "50%",
        marginLeft: -p.orbit / 2, marginTop: -p.orbit / 2,
        width: p.orbit, height: p.orbit,
        animation: visible ? `orbit ${p.speed}s linear infinite` : "none",
        animationDelay: `-${p.start / 360 * p.speed}s`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: "50%",
          marginLeft: -p.size / 2,
          marginTop: -p.size / 2,
          width: p.size, height: p.size,
          borderRadius: "50%",
          background: p.bg,
          boxShadow: p.shadow,
        }}
      />
    </motion.div>
  );
}

// ─── Hero cinematográfico ─────────────────────────────────────────────
function CinematicHero() {
  const [scene, setScene] = useState(0);
  const TOTAL = SCENES.length;
  const DURATION = 3800;

  useEffect(() => {
    const id = setInterval(() => setScene((s) => (s + 1) % TOTAL), DURATION);
    return () => clearInterval(id);
  }, [TOTAL]);

  const ps = PLANET_STATES[scene];
  const showOrbit = scene >= 3;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#fdf0f5" }}
    >
      {/* Partículas de fondo suaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { w: 320, h: 320, top: "10%", left: "5%",  bg: "rgba(192,0,90,0.07)",    blur: 80 },
          { w: 260, h: 260, top: "60%", left: "70%", bg: "rgba(103,198,200,0.08)", blur: 70 },
          { w: 200, h: 200, top: "30%", left: "80%", bg: "rgba(232,148,255,0.07)", blur: 60 },
          { w: 180, h: 180, top: "75%", left: "15%", bg: "rgba(245,200,66,0.06)",  blur: 60 },
        ].map((b, i) => (
          <div key={i} style={{ position: "absolute", width: b.w, height: b.h, top: b.top, left: b.left, background: b.bg, borderRadius: "50%", filter: `blur(${b.blur}px)` }} />
        ))}
        {/* Puntitos estilo estrellas en colores marca */}
        {[
          { top: "15%", left: "20%", c: "#c0005a" }, { top: "25%", left: "75%", c: "#67c6c8" },
          { top: "55%", left: "10%", c: "#f5c842" }, { top: "70%", left: "85%", c: "#E894FF" },
          { top: "40%", left: "60%", c: "#FF6A92" }, { top: "85%", left: "45%", c: "#3ab8ba" },
          { top: "10%", left: "90%", c: "#c0005a" }, { top: "80%", left: "30%", c: "#E894FF" },
        ].map((d, i) => (
          <div key={i} style={{ position: "absolute", top: d.top, left: d.left, width: 5, height: 5, borderRadius: "50%", background: d.c, opacity: 0.35 }} />
        ))}
      </div>

      {/* Planetas secundarios orbitando */}
      <div className="absolute inset-0 pointer-events-none" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 0, height: 0 }}>
          {SECONDARY.map((p, i) => (
            <OrbitPlanet key={i} p={p} visible={showOrbit} />
          ))}
        </div>
      </div>

      {/* Planeta principal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ x: ps.x, y: ps.y, scale: ps.scale }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: ps.size, height: ps.size,
            borderRadius: "50%",
            background: "radial-gradient(circle at 32% 32%, #FF6A92 0%, #c0005a 45%, #7a0035 100%)",
            boxShadow: "0 0 60px rgba(192,0,90,0.5), 0 0 120px rgba(192,0,90,0.25), inset -20px -20px 40px rgba(0,0,0,0.2)",
            flexShrink: 0,
          }}
        />
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
              background: i === scene ? "#c0005a" : "rgba(192,0,90,0.25)",
            }}
          />
        ))}
      </div>

      {/* CSS keyframes para la órbita */}
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Datos de consultorías ────────────────────────────────────────────
const AUDITORIAS = [
  "Activos digitales",
  "Optimización de oferta",
  "Marca",
  "Mercado",
];

const CONSULTORIAS = [
  {
    titulo: "Estrategia de Comunicación y Posicionamiento",
    icon: "📡",
    borderGradient: "linear-gradient(135deg, #c0005a, #FF6A92)",
    badgeColor: "#c0005a",
    badgeBg: "rgba(192,0,90,0.08)",
  },
  {
    titulo: "Estrategia de Marca y Dirección Creativa",
    icon: "🎨",
    borderGradient: "linear-gradient(135deg, #FF6A92, #E894FF)",
    badgeColor: "#d4005a",
    badgeBg: "rgba(212,0,90,0.08)",
  },
  {
    titulo: "Estrategia Comercial / Customer Journey",
    icon: "🛤️",
    borderGradient: "linear-gradient(135deg, #b8860b, #f5c842, #ffe066)",
    badgeColor: "#7a5800",
    badgeBg: "rgba(122,88,0,0.08)",
  },
  {
    titulo: "Estrategia Digital",
    icon: "💻",
    borderGradient: "linear-gradient(135deg, #6a00c8, #E894FF)",
    badgeColor: "#6a00c8",
    badgeBg: "rgba(106,0,200,0.08)",
  },
  {
    titulo: "Construcción y Lanzamiento de Oferta",
    icon: "🚀",
    borderGradient: "linear-gradient(135deg, #3ab8ba, #67c6c8, #9de8ea)",
    badgeColor: "#0d6b6d",
    badgeBg: "rgba(13,107,109,0.08)",
  },
  {
    titulo: "Estrategia RRSS",
    icon: "📱",
    borderGradient: "linear-gradient(135deg, #c0005a, #FF6A92, #ffaec4)",
    badgeColor: "#c0005a",
    badgeBg: "rgba(192,0,90,0.08)",
  },
  {
    titulo: "Estrategias de Relaciones Públicas",
    icon: "🤝",
    borderGradient: "linear-gradient(135deg, #1a0a2e, #c0005a, #E894FF)",
    badgeColor: "#1a0a2e",
    badgeBg: "rgba(26,10,46,0.07)",
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

            {/* Card de Auditorías — ocupa ancho completo */}
            <div className="rounded-3xl p-[3px] mb-6" style={{ background: "linear-gradient(135deg, #3ab8ba, #67c6c8, #9de8ea)" }}>
              <div className="rounded-[22px] bg-white px-8 py-7">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex-1">
                    <div
                      className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-3 border"
                      style={{ color: "#0d6b6d", borderColor: "rgba(13,107,109,0.3)", background: "rgba(13,107,109,0.07)" }}
                    >
                      🔍 Auditorías
                    </div>
                    <p className="text-grafito/60 text-sm mb-4">Diagnósticos profundos para conocer el estado real de tu marca.</p>
                    <div className="flex flex-wrap gap-2">
                      {AUDITORIAS.map((a) => (
                        <span
                          key={a}
                          className="text-sm font-medium px-4 py-1.5 rounded-full"
                          style={{ background: "rgba(103,198,200,0.12)", color: "#0d6b6d", border: "1px solid rgba(103,198,200,0.4)" }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={CALENDAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #3ab8ba, #67c6c8)", boxShadow: "0 6px 20px rgba(103,198,200,0.4)" }}
                  >
                    Agendar <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Grid de consultorías individuales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CONSULTORIAS.map((c) => (
                <div key={c.titulo} className="rounded-3xl p-[3px]" style={{ background: c.borderGradient }}>
                  <div className="rounded-[22px] bg-white px-6 py-6 h-full flex flex-col justify-between gap-4">
                    <div>
                      <span className="text-2xl mb-3 block">{c.icon}</span>
                      <h3 className="font-playfair text-base font-bold text-grafito leading-snug">
                        {c.titulo}
                      </h3>
                    </div>
                    <Link
                      href={CALENDAR}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full self-start hover:opacity-80 transition-opacity text-white"
                      style={{ background: c.borderGradient }}
                    >
                      Agendar <ArrowRight size={11} />
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
