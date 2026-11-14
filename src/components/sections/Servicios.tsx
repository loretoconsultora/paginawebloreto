"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";

const NODES = [
  { label: "Marketing",              angle: -90  },
  { label: "Ventas",                 angle: -30  },
  { label: "Publicidad",             angle:  30  },
  { label: "Comunicación",           angle:  90  },
  { label: "Sistemas",               angle: 150  },
  { label: "Inteligencia Artificial",angle: 210  },
];

const R = 40; // radius as % of container

function nodePos(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    left: `${50 + R * Math.cos(rad)}%`,
    top:  `${50 + R * Math.sin(rad)}%`,
  };
}

function Diagram() {
  return (
    <div className="relative mx-auto" style={{ width: "min(440px, 88vw)", aspectRatio: "1 / 1" }}>

      {/* SVG: anillos, brillo y líneas */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="svgLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c0005a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#E894FF" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="svgCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#E894FF" stopOpacity="0.35" />
            <stop offset="55%"  stopColor="#c0005a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="svgCenterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#1a0a2e" />
            <stop offset="50%"  stopColor="#c0005a" />
            <stop offset="100%" stopColor="#E894FF" />
          </linearGradient>
        </defs>

        {/* Brillo de fondo */}
        <circle cx="50" cy="50" r="46" fill="url(#svgCenterGlow)" />

        {/* Anillo exterior giratorio */}
        <circle
          cx="50" cy="50" r="40"
          fill="none"
          stroke="url(#svgLineGrad)"
          strokeWidth="0.35"
          strokeDasharray="2.2 1.8"
          style={{ animation: "svc-spin 28s linear infinite", transformOrigin: "50% 50%" }}
        />

        {/* Anillo interior decorativo */}
        <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(232,148,255,0.18)" strokeWidth="0.3" />

        {/* Líneas desde el centro a cada nodo */}
        {NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          return (
            <line
              key={node.label}
              x1="50" y1="50"
              x2={50 + R * Math.cos(rad)}
              y2={50 + R * Math.sin(rad)}
              stroke="url(#svgLineGrad)"
              strokeWidth="0.45"
            />
          );
        })}

        {/* Orbe central — sin texto, solo forma */}
        <circle
          cx="50" cy="50" r="9"
          fill="url(#svgCenterGrad)"
          style={{ filter: "drop-shadow(0 0 3px rgba(192,0,90,0.6))" }}
        />
        {/* Pulso del orbe */}
        <circle
          cx="50" cy="50" r="9"
          fill="none"
          stroke="#E894FF"
          strokeWidth="0.4"
          style={{ animation: "svc-pulse 2.4s ease-in-out infinite", transformOrigin: "50% 50%" }}
        />
      </svg>

      {/* Nodos exteriores — pills HTML para tipografía limpia */}
      {NODES.map((node, i) => {
        const { left, top } = nodePos(node.angle);
        return (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.09 }}
            className="absolute text-white font-semibold text-center"
            style={{
              left,
              top,
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              background: "linear-gradient(135deg, rgba(26,10,46,0.96), rgba(192,0,90,0.88))",
              border: "1px solid rgba(232,148,255,0.5)",
              borderRadius: "999px",
              padding: "0.28em 0.75em",
              fontSize: "clamp(0.48rem, 1.3vw, 0.65rem)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 2px 14px rgba(192,0,90,0.25)",
              whiteSpace: "nowrap",
            }}
          >
            {node.label}
          </motion.div>
        );
      })}

      <style>{`
        @keyframes svc-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes svc-pulse {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50%       { opacity: 0.1;  transform: scale(1.55); }
        }
      `}</style>
    </div>
  );
}

export default function Servicios() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Columna izquierda — texto */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-playfair font-bold mb-5"
              style={{
                fontSize: "clamp(1.7rem, 2.8vw, 2.6rem)",
                lineHeight: 1.3,
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sé parte de la comunidad<br /> de empresas que confían en nosotros
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-semibold mb-10"
              style={{ color: "#3A3F4B", fontSize: "clamp(1rem, 1.5vw, 1.1rem)" }}
            >
              Escala tu negocio con nuestros servicios:
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
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

          {/* Columna derecha — diagrama */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Diagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
