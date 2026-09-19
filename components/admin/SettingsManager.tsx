"use client";

import { FormEvent, useState } from "react";
import {
    Camera,
    Globe,
    LoaderCircle,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Save,
    Send,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";

type Settings = {
  id: number;
  whatsapp_number: string;
  phone_number: string;
  telegram_url: string | null;
  email: string | null;
  service_area: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
};

export default function SettingsManager({
  initialSettings,
}: {
  initialSettings: Settings;
}) {
  const supabase = createClient();

  const [settings, setSettings] =
    useState<Settings>(initialSettings);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(
    field: keyof Settings,
    value: string,
  ) {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    const whatsappNumber =
      settings.whatsapp_number.replace(/\D/g, "");

    if (!whatsappNumber) {
      setErrorMessage("Nomor WhatsApp harus diisi.");
      return;
    }

    if (!settings.phone_number.trim()) {
      setErrorMessage("Nomor telepon harus diisi.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("site_settings")
      .update({
        whatsapp_number: whatsappNumber,
        phone_number: settings.phone_number.trim(),
        telegram_url:
          settings.telegram_url?.trim() || null,
        email: settings.email?.trim() || null,
        service_area:
          settings.service_area?.trim() || null,
        instagram_url:
          settings.instagram_url?.trim() || null,
        facebook_url:
          settings.facebook_url?.trim() || null,
      })
      .eq("id", 1)
      .select()
      .single();

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setSettings(data);
    setMessage("Pengaturan website berhasil disimpan.");
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <label className="space-y-2 font-bold text-[#0d1728]">
          <span className="flex items-center gap-2">
            <MessageCircle
              size={20}
              className="text-[#ff671d]"
            />
            Nomor WhatsApp *
          </span>

          <input
            type="text"
            value={settings.whatsapp_number}
            onChange={(event) =>
              updateField(
                "whatsapp_number",
                event.target.value,
              )
            }
            placeholder="Contoh: 6282227427004"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
          />

          <p className="text-sm font-normal text-gray-500">
            Gunakan kode negara 62 tanpa tanda +, spasi, atau
            strip.
          </p>
        </label>

        <label className="space-y-2 font-bold text-[#0d1728]">
          <span className="flex items-center gap-2">
            <Phone size={20} className="text-[#ff671d]" />
            Nomor Telepon yang Ditampilkan *
          </span>

          <input
            type="text"
            value={settings.phone_number}
            onChange={(event) =>
              updateField("phone_number", event.target.value)
            }
            placeholder="Contoh: 0822-2742-7004"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
          />
        </label>

        <label className="space-y-2 font-bold text-[#0d1728]">
          <span className="flex items-center gap-2">
            <Send size={20} className="text-[#ff671d]" />
            Link Telegram
          </span>

          <input
            type="url"
            value={settings.telegram_url || ""}
            onChange={(event) =>
              updateField("telegram_url", event.target.value)
            }
            placeholder="Contoh: https://t.me/username"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
          />

          <p className="text-sm font-normal text-gray-500">
            Boleh dikosongkan sampai link Telegram tersedia.
          </p>
        </label>

        <label className="space-y-2 font-bold text-[#0d1728]">
          <span className="flex items-center gap-2">
            <Mail size={20} className="text-[#ff671d]" />
            Email
          </span>

          <input
            type="email"
            value={settings.email || ""}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            placeholder="Contoh: admin@tukanglas.org"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
          />
        </label>

        <label className="space-y-2 font-bold text-[#0d1728]">
          <span className="flex items-center gap-2">
            <Camera
              size={20}
              className="text-[#ff671d]"
            />
            Link Instagram
          </span>

          <input
            type="url"
            value={settings.instagram_url || ""}
            onChange={(event) =>
              updateField(
                "instagram_url",
                event.target.value,
              )
            }
            placeholder="https://instagram.com/username"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
          />
        </label>

        <label className="space-y-2 font-bold text-[#0d1728]">
          <span className="flex items-center gap-2">
            <Globe
              size={20}
              className="text-[#ff671d]"
            />
            Link Facebook
          </span>

          <input
            type="url"
            value={settings.facebook_url || ""}
            onChange={(event) =>
              updateField(
                "facebook_url",
                event.target.value,
              )
            }
            placeholder="https://facebook.com/username"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
          />
        </label>
      </div>



      <label className="mt-6 block space-y-2 font-bold text-[#0d1728]">
        <span className="flex items-center gap-2">
            <MapPin size={20} className="text-[#ff671d]" />
            Area Layanan
        </span>

        <textarea
          value={settings.service_area || ""}
          onChange={(event) =>
            updateField("service_area", event.target.value)
          }
          rows={3}
          placeholder="Contoh: Yogyakarta, Sleman, Bantul, dan sekitarnya"
          className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
        />
      </label>

      {errorMessage && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600">
          {errorMessage}
        </div>
      )}

      {message && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-600">
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-[#ff671d] px-7 py-4 font-bold text-white transition hover:bg-[#e95612] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle
            size={22}
            className="animate-spin"
          />
        ) : (
          <Save size={22} />
        )}

        {loading
          ? "Menyimpan..."
          : "Simpan Pengaturan"}
      </button>
    </form>
  );
}
