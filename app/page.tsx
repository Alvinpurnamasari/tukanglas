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
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("whatsapp_number")
    .eq("id", 1)
    .maybeSingle();

  const whatsappNumber = settings?.whatsapp_number || "6282227427004";

  return (
    <main>
      <Navbar whatsappNumber={whatsappNumber} />
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