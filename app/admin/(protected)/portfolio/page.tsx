import PortfolioManager from "@/components/admin/PortfolioManager";
import { createClient } from "@/utils/supabase/server";

export default async function AdminPortfolioPage() {
  const supabase = await createClient();

  const { data: portfolios } = await supabase
    .from("portfolios")
    .select("*")
    .order("sort_order", {
      ascending: true,
    });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#0d1728]">
          Kelola Portofolio
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          Tambah, edit, urutkan, aktifkan, atau hapus hasil
          pekerjaan.
        </p>
      </div>

      <PortfolioManager initialPortfolios={portfolios ?? []} />
    </div>
  );
}