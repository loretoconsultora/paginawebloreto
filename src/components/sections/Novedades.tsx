"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Mic, Zap } from "lucide-react";
import { motion } from "framer-motion";

const novedades = [
  {
    tipo: "Evento",
    icono: Calendar,
    gradient: "linear-gradient(145deg, #1a0a2e 0%, #c0005a 55%, #E894FF 100%)",
    rotate: -5,
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
  },
  {
    tipo: "Programa Estrella",
    icono: Zap,
    gradient: "linear-gradient(145deg, #3a0ca3 0%, #c0005a 50%, #ff6a92 100%)",
    rotate: 2,
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
  },
  {
    tipo: "Podcast",
    icono: Mic,
    gradient: "linear-gradient(145deg, #1a0a2e 0%, #6a00c8 50%, #E894FF 100%)",
    rotate: -3,
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
  },
];

export default function Novedades() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-coral mb-2">
              Lo que está pasando
            </p>
            <h2 className="font-playfair text-4xl font-bold text-grafito">
              Novedades
            </h2>
          </div>
          <Link
            href="/eventos"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-indigo-DEFAULT hover:text-coral transition-colors"
          >
            Ver todo <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Cards con inclinación y animación de entrada */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {novedades.map((n, i) => {
            const Icon = n.icono;
            return (
              <motion.div
                key={n.titulo}
                initial={{ opacity: 0, y: 80, rotate: n.rotate * 2.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: n.rotate }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.13,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  rotate: 0,
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                style={{ transformOrigin: "bottom center" }}
              >
                <Link
                  href={n.href}
                  target={n.external ? "_blank" : undefined}
                  rel={n.external ? "noopener noreferrer" : undefined}
                  className="flex flex-col rounded-3xl overflow-hidden shadow-xl"
                  style={{ background: n.gradient, minHeight: 380 }}
                >
                  <div className="flex flex-col flex-1 p-7">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6 self-start backdrop-blur-sm border border-white/20">
                      <Icon size={14} strokeWidth={2.5} />
                      {n.tipo}
                    </div>

                    {/* Título */}
                    <h3 className="font-playfair text-xl font-bold text-white leading-snug mb-1">
                      {n.titulo}
                    </h3>
                    <p className="text-sm font-semibold text-white/65 mb-4 tracking-wide">
                      {n.subtitulo}
                    </p>

                    {/* Descripción */}
                    <p className="text-sm text-white/80 leading-relaxed mb-5">
                      {n.descripcion}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2.5 mb-8 flex-1">
                      {n.bullets.map((b, bi) => (
                        <li key={bi} className="text-sm text-white/90 leading-snug">
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition-colors text-white text-sm font-bold px-5 py-3 rounded-full self-start border border-white/25 backdrop-blur-sm">
                      {n.cta}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
