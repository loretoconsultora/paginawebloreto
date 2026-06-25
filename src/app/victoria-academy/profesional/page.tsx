"use client";

import { CheckCircle2, XCircle, Sparkles, Clock, Library, Map as MapIcon, ScrollText, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolicitudInfoForm from "@/components/victoria-academy/SolicitudInfoForm";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_VICTORIA_PROFESIONAL_WEBHOOK ?? "";
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_PROFESIONAL ?? "";

const NO_VENDE = [
  "Un curso de IA",
  "Horas de contenido",
  "Un certificado de asistencia",
  "Acceso a herramientas",
  "Conocimiento genérico",
];

const SI_VENDE = [
  "Una experiencia de transformación con identidad",
  "Entregables concretos en tus manos al salir",
  "Evidencia de trabajo real documentada y compartible",
  "El criterio para saber cuándo y cómo usarlas",
  "Un plan específico para tu rol, tu industria, tu caso real",
];

const SESIONES = [
  { tag: "S0", titulo: "Activación Pre-Taller", dur: "45 min asíncrono", texto: "Video de urgencia + formulario de diagnóstico personalizado + guía técnica de configuración. Llegas listo, activado y con tu caso real identificado." },
  { tag: "S1", titulo: "Visión: Claridad y Dirección", dur: "90 min", texto: "Panorama de IA sin tecnicismos. Mapa Personal de Oportunidades — 3 casos de uso específicos para tu rol e industria." },
  { tag: "S2", titulo: "Identidad: El Arte de Pensar con IA", dur: "2 horas", texto: "Anatomía del prompt efectivo. Práctica intensiva con tu caso real. Construcción de tu Biblioteca Personal de 10 Prompts." },
  { tag: "S3", titulo: "Acción Aplicada: IA en Mi Mundo", dur: "2 horas", texto: "Use-Case Workbook personalizado. SOP automatizada de tu tarea más repetitiva. AI Roadmap de 18-36 meses." },
];

const ENTREGABLES = [
  { icon: Library, titulo: "Biblioteca Personal de 10 Prompts", texto: "Documentada en formato estándar: caso de uso, prompt completo, resultado esperado, variaciones. Lista para usar el lunes siguiente." },
  { icon: ScrollText, titulo: "SOP Automatizada", texto: "El procedimiento de tu tarea más repetitiva rediseñado con IA incorporada. Pasos que cualquier persona de tu equipo puede replicar desde mañana." },
  { icon: MapIcon, titulo: "AI Roadmap Personal 18-36 meses", texto: "Tu hoja de ruta de transformación, con métricas de éxito específicas para tu contexto." },
  { icon: Sparkles, titulo: "Manifiesto Personal de IA", texto: "Tu declaración de identidad: cómo usarás la IA, con qué criterio. Entregado en formato de alta producción." },
];

export default function VictoriaProfesionalPage() {
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
              <Sparkles size={13} className="text-white" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">VictorIA Academy</span>
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
              className="text-white/85 text-base sm:text-lg leading-relaxed"
            >
              En 6.5 horas, cada integrante de tu equipo sale con una SOP automatizada de su tarea más repetitiva, una biblioteca de 10 prompts para su trabajo específico, y un AI Roadmap de 18 meses. Sin código. Sin tecnicismos. Con su caso real.
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
              Hay algo que casi nadie dice en voz alta en las empresas: el equipo trabaja duro, pero el trabajo sigue acumulándose. Los reportes tardan días. Las juntas no deciden nada.
            </p>
            <p className="text-sm text-grafito/70 leading-relaxed mb-3">
              No es falta de compromiso. No es falta de capacidad. Es que el mundo del trabajo cambió de reglas mientras nadie les enseñaba las nuevas.
            </p>
            <p className="font-playfair text-lg font-bold text-grafito">
              El 88% de las organizaciones ya usa IA. Solo el 1% la usa bien.
            </p>
          </motion.div>

          {/* No vende / Si vende */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
          >
            <div className="rounded-2xl p-5 bg-white" style={{ border: "1px solid rgba(58,63,75,0.1)" }}>
              <p className="text-xs font-bold uppercase tracking-widest text-grafito/40 mb-3">No vendemos</p>
              <div className="flex flex-col gap-2.5">
                {NO_VENDE.map((t) => (
                  <div key={t} className="flex items-start gap-2 text-sm text-grafito/55">
                    <XCircle size={15} className="flex-shrink-0 mt-0.5 text-gray-400" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ background: "rgba(192,0,90,0.06)", border: "1px solid rgba(192,0,90,0.2)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#c0005a" }}>Sí vendemos</p>
              <div className="flex flex-col gap-2.5">
                {SI_VENDE.map((t) => (
                  <div key={t} className="flex items-start gap-2 text-sm text-grafito/75 font-medium">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#c0005a" }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sesiones */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="font-playfair text-2xl font-bold text-center text-grafito mb-1">La experiencia del taller — 6.5 horas</h2>
            <p className="text-sm text-grafito/50 text-center mb-6">Todo en un solo precio, sin extras ocultos</p>
            <div className="flex flex-col gap-3">
              {SESIONES.map((s) => (
                <div key={s.tag} className="flex gap-4 rounded-xl p-4 bg-white" style={{ border: "1px solid rgba(58,63,75,0.08)" }}>
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
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
            <h2 className="font-playfair text-2xl font-bold text-center text-grafito mb-6">Lo que sale en tus manos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ENTREGABLES.map((e) => (
                <div key={e.titulo} className="rounded-xl p-5 bg-white" style={{ border: "1px solid rgba(58,63,75,0.08)" }}>
                  <e.icon size={20} style={{ color: "#c0005a" }} className="mb-2" />
                  <h3 className="font-semibold text-sm text-grafito mb-1.5">{e.titulo}</h3>
                  <p className="text-xs text-grafito/55 leading-relaxed">{e.texto}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Seguimiento + comunidad */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-6 mb-10 text-center"
            style={{ background: "rgba(192,0,90,0.06)", border: "1px solid rgba(192,0,90,0.2)" }}
          >
            <p className="text-sm text-grafito/75 leading-relaxed">
              La transformación no termina al salir del salón: incluye <strong>30 días de seguimiento estructurado</strong> (check-ins, sesión de preguntas en vivo, medición de impacto al día 30) y <strong>acceso a la comunidad Skool VictorIA Profesional</strong> — contenido semanal, red de pares y acceso directo a la facilitadora.
            </p>
          </motion.div>

          {/* Garantía */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-start gap-4 rounded-2xl p-6 mb-10 bg-white"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <ShieldCheck size={28} style={{ color: "#c0005a" }} className="flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-playfair text-lg font-bold text-grafito mb-1">Garantía de Experiencia VictorIA</h3>
              <p className="text-sm text-grafito/65 leading-relaxed">
                Si al terminar el taller no tienes en tus manos al menos 3 entregables concretos aplicables a tu trabajo real, te ofrecemos una sesión adicional personalizada de 60 minutos sin costo adicional para cerrar esa brecha. No es una garantía de devolución de dinero — es una garantía de resultado.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 relative z-10"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}
          >
            <h2 className="font-playfair text-xl font-bold text-center mb-1" style={{ color: "#1a0a2e" }}>
              Solicita información para tu equipo
            </h2>
            <p className="text-xs text-grafito/50 text-center mb-6">
              Cupo máximo: 15 personas por grupo. Disponible para empresas, hospitales y escuelas.
            </p>
            <SolicitudInfoForm
              programa="VictorIA Profesional"
              webhookUrl={WEBHOOK}
              calendlyUrl={CALENDLY}
              gradient={GRADIENT}
              extraField={{ name: "empresa", placeholder: "Empresa / organización" }}
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
