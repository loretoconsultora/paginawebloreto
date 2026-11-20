interface Params {
  nombre: string;
  negocio: string;
  puntaje: number;
  categoria: string;
  descripcionCategoria: string;
}

const GRADIENTE = "linear-gradient(135deg, #1a0a2e 0%, #6d28d9 50%, #db2777 100%)";
const ACCENT = "#6d28d9";
const RETO_URL = "https://loretoconsultora.com/reto";

export function emailBrandCompass({ nombre, negocio, puntaje, categoria, descripcionCategoria }: Params): string {
  const primerNombre = nombre.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Resultados de tu diagnóstico de marca</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">

          <!-- HEADER -->
          <tr>
            <td style="background:${GRADIENTE};padding:40px 40px 32px;text-align:center;">
              <img src="https://loretoconsultora.com/logo-blanco.png" alt="Loreto Consultora" width="140"
                style="display:block;margin:0 auto 20px;opacity:0.95;" />
              <div style="font-size:48px;line-height:1;margin-bottom:12px;">🧭✨</div>
              <h1 style="margin:0;color:white;font-size:22px;font-weight:800;line-height:1.3;letter-spacing:-0.3px;">
                ¡Aquí están los resultados<br />de tu diagnóstico, ${primerNombre}!
              </h1>
              <p style="margin:10px 0 4px;color:rgba(255,255,255,0.90);font-size:15px;font-weight:600;">
                Brand Compass · ¿En qué momento está tu marca hoy?
              </p>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:13px;">
                por Loreto Consultora
              </p>
            </td>
          </tr>

          <!-- CUERPO -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Tarjeta del resultado -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#f8f9fb;border-radius:14px;border:1.5px solid ${ACCENT}22;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${ACCENT};">
                      👤 Participante
                    </p>
                    <p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#1a1f24;">${nombre}</p>

                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${ACCENT};">
                      🏷️ Negocio / Marca
                    </p>
                    <p style="margin:0 0 16px;font-size:14px;color:#1a1f24;">${negocio}</p>

                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${ACCENT};">
                      📊 Puntaje
                    </p>
                    <p style="margin:0 0 16px;font-size:22px;font-weight:800;color:#1a1f24;">${puntaje}<span style="font-size:14px;font-weight:400;color:#6b7280;"> / 48</span></p>

                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${ACCENT};">
                      🏆 Tu categoría
                    </p>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#1a1f24;">${categoria}</p>
                  </td>
                </tr>
              </table>

              <!-- Descripción -->
              <p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#1a1f24;">Lo que esto significa para tu marca</p>
              <p style="margin:0 0 24px;font-size:14px;color:#3A3F4B;line-height:1.7;">
                ${descripcionCategoria}
              </p>

              <hr style="border:none;border-top:1px solid #edf0f4;margin:24px 0;" />

              <!-- CTA Reto -->
              <p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#1a1f24;">¿Quieres llevarlo al siguiente nivel?</p>
              <p style="margin:0 0 16px;font-size:14px;color:#3A3F4B;line-height:1.6;">
                El Reto Boost &amp; Bloom Your Brand es exactamente lo que necesitas para pasar de donde estás hoy a donde quieres llegar.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="${RETO_URL}" target="_blank"
                      style="display:block;padding:14px 28px;border-radius:50px;background:${GRADIENTE};color:white;font-size:14px;font-weight:700;text-decoration:none;text-align:center;">
                      Conoce el Reto Boost &amp; Bloom →
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #edf0f4;margin:24px 0;" />

              <!-- WhatsApp -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#166534;">¿Tienes dudas o quieres platicar sobre tus resultados?</p>
                    <p style="margin:0;font-size:13px;color:#166534;line-height:1.5;">
                      Escríbenos por WhatsApp al <a href="https://wa.me/524427497345" style="color:#166534;font-weight:700;">+52 442 749 7345</a> y con gusto te orientamos.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#3A3F4B;line-height:1.6;">
                Con mucho ánimo,<br />
                <strong style="color:#1a1f24;">Any Villegas</strong><br />
                <span style="color:${ACCENT};font-size:13px;">Fundadora · Loreto Consultora</span>
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
                Recibiste este correo porque completaste el diagnóstico Brand Compass.
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

export function subjectBrandCompass(categoria: string): string {
  return `🧭 Tus resultados: ${categoria} · Brand Compass`;
}
