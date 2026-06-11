import Link from "next/link";
import { Download, ArrowRight, FileText, BarChart2, Lightbulb } from "lucide-react";

const recursos = [
  {
    icono: FileText,
    titulo: "Brand Compass",
    descripcion: "Diagnóstico gratuito de tu marca en todas las esferas.",
    color: "text-coral",
    bg: "bg-coral/10",
  },
  {
    icono: BarChart2,
    titulo: "Mapa de Posicionamiento",
    descripcion: "Herramienta para identificar tu ventaja competitiva.",
    color: "text-indigo-DEFAULT",
    bg: "bg-indigo-DEFAULT/10",
  },
  {
    icono: Lightbulb,
    titulo: "Guía de Contenido Estratégico",
    descripcion: "30 ideas de contenido alineadas a tu etapa de marca.",
    color: "text-lila-DEFAULT",
    bg: "bg-lila-DEFAULT/10",
  },
];

export default function KitEmpresarial() {
  return (
    <section className="py-20 bg-gradient-indigo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-coral mb-2">
            Recursos gratuitos
          </p>
          <h2 className="font-playfair text-4xl font-bold text-grafito mb-3">
            Kit Empresarial
          </h2>
          <p className="text-grafito/60 max-w-lg mx-auto">
            Herramientas diseñadas por Loreto Consultora para que empieces a transformar tu marca hoy mismo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {recursos.map((r) => {
            const Icon = r.icono;
            return (
              <div key={r.titulo} className="glass rounded-3xl p-7">
                <div className={`w-11 h-11 rounded-xl ${r.bg} flex items-center justify-center mb-5`}>
                  <Icon size={20} className={r.color} />
                </div>
                <h3 className="font-playfair text-lg font-bold text-grafito mb-2">{r.titulo}</h3>
                <p className="text-sm text-grafito/60 mb-5">{r.descripcion}</p>
                <button className={`flex items-center gap-2 text-xs font-semibold ${r.color}`}>
                  <Download size={12} /> Descargar gratis
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/kit-empresarial"
            className="inline-flex items-center gap-2 gradient-brand text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-coral"
          >
            Ver todos los recursos <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
