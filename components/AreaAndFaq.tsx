"use client";

import {
  ChevronDown,
  CircleHelp,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question: "Apakah tukang bisa datang langsung ke lokasi?",
    answer:
      "Ya. Kami melayani jasa las panggilan sesuai area dan ketersediaan tukang. Kirim lokasi Anda melalui WhatsApp untuk memastikan jangkauan layanan.",
  },
  {
    question: "Bagaimana cara mendapatkan estimasi harga?",
    answer:
      "Kirim jenis pekerjaan, foto kondisi, perkiraan ukuran, desain, dan lokasi. Informasi tersebut membantu kami memberikan perkiraan biaya awal.",
  },
  {
    question: "Apakah menerima pekerjaan las kecil?",
    answer:
      "Ya. Kami menerima pekerjaan pembuatan baru maupun perbaikan. Ketersediaannya menyesuaikan jenis pekerjaan dan lokasi pelanggan.",
  },
  {
    question: "Apakah desain dapat dibuat custom?",
    answer:
      "Bisa. Anda dapat mengirim contoh desain atau menjelaskan kebutuhan Anda. Ukuran, bahan, dan model dapat dibicarakan saat konsultasi.",
  },
  {
    question: "Berapa lama proses pengerjaan?",
    answer:
      "Lama pengerjaan bergantung pada jenis pekerjaan, ukuran, bahan, tingkat kesulitan, dan kondisi lokasi. Estimasi waktu akan disampaikan sebelum pengerjaan.",
  },
  {
    question: "Apakah bisa melakukan survei lokasi?",
    answer:
      "Survei dapat dilakukan setelah kebutuhan awal dan lokasi dikonsultasikan dengan admin melalui WhatsApp.",
  },
  {
    question: "Bahan apa saja yang dapat digunakan?",
    answer:
      "Pilihan bahan dapat meliputi besi, baja, baja ringan, dan stainless. Penggunaan bahan akan disesuaikan dengan jenis serta kebutuhan pekerjaan.",
  },
  {
    question: "Apakah menerima pekerjaan perbaikan?",
    answer:
      "Ya. Kami melayani perbaikan pagar, kanopi, pintu, engsel, railing, rangka besi, dan berbagai pekerjaan las lainnya.",
  },
];

export default function AreaAndFaq() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(0);

  const whatsappUrl =
    "https://wa.me/6282227427004?text=Halo%20TukangLas.org%2C%20apakah%20lokasi%20saya%20termasuk%20dalam%20area%20layanan%3F";

  function toggleQuestion(index: number) {
    setActiveQuestion(activeQuestion === index ? null : index);
  }

  return (
    <>
      {/* Area layanan */}
      <section className="bg-[#f4f6f8] py-20 lg:py-24">
        <div className="mx-auto max-w-[1560px] px-5 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl bg-[#ff671d] px-6 py-12 text-center sm:px-10 lg:px-16 lg:py-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full border-[40px] border-white/10" />
            <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full border-[45px] border-white/10" />

            <div className="relative mx-auto max-w-4xl">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#ff671d] shadow-lg">
                <MapPin size={34} />
              </span>

              <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-5xl">
                Area Layanan Tukang Las Panggilan
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-orange-50">
                Kami melayani jasa las panggilan di berbagai wilayah. Hubungi
                kami dan kirimkan lokasi Anda untuk memastikan ketersediaan
                layanan.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-[#0d1728] px-8 py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#17243a]"
              >
                <MessageCircle size={24} />
                Kirim Lokasi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
          <div>
            <span className="inline-flex rounded-full bg-[#ff671d]/10 px-5 py-2 font-bold text-[#ff671d]">
              Pertanyaan Umum
            </span>

            <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-[#0d1728] sm:text-5xl">
              Ada yang Ingin Ditanyakan?
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Temukan jawaban mengenai pemesanan, survei, estimasi harga,
              bahan, dan proses pengerjaan jasa las.
            </p>

            <div className="mt-8 rounded-2xl bg-[#0d1728] p-6">
              <CircleHelp className="text-[#ff671d]" size={35} />

              <h3 className="mt-4 text-xl font-extrabold text-white">
                Belum menemukan jawaban?
              </h3>

              <p className="mt-2 leading-7 text-gray-300">
                Hubungi admin untuk mendiskusikan kebutuhan pekerjaan Anda.
              </p>

              <a
                href="https://wa.me/6282227427004?text=Halo%20TukangLas.org%2C%20saya%20ingin%20bertanya%20mengenai%20jasa%20las."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-bold text-[#ff7a35]"
              >
                <MessageCircle size={20} />
                Tanya melalui WhatsApp
              </a>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((item, index) => {
              const isActive = activeQuestion === index;

              return (
                <article
                  key={item.question}
                  className={`overflow-hidden rounded-2xl border transition ${
                    isActive
                      ? "border-[#ff671d]/50 shadow-lg"
                      : "border-gray-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleQuestion(index)}
                    className="flex w-full items-center justify-between gap-5 bg-white px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-lg font-extrabold text-[#0d1728]">
                      {item.question}
                    </span>

                    <ChevronDown
                      size={23}
                      className={`shrink-0 text-[#ff671d] transition duration-300 ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isActive && (
                    <div className="border-t border-gray-100 bg-[#f9fafb] px-5 py-5 text-base leading-7 text-gray-600 sm:px-6">
                      {item.answer}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}