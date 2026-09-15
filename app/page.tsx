import About from "@/components/About";
import Advantages from "@/components/Advantages";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import HowToOrder from "@/components/HowToOrder";
import EstimateForm from "@/components/EstimateForm";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Advantages />
      <Portfolio />
      <HowToOrder/>
      <EstimateForm/>
    </main>
  );
} 