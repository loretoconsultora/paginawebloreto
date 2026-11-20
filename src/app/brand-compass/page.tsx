"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GRADIENTE = "linear-gradient(135deg, #1a0a2e 0%, #6d28d9 50%, #db2777 100%)";
const ACCENT = "#6d28d9";

// ─── Preguntas ────────────────────────────────────────────────────────────────
const PREGUNTAS = [
  {
    categoria: "Identidad visual",
    pregunta: "¿Tienes una identidad visual definida (logo, paleta, tipografía)?",
    opciones: [
      "Sí, todo está definido y es coherente en todos mis canales",
      "Tengo logo pero no todo está estandarizado",
      "Uso colores y estilos pero sin un sistema real",
      "No tengo nada definido todavía",
    ],
  },
  {
    categoria: "Propuesta de valor",
    pregunta: "¿Puedes explicar en una frase clara qué hace tu marca y para quién es?",
    opciones: [
      "Sí, tengo mi propuesta de valor muy clara y la comunico constantemente",
      "Tengo una idea pero no la tengo escrita ni estandarizada",
      "Me cuesta diferenciarme de la competencia",
      "No sé bien qué me hace diferente",
    ],
  },
  {
    categoria: "Presencia en redes sociales",
    pregunta: "¿Con qué frecuencia publicas contenido en tus redes?",
    opciones: [
      "Publico de forma consistente con un calendario editorial",
      "Publico cuando puedo o cuando me acuerdo",
      "Publico muy poco, casi no tengo presencia",
      "No tengo redes sociales activas para mi marca",
    ],
  },
  {
    categoria: "Audiencia ideal",
    pregunta: "¿Tienes definido quién es tu cliente ideal?",
    opciones: [
      "Sí, tengo un perfil detallado de mi cliente ideal",
      "Tengo una idea general pero no está bien definido",
      "Tengo varios tipos de clientes muy distintos entre sí",
      "No sé exactamente a quién le vendo",
    ],
  },
  {
    categoria: "Estrategia de contenido",
    pregunta: "¿Tienes una estrategia de contenido?",
    opciones: [
      "Sí, tengo temas, formatos y objetivos definidos",
      "Creo contenido basado en lo que veo que funciona para otros",
      "Publico sin mucha estrategia, lo que se me ocurre",
      "No tengo ninguna estrategia de contenido",
    ],
  },
  {
    categoria: "Generación de leads",
    pregunta: "¿Cómo consigues nuevos clientes?",
    opciones: [
      "Tengo un sistema claro: publicidad, embudo y seguimiento",
      "Principalmente por referidos y contactos",
      "Por redes sociales pero sin un proceso definido",
      "No tengo un proceso claro para conseguir clientes",
    ],
  },
  {
    categoria: "Posicionamiento en Google",
    pregunta: "¿Tu marca aparece en Google cuando alguien busca lo que ofreces?",
    opciones: [
      "Sí, tengo buena presencia orgánica o de pago",
      "Aparezco pero no de forma consistente",
      "Casi no aparezco en búsquedas relevantes",
      "No sé si aparezco o no",
    ],
  },
  {
    categoria: "Email marketing",
    pregunta: "¿Tienes una lista de correos de clientes o prospectos?",
    opciones: [
      "Sí, tengo una lista activa y la uso para comunicarme",
      "Tengo correos guardados pero no los uso estratégicamente",
      "Tengo muy pocos contactos",
      "No tengo ninguna lista de correos",
    ],
  },
  {
    categoria: "Oferta de productos/servicios",
    pregunta: "¿Tu oferta está claramente definida con precios?",
    opciones: [
      "Sí, tengo paquetes claros con precios definidos",
      "Tengo servicios pero los precios varían mucho",
      "Ofrezco muchas cosas y me cuesta enfocarme",
      "No tengo una oferta clara todavía",
    ],
  },
  {
    categoria: "Métricas",
    pregunta: "¿Mides los resultados de tus acciones de marketing?",
    opciones: [
      "Sí, reviso métricas regularmente y tomo decisiones con ellas",
      "Reviso likes y seguidores pero no métricas profundas",
      "No sé qué medir ni cómo interpretarlo",
      "No mido nada",
    ],
  },
  {
    categoria: "Presupuesto de marketing",
    pregunta: "¿Inviertes presupuesto en publicidad o herramientas de marketing?",
    opciones: [
      "Sí, tengo un presupuesto definido y lo uso estratégicamente",
      "Invierto esporádicamente cuando veo oportunidad",
      "He intentado publicidad pero no ha funcionado",
      "No invierto nada en marketing todavía",
    ],
  },
  {
    categoria: "Consistencia de marca",
    pregunta: "¿Tu comunicación es consistente en todos tus canales?",
    opciones: [
      "Sí, el tono, diseño y mensajes son coherentes en todo",
      "Hay coherencia en algunos canales pero no en todos",
      "Cada canal se ve y suena diferente",
      "No tengo consistencia de ningún tipo",
    ],
  },
];

const OPCION_LABELS = ["A", "B", "C", "D"];
const OPCION_SCORES = [4, 3, 2, 1];

interface Categoria {
  nombre: string;
  descripcion: string;
}

function getCategoria(puntaje: number): Categoria {
  if (puntaje <= 20) return {
    nombre: "Marca en construcción",
    descripcion: "Tu marca está en sus primeros pasos. Tienes una oportunidad enorme por delante. Con las bases correctas, puedes construir una presencia sólida y diferenciada.",
  };
  if (puntaje <= 30) return {
    nombre: "Marca en desarrollo",
    descripcion: "Ya tienes elementos clave, pero falta estructura y consistencia. Con la estrategia adecuada, puedes acelerar tu crecimiento significativamente.",
  };
  if (puntaje <= 40) return {
    nombre: "Marca en crecimiento",
    descripcion: "Tu marca tiene buenas bases y ya genera resultados. Es el momento de optimizar, escalar y llevarla al siguiente nivel.",
  };
  return {
    nombre: "Marca consolidada",
    descripcion: "Tu marca está bien posicionada y funciona de forma estratégica. El reto ahora es mantener la consistencia y seguir innovando.",
  };
}

type Step = "registro" | "quiz" | "resultados";

interface FormData {
  nombre: string;
  correo: string;
  negocio: string;
  telefono: string;
}

// ─── Componente de registro ───────────────────────────────────────────────────
function RegistroStep({ onNext }: { onNext: (data: FormData) => void }) {
  const [form, setForm] = useState<FormData>({ nombre: "", correo: "", negocio: "", telefono: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.correo.trim() || !form.negocio.trim()) {
      setError("Por favor completa los campos requeridos.");
      return;
    }
    setLoading(true);
    setError("");
    onNext(form);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">🧭</div>
            <h1 className="font-playfair text-3xl font-bold mb-3" style={{ color: "#1a1f24" }}>
              Brand Compass
            </h1>
            <p className="text-base" style={{ color: "#6b7280" }}>
              ¿En qué momento está tu marca hoy?
            </p>
            <p className="text-sm mt-2" style={{ color: "#9ca3af" }}>
              12 preguntas · 5 minutos · 100% gratuito
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-lg font-bold mb-6" style={{ color: "#1a1f24" }}>
              Antes de comenzar, cuéntanos un poco de ti
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "#3A3F4B" }}>
                  Nombre completo <span style={{ color: ACCENT }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition"
                  style={{ borderColor: "#e5e7eb", fontSize: "0.95rem" }}
                  onFocus={e => (e.target.style.borderColor = ACCENT)}
                  onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "#3A3F4B" }}>
                  Correo electrónico <span style={{ color: ACCENT }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={form.correo}
                  onChange={e => setForm(f => ({ ...f, correo: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition"
                  style={{ borderColor: "#e5e7eb", fontSize: "0.95rem" }}
                  onFocus={e => (e.target.style.borderColor = ACCENT)}
                  onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "#3A3F4B" }}>
                  Negocio / Marca <span style={{ color: ACCENT }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nombre de tu negocio o marca"
                  value={form.negocio}
                  onChange={e => setForm(f => ({ ...f, negocio: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition"
                  style={{ borderColor: "#e5e7eb", fontSize: "0.95rem" }}
                  onFocus={e => (e.target.style.borderColor = ACCENT)}
                  onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "#3A3F4B" }}>
                  Teléfono <span style={{ color: "#9ca3af", fontWeight: 400 }}>(opcional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+52 000 000 0000"
                  value={form.telefono}
                  onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition"
                  style={{ borderColor: "#e5e7eb", fontSize: "0.95rem" }}
                  onFocus={e => (e.target.style.borderColor = ACCENT)}
                  onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full font-bold text-white text-sm mt-2 transition hover:opacity-90 disabled:opacity-50"
                style={{ background: GRADIENTE }}
              >
                {loading ? "Iniciando..." : "Iniciar diagnóstico →"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── Componente de quiz ───────────────────────────────────────────────────────
function QuizStep({ onFinish }: { onFinish: (respuestas: string[], puntaje: number) => void }) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<string[]>([]);
  const [seleccion, setSeleccion] = useState<number | null>(null);

  const progreso = ((preguntaActual) / PREGUNTAS.length) * 100;
  const pregunta = PREGUNTAS[preguntaActual];

  const handleSiguiente = () => {
    if (seleccion === null) return;
    const nuevasRespuestas = [...respuestas, OPCION_LABELS[seleccion]];

    if (preguntaActual < PREGUNTAS.length - 1) {
      setRespuestas(nuevasRespuestas);
      setPreguntaActual(p => p + 1);
      setSeleccion(null);
    } else {
      const puntaje = nuevasRespuestas.reduce((acc, r, i) => {
        const idx = OPCION_LABELS.indexOf(r);
        return acc + OPCION_SCORES[idx];
      }, 0);
      onFinish(nuevasRespuestas, puntaje);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">

          {/* Progreso */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-semibold mb-2" style={{ color: "#6b7280" }}>
              <span>Pregunta {preguntaActual + 1} de {PREGUNTAS.length}</span>
              <span>{Math.round(progreso)}% completado</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: "#e5e7eb" }}>
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${progreso}%`, background: GRADIENTE }}
              />
            </div>
          </div>

          {/* Tarjeta de pregunta */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
              {pregunta.categoria}
            </p>
            <h2 className="text-lg font-bold mb-6 leading-snug" style={{ color: "#1a1f24" }}>
              {pregunta.pregunta}
            </h2>

            <div className="flex flex-col gap-3">
              {pregunta.opciones.map((opcion, i) => (
                <button
                  key={i}
                  onClick={() => setSeleccion(i)}
                  className="w-full text-left px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all duration-200"
                  style={{
                    borderColor: seleccion === i ? ACCENT : "#e5e7eb",
                    background: seleccion === i ? `${ACCENT}0d` : "#fff",
                    color: seleccion === i ? ACCENT : "#3A3F4B",
                  }}
                >
                  <span
                    className="inline-block w-6 h-6 rounded-full text-xs font-bold text-center leading-6 mr-3 flex-shrink-0"
                    style={{
                      background: seleccion === i ? GRADIENTE : "#f3f4f6",
                      color: seleccion === i ? "white" : "#6b7280",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {OPCION_LABELS[i]}
                  </span>
                  {opcion}
                </button>
              ))}
            </div>

            <button
              onClick={handleSiguiente}
              disabled={seleccion === null}
              className="w-full mt-6 py-4 rounded-full font-bold text-white text-sm transition hover:opacity-90 disabled:opacity-30"
              style={{ background: GRADIENTE }}
            >
              {preguntaActual < PREGUNTAS.length - 1 ? "Siguiente →" : "Ver mis resultados →"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── Componente de resultados ─────────────────────────────────────────────────
function ResultadosStep({
  userData,
  respuestas,
  puntaje,
}: {
  userData: FormData;
  respuestas: string[];
  puntaje: number;
}) {
  const cat = getCategoria(puntaje);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">

          {/* Header resultado */}
          <div
            className="rounded-2xl p-8 text-center text-white mb-6"
            style={{ background: GRADIENTE }}
          >
            <div className="text-5xl mb-4">🏆</div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.75)" }}>
              Tu diagnóstico de marca
            </p>
            <h1 className="font-playfair text-3xl font-bold mb-1">{cat.nombre}</h1>
            <p className="text-4xl font-black mt-3">
              {puntaje}<span className="text-xl font-normal opacity-75"> / 48</span>
            </p>
          </div>

          {/* Descripción */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-6">
            <h2 className="font-bold text-base mb-3" style={{ color: "#1a1f24" }}>
              Lo que esto significa para tu marca
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#3A3F4B" }}>
              {cat.descripcion}
            </p>

            <div className="mt-6 p-4 rounded-xl" style={{ background: `${ACCENT}0d`, border: `1.5px solid ${ACCENT}22` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: ACCENT }}>
                ¿Qué sigue?
              </p>
              <p className="text-sm" style={{ color: "#3A3F4B" }}>
                Te enviamos tus resultados completos a <strong>{userData.correo}</strong>. Revisa tu bandeja de entrada.
              </p>
            </div>
          </div>

          {/* CTA Reto */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="text-4xl mb-3">🌸🚀</div>
            <h2 className="font-bold text-lg mb-2" style={{ color: "#1a1f24" }}>
              ¿Lista para el siguiente nivel?
            </h2>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "#6b7280" }}>
              El Reto Boost &amp; Bloom Your Brand es el programa intensivo para construir, posicionar y escalar tu marca.
            </p>
            <Link
              href="/reto"
              className="block w-full py-4 rounded-full font-bold text-white text-sm text-center transition hover:opacity-90"
              style={{ background: GRADIENTE }}
            >
              Conoce el Reto Boost &amp; Bloom →
            </Link>
            <a
              href="https://wa.me/524427497345"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-3 py-4 rounded-full font-bold text-sm text-center transition hover:opacity-90 border-2"
              style={{ borderColor: ACCENT, color: ACCENT, background: "white" }}
            >
              Escríbenos por WhatsApp
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function BrandCompassPage() {
  const [step, setStep] = useState<Step>("registro");
  const [userData, setUserData] = useState<FormData | null>(null);
  const [respuestasFinales, setRespuestasFinales] = useState<string[]>([]);
  const [puntajeFinal, setPuntajeFinal] = useState(0);

  const handleRegistro = (data: FormData) => {
    setUserData(data);
    setStep("quiz");
  };

  const handleQuizFinish = async (respuestas: string[], puntaje: number) => {
    setRespuestasFinales(respuestas);
    setPuntajeFinal(puntaje);

    const cat = getCategoria(puntaje);

    // Guardar en Notion + enviar email (fire and forget, no bloqueamos UI)
    if (userData) {
      fetch("/api/registro-brand-compass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: userData.nombre,
          correo: userData.correo,
          negocio: userData.negocio,
          telefono: userData.telefono || undefined,
          respuestas,
          puntaje,
          categoria: cat.nombre,
          descripcionCategoria: cat.descripcion,
        }),
      }).catch(console.error);
    }

    setStep("resultados");
  };

  if (step === "registro") return <RegistroStep onNext={handleRegistro} />;
  if (step === "quiz") return <QuizStep onFinish={handleQuizFinish} />;
  return (
    <ResultadosStep
      userData={userData!}
      respuestas={respuestasFinales}
      puntaje={puntajeFinal}
    />
  );
}
