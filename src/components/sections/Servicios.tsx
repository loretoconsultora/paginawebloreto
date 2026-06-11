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
  "Coaches",
  "Terapeutas",
];

export default function Servicios() {
  const items = [...nichos, ...nichos, ...nichos];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ minHeight: "88vh" }}>

          {/* ── Columna izquierda — centrada verticalmente ── */}
          <div className="flex flex-col justify-center py-20 lg:py-0 lg:pr-16 order-2 lg:order-1">

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-playfair font-bold mb-7"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.6rem)",
                lineHeight: 1.25,
                background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Si quieres que el 2026 sea el año en que tu marca habla por ti, atrae a los clientes correctos y construye un negocio que crece con propósito
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="leading-relaxed mb-10 max-w-md font-medium"
              style={{ color: "#3A3F4B", fontSize: "clamp(1.05rem, 1.5vw, 1.15rem)" }}
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

          {/* ── Columna derecha — foto + marquee ── */}
          <div className="relative order-1 lg:order-2 flex flex-col items-end justify-end" style={{ minHeight: "88vh" }}>

            {/* Glow */}
            <div
              className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(232,148,255,0.18) 0%, rgba(255,106,146,0.08) 50%, transparent 75%)",
                filter: "blur(40px)",
              }}
            />

            {/* Foto recortada — el contenedor corta el espacio vacío inferior */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative z-10 w-full flex justify-end"
              style={{
                overflow: "hidden",
                /* Ajusta este valor para subir/bajar el corte (% de la imagen que se muestra) */
                maxHeight: "76vh",
              }}
            >
              <img
                src="/loreto-directora.jpg"
                alt="Loreto — Directora de Loreto Consultora"
                style={{
                  width: "auto",
                  height: "84vh",
                  maxWidth: "520px",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                  filter: "drop-shadow(-8px 0 32px rgba(192,0,90,0.1))",
                }}
              />
            </motion.div>

            {/* Marquee — pegado al corte de la foto */}
            <div
              className="relative z-10 w-full overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 55%, #E894FF 100%)",
                borderRadius: "0",
                flexShrink: 0,
              }}
            >
              {/* Fade derecha */}
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, rgba(120,0,70,0.9), transparent)" }} />

              <div className="flex items-center py-4 px-5" style={{ minHeight: "64px" }}>
                {/* Texto fijo */}
                <span
                  className="text-xs font-bold tracking-widest uppercase flex-shrink-0 pr-5 text-white leading-tight"
                  style={{ opacity: 0.9, borderRight: "1px solid rgba(255,255,255,0.3)", minWidth: "90px" }}
                >
                  Hemos<br />ayudado a:
                </span>

                {/* Nichos deslizantes — más rápido */}
                <div className="overflow-hidden flex-1 ml-5">
                  <div
                    className="flex whitespace-nowrap"
                    style={{ animation: "marquee-nichos 16s linear infinite" }}
                  >
                    {items.map((n, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-3 text-sm font-semibold flex-shrink-0 px-5 text-white"
                        style={{ opacity: 0.92 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
