import PortfolioGallery from "@/components/PortfolioGallery";
import { createClient } from "@/utils/supabase/server";

export default async function Portfolio() {
  const supabase = await createClient();

  const { data: portfolios } = await supabase
    .from("portfolios")
    .select(
      "id, title, category, location, image_url, description, sort_order",
    )
    .eq("is_active", true)
    .order("sort_order", {
      ascending: true,
    });

  return (
    <section
      id="portofolio"
      className="bg-[#f4f6f8] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1810px] px-5 lg:px-12">
        <span className="inline-flex rounded-full bg-[#ff671d]/10 px-6 py-3 font-bold text-[#ff671d]">
          Portofolio
        </span>

        <h2 className="mt-6 text-4xl font-extrabold text-[#0d1728] sm:text-5xl lg:text-6xl">
          Hasil Pekerjaan Kami
        </h2>

        <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-600 sm:text-xl">
          Lihat beberapa contoh pekerjaan kanopi, pagar, teralis,
          railing, tangga, dan konstruksi besi yang kami kerjakan.
        </p>

        <PortfolioGallery portfolios={portfolios ?? []} />
      </div>
    </section>
  );
}