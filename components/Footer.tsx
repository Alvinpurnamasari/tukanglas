import {
    Flame,
    MapPin,
    MessageCircle,
    Phone,
  } from "lucide-react";
  
  const whatsappUrl =
    "https://wa.me/6282227427004?text=Halo%20TukangLas.org%2C%20saya%20ingin%20konsultasi%20mengenai%20jasa%20las.";
  
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
  
  export default function Footer() {
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
                  WhatsApp: 0822-2742-7004
                </a>
  
                <a
                  href="tel:+6282227427004"
                  className="flex items-center gap-3 transition hover:text-[#ff671d]"
                >
                  <Phone size={21} />
                  Telepon: 0822-2742-7004
                </a>
  
                <p className="flex items-start gap-3">
                  <MapPin className="mt-1 shrink-0" size={21} />
                  Area layanan menyesuaikan ketersediaan tukang
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