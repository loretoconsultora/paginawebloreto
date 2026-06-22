"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Calendar, FileBarChart2, StickyNote, CreditCard, CalendarDays, LogOut, Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const GRADIENT = "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)";

const LINKS = [
  { href: "/portal/dashboard", label: "Vista rápida", icon: LayoutDashboard },
  { href: "/portal/dashboard/agenda", label: "Agenda", icon: Calendar },
  { href: "/portal/dashboard/reportes", label: "Reportes", icon: FileBarChart2 },
  { href: "/portal/dashboard/notas", label: "Notas", icon: StickyNote },
  { href: "/portal/dashboard/pagos", label: "Pagos", icon: CreditCard },
];

const PROXIMAMENTE = { label: "Calendario Contenidos", icon: CalendarDays };

export default function DashboardSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <>
      <div
        className="md:hidden flex items-center justify-between px-5 py-3 bg-white relative z-30"
        style={{ boxShadow: "0 4px 24px rgba(58,63,75,0.08)" }}
      >
        <img src="/logo.svg" alt="Loreto Consultora" style={{ height: "32px", width: "auto" }} />
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full hover:bg-grafito/5 transition-colors"
          aria-label="Abrir menú"
        >
          <Menu size={20} style={{ color: "#3A3F4B" }} />
        </button>
      </div>

      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`w-64 flex-shrink-0 bg-white flex flex-col py-8 px-4 fixed md:relative inset-y-0 left-0 z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ boxShadow: "4px 0 24px rgba(58,63,75,0.08)" }}
      >
        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-grafito/5 transition-colors"
          aria-label="Cerrar menú"
        >
          <X size={18} style={{ color: "#3A3F4B" }} />
        </button>

        <div className="flex justify-center mb-3">
          <img src="/logo.svg" alt="Loreto Consultora" style={{ height: "40px", width: "auto" }} />
        </div>
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
                onClick={() => setOpen(false)}
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

          <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm font-medium text-grafito/30 cursor-not-allowed">
            <PROXIMAMENTE.icon size={16} className="flex-shrink-0 mt-0.5" />
            <div>
              <p>{PROXIMAMENTE.label}</p>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mt-0.5 bg-clip-text text-transparent inline-block"
                style={{ backgroundImage: "linear-gradient(90deg, #b8860b, #e6c558, #b8860b)" }}
              >
                Próximamente
              </p>
            </div>
          </div>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-grafito/50 hover:text-grafito hover:bg-grafito/5 transition-colors"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </aside>
    </>
  );
}
