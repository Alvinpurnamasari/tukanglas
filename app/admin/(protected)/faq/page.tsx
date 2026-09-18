import FaqManager from "@/components/admin/FaqManager";
import { createClient } from "@/utils/supabase/server";

export default async function AdminFaqPage() {
  const supabase = await createClient();

  const { data: faqs } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", {
      ascending: true,
    });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#0d1728]">
          Kelola FAQ
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          Tambah, edit, urutkan, aktifkan, atau hapus pertanyaan
          pelanggan.
        </p>
      </div>

      <FaqManager initialFaqs={faqs ?? []} />
    </div>
  );
}
