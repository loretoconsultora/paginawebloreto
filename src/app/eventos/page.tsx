"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const G_MAIN = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const MAGENTA = "#c0005a";

const EVENTOS = [
  {
    pais: "Costa Rica",
    bandera: "🇨🇷",
    ciudad: "San José",
    slug: "costa-rica",
    fecha: "Jueves 26 de noviembre",
  },
  {
    pais: "Colombia",
    bandera: "🇨🇴",
    ciudad: "Bogotá",
    slug: "colombia",
    fecha: "Jueves 3 de diciembre",
  },
  {
    pais: "Chile",
    bandera: "🇨🇱",
    ciudad: "Santiago de Chile",
    slug: "chile",
    fecha: "Jueves 10 de diciembre",
  },
  {
    pais: "Panamá",
    bandera: "🇵🇦",
    ciudad: "Ciudad de Panamá",
    slug: "panama",
    fecha: "Jueves 17 de diciembre",
  },
];

export default function EventosPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">

        {/* Hero */}
        <section className="pt-32 pb-20 px-5 lg:px-8 relative overflow-hidden" style={{ background: G_MAIN }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 right-0 w-96 h-96 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(232,148,255,0.12) 0%, transparent 70%)", filter: "blur(70px)" }} />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">
                Networking &amp; Masterclass Digital · 2027
              </p>
              <h1 className="font-playfair font-black text-white mb-5"
                style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.15 }}>
                Eventos presenciales para mexicanos que construyen desde el exterior
              </h1>
              <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                4 países · 4 ciudades · Una comunidad de emprendedores y marcas personales mexicanas que están escalando sus negocios digitales en 2027.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Grid de países */}
        <section className="py-20 px-5 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: MAGENTA }}>Elige tu ciudad</p>
              <h2 className="font-playfair font-black text-3xl sm:text-4xl" style={{ color: "#1a0a2e" }}>
                Selecciona el evento de tu país
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {EVENTOS.map((e, i) => (
                <motion.div key={e.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link href={`/eventos/${e.slug}`}
                    className="group flex flex-col rounded-3xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl"
                    style={{ border: "1.5px solid rgba(192,0,90,0.1)", boxShadow: "0 4px 24px rgba(192,0,90,0.06)" }}>
                    {/* Header de tarjeta */}
                    <div className="px-8 py-10 flex-1 relative overflow-hidden" style={{ background: G_MAIN }}>
                      <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full"
                        style={{ background: "rgba(255,255,255,0.05)" }} />
                      <span className="text-5xl mb-5 block">{e.bandera}</span>
                      <h3 className="font-playfair font-black text-2xl text-white mb-1">{e.pais}</h3>
                      <p className="text-white/70 text-sm font-medium">📍 {e.ciudad}</p>
                    </div>
                    {/* Footer de tarjeta */}
                    <div className="px-8 py-5 bg-white flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: MAGENTA }}>Fecha</p>
                        <p className="text-sm font-bold" style={{ color: "#1a0a2e" }}>{e.fecha}</p>
                      </div>
                      <span className="text-sm font-bold transition-transform group-hover:translate-x-1" style={{ color: MAGENTA }}>
                        Ver evento →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Por qué asistir */}
        <section className="py-20 px-5 lg:px-8" style={{ background: "#fdf5f8" }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: MAGENTA }}>¿Por qué asistir?</p>
              <h2 className="font-playfair font-black text-3xl sm:text-4xl mb-6" style={{ color: "#1a0a2e" }}>
                Networking real · Masterclass Digital · Comunidad
              </h2>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.8 }}>
                Estos eventos son para los mexicanos que tomaron la decisión de construir desde otro país y no quieren hacerlo solos. Vas a conectar con personas que entienden tu contexto, aprender estrategias de marca y negocios digitales que funcionan en 2027, y formar parte de una comunidad que te impulsa a seguir.
              </p>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
