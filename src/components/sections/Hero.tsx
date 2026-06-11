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
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <div className="font-playfair text-3xl sm:text-4xl font-bold" style={{ color: "#3A3F4B" }}>
        {count}{suffix}
      </div>
      <div className="text-xs mt-1 font-montserrat" style={{ color: "#3A3F4B80" }}>{label}</div>
    </motion.div>
  );
}

export default function Hero() {
  const [metricsStarted, setMetricsStarted] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMetricsStarted(true); },
      { threshold: 0.3 }
    );
    if (metricsRef.current) observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#fdf8ff" }}
    >
      {/* SVG filters */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="blob-distort">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.006"
              numOctaves="3"
              seed="8"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="35"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ── BLOB CENTRADO COMO FONDO ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        {/* Halo exterior difuso */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "min(90vw, 750px)",
            height: "min(90vw, 750px)",
            background: "radial-gradient(circle at 40% 40%, #FF6A92, #E894FF, #6A8AFF, #2DD4BF, transparent 70%)",
            filter: "blur(60px)",
            opacity: 0.35,
          }}
          animate={{ scale: [1, 1.08, 1], rotate: [0, 360] }}
          transition={{ scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 30, repeat: Infinity, ease: "linear" } }}
        />

        {/* Blob principal iridiscente */}
        <motion.div
          style={{
            width: "min(85vw, 700px)",
            height: "min(85vw, 700px)",
            filter: "url(#blob-distort)",
            position: "relative",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `conic-gradient(
                from 0deg at 50% 50%,
                #FF6A92,
                #F393AE,
                #fbc7d9,
                #E894FF,
                #c4b5f4,
                #6A8AFF,
                #93c5fd,
                #2DD4BF,
                #6A8AFF,
                #E894FF,
                #F393AE,
                #FF6A92
              )`,
              borderRadius: "60% 40% 55% 45% / 50% 60% 40% 55%",
            }}
          />
        </motion.div>

        {/* Capa shimmer contrarotante */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "min(60vw, 500px)",
            height: "min(60vw, 500px)",
            background: `conic-gradient(
              from 90deg,
              transparent 0%,
              rgba(255,255,255,0.55) 20%,
              transparent 40%,
              rgba(255,255,255,0.25) 60%,
              transparent 80%
            )`,
            mixBlendMode: "overlay",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        {/* Specular highlight principal */}
        <motion.div
          className="absolute"
          style={{
            top: "18%",
            left: "22%",
            width: "28%",
            height: "22%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
            borderRadius: "50%",
            filter: "blur(10px)",
            mixBlendMode: "screen",
          }}
          animate={{ opacity: [0.7, 1, 0.7], x: [0, 8, 0], y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Specular highlight secundario */}
        <motion.div
          className="absolute"
          style={{
            bottom: "22%",
            right: "20%",
            width: "16%",
            height: "14%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(8px)",
            mixBlendMode: "screen",
          }}
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Morphing shape overlay */}
        <motion.div
          className="absolute"
          style={{
            width: "min(80vw, 660px)",
            height: "min(80vw, 660px)",
            background: "linear-gradient(135deg, rgba(255,106,146,0.08), rgba(232,148,255,0.06), rgba(106,138,255,0.08))",
            mixBlendMode: "multiply",
          }}
          animate={{
            borderRadius: [
              "60% 40% 55% 45% / 50% 60% 40% 55%",
              "45% 55% 40% 60% / 60% 40% 60% 40%",
              "55% 45% 65% 35% / 45% 55% 45% 55%",
              "40% 60% 45% 55% / 55% 45% 55% 45%",
              "60% 40% 55% 45% / 50% 60% 40% 55%",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Partículas orbitantes */}
        {[
          { angle: 20, radius: 320, size: 8, color: "#F393AE", duration: 15 },
          { angle: 100, radius: 300, size: 5, color: "#6A8AFF", duration: 20 },
          { angle: 200, radius: 340, size: 6, color: "#E894FF", duration: 18 },
          { angle: 290, radius: 310, size: 4, color: "#2DD4BF", duration: 22 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
              top: "50%",
              left: "50%",
              transformOrigin: `-${p.radius / 2}px 0px`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: i * 2 }}
          />
        ))}
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ── CONTENIDO CENTRADO SOBRE EL BLOB ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto pt-28 pb-10">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full border"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(255,106,146,0.25)",
              color: "#FF6A92",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A92] animate-pulse" />
            Consultoría de Marketing · 6 Años · 5 Países
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="font-playfair font-bold leading-[1.05] mb-4"
          style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "#3A3F4B" }}
        >
          De marca invisible
          <br />
          a referente en
        </motion.h1>

        {/* Palabra accent */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28 }}
          className="font-dancing block mb-8"
          style={{
            fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
            background: "linear-gradient(135deg, #FF6A92, #E894FF, #6A8AFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.1,
          }}
        >
          tu industria
        </motion.span>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="text-base sm:text-lg leading-relaxed max-w-2xl mb-10"
          style={{ color: "#3A3F4B99" }}
        >
          Transformamos marcas personales, PYMEs y corporaciones en negocios rentables con estrategia de marketing, comunicación y sistemas de ventas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contacto"
            className="font-semibold px-9 py-4 rounded-full text-base transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #FF6A92, #E894FF)",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(255,106,146,0.35)",
            }}
          >
            Solicita tu Brand Compass
          </Link>
          <Link
            href="/servicios"
            className="font-semibold px-9 py-4 rounded-full text-base transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(12px)",
              color: "#3A3F4B",
              border: "1px solid rgba(58,63,75,0.12)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            Conoce nuestros servicios
          </Link>
        </motion.div>
      </div>

      {/* ── MÉTRICAS ── */}
      <motion.div
        ref={metricsRef}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-16"
      >
        <div
          className="rounded-3xl px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6"
          style={{
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 8px 40px rgba(106,138,255,0.08)",
          }}
        >
          {METRICS.map((m, i) => (
            <MetricCard
              key={m.label}
              target={m.target}
              suffix={m.suffix}
              label={m.label}
              delay={0.8 + i * 0.1}
              started={metricsStarted}
            />
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "rgba(58,63,75,0.3)" }}
      >
        <span className="text-xs font-montserrat tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 origin-top"
          style={{ background: "rgba(58,63,75,0.2)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
