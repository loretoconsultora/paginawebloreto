"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";

type Props = {
  badge: string;
  ctaLabel?: string;
  formId?: string;
};

export default function LandingHeader({ badge, ctaLabel = "Reservar mi lugar", formId = "solicitud" }: Props) {
  const handleClick = () => {
    document.getElementById(formId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between gap-3 px-4 sm:px-6 py-3"
      style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(58,63,75,0.08)" }}
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: GRADIENT }}>
          <Image src="/victoria-academy/icon.png" alt="VictorIA Academy" width={18} height={18} />
        </div>
        <span className="font-playfair font-bold text-sm sm:text-base hidden sm:inline" style={{ color: "#445055" }}>
          VictorIA Academy
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest flex-shrink-0"
          style={{ background: "#171b1f", color: "white" }}
        >
          <Sparkles size={11} style={{ color: "#67C6C8" }} />
          {badge}
        </div>
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 text-white font-semibold px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm hover:opacity-90 transition-opacity flex-shrink-0"
          style={{ background: GRADIENT }}
        >
          {ctaLabel} →
        </button>
      </div>
    </header>
  );
}
