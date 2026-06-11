import Link from "next/link";
import { Share2, Link2, PlayCircle } from "lucide-react";

const empresa = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Eventos", href: "/eventos" },
  { label: "Blog", href: "/blog" },
  { label: "Podcast", href: "/podcast" },
  { label: "Acción Social", href: "/accion-social" },
];

const recursos = [
  { label: "Kit de Herramientas", href: "/kit-empresarial" },
  { label: "Salón de la Fama", href: "/casos-de-exito" },
  { label: "Portal de Cliente", href: "/portal" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-grafito text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <img
              src="/logo.svg"
              alt="Loreto Consultora"
              style={{ height: "52px", width: "auto", marginBottom: "16px", filter: "brightness(0) invert(1)" }}
            />
            <p className="text-sm text-white/55 leading-relaxed mb-6 max-w-xs">
              Transformamos tu valor en un negocio rentable para que vivas de tu pasión. Gracias a la comunicación, el marketing digital y los sistemas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/50 hover:text-coral transition-colors" aria-label="Instagram">
                <Share2 size={18} />
              </a>
              <a href="#" className="text-white/50 hover:text-coral transition-colors" aria-label="LinkedIn">
                <Link2 size={18} />
              </a>
              <a href="#" className="text-white/50 hover:text-coral transition-colors" aria-label="YouTube">
                <PlayCircle size={18} />
              </a>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Empresa</h3>
            <ul className="space-y-2">
              {empresa.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/65 hover:text-coral transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Recursos</h3>
            <ul className="space-y-2">
              {recursos.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/65 hover:text-coral transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Loreto Consultora. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-xs text-white/35 hover:text-white/65 transition-colors">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos" className="text-xs text-white/35 hover:text-white/65 transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
