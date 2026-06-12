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

// ─── Página completa ──────────────────────────────────────────────────
export default function ConsultoriaPage() {
  return (
    <>
      <Navbar />
      <main>
        <CinematicHero />

        {/* Sección de consultorías — próximamente */}
        <section className="py-24 bg-white text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#c0005a" }}>
              Nuestras consultorías
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-5" style={{
              background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 50%, #E894FF 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Tu camino, tu ritmo
            </h2>
            <p className="text-grafito/65 text-lg leading-relaxed mb-8">
              Trabajamos contigo para identificar exactamente en qué punto está tu marca y cuál es el siguiente paso real.
            </p>
            <Link
              href={CALENDAR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #c0005a, #FF6A92, #E894FF)", boxShadow: "0 8px 28px rgba(192,0,90,0.35)" }}
            >
              Agendar consultoría gratuita <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
