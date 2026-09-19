import SettingsManager from "@/components/admin/SettingsManager";
import { createClient } from "@/utils/supabase/server";

const defaultSettings = {
  id: 1,
  whatsapp_number: "6282227427004",
  phone_number: "0822-2742-7004",
  telegram_url: null,
  email: null,
  address: "Alamat belum dicantumkan",
  service_area: "Yogyakarta dan wilayah sekitarnya",
  instagram_url: null,
  facebook_url: null,
};

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#0d1728]">
          Pengaturan Website
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          Kelola nomor kontak, alamat, area layanan, dan media
          sosial.
        </p>
      </div>

      <SettingsManager
        initialSettings={settings ?? defaultSettings}
      />
    </div>
  );
}