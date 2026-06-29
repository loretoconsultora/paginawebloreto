# Workflows de n8n — VictorIA Academy

Workflows de n8n listos para **importar** (Workflows → Import from File) para los 3 programas de VictorIA Academy.

- **Profesional** y **Joven** sí agendan llamada por Calendly → tienen 3 workflows cada uno.
- **Elite** hoy **no** tiene Calendly conectado en su landing (no hay cita real, solo lista de espera) → tiene un solo workflow.

| Carpeta / Archivo | Qué hace |
|---|---|
| `victoria-profesional/01-registro.json`, `victoria-joven/01-registro.json` | Webhook del formulario → crea el item en Monday → correo HTML interno de nuevo lead (a `hello@loretoconsultora.lat` y `paola.gv.victoranza@gmail.com`). |
| `victoria-profesional/02-confirmacion-cita-calendly.json`, `victoria-joven/02-confirmacion-cita-calendly.json` | Se dispara cuando el lead agenda en Calendly (`invitee.created`) → actualiza el item en Monday con la cita → correo de confirmación al lead (día, hora, Google Meet, link para agregar a calendario, datos de contacto) → aviso interno → programa los recordatorios de 24h y 2h antes con nodos `Wait`. |
| `victoria-profesional/03-cita-efectiva.json`, `victoria-joven/03-cita-efectiva.json` | Escucha el webhook de cambio de columna de Monday → si el estatus pasa a **"Cita Efectiva"**, envía el correo de agradecimiento por la sesión. |
| `victoria-elite/01-registro.json` | Webhook del formulario → crea el item en Monday con estatus "Lista de Espera" → correo al lead confirmando que quedó en lista de espera (sin día/hora, ya que no hay cita) → aviso interno. **No** incluye recordatorios de 24h/2h ni el flujo de "Cita Efectiva", porque Elite no agenda citas — solo se contacta por WhatsApp manualmente. Si en el futuro Elite agenda con Calendly, dímelo y le agrego los mismos workflows 02/03 que Profesional y Joven.

> **Nota sobre el correo de confirmación de cita:** solo puede enviarse **después** de que el lead agenda en Calendly (el formulario de la landing no captura fecha/hora). Por eso "registro" (01) y "confirmación de cita" (02) son workflows separados, aunque para el usuario final se sienten como un solo flujo continuo.

## Cómo darme las credenciales y los IDs de tablero

**Las credenciales (token de Monday, usuario/contraseña SMTP) nunca se guardan dentro del archivo del workflow** — n8n las guarda cifradas por separado, y el workflow solo las referencia por nombre. Así que no hace falta (ni sirve) pegármelas a mí; se configuran directamente en la app de n8n:

1. Entra a tu instancia de n8n → menú izquierdo **Credentials** → **+ Add Credential**.
2. **Credencial de Monday:**
   - Busca el tipo **"Header Auth"**.
   - Name (nombre de la credencial): `Monday API Token` — debe llamarse exactamente así para que coincida con lo que ya referencian los workflows, o si le pones otro nombre, solo tendrás que re-seleccionarla en cada nodo HTTP Request después de importar.
   - Header Name: `Authorization`
   - Header Value: tu API token de Monday (lo sacas en Monday: tu avatar → **Administration** → **API**, o Perfil → **Developers** → **My access tokens**).
3. **Credencial SMTP:**
   - Busca el tipo **"SMTP"**.
   - Name: `SMTP Loreto`.
   - Host, puerto, usuario y contraseña del correo que enviará los avisos (`hello@loretoconsultora.lat` u otro). Si usas Gmail/Google Workspace, necesitas una "contraseña de aplicación", no la contraseña normal de la cuenta.
4. Importa los workflows (paso siguiente) y en cada nodo que diga `credentials: { "id": "TODO" }` (los HTTP Request de Monday y los Email Send) selecciona la credencial real desde el dropdown — n8n te lo va a pedir automáticamente la primera vez que abras cada nodo después de importar, marcándolo en rojo si falta.

**Lo único que sí puedes darme para que lo incluya directo en los archivos son los 3 IDs de tablero de Monday** (no son secretos, son solo números que se ven en la URL del tablero, ej. `https://tuempresa.monday.com/boards/1234567890` → el ID es `1234567890`). Pásame:
- ID del tablero VictorIA Profesional
- ID del tablero VictorIA Elite
- ID del tablero VictorIA Joven

y te regreso los 7 archivos con `TODO_BOARD_ID_VICTORIA_PROFESIONAL` / `_ELITE` / `_JOVEN` ya reemplazados por los IDs reales.

## Otros TODOs que quedan pendientes (no son secretos, pero sí necesito que me los confirmes o los ajustes tú mismo en Monday):

### IDs de columna
Los nombres de columna usados en los workflows (`text_correo`, `text_telefono`, `text_empresa`, `text_ciudad`, `text_tipo_organizacion`, `status_lead`, `fecha_cita`, `text_meet_link`) son **genéricos** — debes reemplazarlos por los IDs reales de cada tablero. Para verlos: en Monday, abre el tablero → "..." en la columna → o usa el GraphQL Playground de Monday con `{ boards(ids:[ID]){ columns { id title } } }`. Si me pasas esa lista de columnas con sus IDs reales, te regreso los archivos ya completos también en esa parte.

### Estatus exacto "Cita Efectiva"
Para que el workflow 03 detecte el cambio, la etiqueta del estatus en Monday debe decir exactamente `"Cita Efectiva"`. Si la tuya dice distinto, dímelo y lo ajusto.

### Webhook de cambio de estatus en Monday (workflow 03, Profesional/Joven)
Una vez que tengas la URL pública del webhook de n8n (aparece en el nodo "Webhook Monday Status" después de activar el workflow), créalo en Monday vía API:

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
Monday manda un "challenge" la primera vez para verificar la URL — el workflow ya lo responde automáticamente.

### Webhook de Calendly (workflow 02, Profesional/Joven)
En Calendly → Integrations → Webhooks, crea una suscripción al evento **invitee.created**, filtrada por el Event Type de cada programa, apuntando a:
```
https://TU-INSTANCIA-N8N.com/webhook/victoria-academy-profesional-calendly
```
(sustituye `profesional` por `joven` según el archivo).

### URLs de los webhooks de registro (workflow 01, los 3 programas)
Deben coincidir con las variables de entorno ya usadas en el sitio:
- `NEXT_PUBLIC_N8N_VICTORIA_PROFESIONAL_WEBHOOK` → URL del webhook de `victoria-profesional/01-registro.json`
- `NEXT_PUBLIC_N8N_VICTORIA_ELITE_WEBHOOK` → URL del webhook de `victoria-elite/01-registro.json`
- `NEXT_PUBLIC_N8N_VICTORIA_JOVEN_WEBHOOK` → URL del webhook de `victoria-joven/01-registro.json`

## Activar
Una vez configurado todo lo anterior, activa cada workflow (toggle "Active" arriba a la derecha en n8n).
