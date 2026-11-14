"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const GRADIENT_MAIN = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const GRADIENT_A = "linear-gradient(135deg, #3a0ca3, #c0005a, #ff6a92)";
const GRADIENT_B = "linear-gradient(135deg, #1a0a2e, #6a00c8, #E894FF)";
const GRADIENT_C = "linear-gradient(135deg, #c0005a, #E894FF, #ff6a92)";
const GRADIENT_D = "linear-gradient(135deg, #1a0a2e, #3a0ca3, #c0005a)";

const INICIATIVAS = [
  {
    gradient: GRADIENT_A,
    label: "México",
    title: "CONEDUQ",
    body: "Programas de Consultoría en el Consejo de Educación y Capacitación Q.A.C. (CONEDUQ): Consultoría de Marca y Comunicación para el equipo de comunicación institucional, y Diseño de Programas Académicos alrededor de la Inteligencia Artificial.",
  },
  {
    gradient: GRADIENT_B,
    label: "México",
    title: "El Puente de Esperanza IAP",
    body: "Coordinación del Servicio Social de los equipos de Comunicación Institucional y Patrocinios en El Puente de Esperanza IAP: Consultoría, Planeación y Liderazgo de los equipos.",
  },
  {
    gradient: GRADIENT_C,
    label: "Sep 2025 · Presente · México",
    title: "Jóvenes Mexicanos Desarrollando Talentos A.C. (JoM)",
    body: "Talleres de Inteligencia Artificial donde los jóvenes aprenden a desarrollar su propio stack tecnológico y portafolio de herramientas digitales que responden a las necesidades de su comunidad.",
  },
  {
    gradient: GRADIENT_D,
    label: "Venezuela",
    title: "Venezuela Tierra de Gracia",
    body: "Consultoría en Lean Manufacturing y Desarrollo de Herramientas Tecnológicas a la medida para el equipo de Currículo Educativo.",
  },
];

const fotos = [
  { src: "/accion-social/foto-1.jpg", rotate: -5 },
  { src: "/accion-social/foto-2.jpg", rotate: 2 },
  { src: "/accion-social/foto-3.jpg", rotate: -3 },
];

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

        {/* Título — wrap en mobile, nowrap en desktop */}
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

        {/* Fotos inclinadas — tamaño adaptable en mobile */}
        <div className="flex justify-center items-end gap-2 sm:gap-4 mb-14 overflow-visible">
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
              <div
                className="rounded-2xl p-[3px] shadow-lg"
                style={{ background: GRADIENT_MAIN }}
              >
                <div
                  className="rounded-[14px] overflow-hidden bg-white"
                  style={{
                    width: "clamp(90px, 25vw, 200px)",
                    height: "clamp(115px, 32vw, 250px)",
                  }}
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

        {/* Cuatro iniciativas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {INICIATIVAS.map((item) => (
            <div key={item.title} className="rounded-3xl p-[3px]" style={{ background: item.gradient }}>
              <div className="rounded-[22px] bg-white p-6 h-full">
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{
                  background: item.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {item.label}
                </p>
                <p className="font-semibold text-sm mb-2" style={{
                  background: item.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {item.title}
                </p>
                <p className="text-grafito/70 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Convocatoria */}
        <p className="text-center text-grafito/50 text-sm">
          Convocatoria siempre abierta para fundaciones y proyectos sociales.{" "}
          <span className="text-grafito/40">Contacto directo:</span>{" "}
          <a
            href="mailto:hello@loretoconsultora.lat"
            className="font-semibold hover:opacity-70 transition-opacity"
            style={{
              background: GRADIENT_MAIN,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            hello@loretoconsultora.lat
          </a>
        </p>

      </div>
    </section>
  );
}
