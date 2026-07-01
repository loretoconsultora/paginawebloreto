"use client";

import { useState } from "react";
import Script from "next/script";
import { MapPin, Clock, Calendar, Sparkles, CheckCircle2, Users, Palette } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const META_PIXEL_ID = "1390397069822788";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const GRADIENT = "linear-gradient(135deg, #1a0a2e 0%, #c0005a 45%, #E894FF 100%)";
const N8N_WEBHOOK = process.env.NEXT_PUBLIC_N8N_ARTOFBRAND_WEBHOOK ?? "";

const CUPO_POR_SESION = 12;
const PRECIO_MXN = "$1,450 MXN";

const STRIPE_LINKS: Record<string, string> = {
  bloom: "https://book.stripe.com/14AeVd2bh8ed9ZW1D32Nq00",
  atelier: "https://book.stripe.com/7sY7sL5ntcut2xu95v2Nq01",
  muse: "https://book.stripe.com/4gM14naHN0LL8VS1D32Nq02",
};

const EXPERIENCIAS = [
  {
    id: "bloom",
    nombre: "Brand & Bloom",
    subtipo: "Diseño floral + branding",
    aprende: "Storytelling, arquetipos de marca, comunicación estratégica y estrategia de contenidos para redes sociales.",
    incluye: "Workshop de marketing (con manual post curso) + workshop de diseño floral (materiales incluidos) + bebida y aperitivos.",
    color: "#c0005a",
    bgColor: "rgba(192,0,90,0.06)",
    borderColor: "rgba(192,0,90,0.2)",
    imagen: "/eventos/brand-bloom.png",
  },
  {
    id: "atelier",
    nombre: "The Brand Atelier",
    subtipo: "Cerámica + branding",
    aprende: "Planeación estratégica, project management interno, herramientas de mejora continua y las últimas actualizaciones de los negocios digitales.",
    incluye: "Workshop de negocios (con manual post curso) + workshop de pintura de cerámica (materiales incluidos) + bebida y aperitivos.",
    color: "#7a5800",
    bgColor: "rgba(245,200,66,0.08)",
    borderColor: "rgba(245,200,66,0.35)",
    imagen: "/eventos/brand-atelier.png",
  },
  {
    id: "muse",
    nombre: "The Brand Muse",
    subtipo: "Self Portrait + branding",
    aprende: "Identidad de marca, cómo pasar de emprendedor a empresario, y diseño de sistemas de negocio escalables que te den libertad.",
    incluye: "Workshop de negocios (con manual post curso) + workshop de autorretrato en lienzo o espejo (materiales incluidos) + bebida y aperitivos.",
    color: "#0d6b6d",
    bgColor: "rgba(13,107,109,0.06)",
    borderColor: "rgba(13,107,109,0.2)",
    imagen: "/eventos/brand-muse.png",
  },
];

const CIUDADES = [
  {
    id: "cdmx",
    ciudad: "Ciudad de México",
    venue: "Mimbre, Colonia San Rafael",
    mapsUrl: "https://maps.app.goo.gl/U3ARncK9UNJcLS8WA",
    cupoLleno: true,
    sesiones: {
      bloom: { fecha: "Martes 7 de julio", hora: "4:00 - 7:00 pm" },
      atelier: { fecha: "Miércoles 8 de julio", hora: "4:00 - 7:00 pm" },
      muse: { fecha: "Jueves 9 de julio", hora: "4:00 - 7:00 pm" },
    },
  },
  {
    id: "queretaro",
    ciudad: "Querétaro",
    venue: "Alva Coffee & Health Bar, Colonia El Refugio",
    mapsUrl: "https://maps.app.goo.gl/jMxfjyQg3ZC7cKv48",
    cupoLleno: false,
    sesiones: {
      bloom: { fecha: "Viernes 10 de julio", hora: "4:00 - 7:00 pm" },
      atelier: { fecha: "Sábado 11 de julio", hora: "10:00 am - 1:00 pm" },
      muse: { fecha: "Sábado 11 de julio", hora: "4:00 - 7:00 pm" },
    },
  },
];

type CiudadId = typeof CIUDADES[number]["id"];

const BENEFICIOS = [
  { icon: Users, texto: "Grupo íntimo y curado — solo 12 lugares por sesión" },
  { icon: Palette, texto: "Incluye: Manual de trabajo, ejercicios para tu marca, Kit de arte + bebida y aperitivos" },
];

