"use client";

import { CheckCircle2, Sparkles, Clock, GraduationCap, FileText, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolicitudInfoForm from "@/components/victoria-academy/SolicitudInfoForm";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const WEBHOOK = process.env.NEXT_PUBLIC_N8N_VICTORIA_JOVEN_WEBHOOK ?? "";
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_JOVEN ?? "";

const SESIONES = [
  { tag: "S0", titulo: "Activación Digital", dur: "30 min asíncrono", texto: "Video cinematográfico de oportunidad histórica. Guía visual de configuración en español. La Pregunta del Manifiesto Joven." },
  { tag: "S1", titulo: "La Generación que Llegó Primero", dur: "90 min", texto: "Apertura cinematográfica. Panorama de IA para jóvenes. Mapa de oportunidades académicas y de carrera." },
  { tag: "S2", titulo: "El Arte de Hablar con IA con Criterio", dur: "2 horas", texto: "Honestidad académica con IA antes de la técnica. Prompting para estudiantes. Biblioteca de 10 Prompts académicos." },
  { tag: "S3", titulo: "Mi Primer Proyecto con IA", dur: "2 horas", texto: "Diseño del proyecto de portafolio. Construcción en vivo. Preparación del pitch de 2 minutos." },
];

const ENTREGABLES = [
  { icon: FileText, titulo: "Reporte Institucional de Resultados", texto: "Documento formal para la dirección académica: resultados del showcase, métricas de participación, proyectos destacados." },
  { icon: GraduationCap, titulo: "Portafolio Documentado por Alumno", texto: "Cada estudiante recibe su proyecto documentado: problema, proceso, resultado, reflexión. Compartible y utilizable en admisiones universitarias." },
  { icon: Award, titulo: "Manifiesto Personal Joven (impreso)", texto: "Su primera declaración de identidad digital, impresa en alta calidad. El touchpoint que los padres ven y que genera el boca a boca institucional." },
];

export default function VictoriaJovenPage() {
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
              className="text-white/85 text-base sm:text-lg leading-relaxed"
            >
              Un programa institucional presencial para colegios privados y fundaciones educativas. En 6.5 horas, cada estudiante construye su primer proyecto real con IA y se lleva su portafolio documentado.
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
              Los alumnos de hoy ya usan IA todos los días — para tareas, para curiosidad, para atajos. Lo que casi ninguno tiene es criterio: cuándo usarla, cómo usarla con honestidad académica, y cómo convertirla en una ventaja real para su futuro.
            </p>
            <p className="font-playfair text-lg font-bold text-grafito">
              VictorIA Joven es la puerta de entrada a esa generación con criterio.
            </p>
          </motion.div>

          {/* Sesiones */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="font-playfair text-2xl font-bold text-center text-grafito mb-1">La experiencia del taller</h2>
            <p className="text-sm text-grafito/50 text-center mb-6">6.5 horas · Implementación institucional presencial</p>
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
            <h2 className="font-playfair text-2xl font-bold text-center text-grafito mb-6">Entregables institucionales</h2>
            <div className="flex flex-col gap-4">
              {ENTREGABLES.map((e) => (
                <div key={e.titulo} className="flex gap-4 rounded-xl p-5 bg-white" style={{ border: "1px solid rgba(58,63,75,0.08)" }}>
                  <e.icon size={22} style={{ color: "#0d6b6d" }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm text-grafito mb-1.5">{e.titulo}</h3>
                    <p className="text-xs text-grafito/55 leading-relaxed">{e.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Escalamiento - Semillero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-6 mb-10"
            style={{ background: "rgba(13,107,109,0.06)", border: "1px solid rgba(13,107,109,0.2)" }}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#0d6b6d" }}>
              <ArrowRight size={14} /> Escalamiento natural
            </div>
            <p className="text-sm text-grafito/75 leading-relaxed">
              VictorIA Joven es la puerta de entrada. <strong>Semillero VictorIA</strong> es el destino: un programa anual institucional con licencia, materiales, plataforma y certificación de facilitador interno, para que tu colegio tenga capacidad instalada permanente de formación en IA.
            </p>
          </motion.div>

          {/* Garantía */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-start gap-4 rounded-2xl p-6 mb-10 bg-white"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <CheckCircle2 size={28} style={{ color: "#0d6b6d" }} className="flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-playfair text-lg font-bold text-grafito mb-1">Garantía de Experiencia VictorIA</h3>
              <p className="text-sm text-grafito/65 leading-relaxed">
                Si el reporte institucional no refleja evidencia clara de impacto, ofrecemos una sesión adicional sin costo para cerrar esa brecha. No vendemos un taller — vendemos transformación visible y documentada.
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
              Solicita información para tu colegio
            </h2>
            <p className="text-xs text-grafito/50 text-center mb-6">
              Implementación para grupo escolar completo. Venta institucional B2B.
            </p>
            <SolicitudInfoForm
              programa="VictorIA Joven"
              webhookUrl={WEBHOOK}
              calendlyUrl={CALENDLY}
              gradient={GRADIENT}
              extraField={{ name: "colegio", placeholder: "Nombre del colegio / institución" }}
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
