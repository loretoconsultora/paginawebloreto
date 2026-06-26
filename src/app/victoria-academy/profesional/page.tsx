"use client";

import Image from "next/image";
import { CheckCircle2, XCircle, Clock, Library, Map as MapIcon, ScrollText, ShieldCheck, ChevronDown, Target, Zap, Gift, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import LandingHeader from "@/components/victoria-academy/LandingHeader";
import Faq from "@/components/victoria-academy/Faq";
import Footer from "@/components/layout/Footer";
import SolicitudInfoForm from "@/components/victoria-academy/SolicitudInfoForm";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";
const ACCENT = "#3E7ECA";
const HEAD = "#1a1f24";
const HEADFAINT = "#a7afb6";
const GRIS = "#445055";
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_VICTORIA_PROFESIONAL_WEBHOOK ?? "";
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_PROFESIONAL ?? "";
const PRECIO = "$2,850 USD ($49,875 MXN) por grupo de hasta 15 personas — $190 USD/persona";

const PROBLEMAS = [
  { num: "01", titulo: "No sabes por dónde empezar con IA", texto: "Tu equipo ve que otros ya la usan, pero nadie en la organización tiene un plan claro de por dónde empezar." },
  { num: "02", titulo: "Sientes que el tiempo se va en lo mismo", texto: "Los reportes y las juntas siguen tomando horas que ya no debería tomar." },
  { num: "03", titulo: "Te preocupa hacerlo mal", texto: "Usar IA sin criterio puede ser peor que no usarla — y eso frena a tu equipo en lugar de impulsarlo." },
  { num: "04", titulo: "Crees que necesitas un equipo técnico", texto: "Antes era así. Hoy cualquier persona de tu equipo puede aprender a usar IA con criterio, sin ser programador." },
  { num: "05", titulo: "Te falta tiempo para capacitar a tu gente", texto: "Un taller de 6.5 horas resuelve lo que normalmente tomaría semanas de prueba y error por su cuenta." },
  { num: "06", titulo: "Sientes que la competencia ya te lleva ventaja", texto: "Mientras unos siguen dudando, otros equipos ya recuperan horas cada semana usando IA con criterio." },
];

const SENTIMIENTOS = [
  { titulo: "Te sentirás capaz", texto: "Descubrirás que no necesitas ser técnico para usar IA con criterio. Tu equipo también puede." },
  { titulo: "Te sentirás en control", texto: "La presión de no saber por dónde empezar desaparece. Sales con un plan claro y específico." },
  { titulo: "Te sentirás respaldado", texto: "Ya no dependes de adivinar — tienes un roadmap y prompts probados para tu trabajo real." },
];

const CAPACIDADES = [
  { icon: Library, titulo: "Construir tu Biblioteca Personal de 10 Prompts", texto: "Documentada y lista para usar el lunes siguiente, en tu trabajo específico." },
  { icon: ScrollText, titulo: "Automatizar tu tarea más repetitiva", texto: "Una SOP rediseñada con IA incorporada, que cualquiera de tu equipo puede replicar." },
  { icon: MapIcon, titulo: "Tener un AI Roadmap de 18-36 meses", texto: "Tu hoja de ruta de transformación, con métricas de éxito para tu contexto real." },
];

const SESIONES = [
  { tag: "S0", titulo: "Activación Pre-Taller", dur: "45 min asíncrono", texto: "Video de urgencia + formulario de diagnóstico personalizado + guía técnica de configuración. Llegas listo, activado y con tu caso real identificado." },
  { tag: "S1", titulo: "Visión: Claridad y Dirección", dur: "90 min", texto: "Panorama de IA sin tecnicismos. Mapa Personal de Oportunidades — 3 casos de uso específicos para tu rol e industria." },
  { tag: "S2", titulo: "Identidad: El Arte de Pensar con IA", dur: "2 horas", texto: "Anatomía del prompt efectivo. Práctica intensiva con tu caso real. Construcción de tu Biblioteca Personal de 10 Prompts." },
  { tag: "S3", titulo: "Acción Aplicada: IA en Mi Mundo", dur: "2 horas", texto: "Use-Case Workbook personalizado. SOP automatizada de tu tarea más repetitiva. AI Roadmap de 18-36 meses." },
];

const SI_ES = [
  "Tu equipo ya usa IA de forma desordenada y quieres darle criterio y dirección.",
  "Sientes que las juntas y reportes te quitan más tiempo del que deberían.",
  "Quieres entregables reales en las manos de tu gente, no solo un certificado.",
  "Estás dispuesto a que tu equipo practique con su caso real, no con ejemplos genéricos.",
];

const NO_ES = [
  "Buscas un curso grabado para ver cuando tengas tiempo.",
  "No quieres que tu equipo destine 6.5 horas a una sesión presencial.",
  "Solo te interesa una demo de herramientas, no un cambio de hábito real.",
  "No te interesa medir el impacto después del taller.",
];

const CREDENCIALES = [
  { icon: Target, texto: "Fundadora de Loreto Consultora y creadora de VictorIA Academy" },
  { icon: Zap, texto: "Ha formado equipos en empresas, hospitales e instituciones académicas" },
  { icon: ShieldCheck, texto: "Diseña cada programa con entregables medibles, no solo contenido" },
  { icon: CheckCircle2, texto: "Acompaña personalmente la fase de diagnóstico de cada grupo" },
];

const FAQS = [
  { q: "¿De verdad necesito 6.5 horas completas?", a: "Sí — es lo que toma construir, no solo explicar, los 3 entregables que tu equipo se lleva. Repartimos la sesión en bloques con descansos para que el aprendizaje se quede." },
  { q: "¿Mi equipo necesita saber de tecnología?", a: "No. El taller está diseñado para personas sin background técnico. Trabajamos con su caso real, sin código y sin tecnicismos." },
  { q: "¿Qué pasa después del taller?", a: "Incluye 30 días de seguimiento estructurado y acceso a la comunidad VictorIA Profesional, para que la transformación no se quede en el salón." },
  { q: "¿Aplica para mi tipo de organización?", a: "Sí. Hemos trabajado con empresas, hospitales e instituciones académicas — el taller se adapta al caso real de cada grupo." },
  { q: "¿Qué pasa si mi equipo no ve resultados claros?", a: "Tenemos Garantía de Experiencia VictorIA: si no salen con al menos 3 entregables concretos, ofrecemos una sesión adicional sin costo." },
];

export default function VictoriaProfesionalPage() {
  return (
    <>
      <LandingHeader accent={ACCENT} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="relative overflow-hidden pt-12 sm:pt-16 pb-10 px-4 sm:px-6">
          <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full pointer-events-none" style={{ background: ACCENT, opacity: 0.16, filter: "blur(90px)" }} />
          <div className="absolute top-10 -right-20 w-96 h-96 rounded-full pointer-events-none" style={{ background: "#67C6C8", opacity: 0.14, filter: "blur(100px)" }} />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full pointer-events-none" style={{ background: "#6A8AFF", opacity: 0.12, filter: "blur(90px)" }} />
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full mb-6 text-xs font-medium"
                style={{ border: "1px solid rgba(58,63,75,0.18)", color: GRIS }}
              >
                Programa VictorIA Profesional
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="font-extrabold text-4xl sm:text-5xl mb-5 tracking-tight"
                style={{ lineHeight: 1.05, color: HEAD }}
              >
                La nueva forma de <span style={{ color: ACCENT }}>TRABAJAR</span> con IA.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg leading-relaxed mb-4"
                style={{ color: GRIS, opacity: 0.85 }}
              >
                Tu equipo aprende a usar la inteligencia artificial para automatizar tareas repetitivas y tomar decisiones con más criterio.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="text-sm leading-relaxed mb-6"
                style={{ color: GRIS, opacity: 0.7 }}
              >
                En este programa vive la experiencia de co crear con la IA para transformar la forma en que tu equipo trabaja, y logra entregables reales en un solo taller de 6.5 horas.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-start gap-3 mb-7 rounded-xl p-4"
                style={{ border: "1px solid rgba(58,63,75,0.1)" }}
              >
                <CalendarDays size={18} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: HEAD }}>Agenda tu Entrenamiento en tu Empresa</p>
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-1" style={{ color: GRIS, opacity: 0.6 }}>
                    <span className="flex items-center gap-1.5"><Clock size={11} /> 6.5 horas</span>
                    <span>Presencial o virtual</span>
                    <span>Formación Grupal</span>
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.32 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0" style={{ border: `1px solid ${ACCENT}40` }}>
                  <Image src="/loreto-directora.jpg" alt="Any Villegas" width={28} height={28} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs" style={{ color: GRIS }}>
                  <span className="font-bold" style={{ color: HEAD }}>EN VIVO CON</span> Any Villegas
                </p>
              </motion.div>
              <motion.a
                href="#solicitud"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
                style={{ background: GRADIENT, boxShadow: `0 12px 32px ${ACCENT}40` }}
              >
                Solicitar Programa →
              </motion.a>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl flex items-center justify-center"
              style={{ border: "1px dashed rgba(58,63,75,0.25)", aspectRatio: "1 / 1" }}
            >
              <p className="text-xs px-6 text-center" style={{ color: GRIS, opacity: 0.4 }}>Espacio reservado para imagen o video</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-10 text-center">
            <ChevronDown size={20} className="mx-auto animate-bounce" style={{ color: GRIS, opacity: 0.4 }} />
          </motion.div>
        </section>

        {/* Bono de inscripción */}
        <section className="py-14 sm:py-16 px-4 sm:px-6" style={{ background: "#fafbfc" }}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Bono de inscripción · Junio y julio 2026</p>
            <h2 className="font-extrabold text-2xl sm:text-3xl mb-6 tracking-tight" style={{ color: HEAD }}>
              Reserva tu lugar este verano y entra gratis a una masterclass más.
            </h2>
            <div className="rounded-2xl bg-white p-6 sm:p-7 flex items-start gap-4 text-left" style={{ border: "1px solid rgba(58,63,75,0.1)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}15` }}>
                <Gift size={20} style={{ color: ACCENT }} />
              </div>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: HEAD }}>Masterclass de Creación de Contenidos con IA</p>
                <p className="text-sm leading-relaxed" style={{ color: GRIS, opacity: 0.8 }}>
                  Aprende a crear avatares con IA y edición profesional para impulsar tu trabajo con creatividad. Incluido sin costo adicional al inscribirte en junio o julio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reencuadre del problema */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>El problema</p>
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: HEADFAINT, lineHeight: 1.15 }}>
              ¿Por qué tu equipo sigue trabajando igual que hace dos años?
            </h2>
            <p className="text-sm sm:text-base" style={{ color: GRIS, opacity: 0.7 }}>Si te reconoces en uno de estos puntos, este taller es para tu equipo.</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PROBLEMAS.map((p) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl p-5" style={{ border: "1px solid rgba(58,63,75,0.1)" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-extrabold text-2xl" style={{ color: ACCENT }}>{p.num}</span>
                  <XCircle size={18} style={{ color: ACCENT, opacity: 0.5 }} />
                </div>
                <p className="font-bold text-sm mb-1.5" style={{ color: HEAD }}>{p.titulo}</p>
                <p className="text-xs leading-relaxed" style={{ color: GRIS, opacity: 0.7 }}>{p.texto}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Lo que te vas a llevar */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Lo que te vas a llevar</p>
              <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: HEAD, lineHeight: 1.1 }}>
                La forma en que tu equipo trabaja cambia aquí
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: GRIS, opacity: 0.8 }}>
                Esto no es un taller más. Es donde tu equipo por fin entiende qué hacer para trabajar más rápido y con más criterio, sin complicarse y sin ser experto en tecnología. Vienen a construir en vivo cómo la IA hace por ellos lo que antes tomaba horas.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex justify-center">
              <div className="relative w-full max-w-xs rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(58,63,75,0.1)" }}>
                <Image src="/loreto-directora.jpg" alt="Any Villegas — Founder y CEO de Loreto Consultora" width={400} height={500} className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center bg-white" style={{ border: `1px solid ${ACCENT}40`, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}>
                <Target size={18} style={{ color: ACCENT }} />
              </div>
              <div className="absolute bottom-10 -right-3 w-11 h-11 rounded-full flex items-center justify-center bg-white" style={{ border: `1px solid ${ACCENT}40`, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}>
                <Zap size={16} style={{ color: ACCENT }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cómo te vas a sentir / Qué vas a poder hacer */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-0 sm:divide-x" style={{ borderColor: "rgba(58,63,75,0.1)" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="sm:pr-10">
              <h3 className="font-extrabold text-2xl mb-6 tracking-tight" style={{ color: HEAD }}>Cómo se va a sentir tu equipo después</h3>
              <div className="flex flex-col gap-5">
                {SENTIMIENTOS.map((s) => (
                  <div key={s.titulo}>
                    <p className="text-sm font-bold mb-1" style={{ color: HEAD }}>{s.titulo}</p>
                    <p className="text-sm leading-relaxed" style={{ color: GRIS, opacity: 0.75 }}>{s.texto}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="sm:pl-10">
              <h3 className="font-extrabold text-2xl mb-6 tracking-tight" style={{ color: HEAD }}>Lo que va a poder hacer después</h3>
              <div className="flex flex-col gap-5">
                {CAPACIDADES.map((c) => (
                  <div key={c.titulo}>
                    <p className="text-sm font-bold mb-1" style={{ color: HEAD }}>{c.titulo}</p>
                    <p className="text-sm leading-relaxed" style={{ color: GRIS, opacity: 0.75 }}>{c.texto}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sesiones */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#fafbfc" }}>
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-extrabold text-2xl sm:text-3xl text-center mb-1 tracking-tight" style={{ color: HEAD }}>La experiencia del taller — 6.5 horas</h2>
              <p className="text-sm text-center mb-8" style={{ color: GRIS, opacity: 0.6 }}>Todo en un solo precio, sin extras ocultos</p>
              <div className="flex flex-col gap-3">
                {SESIONES.map((s) => (
                  <div key={s.tag} className="flex gap-4 rounded-xl p-4 bg-white" style={{ border: "1px solid rgba(58,63,75,0.1)" }}>
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm text-white" style={{ background: GRADIENT }}>
                      {s.tag}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm" style={{ color: HEAD }}>{s.titulo}</h3>
                        <span className="flex items-center gap-1 text-[11px]" style={{ color: GRIS, opacity: 0.5 }}>
                          <Clock size={11} /> {s.dur}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: GRIS, opacity: 0.7 }}>{s.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Para quién es */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Para quién es</p>
            <h2 className="font-extrabold text-2xl sm:text-3xl mb-3 tracking-tight" style={{ color: HEAD, lineHeight: 1.25 }}>
              Este taller es para ti si quieres que tu equipo trabaje con criterio, no solo con más herramientas.
            </h2>
            <p className="text-sm" style={{ color: GRIS, opacity: 0.65 }}>Antes de avanzar, mira si este programa encaja con lo que tu equipo necesita ahora.</p>
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={18} style={{ color: ACCENT }} />
                <h3 className="font-extrabold" style={{ color: HEAD }}>Para quién SÍ es</h3>
              </div>
              <div className="flex flex-col gap-3">
                {SI_ES.map((t) => (
                  <div key={t} className="flex items-start gap-2 text-sm" style={{ color: GRIS, opacity: 0.85 }}>
                    <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <XCircle size={18} style={{ color: GRIS, opacity: 0.4 }} />
                <h3 className="font-extrabold" style={{ color: GRIS, opacity: 0.5 }}>Para quién NO es</h3>
              </div>
              <div className="flex flex-col gap-3">
                {NO_ES.map((t) => (
                  <div key={t} className="flex items-start gap-2 text-sm" style={{ color: GRIS, opacity: 0.55 }}>
                    <XCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: GRIS, opacity: 0.35 }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Micro CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto mt-12 text-center">
            <div
              className="rounded-2xl p-7"
              style={{ background: `radial-gradient(circle at 50% 0%, ${ACCENT}12, transparent 70%)`, border: `1px solid ${ACCENT}30` }}
            >
              <p className="font-medium mb-4" style={{ color: HEAD }}>Si te reconociste en 2 o más puntos, este taller es para tu equipo.</p>
              <p className="text-sm mb-4" style={{ color: GRIS }}>
                Inversión: <span className="font-bold">{PRECIO}</span>
              </p>
              <a
                href="#solicitud"
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                style={{ background: GRADIENT }}
              >
                Solicitar información →
              </a>
              <p className="text-[11px] mt-3" style={{ color: GRIS, opacity: 0.6 }}>Cupo máximo: 15 personas por grupo. Precio educativo preferencial desde $80 USD ($1,400 MXN) por persona.</p>
            </div>
          </motion.div>
        </section>

        {/* Autoridad */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#fafbfc" }}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 items-start">
            <div className="rounded-2xl overflow-hidden mx-auto" style={{ width: 200, border: "1px solid rgba(58,63,75,0.1)" }}>
              <Image src="/loreto-directora.jpg" alt="Any Villegas — Founder y CEO de Loreto Consultora" width={200} height={250} className="w-full h-auto object-cover" />
            </div>
            <div>
              <h2 className="font-extrabold text-2xl sm:text-3xl mb-2 tracking-tight" style={{ color: HEAD }}>
                Any Villegas, <span style={{ color: ACCENT }}>Founder y CEO de Loreto Consultora</span>
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: GRIS, opacity: 0.8 }}>
                Diseña e imparte VictorIA Academy con un enfoque consultivo: no enseña IA en abstracto, construye con cada equipo su caso real, en vivo, con entregables medibles.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CREDENCIALES.map((c) => (
                  <div key={c.texto} className="flex items-start gap-3">
                    <c.icon size={16} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                    <p className="text-sm" style={{ color: GRIS, opacity: 0.85 }}>{c.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Prueba social — pendiente: subir capturas reales de testimonios */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Lo que dicen los equipos</p>
            <h2 className="font-extrabold text-2xl sm:text-3xl tracking-tight" style={{ color: HEAD }}>
              Resultados reales de quienes ya pasaron por el taller
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl flex items-center justify-center text-center p-6"
                style={{ border: "1px dashed rgba(58,63,75,0.25)", minHeight: 160, color: GRIS, opacity: 0.4 }}
              >
                <p className="text-xs">Espacio reservado para captura de testimonio real</p>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 flex flex-col gap-10">
          {/* Garantía */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-start gap-4 rounded-2xl p-6"
            style={{ border: "1px solid rgba(58,63,75,0.1)" }}
          >
            <ShieldCheck size={28} style={{ color: ACCENT }} className="flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-extrabold text-lg mb-1" style={{ color: HEAD }}>Garantía de Experiencia VictorIA</h3>
              <p className="text-sm leading-relaxed" style={{ color: GRIS, opacity: 0.75 }}>
                Si al terminar el taller no tienes en tus manos al menos 3 entregables concretos aplicables a tu trabajo real, te ofrecemos una sesión adicional personalizada de 60 minutos sin costo adicional para cerrar esa brecha. No es una garantía de devolución de dinero — es una garantía de resultado.
              </p>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-extrabold text-2xl text-center mb-1 tracking-tight" style={{ color: HEAD }}>Resuelve tus dudas</h2>
            <p className="text-sm text-center mb-6" style={{ color: GRIS, opacity: 0.6 }}>Antes de solicitar información para tu equipo</p>
            <Faq items={FAQS} accent={ACCENT} />
          </motion.div>
        </div>

        {/* Cierre final */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#fafbfc" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Decisión final</p>
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: HEAD, lineHeight: 1.1 }}>
              Tu competencia no está esperando.
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: GRIS, opacity: 0.8 }}>
              Mientras otros equipos ya recuperan horas semanales por persona, el tuyo puede seguir igual o dar el paso hoy. Una sola sesión puede cambiar cómo trabaja tu gente de aquí a 18 meses.
            </p>
            <a
              href="#solicitud"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: GRADIENT, boxShadow: `0 12px 32px ${ACCENT}40` }}
            >
              Solicitar información para mi equipo →
            </a>
          </div>
        </section>

        {/* Form */}
        <div id="solicitud" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 relative z-10"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}
          >
            <h2 className="font-extrabold text-xl text-center mb-1 tracking-tight" style={{ color: ACCENT }}>
              Solicita información para tu equipo
            </h2>
            <p className="text-xs text-center mb-6" style={{ color: GRIS, opacity: 0.6 }}>
              Cupo máximo: 15 personas por grupo. Disponible para empresas, hospitales y escuelas.
            </p>
            <SolicitudInfoForm
              programa="VictorIA Profesional"
              webhookUrl={WEBHOOK}
              calendlyUrl={CALENDLY}
              gradient={GRADIENT}
              selectField={{ name: "tipoOrganizacion", label: "Tipo de organización", options: ["Empresa", "Institución académica", "Hospital", "Otro"] }}
              confirmTitle="¡Listo! Tu solicitud fue recibida."
              confirmText="Nuestro equipo te contactará por WhatsApp para agendar una breve llamada de diagnóstico y conocer el caso de tu equipo."
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
