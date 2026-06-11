"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const METRICS = [
  { target: 6, suffix: "+", label: "Años" },
  { target: 500, suffix: "+", label: "Clientes" },
  { target: 500, suffix: "+", label: "Alumnos" },
  { target: 5, suffix: "", label: "Países" },
];

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function ChromeBlob() {
  return (
    <div className="relative select-none pointer-events-none" style={{ width: "min(80vw,600px)", height: "min(80vw,600px)" }}>

      {/* SVG filters */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {/* Distorsión orgánica */}
          <filter id="chrome-distort" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.004" numOctaves="4" seed="12" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="55" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="2" />
          </filter>
          {/* Glow exterior */}
          <filter id="outer-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="28" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Inner shimmer */}
          <filter id="inner-shimmer">
            <feTurbulence type="turbulence" baseFrequency="0.025 0.015" numOctaves="3" seed="3" result="t" />
            <feDisplacementMap in="SourceGraphic" in2="t" scale="18" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      {/* Glow ambiental de fondo */}
      <motion.div
        style={{
          position: "absolute", inset: "-15%",
          background: "radial-gradient(ellipse at 45% 45%, rgba(180,100,255,0.5), rgba(255,80,150,0.3), rgba(255,120,50,0.15), transparent 65%)",
          filter: "blur(50px)",
        }}
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
      />

      {/* ── BLOB PRINCIPAL cromado ── */}
      <motion.div
        style={{ position: "absolute", inset: 0, filter: "url(#chrome-distort)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Base oscura con volumen */}
        <div style={{
          width: "100%", height: "100%",
          background: `
            radial-gradient(ellipse 70% 60% at 35% 35%, rgba(140,60,220,0.95) 0%, transparent 60%),
            radial-gradient(ellipse 50% 70% at 70% 65%, rgba(80,20,160,0.9) 0%, transparent 55%),
            radial-gradient(ellipse 80% 80% at 50% 50%, #0d0018 0%, #1a0035 60%, #0a000f 100%)
          `,
          borderRadius: "62% 38% 46% 54% / 52% 44% 56% 48%",
        }} />
      </motion.div>

      {/* Capa iridiscente — colores cromados */}
      <motion.div
        style={{ position: "absolute", inset: "3%", filter: "url(#chrome-distort)", mixBlendMode: "screen" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <div style={{
          width: "100%", height: "100%",
          background: `conic-gradient(
            from 30deg at 40% 40%,
            rgba(255,80,150,0.9),
            rgba(200,100,255,0.8),
            rgba(80,120,255,0.7),
            rgba(0,200,220,0.6),
            rgba(255,140,50,0.8),
            rgba(255,80,150,0.9)
          )`,
          borderRadius: "55% 45% 60% 40% / 45% 58% 42% 55%",
        }} />
      </motion.div>

      {/* Capa de volumen / profundidad */}
      <motion.div
        style={{ position: "absolute", inset: "8%", mixBlendMode: "overlay" }}
        animate={{ rotate: 180 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <div style={{
          width: "100%", height: "100%",
          background: `
            radial-gradient(ellipse 60% 40% at 30% 30%, rgba(255,255,255,0.4), transparent 55%),
            radial-gradient(ellipse 40% 60% at 75% 70%, rgba(255,150,80,0.5), transparent 50%),
            radial-gradient(ellipse 50% 50% at 60% 20%, rgba(100,180,255,0.4), transparent 50%)
          `,
          borderRadius: "50%",
        }} />
      </motion.div>

      {/* Bordes cromados iridiscentes */}
      <motion.div
        style={{ position: "absolute", inset: 0, filter: "url(#inner-shimmer)", mixBlendMode: "color-dodge", opacity: 0.6 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <div style={{
          width: "100%", height: "100%",
          background: `conic-gradient(from 0deg, #ff5096, #a050ff, #5080ff, #00d4ff, #ff8c32, #ff5096)`,
          borderRadius: "60% 40% 55% 45% / 50% 62% 38% 55%",
        }} />
      </motion.div>

      {/* Specular highlight principal — blanco brillante */}
      <motion.div
        style={{
          position: "absolute", top: "12%", left: "18%",
          width: "35%", height: "28%",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.4) 35%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(6px)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.75, 1, 0.75], x: [0, 6, 0], y: [0, -4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Specular secundario — teal/azul */}
      <motion.div
        style={{
          position: "absolute", bottom: "20%", right: "15%",
          width: "22%", height: "18%",
          background: "radial-gradient(ellipse, rgba(100,220,255,0.8) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Reflejo naranja/dorado rim light */}
      <motion.div
        style={{
          position: "absolute", bottom: "10%", left: "25%",
          width: "40%", height: "18%",
          background: "radial-gradient(ellipse, rgba(255,140,50,0.65) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(12px)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      {/* Morphing shape outer */}
      <motion.div
        style={{ position: "absolute", inset: 0 }}
        animate={{
          borderRadius: [
            "62% 38% 46% 54% / 52% 44% 56% 48%",
            "45% 55% 38% 62% / 60% 38% 62% 40%",
            "58% 42% 62% 38% / 42% 60% 40% 58%",
            "40% 60% 52% 48% / 54% 46% 54% 46%",
            "62% 38% 46% 54% / 52% 44% 56% 48%",
          ],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glow exterior total */}
      <div style={{
        position: "absolute", inset: "10%",
        background: "transparent",
        boxShadow: "0 0 80px 20px rgba(160,80,255,0.3), 0 0 120px 40px rgba(255,80,150,0.15)",
        borderRadius: "50%",
        filter: "blur(8px)",
      }} />
    </div>
  );
}

export default function Hero() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#06000f" }}
    >
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }}
      />

      {/* Fondo — halo púrpura difuso */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(100,40,180,0.25), transparent 65%)" }}
      />

      {/* ── BLOB — fondo centrado ── */}
      <motion.div
        className="absolute"
        style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <ChromeBlob />
      </motion.div>

      {/* ── CONTENIDO ── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full px-4" style={{ paddingTop: "7rem", paddingBottom: "2rem" }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-6"
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "8px 20px", borderRadius: "999px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(10px)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6A92", display: "inline-block", boxShadow: "0 0 8px #FF6A92" }} />
            Consultoría de Marketing · 5 Países
          </span>
        </motion.div>

        {/* BIG TYPOGRAPHY — línea 1 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(4rem, 13vw, 11rem)",
            lineHeight: 0.92,
            color: "rgba(255,255,255,0.08)",
            letterSpacing: "-0.02em",
            WebkitTextStroke: "1px rgba(255,255,255,0.18)",
            userSelect: "none",
            marginBottom: "0.1em",
          }}
        >
          DE MARCA
        </motion.div>

        {/* BIG TYPOGRAPHY — línea 2 con gradiente */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.78 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(4rem, 13vw, 11rem)",
            lineHeight: 0.92,
            background: "linear-gradient(135deg, #ffffff 30%, #E894FF 60%, #6A8AFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
            marginBottom: "0.1em",
          }}
        >
          INVISIBLE
        </motion.div>

        {/* Accent cursiva */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            lineHeight: 1,
            background: "linear-gradient(135deg, #FF6A92, #E894FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "0.3em",
          }}
        >
          a referente en tu industria
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
            maxWidth: "520px",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          Transformamos marcas personales, PYMEs y corporaciones en negocios rentables con estrategia, comunicación y ventas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link href="/contacto" style={{
            background: "linear-gradient(135deg, #FF6A92, #E894FF)",
            color: "#fff", fontWeight: 700,
            padding: "14px 36px", borderRadius: "999px",
            fontSize: "0.9rem", textDecoration: "none",
            boxShadow: "0 8px 40px rgba(255,106,146,0.4)",
            transition: "all 0.25s",
          }}>
            Solicita tu Brand Compass
          </Link>
          <Link href="/servicios" style={{
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.75)", fontWeight: 600,
            padding: "14px 36px", borderRadius: "999px",
            fontSize: "0.9rem", textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(10px)",
            transition: "all 0.25s",
          }}>
            Ver servicios
          </Link>
        </motion.div>
      </div>

      {/* ── MÉTRICAS ── */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        style={{
          position: "relative", zIndex: 10,
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "20px",
          overflow: "hidden",
          margin: "2rem 1rem 3rem",
          maxWidth: "600px",
          width: "100%",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        {METRICS.map((m, i) => {
          const count = useCounter(m.target, 1800, started); // eslint-disable-line
          return (
            <div key={m.label} style={{ padding: "20px 12px", textAlign: "center", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: 700, color: "#fff" }}>
                {count}{m.suffix}
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: "4px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {m.label}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>scroll</span>
        <motion.div
          style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)", transformOrigin: "top" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
