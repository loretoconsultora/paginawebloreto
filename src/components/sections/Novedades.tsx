"use client";

import Link from "next/link";
import { Calendar, Mic, Zap } from "lucide-react";
import { motion } from "framer-motion";

/* ── Datos ── */
const novedades = [
  {
    tipo: "Evento",
    icono: Calendar,
    titulo: "The Art of Brand",
    subtitulo: "Querétaro & Ciudad de México",
    descripcion: "Branding que se siente, se piensa y se crea con las manos. Una experiencia íntima, estética y profundamente intencionada.",
    bullets: [
      "📍 Querétaro · 25 & 26 jun · 5:00 pm · Alva Coffee & Health Bar",
      "📍 CDMX · 27 & 28 jun · 5:00 pm · Tierra Garat Masaryk",
    ],
    cta: "Ver experiencias →",
    href: "/eventos/the-art-of-brand",
    external: false,
    rotate: -5,
    borderGradient: "linear-gradient(135deg, #1a0a2e, #c0005a, #E894FF)",
    badgeBg: "rgba(192,0,90,0.12)",
    badgeColor: "#c0005a",
    ctaGradient: "linear-gradient(135deg, #1a0a2e, #c0005a, #E894FF)",
  },
  {
    tipo: "Programa Estrella",
    icono: Zap,
    titulo: "Boost Your Brand",
    subtitulo: "Primera Generación · ¡Últimos lugares!",
    descripcion: "Nuestro programa estrella de marca personal. Crea un negocio rentable que te posicione con tu valor único y haga crecer tus ventas.",
    bullets: [
      "⚡ Mentorías en vivo durante un mes completo",
      "🚀 Inicio: miércoles 1 de julio · Solo 45 lugares",
    ],
    cta: "Quiero mi lugar →",
    href: "https://boost-your-brand.vercel.app",
    external: true,
    rotate: 2,
    borderGradient: "linear-gradient(135deg, #3a0ca3, #c0005a, #ff6a92)",
    badgeBg: "rgba(192,0,90,0.12)",
    badgeColor: "#c0005a",
    ctaGradient: "linear-gradient(135deg, #3a0ca3, #c0005a, #ff6a92)",
  },
  {
    tipo: "Podcast",
    icono: Mic,
    titulo: "\"Lo que nos decimos últimamente\"",
    subtitulo: "Nuevo episodio disponible",
    descripcion: "Un episodio para hablar sobre lo que callamos los empresarios.",
    bullets: [
      "🎙 Síndrome del impostor · Comparación",
      "🎙 Pedir ayuda · Claridad vs hiperactividad",
      "🎙 Gestión de riesgos y mucho más",
    ],
    cta: "Escuchar en Spotify →",
    href: "https://open.spotify.com/show/6JkKJgmFDJFbdQSA4nh53m?si=663fa615dd684826",
    external: true,
    rotate: -3,
    borderGradient: "linear-gradient(135deg, #1a0a2e, #6a00c8, #E894FF)",
    badgeBg: "rgba(192,0,90,0.12)",
    badgeColor: "#c0005a",
    ctaGradient: "linear-gradient(135deg, #1aa34a, #1DB954, #21d45e)",
  },
];

export default function Novedades() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#3A3F4B" }}>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="font-playfair text-4xl font-bold"
            style={{
              background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Novedades
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {novedades.map((n, i) => {
            const Icon = n.icono;
            return (
              <motion.div
                key={n.titulo}
                initial={{ opacity: 0, y: 80, rotate: n.rotate * 2.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: n.rotate }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ rotate: 0, y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                style={{ transformOrigin: "bottom center", filter: "drop-shadow(0 0px 0px transparent)" }}
              >
                {/* Wrapper para borde degradado */}
                <div
                  className="rounded-3xl p-[3px]"
                  className="transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.18),0_0_80px_rgba(232,148,255,0.12)]"
                  style={{
                    background: n.borderGradient,
                    boxShadow: "0 8px 32px rgba(255,255,255,0.08), 0 2px 12px rgba(255,255,255,0.05)",
                  }}
                >
                  <Link
                    href={n.href}
                    target={n.external ? "_blank" : undefined}
                    rel={n.external ? "noopener noreferrer" : undefined}
                    className="flex flex-col rounded-[22px] bg-white overflow-hidden"
                    style={{ minHeight: 380 }}
                  >
                    <div className="flex flex-col flex-1 p-7">
                      {/* Badge */}
                      <div
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-5 self-start border"
                        style={{
                          color: n.badgeColor,
                          borderColor: n.badgeColor,
                          background: n.badgeBg,
                        }}
                      >
                        <Icon size={13} strokeWidth={2.5} />
                        {n.tipo}
                      </div>

                      {/* Título */}
                      <h3 className="font-playfair text-xl font-bold text-grafito leading-snug mb-1">
                        {n.titulo}
                      </h3>
                      <p className="text-sm font-semibold text-grafito/50 mb-4 tracking-wide">
                        {n.subtitulo}
                      </p>

                      {/* Descripción */}
                      <p className="text-sm text-grafito/70 leading-relaxed mb-5">
                        {n.descripcion}
                      </p>

                      {/* Bullets */}
                      <ul className="space-y-2.5 mb-8 flex-1">
                        {n.bullets.map((b, bi) => (
                          <li key={bi} className="text-sm text-grafito/80 leading-snug">
                            {b}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div
                        className="inline-flex items-center gap-2 text-white text-sm font-bold px-5 py-3 rounded-full self-start"
                        style={{ background: n.ctaGradient }}
                      >
                        {n.cta}
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
