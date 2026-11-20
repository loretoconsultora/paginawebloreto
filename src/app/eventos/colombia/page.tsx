import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

const config: EventoConfig = {
  pais: "Colombia",
  bandera: "🇨🇴",
  ciudad: "Bogotá",
  ladaDefault: "+57",
  titulo: "Networking & Masterclass Digital · Colombia",
  masterclass: "Tu negocio en piloto automático: IA en tu Marketing, Ventas y Operaciones",
  subtitulo: "Una noche de networking y masterclass para mexicanos que están construyendo desde Colombia. Aprende cómo la IA puede hacer que tu negocio trabaje para ti.",
  fechaTexto: "Miércoles 2 de diciembre",
  horarioLocal: "7:00 pm hora local",
  horarioCDMX: "6:00 pm CDMX",
  portadaSrc: "/eventos/portada-colombia.webp",
  gradiente: "linear-gradient(135deg, #1a1200 0%, #c48000 50%, #f5c842 100%)",
  accentHex: "#c48000",
  gradienteCard: "linear-gradient(135deg, #fffdf0 0%, #fff9e0 100%)",

  porQueAhoraAccent: "#f5c842",
  porQueAhoraTitle: "Colombia tiene uno de los mercados digitales de más rápido crecimiento en Latam. ¿Tu negocio está listo?",
  porQueAhora: [
    {
      antes: "Gestionar tu negocio tomaba todo tu día.",
      hoy: "Con IA delegas las tareas repetitivas y te enfocas en lo que realmente hace crecer tu marca.",
    },
    {
      antes: "Tomar decisiones de marketing requería tiempo y experiencia que no siempre tenías.",
      hoy: "La IA te da datos, análisis y claridad en segundos para crear campañas y tomar decisiones con criterio.",
    },
    {
      antes: "Seguir a cada lead era imposible sin un equipo.",
      hoy: "Un CRM con IA hace el seguimiento automático y te avisa cuándo actuar.",
    },
  ],

  problemas: [
    { num: "01", titulo: "Pasas más tiempo en el negocio que construyendo el negocio.", texto: "La operación te consume y el crecimiento queda pendiente." },
    { num: "02", titulo: "Tu negocio no es visible donde están tus clientes ideales.", texto: "Colombia tiene un ecosistema digital enorme — y aún hay oportunidad de posicionarte antes de que el mercado se sature." },
    { num: "03", titulo: "Sabes que necesitas automatizar, pero no sabes por dónde empezar.", texto: "Cada herramienta parece complicada y el tiempo para aprenderla no aparece." },
    { num: "04", titulo: "Sin red local, construyes más despacio.", texto: "El networking es uno de los activos más valiosos de un emprendedor — y en el exterior, es más difícil de cultivar." },
  ],

  loQueTeLlevas: [
    "El método y pasos para implementar IA en tu negocio: criterios, checklist y ruta de acción",
    "Cómo usar IA para generar datos, tomar mejores decisiones y crear campañas con criterio",
    "Automatización de seguimiento de leads con un CRM inteligente",
    "Una red de mexicanos emprendedores que entienden tu contexto",
  ],

  faq: [
    { q: "¿Tiene algún costo?", a: "Totalmente gratuito. Solo necesitas registrarte para asegurar tu lugar, ya que el cupo es limitado." },
    { q: "¿Necesito saber de tecnología?", a: "No. El evento está diseñado para emprendedores, no para técnicos. Todo lo que se presente es aplicable desde el día siguiente." },
    { q: "¿Dónde se realiza?", a: "Es un evento en línea por Google Meet. Recibirás el enlace en tu correo después de registrarte." },
    { q: "¿Puedo compartirlo con alguien más?", a: "Sí, siempre que la otra persona se registre por separado." },
  ],

  ctaFinalTexto: "Hay emprendedores mexicanos en Colombia que ya están usando IA para trabajar menos y vender más.\nEsta noche puedes ser uno de ellos.",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Colombia · Loreto Consultora",
  description: "Miércoles 2 de diciembre. Evento en línea para mexicanos emprendedores en Colombia. Networking + Masterclass: Tu negocio en piloto automático con IA.",
};

export default function EventoColombiaPage() {
  return <EventoNetworking config={config} />;
}
