import Link from "next/link";
import { PlayCircle, ArrowRight, Play } from "lucide-react";

const marcas = [
  { nombre: "Electronic Point", industria: "Tecnología", pais: "🇲🇽" },
  { nombre: "Tatoox", industria: "E-commerce", pais: "🇦🇷" },
  { nombre: "Studio Alma", industria: "Diseño", pais: "🇨🇴" },
  { nombre: "Roots Wellness", industria: "Bienestar", pais: "🇪🇸" },
  { nombre: "Susana R.", industria: "Coaching", pais: "🇺🇸" },
  { nombre: "Marcela V.", industria: "Consultoría", pais: "🇲🇽" },
];

const videos = [
  { titulo: "Cómo Electronic Point triplicó sus ventas", duracion: "4:32", thumb: "bg-coral/20" },
  { titulo: "El método Loreto: posicionamiento real", duracion: "6:15", thumb: "bg-lila-DEFAULT/20" },
  { titulo: "De 0 a viral: la historia de Tatoox", duracion: "5:48", thumb: "bg-indigo-DEFAULT/20" },
  { titulo: "Marca personal que vende: caso Studio Alma", duracion: "3:55", thumb: "bg-coral/20" },
];

export default function NuestrasMarcas() {
  return (
    <section className="py-20 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-coral mb-2">
              Resultados reales
            </p>
            <h2 className="font-playfair text-4xl font-bold text-grafito">
              Nuestras Marcas
            </h2>
          </div>
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-indigo-DEFAULT hover:text-coral transition-colors"
          >
            <PlayCircle size={16} />
            Ver playlist completa <ArrowRight size={14} />
          </Link>
        </div>

        {/* Marcas grid */}
        <div className="flex flex-wrap gap-3 mb-12">
          {marcas.map((m) => (
            <div
              key={m.nombre}
              className="glass rounded-2xl px-5 py-3 flex items-center gap-3"
            >
              <span className="text-lg">{m.pais}</span>
              <div>
                <div className="text-sm font-semibold text-grafito">{m.nombre}</div>
                <div className="text-xs text-grafito/50">{m.industria}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Videos carrusel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {videos.map((v) => (
            <div
              key={v.titulo}
              className={`glass rounded-3xl overflow-hidden hover:shadow-glass-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
            >
              <div className={`${v.thumb} h-40 flex items-center justify-center relative`}>
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Play size={18} className="text-grafito ml-0.5" fill="currentColor" />
                </div>
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                  {v.duracion}
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-grafito leading-snug">{v.titulo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
