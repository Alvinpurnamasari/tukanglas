import {
  Anvil,
  ArrowRight,
  Building2,
  Construction,
  DoorOpen,
  Fence,
  Grid2X2,
  Hammer,
  House,
  Layers3,
  PackageOpen,
  Settings,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
};

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  House,
  Fence,
  Grid2X2,
  Layers3,
  Construction,
  DoorOpen,
  Building2,
  PackageOpen,
  Anvil,
  Settings,
  Hammer,
};

function createWhatsAppUrl(service: string, whatsappNumber: string)  {
  const message = `Halo TukangLas.org, saya ingin konsultasi mengenai layanan ${service}.`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default async function Services() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select("id, title, description, icon, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const services: Service[] = data ?? [];

  const { data: settings } = await supabase
    .from("site_settings")
    .select("whatsapp_number")
    .eq("id", 1)
    .maybeSingle();

  const whatsappNumber = settings?.whatsapp_number || "6282227427004";

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

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center font-semibold text-red-600">
            Layanan belum dapat dimuat.
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            Belum ada layanan yang tersedia.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] ?? Wrench;

              return (
                <article
                  key={service.id}
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
                      href={createWhatsAppUrl(service.title, whatsappNumber)}
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
        )}
      </div>
    </section>
  );
}