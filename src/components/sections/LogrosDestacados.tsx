"use client";

import { Trophy } from "lucide-react";

const logros = [
  {
    logo: "/logros/logo-1.png",
    empresa: "Electronic Point",
    industria: "Tecnología",
    hito: "Más de 500 conversaciones generadas con leads calificados atendidos por Agentes de IA y automatizaciones.",
    foto: "/logros/foto-1.jpg",
  },
  {
    logo: "/logros/logo-2.png",
    empresa: "B&M Fit",
    industria: "Fitness",
    hito: "Más de 10 reels virales en el último mes superiores a 10,000 vistas con la nueva estrategia de contenidos.",
    foto: "/logros/foto-2.jpg",
  },
  {
    logo: "/logros/logo-3.png",
    empresa: "Bryan Álvarez",
    industria: "Proyectos civiles e industriales",
    hito: "Producción de contenidos intensiva resulta en más de 17 contenidos estratégicos para redes sociales y publicidad.",
    foto: "/logros/foto-3.jpg",
    fotoPosicion: "center 65%",
  },
];

function LogoCircle({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative mx-auto flex items-center justify-center"
      style={{
        width: 96,
        height: 96,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.12)",
        border: "2px solid rgba(255,255,255,0.25)",
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          const fb = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
          if (fb) fb.style.display = "flex";
        }}
      />
      {/* Fallback placeholder */}
      <div
        className="absolute inset-0 items-center justify-center text-white/30 text-xs font-semibold text-center px-2"
        style={{ display: "none" }}
      >
        Logo
      </div>
    </div>
  );
}

function EvidenciaPhoto({ src, alt, posicion = "center" }: { src: string; alt: string; posicion?: string }) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        height: 180,
        background: "rgba(255,255,255,0.07)",
        border: "1px dashed rgba(255,255,255,0.2)",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: posicion }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          const fb = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
          if (fb) fb.style.display = "flex";
        }}
      />
      {/* Fallback placeholder */}
      <div
        className="w-full h-full items-center justify-center text-white/25 text-xs font-semibold"
        style={{ display: "none" }}
      >
        Foto de evidencia
      </div>
    </div>
  );
}

export default function LogrosDestacados() {
  return (
    <section className="py-20" style={{ background: "#3A3F4B" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-4"
            style={{ background: "rgba(192,0,90,0.18)", color: "#FF6A92", border: "1px solid rgba(255,106,146,0.25)" }}>
            <Trophy size={12} />
            Este mes
          </div>
          <h2 className="font-playfair text-4xl font-bold text-white mb-3">
            Logros Destacados
          </h2>
          <p className="text-white/55 font-medium whitespace-nowrap">
            Cada hito de nuestros clientes es una prueba de que la estrategia correcta transforma negocios.
          </p>
        </div>

        {/* 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {logros.map((l, i) => (
            <div
              key={i}
              className="flex flex-col rounded-3xl p-6 gap-5"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Logo circular */}
              <LogoCircle src={l.logo} alt={l.empresa} />

              {/* Texto */}
              <div className="text-center">
                <p className="text-white/45 text-xs font-semibold tracking-widest uppercase mb-1">
                  {l.industria}
                </p>
                <h3 className="font-playfair text-lg font-bold text-white mb-2">
                  {l.empresa}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">
                  {l.hito}
                </p>
              </div>

              {/* Foto de evidencia */}
              <EvidenciaPhoto src={l.foto} alt={`Evidencia ${l.empresa}`} posicion={l.fotoPosicion} />
            </div>
          ))}
        </div>

        {/* Celebración */}
        <p
          className="text-center font-dancing text-white"
          style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}
        >
          Muchas felicidades ¡celebramos sus resultados!
        </p>

      </div>
    </section>
  );
}
