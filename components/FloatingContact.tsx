import { MessageCircle, Phone, Send } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function FloatingContact() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("whatsapp_number, phone_number, telegram_url")
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

  const telegramUrl = settings?.telegram_url?.trim();

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
      <div
        className={`fixed inset-x-0 bottom-0 z-50 grid border-t border-gray-200 bg-white p-2 shadow-2xl lg:hidden ${
          telegramUrl ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        <a
          href={`tel:${telNumber}`}
          className="flex items-center justify-center gap-1 rounded-l-xl bg-[#0d1728] px-1 py-3.5 text-sm font-bold text-white sm:gap-2 sm:text-base"
        >
          <Phone size={19} />
          Telepon
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-1 bg-[#25d366] px-1 py-3.5 text-sm font-bold text-white sm:gap-2 sm:text-base ${
            telegramUrl ? "" : "rounded-r-xl"
          }`}
        >
          <MessageCircle size={19} />
          WhatsApp
        </a>

        {telegramUrl && (
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-r-xl bg-[#229ed9] px-1 py-3.5 text-sm font-bold text-white sm:gap-2 sm:text-base"
          >
            <Send size={19} />
            Telegram
          </a>
        )}
      </div>
    </>
  );
}