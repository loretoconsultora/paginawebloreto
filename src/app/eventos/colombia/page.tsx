import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

// Colombia: amarillo dorado + azul intenso, referencia al tricolor
const config: EventoConfig = {
  pais: "Colombia",
  bandera: "🇨🇴",
  ciudad: "Bogotá",
  ladaDefault: "+57",
  titulo: "Networking & Masterclass Digital · Colombia",
  masterclass: "Tu negocio en piloto automático: IA en tu Marketing, Ventas y Operaciones",
  subtitulo: "Un evento en línea exclusivo para mexicanos emprendedores, empresarios y marcas personales que están construyendo desde Colombia. Conecta, aprende y escala tu negocio.",
  fechaTexto: "Miércoles 2 de diciembre",
  horarioLocal: "7:00 pm hora local",
  horarioCDMX: "6:00 pm CDMX",
  gradiente: "linear-gradient(135deg, #1a1200 0%, #c48000 50%, #f5c842 100%)",
  accentHex: "#c48000",
  gradienteCard: "linear-gradient(135deg, #fffdf0 0%, #fff9e0 100%)",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Colombia · Loreto Consultora",
  description: "Jueves 3 de diciembre en Bogotá. Evento presencial para mexicanos emprendedores en Colombia. Networking + Masterclass: Ads que sí convierten en 2027.",
};

export default function EventoColombiaPage() {
  return <EventoNetworking config={config} />;
}
