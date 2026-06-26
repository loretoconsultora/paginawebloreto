"use client";

import Image from "next/image";
import { CheckCircle2, XCircle, Sparkles, Clock, FileText, Award, GraduationCap, ShieldCheck, ChevronDown, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import LandingHeader from "@/components/victoria-academy/LandingHeader";
import Faq from "@/components/victoria-academy/Faq";
import Footer from "@/components/layout/Footer";
import SolicitudInfoForm from "@/components/victoria-academy/SolicitudInfoForm";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";
const ACCENT = "#1f8a8c";
const DARK = "#171b1f";
const GRIS = "#445055";
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_VICTORIA_JOVEN_WEBHOOK ?? "";
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_JOVEN ?? "";
// TODO: precio real pendiente de confirmar — dejar vacío oculta el ancla de precio
const PRECIO = "";

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
      <LandingHeader badge="Implementación institucional · Cupo limitado" />
      <main className="min-h-screen" style={{ background: "#fafafa" }}>

        {/* Hero */}
        <section className="pt-16 pb-16 text-center px-4 sm:px-6" style={{ background: GRADIENT }}>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <Sparkles size={13} className="text-white" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">VictorIA Academy · Joven</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-3xl sm:text-5xl font-bold mb-4 text-white"
              style={{ lineHeight: 1.2 }}
            >
              Convierte a tus alumnos en la Primera Generación IA.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/85 text-base sm:text-lg leading-relaxed mb-2"
            >
              Un programa institucional presencial para colegios privados y fundaciones educativas. En 6.5 horas, cada estudiante construye su primer proyecto real con IA y se lleva su portafolio documentado.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-6">
              <ChevronDown size={22} className="text-white/70 mx-auto animate-bounce" />
            </motion.div>
          </div>
        </section>

        {/* Reencuadre del problema */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 relative z-10"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <p className="text-sm leading-relaxed mb-3" style={{ color: GRIS, opacity: 0.8 }}>
              Los alumnos de hoy ya usan IA todos los días — para tareas, para curiosidad, para atajos. Lo que casi ninguno tiene es criterio: cuándo usarla, cómo usarla con honestidad académica, y cómo convertirla en una ventaja real para su futuro.
            </p>
            <p className="font-playfair text-lg font-bold" style={{ color: GRIS }}>
              VictorIA Joven es la puerta de entrada a esa generación con criterio.
            </p>
          </motion.div>
        </div>

        {/* Lo que te vas a llevar */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Lo que se va a llevar tu institución</p>
            <h2 className="font-playfair text-3xl font-bold mb-4" style={{ color: GRIS, lineHeight: 1.2 }}>
              La forma en que tus alumnos aprenden cambia aquí
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: GRIS, opacity: 0.75 }}>
              Esto no es una conferencia más. Es donde tus alumnos por fin entienden cómo usar IA con criterio y honestidad académica, sin complicarse y sin saber programar. Vienen a construir en vivo su primer proyecto real con IA, frente a sus compañeros y la dirección de tu colegio.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex justify-center">
            <div className="relative w-full max-w-xs rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.12)" }}>
              <Image src="/loreto-directora.jpg" alt="Loreto — Directora de Loreto Consultora" width={400} height={500} className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: ACCENT, boxShadow: "0 8px 20px rgba(31,138,140,0.4)" }}>
              <Target size={18} className="text-white" />
            </div>
            <div className="absolute bottom-10 -right-3 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#67C6C8", boxShadow: "0 8px 20px rgba(103,198,200,0.4)" }}>
              <Zap size={16} className="text-white" />
            </div>
          </motion.div>
        </div>

        {/* Cómo te vas a sentir / Qué vas a poder hacer */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl p-6 sm:p-7 bg-white" style={{ border: "1px solid rgba(58,63,75,0.08)" }}>
            <h3 className="font-playfair text-xl font-bold mb-5" style={{ color: GRIS }}>Cómo se van a sentir tus alumnos después</h3>
            <div className="flex flex-col gap-4">
              {SENTIMIENTOS.map((s) => (
                <div key={s.titulo} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: GRIS }}>{s.titulo}</p>
                    <p className="text-xs leading-relaxed" style={{ color: GRIS, opacity: 0.65 }}>{s.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl p-6 sm:p-7" style={{ background: DARK }}>
            <h3 className="font-playfair text-xl font-bold mb-5 text-white">Lo que van a poder hacer después</h3>
            <div className="flex flex-col gap-4">
              {CAPACIDADES.map((c) => (
                <div key={c.titulo} className="flex items-start gap-3">
                  <c.icon size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#67C6C8" }} />
                  <div>
                    <p className="text-sm font-semibold text-white">{c.titulo}</p>
                    <p className="text-xs leading-relaxed text-white/55">{c.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sesiones */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-playfair text-2xl font-bold text-center mb-1" style={{ color: GRIS }}>La experiencia del taller</h2>
            <p className="text-sm text-center mb-6" style={{ color: GRIS, opacity: 0.5 }}>6.5 horas · Implementación institucional presencial</p>
            <div className="flex flex-col gap-3">
              {SESIONES.map((s) => (
                <div key={s.tag} className="flex gap-4 rounded-xl p-4 bg-white" style={{ border: "1px solid rgba(58,63,75,0.08)" }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm text-white" style={{ background: GRADIENT }}>
                    {s.tag}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm" style={{ color: GRIS }}>{s.titulo}</h3>
                      <span className="flex items-center gap-1 text-[11px]" style={{ color: GRIS, opacity: 0.45 }}>
                        <Clock size={11} /> {s.dur}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: GRIS, opacity: 0.6 }}>{s.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Para quién es */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: DARK }}>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#67C6C8" }}>Para quién es</p>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-3" style={{ lineHeight: 1.3 }}>
              Este programa es para tu colegio si quieres formar criterio en IA, no solo permitirla o prohibirla.
            </h2>
            <p className="text-sm text-white/60">Antes de avanzar, mira si VictorIA Joven encaja con lo que tu institución necesita.</p>
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${ACCENT}55` }}>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={20} style={{ color: "#67C6C8" }} />
                <h3 className="font-bold text-white">Para quién SÍ es</h3>
              </div>
              <div className="flex flex-col gap-3">
                {SI_ES.map((t) => (
                  <div key={t} className="flex items-start gap-2 text-sm text-white/75">
                    <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#67C6C8" }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-2 mb-4">
                <XCircle size={20} className="text-white/40" />
                <h3 className="font-bold text-white/70">Para quién NO es</h3>
              </div>
              <div className="flex flex-col gap-3">
                {NO_ES.map((t) => (
                  <div key={t} className="flex items-start gap-2 text-sm text-white/45">
                    <XCircle size={14} className="flex-shrink-0 mt-0.5 text-white/30" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Micro CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto mt-10 text-center">
            <div className="rounded-2xl p-6" style={{ background: ACCENT, boxShadow: `0 12px 40px ${ACCENT}55` }}>
              <p className="text-white font-medium mb-4">Si te reconociste en 2 o más puntos, este programa es para tu colegio.</p>
              {PRECIO && (
                <p className="text-white/90 text-sm mb-3">
                  Inversión: <span className="font-bold">{PRECIO}</span>
                </p>
              )}
              <a
                href="#solicitud"
                className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                style={{ background: "white", color: ACCENT }}
              >
                Solicitar información →
              </a>
              <p className="text-[11px] text-white/70 mt-2">Implementación para grupo escolar completo</p>
            </div>
          </motion.div>
        </section>

        {/* Autoridad */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 text-white" style={{ background: DARK }}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 items-start">
            <div className="rounded-2xl overflow-hidden mx-auto" style={{ width: 200 }}>
              <Image src="/loreto-directora.jpg" alt="Loreto — Directora de Loreto Consultora" width={200} height={250} className="w-full h-auto object-cover" />
            </div>
            <div>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold mb-2">
                Loreto, <span className="italic">Directora de Loreto Consultora</span>
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Diseña VictorIA Joven como puerta de entrada institucional: un programa que tu colegio puede mostrar a las familias como evidencia de innovación real, no solo discurso.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CREDENCIALES.map((c) => (
                  <div key={c.texto} className="flex items-start gap-3">
                    <c.icon size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#67C6C8" }} />
                    <p className="text-sm text-white/75">{c.texto}</p>
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
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold" style={{ color: GRIS }}>
              Resultados reales de instituciones que ya implementaron el programa
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl flex items-center justify-center text-center p-6"
                style={{ border: "1px dashed rgba(58,63,75,0.25)", minHeight: 180, color: GRIS, opacity: 0.4 }}
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
            className="flex items-start gap-4 rounded-2xl p-6 bg-white"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <ShieldCheck size={28} style={{ color: ACCENT }} className="flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-playfair text-lg font-bold mb-1" style={{ color: GRIS }}>Garantía de Experiencia VictorIA</h3>
              <p className="text-sm leading-relaxed" style={{ color: GRIS, opacity: 0.7 }}>
                Si el reporte institucional no refleja evidencia clara de impacto, ofrecemos una sesión adicional sin costo para cerrar esa brecha. No vendemos un taller — vendemos transformación visible y documentada.
              </p>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-playfair text-2xl font-bold text-center mb-1" style={{ color: GRIS }}>Resuelve tus dudas</h2>
            <p className="text-sm text-center mb-6" style={{ color: GRIS, opacity: 0.5 }}>Antes de solicitar información para tu colegio</p>
            <Faq items={FAQS} accent={ACCENT} />
          </motion.div>
        </div>

        {/* Cierre final */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: DARK }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#67C6C8" }}>Decisión final</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4" style={{ lineHeight: 1.2 }}>
              Otros colegios ya están formando a su primera generación IA.
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Mientras algunas instituciones siguen debatiendo si prohibir o permitir la IA, otras ya están formando el criterio de sus alumnos para usarla bien. Una sola sesión puede posicionar a tu colegio como referente de innovación real.
            </p>
            <a
              href="#solicitud"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: GRADIENT, boxShadow: "0 12px 32px rgba(31,138,140,0.4)" }}
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
            <h2 className="font-playfair text-xl font-bold text-center mb-1" style={{ color: "#3E7ECA" }}>
              Solicita información para tu colegio
            </h2>
            <p className="text-xs text-center mb-6" style={{ color: GRIS, opacity: 0.5 }}>
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
