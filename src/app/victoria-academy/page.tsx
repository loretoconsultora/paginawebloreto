"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Briefcase, GraduationCap, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";

const PROGRAMAS = [
  {
    id: "profesional",
    nombre: "VictorIA Profesional",
    frase: "La experiencia que recupera tu tiempo y potencia a tu equipo",
    para: "Colaboradores y líderes de equipo de empresas medianas",
    icon: Briefcase,
    color: "#3E7ECA",
    portada: "/victoria-academy/profesional.jpg",
  },
  {
    id: "elite",
    nombre: "VictorIA Elite",
    frase: "La experiencia que construye tu ventaja competitiva de 18-36 meses",
    para: "Directivos, CEOs y dueños de negocio — grupos de 10-12 personas",
    icon: Users,
    color: "#6A8AFF",
    portada: "/victoria-academy/elite.jpg",
  },
  {
    id: "joven",
    nombre: "VictorIA Joven",
    frase: "La experiencia que convierte a tu alumno en la Primera Generación IA",
    para: "Colegios privados y fundaciones educativas",
    icon: GraduationCap,
    color: "#1f8a8c",
    portada: "/victoria-academy/joven.jpg",
  },
];

export default function VictoriaAcademyPage() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: "#fafafa" }}>
        <section className="pt-32 pb-20 text-center px-4 sm:px-6" style={{ background: GRADIENT }}>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              <Image src="/victoria-academy/icon.png" alt="VictorIA Academy" width={36} height={36} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-4xl sm:text-6xl font-bold mb-4 text-white"
              style={{ lineHeight: 1.1 }}
            >
              VictorIA Academy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/85 text-base sm:text-lg leading-relaxed mb-8"
            >
              La nueva VIA hacia tu potencial completo en la era de la inteligencia artificial.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/victoria-academy/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white hover:opacity-90 transition-opacity"
                style={{ color: "#3E7ECA" }}
              >
                <LogIn size={16} /> Iniciar sesión
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Carrusel de programas */}
        <div className="py-16 sm:py-20">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-center text-grafito mb-2 px-4">
            Tres programas, un mismo punto de partida
          </h2>
          <p className="text-sm text-grafito/55 text-center mb-10 px-4">
            Uno para tu equipo, uno para tu liderazgo, y uno para la próxima generación.
          </p>

          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-[8vw] sm:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
            style={{ scrollbarWidth: "none" }}
          >
            {PROGRAMAS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="snap-center flex-shrink-0 w-[84vw] sm:w-[360px] bg-white rounded-2xl overflow-hidden flex flex-col"
                style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}
              >
                <div className="relative w-full h-44">
                  <Image src={p.portada} alt={p.nombre} fill className="object-cover" />
                  <div
                    className="absolute top-3 left-3 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.9)" }}
                  >
                    <p.icon size={18} style={{ color: p.color }} />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-playfair text-xl font-bold text-grafito mb-2">{p.nombre}</h3>
                  <p className="text-sm text-grafito/65 leading-relaxed mb-3 flex-1">{p.frase}</p>
                  <p className="text-xs text-grafito/45 mb-5">{p.para}</p>
                  <Link
                    href={`/victoria-academy/${p.id}`}
                    className="inline-flex items-center justify-center gap-2 text-white font-semibold px-5 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                    style={{ background: GRADIENT }}
                  >
                    Conocer programa <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
