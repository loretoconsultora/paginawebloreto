"use client";

import { Star } from "lucide-react";

const VIDEOS = [
  { id: "XO6RLM5yrHs", titulo: "Testimonio" },
  { id: "62YHw5evRFA", titulo: "Testimonio" },
];

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";

export default function SalonFama() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-4"
            style={{ background: "rgba(192,0,90,0.08)", color: "#c0005a", border: "1px solid rgba(192,0,90,0.2)" }}
          >
            <Star size={12} fill="currentColor" />
            Resultados reales
          </div>
          <h2
            className="font-playfair text-4xl sm:text-5xl font-bold mb-3"
            style={{
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Salón de la Fama
          </h2>
          <p className="font-dancing text-grafito/70" style={{ fontSize: "clamp(1.4rem, 2vw, 1.9rem)" }}>
            Ellos ya dieron el paso. ¿Y tú?
          </p>
        </div>

        {/* Videos */}
        <div className="flex flex-wrap justify-center gap-6">
          {VIDEOS.map((v) => (
            <div
              key={v.id}
              className="rounded-3xl overflow-hidden flex-shrink-0"
              style={{
                width: "clamp(200px, 28vw, 340px)",
                aspectRatio: "9/16",
                background: "#000",
                boxShadow: "0 12px 40px rgba(192,0,90,0.15)",
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
    </section>
  );
}
