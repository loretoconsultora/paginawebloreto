import Link from "next/link";
import { ArrowRight } from "lucide-react";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";

function GradientBorderButton({ href, target, children }: { href: string; target?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.9)", padding: "2px", borderRadius: "999px" }}>
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-base hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
        style={{ background: "#ffffff", borderRadius: "999px" }}
      >
        <span style={{
          background: GRADIENT,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {children}
        </span>
        <ArrowRight size={16} style={{ color: "#c0005a", flexShrink: 0 }} />
      </Link>
    </div>
  );
}

export default function CTAFinal() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: GRADIENT }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
          ¿Lista para transformar tu marca?
        </h2>
        <p className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Comienza con un diagnóstico gratuito. En 15 minutos sabrás exactamente dónde está tu marca y cuáles son los pasos para llevarla al siguiente nivel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GradientBorderButton href="https://brand-compass-pwa.vercel.app" target="_blank">
            Inicia ahora tu diagnóstico
          </GradientBorderButton>
          <GradientBorderButton href="/servicios">
            Explorar servicios
          </GradientBorderButton>
        </div>
      </div>
    </section>
  );
}
