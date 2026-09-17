import {
    ArrowRight,
    BadgeCheck,
    HardHat,
    MessageCircle,
    Sparkles,
    Truck,
  } from "lucide-react";
  
  import { createClient } from "@/utils/supabase/server";
  
  const whatsappUrl =
    "https://wa.me/6282227427004?text=Halo%20TukangLas.org%2C%20saya%20ingin%20konsultasi%20mengenai%20jasa%20las.";
  
  const fallbackHero = {
    badge: "Jasa Las Panggilan Profesional",
    title_line_one: "Jasa Las Panggilan",
    title_highlight: "Cepat, Rapi",
    title_connector: "dan",
    title_line_three: "Terpercaya",
    description:
      "Melayani pembuatan dan perbaikan kanopi, pagar, teralis, railing, tangga besi, konstruksi baja, serta berbagai kebutuhan las custom. Tukang siap datang langsung ke lokasi Anda.",
    background_url:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=85",
  };
  
  const advantages = [
    {
      title: "Tukang Berpengalaman",
      icon: HardHat,
    },
    {
      title: "Siap Datang ke Lokasi",
      icon: Truck,
    },
    {
      title: "Konsultasi Mudah",
      icon: MessageCircle,
    },
    {
      title: "Pengerjaan Rapi",
      icon: BadgeCheck,
    },
  ];
  
  export default async function Hero() {
    const supabase = await createClient();
  
    const { data } = await supabase
      .from("hero_section")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
  
    const hero = {
      ...fallbackHero,
      ...(data ?? {}),
    };
  
    return (
      <section
        id="beranda"
        className="relative flex min-h-screen items-center overflow-hidden bg-[#0d1728] pt-[82px]"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${hero.background_url}")`,
          }}
        />
  
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#071120]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071120] via-[#071120]/75 to-[#071120]/35" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#071120] to-transparent" />
  
        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1560px] px-5 py-14 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#ff671d]/50 bg-[#ff671d]/10 px-5 py-2.5 font-semibold text-[#ff7a35]">
              <Sparkles size={20} />
              <span>{hero.badge}</span>
            </div>
  
            <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {hero.title_line_one}
  
              <span className="mt-2 block">
                <span className="text-[#ff671d]">
                  {hero.title_highlight}
                </span>{" "}
                {hero.title_connector}
              </span>
  
              <span className="mt-2 block">
                {hero.title_line_three}
              </span>
            </h1>
  
            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-200 sm:text-xl">
              {hero.description}
            </p>
  
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#25d366] px-7 py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#1fbd59]"
              >
                <MessageCircle size={25} />
                Konsultasi via WhatsApp
              </a>
  
              <a
                href="#layanan"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-lg font-bold text-white backdrop-blur-sm transition duration-300 hover:bg-white/20"
              >
                Lihat Layanan
                <ArrowRight size={23} />
              </a>
            </div>
  
            {/* Advantages */}
            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((item) => {
                const Icon = item.icon;
  
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4 text-white backdrop-blur-md"
                  >
                    <Icon
                      className="shrink-0 text-[#ff671d]"
                      size={25}
                    />
  
                    <span className="font-semibold">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }