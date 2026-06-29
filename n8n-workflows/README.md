# Workflows de n8n — VictorIA Academy

Estos 9 archivos son workflows de n8n listos para **importar** (Workflows → Import from File) para los 3 programas de VictorIA Academy: Profesional, Elite y Joven. Cada programa tiene 3 workflows que cubren todo el flujo descrito:

| Archivo | Qué hace |
|---|---|
| `01-registro.json` | Recibe el webhook del formulario de la landing → crea el item en el tablero de Monday del programa → envía correo HTML interno avisando del nuevo lead. |
| `02-confirmacion-cita-calendly.json` | Se dispara cuando el lead agenda su llamada en Calendly (evento `invitee.created`) → actualiza el item en Monday con la cita → envía al lead el correo HTML de confirmación (día, hora, link de Google Meet, link para agregar a su calendario, datos de contacto) → avisa internamente → programa los dos recordatorios (24h y 2h antes) usando nodos `Wait`. |
| `03-cita-efectiva.json` | Escucha el webhook de cambios de columna de Monday → si el estatus cambia manualmente a **"Cita Efectiva"**, envía el correo de agradecimiento por la sesión. |

> **Nota sobre el paso 3 del proceso descrito:** el correo de confirmación con día/hora de la reunión solo puede enviarse **después** de que el lead agenda su llamada en Calendly (el formulario de la landing no captura fecha/hora, solo lo redirige a Calendly). Por eso separé "registro" (workflow 01) de "confirmación de cita" (workflow 02) — son dos eventos distintos en el tiempo, aunque para el usuario se sienten como un solo flujo continuo.

## Antes de activar los workflows, necesitas configurar:

### 1. Credencial de Monday.com
Crea en n8n una credencial **Header Auth** llamada `Monday API Token`:
- Header name: `Authorization`
- Header value: tu API token de Monday (Avatar → Administration → API)

### 2. Credencial SMTP
Crea una credencial **SMTP** llamada `SMTP Loreto` con el correo desde el que se enviarán los avisos (`hello@loretoconsultora.lat` o el que prefieras). Si usas Gmail/Google Workspace necesitas una contraseña de aplicación.

### 3. IDs de tablero y de columna en Monday
En cada archivo busca y reemplaza:
- `TODO_BOARD_ID_VICTORIA_PROFESIONAL` / `_ELITE` / `_JOVEN` → el ID numérico del tablero correspondiente (se ve en la URL del tablero).
- Los IDs de columna usados como ejemplo (`text_correo`, `text_telefono`, `text_empresa`, `text_ciudad`, `text_tipo_organizacion`, `status_lead`, `fecha_cita`, `text_meet_link`) son **nombres genéricos** — debes reemplazarlos por los IDs reales de tus columnas. Para verlos: abre la columna en Monday → "..." → "More options" → en la URL/API aparece el `column_id` real, o usa el endpoint `boards(ids:[ID]){columns{id title}}` en el API Playground de Monday.
- El estatus debe tener exactamente la etiqueta `"Cita Efectiva"` para que el workflow 03 lo detecte — si tu columna usa otro texto, ajústalo en el nodo `¿Cambió a Cita Efectiva?`.

### 4. Webhook de cambio de estatus en Monday (workflow 03)
Monday no te deja crear este webhook desde la UI fácilmente — créalo vía API una vez que tengas la URL del webhook de n8n (la verás en el nodo "Webhook Monday Status" tras activar el workflow):

```graphql
mutation {
  create_webhook (
    board_id: TODO_BOARD_ID,
    url: "https://TU-INSTANCIA-N8N.com/webhook/victoria-academy-profesional-monday-status",
    event: change_column_value,
    config: "{\"columnId\":\"status_lead\"}"
  ) { id }
}
```
Monday enviará un "challenge" la primera vez para verificar la URL — el workflow ya lo responde automáticamente (nodo "Responder Challenge").

### 5. Webhook de Calendly (workflow 02)
En Calendly → Integrations → Webhooks, crea una suscripción al evento **invitee.created**, filtrada por el Event Type de cada programa, apuntando a:
```
https://TU-INSTANCIA-N8N.com/webhook/victoria-academy-profesional-calendly
```
(sustituye `profesional` por `elite`/`joven` según el archivo).

> **Importante para VictorIA Elite:** el código actual de la landing (`src/app/victoria-academy/elite/page.tsx`) tiene `calendlyUrl=""` — es decir, hoy Elite no muestra botón de Calendly tras el registro. Si quieres que Elite siga este mismo flujo de cita + recordatorios, hay que configurar `NEXT_PUBLIC_CALENDLY_ELITE` en el sitio y pasar esa URL al formulario (igual que Profesional/Joven). Si no, el workflow 02/03 de Elite quedará sin disparador real hasta que se haga ese cambio.

### 6. URLs de los webhooks de registro (workflow 01)
Deben coincidir con las variables de entorno ya usadas en el sitio:
- `NEXT_PUBLIC_N8N_VICTORIA_PROFESIONAL_WEBHOOK` → URL del webhook de `victoria-profesional/01-registro.json`
- `NEXT_PUBLIC_N8N_VICTORIA_ELITE_WEBHOOK` → URL del webhook de `victoria-elite/01-registro.json`
- `NEXT_PUBLIC_N8N_VICTORIA_JOVEN_WEBHOOK` → URL del webhook de `victoria-joven/01-registro.json`

### 7. Segundo correo interno (paso 4 del proceso)
Mencionaste un segundo correo además de `hello@loretoconsultora.lat` pero no llegó la dirección — por ahora todos los avisos internos solo van a `hello@loretoconsultora.lat`. Si me das la segunda dirección la agrego a los nodos `Notificación Interna...` (o puedes añadirla tú mismo separando direcciones con coma en el campo "To Email" de esos nodos).

## Activar
Una vez configurado todo lo anterior, activa los 3 workflows de cada carpeta (toggle "Active" arriba a la derecha en n8n).
