"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CALENDAR = "https://links.victoranza.com/widget/booking/gn3nH4IgtAreQ9jPQ7C2";

// ─── Planeta principal ───────────────────────────────────────────────
const PLANET_STATES = [
  { x: 0,    y: 60,   scale: 1,    size: 280 },
  { x: 190,  y: 0,    scale: 1.35, size: 280 },
  { x: 0,    y: 0,    scale: 4.2,  size: 280 },
  { x: 0,    y: 30,   scale: 1,    size: 280 },
  { x: 160,  y: 40,   scale: 0.85, size: 280 },
];

// Venus y Marte — más pequeños, distintos rosas
const SECONDARY = [
  {
    name: "Venus",
    size: 70,
    orbit: 210,
    speed: 12,
    start: 60,
    bg: "radial-gradient(circle at 38% 35%, #ffd6e0, #ffb3c6, #FF6A92)",
    shadow: "0 0 22px rgba(255,179,198,0.7), 0 0 44px rgba(255,106,146,0.35)",
  },
  {
    name: "Marte",
    size: 48,
    orbit: 310,
    speed: 20,
    start: 200,
    bg: "radial-gradient(circle at 38% 35%, #ffaec4, #c0005a, #7a0035)",
    shadow: "0 0 18px rgba(192,0,90,0.6), 0 0 36px rgba(192,0,90,0.25)",
  },
];

// ─── Tierra con continentes en SVG ────────────────────────────────────
function EarthGlobe({ size }: { size: number }) {
  const r = size / 2;
  const id = "eg";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        {/* Gradiente esférico base */}
        <radialGradient id={`${id}base`} cx="38%" cy="35%" r="70%">
          <stop offset="0%"   stopColor="#FF6A92" stopOpacity="0.25" />
          <stop offset="55%"  stopColor="#c0005a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7a0035" stopOpacity="0.35" />
        </radialGradient>
        {/* Gradiente para continentes */}
        <radialGradient id={`${id}land`} cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#ffb3c6" stopOpacity="1" />
          <stop offset="100%" stopColor="#FF6A92" stopOpacity="0.7" />
        </radialGradient>
        {/* Brillo atmosférico */}
        <radialGradient id={`${id}atmo`} cx="50%" cy="50%" r="50%">
          <stop offset="75%"  stopColor="transparent" />
          <stop offset="100%" stopColor="#FF6A92" stopOpacity="0.5" />
        </radialGradient>
        <clipPath id={`${id}clip`}>
          <circle cx={r} cy={r} r={r - 1} />
        </clipPath>
      </defs>

      {/* Base esférica */}
      <circle cx={r} cy={r} r={r - 1} fill={`url(#${id}base)`} />

      {/* Continentes simplificados — escala relativa al radio */}
      <g clipPath={`url(#${id}clip)`} fill={`url(#${id}land)`} fillOpacity="0.55">
        {/* América del Norte */}
        <path d={`
          M ${r*0.18} ${r*0.22}
          C ${r*0.22} ${r*0.14}, ${r*0.38} ${r*0.16}, ${r*0.42} ${r*0.28}
          C ${r*0.46} ${r*0.38}, ${r*0.44} ${r*0.52}, ${r*0.36} ${r*0.56}
          C ${r*0.28} ${r*0.60}, ${r*0.16} ${r*0.52}, ${r*0.14} ${r*0.42}
          C ${r*0.12} ${r*0.32}, ${r*0.14} ${r*0.28}, ${r*0.18} ${r*0.22} Z
        `} />
        {/* América del Sur */}
        <path d={`
          M ${r*0.30} ${r*0.62}
          C ${r*0.38} ${r*0.60}, ${r*0.44} ${r*0.68}, ${r*0.42} ${r*0.82}
          C ${r*0.40} ${r*0.94}, ${r*0.30} ${r*1.02}, ${r*0.24} ${r*0.96}
          C ${r*0.18} ${r*0.88}, ${r*0.20} ${r*0.74}, ${r*0.24} ${r*0.66}
          C ${r*0.26} ${r*0.62}, ${r*0.28} ${r*0.62}, ${r*0.30} ${r*0.62} Z
        `} />
        {/* Europa */}
        <path d={`
          M ${r*0.56} ${r*0.24}
          C ${r*0.62} ${r*0.20}, ${r*0.70} ${r*0.22}, ${r*0.72} ${r*0.30}
          C ${r*0.74} ${r*0.38}, ${r*0.68} ${r*0.44}, ${r*0.62} ${r*0.44}
          C ${r*0.56} ${r*0.44}, ${r*0.52} ${r*0.38}, ${r*0.52} ${r*0.32}
          C ${r*0.52} ${r*0.26}, ${r*0.54} ${r*0.26}, ${r*0.56} ${r*0.24} Z
        `} />
        {/* África */}
        <path d={`
          M ${r*0.56} ${r*0.48}
          C ${r*0.64} ${r*0.46}, ${r*0.72} ${r*0.52}, ${r*0.72} ${r*0.64}
          C ${r*0.72} ${r*0.80}, ${r*0.64} ${r*0.92}, ${r*0.56} ${r*0.94}
          C ${r*0.48} ${r*0.94}, ${r*0.44} ${r*0.84}, ${r*0.46} ${r*0.70}
          C ${r*0.48} ${r*0.56}, ${r*0.52} ${r*0.50}, ${r*0.56} ${r*0.48} Z
        `} />
        {/* Asia */}
        <path d={`
          M ${r*0.74} ${r*0.20}
          C ${r*0.86} ${r*0.16}, ${r*1.02} ${r*0.18}, ${r*1.06} ${r*0.30}
          C ${r*1.10} ${r*0.42}, ${r*1.04} ${r*0.54}, ${r*0.94} ${r*0.58}
          C ${r*0.84} ${r*0.62}, ${r*0.74} ${r*0.56}, ${r*0.72} ${r*0.46}
          C ${r*0.70} ${r*0.36}, ${r*0.70} ${r*0.26}, ${r*0.74} ${r*0.20} Z
        `} />
        {/* Australia */}
        <ellipse cx={r*0.92} cy={r*0.76} rx={r*0.10} ry={r*0.07} transform={`rotate(-8 ${r*0.92} ${r*0.76})`} />
      </g>

      {/* Brillo atmosférico exterior */}
      <circle cx={r} cy={r} r={r - 1} fill={`url(#${id}atmo)`} />
      {/* Borde de atmósfera */}
      <circle cx={r} cy={r} r={r - 1} fill="none" stroke="#FF6A92" strokeWidth="2.5" strokeOpacity="0.4" />
      <circle cx={r} cy={r} r={r + 6} fill="none" stroke="#c0005a" strokeWidth="1.5" strokeOpacity="0.15" />
      <circle cx={r} cy={r} r={r + 14} fill="none" stroke="#FF6A92" strokeWidth="1" strokeOpacity="0.08" />
    </svg>
  );
}

