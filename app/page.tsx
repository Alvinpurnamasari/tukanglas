import About from "@/components/About";
import Advantages from "@/components/Advantages";
import AreaAndFaq from "@/components/AreaAndFaq";
import EstimateForm from "@/components/EstimateForm";
import FloatingContact from "@/components/FloatingContact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowToOrder from "@/components/HowToOrder";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Advantages />
      <Portfolio />
      <HowToOrder />
      <EstimateForm />
      <AreaAndFaq />
      <Footer />
      <FloatingContact />
    </main>
  );
}