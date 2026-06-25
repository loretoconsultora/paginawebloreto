"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";

export default function VictoriaPortalPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6" style={{ background: "#fafafa" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center bg-white rounded-2xl p-8 sm:p-10"
        style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.1)" }}
      >
        <div
          className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-5"
          style={{ background: GRADIENT }}
        >
          <Image src="/victoria-academy/icon.png" alt="VictorIA Academy" width={28} height={28} />
        </div>
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[11px] font-bold uppercase tracking-widest"
          style={{ background: "rgba(62,126,202,0.08)", color: "#3E7ECA" }}
        >
          <Sparkles size={12} /> Próximamente
        </div>
        <h1 className="font-playfair text-2xl font-bold text-grafito mb-2">Tu portal de alumno está en construcción</h1>
        <p className="text-sm text-grafito/60 leading-relaxed mb-6">
          Estamos preparando tu espacio personal de VictorIA Academy: materiales, biblioteca de prompts y seguimiento de tu progreso. Te avisaremos por WhatsApp en cuanto esté listo.
        </p>
        <Link
          href="/victoria-academy"
          className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
          style={{ background: GRADIENT }}
        >
          Volver a VictorIA Academy
        </Link>
      </motion.div>
    </main>
  );
}
