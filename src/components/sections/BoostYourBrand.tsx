import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function BoostYourBrand() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Fondo gradiente */}
          <div className="absolute inset-0 gradient-hero" />
          {/* Blobs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 px-8 sm:px-16 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-white max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <Star size={12} fill="currentColor" />
                Programa Estrella 2026
              </div>

              <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                Boost Your Brand
              </h2>
              <p className="font-dancing text-2xl text-white/80 mb-6">
                Primera generación · 1° de julio
              </p>
              <p className="text-white/80 leading-relaxed mb-8">
                El programa de formación grupal donde marcas personales y emprendedores aprenden a comunicar su valor, posicionarse con estrategia y convertir su conocimiento en un negocio escalable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/boost-your-brand"
                  className="glass text-grafito font-semibold px-8 py-4 rounded-full text-base hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Quiero unirme <ArrowRight size={16} />
                </Link>
                <Link
                  href="/boost-your-brand#programa"
                  className="glass-dark text-white font-semibold px-8 py-4 rounded-full text-base border border-white/30 hover:bg-white/20 transition-all duration-300 text-center"
                >
                  Ver el programa
                </Link>
              </div>
            </div>

            {/* Stats panel */}
            <div className="glass-dark rounded-3xl p-8 text-white min-w-64">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-6">
                El programa incluye
              </p>
              {[
                "Estrategia de posicionamiento",
                "Comunicación de marca",
                "Sistema de ventas",
                "Mentorías en vivo",
                "Comunidad privada",
                "Recursos y herramientas",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 rounded-full bg-coral flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
