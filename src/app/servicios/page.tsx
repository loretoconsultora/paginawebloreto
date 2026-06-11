"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react"; // ArrowRight used in CTA final
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const BRAND_COMPASS = "https://brand-compass-pwa.vercel.app";
const CALENDARIO = "https://links.victoranza.com/widget/booking/gn3nH4IgtAreQ9jPQ7C2";

const servicios = [
  {
    id: "victoranza",
    badge: "Tecnología",
    titulo: "Victoranza App",
    resumen: "Nuestra plataforma propia de automatización e inteligencia de negocios que centraliza tus clientes y escala tus ventas.",
    descripcion: "Victoranza es nuestra plataforma propia de automatización e inteligencia de negocios. Centraliza la gestión de tus clientes, automatiza tus procesos de venta y potencia tus canales de comunicación con la tecnología más avanzada. Incluye módulos de CRM, automatizaciones, agentes de IA, integración con WhatsApp y landing pages optimizadas para conversión.",
    items: [
      "Implementación y set up inicial",
      "Gestión, soporte y mantenimiento mensual",
      "Módulos de CRM, automatizaciones y agentes de IA",
      "Integración con WhatsApp y landing pages",
      "Modo Pro: desarrollamos tu propia plataforma",
    ],
    rotate: -4,
    borderGradient: "linear-gradient(135deg, #3ab8ba, #67c6c8, #9de8ea)",
    cardBorderColor: "#67c6c8",
    detailBg: "#67c6c8",
    detailText: "white",
    badgeColor: "#0d6b6d",
    badgeBorder: "rgba(13,107,109,0.35)",
    badgeBg: "rgba(13,107,109,0.08)",
    bulletGradient: "linear-gradient(135deg, #3ab8ba, #67c6c8)",
    btnGradient: "linear-gradient(135deg, #3ab8ba, #67c6c8, #9de8ea)",
    ctaHref: "#victoranza",
    foto: "/servicios/victoranza.jpg",
  },
  {
    id: "estrategia-digital",
    badge: "Conversión",
    titulo: "Estrategia Digital",
    resumen: "Infraestructura digital que convierte tu presencia online en resultados medibles de ventas y posicionamiento.",
    descripcion: "Diseñamos y ejecutamos la infraestructura digital que convierte tu presencia online en resultados medibles de ventas y posicionamiento. Desde la arquitectura de embudos de venta hasta la gestión de pauta, nos encargamos de que cada pieza trabaje con un objetivo claro: atraer, convertir y escalar.",
    items: [
      "Campañas de Meta Ads",
      "Campañas de Google Ads",
      "Producción de anuncios",
      "Arquitectura de embudos de venta",
      "Gestión de pauta y optimización",
    ],
    rotate: 3,
    borderGradient: "linear-gradient(135deg, #b8860b, #f5c842, #ffe066)",
    cardBorderColor: "#f5c200",
    detailBg: "#f5c200",
    detailText: "white",
    badgeColor: "#7a5800",
    badgeBorder: "rgba(122,88,0,0.35)",
    badgeBg: "rgba(122,88,0,0.08)",
    bulletGradient: "linear-gradient(135deg, #b8860b, #f5c842)",
    btnGradient: "linear-gradient(135deg, #b8860b, #f5c842, #ffe066)",
    ctaHref: "#estrategia-digital",
    foto: "/servicios/estrategia-digital.jpg",
  },
  {
    id: "redes-sociales",
    badge: "Posicionamiento",
    titulo: "Redes Sociales",
    resumen: "Gestión integral de tu presencia digital para que tu marca sea consistente, relevante y genere conexión real.",
    descripcion: "Gestionamos tu presencia en redes sociales de forma integral. Nos encargamos del día a día de tus canales para que tu marca comunique con consistencia, genere conexión real con su audiencia y se mantenga relevante mes a mes.",
    items: [
      "Social Media / Community Management",
      "Creación de contenido gráfico mensual",
      "Creación de contenido audiovisual mensual",
    ],
    rotate: -3,
    borderGradient: "linear-gradient(135deg, #d4005a, #FF6A92, #ffaec4)",
    cardBorderColor: "#FF6A92",
    detailBg: "#FF6A92",
    detailText: "white",
    badgeColor: "#c0005a",
    badgeBorder: "rgba(192,0,90,0.3)",
    badgeBg: "rgba(192,0,90,0.08)",
    bulletGradient: "linear-gradient(135deg, #d4005a, #FF6A92)",
    btnGradient: "linear-gradient(135deg, #d4005a, #FF6A92, #ffaec4)",
    ctaHref: "#redes-sociales",
    foto: "/servicios/redes-sociales.jpg",
  },
  {
    id: "direccion-creativa",
    badge: "Proyectos One Shot",
    titulo: "Dirección Creativa",
    resumen: "Proyectos creativos con potencial infinito que traducen tu identidad en piezas que comunican y convierten.",
    descripcion: "Proyectos creativos con potencial infinito. Traducimos tu identidad de marca en piezas que comunican, conectan y convierten. Desde branding hasta producción audiovisual, cubrimos todo el espectro creativo de tu marca.",
    items: [
      "Branding e identidad visual",
      "Plantillas de contenido gráfico para RRSS",
      "Diseño Editorial y Publicitario ATL/BTL",
      "Fotografía profesional y producción con dron",
      "Locución · Canal YouTube · Podcast",
    ],
    rotate: 2,
    borderGradient: "linear-gradient(135deg, #7a0035, #c0005a, #e8006e)",
    cardBorderColor: "#c0005a",
    detailBg: "#c0005a",
    detailText: "white",
    badgeColor: "#c0005a",
    badgeBorder: "rgba(192,0,90,0.3)",
    badgeBg: "rgba(192,0,90,0.08)",
    bulletGradient: "linear-gradient(135deg, #7a0035, #c0005a)",
    btnGradient: "linear-gradient(135deg, #7a0035, #c0005a, #e8006e)",
    ctaHref: "#direccion-creativa",
    foto: "/servicios/direccion-creativa.jpg",
    fotoPosition: "left center",
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
        className="rounded-3xl p-[3px] h-full transition-shadow duration-300"
        style={{ background: s.borderGradient }}
      >
        <div className="flex flex-col rounded-[22px] bg-white overflow-hidden h-full">

          {/* Foto placeholder */}
          <div className="w-full flex-shrink-0 overflow-hidden" style={{ height: 160, background: `rgba(0,0,0,0.05)` }}>
            {s.foto && (
              <img src={s.foto} alt={s.titulo} className="w-full h-full object-cover" style={{ objectPosition: (s as any).fotoPosition ?? "center center" }} />
            )}
          </div>

          {/* Contenido */}
          <div className="flex flex-col flex-1 p-6">
            <div
              className="inline-flex items-center text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-3 self-start border"
              style={{ color: s.badgeColor, borderColor: s.badgeBorder, background: s.badgeBg }}
            >
              {s.badge}
            </div>

            <h3 className="font-playfair text-lg font-bold text-grafito leading-snug mb-3">
              {s.titulo}
            </h3>

            <p className="text-sm text-grafito/60 leading-relaxed flex-1 mb-6">
              {s.resumen}
            </p>

            <a
              href={`#${s.id}`}
              className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full self-start hover:opacity-80 transition-opacity text-white"
              style={{ background: s.borderGradient }}
            >
              Ver más <ChevronDown size={13} />
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

          {/* Video placeholder */}
          <div className="w-full lg:w-1/2 flex-shrink-0 min-w-0">
            <div className="rounded-3xl p-[3px]" style={{ background: s.borderGradient }}>
              <div
                className="rounded-[22px] overflow-hidden flex flex-col items-center justify-center gap-3 w-full"
                style={{ aspectRatio: "16/9", background: "rgba(0,0,0,0.12)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
                <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                  video próximamente
                </span>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="w-full lg:w-1/2 min-w-0">
            <div
              className="inline-flex items-center text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-5 border"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.18)" }}
            >
              {s.badge}
            </div>

            <h2
              className="font-playfair text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "white" }}
            >
              {s.titulo}
            </h2>

            <p className="leading-relaxed mb-6" style={{ color: "white", opacity: 0.82 }}>
              {s.descripcion}
            </p>

            <ul className="space-y-3 mb-8">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "white", opacity: 0.9 }}>
                  <span style={{ color: "white", flexShrink: 0, fontSize: "1rem", lineHeight: 1.4 }}>★</span>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ background: s.btnGradient, padding: "2px", borderRadius: "999px", display: "inline-flex" }}>
              <Link
                href={CALENDARIO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity"
                style={{ background: "#ffffff", borderRadius: "999px", color: "#1a0a2e" }}
              >
                Recibir propuesta personalizada →
              </Link>
            </div>
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
              Soluciones diseñadas para llevar tu marca al siguiente nivel con visión, estrategia y sistemas reales.
            </motion.p>
          </div>
        </section>

        {/* Cards con tilt */}
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
