"use client";

import { motion } from "framer-motion";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";

const videos: { id: string; titulo: string }[] = [
  { id: "_MrMejtExu0", titulo: "Short 1" },
  { id: "8b4IBY81fQ8", titulo: "Short 2" },
  { id: "MQDX9iByOYQ", titulo: "Short 3" },
  { id: "-Wz16y3WUnA", titulo: "Short 4" },
  { id: "XO6RLM5yrHs", titulo: "Short 5" },
  { id: "62YHw5evRFA", titulo: "Short 6" },
  { id: "PRJjp33Xq3Y", titulo: "Short 7" },
  { id: "_Rp_d4_gatk", titulo: "Short 8" },
  { id: "8rXELdkr7ws", titulo: "Short 9" },
  { id: "nAomfZnvWrA", titulo: "Short 10" },
  { id: "Dq-koqabucc", titulo: "Short 11" },
  { id: "6klmMXe8T8g", titulo: "Short 12" },
  { id: "S5zqWfZxsbw", titulo: "Short 13" },
  { id: "CzQdEQ5Z3vc", titulo: "Short 14" },
];

// Duplicamos para loop infinito
const track = [...videos, ...videos];

export default function NuestrasMarcas() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header centrado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            className="font-playfair font-bold mb-3"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            El salón de la fama
          </h2>
          <p className="text-grafito/55 font-medium text-base">
            Conoce las marcas que ya confían en nosotros
          </p>
        </motion.div>

      </div>

      {/* Carrusel animado — ancho completo */}
      <div className="relative" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)" }}>
        <div
          className="flex gap-4"
          style={{ animation: "salon-scroll 60s linear infinite", width: "max-content" }}
        >
          {track.map((v, i) => (
            <div
              key={`${v.id}-${i}`}
              className="flex-shrink-0 rounded-2xl overflow-hidden"
              style={{
                width: 280,
                height: 498,
                boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                title={v.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes salon-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
