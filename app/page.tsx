import About from "@/components/About";
import Advantages from "@/components/Advantages";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Advantages />
    </main>
  );
}