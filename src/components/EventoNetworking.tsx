"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
  fechaTexto: string;
  horarioLocal: string;
  horarioCDMX: string;
  masterclass: string;
  portadaSrc?: string;    // ruta de imagen, ej. "/eventos/portada-chile.jpg"
  videoBgSrc?: string;    // ruta de video de fondo, ej. "/eventos/video-redes.mp4"
  // Paleta del país (con estilo Loreto como base)
  gradiente: string;
  accentHex: string;
  gradienteCard: string;
}

// ─── Contenidos genéricos ─────────────────────────────────────────────────────
const BENEFICIOS = [
  { icon: "🤝", titulo: "Networking real", desc: "Conecta en persona con mexicanos emprendedores y empresarios que están construyendo sus marcas desde el extranjero. Relaciones que duran más allá del evento." },
  { icon: "🎓", titulo: "Masterclass Digital", desc: "Una sesión de alto valor con estrategias concretas para escalar tu negocio digital en 2027: posicionamiento, audiencia y ventas." },
  { icon: "🌐", titulo: "Comunidad latinoamericana", desc: "Forma parte de una red de emprendedores mexicanos con presencia internacional que se apoyan, se recomiendan y crecen juntos." },
  { icon: "💡", titulo: "Herramientas y claridad", desc: "Te llevarás ideas accionables, conexiones estratégicas y la claridad para tu siguiente paso en la construcción de tu marca personal o negocio digital." },
];

const PROBLEMAS = [
  { num: "01", titulo: "Estás construyendo en solitario", texto: "Sin una red de pares que entienda tu contexto, es difícil crecer — y más difícil aún sostener el ritmo cuando el camino se pone cuesta arriba." },
  { num: "02", titulo: "El mercado local no te conoce aún", texto: "Tienes el talento, la experiencia y el producto — pero falta posicionamiento local. Sin visibilidad, el mejor negocio pasa desapercibido." },
  { num: "03", titulo: "Sigues usando las mismas estrategias de México", texto: "Lo que funcionó allá no siempre funciona acá. El mercado, los hábitos y los canales son distintos — y adaptar eso solo toma tiempo y claridad." },
  { num: "04", titulo: "2027 llega con prisa", texto: "La IA, los nuevos modelos de negocio y los cambios en redes sociales avanzan rápido. No actualizarte ahora significa empezar el año siguiente ya con rezago." },
];

const PARA_QUIEN = [
  "Mexicanos que radican en el país anfitrión y tienen un negocio o proyecto digital en marcha o en construcción",
  "Emprendedores y empresarios que quieren posicionarse en su mercado local e internacional",
  "Profesionales con marca personal que buscan escalar su impacto y sus ingresos en 2027",
  "Personas que quieren conectar con otros mexicanos que están construyendo en el exterior",
];

const NO_ES_PARA = [
  "Personas que solo quieren escuchar sin aportar ni conectar",
  "Quienes buscan una solución mágica sin trabajo detrás",
  "Alguien que ya tiene todo resuelto y no necesita crecer",
];

const LO_QUE_TE_LLEVAS = [
  "Conexiones reales con mexicanos que construyen como tú desde el exterior",
  "Una estrategia clara para posicionarte en tu mercado local en 2027",
  "Herramientas digitales concretas para aplicar desde el día siguiente",
  "Visibilidad: el mercado de tu país te conocerá a ti y a tu marca",
];

