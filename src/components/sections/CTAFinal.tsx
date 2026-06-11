import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTAFinal() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-brand opacity-95" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-lila-DEFAULT/20 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-dancing text-2xl text-white/80 mb-4">
          El momento es ahora
        </p>
        <h2 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
          ¿Lista para transformar tu marca?
        </h2>
        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Comienza con un diagnóstico gratuito. En 15 minutos sabrás exactamente dónde está tu marca y cuáles son los pasos para llevarla al siguiente nivel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacto"
            className="glass text-grafito font-semibold px-10 py-4 rounded-full text-base hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Solicita tu Brand Compass <ArrowRight size={16} />
          </Link>
          <Link
            href="/servicios"
            className="glass-dark text-white font-semibold px-10 py-4 rounded-full text-base border border-white/30 hover:bg-white/20 transition-all duration-300 text-center"
          >
            Explorar servicios
          </Link>
        </div>
      </div>
    </section>
  );
}
