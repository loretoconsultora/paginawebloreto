import { createClient } from "@/lib/supabase/server";
import NotasView from "./NotasView";

export default async function NotasPage() {
  const supabase = await createClient();

  const { data: cliente } = await supabase
    .from("clientes")
    .select("id")
    .single();

  const { data: notas } = cliente
    ? await supabase
        .from("notas")
        .select("id, titulo, contenido, autor, categoria, creado_en")
        .eq("cliente_id", cliente.id)
        .order("creado_en", { ascending: false })
    : { data: null };

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-grafito mb-1">Notas</h1>
      <p className="text-grafito/50 text-sm mb-8">Ideas y notas de seguimiento del equipo</p>

      <NotasView notas={notas ?? []} />
    </div>
  );
}
