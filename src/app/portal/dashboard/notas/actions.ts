"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const CATEGORIAS_VALIDAS = ["publicidad", "local", "app", "contenido", "otros"];

export async function crearNota(formData: FormData) {
  const supabase = await createClient();

  const { data: cliente } = await supabase.from("clientes").select("id").single();
  if (!cliente) return;

  const contenido = (formData.get("contenido") as string | null)?.trim();
  if (!contenido) return;

  const titulo = (formData.get("titulo") as string | null)?.trim() || null;
  const categoriaRaw = formData.get("categoria") as string | null;
  const categoria = CATEGORIAS_VALIDAS.includes(categoriaRaw ?? "") ? categoriaRaw : "otros";

  const { data: userData } = await supabase.auth.getUser();
  const autor = userData.user?.email ?? "Cliente";

  await supabase.from("notas").insert({ cliente_id: cliente.id, titulo, contenido, categoria, autor });

  revalidatePath("/portal/dashboard/notas");
}

export async function eliminarNota(id: string) {
  const supabase = await createClient();
  await supabase.from("notas").delete().eq("id", id);
  revalidatePath("/portal/dashboard/notas");
}
