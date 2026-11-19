"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Colores ──────────────────────────────────────────────────────────────────
const G_MAIN = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const MAGENTA = "#c0005a";

// ─── Países con lada ──────────────────────────────────────────────────────────
const LADAS = [
  { flag: "🇲🇽", code: "+52",  name: "México" },
  { flag: "🇨🇱", code: "+56",  name: "Chile" },
  { flag: "🇨🇷", code: "+506", name: "Costa Rica" },
  { flag: "🇨🇴", code: "+57",  name: "Colombia" },
  { flag: "🇵🇦", code: "+507", name: "Panamá" },
  { flag: "🇺🇸", code: "+1",   name: "EE. UU." },
  { flag: "🇦🇷", code: "+54",  name: "Argentina" },
  { flag: "🇻🇪", code: "+58",  name: "Venezuela" },
  { flag: "🇪🇸", code: "+34",  name: "España" },
  { flag: "🇵🇪", code: "+51",  name: "Perú" },
  { flag: "🇬🇹", code: "+502", name: "Guatemala" },
  { flag: "🇩🇴", code: "+1",   name: "Rep. Dom." },
  { flag: "🇺🇾", code: "+598", name: "Uruguay" },
];

const WA_DUDAS = `https://wa.me/524427497345?text=${encodeURIComponent("Hola Any Villegas, me interesa el Networking & Masterclass Digital. ¿Me puedes dar más información?")}`;

// ─── Tipos ────────────────────────────────────────────────────────────────────
export interface EventoConfig {
  pais: string;
  bandera: string;
  ciudad: string;
  ladaDefault: string;
  titulo: string;
  subtitulo: string;
  fechaTexto: string; // "Próximamente – fecha por confirmar" o "15 de marzo de 2027"
  colorAccent?: string; // opcional, si se quiere un color especial por país
  webhookUrl?: string;
}

// ─── Formulario de registro ───────────────────────────────────────────────────
function RegistroForm({ config }: { config: EventoConfig }) {
  const [form, setForm] = useState({
    nombre: "", lada: config.ladaDefault, telefono: "", correo: "", empresa: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (config.webhookUrl) {
        await fetch(config.webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, pais: config.pais, evento: config.titulo }),
        });
      }
    } catch (_) {/* silent */}
    setTimeout(() => { setLoading(false); setSent(true); }, 600);
  }

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all";
  const inputStyle = { border: "1.5px solid rgba(255,255,255,0.3)", color: "white", background: "rgba(255,255,255,0.1)" };
  const labelCls = "block text-xs font-semibold uppercase tracking-widest mb-1.5 text-white/60";

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-playfair font-bold text-2xl text-white mb-3">¡Estás registrado!</h3>
        <p className="text-white/80 text-sm mb-6 max-w-xs mx-auto">
          Te confirmaremos los detalles finales del evento por WhatsApp. ¡Nos vemos en {config.ciudad}!
        </p>
        <a
          href={WA_DUDAS}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full text-white transition-opacity hover:opacity-80"
          style={{ background: "rgba(37,211,102,0.3)", border: "1px solid rgba(37,211,102,0.5)" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Escríbenos por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className={labelCls}>Nombre completo</label>
        <input required name="nombre" type="text" placeholder="Tu nombre" value={form.nombre}
          onChange={handleChange} className={inputCls} style={inputStyle} />
      </div>

      <div>
        <label className={labelCls}>Teléfono / WhatsApp</label>
        <div className="flex gap-2">
          <select name="lada" value={form.lada} onChange={handleChange}
            className="px-3 py-3 rounded-xl text-sm outline-none flex-shrink-0"
            style={{ ...inputStyle, width: "105px" }}>
            {LADAS.map((l) => (
              <option key={`${l.flag}${l.code}${l.name}`} value={l.code} style={{ background: "#1a0a2e", color: "white" }}>
                {l.flag} {l.code}
              </option>
            ))}
          </select>
          <input required name="telefono" type="tel" placeholder="Número" value={form.telefono}
            onChange={handleChange} className={`${inputCls} flex-1`} style={inputStyle} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Correo electrónico</label>
        <input required name="correo" type="email" placeholder="hola@tu-negocio.com" value={form.correo}
          onChange={handleChange} className={inputCls} style={inputStyle} />
      </div>

      <div>
        <label className={labelCls}>Nombre de tu negocio / marca</label>
        <input name="empresa" type="text" placeholder="Mi negocio" value={form.empresa}
          onChange={handleChange} className={inputCls} style={inputStyle} />
      </div>

      <button type="submit" disabled={loading}
        className="mt-2 w-full py-4 rounded-full font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.5)", backdropFilter: "blur(8px)" }}>
        {loading ? "Enviando…" : `Quiero mi lugar en ${config.ciudad} →`}
      </button>

      <p className="text-center text-xs text-white/40">Tus datos son confidenciales y no se comparten.</p>
    </form>
  );
}

