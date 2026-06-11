import Link from "next/link";
import { ArrowRight, Users, TrendingUp, BookOpen, Building2, GraduationCap, Heart } from "lucide-react";

const servicios = [
  {
    icono: Users,
    color: "text-coral",
    bg: "bg-coral/10",
    titulo: "Consultoría",
    descripcion: "Sesiones 1:1 y grupales para diseñar la estrategia de tu marca con acompañamiento personalizado.",
    href: "/servicios/consultoria",
  },
  {
    icono: TrendingUp,
    color: "text-indigo-DEFAULT",
    bg: "bg-indigo-DEFAULT/10",
    titulo: "Marketing Digital",
    descripcion: "Ejecutamos las estrategias de marketing por ti: posicionamiento, contenido, conversión y crecimiento.",
    href: "/servicios/marketing-digital",
  },
  {
    icono: BookOpen,
    color: "text-lila-DEFAULT",
    bg: "bg-lila-DEFAULT/10",
    titulo: "Talleres y Formaciones",
    descripcion: "Talleres especializados y programas de formación para emprendedores y equipos que quieren crecer.",
    href: "/servicios/talleres-y-formaciones",
  },
  {
    icono: Building2,
    color: "text-coral",
    bg: "bg-coral/10",
    titulo: "Programas Empresariales",
    descripcion: "Programas a medida para startups, PYMEs y corporaciones que buscan escalar con estrategia.",
    href: "/servicios/programas-empresariales",
  },
  {
    icono: GraduationCap,
    color: "text-indigo-DEFAULT",
    bg: "bg-indigo-DEFAULT/10",
    titulo: "Programas Académicos",
    descripcion: "Colaboraciones con escuelas y universidades en México, Argentina, Colombia, EE.UU. y España.",
    href: "/servicios/programas-academicos",
  },
  {
    icono: Heart,
    color: "text-lila-DEFAULT",
    bg: "bg-lila-DEFAULT/10",
    titulo: "Acción Social",
    descripcion: "Programas de impacto para fundaciones y grupos vulnerables. Convocatoria siempre abierta.",
    href: "/accion-social",
  },
];

export default function Servicios() {
  return (
    <section className="py-20 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-coral mb-2">
            Lo que hacemos
          </p>
          <h2 className="font-playfair text-4xl font-bold text-grafito mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-grafito/60 max-w-xl mx-auto text-base">
            Desde la estrategia hasta la ejecución, acompañamos marcas en cada etapa de su crecimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((s) => {
            const Icon = s.icono;
            return (
              <Link
                key={s.titulo}
                href={s.href}
                className="glass rounded-3xl p-7 hover:shadow-glass-hover transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mb-5`}>
                  <Icon size={22} className={s.color} />
                </div>
                <h3 className="font-playfair text-xl font-bold text-grafito mb-2 group-hover:text-coral transition-colors">
                  {s.titulo}
                </h3>
                <p className="text-sm text-grafito/60 leading-relaxed mb-5">
                  {s.descripcion}
                </p>
                <div className={`flex items-center gap-1 text-xs font-semibold ${s.color}`}>
                  Conocer más <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
