"use client";

import Image from "next/image";
import { CheckCircle2, XCircle, Clock, FileText, Award, GraduationCap, ShieldCheck, ChevronDown, Target, Zap, Gift, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import LandingHeader from "@/components/victoria-academy/LandingHeader";
import Faq from "@/components/victoria-academy/Faq";
import Footer from "@/components/layout/Footer";
import SolicitudInfoForm from "@/components/victoria-academy/SolicitudInfoForm";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";
const ACCENT = "#1f8a8c";
const HEAD = "#1a1f24";
const HEADFAINT = "#a7afb6";
const GRIS = "#445055";
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_VICTORIA_JOVEN_WEBHOOK ?? "";
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_JOVEN ?? "";
const PRECIO = "$1,000–$1,500 USD ($17,500–$26,250 MXN) por evento, grupos de 25-30 alumnos";

const PROBLEMAS = [
  { num: "01", titulo: "Tus alumnos ya usan IA, pero sin criterio", texto: "La usan para tareas y atajos, sin entender cuándo es honesto usarla y cuándo no." },
  { num: "02", titulo: "El colegio no tiene una postura clara", texto: "Mientras se debate prohibir o permitir, los alumnos siguen usándola por su cuenta." },
  { num: "03", titulo: "Te preocupa la honestidad académica", texto: "Sin formación específica, es fácil que la IA se use para evadir el aprendizaje en lugar de potenciarlo." },
  { num: "04", titulo: "Crees que se necesita un experto técnico", texto: "No. El programa está diseñado para adolescentes sin background técnico, con ejemplos de su propio contexto." },
  { num: "05", titulo: "Buscas algo más que una plática motivacional", texto: "Una conferencia se olvida. Un proyecto documentado y un pitch en vivo se quedan." },
  { num: "06", titulo: "Quieres evidencia real para mostrar a las familias", texto: "Otros colegios ya posicionan esto como innovación visible — con resultados que los padres pueden ver." },
];

const SENTIMIENTOS = [
  { titulo: "Se van a sentir capaces", texto: "Descubren que no necesitan ser expertos en tecnología para usar IA con criterio." },
  { titulo: "Se van a sentir orgullosos", texto: "Salen con un proyecto real terminado, no solo con apuntes de una clase." },
  { titulo: "Se van a sentir con ventaja", texto: "Son la primera generación que entra al mundo académico y laboral ya sabiendo usar IA con honestidad." },
];

const CAPACIDADES = [
  { icon: FileText, titulo: "Documentar un proyecto de portafolio real", texto: "Problema, proceso, resultado y reflexión — compartible y usable en admisiones universitarias." },
  { icon: GraduationCap, titulo: "Usar IA con honestidad académica", texto: "Prompting con criterio para tareas, antes de la técnica — y una biblioteca de 10 prompts académicos." },
  { icon: Award, titulo: "Presentar su primer pitch de 2 minutos", texto: "Comunicar su proyecto con seguridad frente a sus compañeros y la dirección del colegio." },
];

const SESIONES = [
  { tag: "S0", titulo: "Activación Digital", dur: "30 min asíncrono", texto: "Video cinematográfico de oportunidad histórica. Guía visual de configuración en español. La Pregunta del Manifiesto Joven." },
  { tag: "S1", titulo: "La Generación que Llegó Primero", dur: "90 min", texto: "Apertura cinematográfica. Panorama de IA para jóvenes. Mapa de oportunidades académicas y de carrera." },
  { tag: "S2", titulo: "El Arte de Hablar con IA con Criterio", dur: "2 horas", texto: "Honestidad académica con IA antes de la técnica. Prompting para estudiantes. Biblioteca de 10 Prompts académicos." },
  { tag: "S3", titulo: "Mi Primer Proyecto con IA", dur: "2 horas", texto: "Diseño del proyecto de portafolio. Construcción en vivo. Preparación del pitch de 2 minutos." },
];

const SI_ES = [
  "Tu colegio quiere dar a sus alumnos una ventaja real para su futuro académico y laboral.",
  "Tus alumnos ya usan IA para tareas, pero sin criterio ni honestidad académica.",
  "Buscas un entregable institucional documentado, no solo una plática motivacional.",
  "Quieres un proyecto que los padres vean y genere boca a boca para tu institución.",
];

const NO_ES = [
  "Buscas solo una conferencia de una hora sin construcción práctica.",
  "No te interesa un seguimiento ni un reporte institucional de resultados.",
  "Prefieres prohibir el uso de IA en lugar de formar criterio en tus alumnos.",
  "No tienes 6.5 horas presenciales disponibles para el grupo.",
];

const CREDENCIALES = [
  { icon: Target, texto: "Fundadora de Loreto Consultora y creadora de VictorIA Academy" },
  { icon: Zap, texto: "Diseña el programa institucional VictorIA Joven para colegios y fundaciones" },
  { icon: ShieldCheck, texto: "Entrega un reporte formal a la dirección académica al cierre" },
  { icon: CheckCircle2, texto: "Crea el escalamiento natural hacia Semillero VictorIA" },
];

const FAQS = [
  { q: "¿Para qué edades es VictorIA Joven?", a: "Está diseñado para secundaria, preparatoria y universidad — el contenido y los ejemplos se adaptan al grado académico del grupo." },
  { q: "¿Cómo se contrata para mi colegio?", a: "Es una implementación institucional B2B para grupo escolar completo. Tras tu solicitud, agendamos una llamada para conocer las necesidades de tu institución." },
  { q: "¿Qué recibe la dirección académica al final?", a: "Un Reporte Institucional de Resultados: métricas de participación, proyectos destacados y evidencia del showcase final." },
  { q: "¿Qué se lleva cada alumno?", a: "Su portafolio documentado y su Manifiesto Personal Joven impreso — el primer touchpoint que ven los padres." },
  { q: "¿Hay un siguiente paso después del taller?", a: "Sí. Semillero VictorIA es el destino natural: un programa anual institucional con licencia, materiales y certificación de facilitador interno." },
];

export default function VictoriaJovenPage() {
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
                Programa VictorIA Joven
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="font-extrabold text-4xl sm:text-5xl mb-5 tracking-tight"
                style={{ lineHeight: 1.05, color: HEAD }}
              >
                La nueva forma de <span style={{ color: ACCENT }}>EDUCAR</span> con IA.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg leading-relaxed mb-4"
                style={{ color: GRIS, opacity: 0.85 }}
              >
                Enseña a tus alumnos a usar la inteligencia artificial para construir un proyecto real con criterio y honestidad académica.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="text-sm leading-relaxed mb-6"
                style={{ color: GRIS, opacity: 0.7 }}
              >
                En este programa vive la experiencia de co crear con la IA para formar a la primera generación con criterio, y logra que cada alumno presente su propio proyecto documentado.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-start gap-3 mb-7 rounded-xl p-4"
                style={{ border: "1px solid rgba(58,63,75,0.1)" }}
              >
                <CalendarDays size={18} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: HEAD }}>Agenda tu Entrenamiento en tu Institución</p>
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-1" style={{ color: GRIS, opacity: 0.6 }}>
                    <span className="flex items-center gap-1.5"><Clock size={11} /> 6.5 horas</span>
                    <span>Implementación presencial</span>
                    <span>Grupos de 25-30 alumnos</span>
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
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "1 / 1" }}
            >
              <Image src="/victoria-academy/hero-joven.png" alt="VictorIA Joven" fill className="object-cover" />
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
              Agenda este verano y tu colegio entra gratis a una masterclass más.
            </h2>
            <div className="rounded-2xl bg-white p-6 sm:p-7 flex items-start gap-4 text-left" style={{ border: "1px solid rgba(58,63,75,0.1)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}15` }}>
                <Gift size={20} style={{ color: ACCENT }} />
              </div>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: HEAD }}>Masterclass de Creación de Contenidos con IA</p>
                <p className="text-sm leading-relaxed" style={{ color: GRIS, opacity: 0.8 }}>
                  Aprende a crear avatares con IA y edición profesional para impulsar tu trabajo con creatividad. Incluido sin costo adicional al agendar en junio o julio.
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
              ¿Por qué tus alumnos usan IA sin que nadie les enseñe a usarla bien?
            </h2>
            <p className="text-sm sm:text-base" style={{ color: GRIS, opacity: 0.7 }}>Si te reconoces en uno de estos puntos, este programa es para tu colegio.</p>
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
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Lo que se va a llevar tu institución</p>
              <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: HEAD, lineHeight: 1.1 }}>
                La forma en que tus alumnos aprenden cambia aquí
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: GRIS, opacity: 0.8 }}>
                Esto no es una conferencia más. Es donde tus alumnos por fin entienden cómo usar IA con criterio y honestidad académica, sin complicarse y sin saber programar. Vienen a construir en vivo su primer proyecto real con IA, frente a sus compañeros y la dirección de tu colegio.
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

        {/* Cómo se van a sentir / Qué van a poder hacer */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-0 sm:divide-x" style={{ borderColor: "rgba(58,63,75,0.1)" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="sm:pr-10">
              <h3 className="font-extrabold text-2xl mb-6 tracking-tight" style={{ color: HEAD }}>Cómo se van a sentir tus alumnos después</h3>
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
              <h3 className="font-extrabold text-2xl mb-6 tracking-tight" style={{ color: HEAD }}>Lo que van a poder hacer después</h3>
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
              <p className="text-sm text-center mb-8" style={{ color: GRIS, opacity: 0.6 }}>Implementación institucional presencial</p>
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
              Este programa es para tu colegio si quieres formar criterio en IA, no solo permitirla o prohibirla.
            </h2>
            <p className="text-sm" style={{ color: GRIS, opacity: 0.65 }}>Antes de avanzar, mira si VictorIA Joven encaja con lo que tu institución necesita.</p>
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
              <p className="font-medium mb-4" style={{ color: HEAD }}>Si te reconociste en 2 o más puntos, este programa es para tu colegio.</p>
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
              <p className="text-[11px] mt-3" style={{ color: GRIS, opacity: 0.6 }}>Implementación para grupo escolar completo, 25-30 alumnos.</p>
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
                Diseña VictorIA Joven como puerta de entrada institucional: un programa que tu colegio puede mostrar a las familias como evidencia de innovación real, no solo discurso.
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
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Lo que dicen los colegios</p>
            <h2 className="font-extrabold text-2xl sm:text-3xl tracking-tight" style={{ color: HEAD }}>
              Resultados reales de instituciones que ya implementaron el programa
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
                Si el reporte institucional no refleja evidencia clara de impacto, ofrecemos una sesión adicional sin costo para cerrar esa brecha. No vendemos un taller — vendemos transformación visible y documentada.
              </p>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-extrabold text-2xl text-center mb-1 tracking-tight" style={{ color: HEAD }}>Resuelve tus dudas</h2>
            <p className="text-sm text-center mb-6" style={{ color: GRIS, opacity: 0.6 }}>Antes de solicitar información para tu colegio</p>
            <Faq items={FAQS} accent={ACCENT} />
          </motion.div>
        </div>

        {/* Cierre final */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#fafbfc" }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Decisión final</p>
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: HEAD, lineHeight: 1.1 }}>
              Otros colegios ya están formando a su primera generación IA.
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: GRIS, opacity: 0.8 }}>
              Mientras algunas instituciones siguen debatiendo si prohibir o permitir la IA, otras ya están formando el criterio de sus alumnos para usarla bien. Una sola sesión puede posicionar a tu colegio como referente de innovación real.
            </p>
            <a
              href="#solicitud"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: GRADIENT, boxShadow: `0 12px 32px ${ACCENT}40` }}
            >
              Solicitar información para mi colegio →
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
              Solicita información para tu colegio
            </h2>
            <p className="text-xs text-center mb-6" style={{ color: GRIS, opacity: 0.6 }}>
              Implementación para grupo escolar completo. Venta institucional B2B.
            </p>
            <SolicitudInfoForm
              programa="VictorIA Joven"
              webhookUrl={WEBHOOK}
              calendlyUrl={CALENDLY}
              gradient={GRADIENT}
              selectField={{ name: "gradoAcademico", label: "Grado académico", options: ["Secundaria", "Preparatoria", "Universidad"] }}
              confirmTitle="¡Listo! Tu solicitud fue recibida."
              confirmText="Nuestro equipo te contactará para agendar una breve llamada y conocer las necesidades de tu institución."
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
