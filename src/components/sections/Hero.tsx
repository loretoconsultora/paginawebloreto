"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["MARCA", "NEGOCIO", "IDENTIDAD", "HISTORIA", "COMUNIDAD", "PROPÓSITO"];
const WORD_FONT_SIZE = "clamp(3.2rem, 8vw, 7.5rem)";
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
    <div className="flex flex-col items-center">
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
      className="relative flex items-center justify-center overflow-hidden"
      style={{ background: "#ffffff", minHeight: "88vh" }}
    >
      {/* Grain sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px"
        }}
      />

      {/* Glow de fondo centrado */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "70vw",
          maxWidth: 800,
          maxHeight: 800,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(232,148,255,0.22) 0%, rgba(255,106,146,0.12) 40%, transparent 70%)",
          filter: "blur(48px)",
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 pt-28 pb-10 flex flex-col items-center text-center">

        {/* Trasciende el VALOR de tu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 700,
            fontSize: "clamp(1.6rem, 4vw, 3.6rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#3A3F4B",
            marginBottom: "0.05em",
          }}
        >
          Trasciende el VALOR de tu
        </motion.div>

        {/* Palabra ciclada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: WORD_FONT_SIZE,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            marginBottom: "0.2em",
            minHeight: "1em",
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

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
            lineHeight: 1.3,
            background: "linear-gradient(135deg, #c0005a, #9b30c8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "2rem",
          }}
        >
          <TypewriterText text={TAGLINE} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}
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
          transition={{ duration: 0.6, delay: 0.82 }}
          style={{
            marginTop: "2.5rem",
            borderTop: "1px solid rgba(58,63,75,0.08)",
            paddingTop: "1.8rem",
            width: "100%",
          }}
        >
          {/* Números */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0" }}>
            {METRICS.map((m, i) => (
              <div key={m.label} style={{ display: "flex", alignItems: "stretch" }}>
                <MetricItem target={m.target} suffix={m.suffix} label={m.label} started={started} />
                {i < METRICS.length - 1 && (
                  <div style={{ width: "1px", background: "rgba(58,63,75,0.1)", margin: "0 2rem", alignSelf: "stretch" }} />
                )}
              </div>
            ))}
          </div>

          {/* Banderas */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "1.2rem", flexWrap: "wrap" }}>
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
