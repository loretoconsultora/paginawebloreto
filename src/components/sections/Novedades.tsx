import Link from "next/link";
import { ArrowRight, Calendar, Mic, Zap } from "lucide-react";

const novedades = [
  {
    tipo: "Evento",
    icono: Calendar,
    color: "bg-coral/10 text-coral",
    titulo: "The Art of Brand — Querétaro & CDMX",
    descripcion: "Una serie de experiencias creativas donde el branding deja de ser teoría y se convierte en algo que se siente, se piensa y se crea con las manos. Cupos muy limitados.",
    fecha: "Próximamente · 2 ediciones",
    href: "/eventos/the-art-of-brand",
  },
  {
    tipo: "Lanzamiento",
    icono: Zap,
    color: "bg-indigo-DEFAULT/10 text-indigo-DEFAULT",
    titulo: "Boost Your Brand — Primera Generación",
    descripcion: "El programa de formación grupal más esperado: posicionamiento, comunicación de marca, sistema de ventas y mentoría en vivo.",
    fecha: "1 julio 2026",
    href: "https://boost-your-brand.vercel.app",
  },
  {
    tipo: "Podcast",
    icono: Mic,
    color: "bg-lila-DEFAULT/10 text-lila-DEFAULT",
    titulo: "\"Lo que nos decimos últimamente\"",
    descripcion: "Un episodio para hablar sobre lo que callamos los empresarios: síndrome del impostor, comparación, pedir ayuda, claridad vs hiperactividad y gestión de riesgos.",
    fecha: "Disponible ahora en Spotify",
    href: "/podcast",
  },
];

export default function Novedades() {
  return (
    <section className="py-20 bg-gradient-indigo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-coral mb-2">
              Lo que está pasando
            </p>
            <h2 className="font-playfair text-4xl font-bold text-grafito">
              Novedades
            </h2>
          </div>
          <Link
            href="/eventos"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-indigo-DEFAULT hover:text-coral transition-colors"
          >
            Ver todo <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {novedades.map((n) => {
            const Icon = n.icono;
            return (
              <Link
                key={n.titulo}
                href={n.href}
                className="glass rounded-3xl p-6 hover:shadow-glass-hover transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full ${n.color} mb-4`}>
                  <Icon size={12} />
                  {n.tipo}
                </div>
                <h3 className="font-playfair text-lg font-bold text-grafito mb-2 group-hover:text-coral transition-colors">
                  {n.titulo}
                </h3>
                <p className="text-sm text-grafito/60 leading-relaxed mb-4">
                  {n.descripcion}
                </p>
                <p className="text-xs font-semibold text-coral">{n.fecha}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
