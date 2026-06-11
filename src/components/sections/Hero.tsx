"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const METRICS = [
  { target: 6, suffix: "+", label: "Años de experiencia" },
  { target: 500, suffix: "+", label: "Clientes y marcas" },
  { target: 500, suffix: "+", label: "Alumnos formados" },
  { target: 5, suffix: "", label: "Países con presencia" },
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

function MetricCard({ target, suffix, label, delay, started }: {
  target: number; suffix: string; label: string; delay: number; started: boolean;
}) {
  const count = useCounter(target, 1800, started);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <div className="font-playfair text-3xl sm:text-4xl font-bold" style={{ color: "#3A3F4B" }}>
        {count}{suffix}
      </div>
      <div className="text-xs mt-1 font-montserrat tracking-wide uppercase" style={{ color: "#3A3F4B60" }}>
        {label}
      </div>
    </motion.div>
  );
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #ffffff 0%, #f5f0ff 50%, #fff5f8 100%)" }}
    >
      {/* Grain sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Halos de color de fondo */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 55% 45% at 75% 45%, rgba(232,148,255,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 45% 55% at 25% 60%, rgba(255,106,146,0.08) 0%, transparent 55%)
        `
      }} />

      {/* ── BLOB IMAGE — centrada, flotando ── */}
      <motion.div
        className="absolute"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(85vw, 680px)",
          height: "min(85vw, 680px)",
          zIndex: 1,
        }}
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Glow detrás del blob */}
        <div style={{
          position: "absolute", inset: "10%",
          background: "radial-gradient(ellipse, rgba(232,148,255,0.25) 0%, rgba(255,106,146,0.15) 40%, transparent 70%)",
          filter: "blur(40px)",
          borderRadius: "50%",
        }} />

        {/* Blob image con float animation */}
        <motion.div
          style={{ width: "100%", height: "100%" }}
          animate={{ y: [0, -22, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blob.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              mixBlendMode: "multiply",
              filter: "drop-shadow(0 30px 60px rgba(180,100,255,0.25)) drop-shadow(0 10px 30px rgba(255,106,146,0.18))",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── CONTENIDO sobre el blob ── */}
      <div
        className="relative flex flex-col items-center text-center w-full px-4"
        style={{ zIndex: 10, paddingTop: "8rem", paddingBottom: "1rem" }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#FF6A92",
            border: "1px solid rgba(255,106,146,0.25)",
            padding: "8px 22px", borderRadius: "999px",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(12px)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6A92", boxShadow: "0 0 8px #FF6A92", flexShrink: 0 }} />
            Consultoría de Marketing · 6 Años · 5 Países
          </span>
        </motion.div>

        {/* BIG TYPE — línea fantasma */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
            lineHeight: 0.9,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(58,63,75,0.15)",
            letterSpacing: "-0.02em",
            userSelect: "none",
          }}
        >
          DE MARCA
        </motion.div>

        {/* BIG TYPE — línea sólida gradiente */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
            lineHeight: 0.9,
            background: "linear-gradient(135deg, #3A3F4B 0%, #FF6A92 50%, #E894FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
            marginBottom: "0.15em",
          }}
        >
          INVISIBLE
        </motion.div>

        {/* Accent cursiva */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
            lineHeight: 1.1,
            background: "linear-gradient(135deg, #FF6A92, #E894FF, #6A8AFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1.5rem",
          }}
        >
          a referente en tu industria
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.92 }}
          style={{
            color: "rgba(58,63,75,0.55)",
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
            maxWidth: "480px",
            lineHeight: 1.75,
            marginBottom: "2.2rem",
          }}
        >
          Transformamos marcas personales, PYMEs y corporaciones en negocios rentables con estrategia, comunicación y ventas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link href="/contacto" style={{
            background: "linear-gradient(135deg, #FF6A92, #E894FF)",
            color: "#fff", fontWeight: 700,
            padding: "14px 36px", borderRadius: "999px",
            fontSize: "0.9rem", textDecoration: "none",
            boxShadow: "0 8px 32px rgba(255,106,146,0.35)",
            transition: "all 0.25s ease",
          }}>
            Solicita tu Brand Compass
          </Link>
          <Link href="/servicios" style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(12px)",
            color: "#3A3F4B", fontWeight: 600,
            padding: "14px 36px", borderRadius: "999px",
            fontSize: "0.9rem", textDecoration: "none",
            border: "1px solid rgba(58,63,75,0.12)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            transition: "all 0.25s ease",
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
        transition={{ duration: 0.7, delay: 1.2 }}
        style={{
          position: "relative", zIndex: 10,
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          gap: "1px",
          background: "rgba(58,63,75,0.08)",
          borderRadius: "24px",
          overflow: "hidden",
          margin: "2.5rem 1rem 3.5rem",
          maxWidth: "580px",
          width: "100%",
          border: "1px solid rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 40px rgba(106,138,255,0.08)",
        }}
      >
        {METRICS.map((m, i) => (
          <MetricCard
            key={m.label}
            target={m.target}
            suffix={m.suffix}
            label={m.label}
            delay={1.3 + i * 0.1}
            started={started}
          />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{
          position: "absolute", bottom: "1.5rem",
          left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        }}
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
