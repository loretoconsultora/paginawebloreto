import Link from "next/link";
import { Share2, Link2, PlayCircle } from "lucide-react";

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";

export default function Footer() {
  return (
    <footer className="bg-white border-t" style={{ borderColor: "rgba(58,63,75,0.08)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <img
            src="/logo.svg"
            alt="Loreto Consultora"
            style={{ height: "52px", width: "auto" }}
          />

          {/* Tagline */}
          <p
            className="text-sm font-medium text-center sm:text-left max-w-sm"
            style={{ color: "#3A3F4B" }}
          >
            Transformamos tu valor en un negocio rentable para que vivas de tu pasión.
          </p>

          {/* Redes sociales */}
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-70 transition-opacity" aria-label="Instagram">
              <Share2 size={18} style={{ color: "#3A3F4B" }} />
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity" aria-label="LinkedIn">
              <Link2 size={18} style={{ color: "#3A3F4B" }} />
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity" aria-label="YouTube">
              <PlayCircle size={18} style={{ color: "#3A3F4B" }} />
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderColor: "rgba(58,63,75,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(58,63,75,0.4)" }}>
            © {new Date().getFullYear()} Loreto Consultora. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "rgba(58,63,75,0.4)" }}>
              Aviso de Privacidad
            </Link>
            <Link href="/terminos" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "rgba(58,63,75,0.4)" }}>
              Términos de Uso
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
