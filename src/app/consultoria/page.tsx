"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CALENDAR = "https://links.victoranza.com/widget/booking/gn3nH4IgtAreQ9jPQ7C2";

// ─── Planeta principal ───────────────────────────────────────────────
const PLANET_STATES = [
  { x: 0,    y: 60,   scale: 1,    size: 280 },  // posibilidades
  { x: 190,  y: 0,    scale: 1.35, size: 280 },  // oportunidades
  { x: 160,  y: 40,   scale: 0.85, size: 280 },  // encuentra la tuya
];


// ─── Tierra con imagen real ───────────────────────────────────────────
function EarthGlobe({ size }: { size: number }) {
  return (
    <img
      src="/planet/tierra.png"
      alt="Tierra"
      style={{ width: size, height: size, objectFit: "contain", opacity: 1, flexShrink: 0 }}
    />
  );
}

// ─── Contenido de texto por escena ───────────────────────────────────
const SCENES = [
  { pre: "Un universo de",   bold: "posibilidades",         boldSmall: null,                           boldThird: null,               sub: null, layout: "center", preCursive: true,  boldCursive: false },
  { pre: null,               bold: "Infinitas",             boldSmall: "oportunidades",                boldThird: "caminos y versiones de ti",  sub: null, layout: "left",   preCursive: false, boldCursive: true  },
  { pre: "Encuentra la tuya con nuestras", bold: "consultorías", boldSmall: null,                    boldThird: null,               sub: null, layout: "left-shifted",   preCursive: true,  boldCursive: false, boldAtSmallSize: true },
];

