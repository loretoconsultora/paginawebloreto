import { createClient } from "@/lib/supabase/server";
import RecursosView from "./RecursosView";

export default async function RecursosPage() {
  const supabase = await createClient();

  const { data: cliente } = await supabase
    .from("clientes")
    .select("id")
    .single();

  const { data: recursos } = cliente
    ? await supabase
        .from("recursos")
        .select("id, titulo, descripcion, url, tipo, creado_en")
        .eq("cliente_id", cliente.id)
        .order("creado_en", { ascending: false })
    : { data: null };

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-grafito mb-1">Recursos</h1>
      <p className="text-grafito/50 text-sm mb-8">Links, materiales y videos compartidos por el equipo</p>

      <RecursosView recursos={recursos ?? []} />
    </div>
  );
}
