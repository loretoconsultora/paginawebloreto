import EventoNetworking, { EventoConfig } from "@/components/EventoNetworking";

// Chile: rojo vivo + azul andino, referencia a la bandera chilena
const config: EventoConfig = {
  pais: "Chile",
  bandera: "🇨🇱",
  ciudad: "Santiago de Chile",
  ladaDefault: "+56",
  titulo: "Networking & Masterclass Digital · Chile",
  masterclass: "Publicidad Digital que sí convierte: El método para escalar tu negocio este 2027",
  subtitulo: "Un evento en línea exclusivo para mexicanos emprendedores, empresarios y marcas personales que están construyendo desde Chile. Conecta, aprende y escala tu negocio.",
  fechaTexto: "Jueves 3 de diciembre",
  horarioLocal: "7:00 pm hora local",
  horarioCDMX: "4:00 pm CDMX",
  portadaSrc: "/eventos/portada-chile.webp",
  gradiente: "linear-gradient(135deg, #1a0808 0%, #c0001a 50%, #e84055 100%)",
  accentHex: "#c0001a",
  gradienteCard: "linear-gradient(135deg, #fff5f5 0%, #fff0f2 100%)",
};

export const metadata = {
  title: "Networking & Masterclass Digital · Chile · Loreto Consultora",
  description: "Jueves 10 de diciembre en Santiago. Evento presencial para mexicanos emprendedores en Chile. Networking + Masterclass: Ads que sí convierten y cómo invertir tus primeros pesos.",
};

export default function EventoChilePage() {
  return <EventoNetworking config={config} />;
}
