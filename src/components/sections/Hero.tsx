"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["MARCA", "NEGOCIO", "IDENTIDAD", "HISTORIA", "COMUNIDAD", "PROPÓSITO"];

const WORD_FONT_SIZE = "clamp(2.6rem, 6.8vw, 6.2rem)";

const TAGLINE = "This is the Bloom Era";

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 52);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <>
      {displayed}
      <span style={{ opacity: displayed.length < text.length ? 1 : 0, transition: "opacity 0.2s" }}>|</span>
    </>
  );
}

const METRICS = [
  { target: 6, suffix: "+", label: "Años de experiencia" },
  { target: 500, suffix: "+", label: "Clientes" },
  { target: 500, suffix: "+", label: "Alumnos" },
];

const FLAGS = [
  { emoji: "🇲🇽", name: "México" },
  { emoji: "🇨🇴", name: "Colombia" },
  { emoji: "🇦🇷", name: "Argentina" },
  { emoji: "🇺🇸", name: "EE. UU." },
  { emoji: "🇪🇸", name: "España" },
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
    <div className="flex flex-col items-start">
      <span style={{
        fontFamily: "var(--font-playfair)",
        fontSize: "clamp(2rem, 4vw, 2.8rem)",
        fontWeight: 900,
        lineHeight: 1,
        color: "#c0005a",
      }}>
        {count}{suffix}
      </span>
      <span style={{
        fontSize: "0.6rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#3A3F4B",
        fontWeight: 700,
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
  const [wordIndex, setWordIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

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
      className="relative flex items-center overflow-hidden"
      style={{ background: "#ffffff", minHeight: "88vh" }}
    >
      {/* Grain sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px"
        }}
      />

      {/* Glow intencional — aureola coral/lila */}
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
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-0 items-center min-h-[calc(88vh-7rem)]">

          {/* ── COLUMNA IZQUIERDA ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1 py-8 lg:py-0 lg:pr-8" style={{ minWidth: 0 }}>

            {/* Expande el PODER de tu */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 3.8vw, 3.4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#3A3F4B",
                marginBottom: "0.05em",
                whiteSpace: "nowrap",
              }}
            >
              Expande el PODER de tu
            </motion.div>

            {/* MARCA — protagonista con word cycling */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.38 }}
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 900,
                fontSize: WORD_FONT_SIZE,
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                marginBottom: "0.18em",
                position: "relative",
                minHeight: "1em",
                overflow: "visible",
                transition: "font-size 0.3s ease",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[wordIndex]}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{
                    display: "block",
                    background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Tagline con typewriter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{
                fontFamily: "var(--font-dancing)",
                fontSize: "clamp(1.5rem, 3vw, 2.6rem)",
                lineHeight: 1.3,
                background: "linear-gradient(135deg, #c0005a, #9b30c8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "1.2rem",
              }}
            >
              <TypewriterText text={TAGLINE} />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              <Link href="https://brand-compass-pwa.vercel.app" target="_blank" rel="noopener noreferrer" style={{
                background: "linear-gradient(135deg, #FF6A92, #E894FF)",
                color: "#fff", fontWeight: 700,
                padding: "14px 34px", borderRadius: "999px",
                fontSize: "0.88rem", textDecoration: "none",
                boxShadow: "0 8px 28px rgba(255,106,146,0.35)",
                letterSpacing: "0.01em",
              }}>
                Inicia ahora tu diagnóstico
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

            {/* Métricas + presencia */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.78 }}
              style={{
                marginTop: "1.4rem",
                borderTop: "1px solid rgba(58,63,75,0.08)",
                paddingTop: "1.5rem",
              }}
            >
              {/* Números */}
              <div style={{ display: "flex", gap: "0" }}>
                {METRICS.map((m, i) => (
                  <div key={m.label} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                    <MetricItem target={m.target} suffix={m.suffix} label={m.label} started={started} />
                    {i < METRICS.length - 1 && (
                      <div style={{ width: "1px", background: "rgba(58,63,75,0.1)", margin: "0 1.4rem", alignSelf: "stretch" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Presencia en banderas */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "1.2rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#3A3F4B" }}>
                  Presencia en
                </span>
                {FLAGS.map((f) => (
                  <span key={f.name} title={f.name} style={{ fontSize: "2.4rem", lineHeight: 1, cursor: "default" }}>
                    {f.emoji}
                </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── COLUMNA DERECHA — Blobs ── */}
          <div className="order-1 lg:order-2 relative" style={{ height: "88vh", minHeight: 500 }}>

            {/* Blob principal — arriba, sangra por derecha */}
            <motion.img
              src="/blob.png"
              alt=""
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1, y: [0, -22, 0] }}
              transition={{
                opacity: { duration: 1.2, delay: 0.1 },
                scale: { duration: 1.2, delay: 0.1, ease: "easeOut" },
                y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
              }}
              style={{
                position: "absolute",
                top: "-22%",
                right: "-12%",
                width: "115%",
                height: "auto",
                zIndex: 1,
                filter: "drop-shadow(0 24px 60px rgba(200,100,255,0.2)) drop-shadow(0 6px 24px rgba(255,106,146,0.15))",
              }}
            />

            {/* Blob secundario — esquina inferior derecha, casi mismo tamaño, cortado */}
            <motion.img
              src="/blob2.png"
              alt=""
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, y: [0, -16, 0] }}
              transition={{
                opacity: { duration: 1.2, delay: 0.5 },
                scale: { duration: 1.2, delay: 0.5, ease: "easeOut" },
                y: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
              }}
              style={{
                position: "absolute",
                bottom: "-28%",
                right: "-20%",
                width: "105%",
                height: "auto",
                zIndex: 2,
                filter: "drop-shadow(0 20px 50px rgba(200,100,255,0.18)) drop-shadow(0 6px 20px rgba(255,106,146,0.13))",
              }}
            />
          </div>

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
