import { Trophy } from "lucide-react";

const logros = [
  {
    cliente: "Susana R.",
    industria: "Coaching",
    logro: "Grabó su primer contenido de marca y lo publicó en todas sus plataformas",
    emoji: "🎬",
  },
  {
    cliente: "Electronic Point",
    industria: "Tecnología",
    logro: "Logró su primer contenido viral con más de 50K reproducciones",
    emoji: "🚀",
  },
  {
    cliente: "Tatoox",
    industria: "E-commerce",
    logro: "Rompió récord en ventas mensuales gracias a su nueva estrategia digital",
    emoji: "📈",
  },
  {
    cliente: "Marcela V.",
    industria: "Consultoría",
    logro: "Lanzó su primera oferta premium y cerró 3 clientes en la primera semana",
    emoji: "✨",
  },
  {
    cliente: "Studio Alma",
    industria: "Diseño",
    logro: "Redefinió su posicionamiento y aumentó su ticket promedio en un 60%",
    emoji: "🎨",
  },
  {
    cliente: "Roots Wellness",
    industria: "Bienestar",
    logro: "Abrió su segunda sucursal tras 4 meses de trabajo estratégico",
    emoji: "🌿",
  },
];

export default function LogrosDestacados() {
  return (
    <section className="py-20 bg-gradient-indigo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-dorado/20 text-dorado-oscuro text-xs font-semibold px-4 py-2 rounded-full mb-4">
            <Trophy size={12} />
            Este mes
          </div>
          <h2 className="font-playfair text-4xl font-bold text-grafito mb-3">
            Logros Destacados
          </h2>
          <p className="text-grafito/60 max-w-lg mx-auto">
            Cada hito de nuestros clientes es una prueba de que la estrategia correcta transforma negocios.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {logros.map((l) => (
            <div
              key={l.cliente}
              className="glass rounded-3xl p-6 hover:shadow-glass-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{l.emoji}</div>
              <p className="text-sm text-grafito/60 mb-1 font-medium">{l.industria}</p>
              <h3 className="font-playfair text-lg font-bold text-grafito mb-2">{l.cliente}</h3>
              <p className="text-sm text-grafito/70 leading-relaxed">{l.logro}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
