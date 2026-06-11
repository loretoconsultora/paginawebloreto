"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo gradiente coral/rosa */}
      <div className="absolute inset-0 gradient-hero opacity-90" />

      {/* Blobs decorativos animados */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#fbc7d9]/40 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#d8b4fe]/30 blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-[#bfdbfe]/20 blur-2xl animate-float" />

      {/* Contenido */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 glass-dark text-white text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Consultoría de Marketing Estratégico
        </div>

        {/* Headline */}
        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
          Tu marca tiene
          <br />
          <span className="font-dancing text-6xl sm:text-7xl lg:text-8xl text-[#fff]" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.15)" }}>
            todo para brillar
          </span>
        </h1>

        {/* Subheadline */}
        <p className="font-montserrat text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
          Ayudamos a marcas personales, PYMEs y corporaciones a posicionarse, comunicar su valor y convertirlo en un negocio rentable.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacto"
            className="glass text-grafito font-semibold px-8 py-4 rounded-full text-base hover:shadow-glass-hover transition-all duration-300 hover:-translate-y-0.5"
          >
            Solicita tu diagnóstico gratuito
          </Link>
          <Link
            href="/servicios"
            className="glass-dark text-white font-semibold px-8 py-4 rounded-full text-base border border-white/30 hover:bg-white/20 transition-all duration-300"
          >
            Conoce nuestros servicios
          </Link>
        </div>

        {/* Métricas */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { number: "6+", label: "Años de experiencia" },
            { number: "500+", label: "Clientes y marcas" },
            { number: "5", label: "Países con presencia" },
          ].map((stat) => (
            <div key={stat.label} className="glass-dark rounded-2xl px-4 py-5 text-white">
              <div className="font-playfair text-3xl font-bold">{stat.number}</div>
              <div className="text-xs text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs font-montserrat tracking-widest uppercase">Descubre más</span>
        <div className="w-px h-8 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
