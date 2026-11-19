import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

const config: EventoConfig = {
  pais: "Costa Rica",
  bandera: "🇨🇷",
  ciudad: "San José",
  ladaDefault: "+506",
  titulo: "Networking & Masterclass Digital · Costa Rica",
  subtitulo: "Un evento presencial exclusivo para mexicanos emprendedores, empresarios y marcas personales que están construyendo desde Costa Rica. Conecta, aprende y escala tu negocio en 2027.",
  fechaTexto: "Próximamente — fecha por confirmar",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Costa Rica · Loreto Consultora",
  description: "Evento presencial exclusivo para mexicanos emprendedores y marcas personales en Costa Rica. Networking de alto nivel + Masterclass Digital para escalar tu negocio en 2027.",
};

export default function EventoCostaRicaPage() {
  return <EventoNetworking config={config} />;
}
