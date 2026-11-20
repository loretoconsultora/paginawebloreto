"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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

function GoogleMeetIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="white" fillOpacity="0.15"/>
      <path d="M4 8.5C4 7.4 4.9 6.5 6 6.5H13C14.1 6.5 15 7.4 15 8.5V15.5C15 16.6 14.1 17.5 13 17.5H6C4.9 17.5 4 16.6 4 15.5V8.5Z" fill="#00897B"/>
      <path d="M15 10.5L20 7.5V16.5L15 13.5V10.5Z" fill="#00897B"/>
      <path d="M4 8.5C4 7.4 4.9 6.5 6 6.5H13C14.1 6.5 15 7.4 15 8.5V15.5C15 16.6 14.1 17.5 13 17.5H6C4.9 17.5 4 16.6 4 15.5V8.5Z" fill="#00BCD4" fillOpacity="0.5"/>
      <circle cx="9.5" cy="12" r="2" fill="white" fillOpacity="0.9"/>
    </svg>
  );
}

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
  portadaSrc?: string;
  gradiente: string;
  accentHex: string;
  gradienteCard: string;
  // Contenido por país
  loQueTeLlevas?: string[];
  problemas?: { num: string; titulo: string; texto: string }[];
  porQueAhora?: { antes: string; hoy: string }[];
  porQueAhoraTitle?: string;
  faq?: { q: string; a: string }[];
  ctaFinalTexto?: string;
  paraQuienSi?: string[];
  paraQuienNo?: string[];
}

function splitMasterclass(text: string): [string, string] {
  const idx = text.indexOf(":");
  if (idx === -1) return [text, ""];
  return [text.slice(0, idx + 1), text.slice(idx + 1).trim()];
}

function waUrl(config: EventoConfig) {
  const msg = `Hola Any, me interesa el Networking & Masterclass Digital en ${config.pais} (${config.fechaTexto}). ¿Me puedes dar más información?`;
  return `https://wa.me/524427497345?text=${encodeURIComponent(msg)}`;
}

// ─── Defaults compartidos ─────────────────────────────────────────────────────
const DEFAULT_PARA_QUIEN_SI = [
  "Mexicanos que radican en el país anfitrión con un negocio o proyecto digital en marcha",
  "Emprendedores y empresarios que quieren posicionarse en su mercado local e internacional",
  "Profesionales con marca personal que buscan escalar su impacto y sus ingresos en 2027",
  "Personas que quieren conectar con otros mexicanos que construyen desde el exterior",
];

const DEFAULT_PARA_QUIEN_NO = [
  "Personas que solo quieren escuchar sin aportar ni conectar",
  "Quienes buscan una solución mágica sin trabajo detrás",
  "Alguien que ya tiene todo resuelto y no necesita crecer",
];

const DEFAULT_FAQ = [
  { q: "¿Tiene algún costo?", a: "Totalmente gratuito. Solo necesitas registrarte para asegurar tu lugar, ya que el cupo es limitado." },
  { q: "¿Necesito experiencia previa?", a: "No. El evento está diseñado para emprendedores en diferentes etapas. Llegarás con dudas y te irás con claridad." },
  { q: "¿Dónde se realiza?", a: "Es un evento en línea por Google Meet. Recibirás el enlace de acceso en tu correo después de registrarte." },
  { q: "¿Puedo compartirlo con alguien más?", a: "Sí, siempre que la otra persona se registre por separado." },
];

