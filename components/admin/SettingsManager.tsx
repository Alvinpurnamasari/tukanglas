"use client";
import { FormEvent, useEffect, useState } from "react";
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
    Eye,
  EyeOff,
  KeyRound,
  Lock,
  UserRound,
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
  const [loginEmail, setLoginEmail] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [accountLoading, setAccountLoading] = useState(false);
const [accountMessage, setAccountMessage] = useState("");
const [accountError, setAccountError] = useState("");
const [showPassword, setShowPassword] = useState(false);

useEffect(() => {
  async function loadAdminAccount() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
      setLoginEmail(user.email);
    }
  }

  loadAdminAccount();
}, []);

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

  async function handleAccountSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
  
    setAccountMessage("");
    setAccountError("");
  
    const email = loginEmail.trim().toLowerCase();
  
    if (!email) {
      setAccountError("Email login harus diisi.");
      return;
    }
  
    if (newPassword && newPassword.length < 6) {
      setAccountError("Password minimal 6 karakter.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setAccountError("Konfirmasi password tidak sama.");
      return;
    }
  
    setAccountLoading(true);
  
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
  
      if (userError || !user) {
        setAccountError("Sesi login tidak ditemukan.");
        setAccountLoading(false);
        return;
      }
  
      const emailChanged =
        email !== user.email?.toLowerCase();
  
      if (!emailChanged && !newPassword) {
        setAccountError("Tidak ada perubahan akun.");
        setAccountLoading(false);
        return;
      }
  
      const response = await fetch("/api/admin/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: newPassword,
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        setAccountError(
          result.error || "Gagal memperbarui akun admin.",
        );
        setAccountLoading(false);
        return;
      }
  
      setAccountMessage(
        "Akun berhasil diperbarui. Anda akan diarahkan ke halaman login.",
      );
  
      setNewPassword("");
      setConfirmPassword("");
  
      await supabase.auth.signOut();
  
      localStorage.removeItem(
        "tukanglas-admin-last-activity",
      );
  
      window.location.href = "/admin/login";
    } catch {
      setAccountError(
        "Terjadi kesalahan saat memperbarui akun.",
      );
      setAccountLoading(false);
    }
  }

  return (
    <div className="space-y-8">
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
    <form
  onSubmit={handleAccountSubmit}
  className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8"
>
  <div className="mb-6">
    <div className="flex items-center gap-3">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff671d] text-white">
        <KeyRound size={24} />
      </span>

      <div>
        <h2 className="text-2xl font-extrabold text-[#0d1728]">
          Akun Admin
        </h2>

        <p className="text-gray-500">
          Ubah email dan password yang digunakan untuk login.
        </p>
      </div>
    </div>
  </div>

  <div className="grid gap-6 lg:grid-cols-2">
    <label className="space-y-2 font-bold text-[#0d1728] lg:col-span-2">
      <span className="flex items-center gap-2">
        <UserRound size={20} className="text-[#ff671d]" />
        Email Login Admin *
      </span>

      <input
        type="email"
        value={loginEmail}
        onChange={(event) => setLoginEmail(event.target.value)}
        placeholder="admin@tukanglas.org"
        autoComplete="email"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
      />

      <p className="text-sm font-normal text-gray-500">
        Email ini digunakan untuk masuk ke halaman admin.
      </p>
    </label>

    <label className="space-y-2 font-bold text-[#0d1728]">
      <span className="flex items-center gap-2">
        <Lock size={20} className="text-[#ff671d]" />
        Password Baru
      </span>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(event) =>
            setNewPassword(event.target.value)
          }
          placeholder="Minimal 6 karakter"
          autoComplete="new-password"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 font-normal outline-none focus:border-[#ff671d]"
        />

        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={
            showPassword
              ? "Sembunyikan password"
              : "Tampilkan password"
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? (
            <EyeOff size={21} />
          ) : (
            <Eye size={21} />
          )}
        </button>
      </div>
    </label>

    <label className="space-y-2 font-bold text-[#0d1728]">
      <span className="flex items-center gap-2">
        <Lock size={20} className="text-[#ff671d]" />
        Konfirmasi Password Baru
      </span>

      <input
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(event) =>
          setConfirmPassword(event.target.value)
        }
        placeholder="Ulangi password baru"
        autoComplete="new-password"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
      />
    </label>
  </div>

  <p className="mt-4 text-sm text-gray-500">
    Kosongkan password jika hanya ingin mengubah email login.
  </p>

  {accountError && (
    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600">
      {accountError}
    </div>
  )}

  {accountMessage && (
    <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-600">
      {accountMessage}
    </div>
  )}

  <button
    type="submit"
    disabled={accountLoading}
    className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-[#0d1728] px-7 py-4 font-bold text-white transition hover:bg-[#172641] disabled:cursor-not-allowed disabled:opacity-60"
  >
    {accountLoading ? (
      <LoaderCircle size={22} className="animate-spin" />
    ) : (
      <KeyRound size={22} />
    )}

    {accountLoading
      ? "Menyimpan..."
      : "Simpan Akun Admin"}
  </button>
</form>
  </div>
);
   
}
