"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

const GRADIENT = "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)";
// 15 de junio 2026, 9:00 AM hora México (CDT = UTC-5)
const TARGET = new Date("2026-06-15T09:00:00-05:00").getTime();

const FEATURES = [
  { icon: "📊", label: "Dashboards en tiempo real" },
  { icon: "📋", label: "Reportes y métricas diarias" },
  { icon: "✅", label: "Estatus de tareas en curso" },
  { icon: "📁", label: "Gestión de documentos" },
  { icon: "💬", label: "Comunicación directa con tu equipo" },
  { icon: "🔔", label: "Notificaciones y alertas" },
];

function useCountdown() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
      >
        <span className="font-playfair font-bold text-white text-3xl sm:text-4xl leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">{label}</span>
    </div>
  );
}

export default function PortalPage() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 relative overflow-hidden"
      >
        {/* Foto de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/portal/bg.jpg')" }}
        />
        {/* Overlay degradado magenta-rosa con alta opacidad para que predomine el color */}
        <div className="absolute inset-0" style={{ background: GRADIENT, opacity: 0.88 }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8 backdrop-blur-sm border border-white/20">
            🔒 Portal del Cliente
          </div>

          <h1 className="font-playfair text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight">
            Próximamente
          </h1>
          <p className="text-white/75 text-lg leading-relaxed mb-12">
            Muy pronto tendrás acceso a tu espacio personal donde podrás gestionar todo tu proyecto en un solo lugar.
          </p>

          {/* Countdown */}
          <div className="mb-4">
            <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-6">
              Lanzamiento en
            </p>
            <div className="flex items-start justify-center gap-3 sm:gap-5">
              <Unit value={days} label="días" />
              <span className="text-white/30 font-bold text-3xl mt-5">:</span>
              <Unit value={hours} label="horas" />
              <span className="text-white/30 font-bold text-3xl mt-5">:</span>
              <Unit value={minutes} label="min" />
              <span className="text-white/30 font-bold text-3xl mt-5">:</span>
              <Unit value={seconds} label="seg" />
            </div>
            <p className="text-white/40 text-xs mt-4">15 de junio · 9:00 AM hora México</p>
          </div>

          {/* Features */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="flex items-start gap-3 px-4 py-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <span className="text-lg flex-shrink-0">{f.icon}</span>
                <span className="text-white/80 text-sm font-medium leading-snug">{f.label}</span>
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-12 text-white/60 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={14} /> Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
