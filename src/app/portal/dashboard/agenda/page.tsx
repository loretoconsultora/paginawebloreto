import { createClient } from "@/lib/supabase/server";
import AgendaView from "./AgendaView";

export default async function AgendaPage() {
  const supabase = await createClient();

  const { data: cliente } = await supabase.from("clientes").select("id").single();

  const { data: eventos } = cliente
    ? await supabase
        .from("eventos_calendario")
        .select("id, titulo, descripcion, fecha, tipo, emoji")
        .eq("cliente_id", cliente.id)
        .order("fecha", { ascending: true })
    : { data: null };

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-grafito mb-1">Agenda</h1>
      <p className="text-grafito/50 text-sm mb-8">
        Reuniones, producciones, revisiones y sesiones especiales
      </p>

      <AgendaView eventos={eventos ?? []} />
    </div>
  );
}
