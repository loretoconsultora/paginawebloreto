"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Eventos", href: "/eventos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Kit Empresarial", href: "/kit-empresarial" },
  { label: "Acción Social", href: "/accion-social" },
  { label: "Portal", href: "/portal" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Logo icon fiel al original */}
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Arriba izquierda — teal pequeño */}
              <rect x="4" y="4" width="38" height="38" rx="9" fill="#2DD4BF" />
              {/* Arriba derecha — rosa grande */}
              <rect x="50" y="4" width="46" height="46" rx="11" fill="#F393AE" />
              {/* Abajo izquierda — amarillo en L */}
              <path d="M4 50 H46 V96 Q46 96 38 96 H12 Q4 96 4 88 V50Z" fill="#FCCD0D" />
              <rect x="4" y="50" width="58" height="12" rx="0" fill="#FCCD0D" />
              {/* Abajo derecha — teal rectangular */}
              <rect x="62" y="62" width="34" height="34" rx="9" fill="#2DD4BF" />
            </svg>
            <span className="font-playfair text-xl font-bold text-grafito">
              Loreto <span className="text-sm font-montserrat font-semibold tracking-widest text-coral">CONSULTORA</span>
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.slice(0, 6).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-grafito hover:text-coral transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
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
            href="/contacto"
            className="text-sm font-semibold text-white px-5 py-2 rounded-full gradient-brand hover:opacity-90 transition-all duration-200 shadow-coral"
          >
            Hablemos
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-grafito hover:text-coral transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold text-white text-center px-5 py-3 rounded-full gradient-brand mt-2"
            >
              Hablemos
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
