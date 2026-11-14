"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const MAGENTA = "#c0005a";

const navLinks = [
  { label: "Reto", href: "/reto", external: false },
  { label: "Servicios", href: "/servicios", external: false },
  { label: "Consultoría", href: "/consultoria", external: false },
  { label: "VictorIA Academy", href: "/victoria-academy", external: false },
  // { label: "Laboratorio de IA", href: "/laboratorio-ia", external: false }, // próximamente
  { label: "Eventos", href: "/eventos", external: false },
  // { label: "Consultoría", href: "/consultoria", external: false },
  // { label: "Blog", href: "/blog", external: false },
];


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || pathname === "/portal" || pathname === "/consultoria" || pathname?.startsWith("/eventos") || pathname?.startsWith("/victoria-academy") ? "glass shadow-glass py-3" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Loreto Consultora — inicio">
          <img src="/logo.svg" alt="Loreto Consultora" height={58} style={{ height: "58px", width: "auto" }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = !link.external && pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: isActive ? MAGENTA : undefined }}
                onMouseEnter={(e) => (e.currentTarget.style.color = MAGENTA)}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? MAGENTA : "")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/portal"
            className="text-sm font-semibold text-indigo-DEFAULT border border-indigo-DEFAULT/30 px-4 py-2 rounded-full hover:bg-indigo-pale transition-all duration-200"
          >
            Portal
          </Link>
          <Link
            href="https://wa.me/524427497345?text=Hola%20Loreto%20Consultora%2C%20he%20visto%20su%20información%20en%20su%20página%20web%20y%20me%20interesa%20hablar%20con%20ustedes%20sobre%20mi%20negocio."
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white px-5 py-2 rounded-full hover:opacity-90 transition-all duration-200 flex items-center gap-1.5"
            style={{ background: "#25D366", boxShadow: "0 4px 14px rgba(37,211,102,0.35)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </Link>
          <Link
            href="https://calendly.com/hello-loretoconsultora-jott/loreto-consultora-diagnostico"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white px-5 py-2 rounded-full hover:opacity-90 transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #FF6A92, #E894FF)", boxShadow: "0 8px 28px rgba(255,106,146,0.35)" }}
          >
            Agendar cita
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-grafito hover:text-coral transition-colors"
          aria-label="Menú"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden glass mt-2 mx-4 rounded-2xl p-6">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = !link.external && pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium transition-colors"
                  style={{ color: isActive ? MAGENTA : undefined }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-indigo-DEFAULT border border-indigo-DEFAULT/30 px-4 py-2 rounded-full text-center hover:bg-indigo-pale transition-all duration-200"
            >
              Portal
            </Link>
            <Link
              href="https://wa.me/524427497345?text=Hola%20Loreto%20Consultora%2C%20he%20visto%20su%20información%20en%20su%20página%20web%20y%20me%20interesa%20hablar%20con%20ustedes%20sobre%20mi%20negocio."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-white text-center px-5 py-3 rounded-full mt-2 flex items-center justify-center gap-2"
              style={{ background: "#25D366", boxShadow: "0 4px 14px rgba(37,211,102,0.35)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </Link>
            <Link
              href="https://calendly.com/hello-loretoconsultora-jott/loreto-consultora-diagnostico"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-white text-center px-5 py-3 rounded-full"
              style={{ background: "linear-gradient(135deg, #FF6A92, #E894FF)" }}
            >
              Agendar cita
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
