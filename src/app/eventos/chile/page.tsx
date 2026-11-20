import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

const config: EventoConfig = {
  pais: "Chile",
  bandera: "🇨🇱",
  ciudad: "Santiago de Chile",
  ladaDefault: "+56",
  titulo: "Networking & Masterclass Digital · Chile",
  masterclass: "Publicidad Digital que sí convierte: El método para escalar tu negocio este 2027",
  subtitulo: "Deja de gastar en anuncios que no funcionan. Un evento en línea para mexicanos emprendedores en Chile que quieren crecer con publicidad digital que realmente convierte.",
  fechaTexto: "Jueves 3 de diciembre",
  horarioLocal: "7:00 pm hora local",
  horarioCDMX: "4:00 pm CDMX",
  portadaSrc: "/eventos/portada-chile.webp",
  gradiente: "linear-gradient(135deg, #1a0808 0%, #c0001a 50%, #e84055 100%)",
  accentHex: "#c0001a",
  gradienteCard: "linear-gradient(135deg, #fff5f5 0%, #fff0f2 100%)",

  porQueAhoraAccent: "#e84055",
  porQueAhoraTitle: "La publicidad digital cambió. Los que siguen con el método de 2022 están quemando dinero.",
  porQueAhora: [
    {
      antes: "Los anuncios de Facebook alcanzaban a todo el mundo sin tanto esfuerzo.",
      hoy: "El algoritmo premia la relevancia. Sin estrategia, tu presupuesto desaparece sin resultados.",
    },
    {
      antes: "Con un buen diseño era suficiente para vender.",
      hoy: "Necesitas copy, audiencia bien segmentada y una oferta clara — o el anuncio más bonito no convierte.",
    },
    {
      antes: "Publicar un anuncio era sencillo: imagen, texto y listo.",
      hoy: "Hoy hay que dominar segmentación, creativos, copy, pixel y optimización — todo a la vez.",
    },
  ],

  problemas: [
    { num: "01", titulo: "Inviertes en anuncios, pero no sabes qué está funcionando.", texto: "Ves gastos, no aprendes. El ciclo se repite cada mes." },
    { num: "02", titulo: "Tu negocio en Chile no tiene la visibilidad que merece.", texto: "Tienes un producto o servicio de valor — pero los clientes correctos aún no te encuentran." },
    { num: "03", titulo: "Dependes de recomendaciones para conseguir clientes.", texto: "El boca a boca no escala. Necesitas un sistema de adquisición predecible." },
  ],

  loQueTeLlevas: [
    "Las últimas estrategias y buenas prácticas en Meta Ads para el mercado latinoamericano",
    "El método para definir tu audiencia ideal: segmentación real que reduce el costo por lead",
    "Estrategias creativas para anuncios que detienen el scroll y generan clics",
    "Conexiones con mexicanos emprendedores que están escalando en Chile",
  ],

  faq: [
    { q: "¿Tiene algún costo?", a: "Totalmente gratuito. Solo necesitas registrarte para asegurar tu lugar, ya que el cupo es limitado." },
    { q: "¿Necesito tener experiencia en publicidad digital?", a: "No es necesario. El evento está pensado para emprendedores que quieren aprender a usar Meta Ads con criterio, desde cero o para mejorar lo que ya hacen." },
    { q: "¿Dónde se realiza?", a: "Es un evento en línea por Google Meet. Recibirás el enlace en tu correo después de registrarte." },
    { q: "¿Puedo compartirlo con alguien más?", a: "Sí, siempre que la otra persona se registre por separado." },
  ],

  ctaFinalTexto: "Tu siguiente cliente está en internet. El problema no es el presupuesto — es no saber cómo encontrarlo.\nEsta noche cambia eso.",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Chile · Loreto Consultora",
  description: "Jueves 3 de diciembre. Evento en línea para mexicanos emprendedores en Chile. Networking + Masterclass: Publicidad Digital que sí convierte.",
};

export default function EventoChilePage() {
  return <EventoNetworking config={config} />;
}
