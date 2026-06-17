"use client";

import { useEffect, useState } from "react";
import { PenLine } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const GRADIENT = "linear-gradient(135deg, #c0005a 0%, #FF6A92 50%, #E894FF 100%)";

function useProgress() {
  const [progress, setProgress] = useState(70);
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 70 : p + 1));
    }, 80);
    return () => clearInterval(id);
  }, []);
  return progress;
}

export default function BlogPage() {
  const progress = useProgress();

  return (
    <>
      <Navbar />
      <main>
        <section
          className="min-h-screen flex items-center justify-center text-center px-6"
          style={{ background: "#ffffff" }}
        >
          <div className="max-w-sm sm:max-w-lg w-full mx-auto">
            <h1
              className="font-playfair text-4xl sm:text-5xl font-bold mb-4"
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              En construcción
            </h1>
            <p className="text-grafito text-lg mb-12 leading-snug">
              <span className="block sm:inline">Escribiendo contenido</span>{" "}
              <span className="block sm:inline" style={{ color: "#c0005a" }}>especial para ti</span>
            </p>

            <div className="relative w-full max-w-xs mx-auto">
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ background: "rgba(192,0,90,0.1)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{ width: `${progress}%`, background: GRADIENT }}
                />
              </div>
              <div
                className="absolute -top-5 transition-all duration-100"
                style={{ left: `calc(${progress}% - 10px)` }}
              >
                <PenLine size={20} style={{ color: "#c0005a" }} />
              </div>
            </div>

            <p className="text-grafito/40 text-sm mt-6 font-mono">{progress}%</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
