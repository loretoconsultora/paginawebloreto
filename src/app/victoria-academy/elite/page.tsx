"use client";

import Image from "next/image";
import { CheckCircle2, XCircle, Users, Clock, Library, Map as MapIcon, ScrollText, ShieldCheck, ChevronDown, Sparkles, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import LandingHeader from "@/components/victoria-academy/LandingHeader";
import Faq from "@/components/victoria-academy/Faq";
import Footer from "@/components/layout/Footer";
import SolicitudInfoForm from "@/components/victoria-academy/SolicitudInfoForm";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";
const ACCENT = "#6A8AFF";
const DARK = "#171b1f";
const GRIS = "#445055";
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_VICTORIA_ELITE_WEBHOOK ?? "";

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

const SESIONES = [
  { tag: "S0", titulo: "Activación Estratégica", dur: "45 min", texto: "Video de contexto estratégico con datos McKinsey/BCG. Módulo pregrabado exclusivo: 'Liderazgo Humano en la Transición Tecnológica'." },
  { tag: "LAC", titulo: "Llamada de Pre-Admisión", dur: "20 min", texto: "Llamada personal con la facilitadora antes del taller, para alinear expectativas y garantizar que el programa es el fit correcto." },
  { tag: "S1", titulo: "El Tablero del Líder", dur: "90 min", texto: "Manifiesto de Liderazgo. Panorama estratégico de IA. Mapa de Oportunidades Organizacionales. Primera Mesa de Pares." },
  { tag: "S2", titulo: "Prompt Thinking Ejecutivo", dur: "2 horas", texto: "Prompting para decisiones estratégicas. Casos ejecutivos en vivo: análisis competitivo, reporte de directorio, brief de equipo." },
  { tag: "S3", titulo: "El AI Roadmap Ejecutivo", dur: "2 horas", texto: "Use-Case Workbook ejecutivo. AI Roadmap de 18-36 meses en formato presentable. Mesa Redonda Final." },
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

const CREDENCIALES = [
  { icon: Target, texto: "Fundadora de Loreto Consultora y creadora de VictorIA Academy" },
  { icon: Zap, texto: "Asesora a directivos en la transición de liderazgo hacia la IA" },
  { icon: ShieldCheck, texto: "Filtra cada grupo con una llamada de pre-admisión personal" },
  { icon: CheckCircle2, texto: "Acompaña la implementación, no solo el taller" },
];

const FAQS = [
  { q: "¿Por qué hay una llamada de pre-admisión?", a: "Porque los grupos son íntimos (10-12 personas) y el fit importa: queremos asegurarnos de que el programa resuelve tu contexto antes de que ocupes un lugar." },
  { q: "¿Dónde se imparte?", a: "Presencial en ciudades clave: CDMX, Monterrey, Guadalajara y Querétaro. Confirmamos la sede exacta al validar tu lugar." },
  { q: "¿Cuándo abren las puertas?", a: "VictorIA Elite abre en septiembre. Al unirte a la lista de espera, recibes tu invitación antes que el público general." },
  { q: "¿Qué pasa después del taller?", a: "Incluye acceso a la Comunidad VictorIA Elite, sesión de actualización estratégica trimestral y 30 días de seguimiento estructurado." },
  { q: "¿Y si no obtengo un roadmap usable?", a: "Tenemos Garantía de Experiencia VictorIA: si no sales con un AI Roadmap usable para tu organización, ofrecemos una sesión adicional sin costo." },
];

export default function VictoriaElitePage() {
  return (
    <>
      <LandingHeader badge="Lista de espera · Apertura en septiembre" />
      <main className="min-h-screen" style={{ background: "#fafafa" }}>

        {/* Hero */}
        <section className="pt-16 pb-16 text-center px-4 sm:px-6" style={{ background: GRADIENT }}>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <Users size={13} className="text-white" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">Lista de espera · Apertura en septiembre</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-3xl sm:text-5xl font-bold mb-4 text-white"
              style={{ lineHeight: 1.2 }}
            >
              Hay una brecha que se abre hoy entre tu empresa y la que ya implementó IA.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/85 text-base sm:text-lg leading-relaxed mb-2"
            >
              VictorIA Elite es la experiencia que construye tu ventaja competitiva de 18-36 meses: para directivos, CEOs y dueños de negocio. Grupos íntimos de 10 a 12 personas, presencial en ciudades clave.
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
              El 88% de las organizaciones ya usa IA. Solo el 1% sabe usarla bien. La diferencia no es el acceso a la tecnología — es tener una estrategia clara y un liderazgo que sabe guiar la adopción sin generar resistencia.
            </p>
            <p className="font-playfair text-lg font-bold" style={{ color: GRIS }}>
              Tu competencia ya recuperó horas semanales por persona. ¿Tu organización todavía no?
            </p>
          </motion.div>
        </div>

        {/* Lo que te vas a llevar */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Lo que te vas a llevar</p>
            <h2 className="font-playfair text-3xl font-bold mb-4" style={{ color: GRIS, lineHeight: 1.2 }}>
              La forma en que tu empresa decide cambia aquí
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: GRIS, opacity: 0.75 }}>
              Esto no es un taller corporativo más. Es donde por fin entiendes qué decisiones tomar sobre IA, con qué prioridad, y cómo liderar la adopción sin que tu equipo se resista. Vienes a construir en vivo tu propio AI Roadmap, junto a un grupo íntimo de pares en tu mismo nivel de decisión.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex justify-center">
            <div className="relative w-full max-w-xs rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.12)" }}>
              <Image src="/loreto-directora.jpg" alt="Loreto — Directora de Loreto Consultora" width={400} height={500} className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: ACCENT, boxShadow: "0 8px 20px rgba(106,138,255,0.4)" }}>
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
            <h3 className="font-playfair text-xl font-bold mb-5" style={{ color: GRIS }}>Cómo te vas a sentir después</h3>
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
            <h3 className="font-playfair text-xl font-bold mb-5 text-white">Lo que vas a poder hacer después</h3>
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
            <p className="text-sm text-center mb-6" style={{ color: GRIS, opacity: 0.5 }}>6.5 horas + llamada de pre-admisión personal</p>
            <div className="flex flex-col gap-3">
              {SESIONES.map((s) => (
                <div key={s.tag} className="flex gap-4 rounded-xl p-4 bg-white" style={{ border: "1px solid rgba(58,63,75,0.08)" }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[11px] text-white" style={{ background: GRADIENT }}>
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
              Este programa es para ti si quieres liderar la transición a IA, no improvisarla.
            </h2>
            <p className="text-sm text-white/60">Antes de avanzar, mira si VictorIA Elite encaja con tu momento.</p>
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
              <p className="text-white font-medium mb-4">Si te reconociste en 2 o más puntos, este programa es para ti.</p>
              <a
                href="#solicitud"
                className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                style={{ background: "white", color: ACCENT }}
              >
                Unirme a la lista de espera →
              </a>
              <p className="text-[11px] text-white/70 mt-2">Grupos de 10-12 personas · Apertura en septiembre</p>
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
                Asesora a directivos y dueños de negocio en su transición de liderazgo hacia la IA, con grupos íntimos y una llamada de pre-admisión personal antes de cada cohorte.
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
                Si al terminar el taller no tienes un AI Roadmap usable para tu organización, te ofrecemos una sesión adicional personalizada sin costo para cerrar esa brecha. No es una garantía de devolución de dinero — es una garantía de resultado.
              </p>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-playfair text-2xl font-bold text-center mb-1" style={{ color: GRIS }}>Resuelve tus dudas</h2>
            <p className="text-sm text-center mb-6" style={{ color: GRIS, opacity: 0.5 }}>Antes de unirte a la lista de espera</p>
            <Faq items={FAQS} accent={ACCENT} />
          </motion.div>
        </div>

        {/* Cierre final */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: DARK }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#67C6C8" }}>Decisión final</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4" style={{ lineHeight: 1.2 }}>
              Tu competencia no está esperando.
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Mientras otros directivos ya construyen su ventaja competitiva, tú puedes seguir postergando o asegurar tu lugar en el próximo grupo de septiembre.
            </p>
            <a
              href="#solicitud"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: GRADIENT, boxShadow: "0 12px 32px rgba(106,138,255,0.4)" }}
            >
              Unirme a la lista de espera →
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
              Únete a la lista de espera de VictorIA Elite
            </h2>
            <p className="text-xs text-center mb-6" style={{ color: GRIS, opacity: 0.5 }}>
              Grupos de 10-12 personas. Presencial en ciudades clave: CDMX, Monterrey, Guadalajara, Querétaro. Apertura en septiembre.
            </p>
            <SolicitudInfoForm
              programa="VictorIA Elite"
              webhookUrl={WEBHOOK}
              calendlyUrl=""
              gradient={GRADIENT}
              selectField={{ name: "ciudad", label: "Ciudad", options: ["CDMX", "Monterrey", "Guadalajara", "Querétaro"] }}
              submitLabel="Unirme a la lista de espera →"
              confirmTitle="¡Listo! Estás en la lista de espera."
              confirmText="VictorIA Elite abre sus puertas en septiembre. Te contactaremos por WhatsApp para confirmar tu lugar y enviarte tu invitación apenas abramos el cupo."
              waitlistNote="Eres parte de la lista de espera oficial — recibirás tu invitación antes que el público general."
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
