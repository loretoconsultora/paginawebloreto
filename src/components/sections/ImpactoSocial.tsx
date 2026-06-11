import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";

export default function ImpactoSocial() {
  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden border" style={{ borderColor: "rgba(58,63,75,0.08)" }}>
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(232,148,255,0.12)" }} />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(255,106,146,0.08)" }} />

          <div className="relative z-10 px-8 sm:px-16 py-14 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6" style={{ background: "rgba(192,0,90,0.08)", color: "#c0005a", border: "1px solid rgba(192,0,90,0.2)" }}>
                <Heart size={12} fill="currentColor" />
                Acción Social
              </div>
              <h2
                className="font-playfair text-4xl font-bold mb-4"
                style={{
                  background: GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                El impacto va más allá del negocio
              </h2>
              <p className="text-grafito/70 leading-relaxed mb-6">
                Colaboramos activamente con fundaciones y grupos vulnerables en Ciudad de México y más países. Porque creemos que el conocimiento y las estrategias de marca también son herramientas de transformación social.
              </p>
              <p className="text-grafito/45 text-sm mb-8">
                Convocatoria siempre abierta para fundaciones que quieran fortalecer su comunicación y posicionamiento.
              </p>
              <Link
                href="/accion-social"
                className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
                style={{ background: GRADIENT }}
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
                <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: "rgba(58,63,75,0.04)", border: "1px solid rgba(58,63,75,0.08)" }}>
                  <div className="font-playfair text-2xl font-bold mb-1" style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.num}</div>
                  <div className="text-xs text-grafito/50 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
