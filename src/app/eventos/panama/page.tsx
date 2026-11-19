import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

const config: EventoConfig = {
  pais: "Panamá",
  bandera: "🇵🇦",
  ciudad: "Ciudad de Panamá",
  ladaDefault: "+507",
  titulo: "Networking & Masterclass Digital · Panamá",
  subtitulo: "Un evento presencial exclusivo para mexicanos emprendedores, empresarios y marcas personales que están construyendo desde Panamá. Conecta, aprende y escala tu negocio en 2027.",
  fechaTexto: "Próximamente — fecha por confirmar",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Panamá · Loreto Consultora",
  description: "Evento presencial exclusivo para mexicanos emprendedores y marcas personales en Panamá. Networking de alto nivel + Masterclass Digital para escalar tu negocio en 2027.",
};

export default function EventoPanamaPage() {
  return <EventoNetworking config={config} />;
}
