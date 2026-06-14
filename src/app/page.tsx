import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import Novedades from "@/components/sections/Novedades";
import BoostYourBrand from "@/components/sections/BoostYourBrand";
import Servicios from "@/components/sections/Servicios";
import LogrosDestacados from "@/components/sections/LogrosDestacados";
import SalonFama from "@/components/sections/SalonFama";
import NuestrasMarcas from "@/components/sections/NuestrasMarcas";
import ImpactoSocial from "@/components/sections/ImpactoSocial";
import Blog from "@/components/sections/Blog";
import CTAFinal from "@/components/sections/CTAFinal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeBanner />
        <Novedades />
        <BoostYourBrand />
        <Servicios />
        <LogrosDestacados />
        <SalonFama />
        <NuestrasMarcas />
        <ImpactoSocial />
        <Blog />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
