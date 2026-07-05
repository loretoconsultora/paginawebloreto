"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, XCircle, Clock, FileText, Award, GraduationCap, ChevronDown, CalendarDays, Star } from "lucide-react";
import { motion } from "framer-motion";
import LandingHeader from "@/components/victoria-academy/LandingHeader";
import Faq from "@/components/victoria-academy/Faq";
import Footer from "@/components/layout/Footer";
import SolicitudInfoForm from "@/components/victoria-academy/SolicitudInfoForm";
import SolicitudModal from "@/components/victoria-academy/SolicitudModal";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";
const ACCENT = "#1f8a8c";
const HEAD = "#1a1f24";
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_VICTORIA_JOVEN_WEBHOOK ?? "";
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_JOVEN ?? "";

const BARRERA = [
  { num: "01", texto: "Las universidades y empresas ya están seleccionando candidatos que saben usar IA con criterio. Tus alumnos compiten hoy por esos lugares." },
  { num: "02", texto: "La ventana para ser de las primeras instituciones en ofrecer esta formación es ahora. Quien espera, cede el diferenciador a otra escuela." },
  { num: "03", texto: "Los padres buscan evidencia de que su inversión educativa prepara a sus hijos para el mundo real. Este programa les da exactamente eso." },
];

const PROBLEMAS = [
  { num: "01", titulo: "Activación y panorama de IA", texto: "Tus alumnos descubren el mapa de oportunidades académicas y de carrera que la IA abre para su generación — con criterio, no con miedo." },
  { num: "02", titulo: "Honestidad académica antes que técnica", texto: "Aprenden cuándo y cómo es honesto usar IA en sus tareas, con una biblioteca de 10 prompts académicos listos para usar." },
  { num: "03", titulo: "Proyecto real de portafolio", texto: "Cada alumno construye y documenta su propio proyecto en vivo — en formato compartible para admisiones universitarias y redes." },
  { num: "04", titulo: "Pitch de 2 minutos frente al grupo", texto: "Presentan su proyecto con seguridad ante sus compañeros y la dirección del colegio. Primera experiencia de comunicación profesional." },
  { num: "05", titulo: "Manifiesto Personal Joven impreso", texto: "Cada estudiante se lleva a casa su primera declaración de identidad digital — el touchpoint que los padres ven y que genera boca a boca." },
  { num: "06", titulo: "Reporte institucional para la dirección", texto: "La dirección académica recibe evidencia formal: métricas, proyectos destacados y material listo para comunicación institucional." },
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
  "No tienes 3 horas presenciales disponibles para el grupo.",
];

const FAQS = [
  { q: "¿Para qué edades es VictorIA Joven?", a: "Está diseñado para secundaria, preparatoria y universidad — el contenido y los ejemplos se adaptan al grado académico del grupo." },
  { q: "¿Cómo se contrata para mi colegio?", a: "Es una implementación institucional B2B para grupo escolar completo. Tras tu solicitud, agendamos una llamada para conocer las necesidades de tu institución." },
  { q: "¿Qué recibe la dirección académica al final?", a: "Un Reporte Institucional de Resultados: métricas de participación, proyectos destacados y evidencia del showcase final." },
  { q: "¿Qué se lleva cada alumno?", a: "Su portafolio documentado y su Manifiesto Personal Joven impreso — el primer touchpoint que ven los padres." },
  { q: "¿Hay un siguiente paso después del taller?", a: "Sí. Semillero VictorIA es el destino natural: un programa anual institucional con licencia, materiales y certificación de facilitador interno." },
];

