"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, XCircle, Clock, Library, Map as MapIcon, ScrollText, ChevronDown, CalendarDays, Star } from "lucide-react";
import { motion } from "framer-motion";
import LandingHeader from "@/components/victoria-academy/LandingHeader";
import Faq from "@/components/victoria-academy/Faq";
import Footer from "@/components/layout/Footer";
import SolicitudInfoForm from "@/components/victoria-academy/SolicitudInfoForm";
import SolicitudModal from "@/components/victoria-academy/SolicitudModal";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";
const ACCENT = "#6A8AFF";
const HEAD = "#1a1f24";
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_VICTORIA_ELITE_WEBHOOK ?? "";

const BARRERA = [
  { num: "01", texto: "Antes liderar la adopción de IA exigía un equipo de consultores externos. Hoy basta una sesión estratégica con el criterio correcto." },
  { num: "02", texto: "Antes construir un roadmap ejecutivo tomaba meses de consultoría. Hoy se logra en un solo programa que termina con un documento presentable a tu consejo." },
  { num: "03", texto: "Antes la ventaja competitiva con IA era solo para corporativos grandes. Hoy cualquier líder con visión puede construirla." },
];

const BONOS = [
  { num: "1", texto: "Sesión de seguimiento estratégico trimestral durante tu primer año en la Comunidad VictorIA Elite." },
  { num: "2", texto: "Auditoría de IA de 1 hora para tu organización, antes de tu llamada de pre-admisión." },
  { num: "3", texto: "Acceso prioritario a futuras ediciones y nuevos contenidos ejecutivos de VictorIA." },
];

const PROBLEMAS = [
  { num: "01", titulo: "Decides sobre IA sin tener claridad", texto: "Sientes la presión de tomar decisiones estratégicas sobre IA sin un marco claro para hacerlo." },
  { num: "02", titulo: "Te falta un grupo de pares real", texto: "Los webinars masivos no te dan el espacio para discutir tu caso con gente en tu mismo nivel de decisión." },
  { num: "03", titulo: "No tienes un roadmap presentable", texto: "Tienes ideas sueltas sobre IA, pero nada que puedas llevar a tu consejo o socios." },
  { num: "04", titulo: "Tu equipo se resiste al cambio", texto: "Sabes que liderar la adopción de IA sin generar resistencia es tan importante como la tecnología misma." },
  { num: "05", titulo: "No sabes priorizar por ROI", texto: "Hay decenas de casos de uso posibles, pero no tienes claro cuáles mueven la aguja primero." },
  { num: "06", titulo: "Tu competencia ya recuperó horas", texto: "Mientras otros directivos ya construyen su ventaja competitiva, tú sigues postergando la decisión." },
];

const SENTIMIENTOS = [
  { titulo: "Te sentirás al mando", texto: "Dejas de reaccionar a la IA y empiezas a dirigir su adopción con una estrategia clara." },
  { titulo: "Te sentirás respaldado", texto: "No estás solo: tienes un grupo íntimo de pares y una facilitadora que conoce tu caso desde antes." },
  { titulo: "Te sentirás adelantado", texto: "Mientras otros directivos siguen postergando, tú ya tienes un roadmap presentable a tu consejo." },
];

const CAPACIDADES = [
  { icon: MapIcon, titulo: "Presentar un AI Roadmap ejecutivo", texto: "Documento de alta producción, listo para tu consejo, socios o equipo directivo." },
  { icon: ScrollText, titulo: "Priorizar las oportunidades de mayor ROI", texto: "Use-Case Workbook con impacto estimado, herramienta y timeline para los próximos 6 meses." },
  { icon: Library, titulo: "Resolver tus contextos más frecuentes con IA", texto: "Biblioteca ejecutiva de 10 prompts: directorio, análisis de mercado, brief de equipo, evaluación de propuesta." },
];

const SI_ES = [
  "Eres directivo, CEO o dueño de negocio y sientes la presión de decidir sobre IA sin tener claridad.",
  "Quieres un grupo íntimo de pares, no un salón de 50 personas.",
  "Buscas un roadmap presentable a tu consejo, no solo inspiración.",
  "Estás dispuesto a una llamada de pre-admisión para asegurar que el grupo sea el correcto para ti.",
];

const NO_ES = [
  "Buscas una certificación masiva sin acompañamiento personal.",
  "No tienes autoridad para decidir sobre la adopción de IA en tu organización.",
  "Prefieres seguir delegando la decisión y esperar a ver qué hace la competencia.",
  "Solo te interesa una plática motivacional, no un documento de trabajo.",
];

