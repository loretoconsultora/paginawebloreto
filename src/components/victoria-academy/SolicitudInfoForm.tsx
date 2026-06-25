"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-grafito placeholder:text-gray-400 focus:outline-none focus:border-teal-300 transition-colors";

type CityField =
  | { type: "text"; placeholder: string }
  | { type: "select"; options: string[] };

type Props = {
  programa: string;
  webhookUrl: string;
  calendlyUrl: string;
  gradient: string;
  extraField: { name: string; placeholder: string };
  selectField: { name: string; label: string; options: string[] };
  cityField: CityField;
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
  extraField,
  selectField,
  cityField,
  confirmTitle,
  confirmText,
  submitLabel = "Solicitar información →",
  waitlistNote,
}: Props) {
  const [form, setForm] = useState({ nombre: "", correo: "", lada: "52", telefono: "", extra: "", seleccion: "", ciudad: "" });
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
            correo: form.correo,
            lada: form.lada,
            telefono: form.telefono,
            ciudad: form.ciudad,
            [extraField.name]: form.extra,
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
        <CheckCircle2 size={48} style={{ color: "#0f7a78" }} />
        <p className="font-playfair text-2xl font-bold text-grafito">{confirmTitle}</p>
        <p className="text-sm text-grafito/60 max-w-sm">{confirmText}</p>
        {calendlyUrl ? (
          <div className="w-full rounded-xl overflow-hidden border border-gray-200" style={{ minHeight: 600 }}>
            <iframe src={calendlyUrl} title="Agenda tu llamada" width="100%" height="600" style={{ border: 0 }} />
          </div>
        ) : (
          <p className="text-xs text-grafito/40">{waitlistNote ?? "Nuestro equipo te contactará en breve."}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input required name="nombre" placeholder="Nombre completo *" value={form.nombre} onChange={handleChange} className={inputClass} />
      <input required name="correo" type="email" placeholder="Correo electrónico *" value={form.correo} onChange={handleChange} className={inputClass} />
      <div className="flex gap-2">
        <div className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2.5 w-24 flex-shrink-0">
          <span className="text-sm text-grafito/50">+</span>
          <input name="lada" placeholder="52" value={form.lada} onChange={handleChange} className="w-full text-sm text-grafito focus:outline-none bg-transparent" />
        </div>
        <input required name="telefono" placeholder="WhatsApp *" value={form.telefono} onChange={handleChange} className={`${inputClass} flex-1`} />
      </div>
      <input name="extra" placeholder={extraField.placeholder} value={form.extra} onChange={handleChange} className={inputClass} />

      <select required name="seleccion" value={form.seleccion} onChange={handleChange} className={`${inputClass} ${form.seleccion ? "" : "text-gray-400"}`}>
        <option value="" disabled>{selectField.label} *</option>
        {selectField.options.map((opt) => (
          <option key={opt} value={opt} className="text-grafito">{opt}</option>
        ))}
      </select>

      {cityField.type === "text" ? (
        <input required name="ciudad" placeholder={cityField.placeholder} value={form.ciudad} onChange={handleChange} className={inputClass} />
      ) : (
        <select required name="ciudad" value={form.ciudad} onChange={handleChange} className={`${inputClass} ${form.ciudad ? "" : "text-gray-400"}`}>
          <option value="" disabled>Ciudad *</option>
          {cityField.options.map((opt) => (
            <option key={opt} value={opt} className="text-grafito">{opt}</option>
          ))}
        </select>
      )}

      <button
        type="submit"
        disabled={estado === "loading"}
        className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{ background: gradient, boxShadow: "0 8px 24px rgba(192,0,90,0.3)" }}
      >
        {estado === "loading" ? "Enviando…" : submitLabel}
      </button>
      <p className="text-[11px] text-grafito/40 text-center -mt-1">
        Te contactaremos para agendar una breve llamada de diagnóstico.
      </p>

      {estado === "error" && (
        <p className="text-xs text-red-500 text-center">Hubo un error. Intenta de nuevo.</p>
      )}
    </form>
  );
}
