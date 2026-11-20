import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

const config: EventoConfig = {
  pais: "Panamá",
  bandera: "🇵🇦",
  ciudad: "Ciudad de Panamá",
  ladaDefault: "+507",
  titulo: "Networking & Masterclass Digital · Panamá",
  masterclass: "Publicidad Digital que sí convierte: El método para escalar tu negocio este 2027",
  subtitulo: "Panamá es el hub de negocios de Latam. Un evento en línea para mexicanos emprendedores que quieren usar la publicidad digital como su mejor vendedor.",
  fechaTexto: "Jueves 3 de diciembre",
  horarioLocal: "7:00 pm hora local",
  horarioCDMX: "6:00 pm CDMX",
  portadaSrc: "/eventos/portada-panama.webp",
  gradiente: "linear-gradient(135deg, #0a0a2e 0%, #1a3a7c 50%, #c0001a 100%)",
  accentHex: "#1a3a7c",
  gradienteCard: "linear-gradient(135deg, #f0f2ff 0%, #fff0f2 100%)",

  porQueAhoraTitle: "Panamá es uno de los mercados más competitivos de Latam. La publicidad digital ya no es opcional.",
  porQueAhora: [
    {
      antes: "Los anuncios llegaban a todo el mundo sin tanto esfuerzo.",
      hoy: "El algoritmo premia la relevancia. Sin estrategia, tu presupuesto se va sin resultados.",
    },
    {
      antes: "Con una buena imagen era suficiente para atraer clientes.",
      hoy: "Necesitas copy, segmentación precisa y una oferta clara para que el anuncio convierta.",
    },
    {
      antes: "Publicar un anuncio era sencillo: imagen, texto y listo.",
      hoy: "Dominar creativos, audiencias, pixel y optimización al mismo tiempo marca la diferencia entre crecer o estancarse.",
    },
  ],

  problemas: [
    { num: "01", titulo: "Tienes negocio en uno de los mercados más activos de Latam, pero no estás capturando esa oportunidad.", texto: "La competencia por la atención digital en Panamá es alta y crece cada año." },
    { num: "02", titulo: "Gastas en publicidad sin saber qué está fallando.", texto: "Creativo, audiencia, oferta, copy: si no sabes cuál es el problema, no puedes arreglarlo." },
    { num: "03", titulo: "Tu marca no tiene la presencia digital que su calidad merece.", texto: "Un buen producto sin visibilidad no vende." },
  ],

  loQueTeLlevas: [
    "Las últimas estrategias y buenas prácticas en Meta Ads para escalar en Panamá",
    "El método para definir tu audiencia ideal: segmentación que baja el costo por lead",
    "Estrategias creativas para anuncios que generan clics y conversiones",
    "Conexiones con mexicanos emprendedores que están construyendo en Panamá",
  ],

  faq: [
    { q: "¿Tiene algún costo?", a: "Totalmente gratuito. Solo necesitas registrarte para asegurar tu lugar, ya que el cupo es limitado." },
    { q: "¿Necesito tener experiencia en publicidad digital?", a: "No es necesario. El evento está pensado para emprendedores que quieren aprender a usar Meta Ads con criterio, desde cero o para mejorar lo que ya hacen." },
    { q: "¿Dónde se realiza?", a: "Es un evento en línea por Google Meet. Recibirás el enlace en tu correo después de registrarte." },
    { q: "¿Puedo compartirlo con alguien más?", a: "Sí, siempre que la otra persona se registre por separado." },
  ],

  ctaFinalTexto: "Panamá es tierra de negocios. ¿Tu publicidad digital está a la altura?\nEsta noche te damos el método.",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Panamá · Loreto Consultora",
  description: "Jueves 3 de diciembre. Evento en línea para mexicanos emprendedores en Panamá. Networking + Masterclass: Publicidad Digital que sí convierte.",
};

export default function EventoPanamaPage() {
  return <EventoNetworking config={config} />;
}
