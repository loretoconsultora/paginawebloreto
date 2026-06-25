"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const GRADIENT = "linear-gradient(135deg, #6A8AFF 0%, #3E7ECA 55%, #67C6C8 100%)";

export default function VictoriaLoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setTimeout(() => router.push("/victoria-academy/portal"), 900);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6" style={{ background: GRADIENT }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10"
        style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}
      >
        <div className="flex flex-col items-center mb-7">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: GRADIENT }}
          >
            <Image src="/victoria-academy/icon.png" alt="VictorIA Academy" width={28} height={28} />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-grafito mb-1">VictorIA Academy</h1>
          <p className="text-xs text-grafito/50">Inicia sesión en tu portal de alumno</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              required
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full rounded-xl border border-gray-200 pl-11 pr-4 py-2.5 text-sm text-grafito placeholder:text-gray-400 focus:outline-none focus:border-[#6A8AFF] transition-colors"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              required
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 pl-11 pr-4 py-2.5 text-sm text-grafito placeholder:text-gray-400 focus:outline-none focus:border-[#6A8AFF] transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-grafito/50 -mt-1">
            <label className="flex items-center gap-1.5">
              <input type="checkbox" className="rounded" /> Recordarme
            </label>
            <span className="cursor-pointer hover:text-grafito/70">¿Olvidaste tu contraseña?</span>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-60 mt-1"
            style={{ background: GRADIENT, boxShadow: "0 8px 24px rgba(62,126,202,0.3)" }}
          >
            {cargando ? "Ingresando…" : "Iniciar sesión"} {!cargando && <ArrowRight size={15} />}
          </button>
        </form>

        <p className="text-xs text-grafito/45 text-center mt-6">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/victoria-academy" className="font-semibold" style={{ color: "#3E7ECA" }}>
            Conoce nuestros programas
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
