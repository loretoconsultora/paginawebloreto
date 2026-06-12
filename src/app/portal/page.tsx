"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, LayoutDashboard, FileBarChart2, CheckSquare, FolderOpen, MessageCircle, Bell } from "lucide-react";

const GRADIENT = "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)";
const TARGET = new Date("2026-06-15T09:00:00-05:00").getTime();

const FEATURES = [
  { icon: LayoutDashboard, label: "Dashboards en tiempo real" },
  { icon: FileBarChart2, label: "Reportes y métricas diarias" },
  { icon: CheckSquare, label: "Estatus de tareas" },
  { icon: FolderOpen, label: "Gestión de documentos" },
  { icon: MessageCircle, label: "Comunicación directa" },
  { icon: Bell, label: "Notificaciones y alertas" },
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

function useProgress() {
  const [progress, setProgress] = useState(70);
  const [dir, setDir] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + dir * 0.3;
        if (next >= 90) { setDir(-1); return 90; }
        if (next <= 70) { setDir(1); return 70; }
        return next;
      });
    }, 50);
    return () => clearInterval(id);
  }, [dir]);
  return progress;
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
  const progress = useProgress();

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 relative overflow-hidden">
        {/* Foto de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/portal/bg.jpg')" }}
        />
        {/* Overlay — opacidad más baja para ver la imagen */}
        <div className="absolute inset-0" style={{ background: GRADIENT, opacity: 0.75 }} />

        <div className="relative z-10 w-full max-w-4xl mx-auto">

          {/* Título cursivo sin recuadro */}
          <p className="font-dancing text-4xl sm:text-5xl text-white/90 mb-3">
            Portal del Cliente
          </p>

          <h1 className="font-playfair text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Próximamente
          </h1>

          {/* Barra de progreso — justo debajo del título */}
          <div className="mb-8 max-w-xl mx-auto">
            <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.20)" }}>
              <div
                className="h-2 rounded-full transition-all duration-75"
                style={{ width: `${progress}%`, background: "rgba(255,255,255,0.85)" }}
              />
            </div>
            <p className="text-white/40 text-xs mt-2 text-right">{Math.round(progress)}%</p>
          </div>

          <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Muy pronto tendrás acceso a tu espacio personal donde podrás gestionar todo tu proyecto en un solo lugar.
          </p>

          {/* Countdown */}
          <div className="mb-12">
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

          {/* Features — fila completa sin scroll */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 px-3 py-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <Icon size={18} className="text-white" />
                <span className="text-white text-xs font-medium leading-snug text-center">{label}</span>
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-10 text-white/60 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={14} /> Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
