import Link from "next/link";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t" style={{ borderColor: "rgba(58,63,75,0.08)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <img
            src="/logo.svg"
            alt="Loreto Consultora"
            style={{ height: "52px", width: "auto", flexShrink: 0 }}
          />

          {/* Tagline */}
          <p
            className="text-sm font-medium text-center sm:text-left"
            style={{ color: "#3A3F4B" }}
          >
            Reconoce, Conecta, Comparte y Expande tu Valor
          </p>

          {/* Redes sociales + email */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/loretoconsultora"
              target="_blank" rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
              aria-label="Facebook"
              style={{ color: "#3A3F4B" }}
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/loreto.consultora/"
              target="_blank" rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
              aria-label="Instagram"
              style={{ color: "#3A3F4B" }}
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/loreto-consultora/"
              target="_blank" rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
              aria-label="LinkedIn"
              style={{ color: "#3A3F4B" }}
            >
              <LinkedInIcon />
            </a>
            <a
              href="mailto:hello@loretoconsultora.lat"
              className="hover:opacity-60 transition-opacity"
              aria-label="Email"
              style={{ color: "#3A3F4B" }}
            >
              <MailIcon />
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderColor: "rgba(58,63,75,0.08)" }}>
          <p className="text-xs" style={{ color: "rgba(58,63,75,0.4)" }}>
            © {new Date().getFullYear()} Loreto Consultora. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/politicadeprivacidad" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "rgba(58,63,75,0.4)" }}>
              Política de Privacidad
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
