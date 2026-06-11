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
      className="text-center px-4 py-5"
    >
      <div className="font-playfair text-3xl sm:text-4xl font-bold" style={{ color: "#3A3F4B" }}>
        {count}{suffix}
      </div>
      <div className="text-xs mt-1 font-montserrat tracking-widest uppercase" style={{ color: "#3A3F4B55" }}>
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

  const blobSize = "min(88vw, 700px)";

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Grain sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }}
      />

      {/* ─────────────────────────────────────────
          CAPA 1 (z:5) — TEXTO DETRÁS DEL BLOB
          Palabras fantasma, el blob las "corta"
      ───────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ zIndex: 5, paddingTop: "7rem" }}
      >
        {/* "DE MARCA" — detrás, outline muy sutil */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(4rem, 13vw, 11rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(58,63,75,0.18)",
            userSelect: "none",
            width: "100%",
            textAlign: "center",
          }}
        >
          DE MARCA
        </motion.div>

        {/* "INVISIBLE" — detrás, más visible para anclar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(4rem, 13vw, 11rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,106,146,0.25)",
            userSelect: "none",
            width: "100%",
            textAlign: "center",
          }}
        >
          INVISIBLE
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────
          CAPA 2 (z:10) — BLOB CENTRADO
          Flota entre las dos capas de texto
      ───────────────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          marginTop: `calc(${blobSize} / -2)`,
          marginLeft: `calc(${blobSize} / -2)`,
          width: blobSize,
          height: blobSize,
          zIndex: 10,
        }}
      >
        {/* Glow rosa/lila alrededor — efecto atmosférico */}
        <motion.div
          style={{
            position: "absolute", inset: "-28%",
            background: "radial-gradient(ellipse at 50% 50%, rgba(232,148,255,0.22) 0%, rgba(255,106,146,0.15) 35%, rgba(106,138,255,0.08) 60%, transparent 75%)",
            filter: "blur(45px)",
            borderRadius: "50%",
          }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
          transition={{ scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 22, repeat: Infinity, ease: "linear" } }}
        />

        {/* Blob imagen — sin blend mode, blanco invisible sobre blanco */}
        <motion.div
          style={{ width: "100%", height: "100%", position: "relative" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, y: [0, -18, 0] }}
          transition={{
            opacity: { duration: 1.0 },
            scale: { duration: 1.0 },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.0 },
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blob.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              // Sin mix-blend-mode: el blanco del PNG = blanco de la página = invisible naturalmente
              filter: "drop-shadow(0 20px 60px rgba(200,100,255,0.18)) drop-shadow(0 5px 25px rgba(255,106,146,0.15))",
            }}
          />
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────
          CAPA 3 (z:15) — TEXTO DELANTE DEL BLOB
          Sólido, legible, el blob queda detrás
      ───────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ zIndex: 15, paddingTop: "7rem" }}
      >
        {/* "DE MARCA" delante — visible con gradiente */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(4rem, 13vw, 11rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #3A3F4B 0%, #5a4a6a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            width: "100%",
            textAlign: "center",
            // Clip: solo mostrar la mitad superior de "DE MARCA"
            clipPath: "inset(0 0 55% 0)",
          }}
        >
          DE MARCA
        </motion.div>

        {/* "INVISIBLE" delante — solo la mitad inferior visible */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(4rem, 13vw, 11rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #c0005a 0%, #FF6A92 40%, #E894FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            width: "100%",
            textAlign: "center",
            clipPath: "inset(55% 0 0 0)",
          }}
        >
          INVISIBLE
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────
          CAPA 4 (z:20) — CONTENIDO PRINCIPAL
          Eyebrow, cursiva, subtítulo, CTAs
      ───────────────────────────────────────── */}
      <div
        className="relative flex flex-col items-center text-center w-full px-4"
        style={{ zIndex: 20, paddingTop: "calc(7rem + min(88vw, 700px) * 0.72)", paddingBottom: "1rem" }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: "absolute", top: "7.5rem", left: "50%", transform: "translateX(-50%)" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#FF6A92",
            border: "1px solid rgba(255,106,146,0.3)",
            padding: "8px 22px", borderRadius: "999px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6A92", boxShadow: "0 0 8px #FF6A92", flexShrink: 0 }} />
            Consultoría de Marketing · 6 Años · 5 Países
          </span>
        </motion.div>

        {/* Acento cursiva */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(1.8rem, 5.5vw, 4.5rem)",
            lineHeight: 1.15,
            background: "linear-gradient(135deg, #c0005a, #9b30c8, #4a3aff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1rem",
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
            color: "rgba(58,63,75,0.5)",
            fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
            maxWidth: "420px",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}
        >
          Transformamos marcas personales, PYMEs y corporaciones en negocios rentables con estrategia, comunicación y ventas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link href="/contacto" style={{
            background: "linear-gradient(135deg, #FF6A92, #E894FF)",
            color: "#fff", fontWeight: 700,
            padding: "14px 36px", borderRadius: "999px",
            fontSize: "0.88rem", textDecoration: "none",
            boxShadow: "0 8px 32px rgba(255,106,146,0.35)",
          }}>
            Solicita tu Brand Compass
          </Link>
          <Link href="/servicios" style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            color: "#3A3F4B", fontWeight: 600,
            padding: "14px 36px", borderRadius: "999px",
            fontSize: "0.88rem", textDecoration: "none",
            border: "1px solid rgba(58,63,75,0.12)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}>
            Ver servicios
          </Link>
        </motion.div>
      </div>

      {/* Métricas */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        style={{
          position: "relative", zIndex: 20,
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          gap: "1px", background: "rgba(58,63,75,0.08)",
          borderRadius: "24px", overflow: "hidden",
          margin: "2rem 1rem 3.5rem",
          maxWidth: "560px", width: "100%",
          border: "1px solid rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 40px rgba(106,138,255,0.07)",
        }}
      >
        {METRICS.map((m, i) => (
          <MetricCard key={m.label} target={m.target} suffix={m.suffix} label={m.label} delay={1.4 + i * 0.1} started={started} />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
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
