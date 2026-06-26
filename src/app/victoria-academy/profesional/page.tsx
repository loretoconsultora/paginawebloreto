"use client";

import Image from "next/image";
import { CheckCircle2, XCircle, Sparkles, Clock, Library, Map as MapIcon, ScrollText, ShieldCheck, ChevronDown, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import LandingHeader from "@/components/victoria-academy/LandingHeader";
import Faq from "@/components/victoria-academy/Faq";
import Footer from "@/components/layout/Footer";
import SolicitudInfoForm from "@/components/victoria-academy/SolicitudInfoForm";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";
const ACCENT = "#3E7ECA";
const DARK = "#171b1f";
const GRIS = "#445055";
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_VICTORIA_PROFESIONAL_WEBHOOK ?? "";
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_PROFESIONAL ?? "";
const PRECIO = "$2,850 USD ($49,875 MXN) por grupo de hasta 15 personas — $190 USD/persona";

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
      <LandingHeader badge="Cupo limitado · Próximos grupos" />
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
              <span className="text-xs font-bold text-white tracking-widest uppercase">VictorIA Academy · Profesional</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-3xl sm:text-5xl font-bold mb-4 text-white"
              style={{ lineHeight: 1.2 }}
            >
              Tu equipo tiene el talento. Le falta la nueva infraestructura del trabajo intelectual.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/85 text-base sm:text-lg leading-relaxed mb-2"
            >
              En 6.5 horas, cada integrante de tu equipo sale con una SOP automatizada de su tarea más repetitiva, una biblioteca de 10 prompts para su trabajo específico, y un AI Roadmap de 18 meses. Sin código. Sin tecnicismos. Con su caso real.
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
              Hay algo que casi nadie dice en voz alta en las empresas: tu equipo trabaja duro, pero el trabajo sigue acumulándose. Los reportes tardan días. Las juntas no deciden nada.
            </p>
            <p className="text-sm leading-relaxed mb-3" style={{ color: GRIS, opacity: 0.8 }}>
              No es falta de compromiso ni de capacidad. Es que el mundo del trabajo cambió de reglas mientras nadie les enseñaba las nuevas.
            </p>
            <p className="font-playfair text-lg font-bold" style={{ color: GRIS }}>
              El 88% de las organizaciones ya usa IA. Solo el 1% la usa bien.
            </p>
          </motion.div>
        </div>

        {/* Lo que te vas a llevar */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Lo que te vas a llevar</p>
            <h2 className="font-playfair text-3xl font-bold mb-4" style={{ color: GRIS, lineHeight: 1.2 }}>
              La forma en que tu equipo trabaja cambia aquí
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: GRIS, opacity: 0.75 }}>
              Esto no es un taller más. Es donde tu equipo por fin entiende qué hacer para trabajar más rápido y con más criterio, sin complicarse y sin ser experto en tecnología. Vienen a construir en vivo cómo la IA hace por ellos lo que antes tomaba horas.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative flex justify-center">
            <div className="relative w-full max-w-xs rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.12)" }}>
              <Image src="/loreto-directora.jpg" alt="Loreto — Directora de Loreto Consultora" width={400} height={500} className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: ACCENT, boxShadow: "0 8px 20px rgba(62,126,202,0.4)" }}>
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
            <h3 className="font-playfair text-xl font-bold mb-5" style={{ color: GRIS }}>Cómo se va a sentir tu equipo después</h3>
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
            <h3 className="font-playfair text-xl font-bold mb-5 text-white">Lo que va a poder hacer después</h3>
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
            <h2 className="font-playfair text-2xl font-bold text-center mb-1" style={{ color: GRIS }}>La experiencia del taller — 6.5 horas</h2>
            <p className="text-sm text-center mb-6" style={{ color: GRIS, opacity: 0.5 }}>Todo en un solo precio, sin extras ocultos</p>
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
              Este taller es para ti si quieres que tu equipo trabaje con criterio, no solo con más herramientas.
            </h2>
            <p className="text-sm text-white/60">Antes de avanzar, mira si este programa encaja con lo que tu equipo necesita ahora.</p>
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
              <p className="text-white font-medium mb-4">Si te reconociste en 2 o más puntos, este taller es para tu equipo.</p>
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
              <p className="text-[11px] text-white/70 mt-2">Cupo máximo: 15 personas por grupo</p>
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
                Diseña e imparte VictorIA Academy con un enfoque consultivo: no enseña IA en abstracto, construye con cada equipo su caso real, en vivo, con entregables medibles.
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
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Lo que dicen los equipos</p>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold" style={{ color: GRIS }}>
              Resultados reales de quienes ya pasaron por el taller
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
                Si al terminar el taller no tienes en tus manos al menos 3 entregables concretos aplicables a tu trabajo real, te ofrecemos una sesión adicional personalizada de 60 minutos sin costo adicional para cerrar esa brecha. No es una garantía de devolución de dinero — es una garantía de resultado.
              </p>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-playfair text-2xl font-bold text-center mb-1" style={{ color: GRIS }}>Resuelve tus dudas</h2>
            <p className="text-sm text-center mb-6" style={{ color: GRIS, opacity: 0.5 }}>Antes de solicitar información para tu equipo</p>
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
              Mientras otros equipos ya recuperan horas semanales por persona, el tuyo puede seguir igual o dar el paso hoy. Una sola sesión puede cambiar cómo trabaja tu gente de aquí a 18 meses.
            </p>
            <a
              href="#solicitud"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: GRADIENT, boxShadow: "0 12px 32px rgba(62,126,202,0.4)" }}
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
            <h2 className="font-playfair text-xl font-bold text-center mb-1" style={{ color: ACCENT }}>
              Solicita información para tu equipo
            </h2>
            <p className="text-xs text-center mb-6" style={{ color: GRIS, opacity: 0.5 }}>
              Cupo máximo: 15 personas por grupo. Precio educativo preferencial desde $80 USD ($1,400 MXN) por persona para docentes e instituciones académicas.
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
