"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const servicios = [
  "Consultoría",
  "Marketing Digital",
  "Talleres y Formaciones",
  "Programas Empresariales",
  "Programas Académicos",
  "Acción Social",
];

const serviceLinks: Record<string, string> = {
  "Consultoría": "/servicios/consultoria",
  "Marketing Digital": "/servicios/marketing-digital",
  "Talleres y Formaciones": "/servicios/talleres-y-formaciones",
  "Programas Empresariales": "/servicios/programas-empresariales",
  "Programas Académicos": "/servicios/programas-academicos",
  "Acción Social": "/accion-social",
};

export default function Servicios() {
  const items = [...servicios, ...servicios];

  return (
    <section className="relative overflow-hidden" style={{ background: "#1C1F26" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh] items-end">

          {/* ── Columna izquierda ── */}
          <div className="flex flex-col justify-center py-20 lg:py-0 lg:pr-16 order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#FF6A92" }}
            >
              Lo que hacemos
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair font-bold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
            >
              Estrategia que<br />
              <span style={{
                background: "linear-gradient(135deg, #FF6A92, #E894FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                transforma marcas
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 leading-relaxed mb-10 max-w-md"
              style={{ fontSize: "1rem" }}
            >
              Desde la estrategia hasta la ejecución — acompañamos marcas personales, negocios y empresas en cada etapa de su crecimiento.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
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

            {/* Directora */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-3 mt-10"
            >
              <div
                className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                style={{ border: "2px solid rgba(255,106,146,0.4)" }}
              >
                <img
                  src="/loreto-directora.jpg"
                  alt="Loreto"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Loreto</p>
                <p className="text-white/40 text-xs">Directora de Loreto Consultora</p>
              </div>
            </motion.div>
          </div>

          {/* ── Columna derecha — foto ── */}
          <div className="relative order-1 lg:order-2 flex items-end justify-center lg:justify-end" style={{ minHeight: "88vh" }}>
            {/* Glow de fondo */}
            <div
              className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(232,148,255,0.15) 0%, rgba(255,106,146,0.08) 50%, transparent 75%)",
                filter: "blur(40px)",
              }}
            />
            <motion.img
              src="/loreto-directora.jpg"
              alt="Loreto — Directora de Loreto Consultora"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative z-10 object-cover object-top"
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
                const placeholder = el.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = "flex";
              }}
            />
            {/* Placeholder mientras no hay foto */}
            <div
              className="relative z-10 hidden items-end justify-center"
              style={{ height: "82vh", width: "320px" }}
            >
              <div
                className="w-64 h-80 rounded-3xl flex items-center justify-center mb-8"
                style={{ background: "rgba(255,255,255,0.05)", border: "2px dashed rgba(255,255,255,0.15)" }}
              >
                <p className="text-white/30 text-xs text-center px-6">
                  Sube tu foto a<br /><span className="font-mono">/public/loreto-directora.jpg</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Marquee de servicios ── */}
      <div
        className="border-t overflow-hidden py-5 relative"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #1C1F26, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #1C1F26, transparent)" }} />

        <div
          className="flex gap-0 whitespace-nowrap"
          style={{
            animation: "marquee-servicios 22s linear infinite",
          }}
        >
          {items.map((s, i) => (
            <Link
              key={i}
              href={serviceLinks[s] ?? "/servicios"}
              className="inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-widest hover:opacity-70 transition-opacity flex-shrink-0 px-8"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#FF6A92" }}
              />
              {s}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-servicios {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
