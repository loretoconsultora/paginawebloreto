import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

const config: EventoConfig = {
  pais: "Colombia",
  bandera: "🇨🇴",
  ciudad: "Bogotá",
  ladaDefault: "+57",
  titulo: "Networking & Masterclass Digital · Colombia",
  subtitulo: "Un evento presencial exclusivo para mexicanos emprendedores, empresarios y marcas personales que están construyendo desde Colombia. Conecta, aprende y escala tu negocio en 2027.",
  fechaTexto: "Próximamente — fecha por confirmar",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Colombia · Loreto Consultora",
  description: "Evento presencial exclusivo para mexicanos emprendedores y marcas personales en Colombia. Networking de alto nivel + Masterclass Digital para escalar tu negocio en 2027.",
};

export default function EventoColombiaPage() {
  return <EventoNetworking config={config} />;
}
