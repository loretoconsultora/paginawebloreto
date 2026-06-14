"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";

// Agrega aquí los YouTube Shorts IDs cuando los tengas
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

export default function NuestrasMarcas() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-white">
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

        {/* Carrusel de YouTube Shorts */}
        {videos.length > 0 ? (
          <div className="relative">
            {/* Botón izquierdo */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
              style={{ border: "1px solid rgba(58,63,75,0.12)" }}
            >
              <ChevronLeft size={18} className="text-grafito" />
            </button>

            {/* Track */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {videos.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex-shrink-0 rounded-2xl overflow-hidden"
                  style={{
                    width: 300,
                    height: 533,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                    title={v.titulo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </motion.div>
              ))}
            </div>

            {/* Botón derecho */}
            <button
              onClick={() => scroll("right")}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
              style={{ border: "1px solid rgba(58,63,75,0.12)" }}
            >
              <ChevronRight size={18} className="text-grafito" />
            </button>
          </div>
        ) : (
          /* Placeholder mientras llegan los links */
          <div className="flex gap-4 justify-center">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  width: 280,
                  height: 498,
                  background: "rgba(58,63,75,0.04)",
                  border: "2px dashed rgba(58,63,75,0.12)",
                }}
              >
                <p className="text-grafito/30 text-xs font-mono text-center px-6">
                  YouTube Short {n}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
