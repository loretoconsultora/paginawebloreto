import type { Metadata } from "next";
import { Dancing_Script, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Loreto Consultora | Estrategia de Marketing y Posicionamiento de Marca",
  description:
    "Consultora especializada en marketing estratégico, posicionamiento de marca personal y crecimiento empresarial. Presencia en México, Argentina, Colombia, EE.UU. y España.",
  keywords: [
    "consultoría de marketing",
    "posicionamiento de marca",
    "estrategia digital",
    "marca personal",
    "marketing para pymes",
  ],
  openGraph: {
    title: "Loreto Consultora",
    description: "Estrategia de Marketing y Posicionamiento de Marca",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dancing.variable} ${playfair.variable} ${montserrat.variable}`}>
      <body className="font-montserrat antialiased bg-indigo-pale text-grafito">
        {children}
      </body>
    </html>
  );
}
