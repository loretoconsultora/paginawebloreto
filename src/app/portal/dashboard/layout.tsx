import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "./DashboardSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: "#F7F5F8" }}>
      <DashboardSidebar email={user.email ?? ""} />
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-10">{children}</main>
    </div>
  );
}
