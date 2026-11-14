"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";

const nichos = [
  "Empresarios",
  "Emprendedores",
  "Asesores inmobiliarios",
  "Agentes de seguro",
  "Doctores",
  "PyMEs",
  "Consultores",
  "Centros de bienestar",
  "Freelancers",
  "Coaches",
  "Terapeutas",
];

const NODES = [
  { label: "Marketing", angle: -90 },
  { label: "Ventas", angle: -30 },
  { label: "Publicidad", angle: 30 },
  { label: "Comunicación", angle: 90 },
  { label: "Sistemas", angle: 150 },
  { label: "Inteligencia\nArtificial", angle: 210 },
];

const R = 40;

function nodePos(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    left: `${50 + R * Math.cos(rad)}%`,
    top: `${50 + R * Math.sin(rad)}%`,
  };
}

export default function Servicios() {
  const items = [...nichos, ...nichos, ...nichos];

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-playfair font-bold text-center mb-6"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
            lineHeight: 1.3,
            background: GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Sé parte de la comunidad de empresarios<br className="hidden sm:block" /> que confían en nosotros
        </motion.h2>

        {/* Franja */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-12"
        >
          <div
            className="inline-flex items-center gap-4 px-8 py-3 rounded-full text-white font-semibold tracking-wide"
            style={{ background: GRADIENT, fontSize: "clamp(0.8rem, 1.5vw, 1rem)" }}
          >
            Escala tu negocio <span style={{ opacity: 0.5 }}>·</span> Crece con propósito
          </div>
        </motion.div>

        {/* Diagrama circular */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto mb-10"
          style={{ width: "min(460px, 88vw)", aspectRatio: "1 / 1" }}
        >
          {/* Líneas SVG */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c0005a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#E894FF" stopOpacity="0.3" />
              </linearGradient>
              <radialGradient id="glowBg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(232,148,255,0.12)" />
                <stop offset="100%" stopColor="rgba(232,148,255,0)" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#glowBg)" />
            {NODES.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const x2 = 50 + R * Math.cos(rad);
              const y2 = 50 + R * Math.sin(rad);
              return (
                <line
                  key={node.label}
                  x1="50" y1="50"
                  x2={x2} y2={y2}
                  stroke="url(#lg)"
                  strokeWidth="0.6"
                />
              );
            })}
          </svg>

          {/* Nodo central */}
          <div
            className="absolute flex items-center justify-center text-white font-playfair font-bold text-center leading-tight"
            style={{
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: "22%", height: "22%",
              borderRadius: "50%",
              background: GRADIENT,
              boxShadow: "0 4px 28px rgba(192,0,90,0.4)",
              fontSize: "clamp(0.45rem, 1.4vw, 0.7rem)",
              zIndex: 2,
            }}
          >
            Loreto<br />Consultora
          </div>

          {/* Nodos exteriores */}
          {NODES.map((node, i) => {
            const { left, top } = nodePos(node.angle);
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                className="absolute flex items-center justify-center text-white font-semibold text-center leading-tight"
                style={{
                  left,
                  top,
                  transform: "translate(-50%, -50%)",
                  width: "21%",
                  height: "21%",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(26,10,46,0.92), rgba(192,0,90,0.88))",
                  border: "1px solid rgba(232,148,255,0.45)",
                  boxShadow: "0 2px 14px rgba(192,0,90,0.22)",
                  fontSize: "clamp(0.42rem, 1.2vw, 0.62rem)",
                  zIndex: 2,
                  whiteSpace: "pre-line",
                }}
              >
                {node.label}
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-14"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full text-sm"
            style={{
              background: "linear-gradient(135deg, #FF6A92, #E894FF)",
              boxShadow: "0 8px 28px rgba(255,106,146,0.35)",
            }}
          >
            Ver todos los servicios <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>

      {/* Marquee strip — ancho completo */}
      <div
        className="relative w-full overflow-hidden"
        style={{ background: GRADIENT }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(120,0,70,0.9), transparent)" }} />
        <div className="flex items-center py-3 px-6" style={{ minHeight: "52px" }}>
          <span
            className="text-xs font-bold tracking-widest uppercase flex-shrink-0 pr-5 text-white leading-tight"
            style={{ opacity: 0.9, borderRight: "1px solid rgba(255,255,255,0.3)", minWidth: "86px" }}
          >
            Hemos<br />ayudado a:
          </span>
          <div className="overflow-hidden flex-1 ml-5">
            <div className="flex whitespace-nowrap" style={{ animation: "marquee-nichos 7s linear infinite" }}>
              {items.map((n, i) => (
                <span key={i} className="inline-flex items-center gap-3 font-semibold flex-shrink-0 px-4 text-white"
                  style={{ opacity: 0.92, fontSize: "0.82rem" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-nichos {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
