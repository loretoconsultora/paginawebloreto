"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const METRICS = [
  { target: 6, suffix: "+", label: "Años de experiencia" },
  { target: 500, suffix: "+", label: "Clientes atendidos" },
  { target: 500, suffix: "+", label: "Alumnos formados" },
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
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function MetricItem({ target, suffix, label, started }: { target: number; suffix: string; label: string; started: boolean }) {
  const count = useCounter(target, 1800, started);
  return (
    <div className="flex flex-col items-center sm:items-start">
      <span style={{
        fontFamily: "var(--font-playfair)",
        fontSize: "clamp(2rem, 4vw, 2.8rem)",
        fontWeight: 900,
        lineHeight: 1,
        background: "linear-gradient(135deg, #3A3F4B 0%, #FF6A92 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {count}{suffix}
      </span>
      <span style={{
        fontSize: "0.6rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "rgba(58,63,75,0.45)",
        fontWeight: 600,
        marginTop: "4px",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Grain sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px"
        }}
      />

      {/* Glow intencional — aureola coral/lila definida */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          right: "-5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "55vw",
          height: "55vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(232,148,255,0.28) 0%, rgba(255,106,146,0.18) 38%, rgba(255,200,220,0.08) 65%, transparent 75%)",
          filter: "blur(32px)",
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0 items-center min-h-[calc(100vh-7rem)]">

          {/* ── COLUMNA IZQUIERDA — Contenido ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1 py-8 lg:py-0 lg:pr-8">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#FF6A92",
                border: "1px solid rgba(255,106,146,0.3)",
                padding: "7px 18px", borderRadius: "999px",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF6A92", boxShadow: "0 0 6px #FF6A92", flexShrink: 0 }} />
                Consultoría de Marketing · 6 Años · 5 Países
              </span>
            </motion.div>

            {/* DE MARCA — ghost outline, más pequeño, acento */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 4vw, 3.8rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "transparent",
                WebkitTextStroke: "1px rgba(58,63,75,0.18)",
                marginBottom: "0.05em",
              }}
            >
              DE MARCA
            </motion.div>

            {/* INVISIBLE — protagonista, llena el espacio */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.44 }}
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 900,
                fontSize: "clamp(4.5rem, 11vw, 10rem)",
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "0.2em",
              }}
            >
              INVISIBLE
            </motion.div>

            {/* Cursiva — puente emocional */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.56 }}
              style={{
                fontFamily: "var(--font-dancing)",
                fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
                lineHeight: 1.3,
                background: "linear-gradient(135deg, #c0005a, #9b30c8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "2rem",
              }}
            >
              a referente en tu industria
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.68 }}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              <Link href="/contacto" style={{
                background: "linear-gradient(135deg, #FF6A92, #E894FF)",
                color: "#fff", fontWeight: 700,
                padding: "14px 34px", borderRadius: "999px",
                fontSize: "0.88rem", textDecoration: "none",
                boxShadow: "0 8px 28px rgba(255,106,146,0.35)",
                letterSpacing: "0.01em",
              }}>
                Solicita tu Brand Compass
              </Link>
              <Link href="/servicios" style={{
                color: "#3A3F4B", fontWeight: 600,
                padding: "14px 34px", borderRadius: "999px",
                fontSize: "0.88rem", textDecoration: "none",
                border: "2px solid rgba(58,63,75,0.22)",
                background: "rgba(255,255,255,0.8)",
                letterSpacing: "0.01em",
              }}>
                Ver servicios →
              </Link>
            </motion.div>

            {/* Métricas — strip premium */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              style={{
                display: "flex",
                gap: "0",
                marginTop: "3rem",
                borderTop: "1px solid rgba(58,63,75,0.08)",
                paddingTop: "1.5rem",
              }}
            >
              {METRICS.map((m, i) => (
                <div key={m.label} style={{
                  display: "flex",
                  alignItems: "stretch",
                  flex: 1,
                }}>
                  <MetricItem target={m.target} suffix={m.suffix} label={m.label} started={started} />
                  {i < METRICS.length - 1 && (
                    <div style={{
                      width: "1px",
                      background: "rgba(58,63,75,0.1)",
                      margin: "0 1.5rem",
                      alignSelf: "stretch",
                    }} />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── COLUMNA DERECHA — Blob ── */}
          <motion.div
            className="order-1 lg:order-2 flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            style={{
              width: "clamp(320px, 44vw, 580px)",
              minHeight: "clamp(320px, 44vw, 580px)",
            }}
          >
            {/* Blob flotando */}
            <motion.img
              src="/blob.png"
              alt=""
              style={{
                width: "100%",
                height: "auto",
                position: "relative",
                zIndex: 1,
                filter: "drop-shadow(0 24px 56px rgba(200,100,255,0.18)) drop-shadow(0 6px 20px rgba(255,106,146,0.14))",
              }}
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        style={{
          position: "absolute", bottom: "1.5rem", left: "50%",
          transform: "translateX(-50%)", display: "flex",
          flexDirection: "column", alignItems: "center", gap: "6px"
        }}
      >
        <span style={{ fontSize: "0.58rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(58,63,75,0.2)" }}>scroll</span>
        <motion.div
          style={{ width: 1, height: 30, background: "linear-gradient(to bottom, rgba(58,63,75,0.18), transparent)", transformOrigin: "top" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
