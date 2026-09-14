import {
    BadgeCheck,
    CheckCircle2,
    Ruler,
    ShieldCheck,
    Wrench,
  } from "lucide-react";

  const points = [
    "Melayani pembuatan baru dan perbaikan",
    "Desain dapat disesuaikan dengan kebutuhan",
    "Mangutamakan kekuatan dan kerapian",
    "Siap mengerjakan kebutuhan las custom",
  ];

  export default function About() {
    return (
        <section id="tentang" className="bg-white py-20 lg:py-28">
            <div className="mx-auto grid max-w-[1560px] items-center gap-12 px-5 lg:grid-cols-2 lg:px-10">
                {/*Gambar*/}
                <div className="relative">
                    <div className="min-h-[450px] rounded-3xl bg-cover bg-center shadow-2xl lg:min-h-[590px]" style={{backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85')",}} />

                    <div className="absolute -bottom-6 left-5 right-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:left-8 sm:right-auto sm:max-w-sm">
                        <div className="flex items-center gap-4">
                            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#ff671d] text-white">
                            <ShieldCheck size={30}/>
                            </span> 

                            <div>
                                <p className="text-lg font-extrabold text-[#0d1728]">
                                Pengerjaan Profesional
                                </p>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                Mengutamakan hasil yang kuat, tepat, dan rapi.
                                </p>
                            </div>
                        </div> 
                    </div>
                </div>

                {/*Isi*/}
                <div className="pt-8 lg:pt-0">
                    <span className="inline-flex rounded-full bg-[#ff671d]/10 px-5 py-2 font-bold text-[#ff671d]">
                        Tentang TukangLas.org
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-[#0d1728] sm:text-5xl">
                        Solusi Kebutuhan Las untuk Rumah dan Tempat Usaha 
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        TukangLas.org merupakan penyedia jasa las panggilan untuk kebutuhan rumah, tempat usaha, kantor, dan bangunan lainnya.
                        Kami melayani pembuatan baru maupun perbaikan berbagai produk berbahan besi, baja, dan stainless.
                    </p>
                    
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        setiap pekerjaan dilakukan dengan mengutamakan kekuatan, ketepatan ukuran, kerapian, dan kepuasan pelanggan.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {points.map((point) => (
                            <div key={point} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 shrink-0 text-[#ff671d]" size={22} />
                                <span className="font-semibold leading-6 text-[#0d1728]">
                                    {point}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 grid grid-cols-3 gap-3">
                        <div className="rounded-2xl bg-[#f4f6f8] p-4 text-center">
                            <Wrench className="mx-auto text-[ff671d]" size={28} />
                            <p className="mt-3 font-bold text-[#0d1728]">Pengerjaan Rapi</p>
                        </div>

                        <div className="rounded-2xl bg-[#f4f6f8] p-4 text-center">
                            <Ruler className="mx-auto text-ff671d]" size={28} />
                            <p className="mt-3 font-bold text-[#0d1728]">Ukuran Tepat</p>
                        </div>

                        <div className="rounded-2xl bg-[#f4f6f8] p-4 text-center">
                            <BadgeCheck className="mx-auto text-[#ff671d]" size={28}/>
                            <p className="mt-3 font-bold text-[#0d1728]">Hasil Kokoh</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
  }