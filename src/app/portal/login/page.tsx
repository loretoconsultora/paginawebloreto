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
    <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden" style={{ background: "#1a0a2e" }}>
      <div className="absolute inset-0 opacity-30" style={{ background: GRADIENT }} />

      <div className="relative z-10 w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl">
        <p className="font-dancing text-3xl text-center mb-1" style={{ color: "#c0005a" }}>
          Portal del Cliente
        </p>
        <h1 className="font-playfair text-2xl font-bold text-grafito text-center mb-8">
          Inicia sesión
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-grafito/40" />
            <input
              type="password"
              required
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-grafito/15 text-sm outline-none focus:border-[#c0005a] transition-colors"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
            style={{ background: GRADIENT }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 mt-6 text-grafito/50 hover:text-grafito text-sm transition-colors"
        >
          <ArrowLeft size={14} /> Volver al inicio
        </Link>
      </div>
    </main>
  );
}
