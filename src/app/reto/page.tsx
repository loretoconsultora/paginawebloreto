"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Colores / gradientes ────────────────────────────────────────────────────
const G_MAIN   = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const G_GOLD   = "linear-gradient(135deg, #b8860b 0%, #f5c842 45%, #ffe066 100%)";
const G_BLUE   = "linear-gradient(135deg, #93c5fd, #a5b4fc, #c4b5f4)";
const G_PINK   = "linear-gradient(135deg, #f9a8d4, #f472b6, #a78bfa)";
const MAGENTA  = "#c0005a";
const HREF_GENERAL = "https://buy.stripe.com/6oU9AT17d0LL8VS1D32Nq06";
const HREF_VIP     = "https://buy.stripe.com/6oU28r7vB1PPgok0yZ2Nq05";

// ─── Countdown — mismo cálculo que home ──────────────────────────────────────
function getNextFirstMonday(): number {
  const now = new Date();
  const findFirstMonday = (year: number, month: number) => {
    const d = new Date(year, month, 1);
    const offset = d.getDay() === 1 ? 0 : (8 - d.getDay()) % 7;
    const day = 1 + offset;
    const pad = (n: number) => String(n).padStart(2, "0");
    return new Date(`${year}-${pad(month + 1)}-${pad(day)}T18:00:00-06:00`).getTime();
  };
  const y = now.getFullYear(), m = now.getMonth();
  const target = findFirstMonday(y, m);
  if (target > now.getTime()) return target;
  const next = m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 };
  return findFirstMonday(next.y, next.m);
}