// ─── Qué obtienes ────────────────────────────────────────────────────────────
const BENEFICIOS = [
  { icon: "🤝", titulo: "Networking real", desc: "Conecta en persona con mexicanos emprendedores y empresarios que están construyendo sus marcas desde el extranjero. Relaciones que duran más allá del evento." },
  { icon: "🎓", titulo: "Masterclass Digital", desc: "Una sesión de alto valor donde aprenderás estrategias concretas para escalar tu negocio digital en 2027: posicionamiento, audiencia y ventas." },
  { icon: "🌐", titulo: "Comunidad latinoamericana", desc: "Forma parte de una red de emprendedores mexicanos con presencia internacional que se apoyan, se recomiendan y crecen juntos." },
  { icon: "💡", titulo: "Herramientas y claridad", desc: "Te llevarás ideas accionables, conexiones estratégicas y la claridad para tu siguiente paso en la construcción de tu marca personal o negocio digital." },
];

// ─── Para quién es ────────────────────────────────────────────────────────────
const PARA_QUIEN = [
  "Mexicanos que radican en el país anfitrión y tienen un negocio o proyecto digital",
  "Emprendedores y empresarios que quieren posicionarse en su mercado local e internacional",
  "Profesionales con marca personal que buscan escalar su impacto y sus ingresos en 2027",
  "Personas que quieren conectar con otros mexicanos que están construyendo en el exterior",
  "Fundadores y creadores que quieren aprender estrategias probadas para digitalizarse",
];

