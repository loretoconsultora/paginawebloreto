"use client";

import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function SolicitudModal({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,10,0.6)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 sm:p-8 relative w-full max-w-md max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <X size={18} style={{ color: "#445055" }} />
        </button>
        {children}
      </div>
    </div>
  );
}
