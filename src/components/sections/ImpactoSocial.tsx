"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const GRADIENT_MAIN = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const GRADIENT_A = "linear-gradient(135deg, #3a0ca3, #c0005a, #ff6a92)";
const GRADIENT_B = "linear-gradient(135deg, #1a0a2e, #6a00c8, #E894FF)";
const GRADIENT_C = "linear-gradient(135deg, #c0005a, #E894FF, #ff6a92)";
const GRADIENT_D = "linear-gradient(135deg, #1a0a2e, #3a0ca3, #c0005a)";
const GRADIENT_E = "linear-gradient(135deg, #6a00c8, #c0005a, #E894FF)";

const INICIATIVAS = [
  {
    gradient: GRADIENT_C,
    label: "Sep 2025 · Presente · México",
    title: "JoM",
    subtitle: "Jóvenes Mexicanos Desarrollando Talentos A.C.",
    body: "Talleres de IA donde los jóvenes desarrollan su propio stack tecnológico y portafolio de herramientas digitales que responden a las necesidades de su comunidad.",
  },
  {
    gradient: GRADIENT_B,
    label: "Oct 2025 · Valle del Cauca, Colombia",
    title: "Valle del Cauca",
    subtitle: null,
    body: "Conferencias y clases de inteligencia artificial, ventas y marca personal a jóvenes adolescentes de la región cafetera.",
  },
  {
    gradient: GRADIENT_D,
    label: "May 2026 · Presente · Venezuela",
    title: "Venezuela Tierra de Gracia",
    subtitle: null,
    body: "Consultoría en Lean Manufacturing y Desarrollo de Herramientas Tecnológicas para el equipo de Currículo Educativo.",
  },
  {
    gradient: GRADIENT_A,
    label: "Jun 2026 · Presente · México",
    title: "CONEDUQ",
    subtitle: "Consejo de Educación y Capacitación Q.A.C.",
    body: "Consultoría de Marca y Comunicación institucional + Diseño de Programas Académicos alrededor de la Inteligencia Artificial.",
  },
  {
    gradient: GRADIENT_E,
    label: "Jul 2026 · Presente · México",
    title: "El Puente de Esperanza IAP",
    subtitle: null,
    body: "Consultoría, Planeación y Liderazgo del Servicio Social de los equipos de Comunicación Institucional y Patrocinios.",
  },
];

const fotos = [
  { src: "/accion-social/foto-1.jpg", rotate: -5 },
  { src: "/accion-social/foto-2.jpg", rotate: 2 },
  { src: "/accion-social/foto-3.jpg", rotate: -3 },
];

function Card({ item }: { item: typeof INICIATIVAS[0] }) {
  return (
    <div className="rounded-2xl p-[2px] w-full" style={{ background: item.gradient }}>
      <div className="rounded-[14px] bg-white p-5">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
          style={{
            background: item.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {item.label}
        </p>
        <p
          className="font-bold text-sm mb-1"
          style={{
            background: item.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {item.title}
        </p>
        {item.subtitle && (
          <p className="text-[11px] text-grafito/50 mb-1.5 leading-tight">{item.subtitle}</p>
        )}
        <p className="text-grafito/65 text-xs leading-relaxed">{item.body}</p>
      </div>
    </div>
  );
}

function Dot({ gradient }: { gradient: string }) {
  return (
    <div
      className="w-4 h-4 rounded-full flex-shrink-0 border-2 border-white"
      style={{
        background: gradient,
        boxShadow: "0 0 0 3px rgba(192,0,90,0.18), 0 0 0 6px rgba(192,0,90,0.07)",
      }}
    />
  );
}

export default function ImpactoSocial() {
  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Badge */}
        <div className="flex justify-center mb-4">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
            style={{ background: "rgba(192,0,90,0.08)", color: "#c0005a", border: "1px solid rgba(192,0,90,0.2)" }}
          >
            <Heart size={12} fill="currentColor" />
            Acción Social
          </div>
        </div>

        {/* Título */}
        <h2
          className="font-playfair font-bold text-center mb-12"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
            lineHeight: 1.2,
            background: GRADIENT_MAIN,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Un propósito que trasciende
        </h2>

        {/* Fotos inclinadas */}
        <div className="flex justify-center items-end gap-2 sm:gap-4 mb-16 overflow-visible">
          {fotos.map((f, i) => (
            <motion.div
              key={f.src}
              initial={{ opacity: 0, y: 40, rotate: f.rotate * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: f.rotate }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, scale: 1.04, transition: { duration: 0.3 } }}
              style={{ transformOrigin: "bottom center", flexShrink: 0 }}
            >
              <div className="rounded-2xl p-[3px] shadow-lg" style={{ background: GRADIENT_MAIN }}>
                <div
                  className="rounded-[14px] overflow-hidden bg-white"
                  style={{ width: "clamp(90px, 25vw, 200px)", height: "clamp(115px, 32vw, 250px)" }}
                >
                  <img
                    src={f.src}
                    alt={`Acción social ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── TIMELINE ── */}
        <div className="relative mb-14">

          {/* Línea vertical — desktop: centro, mobile: izquierda */}
          <div
            className="absolute top-2 bottom-2 w-px"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              background: GRADIENT_MAIN,
              opacity: 0.35,
            }}
          />
          {/* Mobile override: línea a la izquierda */}
          <div
            className="lg:hidden absolute top-2 bottom-2 w-px"
            style={{ left: "10px", background: GRADIENT_MAIN, opacity: 0.35 }}
          />

          <div className="space-y-8 lg:space-y-10">
            {INICIATIVAS.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Mobile: dot a la izquierda, card a la derecha */}
                  <div className="lg:hidden flex items-start gap-4" style={{ paddingLeft: "2px" }}>
                    <div className="flex flex-col items-center flex-shrink-0" style={{ marginTop: "14px" }}>
                      <Dot gradient={item.gradient} />
                    </div>
                    <div className="flex-1 pl-2">
                      <Card item={item} />
                    </div>
                  </div>

                  {/* Desktop: alternando izquierda / derecha */}
                  <div className="hidden lg:grid items-start" style={{ gridTemplateColumns: "1fr 32px 1fr", gap: "0 1.5rem" }}>
                    {/* Columna izquierda */}
                    <div className="flex justify-end">
                      {isLeft ? <div className="w-full max-w-sm"><Card item={item} /></div> : null}
                    </div>

                    {/* Dot centrado */}
                    <div className="flex justify-center" style={{ paddingTop: "14px" }}>
                      <Dot gradient={item.gradient} />
                    </div>

                    {/* Columna derecha */}
                    <div>
                      {!isLeft ? <div className="w-full max-w-sm"><Card item={item} /></div> : null}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Convocatoria */}
        <p className="text-center text-grafito/50 text-sm">
          Convocatoria siempre abierta para fundaciones y proyectos sociales.{" "}
          <span className="text-grafito/40">Contacto directo:</span>{" "}
          <a
            href="mailto:hello@loretoconsultora.com"
            className="font-semibold hover:opacity-70 transition-opacity"
            style={{
              background: GRADIENT_MAIN,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            hello@loretoconsultora.com
          </a>
        </p>

      </div>
    </section>
  );
}
