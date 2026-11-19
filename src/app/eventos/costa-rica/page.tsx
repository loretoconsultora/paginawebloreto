import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

// Costa Rica: azul costarricense + verde caribeño, con base oscura Loreto
const config: EventoConfig = {
  pais: "Costa Rica",
  bandera: "🇨🇷",
  ciudad: "San José",
  ladaDefault: "+506",
  titulo: "Networking & Masterclass Digital · Costa Rica",
  masterclass: "Tu negocio en piloto automático: IA y WhatsApp para atender, cotizar y dar seguimiento",
  subtitulo: "Un evento presencial exclusivo para mexicanos emprendedores, empresarios y marcas personales que están construyendo desde Costa Rica. Conecta, aprende y escala tu negocio.",
  fechaTexto: "Jueves 26 de noviembre",
  horarioLocal: "7:00 pm hora local",
  horarioCDMX: "7:00 pm CDMX",
  gradiente: "linear-gradient(135deg, #0a2240 0%, #005fa3 50%, #00b4a0 100%)",
  accentHex: "#005fa3",
  gradienteCard: "linear-gradient(135deg, #f0f7ff 0%, #e6faf8 100%)",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Costa Rica · Loreto Consultora",
  description: "Jueves 26 de noviembre en San José. Evento presencial para mexicanos emprendedores en Costa Rica. Networking + Masterclass: Tu negocio en piloto automático con IA y WhatsApp.",
};

export default function EventoCostaRicaPage() {
  return <EventoNetworking config={config} />;
}
