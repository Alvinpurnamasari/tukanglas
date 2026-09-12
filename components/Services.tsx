import {
    Anvil,
    ArrowRight,
    Building2,
    Construction,
    DoorOpen,
    Fence,
    Grid2x2,
    Hammer,
    House,
    Layers3,
    PackageOpen,
    Settings,
    Wrench,
} from "lucide-react"

const services =[
    {
        title: "Jasa Las Panggilan",
        description: " Melayani perbaikan las langsung dilokasi pelanggan.",
        icon: Wrench,
    },
    {
        title: "Pembuatan Kanopi",
        description: "Membuat kanopi rumah, carport, toko, dan bangunan dengan desain custum.",
        icon: House,
    },
    {
        title: "Pagar Besi",
        description: "Pembuatan pagar minimalis, klasik, sliding, dan pagar sesuai permintaan.",
        icon: Fence,
    },
    {
        title: "Teralis Jendela",
        description: "Teralis keamanan untuk jendela dan pintu dengan desain kuat dan menarik.",
        icon: Grid2x2,
    },
    {
        title: "Railing Tangga Balkon",
        description: "Pembuatan railing besi atau stainless yang aman, kokoh, dan rapi.",
        icon: Layers3,
    },
    {
        title: "Tangga Besi",
        description: "Pembuatan tangga besi lurus, tangga putar, dan tangga custom.",
        icon: Construction,
    },
    {
        title: "Pintu dan Gerbang Besi",
        description: "Pembuatan pintu rumah, gudang, bangunan, dan konstruksi baja lainnya.",
        icon: DoorOpen,
    },
    {
        title: "Konstruksi Baja",
        description: "Pengerjaan rangka atap, gudang, bangunana, dan konstruksi baja lainnya.",
        icon: Building2,
    },
    {
        title: "Furniture Besi Custom",
        description: "Pembuatan meja, kursi, rak toko, rak rumah, dan furniture berbahan besi.",
        icon: PackageOpen,
    },
    {
        title: "Las Stainless",
        description: "Pengerjaan railing, pagar, furniture, dan kebutuhan berbahan stainless.",
        icon: Anvil,
    },
    {
        title: "Servis dan Perbaikan Las",
        description: "Menerima desain dan kebutuhan pekerjaan las sesuai permintaan pelanggan.",
        icon: Settings,
    },
    {
        title: "Pekerjaan Las Custom",
        description: "Menerima desain dan kebutuhan pekerjaan las sesuai  permintaan pelanggan.",
        icon: Hammer,
    },
];

function createWhatsAppUrl(service: string) {
    const message = `Halo admin TukangLas.org, saya ingin konsultasi mengenai layanan ${service}.`;

    return `https://wa.me/6282227427004?text=${encodeURIComponent(message)}`;
}
export default function Services() {
    return (
        <section id="layanan" className="bg-[#f4f6f8] py-20 lg:py-28">
            <div className="mx-auto max-w-[1560px] px-5 lg:px-10">
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-[#ff671d]/10 px-5 py-2 font-bold text-[#ff671d]">
                        Layanan Kami
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-[#0d1728] sm:text-5xl">
                        Layanan Tukang Las Kami
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        Kami melayani pembuatan baru maupun perbaikan berbagai kebutuhan
                        berbahan besi, baja, dan stainless.
                    </p>
                </div>
            
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#ff671d]/40 hover:shadow-xl"
              >
                <span className="absolute right-6 top-5 text-5xl font-black text-gray-100 transition group-hover:text-[#ff671d]/10">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff671d] text-white shadow-lg shadow-orange-200 transition duration-300 group-hover:rotate-3 group-hover:scale-110">
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold text-[#0d1728]">
                    {service.title}
                  </h3>

                  <p className="mt-3 min-h-[56px] leading-7 text-gray-600">
                    {service.description}
                  </p>

                  <a
                    href={createWhatsAppUrl(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 font-bold text-[#ff671d] transition hover:gap-3"
                  >
                    Tanya Layanan
                    <ArrowRight size={19} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}