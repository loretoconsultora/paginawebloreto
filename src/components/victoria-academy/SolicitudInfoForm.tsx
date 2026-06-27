"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#6A8AFF] transition-colors";

type Props = {
  programa: string;
  webhookUrl: string;
  calendlyUrl: string;
  gradient: string;
  selectField: { name: string; label: string; options: string[] };
  confirmTitle: string;
  confirmText: string;
  submitLabel?: string;
  waitlistNote?: string;
};

export default function SolicitudInfoForm({
  programa,
  webhookUrl,
  calendlyUrl,
  gradient,
  selectField,
  confirmTitle,
  confirmText,
  submitLabel = "Reservar mi lugar →",
  waitlistNote,
}: Props) {
  const [form, setForm] = useState({ nombre: "", empresa: "", ciudad: "", correo: "", lada: "52", telefono: "", seleccion: "" });
  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("loading");
    try {
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            programa,
            nombre: form.nombre,
            empresa: form.empresa,
            ciudad: form.ciudad,
            correo: form.correo,
            lada: form.lada,
            telefono: form.telefono,
            [selectField.name]: form.seleccion,
          }),
        });
      }
      setEstado("ok");
    } catch {
      setEstado("error");
    }
  };

  if (estado === "ok") {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-6">
        <CheckCircle2 size={48} style={{ color: "#3E7ECA" }} />
        <p className="font-playfair text-2xl font-bold" style={{ color: "#445055" }}>{confirmTitle}</p>
        {calendlyUrl ? (
          <>
            <p className="text-sm max-w-sm" style={{ color: "#445055", opacity: 0.85 }}>
              Sólo un paso más, agenda tu llamada de Aplicación al Taller. En 15-30 minutos te ayudaremos a validar que este realmente es el programa ideal para ti.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity"
              style={{ background: gradient, boxShadow: "0 8px 24px rgba(62,126,202,0.3)" }}
            >
              Agendar mi llamada de aplicación →
            </a>
          </>
        ) : (
          <>
            <p className="text-sm max-w-sm" style={{ color: "#445055", opacity: 0.75 }}>{confirmText}</p>
            <p className="text-xs" style={{ color: "#445055", opacity: 0.5 }}>{waitlistNote ?? "Nuestro equipo te contactará en breve."}</p>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input required name="nombre" placeholder="¿Cómo te llamas? *" value={form.nombre} onChange={handleChange} className={inputClass} style={{ color: "#445055" }} />
      <input required name="empresa" placeholder="Nombre de la Empresa o Institución *" value={form.empresa} onChange={handleChange} className={inputClass} style={{ color: "#445055" }} />
      <input required name="ciudad" placeholder="Ciudad *" value={form.ciudad} onChange={handleChange} className={inputClass} style={{ color: "#445055" }} />
      <input required name="correo" type="email" placeholder="Tu mejor correo electrónico *" value={form.correo} onChange={handleChange} className={inputClass} style={{ color: "#445055" }} />
      <div className="flex gap-2">
        <div className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2.5 w-24 flex-shrink-0">
          <span className="text-sm text-gray-400">+</span>
          <input name="lada" placeholder="52" value={form.lada} onChange={handleChange} className="w-full text-sm focus:outline-none bg-transparent" style={{ color: "#445055" }} />
        </div>
        <input required name="telefono" placeholder="WhatsApp *" value={form.telefono} onChange={handleChange} className={`${inputClass} flex-1`} style={{ color: "#445055" }} />
      </div>

      <select required name="seleccion" value={form.seleccion} onChange={handleChange} className={`${inputClass} ${form.seleccion ? "" : "text-gray-400"}`} style={{ color: form.seleccion ? "#445055" : undefined }}>
        <option value="" disabled>{selectField.label} *</option>
        {selectField.options.map((opt) => (
          <option key={opt} value={opt} style={{ color: "#445055" }}>{opt}</option>
        ))}
      </select>

      <button
        type="submit"
        disabled={estado === "loading"}
        className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{ background: gradient, boxShadow: "0 8px 24px rgba(62,126,202,0.3)" }}
      >
        {estado === "loading" ? "Enviando…" : submitLabel}
      </button>
      <p className="text-[11px] text-center -mt-1" style={{ color: "#445055", opacity: 0.6 }}>
        Sin spam. Solo lo necesario para contactarte y agendar tu diagnóstico.
      </p>

      {estado === "error" && (
        <p className="text-xs text-red-500 text-center">Hubo un error. Intenta de nuevo.</p>
      )}
    </form>
  );
}
