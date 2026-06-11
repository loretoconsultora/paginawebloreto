"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";

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
    borderGradient: "linear-gradient(135deg, #1a0a2e, #c0005a, #E894FF)",
    badgeColor: "#c0005a",
    badgeBg: "rgba(192,0,90,0.10)",
    foto: null,
  },
  {
    id: "estrategia-digital",
    badge: "Estrategia Digital",
    titulo: "Estrategia Digital",
    descripcion: "Diseñamos y ejecutamos la infraestructura digital que convierte tu presencia online en resultados medibles de ventas y posicionamiento.",
    items: [
      "Campañas de Meta Ads",
      "Campañas de Google Ads",
      "Producción de anuncios",
      "Arquitectura de embudos de venta",
      "Gestión de pauta y optimización",
    ],
    borderGradient: "linear-gradient(135deg, #3a0ca3, #c0005a, #ff6a92)",
    badgeColor: "#c0005a",
    badgeBg: "rgba(192,0,90,0.10)",
    foto: null,
  },
  {
    id: "redes-sociales",
    badge: "Redes Sociales",
    titulo: "Redes Sociales",
    descripcion: "Gestionamos tu presencia en redes de forma integral para que tu marca comunique con consistencia y se mantenga relevante mes a mes.",
    items: [
      "Social Media / Community Management",
      "Creación de contenido gráfico mensual",
      "Creación de contenido audiovisual mensual",
    ],
    borderGradient: "linear-gradient(135deg, #1a0a2e, #6a00c8, #E894FF)",
    badgeColor: "#c0005a",
    badgeBg: "rgba(192,0,90,0.10)",
    foto: null,
  },
  {
    id: "direccion-creativa",
    badge: "Dirección Creativa",
    titulo: "Dirección Creativa",
    descripcion: "Proyectos creativos con potencial infinito. Traducimos tu identidad de marca en piezas que comunican, conectan y convierten.",
    items: [
      "Branding e identidad visual",
      "Plantillas de contenido gráfico para RRSS",
      "Diseño Editorial y Publicitario ATL/BTL",
      "Fotografía profesional y producción con dron",
      "Locución · Canal YouTube · Podcast",
    ],
    borderGradient: "linear-gradient(135deg, #c0005a, #E894FF, #ff6a92)",
    badgeColor: "#c0005a",
    badgeBg: "rgba(192,0,90,0.10)",
    foto: null,
  },
];

function ServiceCard({ s, index }: { s: typeof servicios[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-3xl p-[3px] h-full"
        style={{
          background: s.borderGradient,
          boxShadow: "0 8px 32px rgba(255,255,255,0.08), 0 2px 12px rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex flex-col rounded-[22px] bg-white overflow-hidden h-full">

          {/* Foto placeholder */}
          <div
            className="w-full flex items-center justify-center flex-shrink-0"
            style={{
              height: 200,
              background: `linear-gradient(135deg, rgba(192,0,90,0.06), rgba(232,148,255,0.10))`,
            }}
          >
            {s.foto ? (
              <img src={s.foto} alt={s.titulo} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-mono" style={{ color: "rgba(58,63,75,0.25)" }}>
                foto próximamente
              </span>
            )}
          </div>

          {/* Contenido */}
          <div className="flex flex-col flex-1 p-7">
            {/* Badge */}
            <div
              className="inline-flex items-center text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4 self-start border"
              style={{ color: s.badgeColor, borderColor: s.badgeColor, background: s.badgeBg }}
            >
              {s.badge}
            </div>

            <h3 className="font-playfair text-xl font-bold text-grafito leading-snug mb-3">
              {s.titulo}
            </h3>
            <p className="text-sm text-grafito/65 leading-relaxed mb-5">
              {s.descripcion}
            </p>

            {/* Bullets */}
            <ul className="space-y-2 mb-8 flex-1">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-grafito/70">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.badgeColor }} />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={`#${s.id}`}
              className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full self-start text-white hover:opacity-90 transition-opacity"
              style={{ background: s.borderGradient }}
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
  const isEven = index % 2 === 0;
  return (
    <section
      id={s.id}
      className="py-20 scroll-mt-24"
      style={{ background: isEven ? "#ffffff" : "#3A3F4B" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className={`flex flex-col lg:flex-row items-center gap-14 ${isEven ? "" : "lg:flex-row-reverse"}`}>

          {/* Foto */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div
              className="rounded-3xl p-[3px]"
              style={{ background: s.borderGradient }}
            >
              <div
                className="rounded-[22px] overflow-hidden flex items-center justify-center"
                style={{
                  height: 340,
                  background: `linear-gradient(135deg, rgba(192,0,90,0.06), rgba(232,148,255,0.10))`,
                }}
              >
                {s.foto ? (
                  <img src={s.foto} alt={s.titulo} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-mono" style={{ color: isEven ? "rgba(58,63,75,0.25)" : "rgba(255,255,255,0.25)" }}>
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
              style={{ color: s.badgeColor, borderColor: s.badgeColor, background: s.badgeBg }}
            >
              {s.badge}
            </div>

            <h2
              className="font-playfair text-3xl sm:text-4xl font-bold mb-4"
              style={{
                background: s.borderGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {s.titulo}
            </h2>

            <p className={`leading-relaxed mb-6 ${isEven ? "text-grafito/70" : "text-white/75"}`}>
              {s.descripcion}
            </p>

            <ul className="space-y-3 mb-8">
              {s.items.map((item) => (
                <li key={item} className={`flex items-start gap-3 text-sm ${isEven ? "text-grafito/80" : "text-white/85"}`}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.badgeColor }} />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: GRADIENT, boxShadow: "0 8px 28px rgba(255,106,146,0.3)" }}
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

        {/* Cards grid */}
        <section className="pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
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
              Agenda una llamada y te ayudamos a identificar qué solución se adapta mejor a tu momento de negocio.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
              style={{ background: GRADIENT, boxShadow: "0 8px 28px rgba(192,0,90,0.35)" }}
            >
              Hablemos <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