const FAQS = [
  { q: "¿Por qué hay una llamada de pre-admisión?", a: "Porque los grupos son íntimos (10-12 personas) y el fit importa: queremos asegurarnos de que el programa resuelve tu contexto antes de que ocupes un lugar." },
  { q: "¿Dónde se imparte?", a: "Presencial en ciudades clave: CDMX, Monterrey, Guadalajara y Querétaro. Confirmamos la sede exacta al validar tu lugar." },
  { q: "¿Cuándo abren las puertas?", a: "VictorIA Elite abre sus formaciones el 7, 9 y 14 de septiembre. Al unirte a la lista de espera, recibes tu invitación antes que el público general." },
  { q: "¿Qué pasa después del taller?", a: "Incluye acceso a la Comunidad VictorIA Elite, sesión de actualización estratégica trimestral y 30 días de seguimiento estructurado." },
  { q: "¿Y si no obtengo un roadmap usable?", a: "Tenemos Garantía de Experiencia VictorIA: si no sales con un AI Roadmap usable para tu organización, ofrecemos una sesión adicional sin costo." },
];

export default function VictoriaElitePage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <LandingHeader accent={ACCENT} onApply={() => setModalOpen(true)} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="relative overflow-hidden pt-12 sm:pt-16 pb-10 px-4 sm:px-6">
          <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full pointer-events-none" style={{ background: ACCENT, opacity: 0.16, filter: "blur(90px)" }} />
          <div className="absolute top-10 -right-20 w-96 h-96 rounded-full pointer-events-none" style={{ background: "#67C6C8", opacity: 0.14, filter: "blur(100px)" }} />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full pointer-events-none" style={{ background: "#3E7ECA", opacity: 0.12, filter: "blur(90px)" }} />
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full mb-6 text-xs font-medium"
                style={{ border: "1px solid rgba(58,63,75,0.18)", color: HEAD }}
              >
                Programa VictorIA Elite
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="font-extrabold text-4xl sm:text-5xl mb-5 tracking-tight"
                style={{ lineHeight: 1.05, color: HEAD }}
              >
                La nueva forma de <span style={{ color: ACCENT }}>LIDERAR</span> tu negocio con IA.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg leading-relaxed mb-4"
                style={{ color: HEAD, opacity: 0.85 }}
              >
                Aprende a usar la inteligencia artificial para tomar decisiones estratégicas y construir tu ventaja competitiva de 18-36 meses.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="text-sm leading-relaxed mb-6"
                style={{ color: HEAD, opacity: 0.7 }}
              >
                En este programa vive la experiencia de co crear con la IA para liderar con claridad, y logra un AI Roadmap ejecutivo presentable a tu consejo o socios.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-start gap-3 mb-7 rounded-xl p-4"
                style={{ border: "1px solid rgba(58,63,75,0.1)" }}
              >
                <CalendarDays size={18} className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: HEAD }}>Únete a la Lista de Espera · Formaciones 7, 9 y 14 de septiembre</p>
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-1" style={{ color: HEAD, opacity: 0.6 }}>
                    <span className="flex items-center gap-1.5"><Clock size={11} /> 6.5 horas + pre-admisión</span>
                    <span>Presencial · CDMX, MTY, GDL, QRO</span>
                    <span>Grupos de 10-12 personas</span>
                  </p>
                </div>
              </motion.div>
              <motion.button
                onClick={() => setModalOpen(true)}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
                style={{ background: GRADIENT, boxShadow: `0 12px 32px ${ACCENT}40` }}
              >
                Unirme a la lista de espera →
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full lg:scale-125 lg:-mr-10"
              style={{ aspectRatio: "1 / 1" }}
            >
              <Image src="/victoria-academy/hero-elite.png" alt="VictorIA Elite" fill className="object-contain" />
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-10 text-center">
            <ChevronDown size={20} className="mx-auto animate-bounce" style={{ color: HEAD, opacity: 0.4 }} />
          </motion.div>
        </section>

        {/* Bono de inscripción */}
        <section className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#fafbfc" }}>
          <div className="absolute top-1/4 -right-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "#67C6C8", opacity: 0.18, filter: "blur(100px)" }} />
          <div className="absolute -bottom-16 left-10 w-72 h-72 rounded-full pointer-events-none" style={{ background: "#3E7ECA", opacity: 0.12, filter: "blur(90px)" }} />
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
                Disponible sólo para la Lista de Espera Fundadora
              </p>
              <h2 className="font-extrabold text-3xl sm:text-4xl mb-6 tracking-tight" style={{ color: HEAD, lineHeight: 1.15 }}>
                Más de <span style={{ color: ACCENT }}>USD 1,500 de Bonificación</span>. Una sóla condición: Unirte antes de las formaciones del 7, 9 y 14 de septiembre.
              </h2>
              <p className="text-sm mb-6" style={{ color: HEAD, opacity: 0.8 }}>
                Al unirte a la lista de espera de VictorIA Elite, recibe:
              </p>
              <div className="space-y-4 mb-6">
                {BONOS.map((b) => (
                  <div key={b.num} className="rounded-2xl p-5 flex items-start gap-4 text-left" style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}40` }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold text-sm text-white" style={{ background: ACCENT }}>
                      {b.num}
                    </div>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: HEAD }}>{b.texto}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: HEAD, opacity: 0.6 }}>
                Al confirmar tu lugar en VictorIA Elite te daremos las instrucciones para participar de estos bonos. Los bonos no se reasignan.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative w-full"
              style={{ aspectRatio: "3 / 2" }}
            >
              <Image src="/victoria-academy/bono-profesional.png" alt="Bono de la lista de espera VictorIA Elite" fill className="object-contain" />
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
              Liderar con IA hoy no requiere un equipo de consultores.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mb-12" style={{ color: "#ffffff", opacity: 0.7 }}>
              Hoy hay una forma accesible y rápida de construir tu ventaja competitiva. Y esa ventaja está al alcance de cualquier directivo que dedique sólo un programa... incluso si aún no tiene claro totalmente por dónde empezar.
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
              Los directivos que ya tienen un AI Roadmap están a 18-36 meses de ventaja sobre los que aún lo están pensando.
            </p>
          </div>
        </section>

        {/* Reencuadre del problema */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>El problema</p>
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: HEAD, lineHeight: 1.15 }}>
              ¿Por qué sigues postergando la decisión sobre IA?
            </h2>
            <p className="text-sm sm:text-base" style={{ color: HEAD, opacity: 0.7 }}>Si te reconoces en uno de estos puntos, este programa es para ti.</p>
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
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: "#3E7ECA", opacity: 0.1, filter: "blur(90px)" }} />
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Lo que te vas a llevar</p>
              <h2 className="font-extrabold text-3xl sm:text-4xl mb-4 tracking-tight" style={{ color: HEAD, lineHeight: 1.1 }}>
                La forma en que tu empresa decide<br /><span style={{ color: ACCENT }}>cambia aquí</span>
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.8 }}>
                Esto no es un taller corporativo más. Es donde por fin entiendes qué decisiones tomar sobre IA, con qué prioridad, y cómo liderar la adopción sin que tu equipo se resista. Vienes a construir en vivo tu propio AI Roadmap, junto a un grupo íntimo de pares en tu mismo nivel de decisión.
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
                <h3 className="font-extrabold text-xl sm:text-2xl tracking-tight" style={{ color: HEAD }}>Cómo te vas a sentir después</h3>
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
                <h3 className="font-extrabold text-xl sm:text-2xl tracking-tight" style={{ color: HEAD }}>Lo que vas a poder hacer después</h3>
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
              Este programa es para ti si quieres liderar la transición a IA, no improvisarla.
            </h2>
            <p className="text-sm text-white" style={{ opacity: 0.6 }}>Antes de avanzar, mira si VictorIA Elite encaja con tu momento.</p>
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
                Si te reconociste en al menos dos puntos de la columna izquierda, este programa es exactamente para ti.
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: GRADIENT, color: "#ffffff" }}
            >
              Unirme a la lista de espera →
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
              Lo que dicen quienes han asistido a{" "}
              <span style={{ color: ACCENT }} className="italic">programas previos.</span>
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
              alt="Testimonios de líderes que han asistido a programas previos"
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
              Resuelve tus dudas antes de unirte a la lista de espera
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
                Tu competencia no está esperando.
              </h2>
              <p className="text-base leading-relaxed mb-8 text-white" style={{ opacity: 0.8 }}>
                Aprende a operar y crecer con IA. Ya puedes aprender a hacerlo con un sólo programa y pasar de la urgencia y reactividad a la verdadera proactividad. Co crea el futuro de tu organización con tu propio sistema y la más última tecnología.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
                style={{ background: GRADIENT, boxShadow: `0 12px 32px ${ACCENT}40` }}
              >
                Unirme a la lista de espera →
              </button>
            </div>
            <div className="rounded-2xl bg-white p-3 sm:p-4" style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}>
              <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/victoria-academy/decision-final-elite.png"
                  alt="Directivos de VictorIA Elite trabajando con IA"
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
          Únete a la lista de espera de VictorIA Elite
        </h2>
        <SolicitudInfoForm
          programa="VictorIA Elite"
          webhookUrl={WEBHOOK}
          calendlyUrl=""
          gradient={GRADIENT}
          selectField={{ name: "ciudad", label: "Ciudad", options: ["CDMX", "Monterrey", "Guadalajara", "Querétaro"] }}
          submitLabel="Unirme a la lista de espera →"
          confirmTitle="¡Listo! Estás en la lista de espera."
          confirmText="VictorIA Elite abre sus formaciones el 7, 9 y 14 de septiembre. Te contactaremos por WhatsApp para confirmar tu llamada de aplicación y tu lugar."
          waitlistNote="Eres parte de la lista de espera oficial — recibirás tu invitación antes que el público general."
        />
      </SolicitudModal>
      <Footer />
    </>
  );
}
