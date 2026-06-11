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
      <div className="font-playfair text-4xl sm:text-5xl font-bold" style={{ color: "#3A3F4B" }}>
        {count}{suffix}
      </div>
      <div className="text-xs mt-1 font-montserrat" style={{ color: "#3A3F4B99" }}>{label}</div>
    </motion.div>
  );
}

function IridescentBlob() {
  return (
    <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] select-none pointer-events-none">

      {/* SVG filter definitions */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="blob-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.008"
              numOctaves="3"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="28"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="3" result="blurred" />
            <feComposite in="blurred" in2="SourceGraphic" operator="atop" />
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Glow exterior difuso */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 40%, #F393AE88, #E894FF66, #6A8AFF44, transparent 70%)",
          filter: "blur(32px)",
          transform: "scale(1.15)",
          animation: "blobRotate 18s linear infinite",
        }}
      />

      {/* Blob principal — capa base */}
      <motion.div
        className="absolute inset-0"
        style={{ filter: "url(#blob-filter)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `conic-gradient(
              from 0deg at 45% 45%,
              #FF6A92,
              #F393AE,
              #E894FF,
              #c4b5f4,
              #6A8AFF,
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

      {/* Capa media — shimmer iridiscente */}
      <motion.div
        className="absolute inset-4"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ mixBlendMode: "overlay" }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `conic-gradient(
              from 180deg at 55% 55%,
              transparent,
              rgba(255,255,255,0.6),
              transparent,
              rgba(255,255,255,0.3),
              transparent
            )`,
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* Capa brillo especular top-left */}
      <motion.div
        className="absolute"
        style={{
          top: "12%",
          left: "15%",
          width: "40%",
          height: "35%",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)",
          borderRadius: "50%",
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Capa brillo especular secundario */}
      <motion.div
        className="absolute"
        style={{
          bottom: "18%",
          right: "12%",
          width: "28%",
          height: "22%",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(6px)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.12, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Morphing border-radius animation layer */}
      <motion.div
        className="absolute inset-0"
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
        style={{
          background: "linear-gradient(135deg, rgba(255,106,146,0.15), rgba(232,148,255,0.1), rgba(106,138,255,0.15))",
          mixBlendMode: "multiply",
        }}
      />

      {/* Partículas flotantes pequeñas */}
      {[
        { top: "8%", left: "20%", size: 6, delay: 0, color: "#F393AE" },
        { top: "75%", left: "10%", size: 4, delay: 1, color: "#6A8AFF" },
        { top: "20%", left: "80%", size: 5, delay: 2, color: "#E894FF" },
        { top: "65%", left: "78%", size: 7, delay: 0.5, color: "#2DD4BF" },
        { top: "45%", left: "5%", size: 3, delay: 1.5, color: "#FF6A92" },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{ y: [0, -16, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      <style>{`
        @keyframes blobRotate {
          from { transform: scale(1.15) rotate(0deg); }
          to { transform: scale(1.15) rotate(360deg); }
        }
      `}</style>
    </div>
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
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#faf8ff" }}>

      {/* Fondo suave iridiscente — muy sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 50%, rgba(232,148,255,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 20% 30%, rgba(255,106,146,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 80% 80%, rgba(106,138,255,0.10) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[80vh]">

          {/* Columna izquierda — copy */}
          <div className="order-2 lg:order-1">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div
                className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full border"
                style={{
                  background: "rgba(255,106,146,0.07)",
                  borderColor: "rgba(255,106,146,0.2)",
                  color: "#FF6A92",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A92] animate-pulse" />
                Consultoría · 6 Años · 5 Países
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="font-playfair font-bold leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", color: "#3A3F4B" }}
            >
              De marca invisible
              <br />
              a referente en
              <br />
              <span
                className="font-dancing"
                style={{
                  fontSize: "1.2em",
                  background: "linear-gradient(135deg, #FF6A92, #E894FF, #6A8AFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "block",
                }}
              >
                tu industria
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base leading-relaxed max-w-lg mb-10"
              style={{ color: "#3A3F4B99" }}
            >
              Transformamos marcas personales, PYMEs y corporaciones en negocios rentables con estrategia de marketing, comunicación y sistemas de ventas que generan resultados reales.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contacto"
                className="group relative overflow-hidden font-semibold px-8 py-4 rounded-full text-base text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #FF6A92, #E894FF)",
                  color: "#fff",
                  boxShadow: "0 8px 32px rgba(255,106,146,0.3)",
                }}
              >
                Solicita tu Brand Compass
              </Link>
              <Link
                href="/servicios"
                className="font-semibold px-8 py-4 rounded-full text-base text-center transition-all duration-300 border hover:bg-white hover:shadow-md"
                style={{
                  color: "#3A3F4B",
                  borderColor: "rgba(58,63,75,0.15)",
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Conoce nuestros servicios
              </Link>
            </motion.div>
          </div>

          {/* Columna derecha — blob iridiscente */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end items-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
          >
            <IridescentBlob />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px my-10" style={{ background: "linear-gradient(90deg, transparent, rgba(58,63,75,0.1), transparent)" }} />

        {/* Métricas */}
        <div ref={metricsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {METRICS.map((m, i) => (
            <MetricCard
              key={m.label}
              target={m.target}
              suffix={m.suffix}
              label={m.label}
              delay={0.7 + i * 0.1}
              started={metricsStarted}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "rgba(58,63,75,0.35)" }}
      >
        <span className="text-xs font-montserrat tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 origin-top"
          style={{ background: "rgba(58,63,75,0.2)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