// ─── Formulario compacto inline en hero ──────────────────────────────────────
function HeroForm({ config, onOpenModal }: { config: EventoConfig; onOpenModal: () => void }) {
  const [form, setForm] = useState({ nombre: "", lada: config.ladaDefault, telefono: "", correo: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 600);
  }

  const iStyle = {
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "0.75rem",
    padding: "0.65rem 0.9rem",
    fontSize: "0.8125rem",
    outline: "none",
    width: "100%",
  } as React.CSSProperties;

  if (sent) {
    return (
      <div className="text-center py-4">
        <div className="text-3xl mb-2">🎉</div>
        <p className="font-playfair font-bold text-white text-lg mb-1">¡Estás registrado!</p>
        <p className="text-white/70 text-sm">Te avisamos los detalles por WhatsApp. ¡Nos vemos en {config.ciudad}!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input required name="nombre" type="text" placeholder="Nombre completo" value={form.nombre}
        onChange={handleChange} style={iStyle} />
      <div className="flex gap-2">
        <select name="lada" value={form.lada} onChange={handleChange}
          style={{ ...iStyle, width: "90px", flexShrink: 0 }}>
          {LADAS.map((l) => (
            <option key={`${l.flag}${l.code}${l.name}`} value={l.code}
              style={{ background: "#1a0a2e", color: "white" }}>
              {l.flag} {l.code}
            </option>
          ))}
        </select>
        <input required name="telefono" type="tel" placeholder="WhatsApp" value={form.telefono}
          onChange={handleChange} style={{ ...iStyle, flex: 1 }} />
      </div>
      <input required name="correo" type="email" placeholder="Correo electrónico" value={form.correo}
        onChange={handleChange} style={iStyle} />
      <button type="submit" disabled={loading}
        className="w-full py-3.5 rounded-full font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 mt-1"
        style={{ background: "white", color: config.accentHex, boxShadow: "0 6px 20px rgba(0,0,0,0.2)" }}>
        {loading ? "Enviando…" : `Quiero mi lugar en ${config.pais} →`}
      </button>
      <p className="text-center text-xs text-white/40">Tus datos son confidenciales.</p>
    </form>
  );
}

// ─── Modal de registro ────────────────────────────────────────────────────────
function RegistroModal({ config, onClose }: { config: EventoConfig; onClose: () => void }) {
  const [form, setForm] = useState({ nombre: "", lada: config.ladaDefault, telefono: "", correo: "", empresa: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 600);
  }

  const inputStyle = { border: "1.5px solid rgba(192,0,90,0.2)", color: "#3A3F4B", background: "#fafafa" };
  const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = config.accentHex);
  const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = "rgba(192,0,90,0.2)");

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ background: "rgba(26,10,46,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "white", maxHeight: "92vh", overflowY: "auto" }}>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center" style={{ background: config.gradiente }}>
          <button onClick={onClose}
            className="absolute top-4 right-5 text-white/70 hover:text-white text-2xl leading-none">×</button>
          <span className="text-3xl mb-2 block">{config.bandera}</span>
          <p className="font-semibold text-xs uppercase tracking-widest text-white/75 mb-1">
            Networking &amp; Masterclass Digital · {config.pais}
          </p>
          <h2 className="font-playfair font-bold text-2xl text-white">Reserva tu lugar</h2>
          <p className="text-white/70 text-sm mt-1">{config.fechaTexto} · {config.horarioLocal}</p>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          {!sent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
                  style={{ color: "#3A3F4B", opacity: 0.65 }}>Nombre completo</label>
                <input required name="nombre" type="text" placeholder="Tu nombre" value={form.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
                  style={{ color: "#3A3F4B", opacity: 0.65 }}>Teléfono / WhatsApp</label>
                <div className="flex gap-2">
                  <select name="lada" value={form.lada} onChange={handleChange}
                    className="px-3 py-3 rounded-xl text-sm outline-none flex-shrink-0"
                    style={{ ...inputStyle, width: "105px" }}
                    onFocus={focusHandler} onBlur={blurHandler}>
                    {LADAS.map((l) => (
                      <option key={`${l.flag}${l.code}${l.name}`} value={l.code}>{l.flag} {l.code}</option>
                    ))}
                  </select>
                  <input required name="telefono" type="tel" placeholder="Número" value={form.telefono}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
                  style={{ color: "#3A3F4B", opacity: 0.65 }}>Correo electrónico</label>
                <input required name="correo" type="email" placeholder="hola@tu-negocio.com" value={form.correo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
                  style={{ color: "#3A3F4B", opacity: 0.65 }}>Negocio / marca</label>
                <input name="empresa" type="text" placeholder="Mi negocio" value={form.empresa}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>

              <button type="submit" disabled={loading}
                className="mt-2 w-full py-4 rounded-full font-bold text-sm text-white hover:opacity-90 transition-all disabled:opacity-50"
                style={{ background: config.gradiente, boxShadow: `0 8px 24px ${config.accentHex}40` }}>
                {loading ? "Enviando…" : `Quiero mi lugar en ${config.ciudad} →`}
              </button>
              <p className="text-center text-xs opacity-40 mt-1">Tus datos son confidenciales y no se comparten.</p>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="font-playfair font-bold text-xl mb-3" style={{ color: "#1a0a2e" }}>¡Estás registrado!</h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.8 }}>
                Te avisaremos los detalles finales por WhatsApp. ¡Nos vemos en {config.ciudad}!
              </p>
              <a href={WA_DUDAS} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-3 rounded-full transition-opacity hover:opacity-80"
                style={{ background: "rgba(37,211,102,0.1)", color: "#1a7a3c", border: "1px solid rgba(37,211,102,0.3)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Escríbenos por WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Header sticky para evento ────────────────────────────────────────────────
function EventoHeader({ config, onApply }: { config: EventoConfig; onApply: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0">{config.bandera}</span>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: "#1a0a2e" }}>
              Networking &amp; Masterclass Digital
            </p>
            <p className="text-xs truncate" style={{ color: config.accentHex }}>
              {config.ciudad} · {config.fechaTexto}
            </p>
          </div>
        </div>
        <button onClick={onApply}
          className="flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold text-white hover:opacity-90 transition-all"
          style={{ background: config.gradiente, boxShadow: `0 4px 16px ${config.accentHex}30` }}>
          Reservar lugar →
        </button>
      </div>
    </header>
  );
}

// ─── Template principal ───────────────────────────────────────────────────────
export default function EventoNetworking({ config }: { config: EventoConfig }) {
  const [modalOpen, setModalOpen] = useState(false);
  const HEAD = "#1a1f24";

  return (
    <>
      <EventoHeader config={config} onApply={() => setModalOpen(true)} />
      {modalOpen && <RegistroModal config={config} onClose={() => setModalOpen(false)} />}

      <main className="overflow-x-hidden bg-white">

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-20 pb-0 px-5 lg:px-8"
          style={{ background: config.gradiente }}>

          {/* Video de fondo (si existe) */}
          {config.videoBgSrc && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <video
                src={config.videoBgSrc}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.45 }}
              />
              {/* Overlay degradado del país para integrar el video */}
              <div className="absolute inset-0"
                style={{ background: config.gradiente, opacity: 0.62 }} />
            </div>
          )}

          {/* Blobs decorativos (cuando no hay video) */}
          {!config.videoBgSrc && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
                style={{ background: "rgba(255,255,255,0.08)", filter: "blur(80px)" }} />
              <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full"
                style={{ background: "rgba(0,0,0,0.15)", filter: "blur(70px)" }} />
            </div>
          )}

          <div className="relative z-10 max-w-6xl mx-auto pt-6 lg:pt-10">

            {/* Fila superior: badge + chips */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
                <span className="text-lg">{config.bandera}</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/90">
                  Networking &amp; Masterclass Digital · {config.pais}
                </span>
              </div>
              {[
                { icon: "📅", text: config.fechaTexto },
                { icon: "📍", text: config.ciudad },
                { icon: "🕖", text: config.horarioLocal },
              ].map((chip) => (
                <div key={chip.text}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-white/80"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <span>{chip.icon}</span>
                  <span>{chip.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Título principal: la masterclass */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair font-black text-white mb-4 max-w-3xl"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
              {config.masterclass}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
              className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
              {config.subtitulo}
            </motion.p>

            {/* Dos columnas: imagen izquierda + formulario derecha */}
            <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-10 items-end">

              {/* Imagen de portada */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
                className="relative rounded-t-3xl overflow-hidden self-end"
                style={{ aspectRatio: "16/10", minHeight: "260px" }}>
                {config.portadaSrc ? (
                  <Image src={config.portadaSrc} alt={`Evento ${config.pais}`} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3"
                    style={{ background: "rgba(255,255,255,0.1)", border: "2px dashed rgba(255,255,255,0.3)", borderBottom: "none", borderRadius: "1.5rem 1.5rem 0 0" }}>
                    <span className="text-5xl">{config.bandera}</span>
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Imagen próximamente</p>
                  </div>
                )}
              </motion.div>

              {/* Formulario de registro inline */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
                className="rounded-t-3xl p-6 sm:p-7"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.25)", borderBottom: "none" }}>
                <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Cupo limitado</p>
                <h2 className="font-playfair font-bold text-xl text-white mb-4">Reserva tu lugar ahora</h2>
                <HeroForm config={config} onOpenModal={() => setModalOpen(true)} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Separador */}
        <div className="h-8 sm:h-12" style={{ background: config.gradiente }} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }}
          className="text-center py-4 bg-white">
          <ChevronDown size={20} className="mx-auto animate-bounce" style={{ color: "#3A3F4B", opacity: 0.3 }} />
        </motion.div>

        {/* ── PROBLEMAS ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-20 px-5 lg:px-8" style={{ background: "#fafbfc" }}>
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: config.accentHex, opacity: 0.07, filter: "blur(90px)" }} />
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mb-12 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: config.accentHex }}>
                El contexto que nadie dice
              </p>
              <h2 className="font-playfair font-black text-3xl sm:text-4xl mb-4" style={{ color: HEAD, lineHeight: 1.15 }}>
                Construir desde {config.pais} tiene sus <span style={{ color: config.accentHex }}>retos únicos</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {PROBLEMAS.map((p, i) => (
                <motion.div key={p.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6"
                  style={{ background: "white", border: `1px solid ${config.accentHex}20`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: config.accentHex, opacity: 0.6 }}>{p.num}</p>
                  <h3 className="font-bold text-base mb-2" style={{ color: HEAD }}>{p.titulo}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.7 }}>{p.texto}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUÉ INCLUYE ────────────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: config.accentHex }}>Lo que vivirás</p>
              <h2 className="font-playfair font-black text-3xl sm:text-4xl" style={{ color: HEAD }}>
                Una tarde que cambia el rumbo<br className="hidden sm:block" /> de tu negocio
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {BENEFICIOS.map((b, i) => (
                <motion.div key={b.titulo} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 sm:p-7"
                  style={{ border: `1.5px solid ${config.accentHex}18`, background: config.gradienteCard }}>
                  <span className="text-3xl mb-4 block">{b.icon}</span>
                  <h3 className="font-playfair font-bold text-lg mb-2" style={{ color: HEAD }}>{b.titulo}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.75 }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LO QUE TE LLEVAS ───────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8" style={{ background: "#fafbfc" }}>
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: config.accentHex }}>Resultados concretos</p>
              <h2 className="font-playfair font-black text-3xl sm:text-4xl" style={{ color: HEAD }}>
                Lo que te llevas de {config.ciudad}
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {LO_QUE_TE_LLEVAS.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  className="flex items-start gap-4 rounded-2xl px-6 py-5 bg-white"
                  style={{ border: `1.5px solid ${config.accentHex}15`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs text-white font-bold mt-0.5"
                    style={{ background: config.gradiente }}>✓</span>
                  <span className="text-sm leading-relaxed font-medium" style={{ color: HEAD }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARA QUIÉN SÍ / NO ─────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
            {/* Sí es para */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: config.accentHex }}>Sí es para ti si…</p>
              <div className="flex flex-col gap-3">
                {PARA_QUIEN.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                    style={{ background: `${config.accentHex}0d`, border: `1px solid ${config.accentHex}22` }}>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white mt-0.5"
                      style={{ background: config.accentHex }}>✓</span>
                    <span className="text-sm leading-relaxed" style={{ color: HEAD }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* No es para */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#888" }}>No es para ti si…</p>
              <div className="flex flex-col gap-3">
                {NO_ES_PARA.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                    style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.07)" }}>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white mt-0.5 bg-gray-400">✕</span>
                    <span className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.65 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SOBRE ANY VILLEGAS ──────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8" style={{ background: "#fafbfc" }}>
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden max-w-sm mx-auto lg:mx-0"
                style={{ background: config.gradiente }}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/30 text-6xl">👤</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: config.accentHex }}>Tu anfitriona</p>
              <h2 className="font-playfair font-black text-3xl sm:text-4xl mb-3" style={{ color: HEAD }}>Any Villegas</h2>
              <p className="text-sm font-semibold mb-5" style={{ color: config.accentHex }}>
                Fundadora y Directora General · Loreto Consultora
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: HEAD, opacity: 0.8 }}>
                Estratega de marca personal y negocios digitales con más de 10 años acompañando a emprendedores y empresarios latinoamericanos a construir marcas con propósito, posicionamiento y resultados reales.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.8 }}>
                Ha trabajado con cientos de profesionales que hoy tienen negocios digitales rentables, comunidades activas y una presencia en línea que les genera ingresos constantes. Este evento es su forma de llevar esa transformación en persona a {config.pais}.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CTA FINAL ───────────────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8 relative overflow-hidden" style={{ background: config.gradiente }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", filter: "blur(60px)" }} />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-5xl mb-6 block">{config.bandera}</span>
              <h2 className="font-playfair font-black text-white mb-5"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
                El cupo en {config.ciudad} es limitado.
                <br />No esperes para registrarte.
              </h2>
              <p className="text-white/80 text-base mb-8">
                {config.fechaTexto} · {config.horarioLocal} · 📍 {config.ciudad}
              </p>
              <button onClick={() => setModalOpen(true)}
                className="inline-block px-10 py-4 rounded-full font-bold text-sm transition-all hover:opacity-90"
                style={{ background: "white", color: config.accentHex, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
                Quiero mi lugar en {config.pais} →
              </button>

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
