"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const GRADIENT_MAIN = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const GRADIENT_A = "linear-gradient(135deg, #3a0ca3, #c0005a, #ff6a92)";
const GRADIENT_B = "linear-gradient(135deg, #1a0a2e, #6a00c8, #E894FF)";
const GRADIENT_C = "linear-gradient(135deg, #c0005a, #E894FF, #ff6a92)";
const GRADIENT_D = "linear-gradient(135deg, #1a0a2e, #3a0ca3, #c0005a)";
const GRADIENT_E = "linear-gradient(135deg, #6a00c8, #c0005a, #E894FF)";

// Ángulos para disposición en reloj (empezando en 12, sentido horario, 72° c/u)
const INICIATIVAS = [
  {
    gradient: GRADIENT_C,
    label: "Sep 2025 · Presente · México",
    title: "JoM",
    subtitle: "Jóvenes Mexicanos Desarrollando Talentos A.C.",
    body: "Talleres de IA donde los jóvenes desarrollan su propio stack tecnológico y portafolio de herramientas digitales que responden a las necesidades de su comunidad.",
    angle: -90,
  },
  {
    gradient: GRADIENT_B,
    label: "Oct 2025 · Valle del Cauca, Colombia",
    title: "Valle del Cauca",
    subtitle: null,
    body: "Conferencias y clases de inteligencia artificial, ventas y marca personal a jóvenes adolescentes de la región cafetera.",
    angle: -18,
  },
  {
    gradient: GRADIENT_D,
    label: "May 2026 · Presente · Venezuela",
    title: "Venezuela Tierra de Gracia",
    subtitle: null,
    body: "Consultoría en Lean Manufacturing y Desarrollo de Herramientas Tecnológicas para el equipo de Currículo Educativo.",
    angle: 54,
  },
  {
    gradient: GRADIENT_A,
    label: "Jun 2026 · Presente · México",
    title: "CONEDUQ",
    subtitle: "Consejo de Educación y Capacitación Q.A.C.",
    body: "Consultoría de Marca y Comunicación institucional + Diseño de Programas Académicos alrededor de la Inteligencia Artificial.",
    angle: 126,
  },
  {
    gradient: GRADIENT_E,
    label: "Jul 2026 · Presente · México",
    title: "El Puente de Esperanza IAP",
    subtitle: null,
    body: "Consultoría, Planeación y Liderazgo del Servicio Social de los equipos de Comunicación Institucional y Patrocinios.",
    angle: 198,
  },
];

const R_PCT = 34;

function circPos(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    left: `${50 + R_PCT * Math.cos(rad)}%`,
    top: `${50 + R_PCT * Math.sin(rad)}%`,
  };
}

const fotos = [
  { src: "/accion-social/foto-1.jpg", rotate: -5 },
  { src: "/accion-social/foto-2.jpg", rotate: 2 },
  { src: "/accion-social/foto-3.jpg", rotate: -3 },
];

function Card({ item, style }: { item: typeof INICIATIVAS[0]; style?: React.CSSProperties }) {
  return (
    <div className="rounded-3xl p-[3px] h-full" style={{ background: item.gradient, ...style }}>
      <div className="rounded-[22px] bg-white p-4 h-full">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{
          background: item.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {item.label}
        </p>
        <p className="font-bold text-sm mb-0.5" style={{
          background: item.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {item.title}
        </p>
        {item.subtitle && (
          <p className="text-[11px] text-grafito/50 mb-1 leading-tight">{item.subtitle}</p>
        )}
        <p className="text-grafito/65 text-xs leading-relaxed">{item.body}</p>
      </div>
    </div>
  );
}

export default function ImpactoSocial() {
  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

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

        {/* ── MOBILE: grid 2 columnas ── */}
        <div className="lg:hidden grid grid-cols-2 gap-4 mb-10">
          {INICIATIVAS.map((item, i) => (
            <div key={item.title} className={i === 4 ? "col-span-2" : ""}>
              <Card item={item} />
            </div>
          ))}
        </div>

        {/* ── DESKTOP: disposición circular tipo reloj ── */}
        <div
          className="hidden lg:block relative mx-auto mb-10"
          style={{ width: "min(760px, 95vw)", height: "min(760px, 95vw)", overflow: "visible" }}
        >
          {/* SVG: líneas de conexión y anillo decorativo */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="impLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c0005a" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#E894FF" stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="impCenterGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(232,148,255,0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="34" fill="none" stroke="url(#impLineGrad)" strokeWidth="0.3" strokeDasharray="1.5 2" />
            <circle cx="50" cy="50" r="45" fill="url(#impCenterGlow)" />
            {INICIATIVAS.map((item) => {
              const rad = (item.angle * Math.PI) / 180;
              return (
                <line
                  key={item.title}
                  x1="50" y1="50"
                  x2={50 + R_PCT * Math.cos(rad)}
                  y2={50 + R_PCT * Math.sin(rad)}
                  stroke="url(#impLineGrad)"
                  strokeWidth="0.4"
                />
              );
            })}
          </svg>

          {/* Hub central */}
          <div
            className="absolute flex flex-col items-center justify-center text-center"
            style={{
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: "clamp(90px, 14%, 110px)",
              height: "clamp(90px, 14%, 110px)",
              borderRadius: "50%",
              background: GRADIENT_MAIN,
              boxShadow: "0 4px 28px rgba(192,0,90,0.35)",
              zIndex: 2,
            }}
          >
            <Heart size={16} className="text-white mb-1" fill="white" />
            <span className="text-white font-bold text-[10px] leading-tight tracking-wide uppercase">Acción<br />Social</span>
          </div>

          {/* Cards circulares */}
          {INICIATIVAS.map((item, i) => {
            const { left, top } = circPos(item.angle);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="absolute"
                style={{
                  left,
                  top,
                  transform: "translate(-50%, -50%)",
                  width: "clamp(150px, 24%, 190px)",
                  zIndex: 2,
                }}
              >
                <Card item={item} />
              </motion.div>
            );
          })}
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
