import {
  MapPin,
  MessageCircle,
} from "lucide-react";

import FaqAccordion from "@/components/FaqAccordion";
import { createClient } from "@/utils/supabase/server";

const whatsappLocationUrl =
  "https://wa.me/6282227427004?text=Halo%20TukangLas.org%2C%20saya%20ingin%20menanyakan%20ketersediaan%20jasa%20las%20di%20lokasi%20saya.";

export default async function AreaAndFaq() {
  const supabase = await createClient();

  const { data: faqs } = await supabase
    .from("faqs")
    .select("id, question, answer, sort_order")
    .eq("is_active", true)
    .order("sort_order", {
      ascending: true,
    });

  return (
    <>
      {/* Area layanan */}
      <section className="bg-[#f4f6f8] py-20 lg:py-28">
        <div className="mx-auto max-w-[1810px] px-5 lg:px-12">
          <div className="relative overflow-hidden rounded-[32px] bg-[#ff671d] px-6 py-16 text-center text-white sm:px-10 lg:py-20">
            <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full border-[48px] border-white/10" />

            <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full border-[48px] border-white/10" />

            <div className="relative z-10 mx-auto max-w-4xl">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-[#ff671d] shadow-lg">
                <MapPin size={39} />
              </span>

              <h2 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Area Layanan Tukang Las
                <span className="block">Panggilan</span>
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">
                Kami melayani jasa las panggilan di berbagai wilayah.
                Hubungi kami dan kirimkan lokasi Anda untuk memastikan
                ketersediaan layanan.
              </p>

              <a
                href={whatsappLocationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center justify-center gap-3 rounded-xl bg-[#0d1728] px-7 py-4 text-lg font-bold text-white transition hover:-translate-y-1 hover:bg-[#15243c]"
              >
                <MessageCircle size={24} />
                Kirim Lokasi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-[82px] bg-white py-20 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1560px] gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <span className="inline-flex rounded-full bg-[#ff671d]/10 px-6 py-3 font-bold text-[#ff671d]">
              Pertanyaan Umum
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight text-[#0d1728] sm:text-5xl">
              Pertanyaan yang Sering Ditanyakan
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Temukan jawaban mengenai layanan, pemesanan, estimasi
              harga, dan proses pengerjaan jasa las kami.
            </p>

            <a
              href={whatsappLocationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-3 font-bold text-[#ff671d] transition hover:text-[#d94f0b]"
            >
              <MessageCircle size={22} />
              Tanyakan melalui WhatsApp
            </a>
          </div>

          <FaqAccordion faqs={faqs ?? []} />
        </div>
      </section>
    </>
  );
}