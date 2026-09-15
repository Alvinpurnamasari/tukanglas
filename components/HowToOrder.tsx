import {
    Camera,
    ClipboardCheck,
    FileText,
    Hammer,
    MessageCircle,
  } from "lucide-react";
  
  const steps = [
    {
      number: "01",
      title: "Hubungi WhatsApp",
      description:
        "Ceritakan jenis pekerjaan las yang Anda butuhkan melalui WhatsApp.",
      icon: MessageCircle,
    },
    {
        number: "02",
        title: "Kirirm Foto dan Ukuran",
        description:
          "Krirm foto kondisi, perkiraan ukuran, dan alamat lokasi pengerjaan.",
        icon: MessageCircle,
      },
    {
        number: "03",
        title: "Konsultasi atau Survei",
        description:
          "Kami membantu menentukan desain, bahan, serta kebutuhan pengerjaan.",
        icon: ClipboardCheck,
      },
      {
        number: "04",
        title: "Penawaran Harga",
        description:
          "Harga dan waktu pengerjaan disampaikan sebelum pekerjaan dimulai.",
        icon: FileText,
      },
      {
        number: "05",
        title: "Proses Pengerjaan",
        description:
          "Pekerjaan dilaksanakan sesuai desain dan kesepakatan bersama.",
        icon: Hammer,
      },
  ];

  const whatsappUrl = "https://wa.me/6282227427004?text=Halo%20TukangLas.org%2C%20saya%20ingin%20konsultasi%20mengenai%20jasa%20las.";

  export default function HowToOrder() {
    return (
        <section id="cara-pesan" className="bg-white py-20 lg:py-28">
            <div className="mx-auto max-w-[1560px] px-5 lg:px-10">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-[#ff671d]/10 px-5 py-2 font-bold text-[#ff671d">
                        Cara Pemesanan
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-[0d1728] sm:text-5xl">
                        Mudah Memesan Jasa Las
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        Sampaikan kebutuhan anda melalui whatsApp dan kami akan membantu mulai dari konsultasi hingga proses pengerjaaan.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-[10%] right-[10%] top-10 hidden h-px bg-gray-200 xl:block"/>
                    <div className="relative grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
                        {steps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <article key={step.number} className="group relative rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[fff671d]/40 hover:shadow-xl">
                                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border-8 border-white bg-[#ff671d] text-white shadow-lg shadow-orange-200">
                                        <Icon size={29}/>
                                    </div>
                                    <span className="mt-5 inline-block text-sm font-extrabold tracking-widest text-[#ff671d]">
                                        LANGKAH {step.number}
                                    </span>
                                    <h3 className="mt-3 text-xl font-extrabold text-[#0d1728]">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 leading-7 text-gray-600">
                                        {step.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#25d366] px-8 py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#1fbd59]">
                        <MessageCircle size={25}/>
                        Mulai Konsultasi via WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
  }