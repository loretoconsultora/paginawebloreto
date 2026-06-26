"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type Item = { q: string; a: string };

export default function Faq({ items, accent }: { items: Item[]; accent: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid rgba(58,63,75,0.1)" }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-7 py-5"
            >
              <span className="font-semibold text-sm sm:text-base" style={{ color: "#445055" }}>{item.q}</span>
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: isOpen ? accent : "transparent", border: isOpen ? "none" : "1px solid rgba(58,63,75,0.2)" }}
              >
                {isOpen ? <X size={14} className="text-white" /> : <Plus size={14} style={{ color: "#445055" }} />}
              </span>
            </button>
            {isOpen && (
              <p className="px-5 sm:px-7 pb-5 text-sm leading-relaxed" style={{ color: "#445055", opacity: 0.8 }}>
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
