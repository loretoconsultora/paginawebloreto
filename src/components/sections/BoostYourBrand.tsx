import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const INCLUDES = [
  "Estrategia de marca completa",
  "Manual de comunicación y posicionamiento",
  "Oferta irresistible lista para vender",
  "Estrategia de contenidos para redes",
  "Plan de lanzamiento digital activo",
  "Al menos 1 servicio digital monetizable",
];

const STATS = [
  { value: "+500", label: "Marcas construidas" },
  { value: "+500", label: "Alumnos formados" },
  { value: "LATAM", label: "USA & España" },
];

const HREF = "https://boost-your-brand.vercel.app";

export default function BoostYourBrand() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Fondo */}
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 px-8 sm:px-16 py-16 flex flex-col lg:flex-row items-start justify-between gap-12">

            {/* Columna izquierda */}
            <div className="text-white max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <Zap size={12} fill="currentColor" />
                ⚡ Próxima generación — Solo 45 lugares
              </div>

              <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-3 leading-tight">
                Boost Your Brand
              </h2>

              <p className="font-dancing text-2xl text-white/85 mb-5">
                Inicio: miércoles 1 de julio
              </p>

              <p className="text-white/90 text-lg leading-relaxed mb-3 font-medium">
                Dentro de ti hay un valor que el mundo necesita.
              </p>
              <p className="text-white/75 leading-relaxed mb-8">
                En 6 sesiones en vivo construyes tu identidad, tu oferta digital y sales con tu primer lanzamiento listo para escalar.
              </p>

              {/* Stats */}
              <div className="flex gap-8 mb-8">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="font-playfair text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-white/60 uppercase tracking-widest mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass text-grafito font-semibold px-8 py-4 rounded-full text-base hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Quiero mi lugar <ArrowRight size={16} />
                </Link>
                <Link
                  href={HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-dark text-white font-semibold px-8 py-4 rounded-full text-base border border-white/30 hover:bg-white/20 transition-all duration-300 text-center"
                >
                  Ver cómo funciona ↓
                </Link>
              </div>
            </div>

            {/* Columna derecha — card de precios */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-4 lg:min-w-72">

              {/* Plan Boost */}
              <div className="glass-dark rounded-3xl p-6 text-white flex-1 lg:flex-none border border-white/20">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-1">Programa completo</p>
                <p className="font-playfair text-xl font-bold mb-0.5">Boost Your Brand</p>
                <p className="font-playfair text-3xl font-black mb-4">$444 <span className="text-base font-normal text-white/60">USD</span></p>
                <ul className="space-y-2 mb-5">
                  {INCLUDES.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="text-coral-light mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-white/15 hover:bg-white/25 transition-colors text-white text-sm font-semibold py-3 rounded-full"
                >
                  Activar acceso →
                </Link>
              </div>

              {/* Plan VIP */}
              <div className="rounded-3xl p-6 text-white flex-1 lg:flex-none border-2 border-white/40 bg-white/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">Solo 10 lugares</div>
                <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-1">Acceso VIP</p>
                <p className="font-playfair text-xl font-bold mb-0.5">Bloom Your Brand</p>
                <p className="font-playfair text-3xl font-black mb-4">$1,110 <span className="text-base font-normal text-white/60">USD</span></p>
                <p className="text-sm text-white/70 mb-5">Todo lo del plan Boost + mentoría 1:1, piezas publicitarias y CRM incluido.</p>
                <Link
                  href={HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-white text-grafito text-sm font-bold py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  Acceso VIP →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
