"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Calendar, FileBarChart2, StickyNote, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const GRADIENT = "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)";

const LINKS = [
  { href: "/portal/dashboard", label: "Panel general", icon: LayoutDashboard },
  { href: "/portal/dashboard/calendario", label: "Calendario", icon: Calendar },
  { href: "/portal/dashboard/reportes", label: "Reportes", icon: FileBarChart2 },
  { href: "/portal/dashboard/notas", label: "Notas", icon: StickyNote },
];

export default function DashboardSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-grafito/10 flex flex-col py-8 px-4">
      <p className="font-dancing text-2xl text-center mb-1" style={{ color: "#c0005a" }}>
        Portal del Cliente
      </p>
      <p className="text-xs text-grafito/40 text-center mb-8 truncate">{email}</p>

      <nav className="flex-1 space-y-1">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={
                active
                  ? { background: GRADIENT, color: "#fff" }
                  : { color: "#3A3F4B" }
              }
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-grafito/50 hover:text-grafito hover:bg-grafito/5 transition-colors"
      >
        <LogOut size={16} />
        Cerrar sesión
      </button>
    </aside>
  );
}
