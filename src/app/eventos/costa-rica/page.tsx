import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

const config: EventoConfig = {
  pais: "Costa Rica",
  bandera: "🇨🇷",
  ciudad: "San José",
  ladaDefault: "+506",
  titulo: "Networking & Masterclass Digital · Costa Rica",
  masterclass: "Tu negocio en piloto automático: IA en tu Marketing, Ventas y Operaciones",
  subtitulo: "Un evento en línea exclusivo para mexicanos emprendedores, empresarios y marcas personales que están construyendo desde Costa Rica. Conecta, aprende y aplica desde mañana.",
  fechaTexto: "Jueves 26 de noviembre",
  horarioLocal: "7:00 pm hora local",
  horarioCDMX: "7:00 pm CDMX",
  portadaSrc: "/eventos/portada-costa-rica.webp",
  gradiente: "linear-gradient(135deg, #0a2240 0%, #005fa3 50%, #00b4a0 100%)",
  accentHex: "#005fa3",
  gradienteCard: "linear-gradient(135deg, #f0f7ff 0%, #e6faf8 100%)",

  porQueAhoraTitle: "El juego cambió. Los que se mueven ahora van a liderar 2027.",
  porQueAhora: [
    {
      antes: "La IA era para corporativos con presupuesto.",
      hoy: "Cualquier emprendedor puede automatizar su negocio con herramientas gratis o de bajo costo.",
    },
    {
      antes: "Contestabas mensajes de clientes a las 11 de la noche.",
      hoy: "Un sistema de IA califica leads, responde y agenda sin que tú muevas un dedo.",
    },
    {
      antes: "Crear contenido tomaba horas y no siempre funcionaba.",
      hoy: "Con IA generas contenido que conecta con tu audiencia en minutos, no en días.",
    },
  ],

  problemas: [
    { num: "01", titulo: "Trabajas el doble, pero no creces el doble.", texto: "Tu negocio depende de que tú estés presente en cada paso. Si te ausentas, todo se frena." },
    { num: "02", titulo: "Tienes clientes, pero no un sistema.", texto: "Cada venta requiere tu tiempo completo. No es escalable, y lo sabes." },
    { num: "03", titulo: "Escuchas hablar de IA, pero no sabes por dónde empezar.", texto: "Hay demasiada información y no tienes tiempo de probar todo." },
    { num: "04", titulo: "Tu competencia ya se está moviendo.", texto: "Algunos negocios en tu nicho ya automatizan. Cada mes que pasa, la brecha crece." },
  ],

  loQueTeLlevas: [
    "El método y pasos para implementar IA en tu negocio: criterios, checklist y ruta de acción",
    "Ejemplos contundentes de cómo eficientar tus operaciones con IA",
    "Una red de mexicanos emprendedores que entienden tu contexto",
  ],

  faq: [
    { q: "¿Tiene algún costo?", a: "Totalmente gratuito. Solo necesitas registrarte para asegurar tu lugar, ya que el cupo es limitado." },
    { q: "¿Necesito saber de tecnología?", a: "No. El evento está diseñado para emprendedores, no para técnicos. Todo lo que se presente es aplicable desde el día siguiente." },
    { q: "¿Dónde se realiza?", a: "Es un evento en línea por Google Meet. Recibirás el enlace en tu correo después de registrarte." },
    { q: "¿Puedo compartirlo con alguien más?", a: "Sí, siempre que la otra persona se registre por separado." },
  ],

  ctaFinalTexto: "Tu negocio no tiene que depender de que tú estés ahí en todo momento.\nEl primer paso es esta noche.",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Costa Rica · Loreto Consultora",
  description: "Jueves 26 de noviembre. Evento en línea para mexicanos emprendedores en Costa Rica. Networking + Masterclass: Tu negocio en piloto automático con IA.",
};

export default function EventoCostaRicaPage() {
  return <EventoNetworking config={config} />;
}