export default function RegistroArtOfBrandPage() {
  const [form, setForm] = useState({ nombre: "", negocio: "", correo: "", lada: "52", telefono: "" });
  const [ciudad, setCiudad] = useState<CiudadId>("queretaro");
  const [experiencias, setExperiencias] = useState<string[]>([]);
  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const inputClass = "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-grafito placeholder:text-gray-400 focus:outline-none focus:border-pink-300 transition-colors";

  const toggle = (id: string) =>
    setExperiencias((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const ciudadActual = CIUDADES.find((c) => c.id === ciudad)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (experiencias.length === 0) return;
    setEstado("loading");

    try {
      if (N8N_WEBHOOK) {
        await fetch(N8N_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, ciudad, experiencias }),
        });
      }
      setEstado("ok");
      window.fbq?.("track", "CompleteRegistration");
    } catch {
      setEstado("error");
    }
  };

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Navbar />
      <main className="min-h-screen" style={{ background: "#fafafa" }}>

        {/* ── Hero ── */}
        <section className="pt-32 pb-14 text-center px-4 sm:px-6" style={{ background: GRADIENT }}>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <Sparkles size={13} className="text-white" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">Colección de eventos · Julio 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-4xl sm:text-5xl font-bold mb-4 text-white"
              style={{ lineHeight: 1.15 }}
            >
              The Art of Brand
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/85 text-base sm:text-lg leading-relaxed mb-7"
            >
              Una serie de eventos de autor que combina talleres prácticos de negocios, marketing y branding con experiencias íntimas, donde con intención y a través del arte construimos las estrategias que impulsarán tu marca.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl mx-auto"
            >
              {BENEFICIOS.map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-left bg-white/10 rounded-xl px-4 py-2.5">
                  <b.icon size={16} className="text-white flex-shrink-0" />
                  <span className="text-sm text-white/90">{b.texto}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 flex flex-col items-center gap-2.5"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.95)" }}>
                <span className="text-sm font-bold" style={{ color: "#1a0a2e" }}>{PRECIO_MXN}</span>
                <span className="text-xs text-grafito/60">por experiencia</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full whitespace-nowrap" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}>
                  <span className="text-xs font-semibold text-white">Bundle 2 Eventos — 10%</span>
                  <span className="text-[10px] text-white/70">· código 2exp_TAoB</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full whitespace-nowrap" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}>
                  <span className="text-xs font-semibold text-white">Total Pass 3 Eventos — 20%</span>
                  <span className="text-[10px] text-white/70">· código full_TAoB</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 pb-20">

          {/* Las 3 experiencias */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 relative z-10"
          >
            {EXPERIENCIAS.map((e) => (
              <div key={e.id} className="rounded-2xl overflow-hidden flex flex-col bg-white" style={{ border: `1px solid ${e.borderColor}`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="w-full overflow-hidden flex-shrink-0" style={{ height: 130 }}>
                  <img
                    src={e.imagen}
                    alt={e.nombre}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "top center" }}
                    onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-1" style={{ background: e.bgColor }}>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: e.color }}>{e.subtipo}</p>
                  <h3 className="font-playfair text-base font-bold text-grafito mb-2">{e.nombre}</h3>
                  <p className="text-xs text-grafito/60 leading-relaxed mb-2">
                    <span className="font-semibold" style={{ color: e.color }}>Aprende: </span>{e.aprende}
                  </p>
                  <p className="text-xs text-grafito/55 leading-relaxed">
                    <span className="font-semibold" style={{ color: e.color }}>Incluye: </span>{e.incluye}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Card formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 sm:p-8 relative z-10"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}
          >
            {estado === "ok" ? (
              <div className="flex flex-col items-center gap-4 text-center py-6">
                <CheckCircle2 size={48} style={{ color: "#c0005a" }} />
                <p className="font-playfair text-2xl font-bold text-grafito">
                  ¡Listo! 🎨 Tu lugar quedó pre-reservado.
                </p>
                <p className="text-sm text-grafito/60 max-w-sm">
                  Para asegurar tu lugar, completa tu pago de {PRECIO_MXN} por experiencia — los cupos son limitados.
                </p>
                <div className="flex flex-col gap-2.5 w-full max-w-xs">
                  {experiencias.map((id) => {
                    const exp = EXPERIENCIAS.find((e) => e.id === id);
                    const link = STRIPE_LINKS[id];
                    if (!exp || !link) return null;
                    return (
                      <a
                        key={id}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                        style={{ background: GRADIENT, boxShadow: "0 8px 24px rgba(192,0,90,0.3)" }}
                      >
                        Reservar lugar — {exp.nombre} →
                      </a>
                    );
                  })}
                </div>
                <p className="text-[11px] text-grafito/40 max-w-sm">
                  Nuestro equipo te contactará por WhatsApp para confirmar los detalles de tu sesión.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="font-playfair text-xl font-bold text-center mb-1" style={{ color: "#1a0a2e" }}>
                  Reserva tu lugar
                </h2>
                <p className="text-xs text-grafito/50 text-center -mt-1 mb-2">
                  Cupo íntimo y limitado — solo {CUPO_POR_SESION} lugares por sesión.
                </p>

                {/* Ciudad */}
                <div>
                  <p className="text-xs font-semibold text-grafito/50 uppercase tracking-widest mb-2">Elige tu ciudad</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {CIUDADES.map((c) => {
                      const activa = ciudad === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => { if (!c.cupoLleno) { setCiudad(c.id); setExperiencias([]); } }}
                          disabled={c.cupoLleno}
                          className="rounded-xl p-3 text-left transition-colors"
                          style={c.cupoLleno
                            ? { background: "rgba(58,63,75,0.04)", border: "1px solid rgba(58,63,75,0.1)", cursor: "not-allowed", opacity: 0.7 }
                            : activa
                              ? { background: "rgba(192,0,90,0.06)", border: "1px solid rgba(192,0,90,0.3)" }
                              : { background: "transparent", border: "1px solid rgba(58,63,75,0.12)" }}
                        >
                          <span className="flex items-center justify-between gap-1.5">
                            <span className="flex items-center gap-1.5 text-sm font-bold" style={{ color: c.cupoLleno ? "rgba(58,63,75,0.4)" : "#1a1f24" }}>
                              <MapPin size={13} style={{ color: c.cupoLleno ? "rgba(58,63,75,0.3)" : "#c0005a" }} />
                              {c.ciudad}
                            </span>
                            {c.cupoLleno && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: "#c0005a", background: "rgba(192,0,90,0.08)", border: "1px solid rgba(192,0,90,0.2)" }}>
                                Cupo lleno
                              </span>
                            )}
                          </span>
                          <span className="block text-[11px] mt-0.5" style={{ color: c.cupoLleno ? "rgba(58,63,75,0.3)" : "rgba(58,63,75,0.45)" }}>{c.venue}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Experiencias de la ciudad elegida */}
                <div className="rounded-xl border border-gray-200 p-4">
                  <p className="text-xs font-semibold text-grafito/50 uppercase tracking-widest mb-1">
                    Experiencias en {ciudadActual.ciudad}
                  </p>
                  <p className="text-[11px] text-grafito/40 mb-3">
                    Selecciona una o varias — cada una es independiente.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {EXPERIENCIAS.map((e) => {
                      const sesion = ciudadActual.sesiones[e.id as keyof typeof ciudadActual.sesiones];
                      const checked = experiencias.includes(e.id);
                      const bloqueada = ciudadActual.cupoLleno;
                      return (
                        <label
                          key={e.id}
                          className="flex items-start gap-3 rounded-lg p-2.5 transition-colors"
                          style={{ background: bloqueada ? "rgba(58,63,75,0.03)" : checked ? e.bgColor : "transparent", border: `1px solid ${bloqueada ? "rgba(58,63,75,0.08)" : checked ? e.borderColor : "transparent"}`, cursor: bloqueada ? "not-allowed" : "pointer", opacity: bloqueada ? 0.5 : 1 }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => { if (!bloqueada) toggle(e.id); }}
                            disabled={bloqueada}
                            className="mt-0.5 accent-pink-500 flex-shrink-0"
                          />
                          <div className="flex-1">
                            <span className="text-sm text-grafito/85 leading-snug font-semibold">{e.nombre}</span>
                            <span className="block text-[11px] text-grafito/45">{e.subtipo}</span>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1.5">
                              <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: e.color }}>
                                <Calendar size={11} />
                                {sesion.fecha}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-grafito/50">
                                <Clock size={11} />
                                {sesion.hora}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: e.color, background: e.bgColor, border: `1px solid ${e.borderColor}` }}>
                                Solo {CUPO_POR_SESION} lugares
                              </span>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Nombre */}
                <input required name="nombre" placeholder="Nombre completo *" value={form.nombre} onChange={handleChange} className={inputClass} />

                {/* Negocio */}
                <input name="negocio" placeholder="Nombre de tu negocio" value={form.negocio} onChange={handleChange} className={inputClass} />

                {/* Correo */}
                <input required name="correo" type="email" placeholder="Correo electrónico *" value={form.correo} onChange={handleChange} className={inputClass} />

                {/* Teléfono */}
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2.5 w-24 flex-shrink-0">
                    <span className="text-sm text-grafito/50">+</span>
                    <input name="lada" placeholder="52" value={form.lada} onChange={handleChange} className="w-full text-sm text-grafito focus:outline-none bg-transparent" />
                  </div>
                  <input required name="telefono" placeholder="WhatsApp *" value={form.telefono} onChange={handleChange} className={`${inputClass} flex-1`} />
                </div>

                <button
                  type="submit"
                  disabled={estado === "loading" || experiencias.length === 0}
                  className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ background: GRADIENT, boxShadow: "0 8px 24px rgba(192,0,90,0.3)" }}
                >
                  {estado === "loading" ? "Reservando…" : "Reservar mi lugar →"}
                </button>
                <p className="text-[11px] text-grafito/40 text-center -mt-1">
                  {PRECIO_MXN} por experiencia · Tu lugar se confirma por WhatsApp · Cupo limitado e íntimo
                </p>

                {estado === "error" && (
                  <p className="text-xs text-red-500 text-center">Hubo un error. Intenta de nuevo.</p>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