// ─── Componente de texto por escena ──────────────────────────────────
function SceneText({ scene, index }: { scene: typeof SCENES[0]; index: number }) {
  const posClass: Record<string, string> = {
    "center":        "inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none",
    "left":          "inset-0 flex flex-col justify-center text-left px-8 sm:px-16 max-w-lg pointer-events-none",
    "left-shifted":  "inset-0 flex flex-col justify-center text-left px-16 sm:px-32 max-w-xl pointer-events-none",
    "bottom-left":   "bottom-12 left-8 sm:left-14 text-left max-w-xs sm:max-w-sm pointer-events-none",
    "center-bottom": "bottom-12 left-0 right-0 text-center px-6 pointer-events-none",
    "left-cta":      "inset-0 flex flex-col justify-center text-left px-8 sm:px-16 max-w-md pointer-events-auto",
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute select-none ${posClass[scene.layout]}`}
        style={{ zIndex: 20 }}
      >
        {/* Pre-título */}
        {scene.pre && (scene.preCursive ? (
          <p
            className="font-dancing text-white mb-1"
            style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.8rem)", lineHeight: 1.2 }}
          >
            {scene.pre}
          </p>
        ) : (
          <p className="text-white/50 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2">
            {scene.pre}
          </p>
        ))}

        {/* Título principal */}
        {(scene as any).boldAtSmallSize ? (
          <h2
            className="font-playfair font-bold leading-tight mb-3 text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            {scene.bold}
          </h2>
        ) : scene.boldSmall ? (
          <>
            {/* "Infinitas" — cursiva, mismo tamaño que "Un universo de" */}
            <h2
              className="font-dancing text-white leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {scene.bold}
            </h2>
            <h2
              className="font-playfair font-bold leading-tight text-white"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              {scene.boldSmall}
            </h2>
            {(scene as any).boldThird && (
              <h2
                className="font-playfair font-bold leading-tight mb-3 text-white"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                {(scene as any).boldThird}
              </h2>
            )}
          </>
        ) : (
          <h2
            className="font-playfair font-bold leading-tight mb-3 text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
          >
            {scene.bold}
          </h2>
        )}
        {scene.layout === "left-cta" && (
          <Link
            href={CALENDAR}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, #c0005a, #FF6A92, #E894FF)", boxShadow: "0 8px 28px rgba(192,0,90,0.45)" }}
          >
            Agendar mi consultoría <ArrowRight size={15} />
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
}


// ─── Hero cinematográfico ─────────────────────────────────────────────
function CinematicHero() {
  const [scene, setScene] = useState(0);
  const TOTAL = SCENES.length;

  useEffect(() => {
    const id = setInterval(() => setScene((s) => (s + 1) % TOTAL), 3800);
    return () => clearInterval(id);
  }, [TOTAL]);

  const ps = PLANET_STATES[scene];
  const showOrbit = true;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#5c0030" }}
    >
      {/* Video de estrellas de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.14, zIndex: 1 }}
      >
        <source src="/consultoria/stars.mp4" type="video/mp4" />
      </video>

      {/* Nebulosas de fondo — halos suaves en colores marca */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { w: 500, h: 500, top: "-10%", left: "-5%",  bg: "rgba(192,0,90,0.22)",   blur: 120 },
          { w: 400, h: 400, top: "50%",  left: "65%",  bg: "rgba(255,106,146,0.18)",blur: 100 },
          { w: 300, h: 300, top: "20%",  left: "75%",  bg: "rgba(212,0,90,0.14)",   blur: 90  },
          { w: 250, h: 250, top: "70%",  left: "10%",  bg: "rgba(192,0,90,0.16)",   blur: 80  },
        ].map((b, i) => (
          <div key={i} style={{ position: "absolute", width: b.w, height: b.h, top: b.top, left: b.left, background: b.bg, borderRadius: "50%", filter: `blur(${b.blur}px)` }} />
        ))}

        {/* Estrellas — puntos blancos/rosas pequeños */}
        {[
          { top: "8%",  left: "12%", s: 2.5, o: 0.6 }, { top: "14%", left: "68%", s: 2,   o: 0.5 },
          { top: "22%", left: "88%", s: 1.5, o: 0.7 }, { top: "35%", left: "5%",  s: 2,   o: 0.4 },
          { top: "48%", left: "92%", s: 2.5, o: 0.6 }, { top: "58%", left: "22%", s: 1.5, o: 0.5 },
          { top: "72%", left: "78%", s: 2,   o: 0.6 }, { top: "82%", left: "42%", s: 1.5, o: 0.4 },
          { top: "90%", left: "15%", s: 2.5, o: 0.5 }, { top: "5%",  left: "45%", s: 2,   o: 0.6 },
          { top: "65%", left: "55%", s: 1.5, o: 0.45 },{ top: "30%", left: "35%", s: 2,   o: 0.35 },
        ].map((d, i) => (
          <div key={i} style={{ position: "absolute", top: d.top, left: d.left, width: d.s, height: d.s, borderRadius: "50%", background: i % 3 === 0 ? "#FF6A92" : "white", opacity: d.o }} />
        ))}
      </div>

      {/* Anillos de órbita — elipse inclinada que coincide con el movimiento de los planetas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
        {[{ r: 210, alpha: 0.22 }, { r: 320, alpha: 0.15 }].map(({ r, alpha }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: showOrbit ? 1 : 0 }}
            transition={{ duration: 1.2, delay: i * 0.15 }}
            style={{
              position: "absolute",
              width: r * 2,
              height: r * 2 * 0.4,   // mismo factor 0.4 que el OrbitPlanet
              borderRadius: "50%",
              border: `1px solid rgba(255,106,146,${alpha})`,
            }}
          />
        ))}
      </div>

      {/* Sistema solar — absolute inset-0, mismo stacking context */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>

        {/* Tierra */}
        <motion.div
          animate={{ x: ps.x, y: ps.y, scale: ps.scale }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: "50%", top: "50%",
            marginLeft: -ps.size / 2,
            marginTop: -ps.size / 2,
            width: ps.size, height: ps.size,
            zIndex: 5,
          }}
        >
          <EarthGlobe size={ps.size} />
        </motion.div>

      </div>

      {/* Texto de la escena */}
      <SceneText scene={SCENES[scene]} index={scene} />

      {/* Dots de navegación */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {SCENES.map((_, i) => (
          <button
            key={i}
            onClick={() => setScene(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === scene ? 24 : 7,
              height: 7,
              background: i === scene ? "#FF6A92" : "rgba(255,106,146,0.25)",
            }}
          />
        ))}
      </div>

    </div>
  );
}

// ─── Datos de consultorías ────────────────────────────────────────────
const GRUPOS = [
  {
    label: "Auditorías",
    gradient: "linear-gradient(135deg, #3ab8ba, #67c6c8, #9de8ea)",
    color: "#0d6b6d",
    bg: "rgba(13,107,109,0.07)",
    border: "rgba(13,107,109,0.3)",
    items: [
      {
        titulo: "Activos digitales",
        desc: "¿Sabes si lo que tienes en digital realmente está funcionando para tu negocio?\n\nRevisamos todo lo que tienes visible en internet — redes sociales, sitio web, landing pages, ficha de Google, aplicaciones — y te decimos qué está bien, qué hay que mejorar y cómo hacerlo.\n\nSegún el nivel elegido, vamos desde un diagnóstico básico hasta una optimización completa de todo tu ecosistema digital.",
      },
      {
        titulo: "Optimización de oferta",
        desc: "Tu producto o servicio puede ser bueno, pero si no está bien comunicado, estructurado o posicionado, no vende como debería.\n\nAnalizamos lo que vendes, cómo lo vendes y a quién, y te damos un plan claro para mejorarlo.\n\nEn los niveles más completos construimos tu escalera de valor, modelos de monetización y los sistemas para atraer y cerrar más clientes.",
      },
      {
        titulo: "Marca",
        desc: "¿Tu marca comunica lo que realmente eres?\n\nRevisamos tu identidad, el tono con el que hablas, cómo te posicionas frente a tu competencia y si todo eso está alineado en cada punto de contacto con tu cliente.\n\nEl resultado es un diagnóstico honesto y un plan de acción para que tu marca transmita exactamente lo que quieres transmitir.",
      },
      {
        titulo: "Mercado",
        desc: "Antes de tomar decisiones de negocio grandes, necesitas saber qué está pasando afuera.\n\nAnalizamos las tendencias de tu industria, quiénes son tus clientes ideales y qué está haciendo tu competencia.\n\nEn niveles más avanzados, diseñamos contigo una estrategia de diferenciación para que sepas exactamente por qué elegirte a ti y no a otro.",
      },
    ],
  },
  {
    label: "Estratégicas",
    gradient: "linear-gradient(135deg, #c0005a, #FF6A92, #E894FF)",
    color: "#c0005a",
    bg: "rgba(192,0,90,0.07)",
    border: "rgba(192,0,90,0.3)",
    items: [
      {
        titulo: "Estrategia de Comunicación y Posicionamiento",
        desc: "Tu negocio tiene valor. El problema es que si no sabes comunicarlo, el mercado no lo va a percibir.\n\nDefinimos el mensaje estratégico de tu marca — el que conecta con tu cliente ideal, justifica tu precio y convierte atención en acción.\n\nSin rodeos, sin genéricos. Comunicación que posiciona y que vende.",
      },
      {
        titulo: "Estrategia de Marca y Dirección Creativa",
        desc: "Esta consultoría define hacia dónde va tu marca visualmente — qué quieres transmitir, cómo debe verse, cómo debe sentirse — para que cada cosa que crees a partir de hoy esté integrada a esa dirección.\n\nLo hacemos a través de un proceso estratégico que traduce la esencia de tu negocio en criterios visuales claros.\n\nPara que dejes de improvisar y empieces a construir una marca que se reconoce, que conecta y que se recuerda.",
      },
      {
        titulo: "Procesos comerciales y Customer Journey",
        desc: "¿Sabes exactamente qué vive tu cliente desde que te descubre hasta que te compra — y qué pasa después?\n\nLa mayoría de los negocios pierden clientes en algún punto del camino sin saber dónde ni por qué. Mapeamos todo ese recorrido, identificamos en qué momento se van los leads y qué está causando esa fuga — para corregirlo.\n\nPorque antes de automatizar cualquier proceso con tecnología, necesitas tenerlo claro y estandarizado.\n\nEn el nivel más avanzado aplicamos la metodología Lean para medir la eficiencia de tu proceso comercial y mejorarlo de forma continua — no solo el proceso, sino también los equipos y los activos que lo sostienen.",
      },
      {
        titulo: "Estrategia Digital",
        desc: "Revisamos las acciones de promoción que tienes activas y optimizamos tu estrategia de campañas publicitarias en Meta y Google Ads.\n\nA partir de ahí, diseñamos el sistema que atrae, convierte y acelera tus ventas — siempre con un enfoque total en el retorno de inversión.",
      },
      {
        titulo: "Estrategia RRSS",
        desc: "Definimos qué publicar, cuándo, cómo y por qué — para que tus redes sociales dejen de ser una tarea o una vitrina bonita y se conviertan en una herramienta real de posicionamiento y venta. Disponible desde una sola plataforma hasta la estrategia completa de todo tu ecosistema.",
      },
      {
        titulo: "Estrategias de Relaciones Públicas",
        desc: "La forma en que otros hablan de ti importa tanto como lo que tú dices. Diseñamos una estrategia para posicionarte en los espacios clave de tu industria — medios locales y nacionales, revistas especializadas, eventos, entrevistas, mesas redondas, e incluso la organización de tus propios espacios de visibilidad.",
      },
    ],
  },
  {
    label: "Business Intelligence",
    gradient: "linear-gradient(135deg, #1a0a2e, #6a00c8, #E894FF)",
    color: "#6a00c8",
    bg: "rgba(106,0,200,0.07)",
    border: "rgba(106,0,200,0.3)",
    items: [
      {
        titulo: "Construcción y Lanzamiento de Oferta",
        desc: "Tienes conocimiento, experiencia y valor que ofrecer — pero si para venderlo depende de tu tiempo, tu negocio tiene un techo.\n\nTe ayudamos a empaquetar lo que haces de una forma que puedas escalar: con el modelo de monetización correcto, la oferta bien estructurada y el plan de lanzamiento que lo lleva al mercado.\n\nSomos arquitectos de negocios rentables y escalables — porque el objetivo no es solo que tu negocio funcione, sino que te dé libertad para vivir de tu propósito.",
      },
      {
        titulo: "Sistema Comercial: Estrategias, Equipos y Activos",
        desc: "Si quieres aumentar tus ventas, el primer paso es tener un sistema comercial que funcione sin fricción.\n\nEste es un acompañamiento estratégico para alinear y potenciar tus procesos, equipo y herramientas — trabajando en la mejora continua de cómo atraes clientes, cómo los atiendes y cómo los conviertes.\n\nDisponible desde una consulta puntual hasta un esquema de outsourcing continuo con capacitación de tu equipo interno.",
      },
      {
        titulo: "Internacionalización de mercado",
        desc: "Tu negocio tiene potencial más allá de las fronteras — y llevar una marca o empresa al mercado internacional requiere más que avisarlo en tus redes sociales, viajar o activar nuevas campañas digitales.\n\nDiseñamos la estrategia completa para que entres a nuevos mercados de forma sólida y estructurada: estrategia de penetración, precios adaptados al mercado destino, logística de cobro internacional y construcción de equipos globales.\n\nPara que escales sin improvisar y sin dejar cabos sueltos.",
      },
      {
        titulo: "Herramientas de IA a la medida de mi negocio",
        desc: "La inteligencia artificial no es solo para grandes empresas — es para cualquier negocio que quiera hacer más con menos tiempo y esfuerzo.\n\nSi sabes que hay alguna parte de tu proceso que podría ser más rápida, más eficiente o más inteligente, aquí es donde empezamos.\n\nDesde automatizar cotizaciones o tareas operativas del día a día, hasta construir sistemas de IA que forman parte de lo que le entregas a tus clientes.\n\nLo diseñamos completamente a la medida de tu negocio — sin tecnicismos, con resultados claros.",
      },
    ],
  },
];

// ─── Lista de todas las consultorías para checkboxes ─────────────────
const TODAS_CONSULTORIAS = [
  "Auditoría de activos digitales",
  "Auditoría de optimización de oferta",
  "Auditoría de marca",
  "Análisis de mercado",
  "Estrategia de Comunicación y Posicionamiento",
  "Estrategia de Marca y Dirección Creativa",
  "Procesos comerciales y Customer Journey",
  "Estrategia Digital",
  "Estrategia RRSS",
  "Estrategias de Relaciones Públicas",
  "Construcción y Lanzamiento de Oferta",
  "Sistema Comercial: Estrategias, Equipos y Activos",
  "Internacionalización de mercado",
  "Herramientas de IA a la medida de mi negocio",
];

// ─── Formulario contacto consultorías ────────────────────────────────
function FormularioConsultoria() {
  const [form, setForm] = useState({ nombre: "", lada: "52", telefono: "", correo: "", empresa: "", comentarios: "" });
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const toggle = (c: string) =>
    setSeleccionadas((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("loading");
    try {
      const res = await fetch("/api/contacto-consultoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consultorias: seleccionadas }),
      });
      setEstado(res.ok ? "ok" : "error");
    } catch {
      setEstado("error");
    }
  };

  const inputClass = "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-grafito placeholder:text-gray-400 focus:outline-none focus:border-pink-300 transition-colors";

  return (
    <div className="mt-14 rounded-3xl overflow-hidden" style={{ background: "#3A3F4B" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

        {/* Columna izquierda — texto */}
        <div className="px-10 py-12 flex flex-col justify-center">
          <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-white leading-snug mb-4">
            ¿No sabes cuál es la indicada para ti o te gustaría recibir distintos programas de consultoría?
          </h3>
          <p className="font-dancing" style={{ color: "#FF6A92", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>
            Diseña tu programa a tu medida.
          </p>
        </div>

        {/* Columna derecha — formulario */}
        <div className="px-10 py-12" style={{ background: "#3A3F4B" }}>
          <div className="bg-white rounded-2xl p-8">
          {estado === "ok" ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <p className="font-playfair text-2xl font-bold text-grafito">¡Recibido!</p>
              <p className="text-sm text-grafito/60">Nos pondremos en contacto contigo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input required name="nombre" placeholder="Nombre *" value={form.nombre} onChange={handleChange} className={inputClass} />

              <div className="flex gap-2">
                <input name="lada" placeholder="Lada *" value={form.lada} onChange={handleChange} required className={`${inputClass} w-24`} />
                <input required name="telefono" placeholder="Teléfono *" value={form.telefono} onChange={handleChange} className={`${inputClass} flex-1`} />
              </div>

              <input required name="correo" type="email" placeholder="Correo *" value={form.correo} onChange={handleChange} className={inputClass} />
              <input name="empresa" placeholder="Empresa (opcional)" value={form.empresa} onChange={handleChange} className={inputClass} />

              {/* Checkboxes */}
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-xs font-semibold text-grafito/50 uppercase tracking-widest mb-3">Consultorías de interés</p>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                  {TODAS_CONSULTORIAS.map((c) => (
                    <label key={c} className="flex items-start gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={seleccionadas.includes(c)}
                        onChange={() => toggle(c)}
                        className="mt-0.5 accent-pink-500 flex-shrink-0"
                      />
                      <span className="text-sm text-grafito/70 group-hover:text-grafito transition-colors leading-snug">{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <textarea name="comentarios" placeholder="Comentarios adicionales (opcional)" value={form.comentarios} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} />

              <button
                type="submit"
                disabled={estado === "loading"}
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #1a0a2e, #c0005a, #E894FF)" }}
              >
                {estado === "loading" ? "Enviando..." : <>Solicitar consultoría <ArrowRight size={14} /></>}
              </button>

              {estado === "error" && (
                <p className="text-xs text-red-500 text-center">Hubo un error al enviar. Intenta de nuevo.</p>
              )}
            </form>
          )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Columna con acordeón ─────────────────────────────────────────────
function GrupoColumna({ g }: { g: typeof GRUPOS[0] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="rounded-3xl p-[3px]" style={{ background: g.gradient }}>
      <div className="rounded-[22px] bg-white px-6 py-7 flex flex-col gap-4">
        <div
          className="inline-flex items-center self-start text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border"
          style={{ color: g.color, borderColor: g.border, background: g.bg }}
        >
          {g.label}
        </div>
        <div className="flex flex-col gap-2">
          {g.items.map((item, i) => (
            <div key={item.titulo} className="rounded-2xl overflow-hidden" style={{ background: g.bg }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left gap-3"
              >
                <span className="font-playfair text-sm font-bold text-grafito leading-snug">{item.titulo}</span>
                <span
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)", color: g.color }}
                >
                  ▾
                </span>
              </button>
              {open === i && (
                <div className="px-4 pb-4 flex flex-col gap-3">
                  {item.desc.split("\n\n").map((p, pi) => (
                    <p key={pi} className="text-sm text-grafito/70 leading-relaxed">{p}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <Link
          href={CALENDAR}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity w-full mt-1"
          style={{ background: g.gradient }}
        >
          Agendar <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

// ─── Página completa ──────────────────────────────────────────────────
export default function ConsultoriaPage() {
  return (
    <>
      <Navbar />
      <main>
        <CinematicHero />

        {/* Sección de consultorías */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* Header */}
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#c0005a" }}>
                Nuestras consultorías
              </p>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold mb-4" style={{
                background: "linear-gradient(135deg, #1a0a2e 0%, #c0005a 50%, #E894FF 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Tu camino, tu ritmo
              </h2>
              <p className="text-grafito/60 text-lg leading-relaxed whitespace-nowrap mx-auto">
                Sesiones estratégicas diseñadas para el momento exacto de tu negocio.
              </p>
            </div>

            {/* 3 columnas verticales */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {GRUPOS.map((g) => (
                <GrupoColumna key={g.label} g={g} />
              ))}
            </div>

            {/* CTA final — 2 columnas */}
            <FormularioConsultoria />

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
