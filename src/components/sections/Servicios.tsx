"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const nichos = [
  "Asesores inmobiliarios",
  "Agentes de seguro",
  "Doctores",
  "PyMEs",
  "Consultores",
  "Centros de bienestar",
  "Freelancers",
];

export default function Servicios() {
  const items = [...nichos, ...nichos, ...nichos];

  return (
    <section className="relative overflow-hidden" style={{ background: "#1C1F26" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end" style={{ minHeight: "88vh" }}>

          {/* ── Columna izquierda ── */}
          <div className="flex flex-col justify-center py-20 lg:py-0 lg:pr-16 order-2 lg:order-1">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-playfair font-bold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)" }}
            >
              Si quieres que 2026 sea el año en que{" "}
              <span style={{
                background: "linear-gradient(135deg, #FF6A92, #E894FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                tu marca habla por ti,
              </span>{" "}
              atrae a los clientes correctos y construye un negocio que crece con propósito
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="leading-relaxed mb-10 max-w-md"
              style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem" }}
            >
              estás en el único lugar para lograrlo con visión, estrategia y sistemas reales.
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

          {/* ── Columna derecha — foto ── */}
          <div className="relative order-1 lg:order-2 flex items-end justify-center lg:justify-end">
            {/* Glow */}
            <div
              className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(232,148,255,0.12) 0%, rgba(255,106,146,0.06) 50%, transparent 75%)",
                filter: "blur(40px)",
              }}
            />
            <motion.img
              src="/loreto-directora.jpg"
              alt="Loreto — Directora de Loreto Consultora"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative z-10"
              style={{
                height: "82vh",
                width: "auto",
                maxWidth: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                filter: "drop-shadow(-12px 0 40px rgba(0,0,0,0.5))",
              }}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                const ph = document.getElementById("foto-placeholder");
                if (ph) ph.style.display = "flex";
              }}
            />
            {/* Placeholder */}
            <div
              id="foto-placeholder"
              className="relative z-10 items-end justify-center"
              style={{ height: "82vh", width: "320px", display: "none" }}
            >
              <div
                className="w-64 h-80 rounded-3xl flex items-center justify-center mb-0"
                style={{ background: "rgba(255,255,255,0.04)", border: "2px dashed rgba(255,255,255,0.12)" }}
              >
                <p className="text-white/25 text-xs text-center px-6">
                  Sube tu foto a<br /><span className="font-mono">/public/loreto-directora.jpg</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Franja marquee — cubre el corte inferior de la foto ── */}
      <div
        className="overflow-hidden py-4 relative"
        style={{ background: "#111318", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #111318, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #111318, transparent)" }} />

        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee-nichos 28s linear infinite" }}
        >
          {/* Prefijo fijo visible al inicio */}
          <span
            className="flex-shrink-0 px-8 text-sm font-semibold tracking-wide"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Hemos ayudado a:
          </span>
          {items.map((n, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 text-sm font-semibold tracking-wide flex-shrink-0 px-6"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#FF6A92" }}
              />
              {n}
            </span>
          ))}
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
