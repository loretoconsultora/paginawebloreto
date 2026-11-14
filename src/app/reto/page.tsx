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
const HREF_GENERAL = "https://links.victoranza.com/payment-link/6a2a54c703b17c94f5715b8f";
const HREF_VIP     = "https://links.victoranza.com/payment-link/6a2a573c71a0aa761e4642d0";

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

function CDUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-playfair font-black text-3xl leading-none" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] font-semibold tracking-widest uppercase mt-1" style={{ color: "#3A3F4B", opacity: 0.5 }}>{label}</span>
    </div>
  );
}

// ─── Sección 1: Hero ──────────────────────────────────────────────────────────
function Hero() {
  const { days, hours, minutes, seconds } = useCountdown();
  return (
    <section className="min-h-screen flex items-center pt-28 pb-20 px-5 lg:px-8 relative overflow-hidden bg-white">
      {/* blobs decorativos */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(232,148,255,0.12) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(192,0,90,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Columna izquierda */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-lg lg:text-xl font-playfair mb-2" style={{ color: "#3A3F4B" }}>
              Dentro de ti hay un valor que el mundo necesita
            </p>
            <h1 className="font-playfair font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
              <span className="block" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Este reto se trata de:
              </span>
              <span className="block" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                reconocerlo, conectarlo
              </span>
              <span className="block" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                y compartirlo
              </span>
              <span className="block font-dancing font-normal text-2xl lg:text-3xl mt-2" style={{ color: "#c0005a" }}>
                hasta que se expanda en el negocio que mereces.
              </span>
            </h1>

            <p className="text-base lg:text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.85 }}>
              En <strong>6 sesiones</strong> en vivo construyes tu <strong>identidad</strong>, tu <strong>oferta digital</strong> y sales con tu primer <strong>lanzamiento</strong> listo para escalar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link href={HREF_GENERAL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-full text-white text-sm hover:opacity-90 transition-all"
                style={{ background: G_MAIN, boxShadow: "0 8px 28px rgba(192,0,90,0.3)" }}>
                Quiero mi lugar en el reto →
              </Link>
              <a href="#programa" className="inline-flex items-center justify-center font-semibold px-8 py-4 rounded-full text-sm border hover:opacity-80 transition-all"
                style={{ color: MAGENTA, borderColor: "rgba(192,0,90,0.3)" }}>
                Ver cómo funciona ↓
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start">
              {[
                { n: "+500", l: "marcas construidas" },
                { n: "+500", l: "alumnos formados" },
                { n: "LATAM", l: "USA & España" },
              ].map((s, i) => (
                <div key={i} className="flex items-center">
                  <div className="text-center px-5 py-3">
                    <div className="font-bold text-2xl font-playfair" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.n}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#3A3F4B", opacity: 0.65 }}>{s.l}</div>
                  </div>
                  {i < 2 && <div className="w-px h-10" style={{ background: "rgba(192,0,90,0.2)" }} />}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Columna derecha — título + card countdown */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="order-1 lg:order-2 flex flex-col items-center gap-6">
            <div className="text-center">
              <p className="font-dancing text-3xl mb-1" style={{ color: MAGENTA }}>Reto</p>
              <div className="font-playfair font-black uppercase leading-none" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                <span className="block" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>Boost Your</span>
                <span className="block" style={{ fontSize: "clamp(3.5rem,9vw,5.5rem)" }}>Brand</span>
              </div>
              <div className="mt-3 h-0.5 w-24 mx-auto rounded-full" style={{ background: G_MAIN }} />
            </div>

            {/* Countdown card */}
            <div className="w-full max-w-sm rounded-3xl p-8 text-center"
              style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(192,0,90,0.15)", boxShadow: "0 24px 80px rgba(192,0,90,0.12)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: MAGENTA }}>
                ⚡ Próxima generación — solo 20 lugares
              </p>
              <p className="text-sm mb-6" style={{ color: "#3A3F4B", opacity: 0.65 }}>
                Nueva generación: cada primer lunes del mes
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#3A3F4B", opacity: 0.45 }}>Cierre de inscripciones en</p>
              <div className="flex items-center justify-center gap-4">
                <CDUnit value={days} label="días" />
                <span className="font-bold text-xl mb-3" style={{ color: "rgba(192,0,90,0.3)" }}>:</span>
                <CDUnit value={hours} label="horas" />
                <span className="font-bold text-xl mb-3" style={{ color: "rgba(192,0,90,0.3)" }}>:</span>
                <CDUnit value={minutes} label="min" />
                <span className="font-bold text-xl mb-3" style={{ color: "rgba(192,0,90,0.3)" }}>:</span>
                <CDUnit value={seconds} label="seg" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Sección 2: Problemas ─────────────────────────────────────────────────────
const PROBLEMS = [
  "\"Sé que tengo algo valioso que compartir, pero no sé cómo convertirlo en un negocio real\"",
  "\"He acumulado años de experiencia y aprendizajes, pero sigo sin saber cómo comunicar lo que valgo\"",
  "\"Publico y creo contenido constantemente, pero mi comunidad no crece y tampoco genera ingresos consistentes\"",
  "\"Quiero construir algo con propósito, no solo vender — algo que trascienda y deje huella\"",
  "\"Tengo experiencia, conocimiento y ganas, pero parece que algo me falta para ser un negocio que crece y deja huella\"",
  "\"Ya intenté diferentes estrategias digitales y ninguna logró lo que realmente quiero construir\"",
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
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex items-start gap-4 text-left">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: G_MAIN }}>
                <span className="text-white font-bold text-sm">✕</span>
              </div>
              <p className="text-base italic leading-relaxed" style={{ color: "#3A3F4B", opacity: 0.85 }}>{p}</p>
            </motion.div>
          ))}
        </div>

        <p className="font-dancing text-2xl lg:text-3xl mb-6" style={{ color: MAGENTA }}>
          No es falta de talento. No es falta de experiencia. No es falta de valor.
        </p>
        <p className="text-2xl lg:text-3xl font-bold font-playfair" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Es falta de dirección, estructura y un plan real.
        </p>
      </div>
    </section>
  );
}

// ─── Sección 3: Transformación ───────────────────────────────────────────────
function Transformation() {
  return (
    <section className="py-16 lg:py-24 px-5 lg:px-8 relative overflow-hidden" style={{ background: G_PINK }}>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="font-dancing text-3xl lg:text-4xl mb-4 text-white">Tu Marca Personal</p>
          <p className="font-playfair text-xl lg:text-2xl text-white/95 leading-relaxed max-w-3xl mx-auto">
            no solo comunica lo que haces — define cuánto vales, cómo te perciben y cuánto están dispuestos a pagarte. Y cuando eso está alineado con tu propósito, transforma no solo tu negocio, sino tu vida.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-5">
            <p className="text-white/90 text-base lg:text-lg">con nuestro reto <span className="font-bold uppercase" style={{ background: G_GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Boost Your Brand</span>...</p>
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

          <div className="text-center">
            <div className="space-y-1 text-white font-playfair font-black mb-8">
              {[
                { text: "reconoce",  size: "clamp(1.4rem,2.5vw,2rem)" },
                { text: "conecta",   size: "clamp(1.8rem,3.5vw,2.75rem)" },
                { text: "comparte",  size: "clamp(2.2rem,4.5vw,3.5rem)" },
                { text: "expande",   size: "clamp(2.6rem,5.5vw,4.25rem)" },
              ].map((l) => (
                <p key={l.text} style={{ fontSize: l.size }}>{l.text}</p>
              ))}
              <p className="text-white/70 font-normal text-sm tracking-widest uppercase mt-2">tu valor único</p>
            </div>
            <p className="font-dancing text-2xl lg:text-3xl italic text-white/85">
              un viaje para elevar tu ser a su versión<br />más auténtica y en expansión
            </p>
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
  "Oferta irresistible lista para vender digitalmente",
  "Estrategia de contenidos de redes sociales",
  "Plan de atracción, atención y cierre de clientes",
  "Plan de lanzamiento digital activo",
  "Al menos 1 servicio digital listo para monetizar",
  "Estrategia de evaluación y mejora continua",
];

const IDENTIDADES = [
  "Alguien que sabe exactamente qué vale, cómo comunicarlo y cómo cobrarlo",
  "El referente que el mercado empieza a buscar, no el que persigue clientes cada mes",
  "Una persona que construye su negocio con intención y propósito, no con urgencia ni improvisación",
  "Alguien con una marca que tiene causa, comunidad propia y capacidad real de escalar",
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
            Al terminar este reto no solo tienes activos
          </motion.h2>
          <p className="font-dancing text-2xl lg:text-3xl" style={{ color: MAGENTA }}>
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
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto rounded-3xl p-8 text-center" style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(16px)", border: "1px solid rgba(192,0,90,0.1)" }}>
          <p className="font-dancing text-2xl lg:text-3xl mb-2" style={{ color: MAGENTA }}>
            "No es un curso donde acumulas conocimiento.
          </p>
          <p className="font-playfair font-bold text-lg lg:text-xl" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Es un reto donde construyes, lanzas y te transformas."
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Sección 5: Precios ───────────────────────────────────────────────────────
const TABLE_ROWS = [
  { label: "6 sesiones grupales en vivo",     boost: true,  bloom: true  },
  { label: "Acceso a Victoranza App",          boost: true,  bloom: true  },
  { label: "Grabaciones de todas las sesiones",boost: true,  bloom: true  },
  { label: "Herramientas de IA y plantillas",  boost: true,  bloom: true  },
  { label: "Manual de trabajo descargable",    boost: true,  bloom: true  },
  { label: "Clases pregrabadas exclusivas",    boost: true,  bloom: true  },
  { label: "Plan de lanzamiento digital",      boost: true,  bloom: true  },
  { label: "⭐ Acceso por todo un año",        boost: true,  bloom: true  },
  { label: "30 min VIP antes de cada sesión",  boost: false, bloom: true  },
  { label: "2 sesiones 1:1 post-reto",         boost: false, bloom: true  },
  { label: "5 piezas publicitarias producidas",boost: false, bloom: true  },
  { label: "30 días Victoranza + onboarding CRM", boost: false, bloom: true },
];

const BOOST_INCLUDES = [
  "6 sesiones grupales en vivo",
  "Acceso a comunidad en Victoranza",
  "Grabaciones de todas las sesiones",
  "Herramientas de IA y plantillas accionables",
  "Manual de trabajo descargable",
  "Clases pregrabadas exclusivas",
  "Plan de lanzamiento digital",
  "Seguimiento estratégico",
];

const BLOOM_EXTRAS = [
  "30 min VIP antes de cada sesión (grupo selecto de máx. 8 personas)",
  "2 sesiones 1:1 post-reto con mentores (30 días después)",
  "5 piezas publicitarias: 2 gráficos + 3 videos editados por nosotros (tú grabas)",
  "30 días de Victoranza App con onboarding de CRM y automatizaciones",
];

function Pricing() {
  const { days, hours, minutes, seconds } = useCountdown();
  return (
    <section id="precio" className="py-16 lg:py-24 px-5 lg:px-8 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%)" }}>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-playfair font-bold mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#3A3F4B" }}>
            ¿Cuánto vale tener tu primer servicio digital
          </motion.h2>
          <h2 className="font-playfair font-bold mb-4" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            lanzado y vendiendo este próximo mes?
          </h2>
          <p className="font-dancing text-2xl lg:text-3xl" style={{ color: MAGENTA }}>
            Invierte en el reto que cambia el rumbo de tu negocio.
          </p>
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
                  <p className="font-bold text-xs opacity-60">YOUR BRAND VIP</p>
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

        {/* Cards de precio */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Boost */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-8" style={{ background: "white", border: "1px solid rgba(192,0,90,0.15)", boxShadow: "0 8px 32px rgba(192,0,90,0.07)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: MAGENTA }}>Programa completo</p>
            <h3 className="text-2xl font-bold font-playfair mb-1" style={{ color: "#3A3F4B" }}>Boost Your Brand</h3>
            <div className="flex items-baseline gap-2 mt-3 mb-1">
              <span className="text-5xl font-bold font-playfair" style={{ background: G_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>$333</span>
              <span className="text-lg opacity-50">USD</span>
            </div>
            <p className="text-xs opacity-50 mb-6">6 sesiones estratégicas · Lanzamiento internacional</p>
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
              <p className="text-xs font-semibold" style={{ color: "#b8860b" }}>Acceso por todo un año — desde el inicio de tu reto</p>
            </div>
            {/* Countdown en card */}
            <div className="rounded-2xl p-4 mb-6 text-center" style={{ background: "rgba(192,0,90,0.04)", border: "1px solid rgba(192,0,90,0.1)" }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#3A3F4B", opacity: 0.45 }}>Cierre de inscripciones en</p>
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
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#b8860b" }}>Acceso VIP</p>
            <h3 className="text-2xl font-bold font-playfair mb-1" style={{ color: "#3A3F4B" }}>Bloom Your Brand</h3>
            <div className="flex items-baseline gap-2 mt-3 mb-1">
              <span className="text-5xl font-bold font-playfair" style={{ background: G_GOLD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>$649</span>
              <span className="text-lg opacity-50">USD</span>
            </div>
            <p className="text-sm italic mb-5 opacity-70">Para quienes quieren ir más lejos — con mayor acompañamiento, producción de anuncios y tecnología incluidos.</p>
            <div className="rounded-2xl p-4 mb-5" style={{ background: "rgba(252,205,13,0.06)", border: "1px solid rgba(252,205,13,0.2)" }}>
              <p className="text-sm font-playfair italic" style={{ color: "#3A3F4B" }}>"El momento en que tu marca deja de depender de ti para crecer — es el momento en que realmente escalas."</p>
            </div>
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
              <p className="text-xs font-semibold" style={{ color: "#b8860b" }}>Acceso por todo un año — desde el inicio de tu reto</p>
            </div>
            <Link href={HREF_VIP} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center font-bold py-4 rounded-full text-sm hover:opacity-90 transition-all"
              style={{ background: G_GOLD, color: "#1a0a2e", boxShadow: "0 8px 24px rgba(252,205,13,0.25)" }}>
              Quiero el acceso VIP — solo 8 lugares →
            </Link>
          </motion.div>
        </div>

        <p className="text-center font-playfair text-xl lg:text-2xl italic" style={{ color: MAGENTA }}>
          "Con tu primer cliente digital, el programa se paga solo."
        </p>
      </div>
    </section>
  );
}

// ─── Sección 6: Programa (acordeón) ──────────────────────────────────────────
const SESSIONS = [
  {
    num: "01", title: "El Ser que ya eres", date: "Sesión 1",
    intro: "Hoy descubres quién eres en el mercado — y nunca más vuelves a dudar de cómo presentarte.",
    items: ["Tu lucha, propósito y misión de marca", "Hilo conductor e historia de marca", "Arquetipo, tono y storytelling", "Hoja de ruta completa del reto"],
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

function Program() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="programa" className="py-16 lg:py-24 px-5 lg:px-8 relative overflow-hidden" style={{ background: G_BLUE }}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="font-playfair font-bold text-white mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            6 sesiones para construir tu marca
          </h2>
          <p className="font-dancing text-2xl lg:text-3xl text-white">
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
            <div className="h-1 rounded-full transition-all duration-500 bg-white" style={{ width: `${((open + 1) / 6) * 100}%` }} />
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
          <Link href={HREF_GENERAL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-all"
            style={{ background: "white", color: MAGENTA, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
            Quiero mi lugar →
          </Link>
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
    quote: "Llevaba más de 20 años posicionada de manera tradicional en la industria fitness. El reto me dio lo que nunca había encontrado: una oferta digital que reduce barreras de entrada, atrae nuevos clientes y expande mi experiencia más allá del gym. Hoy mi contenido en redes filtra, conecta y atrae clientes todos los días.",
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
        <p className="font-dancing text-2xl lg:text-3xl mb-2" style={{ color: MAGENTA }}>
          marcas alrededor del mundo ya han tomado la decisión
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
  { q: "¿Para quién es este reto?", a: "Para profesionales, emprendedores, consultores, vendedores, dueños de negocio, creadores de contenido y líderes de equipos que ya tienen experiencia y un servicio de valor, pero no han podido estructurar, comunicar ni monetizar su marca personal en digital. Si sabes que tienes potencial pero no sabes cómo traducirlo en ingresos reales, este reto es para ti." },
  { q: "¿Necesito experiencia previa en marketing digital?", a: "No es necesario. Los contenidos están diseñados para llevarte desde un punto de partida inicial hasta tu primer lanzamiento. Sin embargo, es indispensable contar con perfiles empresariales en redes sociales y un portafolio comercial básico. ¿Aún no los tienes? Al inscribirte tendrás acceso a materiales pregrabados con el paso a paso para configurarlo todo antes de comenzar." },
  { q: "¿Qué equipo de tecnología necesito?", a: "El reto puede seguirse desde el celular, aunque recomendamos trabajar desde computadora o iPad para aprovechar mejor los ejercicios y herramientas. Lo importante es tener una conexión estable a internet y acceso a Victoranza App." },
  { q: "¿Qué software adicional necesito?", a: "Recomendamos tener acceso a ChatGPT, Gemini o Claude — con la versión gratuita es suficiente para comenzar, aunque recomendamos la versión de pago para no tener limitantes al ejecutar los ejercicios." },
  { q: "¿Qué tanto se trabaja con inteligencia artificial?", a: "Mucho y con intención. Te enseñamos a co-crear con IA: definir tu identidad de marca, tus pilares de comunicación, tu estrategia de posicionamiento y conversión usando modelos propios. A partir de ahí, escalarás con sistemas de IA que harán el trabajo más eficiente y replicable." },
  { q: "¿Qué pasa si aún no tengo un producto o servicio que vender?", a: "Este reto te dará la claridad para arrancar desde cero. Tendrás acceso a recursos adicionales diseñados específicamente para ayudarte a idear y estructurar tu primer producto o servicio digital." },
  { q: "¿En qué plataforma se desarrolla el reto?", a: "Victoranza App es nuestra plataforma digital propia de Loreto Consultora. Allí encontrarás todos los materiales pregrabados, sesiones grabadas del reto, materiales de apoyo, comunidad y más. Al inscribirte recibirás por correo tu acceso con usuario y contraseña." },
  { q: "¿Dónde se realiza el pago?", a: "Al dar clic en los botones de esta página serás redirigido a una página de pago en línea. El pago es procesado por la pasarela de Stripe, es totalmente seguro y podrás pagar con la tarjeta de tu preferencia." },
  { q: "¿Qué pasa si no puedo asistir a una sesión en vivo?", a: "Todas las sesiones se graban y quedan disponibles en la plataforma para que avances a tu ritmo. Para situaciones especiales, acércate con tu customer happiness y atendemos tu caso de manera personalizada." },
  { q: "¿Cuánto tiempo necesito dedicarle por semana?", a: "Las sesiones son dos veces por semana. Además de las sesiones en vivo, recomendamos entre 2 y 3 horas semanales para implementar los ejercicios y construir tus entregables." },
  { q: "¿Hay reembolsos?", a: "Al ser un programa digital progresivo y práctico, no ofrecemos reembolsos. Sin embargo, garantizamos el 100% de satisfacción — si en algún momento sientes que algo no está funcionando para ti, acércate con nuestro equipo y lo resolvemos juntos." },
  { q: "¿Cuándo recupero mi inversión?", a: "En la mayoría de los casos, con una o dos ventas de tu servicio digital el reto se paga solo. Sales del programa con al menos un servicio lanzado y un sistema de ventas activo — diseñado exactamente para eso." },
  { q: "¿Cuántos lugares hay disponibles?", a: "Solo 20 lugares en Boost y 8 en Bloom — los cupos son limitados para garantizar atención personalizada y una experiencia de comunidad de alta calidad." },
  { q: "¿Qué pasa después del reto?", a: "Lo más importante es que continúes aplicando lo que construiste. Si quieres ir más lejos, puedes complementar con otros de nuestros programas y servicios. Acércate a nuestro equipo para encontrar el adecuado para ti y tus objetivos." },
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
function FinalCTA() {
  const { days, hours, minutes, seconds } = useCountdown();
  return (
    <section className="py-16 lg:py-24 px-5 lg:px-8 relative overflow-hidden" style={{ background: G_MAIN }}>
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="font-dancing text-3xl lg:text-4xl text-white mb-3">En el Mundo Digital</p>
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
            <p className="font-dancing text-3xl text-white">¿Lo activamos hoy?</p>

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
              <Link href={HREF_GENERAL} target="_blank" rel="noopener noreferrer"
                className="font-bold px-6 py-4 rounded-full text-sm hover:opacity-90 transition-all text-center"
                style={{ background: "white", color: MAGENTA, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                Quiero mi lugar en el reto →
              </Link>
              <Link href={HREF_VIP} target="_blank" rel="noopener noreferrer"
                className="font-bold px-6 py-4 rounded-full text-sm hover:opacity-90 transition-all text-center"
                style={{ background: G_GOLD, color: "#1a0a2e" }}>
                Acceso VIP — solo 8 lugares →
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
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <Transformation />
        <Results />
        <Pricing />
        <Program />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
