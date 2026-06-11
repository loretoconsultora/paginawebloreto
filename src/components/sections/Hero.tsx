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

export default function Hero() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }}
      />

      {/* Halo de fondo derecho */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 70% at 75% 50%, rgba(232,148,255,0.1) 0%, rgba(255,106,146,0.07) 40%, transparent 70%)"
      }} />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[calc(100vh-7rem)]">

          {/* ── COLUMNA IZQUIERDA — Contenido ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1 py-8 lg:py-0">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-7"
            >
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#FF6A92",
                border: "1px solid rgba(255,106,146,0.25)",
                padding: "8px 20px", borderRadius: "999px",
                background: "rgba(255,255,255,0.9)",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6A92", boxShadow: "0 0 8px #FF6A92", flexShrink: 0 }} />
                Consultoría de Marketing · 6 Años · 5 Países
              </span>
            </motion.div>

            {/* DE MARCA */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 900,
                fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(58,63,75,0.2)",
                marginBottom: "0.08em",
              }}
            >
              DE MARCA
            </motion.div>

            {/* INVISIBLE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.48 }}
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 900,
                fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #1a0a2e 0%, #FF6A92 50%, #E894FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "0.3em",
              }}
            >
              INVISIBLE
            </motion.div>

            {/* Cursiva */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                fontFamily: "var(--font-dancing)",
                fontSize: "clamp(1.6rem, 3.8vw, 3.2rem)",
                lineHeight: 1.2,
                background: "linear-gradient(135deg, #c0005a, #9b30c8, #4a3aff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "1.4rem",
              }}
            >
              a referente en tu industria
            </motion.div>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.72 }}
              style={{
                color: "rgba(58,63,75,0.5)",
                fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                lineHeight: 1.8,
                maxWidth: "400px",
                marginBottom: "2rem",
              }}
            >
              Transformamos marcas personales, PYMEs y corporaciones en negocios rentables con estrategia, comunicación y ventas.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.84 }}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              <Link href="/contacto" style={{
                background: "linear-gradient(135deg, #FF6A92, #E894FF)",
                color: "#fff", fontWeight: 700,
                padding: "14px 32px", borderRadius: "999px",
                fontSize: "0.88rem", textDecoration: "none",
                boxShadow: "0 8px 32px rgba(255,106,146,0.3)",
              }}>
                Solicita tu Brand Compass
              </Link>
              <Link href="/servicios" style={{
                color: "#3A3F4B", fontWeight: 600,
                padding: "14px 32px", borderRadius: "999px",
                fontSize: "0.88rem", textDecoration: "none",
                border: "1px solid rgba(58,63,75,0.12)",
              }}>
                Ver servicios
              </Link>
            </motion.div>

            {/* Métricas */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              style={{ display: "flex", gap: "2rem", marginTop: "2.5rem", flexWrap: "wrap" }}
            >
              {METRICS.map((m, i) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const count = useCounter(m.target, 1800, started);
                return (
                  <div key={m.label}>
                    <div style={{ fontFamily: "var(--font-playfair)", fontSize: "1.9rem", fontWeight: 700, color: "#3A3F4B", lineHeight: 1 }}>
                      {count}{m.suffix}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(58,63,75,0.45)", marginTop: "3px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
                      {m.label}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* ── COLUMNA DERECHA — Blob ── */}
          <motion.div
            className="order-1 lg:order-2 flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
            style={{ minHeight: "400px" }}
          >
            {/* Glow atmosférico */}
            <motion.div
              style={{
                position: "absolute",
                width: "85%", height: "85%",
                background: "radial-gradient(ellipse at 50% 50%, rgba(232,148,255,0.2) 0%, rgba(255,106,146,0.12) 40%, transparent 70%)",
                filter: "blur(40px)",
                borderRadius: "50%",
              }}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
              transition={{ scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 22, repeat: Infinity, ease: "linear" } }}
            />

            {/* Blob flotando */}
            <motion.img
              src="/blob.png"
              alt=""
              style={{
                width: "min(90%, 520px)",
                height: "auto",
                position: "relative",
                filter: "drop-shadow(0 20px 50px rgba(200,100,255,0.15)) drop-shadow(0 5px 20px rgba(255,106,146,0.12))",
              }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(58,63,75,0.25)" }}>scroll</span>
        <motion.div
          style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(58,63,75,0.2), transparent)", transformOrigin: "top" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
