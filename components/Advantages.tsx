import {
  BadgeCheck,
  Clock3,
  Hammer,
  MapPin,
  MessagesSquare,
  PencilRuler,
} from "lucide-react";

const advantages = [
  {
    title: "Tukang Berpengalaman",
    description:
      "Pekerjaan ditangani oleh tukang yang memahami berbagai kebutuhan pengelasan.",
    icon: Hammer,
  },
  {
    title: "Siap Datang ke Lokasi",
    description:
      "Melayani pengerjaan dan perbaikan las langsung di lokasi pelanggan.",
    icon: MapPin,
  },
  {
    title: "Konsultasi Mudah",
    description:
      "Konsultasikan kebutuhan Anda secara mudah dan cepat melalui WhatsApp.",
    icon: MessagesSquare,
  },
  {
    title: "Desain Bisa Disesuaikan",
    description:
      "Ukuran, model, bahan, dan desain dapat disesuaikan dengan kebutuhan.",
    icon: PencilRuler,
  },
  {
    title: "Pengerjaan Tepat Waktu",
    description:
      "Waktu pengerjaan dibicarakan dan disesuaikan dengan jenis pekerjaan.",
    icon: Clock3,
  },
  {
    title: "Hasil Kuat dan Rapi",
    description:
      "Setiap pekerjaan mengutamakan kekuatan, ketepatan, dan kerapian hasil.",
    icon: BadgeCheck,
  },
];

export default function Advantages() {
  return (
    <section
      id="keunggulan"
      className="relative overflow-hidden bg-[#0d1728] py-20 lg:py-28"
    >
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#ff671d]/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#ff671d]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1560px] px-5 lg:px-10">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#ff671d]/40 bg-[#ff671d]/10 px-5 py-2 font-bold text-[#ff7a35]">
            Keunggulan Kami
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Mengapa Memilih TukangLas.org?
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-300">
            Kami siap membantu menyelesaikan berbagai kebutuhan las dengan
            pelayanan yang mudah, pengerjaan rapi, dan hasil yang kokoh.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {advantages.map((advantage) => {
            const Icon = advantage.icon;

            return (
              <article
                key={advantage.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-[#ff671d]/60 hover:bg-white/[0.1]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff671d] text-white transition duration-300 group-hover:rotate-3 group-hover:scale-110">
                  <Icon size={29} />
                </div>

                <h3 className="mt-6 text-2xl font-extrabold text-white">
                  {advantage.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-300">
                  {advantage.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}