"use client";

import Link from "next/link";
import { ArrowRight, Users, Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GRADIENT = "linear-gradient(135deg, #0a1f3d 0%, #0f7a78 50%, #4fd1c5 100%)";

const PROGRAMAS = [
  {
    id: "profesional",
    nombre: "VictorIA Profesional",
    frase: "La experiencia que recupera tu tiempo y potencia a tu equipo",
    para: "Colaboradores y líderes de equipo de empresas medianas",
    icon: Briefcase,
    color: "#0f7a78",
    bgColor: "rgba(15,122,120,0.06)",
    borderColor: "rgba(15,122,120,0.2)",
  },
  {
    id: "elite",
    nombre: "VictorIA Elite",
    frase: "La experiencia que construye tu ventaja competitiva de 18-36 meses",
    para: "Directivos, CEOs y dueños de negocio — grupos de 10-12 personas",
    icon: Users,
    color: "#0a4d8c",
    bgColor: "rgba(10,77,140,0.08)",
    borderColor: "rgba(10,77,140,0.35)",
  },
  {
    id: "joven",
    nombre: "VictorIA Joven",
    frase: "La experiencia que convierte a tu alumno en la Primera Generación IA",
    para: "Colegios privados y fundaciones educativas",
    icon: GraduationCap,
    color: "#0d6b6d",
    bgColor: "rgba(13,107,109,0.06)",
    borderColor: "rgba(13,107,109,0.2)",
  },
];

export default function VictoriaAcademyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: "#fafafa" }}>
        <section className="pt-32 pb-16 text-center px-4 sm:px-6" style={{ background: GRADIENT }}>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <span className="text-xs font-bold text-white tracking-widest uppercase">Ecosistema VictorIA</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-4xl sm:text-5xl font-bold mb-4 text-white"
              style={{ lineHeight: 1.15 }}
            >
              VictorIA Academy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/85 text-base sm:text-lg leading-relaxed"
            >
              Tres programas de transformación con Inteligencia Artificial — uno para tu equipo, uno para tu liderazgo, y uno para la próxima generación.
            </motion.p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative z-10">
            {PROGRAMAS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 flex flex-col"
                style={{ border: `1px solid ${p.borderColor}`, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: p.bgColor }}
                >
                  <p.icon size={22} style={{ color: p.color }} />
                </div>
                <h2 className="font-playfair text-xl font-bold text-grafito mb-2">{p.nombre}</h2>
                <p className="text-sm text-grafito/65 leading-relaxed mb-3 flex-1">{p.frase}</p>
                <p className="text-xs text-grafito/45 mb-5">{p.para}</p>
                <Link
                  href={`/victoria-academy/${p.id}`}
                  className="inline-flex items-center justify-center gap-2 text-white font-semibold px-5 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                  style={{ background: GRADIENT }}
                >
                  Conocer programa <ArrowRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
