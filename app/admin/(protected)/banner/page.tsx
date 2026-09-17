import BannerManager from "@/components/admin/BannerManager";
import { createClient } from "@/utils/supabase/server";

export default async function AdminBannerPage() {
  const supabase = await createClient();

  const { data: banner, error } = await supabase
    .from("hero_section")
    .select(
      "id, badge, title_line_one, title_highlight, title_connector, title_line_three, description, background_url"
    )
    .eq("id", 1)
    .single();

  return (
    <section>
      <div className="mb-7">
        <h1 className="text-3xl font-extrabold text-[#0d1728]">
          Kelola Banner
        </h1>

        <p className="mt-2 text-gray-600">
          Edit tulisan dan gambar pada bagian utama landing page.
        </p>
      </div>

      {error || !banner ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
          Data banner gagal dimuat: {error?.message}
        </div>
      ) : (
        <BannerManager initialData={banner} />
      )}
    </section>
  );
}