// ─── Testimonios ──────────────────────────────────────────────────────────────
const TESTIMONIOS = [
  { init: "LM", texto: "Los talleres de IA me volaron la cabeza 🤯 nunca imaginé que podía automatizar tantas tareas y tener más tiempo para lo que realmente importa. Mil gracias, esto es un antes y un después para mi negocio.", hora: "10:42" },
  { init: "RS", texto: "El taller de marketing fue increíble, ahora entiendo cómo conectar con mi audiencia y crear contenido que realmente vende. Ya apliqué varias estrategias y los resultados han sido súper positivos 🚀", hora: "11:15" },
  { init: "CC", texto: "Desde que implementé lo que aprendí en los talleres, he visto cambios enormes en mi productividad y en los resultados de mi empresa. Más organización, más ventas y menos estrés. Totalmente recomendado 🙌", hora: "09:58" },
  { init: "NG", texto: "Me encantó cómo explican todo de una forma tan práctica y fácil de aplicar. He optimizado procesos, ahorrado horas de trabajo y me siento más creativa que nunca. Ahora puedo enfocarme en hacer crecer mi marca.", hora: "12:05" },
  { init: "VM", texto: "Antes tenía miedo de que fuera algo muy técnico para mí, pero me dieron la confianza para probar, experimentar y ahora estoy obsesionada con todo lo que puedo crear y lograr 😍", hora: "11:47" },
  { init: "MJ", texto: "Superar el miedo fue lo mejor que pude hacer. Al principio dudaba, pero me animé y ahora no puedo parar de implementar ideas nuevas. Mi negocio creció, mi equipo está más motivado y yo me siento imparable 🔥", hora: "10:30" },
];

// ─── Confirmación de registro ─────────────────────────────────────────────────
function RegistradoView({ config }: { config: EventoConfig }) {
  return (
    <div className="text-center py-6">
      <div className="text-4xl mb-3">🎉</div>
      <h3 className="font-playfair font-bold text-xl mb-2" style={{ color: "#1a0a2e" }}>¡Estás registrado!</h3>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.85 }}>
        En los próximos minutos recibirás un correo con el <strong>enlace de Google Meet</strong> para el evento. Revisa también tu carpeta de spam.
      </p>
      <div className="rounded-xl px-4 py-3 mb-5 text-left"
        style={{ background: "rgba(0,188,212,0.08)", border: "1px solid rgba(0,188,212,0.25)" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#00838f" }}>Plataforma</p>
        <div className="flex items-center gap-2">
          <GoogleMeetIcon size={18} />
          <span className="text-sm font-semibold" style={{ color: "#1a1f24" }}>Google Meet · En línea</span>
        </div>
        <p className="text-xs mt-1" style={{ color: "#3A3F4B", opacity: 0.65 }}>
          {config.fechaTexto} · {config.horarioLocal}
        </p>
      </div>
      <a href={waUrl(config)} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-3 rounded-full transition-opacity hover:opacity-80"
        style={{ background: "rgba(37,211,102,0.1)", color: "#1a7a3c", border: "1px solid rgba(37,211,102,0.3)" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        ¿Tienes dudas? Escríbenos
      </a>
    </div>
  );
}

// ─── Formulario compacto inline ───────────────────────────────────────────────
function HeroForm({ config }: { config: EventoConfig }) {
  const [form, setForm] = useState({ nombre: "", lada: config.ladaDefault, telefono: "", correo: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (sent) return <RegistradoView config={config} />;

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, pais: config.pais }),
      });
      if (!res.ok) throw new Error("error");
      setSent(true);
    } catch {
      alert("Hubo un problema al registrarte. Intenta de nuevo o escríbenos por WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}
      className="flex flex-col gap-3">
      <input required name="nombre" type="text" placeholder="Nombre completo" value={form.nombre}
        onChange={(e) => setForm(f => ({ ...f, nombre: e.target.value }))} style={iStyle} />
      <div className="flex gap-2">
        <select name="lada" value={form.lada}
          onChange={(e) => setForm(f => ({ ...f, lada: e.target.value }))}
          style={{ ...iStyle, width: "90px", flexShrink: 0 }}>
          {LADAS.map((l) => (
            <option key={`${l.flag}${l.code}${l.name}`} value={l.code} style={{ background: "#1a0a2e", color: "white" }}>
              {l.flag} {l.code}
            </option>
          ))}
        </select>
        <input required name="telefono" type="tel" placeholder="WhatsApp" value={form.telefono}
          onChange={(e) => setForm(f => ({ ...f, telefono: e.target.value }))} style={{ ...iStyle, flex: 1 }} />
      </div>
      <input required name="correo" type="email" placeholder="Correo electrónico" value={form.correo}
        onChange={(e) => setForm(f => ({ ...f, correo: e.target.value }))} style={iStyle} />
      <button type="submit" disabled={loading}
        className="w-full py-3.5 rounded-full font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 mt-1"
        style={{ background: "white", color: config.accentHex, boxShadow: "0 6px 20px rgba(0,0,0,0.2)" }}>
        {loading ? "Enviando…" : "Quiero mi lugar →"}
      </button>
      <p className="text-center text-xs text-white/40">Recibirás el acceso por correo. Datos confidenciales.</p>
    </form>
  );
}

