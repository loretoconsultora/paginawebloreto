import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

const config: EventoConfig = {
  pais: "Chile",
  bandera: "🇨🇱",
  ciudad: "Santiago de Chile",
  ladaDefault: "+56",
  titulo: "Networking & Masterclass Digital · Chile",
  subtitulo: "Un evento presencial exclusivo para mexicanos emprendedores, empresarios y marcas personales que están construyendo desde Chile. Conecta, aprende y escala tu negocio en 2027.",
  fechaTexto: "Próximamente — fecha por confirmar",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Chile · Loreto Consultora",
  description: "Evento presencial exclusivo para mexicanos emprendedores y marcas personales en Chile. Networking de alto nivel + Masterclass Digital para escalar tu negocio en 2027.",
};

export default function EventoChilePage() {
  return <EventoNetworking config={config} />;
}
