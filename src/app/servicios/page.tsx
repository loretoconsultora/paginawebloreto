"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const BRAND_COMPASS = "https://brand-compass-pwa.vercel.app";

const servicios = [
  {
    id: "victoranza",
    badge: "Tecnología",
    titulo: "Victoranza App",
    descripcion: "Centralizamos la gestión de tus clientes, automatizamos tus procesos de venta y potenciamos tus canales de comunicación con la tecnología más avanzada.",
    items: [
      "Implementación y set up inicial",
      "Gestión, soporte y mantenimiento mensual",
      "Módulos de CRM, automatizaciones y agentes de IA",
      "Integración con WhatsApp y landing pages",
      "Modo Pro: desarrollamos tu propia plataforma",
    ],
    rotate: -4,
    borderGradient: "linear-gradient(135deg, #0d2b6b, #1a4aab, #4d7fff)",
    cardBg: "#0d2b6b",
    textColor: "white",
    badgeColor: "#7eb3ff",
    badgeBorder: "rgba(126,179,255,0.4)",
    badgeBg: "rgba(126,179,255,0.15)",
    bulletColor: "#7eb3ff",
    ctaHref: "#victoranza", // reemplazar con link real
    ctaExternal: false,
    foto: null,
    detailBg: "#0d2b6b",
    detailText: "white",
  },
  {
    id: "estrategia-digital",
    badge: "Conversión",
    titulo: "Estrategia Digital",
    descripcion: "Diseñamos y ejecutamos la infraestructura digital que convierte tu presencia online en resultados medibles de ventas y posicionamiento.",
    items: [
      "Campañas de Meta Ads",
      "Campañas de Google Ads",
      "Producción de anuncios",
      "Arquitectura de embudos de venta",
      "Gestión de pauta y optimización",
    ],
    rotate: 3,
    borderGradient: "linear-gradient(135deg, #b8860b, #f5c842, #ffe066)",
    cardBg: "#f5c200",
    textColor: "#1a0a2e",
    badgeColor: "#7a5800",
    badgeBorder: "rgba(122,88,0,0.35)",
    badgeBg: "rgba(122,88,0,0.12)",
    bulletColor: "#7a5800",
    ctaHref: "#estrategia-digital",
    ctaExternal: false,
    foto: null,
    detailBg: "#f5c200",
    detailText: "#1a0a2e",
  },
  {
    id: "redes-sociales",
    badge: "Posicionamiento",
    titulo: "Redes Sociales",
    descripcion: "Gestionamos tu presencia en redes de forma integral para que tu marca comunique con consistencia y se mantenga relevante mes a mes.",
    items: [
      "Social Media / Community Management",
      "Creación de contenido gráfico mensual",
      "Creación de contenido audiovisual mensual",
    ],
    rotate: -3,
    borderGradient: "linear-gradient(135deg, #d4005a, #FF6A92, #ffaec4)",
    cardBg: "#FF6A92",
    textColor: "white",
    badgeColor: "#fff",
    badgeBorder: "rgba(255,255,255,0.5)",
    badgeBg: "rgba(255,255,255,0.2)",
    bulletColor: "#fff",
    ctaHref: "#redes-sociales",
    ctaExternal: false,
    foto: null,
    detailBg: "#FF6A92",
    detailText: "white",
  },
  {
    id: "direccion-creativa",
    badge: "Proyectos One Shot",
    titulo: "Dirección Creativa",
    descripcion: "Proyectos creativos con potencial infinito. Traducimos tu identidad de marca en piezas que comunican, conectan y convierten.",
    items: [
      "Branding e identidad visual",
      "Plantillas de contenido gráfico para RRSS",
      "Diseño Editorial y Publicitario ATL/BTL",
      "Fotografía profesional y producción con dron",
      "Locución · Canal YouTube · Podcast",
    ],
    rotate: 2,
    borderGradient: "linear-gradient(135deg, #7a0035, #c0005a, #e8006e)",
    cardBg: "#c0005a",
    textColor: "white",
    badgeColor: "#fff",
    badgeBorder: "rgba(255,255,255,0.5)",
    badgeBg: "rgba(255,255,255,0.2)",
    bulletColor: "#fff",
    ctaHref: "#direccion-creativa",
    ctaExternal: false,
    foto: null,
    detailBg: "#c0005a",
    detailText: "white",
  },
];

