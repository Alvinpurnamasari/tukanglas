import RequestsManager from "@/components/admin/RequestsManager";
import { createClient } from "@/utils/supabase/server";

export default async function AdminRequestsPage() {
  const supabase = await createClient();

  const { data: requests } = await supabase
    .from("requests")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#0d1728]">
          Permintaan Pelanggan
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          Lihat dan kelola permintaan estimasi yang dikirim dari
          landing page.
        </p>
      </div>

      <RequestsManager initialRequests={requests ?? []} />
    </div>
  );
}