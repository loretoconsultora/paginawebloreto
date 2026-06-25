"use client";

import { CheckCircle2, Sparkles, Clock, Library, Map as MapIcon, ScrollText, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolicitudInfoForm from "@/components/victoria-academy/SolicitudInfoForm";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_VICTORIA_ELITE_WEBHOOK ?? "";
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_ELITE ?? "";

const SESIONES = [
  { tag: "S0", titulo: "Activación Estratégica", dur: "45 min", texto: "Video de contexto estratégico con datos McKinsey/BCG. Módulo pregrabado exclusivo: 'Liderazgo Humano en la Transición Tecnológica'." },
  { tag: "LAC", titulo: "Llamada de Pre-Admisión", dur: "20 min", texto: "Llamada personal con la facilitadora antes del taller, para alinear expectativas y garantizar que el programa es el fit correcto." },
  { tag: "S1", titulo: "El Tablero del Líder", dur: "90 min", texto: "Manifiesto de Liderazgo. Panorama estratégico de IA. Mapa de Oportunidades Organizacionales. Primera Mesa de Pares." },
  { tag: "S2", titulo: "Prompt Thinking Ejecutivo", dur: "2 horas", texto: "Prompting para decisiones estratégicas. Casos ejecutivos en vivo: análisis competitivo, reporte de directorio, brief de equipo." },
  { tag: "S3", titulo: "El AI Roadmap Ejecutivo", dur: "2 horas", texto: "Use-Case Workbook ejecutivo. AI Roadmap de 18-36 meses en formato presentable. Mesa Redonda Final." },
];

const ENTREGABLES = [
  { icon: MapIcon, titulo: "AI Roadmap Ejecutivo — Formato Premium", texto: "Documento de alta producción presentable ante consejo, socios o equipo. 3 casos de uso de mayor ROI priorizados y plan de implementación por fases." },
  { icon: ScrollText, titulo: "Use-Case Workbook Ejecutivo", texto: "Para cada oportunidad estratégica: impacto estimado, herramienta recomendada, timeline y métrica de éxito. Tu documento de trabajo para los próximos 6 meses." },
  { icon: Sparkles, titulo: "Manifiesto de Liderazgo en IA", texto: "Tu declaración como líder de la transición tecnológica. En formato de alta producción para enmarcar o compartir." },
  { icon: Library, titulo: "Biblioteca Ejecutiva de 10 Prompts", texto: "Prompts para los 10 contextos más frecuentes del directivo: directorio, análisis de mercado, brief de equipo, evaluación de propuesta." },
];

export default function VictoriaElitePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: "#fafafa" }}>

        {/* Hero */}
        <section className="pt-32 pb-14 text-center px-4 sm:px-6" style={{ background: GRADIENT }}>
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
              className="text-white/85 text-base sm:text-lg leading-relaxed"
            >
              VictorIA Elite es la experiencia que construye tu ventaja competitiva de 18-36 meses: para directivos, CEOs y dueños de negocio. Grupos íntimos de 10 a 12 personas, presencial en ciudades clave. Las puertas abren en septiembre — únete a la lista de espera para recibir tu invitación.
            </motion.p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 pb-20">

          {/* El problema */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 mb-6 relative z-10"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <p className="text-sm text-grafito/70 leading-relaxed mb-3">
              El 88% de las organizaciones ya usa IA. Solo el 1% sabe usarla bien. La diferencia no es el acceso a la tecnología — es tener una estrategia clara y un liderazgo que sabe cómo guiar la adopción sin generar resistencia.
            </p>
            <p className="font-playfair text-lg font-bold text-grafito">
              Tu competencia ya recuperó horas semanales por persona. ¿Tu organización todavía no?
            </p>
          </motion.div>

          {/* Sesiones */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="font-playfair text-2xl font-bold text-center text-grafito mb-1">La experiencia del taller</h2>
            <p className="text-sm text-grafito/50 text-center mb-6">6.5 horas + llamada de pre-admisión personal</p>
            <div className="flex flex-col gap-3">
              {SESIONES.map((s) => (
                <div key={s.tag} className="flex gap-4 rounded-xl p-4 bg-white" style={{ border: "1px solid rgba(58,63,75,0.08)" }}>
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[11px] text-white"
                    style={{ background: GRADIENT }}
                  >
                    {s.tag}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm text-grafito">{s.titulo}</h3>
                      <span className="flex items-center gap-1 text-[11px] text-grafito/40">
                        <Clock size={11} /> {s.dur}
                      </span>
                    </div>
                    <p className="text-xs text-grafito/55 leading-relaxed">{s.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Entregables */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="font-playfair text-2xl font-bold text-center text-grafito mb-6">Entregables exclusivos Elite</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ENTREGABLES.map((e) => (
                <div key={e.titulo} className="rounded-xl p-5 bg-white" style={{ border: "1px solid rgba(58,63,75,0.08)" }}>
                  <e.icon size={20} style={{ color: "#7a5800" }} className="mb-2" />
                  <h3 className="font-semibold text-sm text-grafito mb-1.5">{e.titulo}</h3>
                  <p className="text-xs text-grafito/55 leading-relaxed">{e.texto}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Comunidad Elite */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-6 mb-10 text-center"
            style={{ background: "rgba(245,200,66,0.08)", border: "1px solid rgba(245,200,66,0.35)" }}
          >
            <p className="text-sm text-grafito/75 leading-relaxed">
              Incluye <strong>acceso a la Comunidad VictorIA Elite</strong> — un espacio exclusivo de directivos que solo se accede completando el taller, con sesión de actualización estratégica trimestral. Más <strong>30 días de seguimiento estructurado</strong> con check-ins personales y documento de resultados individuales.
            </p>
          </motion.div>

          {/* Garantía */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-start gap-4 rounded-2xl p-6 mb-10 bg-white"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <ShieldCheck size={28} style={{ color: "#7a5800" }} className="flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-playfair text-lg font-bold text-grafito mb-1">Garantía de Experiencia VictorIA</h3>
              <p className="text-sm text-grafito/65 leading-relaxed">
                Si al terminar el taller no tienes un AI Roadmap usable para tu organización, te ofrecemos una sesión adicional personalizada sin costo para cerrar esa brecha. No es una garantía de devolución de dinero — es una garantía de resultado.
              </p>
            </div>
          </motion.div>

          {/* Camino natural */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-grafito/50">
              <CheckCircle2 size={14} style={{ color: "#7a5800" }} />
              El siguiente paso natural: Consultoría Done With You para implementar tu AI Roadmap con acompañamiento experto.
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 relative z-10"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}
          >
            <h2 className="font-playfair text-xl font-bold text-center mb-1" style={{ color: "#1a0a2e" }}>
              Únete a la lista de espera de VictorIA Elite
            </h2>
            <p className="text-xs text-grafito/50 text-center mb-6">
              Grupos de 10-12 personas. Presencial en ciudades clave: CDMX, Monterrey, Guadalajara, Querétaro. Apertura en septiembre.
            </p>
            <SolicitudInfoForm
              programa="VictorIA Elite"
              webhookUrl={WEBHOOK}
              calendlyUrl=""
              gradient={GRADIENT}
              extraField={{ name: "empresa", placeholder: "Empresa / cargo" }}
              selectField={{ name: "tipoOrganizacion", label: "Tipo de organización", options: ["Empresa", "Institución académica", "Hospital", "Otro"] }}
              cityField={{ type: "select", options: ["CDMX", "Monterrey", "Guadalajara", "Querétaro"] }}
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
