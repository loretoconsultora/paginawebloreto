"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

const articulos = [
  {
    categoria: "Marca Personal",
    titulo: "Cómo construir una propuesta de valor que realmente vende",
    extracto: "La diferencia entre una marca que atrae y una que convierte está en cómo comunica su valor único.",
    tiempo: "5 min",
    foto: "/blog/articulo-1.jpg",
    rotate: -4,
    borderGradient: "linear-gradient(135deg, #1a0a2e, #c0005a, #E894FF)",
    badgeColor: "#c0005a",
    badgeBg: "rgba(192,0,90,0.10)",
    href: "/blog/propuesta-de-valor",
  },
  {
    categoria: "Estrategia",
    titulo: "Los 5 errores más comunes al posicionarte en redes sociales",
    extracto: "El posicionamiento no es sobre cuánto publicas, sino sobre qué comunicas y a quién.",
    tiempo: "7 min",
    foto: "/blog/articulo-2.jpg",
    rotate: 2,
    borderGradient: "linear-gradient(135deg, #3a0ca3, #c0005a, #ff6a92)",
    badgeColor: "#c0005a",
    badgeBg: "rgba(192,0,90,0.10)",
    href: "/blog/errores-posicionamiento",
  },
  {
    categoria: "Crecimiento",
    titulo: "De emprendedor a empresario: la mentalidad que lo cambia todo",
    extracto: "El salto más difícil en los negocios no es técnico. Es mental. Aquí te mostramos cómo darlo.",
    tiempo: "6 min",
    foto: "/blog/articulo-3.jpg",
    rotate: -3,
    borderGradient: "linear-gradient(135deg, #1a0a2e, #6a00c8, #E894FF)",
    badgeColor: "#c0005a",
    badgeBg: "rgba(192,0,90,0.10)",
    href: "/blog/emprendedor-a-empresario",
  },
];

export default function Blog() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#3A3F4B" }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header centrado */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#FF6A92" }}>
            Conocimiento que transforma
          </p>
          <h2
            className="font-playfair font-bold text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
          >
            Blog
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {articulos.map((a, i) => (
            <motion.div
              key={a.titulo}
              initial={{ opacity: 0, y: 80, rotate: a.rotate * 2.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: a.rotate }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              style={{ transformOrigin: "bottom center" }}
            >
              <div
                className="rounded-3xl p-[3px] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.18),0_0_80px_rgba(232,148,255,0.12)]"
                style={{
                  background: a.borderGradient,
                  boxShadow: "0 8px 32px rgba(255,255,255,0.08), 0 2px 12px rgba(255,255,255,0.05)",
                }}
              >
                <Link
                  href={a.href}
                  className="flex flex-col rounded-[22px] bg-white overflow-hidden"
                >
                  {/* Foto del artículo */}
                  <div
                    className="w-full overflow-hidden"
                    style={{ height: 180 }}
                  >
                    <img
                      src={a.foto}
                      alt={a.titulo}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = "none";
                        const ph = el.nextElementSibling as HTMLElement;
                        if (ph) ph.style.display = "flex";
                      }}
                    />
                    {/* Placeholder foto */}
                    <div
                      className="w-full h-full items-center justify-center"
                      style={{
                        display: "none",
                        height: 180,
                        background: `linear-gradient(135deg, rgba(192,0,90,0.08), rgba(232,148,255,0.12))`,
                      }}
                    >
                      <span className="text-xs text-grafito/30 font-mono">foto del artículo</span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-col flex-1 p-7">
                    {/* Badge categoría */}
                    <div
                      className="inline-flex items-center text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4 self-start border"
                      style={{
                        color: a.badgeColor,
                        borderColor: a.badgeColor,
                        background: a.badgeBg,
                      }}
                    >
                      {a.categoria}
                    </div>

                    <h3 className="font-playfair text-lg font-bold text-grafito leading-snug mb-3">
                      {a.titulo}
                    </h3>
                    <p className="text-sm text-grafito/65 leading-relaxed mb-6 flex-1">
                      {a.extracto}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-grafito/40">
                        <Clock size={12} />
                        {a.tiempo} de lectura
                      </div>
                      <ArrowRight size={14} style={{ color: a.badgeColor }} />
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ver todos */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #FF6A92, #E894FF)", boxShadow: "0 8px 28px rgba(255,106,146,0.35)" }}
          >
            Ver todos los artículos <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
