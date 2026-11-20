import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

// Panamá: azul marino + rojo panameño, gradiente cálido y profundo
const config: EventoConfig = {
  pais: "Panamá",
  bandera: "🇵🇦",
  ciudad: "Ciudad de Panamá",
  ladaDefault: "+507",
  titulo: "Networking & Masterclass Digital · Panamá",
  masterclass: "Publicidad Digital que sí convierte: El método para escalar tu negocio este 2027",
  subtitulo: "Un evento en línea exclusivo para mexicanos emprendedores, empresarios y marcas personales que están construyendo desde Panamá. Conecta, aprende y escala tu negocio.",
  fechaTexto: "Jueves 3 de diciembre",
  horarioLocal: "7:00 pm hora local",
  horarioCDMX: "6:00 pm CDMX",
  portadaSrc: "/eventos/portada-panama.webp",
  videoBgSrc: "/eventos/video-redes.mp4",
  gradiente: "linear-gradient(135deg, #0a0a2e 0%, #1a3a7c 50%, #c0001a 100%)",
  accentHex: "#1a3a7c",
  gradienteCard: "linear-gradient(135deg, #f0f2ff 0%, #fff0f2 100%)",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Panamá · Loreto Consultora",
  description: "Jueves 17 de diciembre en Ciudad de Panamá. Evento presencial para mexicanos emprendedores en Panamá. Networking + Masterclass: Tu negocio en piloto automático con IA y WhatsApp.",
};

export default function EventoPanamaPage() {
  return <EventoNetworking config={config} />;
}
