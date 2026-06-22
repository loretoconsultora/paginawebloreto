"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

export default function Servicios() {
  const items = [...nichos, ...nichos, ...nichos];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* ── MOBILE layout ── */}
        <div className="flex flex-col items-center text-center py-14 lg:hidden">

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-playfair font-bold mb-5"
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
              lineHeight: 1.3,
              background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Si quieres que el 2026 sea el año en que tu marca hable por ti, atraiga a los clientes correctos y construya un negocio que crece con propósito
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="leading-relaxed mb-8 font-medium"
            style={{ color: "#3A3F4B", fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)" }}
          >
            estás en el único lugar para lograrlo con visión, estrategia y sistemas reales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-10"
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

          {/* Foto mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full flex flex-col items-center"
          >
            <div style={{ overflow: "hidden", height: "clamp(280px, 60vw, 420px)", width: "100%", display: "flex", justifyContent: "center" }}>
              <img
                src="/loreto-directora.jpg"
                alt="Loreto — Directora de Loreto Consultora"
                style={{
                  height: "clamp(360px, 80vw, 560px)",
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />
            </div>

            {/* Marquee mobile */}
            <div
              className="relative w-full overflow-hidden mt-0"
              style={{
                background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 55%, #E894FF 100%)",
                borderRadius: "999px",
              }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, rgba(120,0,70,0.9), transparent)" }} />
              <div className="flex items-center py-3 px-5" style={{ minHeight: "48px" }}>
                <span className="text-xs font-bold tracking-widest uppercase flex-shrink-0 pr-4 text-white leading-tight"
                  style={{ opacity: 0.9, borderRight: "1px solid rgba(255,255,255,0.3)", minWidth: "72px", fontSize: "0.6rem" }}>
                  Hemos<br />ayudado a:
                </span>
                <div className="overflow-hidden flex-1 ml-4">
                  <div className="flex whitespace-nowrap" style={{ animation: "marquee-nichos 7s linear infinite" }}>
                    {items.map((n, i) => (
                      <span key={i} className="inline-flex items-center gap-2 font-semibold flex-shrink-0 px-3 text-white"
                        style={{ opacity: 0.92, fontSize: "0.75rem" }}>
                        <span className="w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── DESKTOP layout ── */}
        <div className="hidden lg:grid grid-cols-2 items-center" style={{ minHeight: "88vh" }}>

          {/* Columna izquierda */}
          <div className="flex flex-col justify-center py-20 pr-16 order-2 lg:order-1">
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
              Si quieres que el 2026 sea el año en que tu marca hable por ti, atraiga a los clientes correctos y construya un negocio que crece con propósito
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

          {/* Columna derecha — foto + marquee */}
          <div className="relative order-1 lg:order-2 flex flex-col items-stretch" style={{ justifyContent: "flex-start", paddingTop: "0" }}>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(232,148,255,0.18) 0%, rgba(255,106,146,0.08) 50%, transparent 75%)", filter: "blur(40px)" }} />

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative z-10 w-full flex justify-end"
              style={{ overflow: "hidden", height: "68vh", flexShrink: 0 }}
            >
              <img
                src="/loreto-directora.jpg"
                alt="Loreto — Directora de Loreto Consultora"
                style={{
                  width: "auto", height: "88vh", maxWidth: "520px",
                  objectFit: "cover", objectPosition: "top center",
                  display: "block", flexShrink: 0,
                  filter: "drop-shadow(-8px 0 32px rgba(192,0,90,0.1))",
                }}
              />
            </motion.div>

            <div className="relative z-10 w-full overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 55%, #E894FF 100%)", borderRadius: "999px", flexShrink: 0 }}>
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, rgba(120,0,70,0.9), transparent)" }} />
              <div className="flex items-center py-3 px-6" style={{ minHeight: "52px" }}>
                <span className="text-xs font-bold tracking-widest uppercase flex-shrink-0 pr-5 text-white leading-tight"
                  style={{ opacity: 0.9, borderRight: "1px solid rgba(255,255,255,0.3)", minWidth: "86px" }}>
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