function ServiceCard({ s, index }: { s: typeof servicios[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: s.rotate * 2.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: s.rotate }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, y: -10, scale: 1.02, transition: { duration: 0.3 } }}
      style={{ transformOrigin: "bottom center" }}
    >
      <div
        className="rounded-3xl p-[3px] h-full transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.18)]"
        style={{ background: s.borderGradient }}
      >
        <div
          className="flex flex-col rounded-[22px] overflow-hidden h-full"
          style={{ background: s.cardBg }}
        >
          {/* Foto placeholder */}
          <div
            className="w-full flex items-center justify-center flex-shrink-0"
            style={{
              height: 180,
              background: `rgba(255,255,255,0.08)`,
            }}
          >
            {s.foto ? (
              <img src={s.foto} alt={s.titulo} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
                foto próximamente
              </span>
            )}
          </div>

          {/* Contenido */}
          <div className="flex flex-col flex-1 p-7">
            <div
              className="inline-flex items-center text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4 self-start border"
              style={{ color: s.badgeColor, borderColor: s.badgeBorder, background: s.badgeBg }}
            >
              {s.badge}
            </div>

            <h3 className="font-playfair text-xl font-bold leading-snug mb-3" style={{ color: s.textColor }}>
              {s.titulo}
            </h3>
            <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: s.textColor, opacity: 0.8 }}>
              {s.descripcion}
            </p>

            <ul className="space-y-2 mb-8">
              {s.items.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: s.textColor, opacity: 0.85 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.bulletColor }} />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={`#${s.id}`}
              className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full self-start hover:opacity-80 transition-opacity"
              style={{ background: "rgba(255,255,255,0.18)", color: s.textColor, border: `1px solid rgba(255,255,255,0.3)` }}
            >
              Ver más <ChevronDown size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceDetail({ s, index }: { s: typeof servicios[0]; index: number }) {
  return (
    <section
      id={s.id}
      className="py-20 scroll-mt-24"
      style={{ background: s.detailBg }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className={`flex flex-col lg:flex-row items-center gap-14 ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}>

          {/* Foto */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="rounded-3xl p-[3px]" style={{ background: s.borderGradient }}>
              <div
                className="rounded-[22px] overflow-hidden flex items-center justify-center"
                style={{ height: 340, background: "rgba(255,255,255,0.08)" }}
              >
                {s.foto ? (
                  <img src={s.foto} alt={s.titulo} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
                    foto próximamente
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="w-full lg:w-1/2">
            <div
              className="inline-flex items-center text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-5 border"
              style={{ color: s.badgeColor, borderColor: s.badgeBorder, background: s.badgeBg }}
            >
              {s.badge}
            </div>

            <h2
              className="font-playfair text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: s.textColor }}
            >
              {s.titulo}
            </h2>

            <p className="leading-relaxed mb-6" style={{ color: s.textColor, opacity: 0.8 }}>
              {s.descripcion}
            </p>

            <ul className="space-y-3 mb-8">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: s.textColor, opacity: 0.9 }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.bulletColor }} />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: "rgba(255,255,255,0.18)", color: s.textColor, border: "1px solid rgba(255,255,255,0.35)", backdropFilter: "blur(8px)" }}
            >
              Solicitar cotización <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="pt-32 pb-20 text-center bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#c0005a" }}
            >
              Lo que hacemos
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-5xl sm:text-6xl font-bold mb-6"
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.1,
              }}
            >
              Nuestros Servicios
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-grafito/65 text-lg leading-relaxed"
            >
              Familias de soluciones diseñadas para llevar tu marca al siguiente nivel con visión, estrategia y sistemas reales.
            </motion.p>
          </div>
        </section>

        {/* Cards en grid con tilt */}
        <section className="pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
              {servicios.map((s, i) => (
                <ServiceCard key={s.id} s={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Detalle de cada familia */}
        {servicios.map((s, i) => (
          <ServiceDetail key={s.id} s={s} index={i} />
        ))}

        {/* CTA final */}
        <section className="py-20 text-center" style={{ background: "#3A3F4B" }}>
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-playfair text-4xl font-bold text-white mb-4">
              ¿No sabes por dónde empezar?
            </h2>
            <p className="text-white/65 leading-relaxed mb-8">
              Realiza tu diagnóstico en cinco minutos y te ayudamos a identificar qué solución se adapta mejor a tu momento de negocio.
            </p>
            <Link
              href={BRAND_COMPASS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
              style={{ background: GRADIENT, boxShadow: "0 8px 28px rgba(192,0,90,0.35)" }}
            >
              Iniciar diagnóstico <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
