import { Heart } from "lucide-react";

const GRADIENT_MAIN = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const GRADIENT_A = "linear-gradient(135deg, #3a0ca3, #c0005a, #ff6a92)";
const GRADIENT_B = "linear-gradient(135deg, #1a0a2e, #6a00c8, #E894FF)";

export default function ImpactoSocial() {
  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Badge */}
        <div className="flex justify-center mb-4">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
            style={{ background: "rgba(192,0,90,0.08)", color: "#c0005a", border: "1px solid rgba(192,0,90,0.2)" }}
          >
            <Heart size={12} fill="currentColor" />
            Acción Social
          </div>
        </div>

        {/* Título */}
        <h2
          className="font-playfair text-4xl font-bold text-center mb-10 whitespace-nowrap"
          style={{
            background: GRADIENT_MAIN,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Un propósito que trasciende
        </h2>

        {/* Dos iniciativas lado a lado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">

          {/* Sep 2025 — izquierda */}
          <div className="rounded-3xl p-[3px]" style={{ background: GRADIENT_A }}>
            <div className="rounded-[22px] bg-white p-6 h-full">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{
                background: GRADIENT_A,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Sep 2025 · Presente · México
              </p>
              <p className="text-grafito/70 text-sm leading-relaxed">
                Colaboramos activamente con{" "}
                <a
                  href="https://jom-ac.org/quienes-somos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity"
                  style={{ color: "#c0005a" }}
                >
                  Fundación JOM, A.C.
                </a>
                {" "}— formaciones para jóvenes preuniversitarios y universitarios: preparación al ingreso a la universidad y talleres de inteligencia artificial responsiva.
              </p>
            </div>
          </div>

          {/* Oct 2025 — derecha */}
          <div className="rounded-3xl p-[3px]" style={{ background: GRADIENT_B }}>
            <div className="rounded-[22px] bg-white p-6 h-full">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{
                background: GRADIENT_B,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Oct 2025 · Valle del Cauca, Colombia
              </p>
              <p className="text-grafito/70 text-sm leading-relaxed">
                Llevamos conferencias y clases de inteligencia artificial, ventas y marca personal a jóvenes adolescentes de la región cafetera, impulsando su desarrollo profesional desde temprana edad.
              </p>
            </div>
          </div>

        </div>

        {/* Convocatoria abierta */}
        <p className="text-center text-grafito/50 text-sm">
          Convocatoria siempre abierta para fundaciones y proyectos sociales.{" "}
          <span className="text-grafito/40">Contacto directo:</span>{" "}
          <a
            href="mailto:hello@loretoconsultora.lat"
            className="font-semibold hover:opacity-70 transition-opacity"
            style={{
              background: GRADIENT_MAIN,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            hello@loretoconsultora.lat
          </a>
        </p>

      </div>
    </section>
  );
}
