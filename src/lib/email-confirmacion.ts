interface Params {
  nombre: string;
  pais: string;
  fechaEvento: string;
  masterclass: string;
}

const BANDERA: Record<string, string> = {
  "Costa Rica": "🇨🇷",
  "Colombia":   "🇨🇴",
  "Chile":      "🇨🇱",
  "Panamá":     "🇵🇦",
};

const MEET_LINK: Record<string, string> = {
  "Costa Rica": "https://meet.google.com/urs-bqnz-syp",
  "Colombia":   "https://meet.google.com/wup-pizh-xta",
  "Chile":      "https://meet.google.com/qaa-tizw-ctu",
  "Panamá":     "https://meet.google.com/agg-fmpb-sxg",
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

export function emailConfirmacion({ nombre, pais, fechaEvento, masterclass }: Params): string {
  const bandera = BANDERA[pais] ?? "🌎";
  const gradiente = GRADIENTE[pais] ?? "linear-gradient(135deg,#1a0a2e,#3a1a6e)";
  const accent = ACCENT[pais] ?? "#3a1a6e";
  const meetLink = MEET_LINK[pais] ?? "";
  const primerNombre = nombre.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>¡Tu lugar está reservado!</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">

          <!-- HEADER con gradiente -->
          <tr>
            <td style="background:${gradiente};padding:40px 40px 32px;text-align:center;">
              <!-- Logo Loreto -->
              <img src="https://loretoconsultora.com/logo-blanco.png" alt="Loreto Consultora" width="140"
                style="display:block;margin:0 auto 20px;opacity:0.95;" />
              <div style="font-size:48px;line-height:1;margin-bottom:12px;">${bandera}</div>
              <h1 style="margin:0;color:white;font-size:22px;font-weight:800;line-height:1.3;letter-spacing:-0.3px;">
                ¡Tu lugar está reservado,<br />${primerNombre}!
              </h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.80);font-size:14px;">
                Networking &amp; Masterclass Digital · ${pais}
              </p>
            </td>
          </tr>

          <!-- CUERPO blanco -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Tarjeta del evento -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#f8f9fb;border-radius:14px;border:1.5px solid ${accent}22;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${accent};">
                      📅 Fecha y hora
                    </p>
                    <p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#1a1f24;">${fechaEvento}</p>
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${accent};">
                      🎓 Masterclass
                    </p>
                    <p style="margin:0 0 16px;font-size:14px;color:#1a1f24;line-height:1.5;">${masterclass}</p>
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${accent};">
                      🖥️ Enlace de acceso
                    </p>
                    <a href="${meetLink}" target="_blank"
                      style="display:inline-block;margin-top:4px;font-size:14px;font-weight:700;color:${accent};word-break:break-all;">${meetLink}</a>
                    <p style="margin:6px 0 0;font-size:12px;color:#3A3F4B;opacity:0.6;">Google Meet · Evento en línea</p>
                  </td>
                </tr>
              </table>

              <!-- Instrucciones -->
              <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#1a1f24;">¿Qué sigue?</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:6px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${gradiente};color:white;font-size:11px;font-weight:700;text-align:center;line-height:22px;">1</span>
                  </td>
                  <td style="padding:6px 0 6px 8px;font-size:14px;color:#3A3F4B;line-height:1.5;">
                    Revisa tu correo antes del evento — te enviaremos el <strong>enlace de Google Meet</strong> con 24 horas de anticipación. Revisa también tu carpeta de spam.
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${gradiente};color:white;font-size:11px;font-weight:700;text-align:center;line-height:22px;">2</span>
                  </td>
                  <td style="padding:6px 0 6px 8px;font-size:14px;color:#3A3F4B;line-height:1.5;">
                    Llega 5 minutos antes para conectarte sin prisa y poder hacer networking desde el inicio.
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${gradiente};color:white;font-size:11px;font-weight:700;text-align:center;line-height:22px;">3</span>
                  </td>
                  <td style="padding:6px 0 6px 8px;font-size:14px;color:#3A3F4B;line-height:1.5;">
                    Trae tu mayor reto de negocio en mente — lo usaremos de materia prima durante la masterclass.
                  </td>
                </tr>
              </table>

              <!-- Separador -->
              <hr style="border:none;border-top:1px solid #edf0f4;margin:28px 0;" />

              <!-- Dudas WhatsApp -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#166534;">¿Tienes dudas?</p>
                    <p style="margin:0;font-size:13px;color:#166534;line-height:1.5;">
                      Escríbenos por WhatsApp al <a href="https://wa.me/524427497345" style="color:#166534;font-weight:700;">+52 442 749 7345</a> y con gusto te atendemos.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#3A3F4B;line-height:1.6;">
                Nos vemos pronto,<br />
                <strong style="color:#1a1f24;">Any Villegas</strong><br />
                <span style="color:${accent};font-size:13px;">Fundadora · Loreto Consultora</span>
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#1a1f24;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.45);">
                Loreto Consultora · Estrategia de Marketing y Posicionamiento de Marca
              </p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);">
                Recibiste este correo porque te registraste en uno de nuestros eventos.
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
