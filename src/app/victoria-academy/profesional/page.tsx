"use client";

import Image from "next/image";
import { CheckCircle2, XCircle, Clock, Library, Map as MapIcon, ScrollText, ShieldCheck, ChevronDown, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import LandingHeader from "@/components/victoria-academy/LandingHeader";
import Faq from "@/components/victoria-academy/Faq";
import Footer from "@/components/layout/Footer";
import SolicitudInfoForm from "@/components/victoria-academy/SolicitudInfoForm";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";
const ACCENT = "#3E7ECA";
const HEAD = "#1a1f24";
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_VICTORIA_PROFESIONAL_WEBHOOK ?? "";
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_PROFESIONAL ?? "";

const BARRERA = [
  { num: "01", texto: "Antes necesitabas un departamento de TI. Hoy basta con tu equipo actual y el criterio correcto para usar la IA." },
  { num: "02", texto: "Antes capacitar a tu equipo tomaba meses. Hoy se logra en un solo entrenamiento que termina con un portafolio de entregables." },
  { num: "03", texto: "Antes la IA era solo para \"empresas grandes\". Hoy cualquier rubro puede usarla para producir más y mejor." },
];

const BONOS = [
  { num: "1", texto: "Masterclass de Creación de Contenido con IA: Tu equipo aprende a crear avatares, videos creativos y profesionales, y piezas de diseño gráfico." },
  { num: "2", texto: "Consultoría de 2 horas de marketing, IA y ventas para tu marca o negocio." },
  { num: "3", texto: "3 prompts maestros para ti como líder / director." },
];

const PROBLEMAS = [
  { num: "01", titulo: "Viven ocupados, pero nada cambia", texto: "La rutina da la sensación de avance, pero el reporte que prometieron sigue a medias y el día se va en juntas que no decidieron nada." },
  { num: "02", titulo: "El miedo a equivocarse los frena", texto: "\"¿Y si lo intento y me equivoco frente a mi equipo?\" — esa duda basta para que ni siquiera lo intenten." },
  { num: "03", titulo: "La brecha crece en silencio", texto: "Nadie te dice que te estás quedando atrás. Simplemente te van dejando fuera, mientras otros entregan más rápido sin que entiendas cómo." },
  { num: "04", titulo: "Creen que esto es solo para técnicos", texto: "Se disfrazan de humildad — \"no soy bueno con la tecnología\" — cuando en realidad solo les falta el método correcto." },
  { num: "05", titulo: "Tu equipo trabaja mucho, en lo que no debería tomar tanto", texto: "El proyecto que debía salir el miércoles sale el viernes. No es falta de compromiso — es que nadie les dio la infraestructura para hacerlo distinto." },
  { num: "06", titulo: "La inacción de hoy es la desventaja de mañana", texto: "En IA, 6 meses sin actuar equivalen a 2 años de retraso en otros campos. Cada semana que pasa, la brecha es más difícil de cerrar." },
];

const SENTIMIENTOS = [
  { titulo: "Capaz", texto: "No necesitas ser técnico para usar IA. Tu equipo también puede co crear con visión, identidad y criterio para implementar." },
  { titulo: "En control", texto: "La presión de no saber por dónde empezar desaparece. Cada participante sale con un plan claro y herramientas listas para usar." },
  { titulo: "Respaldado", texto: "Existe un acompañamiento antes, durante y después del taller para garantizar resultados medibles y escalables." },
];

const CAPACIDADES = [
  { icon: Library, titulo: "Construir su Biblioteca Personal de Prompts maestros", texto: "Documentada y lista para usar." },
  { icon: ScrollText, titulo: "Automatizar su tarea más repetitiva", texto: "Una web, herramienta digital, o app diseñada con IA incorporada 100% funcional." },
  { icon: MapIcon, titulo: "Tener una hoja de ruta para los siguientes 6-12 meses", texto: "Sistema de métricas para evaluar el éxito de sus herramientas y la claridad de cómo crear nuevas en el futuro." },
];

const SI_ES = [
  "Tu equipo no usa IA o si la usa, lo hace de forma aislada, desordenada y quieres darle criterio y dirección.",
  "Sientes que las actividades repetitivas quitan más tiempo del que deberían.",
  "Gran parte de la atención se dedica a lo urgente en vez de a lo que suma mayor valor para cumplir objetivos.",
  "Quieres entregables reales en las manos de tu gente, no solo un certificado.",
  "Estás dispuesto a que tu equipo practique con su caso real, no con ejemplos genéricos.",
];

const NO_ES = [
  "Buscas un curso grabado para ver cuando tengas tiempo.",
  "No quieres que tu equipo destine 6.5 horas a una sesión presencial.",
  "Solo te interesa una demo de herramientas, no un cambio de hábito real.",
  "No te interesa medir el impacto después del taller.",
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
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full mb-6 text-xs font-medium"
                style={{ border: "1px solid rgba(58,63,75,0.18)", color: HEAD }}
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
                style={{ color: HEAD, opacity: 0.85 }}
              >
                Tu equipo aprende a usar la inteligencia artificial para automatizar tareas, elaborar proyectos, crear sus propias herramientas y tomar decisiones sin depender de ti.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="text-sm leading-relaxed mb-6"
                style={{ color: HEAD, opacity: 0.7 }}
              >
                Este programa te ayuda a recuperar desde 10 horas semanales por persona. Tu mismo equipo, pero con súper poderes.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-start gap-3 mb-7 rounded-xl p-4"
                style={{ border: "1px solid rgba(58,63,75,0.1)" }}
              >
                <CalendarDays size={18} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: HEAD }}>Agenda tu Entrenamiento en tu Organización</p>
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-1" style={{ color: HEAD, opacity: 0.6 }}>
                    <span className="flex items-center gap-1.5"><Clock size={11} /> 6.5 horas</span>
                    <span>Presencial o virtual</span>
                    <span>Formación Grupal</span>
                  </p>
                </div>
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
              className="relative w-full lg:scale-125 lg:-mr-10"
              style={{ aspectRatio: "1 / 1" }}
            >
              <Image src="/victoria-academy/hero-profesional.png" alt="VictorIA Profesional" fill className="object-contain" />
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-10 text-center">
            <ChevronDown size={20} className="mx-auto animate-bounce" style={{ color: HEAD, opacity: 0.4 }} />
          </motion.div>
        </section>

        {/* Bono de inscripción */}
        <section className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#fafbfc" }}>
          <div className="absolute top-1/4 -right-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "#67C6C8", opacity: 0.18, filter: "blur(100px)" }} />
          <div className="absolute -bottom-16 left-10 w-72 h-72 rounded-full pointer-events-none" style={{ background: "#6A8AFF", opacity: 0.12, filter: "blur(90px)" }} />
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
                Disponible sólo PARA TALLERES JUNIO - AGOSTO
              </p>
              <h2 className="font-extrabold text-3xl sm:text-4xl mb-6 tracking-tight" style={{ color: HEAD, lineHeight: 1.15 }}>
                Más de <span style={{ color: ACCENT }}>USD 1,500 de Bonificación</span>. Una sóla condición: Tomar la oportunidad este verano.
              </h2>
              <p className="text-sm mb-6" style={{ color: HEAD, opacity: 0.8 }}>
                Al reservar tu programa VictorIA Profesional en tu empresa, recibe:
              </p>
              <div className="space-y-4 mb-6">
                {BONOS.map((b) => (
                  <div key={b.num} className="rounded-2xl p-5 flex items-start gap-4 text-left" style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}40` }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold text-sm text-white" style={{ background: "#3E7ECA" }}>
                      {b.num}
                    </div>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: HEAD }}>{b.texto}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: HEAD, opacity: 0.6 }}>
                Al finalizar VictorIA Profesional te daremos las instrucciones para participar de estos bonos. Los bonos no se reasignan.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative w-full"
              style={{ aspectRatio: "3 / 2" }}
            >
              <Image src="/victoria-academy/bono-profesional.png" alt="Bono de inscripción VictorIA Profesional" fill className="object-contain" />
            </motion.div>
          </div>
        </section>

        {/* La barrera de entrada desapareció */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#0a0a0a" }}>
          <div className="max-w-6xl mx-auto text-left">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
              La barrera de entrada desapareció
            </p>
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-6 tracking-tight text-white" style={{ lineHeight: 1.15 }}>
              La IA de hoy no requiere que seas experto para aprovecharla.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mb-12" style={{ color: "#ffffff", opacity: 0.7 }}>
              Hoy hay una forma accesible y rápida de potenciar los talentos y experiencia de tus colaboradores. Y las ganancias de esa productividad está al alcance de cualquier organización que dedique sólo 6.5 horas... incluso si aún no tiene claro totalmente cómo usar la IA.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {BARRERA.map((b) => (
                <motion.div
                  key={b.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="rounded-2xl p-6 text-left"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <p className="font-extrabold text-3xl mb-4" style={{ color: ACCENT }}>{b.num}</p>
                  <p className="text-sm leading-relaxed text-white" style={{ opacity: 0.85 }}>{b.texto}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-sm sm:text-base font-bold text-white text-center" style={{ opacity: 0.9 }}>
              88% de las organizaciones usa IA, solo 1% ha alcanzado madurez.
            </p>
          </div>
        </section>

        {/* Reencuadre del problema */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>El problema</p>
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: HEAD, lineHeight: 1.15 }}>
              ¿Por qué tu equipo sigue trabajando igual que hace años?
            </h2>
            <p className="text-sm sm:text-base" style={{ color: HEAD, opacity: 0.7 }}>Si te reconoces en uno de estos puntos, este taller es para tu organización.</p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PROBLEMAS.map((p) => (
              <motion.div
                key={p.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl p-7"
                style={{ border: "1px solid rgba(58,63,75,0.1)" }}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none" style={{ background: ACCENT, opacity: 0.12, filter: "blur(40px)" }} />
                <div className="relative flex items-center justify-between mb-4">
                  <span className="font-extrabold text-3xl" style={{ color: ACCENT }}>{p.num}</span>
                  <XCircle size={20} style={{ color: ACCENT, opacity: 0.5 }} />
                </div>
                <p className="relative font-bold text-base mb-2" style={{ color: HEAD }}>{p.titulo}</p>
                <p className="relative text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.7 }}>{p.texto}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Lo que te vas a llevar */}
        <section className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6">
          <div className="absolute -top-20 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: ACCENT, opacity: 0.14, filter: "blur(100px)" }} />
          <div className="absolute top-0 -right-16 w-80 h-80 rounded-full pointer-events-none" style={{ background: "#67C6C8", opacity: 0.16, filter: "blur(90px)" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: "#6A8AFF", opacity: 0.1, filter: "blur(90px)" }} />
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>El cambio empieza contigo</p>
              <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: HEAD, lineHeight: 1.1 }}>
                Lo que hoy te frena no es el tiempo.<br /><span style={{ color: ACCENT }}>Es no potenciar el valor de tu equipo y herramientas</span>
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.8 }}>
                Cada persona sale de este programa con su propio pack de herramientas y un proyecto de optimización listo para aplicar en tu organización.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cómo te vas a sentir / Qué vas a poder hacer */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#fafbfc" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl bg-white p-8"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: ACCENT }} />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ACCENT }}>
                  <CheckCircle2 size={18} className="text-white" />
                </div>
                <h3 className="font-extrabold text-xl sm:text-2xl tracking-tight" style={{ color: HEAD }}>Cómo se va a sentir tu equipo después</h3>
              </div>
              <div className="flex flex-col gap-5">
                {SENTIMIENTOS.map((s) => (
                  <div key={s.titulo} className="flex gap-3">
                    <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: ACCENT }} />
                    <div>
                      <p className="text-sm font-bold mb-1" style={{ color: HEAD }}>{s.titulo}</p>
                      <p className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.75 }}>{s.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl bg-white p-8"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: HEAD }} />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: HEAD }}>
                  <CheckCircle2 size={18} className="text-white" />
                </div>
                <h3 className="font-extrabold text-xl sm:text-2xl tracking-tight" style={{ color: HEAD }}>Lo que van a poder hacer después</h3>
              </div>
              <div className="flex flex-col gap-5">
                {CAPACIDADES.map((c) => (
                  <div key={c.titulo} className="flex gap-3">
                    <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: HEAD }} />
                    <div>
                      <p className="text-sm font-bold mb-1" style={{ color: HEAD }}>{c.titulo}</p>
                      <p className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.75 }}>{c.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Para quién es */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#0a0a0a" }}>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
              <span className="w-8 h-px" style={{ background: ACCENT }} />
              Para quién es
              <span className="w-8 h-px" style={{ background: ACCENT }} />
            </p>
            <h2 className="font-extrabold text-2xl sm:text-4xl mb-3 tracking-tight text-white" style={{ lineHeight: 1.25 }}>
              Este taller es para ti si quieres que tu equipo trabaje con criterio, no solo con más herramientas.
            </h2>
            <p className="text-sm text-white" style={{ opacity: 0.6 }}>Antes de avanzar, mira si este programa encaja con lo que tu equipo necesita ahora.</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${ACCENT}40`, borderTop: `3px solid ${ACCENT}` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ACCENT }}>
                  <CheckCircle2 size={18} className="text-white" />
                </div>
                <h3 className="font-extrabold text-white text-lg">Para quién SÍ es</h3>
              </div>
              <div className="flex flex-col gap-4">
                {SI_ES.map((t) => (
                  <div key={t} className="flex items-start gap-3 text-sm text-white" style={{ opacity: 0.85 }}>
                    <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <XCircle size={18} className="text-white" style={{ opacity: 0.6 }} />
                </div>
                <h3 className="font-extrabold text-white text-lg" style={{ opacity: 0.6 }}>Para quién NO es</h3>
              </div>
              <div className="flex flex-col gap-4">
                {NO_ES.map((t) => (
                  <div key={t} className="flex items-start gap-3 text-sm text-white" style={{ opacity: 0.45 }}>
                    <XCircle size={16} className="flex-shrink-0 mt-0.5 text-white" style={{ opacity: 0.4 }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Micro CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto mt-10 text-center">
            <div
              className="rounded-2xl p-7"
              style={{ background: ACCENT, boxShadow: `0 0 60px ${ACCENT}50` }}
            >
              <p className="font-medium mb-5 text-white">Si te reconociste en 2 o más puntos, este taller es para tu equipo.</p>
              <a
                href="#solicitud"
                className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                style={{ background: "#0a0a0a", color: "#ffffff" }}
              >
                Solicitar información →
              </a>
            </div>
          </motion.div>
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
                style={{ border: "1px dashed rgba(58,63,75,0.25)", minHeight: 160, color: HEAD, opacity: 0.4 }}
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
              <p className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.75 }}>
                Si al terminar el taller no tienes en tus manos al menos 3 entregables concretos aplicables a tu trabajo real, te ofrecemos una sesión adicional personalizada de 60 minutos sin costo adicional para cerrar esa brecha. No es una garantía de devolución de dinero — es una garantía de resultado.
              </p>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-extrabold text-2xl text-center mb-1 tracking-tight" style={{ color: HEAD }}>Resuelve tus dudas</h2>
            <p className="text-sm text-center mb-6" style={{ color: HEAD, opacity: 0.6 }}>Antes de solicitar información para tu equipo</p>
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
            <p className="text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: HEAD, opacity: 0.8 }}>
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
            <p className="text-xs text-center mb-6" style={{ color: HEAD, opacity: 0.6 }}>
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