// ─── Contenido de texto por escena ───────────────────────────────────
const SCENES = [
  { pre: "Un universo de",   bold: "posibilidades",         sub: null,                                                                       layout: "center"       },
  { pre: "Infinitas",        bold: "oportunidades",         sub: "Cada marca es un mundo único con su propio potencial de crecimiento.",      layout: "left"         },
  { pre: "Y múltiples",      bold: "caminos",               sub: "No existe una sola ruta al éxito. Exploramos la tuya.",                    layout: "bottom-left"  },
  { pre: "Tu marca,",        bold: "tu sistema solar",      sub: "Cada pieza orbita con un propósito: hacer crecer tu negocio.",              layout: "center-bottom"},
  { pre: "Encuentra el tuyo","bold": "con nuestra consultoría", sub: "Sesiones estratégicas diseñadas para tu momento de negocio.",          layout: "left-cta"     },
];

// ─── Componente de texto por escena ──────────────────────────────────
function SceneText({ scene, index }: { scene: typeof SCENES[0]; index: number }) {
  const posClass: Record<string, string> = {
    "center":        "inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none",
    "left":          "inset-0 flex flex-col justify-center text-left px-8 sm:px-16 max-w-lg pointer-events-none",
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
      >
        <p className="text-white/50 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2">
          {scene.pre}
        </p>
        <h2
          className="font-playfair font-bold leading-tight mb-3"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            background: "linear-gradient(135deg, #ffffff 0%, #FF6A92 55%, #E894FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {scene.bold}
        </h2>
        {scene.sub && (
          <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-sm mb-5">
            {scene.sub}
          </p>
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

// ─── Planeta secundario orbitando ─────────────────────────────────────
function OrbitPlanet({ p, visible }: { p: typeof SECONDARY[0]; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        left: "50%", top: "50%",
        marginLeft: -p.orbit / 2, marginTop: -p.orbit / 2,
        width: p.orbit, height: p.orbit,
        animation: visible ? `orbit ${p.speed}s linear infinite` : "none",
        animationDelay: `-${(p.start / 360) * p.speed}s`,
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

  useEffect(() => {
    const id = setInterval(() => setScene((s) => (s + 1) % TOTAL), 3800);
    return () => clearInterval(id);
  }, [TOTAL]);

  const ps = PLANET_STATES[scene];
  const showOrbit = scene >= 3;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#0d0518" }}
    >
      {/* Nebulosas de fondo — halos suaves en colores marca */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { w: 500, h: 500, top: "-10%", left: "-5%",  bg: "rgba(192,0,90,0.12)",   blur: 120 },
          { w: 400, h: 400, top: "50%",  left: "65%",  bg: "rgba(255,106,146,0.09)",blur: 100 },
          { w: 300, h: 300, top: "20%",  left: "75%",  bg: "rgba(232,148,255,0.08)",blur: 90  },
          { w: 250, h: 250, top: "70%",  left: "10%",  bg: "rgba(192,0,90,0.07)",   blur: 80  },
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

      {/* Anillos de órbita (visibles sólo en escenas 3 y 4) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[210, 310].map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: showOrbit ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "absolute",
              width: r * 2, height: r * 2,
              borderRadius: "50%",
              border: `1px solid rgba(255,106,146,${i === 0 ? 0.15 : 0.10})`,
            }}
          />
        ))}
      </div>

      {/* Venus y Marte orbitando */}
      <div className="absolute inset-0 pointer-events-none" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 0, height: 0 }}>
          {SECONDARY.map((p, i) => (
            <OrbitPlanet key={i} p={p} visible={showOrbit} />
          ))}
        </div>
      </div>

      {/* Tierra — SVG con continentes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ x: ps.x, y: ps.y, scale: ps.scale }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: ps.size, height: ps.size,
            flexShrink: 0,
            filter: "drop-shadow(0 0 40px rgba(192,0,90,0.5)) drop-shadow(0 0 80px rgba(192,0,90,0.2))",
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

      {/* CSS: rotación de órbita */}
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
