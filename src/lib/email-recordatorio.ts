interface Params {
  nombre: string;
  pais: string;
  tipo: "8h" | "1h";
  fechaEvento: string;
  masterclass: string;
  meetLink: string;
}

const BANDERA: Record<string, string> = {
  "Costa Rica": "🇨🇷",
  "Colombia":   "🇨🇴",
  "Chile":      "🇨🇱",
  "Panamá":     "🇵🇦",
};

const GRADIENTE: Record<string, string> = {
  "Costa Rica": "linear-gradient(135deg, #0a2240 0%, #005fa3 50%, #00b4a0 100%)",
  "Colombia":   "linear-gradient(135deg, #1a1200 0%, #c48000 50%, #f5c842 100%)",
  "Chile":      "linear-gradient(135deg, #1a0808 0%, #c0001a 50%, #e84055 100%)",
  "Panamá":     "linear-gradient(135deg, #0a0a2e 0%, #1a3a7c 50%, #c0001a 100%)",
};

const ACCENT: Record<string, string> = {
  "Costa Rica": "#005fa3",
  "Colombia":   "#c48000",
  "Chile":      "#c0001a",
  "Panamá":     "#1a3a7c",
};

export function emailRecordatorio({ nombre, pais, tipo, fechaEvento, masterclass, meetLink }: Params): string {
  const bandera = BANDERA[pais] ?? "🌎";
  const gradiente = GRADIENTE[pais] ?? "linear-gradient(135deg,#1a0a2e,#3a1a6e)";
  const accent = ACCENT[pais] ?? "#3a1a6e";
  const primerNombre = nombre.split(" ")[0];
  const tiempoRestante = tipo === "8h" ? "8 horas" : "1 hora";
  const urgencia = tipo === "1h"
    ? "¡Es en 1 hora! Prepara tu conexión."
    : "El evento es hoy. Reserva tu tarde.";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Recordatorio: el evento es en ${tiempoRestante}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">

          <!-- HEADER -->
          <tr>
            <td style="background:${gradiente};padding:36px 40px 28px;text-align:center;">
              <img src="https://loretoconsultora.com/logo-blanco.png" alt="Loreto Consultora" width="130"
                style="display:block;margin:0 auto 16px;opacity:0.95;" />
              <div style="font-size:40px;line-height:1;margin-bottom:10px;">${bandera} ⏰</div>
              <h1 style="margin:0;color:white;font-size:20px;font-weight:800;line-height:1.3;">
                ${primerNombre}, el evento es en <span style="text-decoration:underline;">${tiempoRestante}</span>
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.80);font-size:13px;">${urgencia}</p>
            </td>
          </tr>

          <!-- CUERPO -->
          <tr>
            <td style="background:#ffffff;padding:32px 40px;">

              <!-- Tarjeta del evento -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#f8f9fb;border-radius:14px;border:1.5px solid ${accent}22;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${accent};">
                      📅 Cuándo
                    </p>
                    <p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#1a1f24;">${fechaEvento}</p>
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${accent};">
                      🎓 Masterclass
                    </p>
                    <p style="margin:0 0 16px;font-size:14px;color:#1a1f24;line-height:1.5;">${masterclass}</p>
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${accent};">
                      🖥️ Enlace de acceso
                    </p>
                    <a href="${meetLink}" target="_blank"
                      style="display:inline-block;padding:12px 28px;border-radius:50px;background:${gradiente};color:white;font-size:14px;font-weight:700;text-decoration:none;">
                      Entrar al evento →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px;font-size:14px;color:#3A3F4B;line-height:1.6;">
                Entra 5 minutos antes para conectarte sin prisa y poder hacer networking desde el inicio.
              </p>

              <!-- Dudas WhatsApp -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;font-size:13px;color:#166534;line-height:1.5;">
                      ¿Tienes algún problema para conectarte? Escríbenos por
                      <a href="https://wa.me/524427497345" style="color:#166534;font-weight:700;">WhatsApp +52 442 749 7345</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#1a1f24;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.35);">
                Loreto Consultora · Recibiste este recordatorio porque te registraste en este evento.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