// ─── Modal de registro ────────────────────────────────────────────────────────
function RegistroModal({ config, onClose }: { config: EventoConfig; onClose: () => void }) {
  const [form, setForm] = useState({ nombre: "", lada: config.ladaDefault, telefono: "", correo: "", empresa: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

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
        <div className="px-8 pt-8 pb-6 text-center" style={{ background: config.gradiente }}>
          <button onClick={onClose} className="absolute top-4 right-5 text-white/70 hover:text-white text-2xl leading-none">×</button>
          <span className="text-3xl mb-2 block">{config.bandera}</span>
          <p className="font-semibold text-xs uppercase tracking-widest text-white/75 mb-1">Networking &amp; Masterclass Digital</p>
          <h2 className="font-playfair font-bold text-2xl text-white">Reserva tu lugar</h2>
          <p className="text-white/70 text-sm mt-1">{config.fechaTexto} · {config.horarioLocal}</p>
        </div>
        <div className="px-8 py-7">
          {!sent ? (
            <form onSubmit={async (e) => {
                e.preventDefault(); setLoading(true);
                try {
                  const res = await fetch("/api/registro", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, pais: config.pais }) });
                  if (!res.ok) throw new Error();
                  setSent(true);
                } catch { alert("Hubo un problema. Intenta de nuevo o contáctanos por WhatsApp."); }
                finally { setLoading(false); }
              }}
              className="flex flex-col gap-4">
              {[
                { label: "Nombre completo", name: "nombre", type: "text", placeholder: "Tu nombre" },
                { label: "Correo electrónico", name: "correo", type: "email", placeholder: "hola@tu-negocio.com" },
                { label: "Negocio / marca", name: "empresa", type: "text", placeholder: "Mi negocio" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#3A3F4B", opacity: 0.65 }}>{f.label}</label>
                  <input required={f.name !== "empresa"} name={f.name} type={f.type} placeholder={f.placeholder}
                    value={form[f.name as keyof typeof form]}
                    onChange={(e) => setForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#3A3F4B", opacity: 0.65 }}>Teléfono / WhatsApp</label>
                <div className="flex gap-2">
                  <select name="lada" value={form.lada} onChange={(e) => setForm(f => ({ ...f, lada: e.target.value }))}
                    className="px-3 py-3 rounded-xl text-sm outline-none flex-shrink-0"
                    style={{ ...inputStyle, width: "105px" }} onFocus={focusHandler} onBlur={blurHandler}>
                    {LADAS.map((l) => (
                      <option key={`${l.flag}${l.code}${l.name}`} value={l.code}>{l.flag} {l.code}</option>
                    ))}
                  </select>
                  <input required name="telefono" type="tel" placeholder="Número" value={form.telefono}
                    onChange={(e) => setForm(f => ({ ...f, telefono: e.target.value }))}
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="mt-2 w-full py-4 rounded-full font-bold text-sm text-white hover:opacity-90 transition-all disabled:opacity-50"
                style={{ background: config.gradiente, boxShadow: `0 8px 24px ${config.accentHex}40` }}>
                {loading ? "Enviando…" : "Quiero mi lugar →"}
              </button>
              <p className="text-center text-xs opacity-40 mt-1">Recibirás el acceso por correo. Datos confidenciales.</p>
            </form>
          ) : (
            <RegistradoView config={config} />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Header sticky ────────────────────────────────────────────────────────────
function EventoHeader({ config, onApply }: { config: EventoConfig; onApply: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0">{config.bandera}</span>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: "#1a0a2e" }}>Networking &amp; Masterclass Digital</p>
            <p className="text-xs truncate" style={{ color: config.accentHex }}>{config.fechaTexto} · {config.horarioLocal}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href={waUrl(config)} target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all hover:opacity-80"
            style={{ background: "rgba(37,211,102,0.12)", color: "#1a7a3c", border: "1px solid rgba(37,211,102,0.3)" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <button onClick={onApply}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-white hover:opacity-90 transition-all"
            style={{ background: config.gradiente, boxShadow: `0 4px 16px ${config.accentHex}30` }}>
            Reservar lugar →
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a, accentHex }: { q: string; a: string; accentHex: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{ border: `1px solid ${accentHex}22`, background: "white" }}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-3">
        <span className="font-semibold text-sm" style={{ color: "#1a1f24" }}>{q}</span>
        <ChevronDown size={16} className="flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", color: accentHex }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            transition={{ duration: 0.22 }} style={{ overflow: "hidden" }}>
            <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.85 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Template principal ───────────────────────────────────────────────────────
export default function EventoNetworking({ config }: { config: EventoConfig }) {
  const [modalOpen, setModalOpen] = useState(false);
  const HEAD = "#1a1f24";
  const [titleBig, titleSmall] = splitMasterclass(config.masterclass);

  const loQueTeLlevas   = config.loQueTeLlevas   ?? ["Conexiones reales con mexicanos que construyen como tú desde el exterior", "Estrategias concretas para posicionarte en tu mercado en 2027", "Herramientas digitales accionables desde el día siguiente", "Visibilidad: el mercado de tu país te conocerá a ti y a tu marca"];
  const problemas       = config.problemas       ?? [{ num: "01", titulo: "Estás construyendo en solitario", texto: "Sin una red de pares que entienda tu contexto, es difícil crecer — y más difícil aún sostener el ritmo cuando el camino se pone cuesta arriba." }, { num: "02", titulo: "El mercado local no te conoce aún", texto: "Tienes el talento, la experiencia y el producto — pero falta posicionamiento local. Sin visibilidad, el mejor negocio pasa desapercibido." }, { num: "03", titulo: "Sigues usando las mismas estrategias de México", texto: "Lo que funcionó allá no siempre funciona acá. El mercado, los hábitos y los canales son distintos — y adaptar eso solo toma tiempo y claridad." }, { num: "04", titulo: "2027 llega con prisa", texto: "La IA, los nuevos modelos de negocio y los cambios en redes sociales avanzan rápido. No actualizarte ahora significa empezar el año siguiente ya con rezago." }];
  const faq             = config.faq             ?? DEFAULT_FAQ;
  const paraQuienSi     = config.paraQuienSi     ?? DEFAULT_PARA_QUIEN_SI;
  const paraQuienNo     = config.paraQuienNo     ?? DEFAULT_PARA_QUIEN_NO;
  const ctaTexto        = config.ctaFinalTexto   ?? "El cupo es limitado. No esperes para registrarte.";

  return (
    <>
      <EventoHeader config={config} onApply={() => setModalOpen(true)} />
      {modalOpen && <RegistroModal config={config} onClose={() => setModalOpen(false)} />}

      <main className="overflow-x-hidden bg-white">

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-20" style={{ background: config.gradiente }}>
          {/* Luces decorativas */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", filter: "blur(80px)" }} />
            <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full"
              style={{ background: "rgba(0,0,0,0.15)", filter: "blur(70px)" }} />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-5 lg:px-8 pt-8 lg:pt-12">

            {/* Columna centrada: badge, título, subtítulo, chips, imagen */}
            <div className="flex flex-col items-center text-center gap-6 mb-10">

              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
                  <span className="text-lg">{config.bandera}</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/90">
                    Networking &amp; Masterclass Digital
                  </span>
                </div>
              </motion.div>

              {/* H1 */}
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="font-playfair font-black text-white leading-tight max-w-2xl">
                <span style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", display: "block" }}>{titleBig}</span>
                {titleSmall && (
                  <span style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.9rem)", opacity: 0.88, display: "block", marginTop: "0.3rem" }}>
                    {titleSmall}
                  </span>
                )}
              </motion.h1>

              {/* Subtítulo */}
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
                {config.subtitulo}
              </motion.p>

              {/* Chips: fecha + hora */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2">
                {[
                  { icon: "📅", text: config.fechaTexto },
                  { icon: "🕖", text: config.horarioLocal },
                  { icon: "🖥️", text: "En línea · Google Meet" },
                ].map((chip) => (
                  <div key={chip.text}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-white/85"
                    style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)" }}>
                    <span>{chip.icon}</span>
                    <span>{chip.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* Imagen centrada con bisel y sombra */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
                className="w-full max-w-sm">
                {config.portadaSrc ? (
                  <div className="relative rounded-3xl overflow-hidden mx-auto"
                    style={{
                      aspectRatio: "1 / 1",
                      boxShadow: "0 28px 60px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.18)",
                      border: "2px solid rgba(255,255,255,0.18)",
                    }}>
                    <Image
                      src={config.portadaSrc}
                      alt={`Networking & Masterclass Digital ${config.pais}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="rounded-3xl flex items-center justify-center mx-auto"
                    style={{ aspectRatio: "1 / 1", background: "rgba(255,255,255,0.08)", border: "2px dashed rgba(255,255,255,0.25)" }}>
                    <span className="text-6xl">{config.bandera}</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* FORMULARIO abajo, ancho completo */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="max-w-xl mx-auto rounded-t-3xl p-6 sm:p-8"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderBottom: "none",
              }}>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Cupo limitado</p>
              <h2 className="font-playfair font-bold text-xl text-white mb-4">Reserva tu lugar ahora</h2>
              <HeroForm config={config} />
            </motion.div>
          </div>
        </section>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }}
          className="text-center py-4 bg-white">
          <ChevronDown size={20} className="mx-auto animate-bounce" style={{ color: "#3A3F4B", opacity: 0.3 }} />
        </motion.div>

        {/* ── ¿POR QUÉ AHORA? ────────────────────────────────────────────── */}
        {config.porQueAhora && config.porQueAhora.length > 0 && (
          <section className="relative overflow-hidden py-20 px-5 lg:px-8" style={{ background: "#1a1f24" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full"
                style={{ background: config.accentHex, opacity: 0.08, filter: "blur(90px)" }} />
            </div>
            <div className="max-w-5xl mx-auto relative z-10">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#38bdf8" }}>¿Por qué ahora?</p>
                <h2 className="font-playfair font-black text-white max-w-2xl mx-auto"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", lineHeight: 1.2, whiteSpace: "pre-line" }}>
                  {config.porQueAhoraTitle ?? "El juego cambió.\nLos que se muevan ahora van a liderar este 2027."}
                </h2>
              </motion.div>
              <div className="grid sm:grid-cols-3 gap-5">
                {config.porQueAhora.map((card, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="px-5 py-4" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Antes</span>
                      <p className="text-sm leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>{card.antes}</p>
                    </div>
                    <div className="px-5 py-1 flex items-center gap-2">
                      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                      <span className="text-base" style={{ color: "#38bdf8" }}>↓</span>
                      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                    </div>
                    <div className="px-5 py-4" style={{ background: `${config.accentHex}18` }}>
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#38bdf8" }}>Hoy</span>
                      <p className="text-sm leading-relaxed mt-2 text-white">{card.hoy}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── PROBLEMAS ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-20 px-5 lg:px-8" style={{ background: "#fafbfc" }}>
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: config.accentHex, opacity: 0.07, filter: "blur(90px)" }} />
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 max-w-2xl">
              <h2 className="font-playfair font-black text-3xl sm:text-4xl" style={{ color: HEAD, lineHeight: 1.15 }}>
                ¿Te suena familiar?
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-5">
              {problemas.map((p, i) => (
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

        {/* ── LO QUE TE LLEVAS ───────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="font-playfair font-black text-3xl sm:text-4xl" style={{ color: HEAD }}>
                Lo que te llevas del evento
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4">
              {loQueTeLlevas.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  className="flex items-start gap-4 rounded-2xl px-6 py-5"
                  style={{ border: `1.5px solid ${config.accentHex}15`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", background: config.gradienteCard }}>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs text-white font-bold mt-0.5"
                    style={{ background: config.gradiente }}>✓</span>
                  <span className="text-sm leading-relaxed font-medium" style={{ color: HEAD }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARA QUIÉN SÍ / NO ─────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8" style={{ background: "#fafbfc" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10">
              <h2 className="font-playfair font-black text-3xl sm:text-4xl" style={{ color: HEAD }}>
                Es para ti si quieres crecer con criterio,<br className="hidden sm:block" /> no solo con más herramientas y operación.
              </h2>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-3xl p-7" style={{ background: `${config.accentHex}0d`, border: `1.5px solid ${config.accentHex}25` }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: config.accentHex }}>✓</div>
                  <p className="font-bold text-base" style={{ color: HEAD }}>Para quién SÍ es</p>
                </div>
                <div className="flex flex-col gap-3">
                  {paraQuienSi.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white mt-0.5"
                        style={{ background: config.accentHex }}>✓</span>
                      <span className="text-sm leading-relaxed" style={{ color: HEAD }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl p-7" style={{ background: "rgba(0,0,0,0.03)", border: "1.5px solid rgba(0,0,0,0.07)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gray-400">✕</div>
                  <p className="font-bold text-base" style={{ color: HEAD }}>Para quién NO es</p>
                </div>
                <div className="flex flex-col gap-3">
                  {paraQuienNo.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white mt-0.5 bg-gray-400">✕</span>
                      <span className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.65 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 rounded-2xl px-6 py-4 flex items-start gap-3"
              style={{ background: `${config.accentHex}10`, border: `1px solid ${config.accentHex}25` }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5"
                style={{ background: config.accentHex }}>✓</div>
              <p className="text-sm" style={{ color: HEAD }}>
                Si te reconociste en al menos dos puntos de la columna izquierda, este evento es exactamente para ti.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── SOBRE ANY VILLEGAS ──────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8" style={{ background: "#fafbfc" }}>
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="aspect-square rounded-3xl overflow-hidden max-w-xs mx-auto mb-8"
                style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }}>
                <Image
                  src="/foto-any.webp"
                  alt="Any Villegas — Loreto Consultora"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: config.accentHex }}>Tu anfitriona</p>
              <h2 className="font-playfair font-black text-3xl sm:text-4xl mb-3" style={{ color: HEAD }}>Any Villegas</h2>
              <p className="text-sm font-semibold mb-5" style={{ color: config.accentHex }}>
                Fundadora y Directora General · Loreto Consultora
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: HEAD, opacity: 0.8 }}>
                Estratega de marca personal y negocios digitales con más de 10 años acompañando a emprendedores y empresarios latinoamericanos a construir marcas con propósito, posicionamiento y resultados reales.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: HEAD, opacity: 0.8 }}>
                Ha trabajado con cientos de profesionales que hoy tienen negocios digitales rentables, comunidades activas y una presencia en línea que les genera ingresos constantes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-20 px-5 lg:px-8 bg-white">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: config.accentHex }}>Preguntas frecuentes</p>
              <h2 className="font-playfair font-black text-3xl sm:text-4xl" style={{ color: HEAD }}>
                Resuelve tus dudas antes de registrarte
              </h2>
            </motion.div>
            <div className="flex flex-col gap-3">
              {faq.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} accentHex={config.accentHex} />
              ))}
            </div>
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
                {ctaTexto}
              </h2>
              <p className="text-white/80 text-base mb-4">{config.fechaTexto} · {config.horarioLocal}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full mb-8"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                <GoogleMeetIcon size={18} />
                <span className="text-white text-sm font-semibold">Evento en línea · Google Meet</span>
              </div>
              <div className="block" />
              <button onClick={() => setModalOpen(true)}
                className="inline-block px-10 py-4 rounded-full font-bold text-sm transition-all hover:opacity-90"
                style={{ background: "white", color: config.accentHex, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
                Quiero mi lugar →
              </button>
              <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                <a href={waUrl(config)} target="_blank" rel="noopener noreferrer"
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
