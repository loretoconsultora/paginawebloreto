"use client";

import Image from "next/image";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";

type Props = {
  badge?: string;
  accent: string;
  ctaLabel?: string;
  formId?: string;
};

export default function LandingHeader({ accent, ctaLabel = "Aplicar AHORA", formId = "solicitud" }: Props) {
  const handleClick = () => {
    document.getElementById(formId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="py-4 sticky top-0 z-50"
      style={{ background: "#ffffff", borderBottom: "1px solid rgba(58,63,75,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: GRADIENT }}>
            <Image src="/victoria-academy/icon.png" alt="VictorIA Academy" width={18} height={18} />
          </div>
          <span className="font-extrabold text-sm sm:text-base hidden sm:inline" style={{ color: "#445055" }}>
            VictorIA Academy
          </span>
        </div>

        <button
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 font-semibold px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm text-white hover:opacity-90 transition-opacity flex-shrink-0"
          style={{ background: GRADIENT }}
        >
          {ctaLabel} →
        </button>
      </div>
    </header>
  );
}
