import ServicesManager from "@/components/admin/ServicesManager";
import { createClient } from "@/utils/supabase/server";

export default async function AdminServicesPage() {
  const supabase = await createClient();

  const { data: services, error } = await supabase
    .from("services")
    .select("id, title, description, icon, sort_order, is_active")
    .order("sort_order", { ascending: true });

  return (
    <section>
      <div className="mb-7">
        <h1 className="text-3xl font-extrabold text-[#0d1728]">
          Kelola Layanan
        </h1>

        <p className="mt-2 text-gray-600">
          Tambah, edit, urutkan, aktifkan, atau hapus layanan.
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
          Data layanan gagal dimuat: {error.message}
        </div>
      ) : (
        <ServicesManager initialServices={services ?? []} />
      )}
    </section>
  );
}