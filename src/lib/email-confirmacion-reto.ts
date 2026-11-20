interface Params {
  nombre: string;
  negocio: string;
  confirmaProximo: boolean;
}

const GRADIENTE = "linear-gradient(135deg, #1a0a2e 0%, #6d28d9 50%, #db2777 100%)";
const ACCENT = "#6d28d9";

export function emailConfirmacionReto({ nombre, negocio, confirmaProximo }: Params): string {
  const primerNombre = nombre.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>¡Estás dentro del Reto!</title>
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
              <div style="font-size:48px;line-height:1;margin-bottom:12px;">🌸🚀</div>
              <h1 style="margin:0;color:white;font-size:22px;font-weight:800;line-height:1.3;letter-spacing:-0.3px;">
                ¡Estás dentro, ${primerNombre}!<br />El Reto Boost &amp; Bloom empieza.
              </h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.80);font-size:14px;">
                Boost &amp; Bloom Your Brand · Loreto Consultora
              </p>
            </td>
          </tr>

          <!-- CUERPO -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Tarjeta del registro -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#f8f9fb;border-radius:14px;border:1.5px solid ${ACCENT}22;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${ACCENT};">
                      👤 Participante
                    </p>
                    <p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#1a1f24;">${nombre}</p>
                    ${negocio ? `
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${ACCENT};">
                      🏷️ Negocio / Marca
                    </p>
                    <p style="margin:0 0 16px;font-size:14px;color:#1a1f24;">${negocio}</p>
                    ` : ""}
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${ACCENT};">
                      🎯 Reto
                    </p>
                    <p style="margin:0;font-size:14px;color:#1a1f24;">Boost &amp; Bloom Your Brand</p>
                  </td>
                </tr>
              </table>

              <!-- Qué sigue -->
              <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#1a1f24;">¿Qué sigue?</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:6px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${GRADIENTE};color:white;font-size:11px;font-weight:700;text-align:center;line-height:22px;">1</span>
                  </td>
                  <td style="padding:6px 0 6px 8px;font-size:14px;color:#3A3F4B;line-height:1.5;">
                    Revisa tu bandeja de entrada — te estaremos enviando los <strong>materiales y dinámicas del reto</strong> por aquí.
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${GRADIENTE};color:white;font-size:11px;font-weight:700;text-align:center;line-height:22px;">2</span>
                  </td>
                  <td style="padding:6px 0 6px 8px;font-size:14px;color:#3A3F4B;line-height:1.5;">
                    Únete al grupo de WhatsApp del reto para <strong>conectar con los otros participantes</strong> y no perderte ninguna actualización.
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${GRADIENTE};color:white;font-size:11px;font-weight:700;text-align:center;line-height:22px;">3</span>
                  </td>
                  <td style="padding:6px 0 6px 8px;font-size:14px;color:#3A3F4B;line-height:1.5;">
                    Prepárate para <strong>dedicar 15–20 minutos diarios</strong> a tu marca. Pequeñas acciones constantes son las que mueven el negocio.
                  </td>
                </tr>
                ${confirmaProximo ? `
                <tr>
                  <td style="padding:6px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${GRADIENTE};color:white;font-size:11px;font-weight:700;text-align:center;line-height:22px;">4</span>
                  </td>
                  <td style="padding:6px 0 6px 8px;font-size:14px;color:#3A3F4B;line-height:1.5;">
                    Como confirmaste interés en el próximo reto, <strong>estarás entre los primeros en recibir la invitación</strong>. ¡Gracias por tu entusiasmo!
                  </td>
                </tr>
                ` : ""}
              </table>

              <hr style="border:none;border-top:1px solid #edf0f4;margin:28px 0;" />

              <!-- WhatsApp -->
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
                Recibiste este correo porque te registraste en el Reto Boost &amp; Bloom Your Brand.
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
