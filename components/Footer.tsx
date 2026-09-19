import {
  Flame,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import { createClient } from "@/utils/supabase/server";
  

  const mainServices = [
    "Jasa Las Panggilan",
    "Pembuatan Kanopi",
    "Pagar Besi",
    "Teralis Jendela",
    "Railing Tangga dan Balkon",
    "Tangga Besi",
    "Pintu dan Gerbang Besi",
    "Konstruksi Baja",
  ];
  
  export default async function Footer() {
    const supabase = await createClient();
  
    const { data: settings } = await supabase
      .from("site_settings")
      .select("whatsapp_number, phone_number, telegram_url, service_area")
      .eq("id", 1)
      .maybeSingle();
  
    const whatsappNumber = settings?.whatsapp_number || "6282227427004";
    const phoneNumber = settings?.phone_number || "0822-2742-7004";
    const phoneDigits = phoneNumber.replace(/\D/g, "");
    const telNumber = phoneDigits.startsWith("0")
      ? `+62${phoneDigits.slice(1)}`
      : `+${phoneDigits}`;
  
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Halo TukangLas.org, saya ingin konsultasi mengenai jasa las."
    )}`;
  
    return (
      <>
        {/* CTA */}
        <section className="relative overflow-hidden bg-[#071120] py-20">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=85')",
            }}
          />
  
          <div className="absolute inset-0 bg-[#071120]/70" />
  
          <div className="relative mx-auto max-w-4xl px-5 text-center">
            <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Punya Kebutuhan Las? Konsultasikan Sekarang
            </h2>
  
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300">
              Kirim foto, perkiraan ukuran, dan lokasi Anda. Kami siap membantu
              memberikan rekomendasi pengerjaan yang sesuai.
            </p>
  
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-[#25d366] px-8 py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#1fbd59]"
            >
              <MessageCircle size={25} />
              Chat WhatsApp Sekarang
            </a>
          </div>
        </section>
  
        {/* Footer */}
        <footer id="kontak" className="bg-[#0d1728] pb-10 pt-16 text-gray-300">
          <div className="mx-auto grid max-w-[1560px] gap-12 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
            {/* Identitas */}
            <div>
              <a href="#beranda" className="inline-flex items-center gap-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff671d] text-white">
                  <Flame size={27} />
                </span>
  
                <span className="text-2xl font-extrabold text-white">
                  TukangLas.<span className="text-[#ff671d]">org</span>
                </span>
              </a>
  
              <p className="mt-5 max-w-md leading-7 text-gray-400">
                Jasa las panggilan untuk pembuatan dan perbaikan kanopi, pagar,
                teralis, railing, tangga besi, konstruksi baja, serta berbagai
                pekerjaan las custom.
              </p>
            </div>
  
            {/* Kontak */}
            <div>
              <h3 className="text-xl font-extrabold text-white">Kontak</h3>
  
              <div className="mt-5 space-y-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition hover:text-[#ff671d]"
              >
                <MessageCircle size={21} />
                  WhatsApp: +{whatsappNumber}
              </a>

              <a
                href={`tel:${telNumber}`}
                className="flex items-center gap-3 transition hover:text-[#ff671d]"
              >
                <Phone size={21} />
                Telepon: {phoneNumber}
              </a>

              {settings?.telegram_url && (
                <a
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition hover:text-[#ff671d]"
                >
                  <Send size={21} />
                  Telegram
                </a>
              )}

              <p className="flex items-start gap-3">
                <MapPin className="mt-1 shrink-0" size={21} />
                {settings?.service_area || "Area layanan menyesuaikan ketersediaan tukang"}
              </p>
  
                <p>Jam operasional: Hubungi melalui WhatsApp</p>
              </div>
            </div>
  
            {/* Layanan */}
            <div>
              <h3 className="text-xl font-extrabold text-white">
                Layanan Utama
              </h3>
  
              <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
                {mainServices.map((service) => (
                  <a
                    key={service}
                    href="#layanan"
                    className="transition hover:text-[#ff671d]"
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>
          </div>
  
          <div className="mx-auto mt-12 max-w-[1560px] border-t border-white/10 px-5 pt-7 text-center text-sm text-gray-500 lg:px-10">
            © 2026 TukangLas.org. Seluruh hak cipta dilindungi.
          </div>
        </footer>
      </>
    );
  }