export default function VictoriaJovenPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <LandingHeader accent={ACCENT} onApply={() => setModalOpen(true)} />
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
                style={{ color: HEAD, opacity: 0.85 }}
              >
                Forma a tus alumnos con las habilidades de IA que el mundo ya exige y que pocas escuelas en México están enseñando.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="text-sm leading-relaxed mb-6"
                style={{ color: HEAD, opacity: 0.7 }}
              >
                Tus alumnos vivirán la experiencia de co-crear con IA desde cero, desarrollando un proyecto real para su comunidad y construyendo las habilidades que el mercado laboral y las universidades más competitivas ya están buscando en la próxima generación.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-start gap-3 mb-7 rounded-xl p-4"
                style={{ border: "1px solid rgba(58,63,75,0.1)" }}
              >
                <CalendarDays size={18} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: HEAD }}>Agenda tu Entrenamiento en tu Institución</p>
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-1" style={{ color: HEAD, opacity: 0.6 }}>
                    <span className="flex items-center gap-1.5"><Clock size={11} /> 3 horas</span>
                    <span>Implementación presencial</span>
                    <span>Grupos de 25-30 alumnos</span>
                  </p>
                </div>
              </motion.div>
              <motion.button
                onClick={() => setModalOpen(true)}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
                style={{ background: GRADIENT, boxShadow: `0 12px 32px ${ACCENT}40` }}
              >
                Solicitar Programa →
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full lg:scale-125 lg:-mr-10"
              style={{ aspectRatio: "1 / 1" }}
            >
              <Image src="/victoria-academy/hero-joven.png" alt="VictorIA Joven" fill className="object-contain" />
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-10 text-center">
            <ChevronDown size={20} className="mx-auto animate-bounce" style={{ color: HEAD, opacity: 0.4 }} />
          </motion.div>
        </section>

        {/* La barrera de entrada desapareció */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#0a0a0a" }}>
          <div className="max-w-6xl mx-auto text-left">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 text-center" style={{ color: ACCENT }}>
              3 razones para actuar ahora
            </p>
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-6 tracking-tight text-white text-center" style={{ lineHeight: 1.15 }}>
              Tu institución, formando a los<br />profesionistas que moldearán el futuro
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-12 text-center max-w-3xl mx-auto" style={{ color: "#ffffff", opacity: 0.7 }}>
              En solo 3 horas, tu institución puede darles lo que pocas escuelas ofrecen: criterio, ética y ventaja real. Una inversión que los padres reconocen, la comunidad valora y que posiciona a tu escuela como referente de innovación educativa.
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
            <div className="text-center">
              <p className="text-sm sm:text-base font-bold text-white mb-6" style={{ opacity: 0.9 }}>
                Tu institución puede ser de las primeras en dar este paso. ¿Agendamos una llamada?
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: GRADIENT }}
              >
                Solicitar información para mi institución →
              </button>
            </div>
          </div>
        </section>

        {/* Reencuadre del problema */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Conoce tu próximo programa</p>
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: HEAD, lineHeight: 1.15 }}>
              Lo que tus alumnos van a aprender, crear y llevarse.
            </h2>
            <p className="text-sm sm:text-base" style={{ color: HEAD, opacity: 0.7 }}>6 experiencias clave que transforman cómo tus alumnos entienden y usan la IA — con resultados reales el mismo día.</p>
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
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Lo que se va a llevar tu institución</p>
              <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: HEAD, lineHeight: 1.1 }}>
                La forma en que tus alumnos aprenden<br /><span style={{ color: ACCENT }}>cambia aquí</span>
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.8 }}>
                Esto no es una conferencia más. Es donde tus alumnos por fin entienden cómo usar IA con criterio y honestidad académica, sin complicarse y sin saber programar. Vienen a construir en vivo su primer proyecto real con IA, frente a sus compañeros y la dirección de tu colegio.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cómo se van a sentir / Qué van a poder hacer */}
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
                <h3 className="font-extrabold text-xl sm:text-2xl tracking-tight" style={{ color: HEAD }}>Cómo se van a sentir tus alumnos después</h3>
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
              Este programa es para tu colegio si quieres formar criterio en IA, no solo permitirla o prohibirla.
            </h2>
            <p className="text-sm text-white" style={{ opacity: 0.6 }}>Antes de avanzar, mira si VictorIA Joven encaja con lo que tu institución necesita.</p>
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
              className="rounded-2xl p-6 mb-6 flex items-center gap-3 justify-center"
              style={{ background: ACCENT, boxShadow: `0 0 60px ${ACCENT}50` }}
            >
              <CheckCircle2 size={20} className="flex-shrink-0 text-white" />
              <p className="font-medium text-white text-left">
                Si te reconociste en al menos dos puntos de la columna izquierda, este programa es exactamente para tu colegio.
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: GRADIENT, color: "#ffffff" }}
            >
              Solicitar información →
            </button>
          </motion.div>
        </section>

        {/* Prueba social — pendiente: subir capturas reales de testimonios */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
              <span className="w-8 h-px" style={{ background: ACCENT }} />
              Prueba social
              <span className="w-8 h-px" style={{ background: ACCENT }} />
            </p>
            <h2 className="font-extrabold text-2xl sm:text-3xl tracking-tight mb-4" style={{ color: HEAD }}>
              Lo que dicen instituciones que han{" "}
              <span style={{ color: ACCENT }} className="italic">implementado el programa.</span>
            </h2>
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} fill={ACCENT} style={{ color: ACCENT }} />
              ))}
              <span className="text-xs font-semibold uppercase tracking-wide ml-2" style={{ color: HEAD, opacity: 0.5 }}>
                Valoración promedio de asistentes
              </span>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <Image
              src="/victoria-academy/testimonios-victoria-academy.png"
              alt="Testimonios de instituciones que han implementado el programa"
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
            />
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 flex flex-col gap-10">
          {/* Garantía */}
          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: ACCENT }}>Preguntas frecuentes</p>
            <h2 className="font-extrabold text-2xl sm:text-3xl text-center mb-6 tracking-tight" style={{ color: HEAD }}>
              Resuelve tus dudas antes de solicitar información
            </h2>
            <Faq items={FAQS} accent={ACCENT} />
          </motion.div>
        </div>

        {/* Cierre final */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#0d1217" }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6A8AFF" }}>Decisión final</p>
              <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight text-white" style={{ lineHeight: 1.1 }}>
                Otros colegios ya están formando a su primera generación IA.
              </h2>
              <p className="text-base leading-relaxed mb-8 text-white" style={{ opacity: 0.8 }}>
                Aprende a operar y crecer con IA. Ya puedes aprender a hacerlo con un sólo programa y pasar de la urgencia y reactividad a la verdadera proactividad. Co crea el futuro de tu institución con tu propio sistema y la más última tecnología.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
                style={{ background: GRADIENT, boxShadow: `0 12px 32px ${ACCENT}40` }}
              >
                Solicitar información para mi colegio →
              </button>
            </div>
            <div className="rounded-2xl bg-white p-3 sm:p-4" style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}>
              <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/victoria-academy/decision-final-joven.png"
                  alt="Estudiantes de VictorIA Joven trabajando con IA"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SolicitudModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="font-extrabold text-xl text-center mb-6 tracking-tight" style={{ color: ACCENT }}>
          Solicita información para tu colegio
        </h2>
        <SolicitudInfoForm
          programa="VictorIA Joven"
          webhookUrl={WEBHOOK}
          calendlyUrl={CALENDLY}
          gradient={GRADIENT}
          selectField={{ name: "gradoAcademico", label: "Grado académico", options: ["Secundaria", "Preparatoria", "Universidad"] }}
          confirmTitle="Registro Completado"
          confirmText="Nuestro equipo te contactará para confirmar tu llamada de aplicación y conocer las necesidades de tu institución."
        />
      </SolicitudModal>
      <Footer />
    </>
  );
}
