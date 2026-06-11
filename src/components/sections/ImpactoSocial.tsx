import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export default function ImpactoSocial() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-grafito">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-coral/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-lila-DEFAULT/10 blur-3xl" />

          <div className="relative z-10 px-8 sm:px-16 py-14 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-white max-w-lg">
              <div className="inline-flex items-center gap-2 bg-coral/20 text-coral text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <Heart size={12} fill="currentColor" />
                Acción Social
              </div>
              <h2 className="font-playfair text-4xl font-bold mb-4">
                El impacto va más allá del negocio
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Colaboramos activamente con fundaciones y grupos vulnerables en Ciudad de México y más países. Porque creemos que el conocimiento y las estrategias de marca también son herramientas de transformación social.
              </p>
              <p className="text-white/50 text-sm mb-8">
                Convocatoria siempre abierta para fundaciones que quieran fortalecer su comunicación y posicionamiento.
              </p>
              <Link
                href="/accion-social"
                className="inline-flex items-center gap-2 bg-coral text-white font-semibold px-7 py-3.5 rounded-full hover:bg-coral-light transition-colors duration-200"
              >
                Conoce nuestra misión <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 min-w-64">
              {[
                { num: "1+", label: "Fundación activa" },
                { num: "5", label: "Países" },
                { num: "∞", label: "Convocatoria abierta" },
                { num: "2026", label: "Expandiendo impacto" },
              ].map((s) => (
                <div key={s.label} className="glass-dark rounded-2xl p-5 text-center text-white">
                  <div className="font-playfair text-2xl font-bold mb-1">{s.num}</div>
                  <div className="text-xs text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
