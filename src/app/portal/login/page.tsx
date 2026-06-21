"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const GRADIENT = "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)";

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    router.push("/portal/dashboard");
    router.refresh();
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center py-16 px-6" style={{ background: GRADIENT }}>
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-white text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={14} /> Inicio
        </Link>

        <p className="font-dancing text-3xl text-white mb-10">Portal del Cliente</p>

        <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl">
          <h1 className="font-playfair text-2xl font-bold text-grafito text-center mb-1">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-grafito/50 text-sm text-center mb-8">
            Ingresa tus datos para entrar al portal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-grafito/60 mb-1">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-grafito/40" />
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-grafito/15 text-sm outline-none focus:border-[#c0005a] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-grafito/60 mb-1">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-grafito/40" />
                <input
                  type="password"
                  required
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-grafito/15 text-sm outline-none focus:border-[#c0005a] transition-colors"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
              style={{ background: GRADIENT }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
    </main>
  );
}
