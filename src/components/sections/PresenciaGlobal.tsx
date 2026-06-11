const countries = [
  { flag: "🇲🇽", name: "México", city: "Ciudad de México" },
  { flag: "🇦🇷", name: "Argentina", city: "Buenos Aires" },
  { flag: "🇨🇴", name: "Colombia", city: "Bogotá" },
  { flag: "🇺🇸", name: "Estados Unidos", city: "Miami · Los Ángeles" },
  { flag: "🇪🇸", name: "España", city: "Madrid" },
];

export default function PresenciaGlobal() {
  return (
    <section className="py-12 bg-white/60 backdrop-blur-sm border-y border-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-montserrat font-semibold tracking-widest uppercase text-grafito/40 mb-8">
          Presencia en 5 países
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          {countries.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-3 glass rounded-2xl px-5 py-3 hover:shadow-glass-hover transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="text-2xl">{c.flag}</span>
              <div>
                <div className="text-sm font-semibold text-grafito">{c.name}</div>
                <div className="text-xs text-grafito/50">{c.city}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
