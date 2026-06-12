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

// Venus y Marte — Venus en órbita interior izquierda, Marte en exterior derecha
const SECONDARY = [
  {
    name: "Venus",
    size: 100,
    orbit: 210,  // órbita interior (más cerca de la Tierra)
    speed: 14,
    start: 180,  // 180° → cos=-1 → lado izquierdo al arrancar
    img: "/planet/venus.png",
    opacity: 0.92,
  },
  {
    name: "Marte",
    size: 72,
    orbit: 320,  // órbita exterior (más lejos)
    speed: 22,
    start: 0,    // 0° → cos=+1 → lado derecho al arrancar
    img: "/planet/marte.png",
    opacity: 0.88,
  },
];

// ─── Tierra con imagen real ───────────────────────────────────────────
function EarthGlobe({ size }: { size: number }) {
  return (
    <img
      src="/planet/tierra.png"
      alt="Tierra"
      style={{ width: size, height: size, objectFit: "contain", opacity: 0.4, flexShrink: 0 }}
    />
  );
}

// ─── Contenido de texto por escena ───────────────────────────────────
const SCENES = [
  { pre: "Un universo de",   bold: "posibilidades",               boldSmall: null,            sub: null,                                              layout: "center",   preCursive: true,  boldCursive: false },
  { pre: null,               bold: "Infinitas",                   boldSmall: "oportunidades", sub: "Y múltiples caminos, versiones de ti.",            layout: "left",     preCursive: false, boldCursive: true  },
  { pre: "Encuentra la tuya","bold": "con nuestras consultorías", boldSmall: null,            sub: "Sesiones estratégicas diseñadas para tu momento.", layout: "left-cta", preCursive: false, boldCursive: false },
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
        {/* Pre-título: cursiva grande (escena 1), normal uppercase, o nada */}
        {scene.pre && (scene.preCursive ? (
          <p className="font-dancing text-white/80 mb-1" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            {scene.pre}
          </p>
        ) : (
          <p className="text-white/50 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2">
            {scene.pre}
          </p>
        ))}

        {/* Título: si boldSmall existe → bold grande + boldSmall pequeño */}
        {scene.boldSmall ? (
          <>
            <h2
              className={`${scene.boldCursive ? "font-dancing" : "font-playfair font-bold"} leading-none text-white`}
              style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
            >
              {scene.bold}
            </h2>
            <h2
              className="font-playfair font-bold leading-tight mb-3 text-white/70"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              {scene.boldSmall}
            </h2>
          </>
        ) : (
          <h2
            className="font-playfair font-bold leading-tight mb-3 text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
          >
            {scene.bold}
          </h2>
        )}
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

// ─── Planeta orbitando — posicionado desde el centro del viewport ──────
function OrbitPlanet({ p }: { p: typeof SECONDARY[0] }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const angleRef = useRef((p.start / 360) * Math.PI * 2);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const delta = (2 * Math.PI) / (p.speed * 60);

    const tick = () => {
      angleRef.current += delta;
      const θ = angleRef.current;
      const ox = Math.cos(θ) * p.orbit;
      const oy = Math.sin(θ) * p.orbit * 0.4;
      const depth = Math.sin(θ);
      const scale = 0.5 + 1.0 * (depth + 1) / 2;
      const size = p.size * scale;
      // Cuando el planeta está detrás de la Tierra (depth < 0), se oculta completamente
      // Zona de transición suave: de 0 (totalmente oculto) a 1 (totalmente visible)
      const visibility = depth < 0 ? 0 : Math.min(1, depth * 4); // fade rápido al salir
      const op = p.opacity * visibility;

      const el = imgRef.current;
      if (el) {
        el.style.width     = `${size}px`;
        el.style.height    = `${size}px`;
        // left:50% top:50% = centro del viewport; transform desplaza desde ahí
        el.style.transform = `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`;
        el.style.zIndex    = depth > 0 ? "10" : "1";
        el.style.opacity   = String(op);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <img
      ref={imgRef}
      src={p.img}
      alt={p.name}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: p.size,
        height: p.size,
        transform: `translate(-50%, -50%)`,
        objectFit: "contain",
        opacity: p.opacity,
        pointerEvents: "none",
      }}
    />
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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
      <div className="absolute inset-0 pointer-events-none">

        {/* Venus y Marte — left:50% top:50% = centro del hero */}
        {SECONDARY.map((p, i) => (
          <OrbitPlanet key={i} p={p} />
        ))}

        {/* Tierra — zIndex 5, siempre entre planetas fondo(1) y frente(10) */}
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
