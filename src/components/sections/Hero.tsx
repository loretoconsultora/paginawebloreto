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
      <div className="font-playfair text-4xl sm:text-5xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-xs text-white/60 mt-1 font-montserrat">{label}</div>
    </motion.div>
  );
}

// Logo animado fiel al original
function AnimatedLogo() {
  return (
    <div className="relative w-72 h-72 sm:w-96 sm:h-96">
      {/* Pieza arriba izquierda — teal pequeño */}
      <motion.div
        className="absolute rounded-2xl bg-[#2DD4BF]"
        style={{ top: "4%", left: "4%", width: "36%", height: "36%" }}
        initial={{ opacity: 0, x: -40, y: -40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="w-full h-full rounded-2xl bg-[#2DD4BF]"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Pieza arriba derecha — rosa grande */}
      <motion.div
        className="absolute rounded-2xl bg-[#F393AE]"
        style={{ top: "4%", right: "0%", width: "52%", height: "52%" }}
        initial={{ opacity: 0, x: 40, y: -40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
        whileHover={{ scale: 1.03 }}
      >
        <motion.div
          className="w-full h-full rounded-2xl bg-[#F393AE]"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.div>

      {/* Pieza abajo izquierda — amarillo en L */}
      <motion.div
        className="absolute"
        style={{ bottom: "0%", left: "4%", width: "56%", height: "56%" }}
        initial={{ opacity: 0, x: -40, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        whileHover={{ scale: 1.03 }}
      >
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          {/* L shape: full square minus top-right quadrant */}
          <path
            d="M8 0 H100 V45 H45 V100 H8 Q0 100 0 92 V8 Q0 0 8 0Z"
            fill="#FCCD0D"
            rx="8"
          />
        </motion.svg>
      </motion.div>

      {/* Pieza abajo derecha — teal rectangular */}
      <motion.div
        className="absolute rounded-2xl bg-[#2DD4BF]"
        style={{ bottom: "0%", right: "0%", width: "34%", height: "38%" }}
        initial={{ opacity: 0, x: 40, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.55 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="w-full h-full rounded-2xl bg-[#2DD4BF]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </motion.div>

      {/* Halo de luz detrás */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      </div>
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Fondo gradiente coral → lila → índigo */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #FF6A92 0%, #E894FF 55%, #6A8AFF 100%)"
      }} />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Blobs decorativos */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Columna izquierda — copy */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Consultoría de Marketing · 6 Años · 5 Países
              </div>
            </motion.div>

            {/* Headline grande */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4"
            >
              De marca invisible
              <br />a referente en
              <br />
              <span
                className="font-dancing"
                style={{
                  fontSize: "1.15em",
                  display: "block",
                  marginTop: "0.1em",
                  textShadow: "0 2px 30px rgba(0,0,0,0.15)",
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
              className="text-white/80 text-lg leading-relaxed max-w-xl mb-10"
            >
              Transformamos marcas personales, PYMEs y corporaciones en negocios rentables con estrategia, comunicación y sistemas de ventas que funcionan.
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
                className="group relative overflow-hidden bg-white text-grafito font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 text-center"
                style={{ color: "#3A3F4B" }}
              >
                <span className="relative z-10">Solicita tu Brand Compass</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#fff0f4] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/servicios"
                className="border border-white/40 text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-white/10 transition-all duration-300 text-center backdrop-blur-sm"
              >
                Conoce nuestros servicios
              </Link>
            </motion.div>
          </div>

          {/* Columna derecha — logo animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <AnimatedLogo />
          </motion.div>
        </div>

        {/* Métricas */}
        <motion.div
          ref={metricsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 pt-10 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs font-montserrat tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-white/30 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
