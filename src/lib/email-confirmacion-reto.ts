interface Params {
  nombre: string;
  negocio: string;
  confirmaProximo: boolean;
  fechaProximoInicio?: string;
}

const GRADIENTE = "linear-gradient(135deg, #1a0a2e 0%, #6d28d9 50%, #db2777 100%)";
const ACCENT = "#6d28d9";

const STRIPE_BOOST = "https://buy.stripe.com/6oU9AT17d0LL8VS1D32Nq06";
const STRIPE_BLOOM = "https://buy.stripe.com/6oU28r7vB1PPgok0yZ2Nq05";

function getNextFirstMonday(): string {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const day = d.getDay();
  const diff = day === 1 ? 0 : day === 0 ? 1 : 8 - day;
  d.setDate(d.getDate() + diff);
  return d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
}

export function emailConfirmacionReto({ nombre, negocio, confirmaProximo, fechaProximoInicio }: Params): string {
  const primerNombre = nombre.split(" ")[0];
  const fechaInicio = fechaProximoInicio ?? getNextFirstMonday();
  const asunto = confirmaProximo
    ? "🌸 Estás registrado al próximo Reto Boost & Bloom"
    : "🌸 Estás registrado al Reto Boost & Bloom";

  void asunto; // used externally via subject field

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Estás registrado al Reto</title>
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
                Felicidades por tu registro,<br />${primerNombre}.
              </h1>
              <p style="margin:10px 0 4px;color:rgba(255,255,255,0.90);font-size:15px;font-weight:600;">
                El Reto para impulsar tu marca está próximo a comenzar.
              </p>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:13px;">
                Boost &amp; Bloom Your Brand · por Loreto Consultora
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
                      📅 Próximo inicio
                    </p>
                    <p style="margin:0;font-size:14px;font-weight:600;color:#1a1f24;">${fechaInicio}</p>
                  </td>
                </tr>
              </table>

              <!-- Confirma tu pago -->
              <p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#1a1f24;">¿Qué sigue?</p>
              <p style="margin:0 0 16px;font-size:14px;color:#3A3F4B;line-height:1.6;">
                Para asegurar tu lugar en la siguiente generación del Reto, confirma tu pago eligiendo el plan que mejor se adapte a ti:
              </p>

              <!-- Botón Boost -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                <tr>
                  <td align="center">
                    <a href="${STRIPE_BOOST}" target="_blank"
                      style="display:block;padding:14px 28px;border-radius:50px;background:${GRADIENTE};color:white;font-size:14px;font-weight:700;text-decoration:none;text-align:center;">
                      Boost Your Brand — $333 USD →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Botón Bloom -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="${STRIPE_BLOOM}" target="_blank"
                      style="display:block;padding:14px 28px;border-radius:50px;border:2px solid #6d28d9;color:#6d28d9;font-size:14px;font-weight:700;text-decoration:none;text-align:center;background:white;">
                      Bloom Your Brand — $649 USD ✦
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Pasos post-pago -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:6px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${GRADIENTE};color:white;font-size:11px;font-weight:700;text-align:center;line-height:22px;">1</span>
                  </td>
                  <td style="padding:6px 0 6px 8px;font-size:14px;color:#3A3F4B;line-height:1.5;">
                    Al <strong>confirmar tu pago</strong>, un miembro de nuestro equipo se pondrá en contacto contigo para una <strong>llamada de bienvenida</strong> en la que te prepararemos para el Reto.
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${GRADIENTE};color:white;font-size:11px;font-weight:700;text-align:center;line-height:22px;">2</span>
                  </td>
                  <td style="padding:6px 0 6px 8px;font-size:14px;color:#3A3F4B;line-height:1.5;">
                    Te daremos la bienvenida a nuestra <strong>plataforma de cursos</strong> con tu perfil de alumno para que puedas acceder a todos los recursos, materiales y dinámicas.
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${GRADIENTE};color:white;font-size:11px;font-weight:700;text-align:center;line-height:22px;">3</span>
                  </td>
                  <td style="padding:6px 0 6px 8px;font-size:14px;color:#3A3F4B;line-height:1.5;">
                    Prepárate: estamos por comenzar <strong>la transformación que habías estado buscando</strong>.
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #edf0f4;margin:24px 0;" />

              <!-- WhatsApp -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#166534;">¿Tienes dudas sobre los planes?</p>
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

export function subjectConfirmacionReto(confirmaProximo: boolean): string {
  return confirmaProximo
    ? "🌸 Estás registrado al próximo Reto Boost & Bloom"
    : "🌸 Estás registrado al Reto Boost & Bloom";
}
