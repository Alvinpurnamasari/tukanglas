import { MessageCircle, Phone } from "lucide-react";

const whatsappUrl =
  "https://wa.me/6282227427004?text=Halo%20TukangLas.org%2C%20saya%20ingin%20konsultasi%20mengenai%20jasa%20las.";

export default function FloatingContact() {
  return (
    <>
      {/* Tombol desktop */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi melalui WhatsApp"
        className="group fixed bottom-7 right-7 z-50 hidden h-16 w-16 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#1fbd59] lg:flex"
      >
        <MessageCircle size={31} />

        <span className="pointer-events-none absolute right-[76px] whitespace-nowrap rounded-lg bg-[#0d1728] px-4 py-2 text-sm font-bold opacity-0 shadow-lg transition group-hover:opacity-100">
          Konsultasi Gratis
        </span>
      </a>

      {/* Tombol HP */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-gray-200 bg-white p-2 shadow-2xl lg:hidden">
        <a
          href="tel:+6282227427004"
          className="flex items-center justify-center gap-2 rounded-l-xl bg-[#0d1728] px-3 py-3.5 font-bold text-white"
        >
          <Phone size={20} />
          Telepon
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-r-xl bg-[#25d366] px-3 py-3.5 font-bold text-white"
        >
          <MessageCircle size={20} />
          WhatsApp
        </a>
      </div>
    </>
  );
}