function useCountdown() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = getNextFirstMonday() - Date.now();
      if (diff <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setT({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
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

function CDUnit({ value, label, white }: { value: number; label: string; white?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-playfair font-black text-3xl leading-none"
        style={white ? { color: "white" } : { background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] font-semibold tracking-widest uppercase mt-1"
        style={{ color: white ? "rgba(255,255,255,0.65)" : "#3A3F4B", opacity: white ? 1 : 0.5 }}>{label}</span>
    </div>
  );
}

// ─── Helper: formato de fecha en español ─────────────────────────────────────
function formatDate(d: Date): string {
  const months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

// ─── Países con lada ─────────────────────────────────────────────────────────
const LADAS = [
  { flag: "🇲🇽", code: "+52",  name: "México" },
  { flag: "🇺🇸", code: "+1",   name: "EE. UU." },
  { flag: "🇪🇸", code: "+34",  name: "España" },
  { flag: "🇨🇴", code: "+57",  name: "Colombia" },
  { flag: "🇦🇷", code: "+54",  name: "Argentina" },
  { flag: "🇻🇪", code: "+58",  name: "Venezuela" },
  { flag: "🇨🇱", code: "+56",  name: "Chile" },
  { flag: "🇵🇪", code: "+51",  name: "Perú" },
  { flag: "🇪🇨", code: "+593", name: "Ecuador" },
  { flag: "🇬🇹", code: "+502", name: "Guatemala" },
  { flag: "🇧🇷", code: "+55",  name: "Brasil" },
  { flag: "🇵🇦", code: "+507", name: "Panamá" },
  { flag: "🇩🇴", code: "+1",   name: "Rep. Dom." },
  { flag: "🇨🇷", code: "+506", name: "Costa Rica" },
  { flag: "🇺🇾", code: "+598", name: "Uruguay" },
  { flag: "🇵🇾", code: "+595", name: "Paraguay" },
  { flag: "🇧🇴", code: "+591", name: "Bolivia" },
  { flag: "🇭🇳", code: "+504", name: "Honduras" },
  { flag: "🇸🇻", code: "+503", name: "El Salvador" },
  { flag: "🇳🇮", code: "+505", name: "Nicaragua" },
  { flag: "🇵🇹", code: "+351", name: "Portugal" },
  { flag: "🇫🇷", code: "+33",  name: "Francia" },
  { flag: "🇩🇪", code: "+49",  name: "Alemania" },
  { flag: "🇮🇹", code: "+39",  name: "Italia" },
  { flag: "🇬🇧", code: "+44",  name: "Reino Unido" },
  { flag: "🇨🇦", code: "+1",   name: "Canadá" },
];

const WA_DUDAS = `https://wa.me/524427497345?text=${encodeURIComponent("Hola Loreto Consultora, me interesa el Reto Boost y/o Bloom Your Brand, pero todavía tengo algunas consultas que me gustaría hacer antes de realizar mi pago.")}`;

// ─── Modal de registro ────────────────────────────────────────────────────────
function RegistroModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ nombre: "", lada: "+52", telefono: "", correo: "", negocio: "", confirmar: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const nextDate = formatDate(new Date(getNextFirstMonday()));

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? target.checked : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.confirmar) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 600);
  }

  const inputStyle = { border: "1.5px solid rgba(192,0,90,0.2)", color: "#3A3F4B", background: "#fafafa" };
  const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "#c0005a");
  const blurHandler  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "rgba(192,0,90,0.2)");

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ background: "rgba(26,10,46,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "white", maxHeight: "92vh", overflowY: "auto" }}>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center" style={{ background: G_MAIN }}>
          <button onClick={onClose} className="absolute top-4 right-5 text-white/70 hover:text-white text-2xl leading-none">×</button>
          <p className="font-semibold text-xs uppercase tracking-widest text-white/75 mb-1">Reto Boost &amp; Bloom Your Brand</p>
          <h2 className="font-playfair font-bold text-2xl text-white">Reserva tu lugar</h2>
          <p className="text-white/70 text-sm mt-1">Próxima generación · {nextDate}</p>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          {!sent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Nombre */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#3A3F4B", opacity: 0.65 }}>Nombre completo</label>
                <input required name="nombre" type="text" placeholder="Tu nombre"
                  value={form.nombre} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>

              {/* Teléfono con lada */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#3A3F4B", opacity: 0.65 }}>Teléfono / WhatsApp</label>
                <div className="flex gap-2">
                  <select name="lada" value={form.lada} onChange={handleChange}
                    className="px-3 py-3 rounded-xl text-sm outline-none transition-all flex-shrink-0"
                    style={{ ...inputStyle, width: "110px" }}
                    onFocus={focusHandler} onBlur={blurHandler}>
                    {LADAS.map((l) => (
                      <option key={`${l.flag}${l.code}`} value={l.code}>
                        {l.flag} {l.code}
                      </option>
                    ))}
                  </select>
                  <input required name="telefono" type="tel" placeholder="442 749 7345"
                    value={form.telefono} onChange={handleChange}
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                </div>
              </div>

              {/* Correo */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#3A3F4B", opacity: 0.65 }}>Correo electrónico</label>
                <input required name="correo" type="email" placeholder="hola@tu-negocio.com"
                  value={form.correo} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>

              {/* Negocio */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#3A3F4B", opacity: 0.65 }}>Nombre de tu negocio / marca</label>
                <input required name="negocio" type="text" placeholder="Mi negocio"
                  value={form.negocio} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer mt-1">
                <input type="checkbox" name="confirmar" checked={form.confirmar} onChange={handleChange}
                  className="mt-0.5 flex-shrink-0 w-4 h-4 rounded accent-pink-600" required />
                <span className="text-sm leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.8 }}>
                  Confirmo que me apunto al próximo Reto que inicia el <strong style={{ color: MAGENTA }}>{nextDate}</strong>
                </span>
              </label>

              <button type="submit" disabled={loading || !form.confirmar}
                className="mt-2 w-full py-4 rounded-full font-bold text-sm text-white hover:opacity-90 transition-all disabled:opacity-50"
                style={{ background: G_MAIN, boxShadow: "0 8px 24px rgba(192,0,90,0.3)" }}>
                {loading ? "Enviando…" : "Apuntarme al Reto →"}
              </button>

              <p className="text-center text-xs opacity-40 mt-1">Tus datos son confidenciales y no se comparten.</p>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="font-playfair font-bold text-xl mb-3" style={{ color: "#3A3F4B" }}>¡Estás apuntado!</h3>
              <p className="text-sm mb-7 font-semibold" style={{ color: MAGENTA }}>
                Confirma tu lugar completando el pago:
              </p>
              <div className="flex flex-col gap-3 mb-6">
                <a href={HREF_GENERAL} target="_blank" rel="noopener noreferrer"
                  className="block w-full py-4 rounded-full font-bold text-sm text-white hover:opacity-90 transition-all"
                  style={{ background: G_MAIN, boxShadow: "0 8px 24px rgba(192,0,90,0.25)" }}>
                  Boost Your Brand — $333 USD →
                </a>
                <a href={HREF_VIP} target="_blank" rel="noopener noreferrer"
                  className="block w-full py-4 rounded-full font-bold text-sm hover:opacity-90 transition-all"
                  style={{ background: G_GOLD, color: "#1a0a2e" }}>
                  Bloom Your Brand — $649 USD ✦
                </a>
              </div>
              {/* Botón WA dudas */}
              <a href={WA_DUDAS} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full transition-opacity hover:opacity-80"
                style={{ background: "rgba(37,211,102,0.1)", color: "#1a7a3c", border: "1px solid rgba(37,211,102,0.3)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                ¿Tienes dudas? Escríbenos por WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sección 1: Hero ──────────────────────────────────────────────────────────
function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  const { days, hours, minutes, seconds } = useCountdown();
  return (
    <section className="min-h-screen flex items-center pt-28 pb-20 px-5 lg:px-8 relative overflow-hidden bg-white">
      {/* blobs decorativos lado derecho */}
      <div className="absolute -top-32 right-0 w-[380px] h-[380px] rounded-full" style={{ background: "radial-gradient(circle, rgba(232,148,255,0.07) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* aurora keyframe */}
      <style>{`
        @keyframes aurora {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-8 items-stretch">

          {/* Columna izquierda — degradado con título del reto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
            className="order-1 flex flex-col items-center justify-center gap-8 rounded-3xl px-10 py-14 text-center"
            style={{
              background: "linear-gradient(135deg, #1a0a2e, #c0005a, #E894FF, #c0005a, #1a0a2e)",
              backgroundSize: "300% 300%",
              animation: "aurora 10s ease infinite",
            }}
          >
            {/* Título */}
            <div>
              <p className="font-semibold text-3xl mb-2" style={{ color: "rgba(255,255,255,0.75)" }}>Reto</p>
              <div className="font-playfair font-black uppercase leading-none text-white">
                <span className="block" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)" }}>Boost &amp; Bloom</span>
                <span className="block" style={{ fontSize: "clamp(3rem,7vw,4.5rem)", display: "inline-block", animation: "float-y 4s ease-in-out infinite" }}>
                  Your Brand
                </span>
              </div>
              <div className="mt-4 h-0.5 w-24 mx-auto rounded-full" style={{ background: "rgba(255,255,255,0.4)" }} />
            </div>

            {/* Countdown card */}
            <div className="w-full max-w-xs rounded-2xl px-6 py-6 text-center"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.25)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-white">
                ⚡ Próxima generación — solo 20 lugares
              </p>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.65)" }}>
                Arrancamos 1° Lunes de cada mes
              </p>
              <div className="flex items-center justify-center gap-3">
                <CDUnit value={days} label="días" white />
                <span className="font-bold text-lg mb-3 text-white/40">:</span>
                <CDUnit value={hours} label="horas" white />
                <span className="font-bold text-lg mb-3 text-white/40">:</span>
                <CDUnit value={minutes} label="min" white />
                <span className="font-bold text-lg mb-3 text-white/40">:</span>
                <CDUnit value={seconds} label="seg" white />
              </div>
            </div>
          </motion.div>

          {/* Columna derecha — texto + botones + stats */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="order-2 flex flex-col justify-center text-center lg:text-left px-0 lg:px-8 py-12 lg:py-0">
            <p className="text-base lg:text-lg mb-2 leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.75 }}>
              Dentro de ti hay un valor que el mundo necesita —<br className="hidden sm:block" />
              este Reto se trata de reconocerlo, reconectarlo y compartirlo.
            </p>
            <h1 className="font-playfair font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}>
              <span style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Conquista el mundo digital
              </span>
            </h1>

            <p className="text-base lg:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.85 }}>
              En <strong>4 u 8 semanas</strong> construirás tu <strong>identidad</strong>, tu <strong>oferta digital</strong> y tu <strong>estrategia de lanzamiento</strong>: <span style={{ color: MAGENTA, fontWeight: 900, fontSize: "1.07em" }}>Tu Ecosistema Digital COMPLETO.</span>
              <span className="text-sm mt-2 block opacity-75">Dirigido a emprendedores, coaches, consultores y creadores de contenido que quieren escalar su facturación a través de negocios digitales.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button onClick={onOpenModal}
                className="inline-flex items-center justify-center font-bold px-6 py-3.5 rounded-full text-white text-sm hover:opacity-90 transition-all whitespace-nowrap"
                style={{ background: G_MAIN, boxShadow: "0 8px 28px rgba(192,0,90,0.3)" }}>
                Quiero mi lugar en el Reto →
              </button>
              <a href="#programa" className="inline-flex items-center justify-center font-semibold px-6 py-3.5 rounded-full text-sm border hover:opacity-80 transition-all whitespace-nowrap"
                style={{ color: MAGENTA, borderColor: "rgba(192,0,90,0.3)" }}>
                Ver cómo funciona ↓
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start">
              {[
                { n: "+500", l: "marcas construidas" },
                { n: "+500", l: "alumnos formados" },
                { n: "+10", l: "países confían en nosotros" },
              ].map((s, i) => (
                <div key={i} className="flex items-center">
                  <div className="text-center px-4 py-3">
                    <div className="font-bold text-2xl font-playfair" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.n}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#3A3F4B", opacity: 0.65 }}>{s.l}</div>
                  </div>
                  {i < 2 && <div className="w-px h-10" style={{ background: "rgba(192,0,90,0.2)" }} />}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Sección 2: Problemas ─────────────────────────────────────────────────────
const PROBLEMS = [
  "\"Sé que tengo algo valioso que compartir, pero no sé cómo convertirlo en un negocio digital\"",
  "\"Publico y creo contenido constantemente, pero mi comunidad no crece y tampoco genera ingresos consistentes\"",
  "\"He acumulado años de experiencia y aprendizajes, pero sigo sin poder comunicarlo\"",
  "\"Quiero construir algo con propósito, no solo vender — algo que trascienda y deje huella\"",
];

function Problems() {
  return (
    <section className="py-16 lg:py-24 px-5 lg:px-8 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%)" }}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(232,148,255,0.08) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-playfair font-black mb-12" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Es para ti si alguna vez has dicho o sentido...
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12 max-w-3xl mx-auto">
          {PROBLEMS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: G_MAIN }}>
                <span className="text-white font-bold text-sm">✕</span>
              </div>
              <p className="text-base italic leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.85 }}>{p}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-xl lg:text-2xl font-bold mb-6" style={{ color: MAGENTA }}>
          No es falta de talento. No es falta de experiencia. No es falta de valor.
        </p>
        <p className="text-2xl lg:text-3xl font-bold font-playfair" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Es falta de dirección, estructura y un plan real para Digitalizar tu negocio.
        </p>
      </div>
    </section>
  );
}

// ─── Sección 3: Transformación ───────────────────────────────────────────────
const STAIRCASE_STEPS = [
  { label: "Reconoce",  widthPct: 52, num: "01" },
  { label: "Conecta",   widthPct: 66, num: "02" },
  { label: "Comparte",  widthPct: 82, num: "03" },
  { label: "Expande",   widthPct: 100, num: "04" },
];

function Transformation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showArrow, setShowArrow] = useState(false);
  const loopStarted = useRef(false);
  const inViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));
    const loop = async () => {
      while (!cancelled) {
        setVisibleCount(0);
        setShowArrow(false);
        await wait(500);
        for (let i = 1; i <= 4 && !cancelled; i++) {
          setVisibleCount(i);
          await wait(560);
        }
        if (cancelled) break;
        setShowArrow(true);
        await wait(2800);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loopStarted.current) {
          loopStarted.current = true;
          loop();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (inViewRef.current) observer.observe(inViewRef.current);
    return () => { cancelled = true; observer.disconnect(); };
  }, []);

  // Expande (100%) en top → Reconoce (52%) en bottom
  const stepsReversed = [...STAIRCASE_STEPS].reverse();

  return (
    <section className="py-16 lg:py-24 px-5 lg:px-8 relative overflow-hidden" style={{ background: G_PINK }}>
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-playfair font-bold text-3xl lg:text-4xl text-white leading-snug">
            Con nuestro Reto, lograrás<br className="hidden sm:block" /> una transformación completa.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Izquierda: "Mientras otros..." */}
          <div className="space-y-5">
            {[
              "Mientras otros improvisan contenido, tú construyes un posicionamiento que refleja quién realmente eres",
              "Mientras otros publican por presencia, tú comunicas con intención — y eso se siente, se recuerda y se valora",
              "Mientras otros intentan vender, tú construyes un sistema que convierte tu propósito en ingresos reales",
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                <span className="text-2xl text-white flex-shrink-0">›</span>
                <p className="text-white/90 text-base lg:text-lg leading-relaxed">{t}</p>
              </motion.div>
            ))}
          </div>

          {/* Derecha: Escalerita en bucle */}
          <div ref={inViewRef} className="flex items-stretch gap-5">

            {/* Línea vertical + etiqueta */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0 py-2">
              <div style={{ width: 2, flex: 1, background: "rgba(255,255,255,0.55)", borderRadius: 2, opacity: visibleCount > 0 ? 1 : 0, transition: "opacity 0.5s" }} />
              <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "rgba(255,255,255,0.85)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", opacity: showArrow ? 1 : 0, transition: "opacity 0.6s" }}>
                ↑ Tu Valor Único
              </span>
            </div>

            {/* Peldaños: Expande (top) → Reconoce (bottom) */}
            <div className="flex-1 flex flex-col gap-3">
              {stepsReversed.map((step, i) => {
                // i=0 Expande: visible cuando count>=4; i=3 Reconoce: visible cuando count>=1
                const isVisible = visibleCount >= (4 - i);
                return (
                  <div key={step.label} style={{ width: `${step.widthPct}%` }}>
                    <div
                      className="h-14 rounded-xl flex items-center gap-3 px-5"
                      style={{
                        background: "rgba(255,255,255,0.22)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.4)",
                        clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                        transition: "clip-path 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      <span className="text-xs font-bold opacity-60 text-white flex-shrink-0">{step.num}</span>
                      <span className="font-playfair font-black text-white whitespace-nowrap" style={{ fontSize: "clamp(1rem,2vw,1.25rem)" }}>
                        {step.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sección 4: Resultados ────────────────────────────────────────────────────
const ENTREGABLES = [
  "Estrategia de marca completa",
  "Manual de comunicación y posicionamiento",
  "Estrategia de contenidos de redes sociales",
  "Oferta irresistible lista para vender digitalmente",
  "Plan de lanzamiento digital activo",
  "Al menos 1 servicio digital listo para monetizar",
];

const IDENTIDADES = [
  "Alguien que sabe cómo diseñar, crear negocios digitales",
  "El referente que el mercado empieza a buscar, no el que persigue clientes cada mes",
  "Una persona que construye su negocio con intención y propósito, no con urgencia ni improvisación",
  "Alguien con una marca con propósito, con la cual las personas se pueden identificar para crear una comunidad",
  "La versión de ti que siempre supiste que existía — ahora con el sistema para demostrarlo",
];

function Results() {
  return (
    <section className="py-16 lg:py-24 px-5 lg:px-8 relative overflow-hidden bg-white">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(196,181,244,0.18) 0%, rgba(147,197,253,0.1) 40%, transparent 70%)", pointerEvents: "none" }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-playfair font-bold mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#3A3F4B" }}>
            Al terminar este Reto no solo tienes activos
          </motion.h2>
          <p className="font-semibold text-2xl lg:text-3xl" style={{ color: MAGENTA }}>
            Te reconocerás como alguien diferente.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Lo que tendrás */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-8 h-full" style={{ background: "rgba(192,0,90,0.04)", border: "1px solid rgba(192,0,90,0.15)" }}>
            <h3 className="font-bold text-lg mb-6" style={{ color: "#3A3F4B" }}>Lo que tendrás en tus manos</h3>
            <div className="space-y-3">
              {ENTREGABLES.map((e) => (
                <div key={e} className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0 mt-0.5" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>★</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.85 }}>{e}</p>
                </div>
              ))}
            </div>
            {/* Bloom extras */}
            <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(192,0,90,0.12)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#b8860b" }}>✦ En la versión Bloom Your Brand, además:</p>
              <div className="space-y-2">
                {[
                  "Construcción de Landing Page",
                  "2 hrs de Consultoría de Inteligencia Artificial para negocios digitales",
                  "4 hrs Taller de construcción de herramientas internas con IA",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: "#f5c842" }}>★</span>
                    <p className="text-xs leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Versión de ti */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="rounded-3xl p-8 h-full" style={{ background: "linear-gradient(135deg, rgba(232,148,255,0.07), rgba(192,0,90,0.07))", border: "1px solid rgba(232,148,255,0.2)" }}>
            <h3 className="font-bold text-lg mb-6" style={{ color: "#3A3F4B" }}>¿Qué versión de ti reconocerás?</h3>
            <div className="space-y-5">
              {IDENTIDADES.map((e) => (
                <div key={e} className="flex items-start gap-3">
                  <span className="font-bold flex-shrink-0 mt-0.5" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>★</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.9 }}>{e}</p>
                </div>
              ))}
            </div>
            {/* Bloom identity */}
            <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(232,148,255,0.2)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#b8860b" }}>✦ En la versión Bloom Your Brand:</p>
              <div className="flex items-start gap-2">
                <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: "#f5c842" }}>★</span>
                <p className="text-sm leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.9 }}>Alguien que sabe desarrollar plataformas para negocios digitales con inteligencia artificial</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Sección 5: Precios ───────────────────────────────────────────────────────
const TABLE_ROWS = [
  { label: "8 sesiones grupales en vivo",     boost: true,  bloom: true  },
  { label: "Acceso a Victoranza App",          boost: true,  bloom: true  },
  { label: "Grabaciones de todas las sesiones",boost: true,  bloom: true  },
  { label: "Herramientas de IA y plantillas",  boost: true,  bloom: true  },
  { label: "Manual de trabajo descargable",    boost: true,  bloom: true  },
  { label: "Clases pregrabadas exclusivas",    boost: true,  bloom: true  },
  { label: "Plan de lanzamiento digital",      boost: true,  bloom: true  },
  { label: "⭐ Acceso por todo un año",        boost: true,  bloom: true  },
  { label: "Construcción de Landing Page",                    boost: false, bloom: true  },
  { label: "2 hrs Consultoría de IA para negocios digitales", boost: false, bloom: true  },
  { label: "4 hrs Taller de herramientas internas con IA",    boost: false, bloom: true  },
];

const BOOST_INCLUDES = [
  "8 sesiones grupales en vivo",
  "Acceso a comunidad en Victoranza",
  "Grabaciones de todas las sesiones",
  "Herramientas de IA y plantillas accionables",
  "Manual de trabajo descargable",
  "Clases pregrabadas exclusivas",
  "Plan de lanzamiento digital",
  "Seguimiento estratégico",
];

const BLOOM_EXTRAS = [
  "Construcción de Landing Page",
  "2 hrs de Consultoría de Inteligencia Artificial para negocios digitales",
  "4 hrs Taller de construcción de herramientas internas con IA",
];

function Pricing() {
  const { days, hours, minutes, seconds } = useCountdown();
  return (
    <section id="precio" className="py-16 lg:py-24 px-5 lg:px-8 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%)" }}>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-playfair font-bold mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#3A3F4B" }}>
            La inversión que transformará
          </motion.h2>
          <h2 className="font-playfair font-bold" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            el rumbo de tu negocio.
          </h2>
        </div>

        {/* Tabla comparativa */}
        <div className="mb-12 overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr>
                <th className="text-left p-4 w-1/2" />
                <th className="p-4 text-center rounded-tl-2xl" style={{ background: "rgba(192,0,90,0.07)", border: "1px solid rgba(192,0,90,0.18)", borderRight: "none" }}>
                  <p className="font-bold text-sm" style={{ color: MAGENTA }}>BOOST</p>
                  <p className="font-bold text-xs opacity-60">YOUR BRAND</p>
                  <p className="font-bold text-xl font-playfair mt-1" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>$333 USD</p>
                </th>
                <th className="p-4 text-center rounded-tr-2xl" style={{ background: "rgba(252,205,13,0.1)", border: "1px solid rgba(252,205,13,0.3)" }}>
                  <p className="font-bold text-sm" style={{ color: "#b8860b" }}>BLOOM</p>
                  <p className="font-bold text-xs opacity-60">YOUR BRAND</p>
                  <p className="font-bold text-xl font-playfair mt-1" style={{ background: G_GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>$649 USD</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row) => (
                <tr key={row.label}>
                  <td className="p-3 text-xs lg:text-sm" style={{ color: "#3A3F4B", opacity: 0.8, borderBottom: "1px solid rgba(192,0,90,0.07)" }}>{row.label}</td>
                  <td className="p-3 text-center" style={{ background: "rgba(192,0,90,0.03)", borderLeft: "1px solid rgba(192,0,90,0.15)", borderRight: "1px solid rgba(192,0,90,0.15)", borderBottom: "1px solid rgba(192,0,90,0.07)" }}>
                    {row.boost ? <span style={{ color: MAGENTA, fontWeight: 700 }}>✓</span> : <span style={{ color: "#D1D5DB" }}>—</span>}
                  </td>
                  <td className="p-3 text-center" style={{ background: "rgba(252,205,13,0.04)", borderLeft: "1px solid rgba(252,205,13,0.2)", borderRight: "1px solid rgba(252,205,13,0.2)", borderBottom: "1px solid rgba(252,205,13,0.1)" }}>
                    {row.bloom ? <span style={{ color: "#b8860b", fontWeight: 700 }}>✓</span> : <span style={{ color: "#D1D5DB" }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botones debajo de la tabla */}
        <div className="grid lg:grid-cols-2 gap-4 mb-10 px-4">
          <div className="lg:pl-[25%]">
            <Link href={HREF_GENERAL} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center font-bold py-3.5 rounded-full text-white text-sm hover:opacity-90 transition-all"
              style={{ background: G_MAIN, boxShadow: "0 6px 20px rgba(192,0,90,0.2)" }}>
              Quiero activar mi acceso Boost Your Brand →
            </Link>
          </div>
          <div>
            <Link href={HREF_VIP} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center font-bold py-3.5 rounded-full text-sm hover:opacity-90 transition-all"
              style={{ background: G_GOLD, color: "#1a0a2e", boxShadow: "0 6px 20px rgba(252,205,13,0.2)" }}>
              Quiero activar mi acceso Bloom Your Brand →
            </Link>
          </div>
        </div>

        {/* Cards de precio */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Boost */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-8" style={{ background: "white", border: "1px solid rgba(192,0,90,0.15)", boxShadow: "0 8px 32px rgba(192,0,90,0.07)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: MAGENTA }}>Programa completo</p>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-bold font-playfair" style={{ color: "#3A3F4B" }}>Boost Your Brand</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(192,0,90,0.08)", color: MAGENTA, border: "1px solid rgba(192,0,90,0.2)" }}>4 semanas</span>
            </div>
            <div className="flex items-baseline gap-2 mt-3 mb-1">
              <span className="text-5xl font-bold font-playfair" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>$333</span>
              <span className="text-lg opacity-50">USD</span>
            </div>
            <p className="text-xs opacity-50 mb-6">8 sesiones estratégicas · Lanzamiento internacional</p>
            <div className="space-y-2 mb-6">
              {BOOST_INCLUDES.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-sm font-bold flex-shrink-0" style={{ color: MAGENTA }}>✓</span>
                  <p className="text-sm" style={{ color: "#3A3F4B", opacity: 0.8 }}>{item}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl mb-6" style={{ background: "rgba(252,205,13,0.1)", border: "1px solid rgba(252,205,13,0.3)" }}>
              <span>⭐</span>
              <p className="text-xs font-semibold" style={{ color: "#b8860b" }}>Acceso por todo un año — desde el inicio de tu Reto</p>
            </div>
            {/* Countdown en card */}
            <div className="rounded-2xl p-4 mb-6 text-center" style={{ background: "rgba(192,0,90,0.04)", border: "1px solid rgba(192,0,90,0.1)" }}>
              <div className="flex items-center justify-center gap-3">
                <CDUnit value={days} label="días" />
                <span style={{ color: "rgba(192,0,90,0.3)", fontWeight: 700 }}>:</span>
                <CDUnit value={hours} label="horas" />
                <span style={{ color: "rgba(192,0,90,0.3)", fontWeight: 700 }}>:</span>
                <CDUnit value={minutes} label="min" />
                <span style={{ color: "rgba(192,0,90,0.3)", fontWeight: 700 }}>:</span>
                <CDUnit value={seconds} label="seg" />
              </div>
            </div>
            <Link href={HREF_GENERAL} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center font-bold py-4 rounded-full text-white text-sm hover:opacity-90 transition-all"
              style={{ background: G_MAIN, boxShadow: "0 8px 24px rgba(192,0,90,0.25)" }}>
              Quiero activar mi acceso Boost Your Brand →
            </Link>
          </motion.div>

          {/* Bloom */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="rounded-3xl p-8 relative" style={{ background: "white", border: "1px solid rgba(252,205,13,0.3)", boxShadow: "0 8px 32px rgba(252,205,13,0.12)" }}>
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: G_GOLD, color: "#1a0a2e" }}>Solo 8 lugares</div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#b8860b" }}>Programa Premium</p>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-bold font-playfair" style={{ color: "#3A3F4B" }}>Bloom Your Brand</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(184,134,11,0.1)", color: "#b8860b", border: "1px solid rgba(184,134,11,0.25)" }}>8 semanas</span>
            </div>
            <div className="flex items-baseline gap-2 mt-3 mb-1">
              <span className="text-5xl font-bold font-playfair" style={{ background: G_GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>$649</span>
              <span className="text-lg opacity-50">USD</span>
            </div>
            <p className="text-sm italic mb-5 opacity-70">Para quienes quieren ir más lejos — con mayor acompañamiento, producción de anuncios y tecnología incluidos.</p>
            <p className="text-xs font-semibold mb-3 opacity-60">🔑 Todo lo del plan Boost Your Brand, más:</p>
            <div className="space-y-3 mb-6">
              {BLOOM_EXTRAS.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-sm font-bold flex-shrink-0 mt-0.5" style={{ color: "#f5c842" }}>★</span>
                  <p className="text-sm" style={{ color: "#3A3F4B", opacity: 0.85 }}>{item}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl mb-6" style={{ background: "rgba(252,205,13,0.1)", border: "1px solid rgba(252,205,13,0.3)" }}>
              <span>⭐</span>
              <p className="text-xs font-semibold" style={{ color: "#b8860b" }}>Acceso por todo un año — desde el inicio de tu Reto</p>
            </div>
            <Link href={HREF_VIP} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center font-bold py-4 rounded-full text-sm hover:opacity-90 transition-all"
              style={{ background: G_GOLD, color: "#1a0a2e", boxShadow: "0 8px 24px rgba(252,205,13,0.25)" }}>
              Quiero activar mi acceso Bloom Your Brand →
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// ─── Sección 6: Programa (acordeón) ──────────────────────────────────────────
const SESSIONS = [
  {
    num: "01", title: "El Ser que ya eres", date: "Sesión 1",
    intro: "Hoy descubres quién eres en el mercado — y nunca más vuelves a dudar de cómo presentarte.",
    items: ["Tu lucha, propósito y misión de marca", "Hilo conductor e historia de marca", "Arquetipo, tono y storytelling", "Hoja de ruta completa del Reto"],
  },
  {
    num: "02", title: "A Quién le Cambias la Vida", date: "Sesión 2",
    intro: "Dejas de hablarle a todos y empiezas a conectar profundo con las personas que más necesitan lo que tú ofreces.",
    items: ["Cliente ideal", "Diferenciadores estratégicos", "Evaluación y optimización de modelo de negocio", "Modelos de monetización digital"],
  },
  {
    num: "03", title: "Lo que el Mercado no Puede Ignorar", date: "Sesión 3",
    intro: "Construyes una oferta tan clara y deseable que tu cliente potencial siente que la diseñaste solo para él.",
    items: ["Propuesta de valor única", "Tipos de producto / servicio digital", "Escalera de valor", "Experiencia de compra"],
  },
  {
    num: "04", title: "La Marca que el Mundo va a Recordar", date: "Sesión 4",
    intro: "Tu estrategia toma forma visual — y tu presencia digital empieza a comunicar exactamente quién eres.",
    items: ["Moodboard y Look & Feel", "Perfiles IG, TikTok, FB, LinkedIn", "Estrategia de contenidos parte 1"],
  },
  {
    num: "05", title: "Conecta Más. Vende Siempre.", date: "Sesión 5",
    intro: "Construyes el sistema que hace que tu marca trabaje para ti todos los días — incluso cuando no estás publicando.",
    items: ["Estrategia de contenidos parte 2", "Estructura TOFU, MOFU, BOFU", "Calendario editorial", "Co-creación con IA: búsqueda, ideación, guionización y planificación"],
  },
  {
    num: "06", title: "El Día que tu Expansión Empieza", date: "Sesión 6",
    intro: "En esta sesión construyes tu plan de lanzamiento completo: sabes qué lanzar, cómo lanzarlo, cómo medir tus resultados y cómo replicarlo.",
    items: ["Ecosistema digital para un negocio que escala", "Estrategias de atracción de clientes", "Sistema de aceleración comercial: atención, conversión y fidelización", "Ruta de lanzamiento lista para activar"],
  },
];

function Program({ onOpenModal }: { onOpenModal: () => void }) {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="programa" className="py-16 lg:py-24 px-5 lg:px-8 relative overflow-hidden" style={{ background: G_BLUE }}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="font-playfair font-bold text-white mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            8 sesiones para construir tu marca
          </h2>
          <p className="font-semibold text-2xl lg:text-3xl text-white">
            con dirección, claridad y conversión
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {SESSIONS.map((s, i) => (
              <button key={i} onClick={() => setOpen(i)}
                className="flex flex-col items-center gap-1 cursor-pointer" style={{ width: "16%" }}>
                <div className="w-4 h-4 rounded-full border-2 border-white transition-all"
                  style={{ background: i <= open ? "white" : "rgba(255,255,255,0.3)" }} />
                <span className="text-xs font-bold text-white hidden lg:block" style={{ opacity: i <= open ? 1 : 0.5 }}>{s.num}</span>
              </button>
            ))}
          </div>
          <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }}>
            <div className="h-1 rounded-full transition-all duration-500 bg-white" style={{ width: `${((open + 1) / SESSIONS.length) * 100}%` }} />
          </div>
        </div>

        {/* Acordeón */}
        <div className="space-y-3 mb-12">
          {SESSIONS.map((s, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}>
              <button onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center gap-4 p-5 text-left">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-playfair font-bold text-sm"
                  style={{ background: open === i ? "white" : "rgba(255,255,255,0.2)", color: open === i ? MAGENTA : "white" }}>
                  {s.num}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white text-sm lg:text-base">{s.title}</p>
                  <p className="text-xs text-white/70">{s.date}</p>
                </div>
                <span className="text-white text-xl font-light flex-shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-white/85 italic mb-4 leading-relaxed">{s.intro}</p>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-white/60 font-bold flex-shrink-0">·</span>
                        <span className="text-sm text-white/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-white font-semibold mb-5">¿Listo para comenzar el viaje?</p>
          <button onClick={onOpenModal}
            className="inline-flex items-center font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-all"
            style={{ background: "white", color: MAGENTA, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
            Quiero mi lugar →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Sección 7: Testimonios ───────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    stars: 5,
    quote: "19 años en el negocio y nunca habíamos digitalizado de verdad. Aprendimos a comunicar nuestra identidad, creamos marcas personales dentro de la marca comercial y nuestra audiencia ahora conecta con nuestra historia. Hoy tenemos publicidad digital, atención automatizada y más ventas.",
    name: "Electronic Point",
    role: "Tecnología · 🇦🇷 Argentina",
    type: "video" as const,
    videoId: "-Wz16y3WUnA",
  },
  {
    stars: 5,
    quote: "Tenía mi voz escondida. Había dejado de exponer mi arte por miedo al rechazo. Hoy, a mis más de 60 años, creo contenido en redes, salgo en cámara sin miedo, expongo mis obras en eventos y conecto con clientes y alumnos de manera digital.",
    name: "Susana Mejía",
    role: "Artista Plástica · 🇨🇴 Colombia",
    type: "image" as const,
    img: "/testimonios/susana-mejia.jpg",
  },
  {
    stars: 5,
    quote: "De tener las máquinas y la idea, en menos de un año nos convertimos en una de las empresas líderes del rubro en Buenos Aires. Pasamos de vender impresión a posicionarnos como aliados estratégicos. Hoy tenemos contenidos virales, cotizaciones todos los días y servicios que escalaron a consultorías y capacitaciones.",
    name: "TATUX 3D",
    role: "Impresión 3D · 🇦🇷 Argentina",
    type: "video" as const,
    videoId: "MQDX9iByOYQ",
  },
  {
    stars: 5,
    quote: "Convertí mi dolor y proceso personal en un movimiento. Hoy lidero una comunidad de padres que construyen el futuro de la educación — con talleres, conferencias y consultorías. Mi contenido disruptivo me posicionó en un nicho poco explorado. Vivo una versión de mí misma mucho más expandida.",
    name: "My Home 2 Grow",
    role: "Home Schooling · 🇲🇽 México",
    type: "image" as const,
    img: "/testimonios/my-home-2-grow.jpg",
  },
  {
    stars: 5,
    quote: "Llevaba más de 20 años posicionada de manera tradicional en la industria fitness. El Reto me dio lo que nunca había encontrado: una oferta digital que reduce barreras de entrada, atrae nuevos clientes y expande mi experiencia más allá del gym. Hoy mi contenido en redes filtra, conecta y atrae clientes todos los días.",
    name: "B&M Fit",
    role: "Fitness · 🇲🇽 México",
    type: "video" as const,
    videoId: "8b4IBY81fQ8",
  },
  {
    stars: 5,
    quote: "Pasé de ser solo el líder de 2 empresas a ser una marca personal que atrae proyectos millonarios. Hoy yo mismo soy mi mayor activo comercial. Pasé del miedo a la cámara a ser un estratega que transmite valor — y sé exactamente el retorno que eso genera en ingresos y posicionamiento.",
    name: "Bryan Álvarez",
    role: "Proyectos Civiles e Industriales · 🇲🇽 México",
    type: "video" as const,
    videoId: "_MrMejtExu0",
  },
  {
    stars: 5,
    quote: "Pasé de hacer contenido genérico y técnico a comunicar con personalidad real. Tengo una comunidad que crece, una estrategia anual de lanzamientos y mis diferentes servicios posicionados con identidad propia.",
    name: "Alejandro Jiménez",
    role: "DJ & Artista · 🇨🇴 Colombia",
    type: "image" as const,
    img: "/testimonios/alejandro-jimenez.jpg",
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const perPage = typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % (TESTIMONIALS.length - 2));
  }, []);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(next, 5000);
  }, [next]);

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer]);

  const visible = TESTIMONIALS.slice(current, current + 3);
  if (visible.length < 3) visible.push(...TESTIMONIALS.slice(0, 3 - visible.length));

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(196,181,244,0.18) 0%, rgba(147,197,253,0.1) 40%, transparent 70%)", pointerEvents: "none" }} />
      <div className="text-center mb-12 px-5">
        <p className="font-semibold text-2xl lg:text-3xl mb-2" style={{ color: MAGENTA }}>
          Marcas alrededor del mundo ya han tomado la decisión
        </p>
        <h2 className="font-playfair font-bold" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", color: "#3A3F4B" }}>
          y hoy viven activamente su posicionamiento e ingresos digitales
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-5 lg:px-8 relative z-10"
        onMouseEnter={stopTimer} onMouseLeave={startTimer}>
        {/* Flechas */}
        <button onClick={() => { stopTimer(); setCurrent((c) => Math.max(0, c - 1)); startTimer(); }}
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center z-20"
          style={{ background: "white", boxShadow: "0 4px 14px rgba(0,0,0,0.1)", color: MAGENTA }}>‹</button>
        <button onClick={() => { stopTimer(); next(); startTimer(); }}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center z-20"
          style={{ background: "white", boxShadow: "0 4px 14px rgba(0,0,0,0.1)", color: MAGENTA }}>›</button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((t, i) => (
            <motion.div key={`${current}-${i}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl p-6 flex flex-col" style={{ background: "white", border: "1px solid rgba(192,0,90,0.1)", boxShadow: "0 4px 20px rgba(192,0,90,0.07)" }}>
              <div className="flex gap-0.5 mb-3" style={{ color: "#FBBF24" }}>{"★".repeat(t.stars)}</div>
              <p className="text-sm italic leading-relaxed flex-1 mb-4" style={{ color: "#3A3F4B", opacity: 0.85 }}>"{t.quote}"</p>
              <div className="border-t pb-3 mb-3" style={{ borderColor: "rgba(192,0,90,0.08)" }}>
                <p className="font-semibold text-sm mt-3" style={{ color: "#3A3F4B" }}>{t.name}</p>
                <p className="text-xs opacity-55 mt-0.5">{t.role}</p>
              </div>
              {t.type === "video" ? (
                <div className="relative rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <iframe src={`https://www.youtube.com/embed/${t.videoId}?rel=0&playsinline=1`}
                    title={`Testimonio ${t.name}`} className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen loading="lazy" />
                </div>
              ) : (
                <div className="rounded-xl overflow-hidden" style={{ height: "180px" }}>
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: TESTIMONIALS.length - 2 }).map((_, i) => (
            <button key={i} onClick={() => { stopTimer(); setCurrent(i); startTimer(); }}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: i === current ? MAGENTA : "rgba(192,0,90,0.2)", width: i === current ? "24px" : "8px" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sección 8: FAQ ───────────────────────────────────────────────────────────
const FAQS = [
  { q: "¿Para quién es este Reto?", a: "Para profesionales, emprendedores, consultores, vendedores, dueños de negocio, creadores de contenido y líderes de equipos que ya tienen experiencia y un servicio de valor, pero no han podido estructurar, comunicar ni monetizar su marca personal en digital. Si sabes que tienes potencial pero no sabes cómo traducirlo en ingresos reales, este Reto es para ti." },
  { q: "¿Necesito experiencia previa en marketing digital?", a: "No es necesario. Los contenidos están diseñados para llevarte desde un punto de partida inicial hasta tu primer lanzamiento. Sin embargo, es indispensable contar con perfiles empresariales en redes sociales y un portafolio comercial básico. ¿Aún no los tienes? Al inscribirte tendrás acceso a materiales pregrabados con el paso a paso para configurarlo todo antes de comenzar." },
  { q: "¿Qué equipo de tecnología necesito?", a: "El Reto puede seguirse desde el celular, aunque recomendamos trabajar desde computadora o iPad para aprovechar mejor los ejercicios y herramientas. Lo importante es tener una conexión estable a internet y acceso a Victoranza App." },
  { q: "¿Qué software adicional necesito?", a: "Recomendamos tener acceso a ChatGPT, Gemini o Claude — con la versión gratuita es suficiente para comenzar, aunque recomendamos la versión de pago para no tener limitantes al ejecutar los ejercicios." },
  { q: "¿Qué tanto se trabaja con inteligencia artificial?", a: "Mucho y con intención. Te enseñamos a co-crear con IA: definir tu identidad de marca, tus pilares de comunicación, tu estrategia de posicionamiento y conversión usando modelos propios. A partir de ahí, escalarás con sistemas de IA que harán el trabajo más eficiente y replicable." },
  { q: "¿Qué pasa si aún no tengo un producto o servicio que vender?", a: "Este Reto te dará la claridad para arrancar desde cero. Tendrás acceso a recursos adicionales diseñados específicamente para ayudarte a idear y estructurar tu primer producto o servicio digital." },
  { q: "¿En qué plataforma se desarrolla el Reto?", a: "Victoranza App es nuestra plataforma digital propia de Loreto Consultora. Allí encontrarás todos los materiales pregrabados, sesiones grabadas del Reto, materiales de apoyo, comunidad y más. Al inscribirte recibirás por correo tu acceso con usuario y contraseña." },
  { q: "¿Dónde se realiza el pago?", a: "Al dar clic en los botones de esta página serás redirigido a una página de pago en línea. El pago es procesado por la pasarela de Stripe, es totalmente seguro y podrás pagar con la tarjeta de tu preferencia." },
  { q: "¿Qué pasa si no puedo asistir a una sesión en vivo?", a: "Todas las sesiones se graban y quedan disponibles en la plataforma para que avances a tu ritmo. Para situaciones especiales, acércate con tu customer happiness y atendemos tu caso de manera personalizada." },
  { q: "¿Cuánto tiempo necesito dedicarle por semana?", a: "En el plan Boost Your Brand (4 semanas) las sesiones en vivo se realizan dos veces por semana. En el plan Bloom Your Brand (8 semanas) se realizan una vez por semana, con mayor espacio para implementar entre sesiones. Además de las sesiones, recomendamos entre 2 y 3 horas adicionales semanales para ejecutar los ejercicios y construir tus entregables." },
  { q: "¿Hay reembolsos?", a: "Al ser un programa digital progresivo y práctico, no ofrecemos reembolsos. Sin embargo, garantizamos el 100% de satisfacción — si en algún momento sientes que algo no está funcionando para ti, acércate con nuestro equipo y lo resolvemos juntos." },
  { q: "¿Cuándo recupero mi inversión?", a: "Sales del programa con al menos un servicio digital estructurado, lanzado y un sistema de ventas activo. El tiempo de recuperación está sujeto a tu modelo de negocio y nicho — por eso incluimos en las primeras sesiones una optimización del modelo diseñada para maximizar tu inversión y reducir el ciclo de recuperación." },
  { q: "¿Cuántos lugares hay disponibles?", a: "Solo 20 lugares en Boost y 8 en Bloom — los cupos son limitados para garantizar atención personalizada y una experiencia de comunidad de alta calidad." },
  { q: "¿Qué pasa después del Reto?", a: "Lo más importante es que continúes aplicando lo que construiste. Si quieres ir más lejos, puedes complementar con otros de nuestros programas y servicios. Acércate a nuestro equipo para encontrar el adecuado para ti y tus objetivos." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const half = Math.ceil(FAQS.length / 2);

  const FaqItem = ({ item, i }: { item: typeof FAQS[0]; i: number }) => (
    <div className="border-b" style={{ borderColor: "rgba(192,0,90,0.1)" }}>
      <button onClick={() => setOpen(open === i ? null : i)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left">
        <span className="font-semibold text-sm lg:text-base pr-4" style={{ color: "#3A3F4B" }}>{item.q}</span>
        <span className="font-light text-xl flex-shrink-0" style={{ color: MAGENTA }}>{open === i ? "−" : "+"}</span>
      </button>
      {open === i && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.75 }}>{item.a}</p>
      )}
    </div>
  );

  return (
    <section className="py-16 lg:py-24 px-5 lg:px-8 relative overflow-hidden bg-white">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(196,181,244,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-playfair font-bold text-center mb-14" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Todo lo que necesitas saber
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-x-12">
          <div>{FAQS.slice(0, half).map((item, i) => <FaqItem key={i} item={item} i={i} />)}</div>
          <div>{FAQS.slice(half).map((item, i) => <FaqItem key={i + half} item={item} i={i + half} />)}</div>
        </div>
      </div>
    </section>
  );
}

// ─── Sección 9: CTA Final ─────────────────────────────────────────────────────
function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  const { days, hours, minutes, seconds } = useCountdown();
  return (
    <section className="py-16 lg:py-24 px-5 lg:px-8 relative overflow-hidden" style={{ background: G_MAIN }}>
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="font-semibold text-3xl lg:text-4xl text-white mb-3">En el Mundo Digital</p>
          <p className="font-playfair font-bold text-white" style={{ fontSize: "clamp(1.4rem,2.8vw,2.2rem)", lineHeight: 1.3 }}>
            Gana quien mejor descubre, conecta, comparte y expande su valor
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="font-playfair text-white mb-6 leading-relaxed" style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", fontWeight: 300, lineHeight: 1.8 }}>
              Cada mes que pasa, no solo pierdes ingresos, pierdes tiempo viviendo una versión menor de lo que ya eres.
            </p>
            <p className="font-playfair italic text-white/85" style={{ fontSize: "1rem", lineHeight: 1.9, borderLeft: "2px solid rgba(255,255,255,0.3)", paddingLeft: "1.25rem" }}>
              "Tu propósito lleva tiempo vivo en ti. El mundo no necesita otra persona haciendo lo mismo — necesita a alguien que haga lo que tú haces, como solo tú puedes hacerlo."
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-8">
            <p className="font-semibold text-3xl text-white">¿Lo activamos hoy?</p>

            <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.3)" }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/85 mb-4">inicio próxima generación</p>
              <div className="flex gap-4 justify-center">
                <CDUnit value={days} label="días" />
                <span className="font-bold text-xl mb-3 text-white/40">:</span>
                <CDUnit value={hours} label="horas" />
                <span className="font-bold text-xl mb-3 text-white/40">:</span>
                <CDUnit value={minutes} label="min" />
                <span className="font-bold text-xl mb-3 text-white/40">:</span>
                <CDUnit value={seconds} label="seg" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button onClick={onOpenModal}
                className="font-bold px-6 py-4 rounded-full text-sm hover:opacity-90 transition-all text-center whitespace-nowrap"
                style={{ background: "white", color: MAGENTA, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                Quiero mi lugar en el Reto →
              </button>
              <Link href={HREF_VIP} target="_blank" rel="noopener noreferrer"
                className="font-bold px-6 py-4 rounded-full text-sm hover:opacity-90 transition-all text-center"
                style={{ background: G_GOLD, color: "#1a0a2e" }}>
                Quiero activar mi acceso Bloom Your Brand →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CDUnit override para fondo oscuro (CTA final) ────────────────────────────
// (reutilizamos CDUnit — el gradiente de texto aplica sobre fondo claro;
//  en fondo oscuro se ve bien igual por el transparente del fill)

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RetoPage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setModalOpen(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenModal={() => setModalOpen(true)} />
        <Problems />
        <Transformation />
        <Results />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA onOpenModal={() => setModalOpen(true)} />
      </main>
      <Footer />
      {modalOpen && <RegistroModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
