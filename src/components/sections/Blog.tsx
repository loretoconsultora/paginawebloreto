import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const articulos = [
  {
    categoria: "Marca Personal",
    titulo: "Cómo construir una propuesta de valor que realmente vende",
    extracto: "La diferencia entre una marca que atrae y una que convierte está en cómo comunica su valor único.",
    tiempo: "5 min",
    color: "text-coral",
    bg: "bg-coral/10",
    href: "/blog/propuesta-de-valor",
  },
  {
    categoria: "Estrategia",
    titulo: "Los 5 errores más comunes al posicionarte en redes sociales",
    extracto: "El posicionamiento no es sobre cuánto publicas, sino sobre qué comunicas y a quién.",
    tiempo: "7 min",
    color: "text-indigo-DEFAULT",
    bg: "bg-indigo-DEFAULT/10",
    href: "/blog/errores-posicionamiento",
  },
  {
    categoria: "Crecimiento",
    titulo: "De emprendedor a empresario: la mentalidad que lo cambia todo",
    extracto: "El salto más difícil en los negocios no es técnico. Es mental. Aquí te mostramos cómo darlo.",
    tiempo: "6 min",
    color: "text-lila-DEFAULT",
    bg: "bg-lila-DEFAULT/10",
    href: "/blog/emprendedor-a-empresario",
  },
];

export default function Blog() {
  return (
    <section className="py-20 bg-gradient-indigo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-coral mb-2">
              Conocimiento que transforma
            </p>
            <h2 className="font-playfair text-4xl font-bold text-grafito">
              Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-indigo-DEFAULT hover:text-coral transition-colors"
          >
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articulos.map((a) => (
            <Link
              key={a.titulo}
              href={a.href}
              className="glass rounded-3xl overflow-hidden hover:shadow-glass-hover transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`${a.bg} h-3 w-full`} />
              <div className="p-7">
                <div className={`text-xs font-semibold ${a.color} mb-3`}>{a.categoria}</div>
                <h3 className="font-playfair text-lg font-bold text-grafito mb-3 leading-snug group-hover:text-coral transition-colors">
                  {a.titulo}
                </h3>
                <p className="text-sm text-grafito/60 leading-relaxed mb-5">{a.extracto}</p>
                <div className="flex items-center gap-1 text-xs text-grafito/40">
                  <Clock size={12} />
                  {a.tiempo} de lectura
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
