import Link from "next/link";
import { Share2, Link2, PlayCircle } from "lucide-react";

const countries = [
  { flag: "🇲🇽", name: "México" },
  { flag: "🇦🇷", name: "Argentina" },
  { flag: "🇨🇴", name: "Colombia" },
  { flag: "🇺🇸", name: "Estados Unidos" },
  { flag: "🇪🇸", name: "España" },
];

const links = {
  servicios: [
    { label: "Consultoría", href: "/servicios/consultoria" },
    { label: "Marketing Digital", href: "/servicios/marketing-digital" },
    { label: "Talleres y Formaciones", href: "/servicios/talleres-y-formaciones" },
    { label: "Boost Your Brand", href: "/boost-your-brand" },
    { label: "Programas Académicos", href: "/servicios/programas-academicos" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Eventos", href: "/eventos" },
    { label: "Blog", href: "/blog" },
    { label: "Podcast", href: "/podcast" },
    { label: "Acción Social", href: "/accion-social" },
  ],
  recursos: [
    { label: "Kit Empresarial", href: "/kit-empresarial" },
    { label: "Nuestras Marcas", href: "/casos-de-exito" },
    { label: "Portal de Cliente", href: "/portal" },
    { label: "Contacto", href: "/contacto" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-grafito text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 relative">
                <div className="absolute top-0 left-0 w-3 h-3 bg-[#2dd4bf] rounded-sm" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-[#F393AE] rounded-sm" />
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#FCCD0D] rounded-sm" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2dd4bf] rounded-sm" />
              </div>
              <span className="font-playfair text-lg font-bold text-white">
                Loreto <span className="text-xs font-montserrat font-semibold tracking-widest text-coral-light">CONSULTORA</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              Transformamos marcas en negocios rentables. Estrategia, comunicación y ventas para emprendedores, PYMEs y corporaciones.
            </p>
            {/* Países */}
            <div className="flex flex-wrap gap-2 mb-6">
              {countries.map((c) => (
                <span key={c.name} className="text-xs bg-white/10 px-3 py-1 rounded-full">
                  {c.flag} {c.name}
                </span>
              ))}
            </div>
            {/* Redes */}
            <div className="flex gap-4">
              <a href="#" className="text-white/50 hover:text-coral transition-colors" aria-label="Instagram">
                <Share2 size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-coral transition-colors" aria-label="LinkedIn">
                <Link2 size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-coral transition-colors" aria-label="YouTube">
                <PlayCircle size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                {section === "servicios" ? "Servicios" : section === "empresa" ? "Empresa" : "Recursos"}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 hover:text-coral transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Loreto Consultora. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
