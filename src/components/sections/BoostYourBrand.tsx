import Link from "next/link";
import { Zap } from "lucide-react";

const INCLUDES = [
  "Estrategia de marca completa",
  "Manual de comunicación y posicionamiento",
  "Oferta irresistible lista para vender",
  "Estrategia de contenidos para redes",
  "Plan de lanzamiento digital activo",
  "Al menos 1 servicio digital monetizable",
];

const HREF = "https://boost-your-brand.vercel.app";
const CARD_GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const GOLD_GRADIENT = "linear-gradient(135deg, #b8860b 0%, #f5c842 45%, #ffe066 100%)";
const CARD_BG = "rgba(255,255,255,0.18)";

function GradientBorderButton({ href, gradient, children }: { href: string; gradient: string; children: React.ReactNode }) {
  return (
    <div style={{ background: gradient, padding: "2px", borderRadius: "999px" }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-sm font-bold py-3 rounded-full hover:opacity-90 transition-opacity"
        style={{ background: "#ffffff", borderRadius: "999px" }}
      >
        <span style={{
          background: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {children}
        </span>
      </Link>
    </div>
  );
}

export default function BoostYourBrand() {
  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Fondo */}
          <div className="absolute inset-0" style={{ background: CARD_GRADIENT }} />
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

              {/* CTA principal */}
              <Link
                href={HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white font-bold px-8 py-4 rounded-full text-base hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <span style={{
                  background: CARD_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Asegurar mi lugar →
                </span>
              </Link>
            </div>

            {/* Columna derecha — cards de precios */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-4 lg:min-w-72">

              {/* Título de la columna */}
              <h3
                className="font-playfair font-bold text-white sm:col-span-2 lg:col-span-1"
                style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)", lineHeight: 1.2, marginBottom: "4px" }}
              >
                El programa que lo cambia todo
              </h3>

              {/* Acceso General $444 */}
              <div
                className="rounded-3xl p-6 text-white flex-1 lg:flex-none backdrop-blur-md"
                style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.3)" }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-1">Acceso general</p>
                <p className="font-playfair text-xl font-bold mb-0.5">Boost Your Brand</p>
                <p className="font-playfair text-3xl font-black mb-4">$444 <span className="text-base font-normal text-white/60">USD</span></p>
                <ul className="space-y-2 mb-5">
                  {INCLUDES.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/85">
                      <span className="mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <GradientBorderButton href={HREF} gradient={CARD_GRADIENT}>
                  Activar acceso →
                </GradientBorderButton>
              </div>

              {/* Acceso VIP $1,110 */}
              <div
                className="rounded-3xl p-6 text-white flex-1 lg:flex-none backdrop-blur-md relative overflow-hidden"
                style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.3)" }}
              >
                <div
                  className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: GOLD_GRADIENT, color: "#1a0a2e" }}
                >
                  Solo 10 lugares
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-1">Acceso VIP</p>
                <p className="font-playfair text-xl font-bold mb-0.5">Bloom Your Brand</p>
                <p className="font-playfair text-3xl font-black mb-4">$1,110 <span className="text-base font-normal text-white/60">USD</span></p>
                <p className="text-sm text-white/75 mb-5">Todo lo del plan Boost + mentoría 1:1, piezas publicitarias y CRM incluido.</p>
                <GradientBorderButton href={HREF} gradient={GOLD_GRADIENT}>
                  Acceso VIP →
                </GradientBorderButton>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