// ─── Template principal ───────────────────────────────────────────────────────
export default function EventoNetworking({ config }: { config: EventoConfig }) {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">

        {/* ── HERO + FORMULARIO ───────────────────────────────────────────── */}
        <section className="min-h-screen relative flex items-start pt-20 pb-16 px-5 lg:px-8"
          style={{ background: G_MAIN }}>
          {/* Blobs decorativos */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(232,148,255,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(192,0,90,0.2) 0%, transparent 70%)", filter: "blur(80px)" }} />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-start pt-6 lg:pt-12">

            {/* Columna izquierda: texto */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}>
                <span className="text-xl">{config.bandera}</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/80">{config.pais}</span>
              </div>

              <p className="font-semibold text-sm uppercase tracking-widest text-white/60 mb-3">
                Networking &amp; Masterclass Digital · 2027
              </p>

              <h1 className="font-playfair font-black text-white leading-tight mb-5"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                {config.titulo}
              </h1>

              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8">
                {config.subtitulo}
              </p>

              {/* Fecha y ciudad */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <span className="text-white/60 text-sm">📅</span>
                  <span className="text-white font-semibold text-sm">{config.fechaTexto}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <span className="text-white/60 text-sm">📍</span>
                  <span className="text-white font-semibold text-sm">{config.ciudad}</span>
                </div>
              </div>

              {/* Propuesta de valor rápida */}
              <ul className="flex flex-col gap-3">
                {["Un evento presencial exclusivo para mexicanos en el exterior",
                  "Networking de alto nivel con emprendedores y marcas personales",
                  "Masterclass Digital para escalar tu negocio en 2027"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-0.5 text-white">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Columna derecha: formulario */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div className="rounded-3xl p-7 sm:p-8"
                style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">Cupo limitado</p>
                  <h2 className="font-playfair font-bold text-xl sm:text-2xl text-white">
                    Reserva tu lugar ahora
                  </h2>
                  <p className="text-white/60 text-sm mt-1">Regístrate y te avisamos cuando abran las inscripciones oficiales.</p>
                </div>
                <RegistroForm config={config} />
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── QUÉ INCLUYE EL EVENTO ───────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: MAGENTA }}>Lo que vivirás</p>
              <h2 className="font-playfair font-black text-3xl sm:text-4xl" style={{ color: "#1a0a2e" }}>
                Una tarde que cambia el rumbo<br className="hidden sm:block" /> de tu negocio
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {BENEFICIOS.map((b, i) => (
                <motion.div key={b.titulo} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 sm:p-7"
                  style={{ border: "1.5px solid rgba(192,0,90,0.1)", background: "linear-gradient(135deg, #fdf5f8 0%, #fff 100%)" }}>
                  <span className="text-3xl mb-4 block">{b.icon}</span>
                  <h3 className="font-playfair font-bold text-lg mb-2" style={{ color: "#1a0a2e" }}>{b.titulo}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.75 }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARA QUIÉN ES ───────────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8" style={{ background: "#fdf5f8" }}>
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: MAGENTA }}>¿Este evento es para ti?</p>
              <h2 className="font-playfair font-black text-3xl sm:text-4xl" style={{ color: "#1a0a2e" }}>
                Hecho para mexicanos<br className="hidden sm:block" /> que construyen desde {config.pais}
              </h2>
            </motion.div>

            <div className="flex flex-col gap-4">
              {PARA_QUIEN.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl px-6 py-5 bg-white"
                  style={{ border: "1.5px solid rgba(192,0,90,0.08)", boxShadow: "0 2px 12px rgba(192,0,90,0.04)" }}>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm text-white mt-0.5"
                    style={{ background: G_MAIN }}>✓</span>
                  <span className="text-sm leading-relaxed" style={{ color: "#3A3F4B" }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOBRE ANY VILLEGAS ──────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden max-w-sm mx-auto lg:mx-0"
                  style={{ background: G_MAIN }}>
                  {/* Placeholder para foto */}
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/40 text-6xl">👤</span>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: MAGENTA }}>Tu anfitriona</p>
                <h2 className="font-playfair font-black text-3xl sm:text-4xl mb-4" style={{ color: "#1a0a2e" }}>
                  Any Villegas
                </h2>
                <p className="text-sm font-semibold mb-5" style={{ color: MAGENTA }}>
                  Fundadora y Directora General · Loreto Consultora
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#3A3F4B", opacity: 0.8 }}>
                  Estratega de marca personal y negocios digitales con más de 10 años acompañando a emprendedores y empresarios latinoamericanos a construir marcas con propósito, posicionamiento y resultados reales.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.8 }}>
                  Ha trabajado con cientos de profesionales que hoy tienen negocios digitales rentables, comunidades activas y una presencia en línea que les genera ingresos constantes. Este evento es su forma de llevar esa transformación en persona a {config.pais}.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ───────────────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8 relative overflow-hidden" style={{ background: G_MAIN }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(232,148,255,0.15) 0%, transparent 70%)", filter: "blur(50px)" }} />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-5xl mb-6 block">{config.bandera}</span>
              <h2 className="font-playfair font-black text-white mb-5"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
                El cupo en {config.ciudad} es limitado.
                <br />No esperes para registrarte.
              </h2>
              <p className="text-white/75 text-base mb-8">
                Regístrate hoy y asegura tu lugar en el networking y masterclass más exclusivo para mexicanos en {config.pais}.
              </p>
              <a href="#registro"
                className="inline-block px-10 py-4 rounded-full font-bold text-sm transition-all hover:opacity-90"
                style={{ background: "white", color: MAGENTA, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}>
                Quiero mi lugar en {config.pais} →
              </a>

              <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                <a href={WA_DUDAS} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  ¿Tienes dudas? Escríbenos por WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
