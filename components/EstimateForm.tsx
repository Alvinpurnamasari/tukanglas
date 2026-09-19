"use client";

import {
  CheckCircle2,
  LoaderCircle,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { createClient } from "@/utils/supabase/client";

type Service = {
  id: number;
  title: string;
};

type RequestForm = {
  name: string;
  whatsapp: string;
  service: string;
  estimatedSize: string;
  location: string;
  notes: string;
};

const initialForm: RequestForm = {
  name: "",
  whatsapp: "",
  service: "",
  estimatedSize: "",
  location: "",
  notes: "",
};

export default function EstimateForm() {
  const supabase = createClient();

  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<RequestForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [displayWhatsappNumber, setDisplayWhatsappNumber] =
  useState("6282227427004");

  useEffect(() => {
    async function loadServices() {
      const { data } = await supabase
        .from("services")
        .select("id, title")
        .eq("is_active", true)
        .order("sort_order", {
          ascending: true,
        });

      setServices(data ?? []);
    }
    async function loadWhatsappNumber() {
      const { data } = await supabase
        .from("site_settings")
        .select("whatsapp_number")
        .eq("id", 1)
        .maybeSingle();
    
      if (data?.whatsapp_number) {
        setDisplayWhatsappNumber(data.whatsapp_number);
      }
    }
    
    loadWhatsappNumber();
    loadServices();
  }, []);

  function updateForm(
    field: keyof RequestForm,
    value: string,
  ) {
    setForm((current) => ({
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

    if (
      !form.name.trim() ||
      !form.whatsapp.trim() ||
      !form.service ||
      !form.location.trim()
    ) {
      setErrorMessage(
        "Nama, nomor WhatsApp, jenis layanan, dan lokasi wajib diisi.",
      );
      return;
    }

    const cleanedWhatsapp = form.whatsapp.replace(/\D/g, "");

    if (cleanedWhatsapp.length < 10) {
      setErrorMessage("Nomor WhatsApp belum valid.");
      return;
    }

    setLoading(true);

    /*
     * Membuka tab kosong ketika tombol diklik agar browser
     * tidak memblokir WhatsApp setelah proses penyimpanan.
     */
    const whatsappWindow = window.open("", "_blank");

    const { data: settings, error: settingsError } = await supabase
      .from("site_settings")
      .select("whatsapp_number")
      .eq("id", 1)
      .maybeSingle();

    if (settingsError) {
      whatsappWindow?.close();
      setErrorMessage("Nomor tujuan WhatsApp belum dapat dimuat. Coba lagi.");
      setLoading(false);
      return;
    }

    const whatsappNumber = settings?.whatsapp_number || "6282227427004";

    const { error } = await supabase
      .from("requests")
      .insert({
        name: form.name.trim(),
        whatsapp: cleanedWhatsapp,
        service: form.service,
        estimated_size:
          form.estimatedSize.trim() || null,
        location: form.location.trim(),
        notes: form.notes.trim() || null,
      });

    if (error) {
      whatsappWindow?.close();
      setErrorMessage(
        `Permintaan gagal dikirim: ${error.message}`,
      );
      setLoading(false);
      return;
    }

    const whatsappMessage = [
      "Halo TukangLas.org, saya ingin meminta estimasi pekerjaan.",
      "",
      `Nama: ${form.name.trim()}`,
      `Nomor WhatsApp: ${form.whatsapp.trim()}`,
      `Jenis layanan: ${form.service}`,
      `Perkiraan ukuran: ${
        form.estimatedSize.trim() || "-"
      }`,
      `Lokasi: ${form.location.trim()}`,
      `Catatan: ${form.notes.trim() || "-"}`,
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=` +
      encodeURIComponent(whatsappMessage);

    if (whatsappWindow) {
      whatsappWindow.location.href = whatsappUrl;
    } else {
      window.location.href = whatsappUrl;
    }

    setMessage(
      "Permintaan berhasil disimpan. WhatsApp sedang dibuka.",
    );

    setForm(initialForm);
    setLoading(false);
  }

  return (
    <section className="bg-[#0d1728] py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1810px] overflow-hidden px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
        {/* Informasi */}
        <div className="rounded-t-[32px] bg-[#0d1728] px-1 py-10 text-white lg:rounded-l-[32px] lg:rounded-tr-none lg:px-0 lg:py-16 lg:pr-14">
          <span className="inline-flex rounded-full border border-[#ff671d]/50 bg-[#ff671d]/10 px-5 py-2 font-bold text-[#ff7a35]">
            Estimasi Pengerjaan
          </span>

          <h2 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Minta Estimasi Harga Jasa Las
          </h2>

          <p className="mt-7 text-lg leading-8 text-gray-300">
            Isi informasi kebutuhan Anda. Setelah formulir dikirim,
            WhatsApp akan terbuka dengan pesan yang sudah tersusun
            otomatis.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex gap-4">
              <CheckCircle2
                className="mt-1 shrink-0 text-[#ff671d]"
                size={25}
              />

              <div>
                <h3 className="font-bold">
                  Konsultasi lebih mudah
                </h3>

                <p className="mt-1 text-gray-400">
                  Sampaikan jenis pekerjaan dan perkiraan ukuran.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin
                className="mt-1 shrink-0 text-[#ff671d]"
                size={25}
              />

              <div>
                <h3 className="font-bold">Cantumkan lokasi</h3>

                <p className="mt-1 text-gray-400">
                  Lokasi diperlukan untuk memastikan jangkauan
                  layanan.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone
                className="mt-1 shrink-0 text-[#ff671d]"
                size={25}
              />

              <div>
                <h3 className="font-bold">
                  WhatsApp +{displayWhatsappNumber}
                </h3>

                <p className="mt-1 text-gray-400">
                  Admin akan menanggapi permintaan konsultasi Anda.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-b-[32px] bg-white p-6 sm:p-8 lg:rounded-r-[32px] lg:rounded-bl-none lg:p-12"
        >
          <h3 className="text-3xl font-extrabold text-[#0d1728]">
            Form Permintaan Estimasi
          </h3>

          <p className="mt-2 text-gray-600">
            Lengkapi informasi di bawah ini.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 font-bold text-[#0d1728]">
              <span>
                Nama <span className="text-red-500">*</span>
              </span>

              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  updateForm("name", event.target.value)
                }
                placeholder="Masukkan nama"
                className="w-full rounded-xl border border-gray-300 px-4 py-4 font-normal outline-none focus:border-[#ff671d]"
              />
            </label>

            <label className="space-y-2 font-bold text-[#0d1728]">
              <span>
                Nomor WhatsApp{" "}
                <span className="text-red-500">*</span>
              </span>

              <input
                type="tel"
                value={form.whatsapp}
                onChange={(event) =>
                  updateForm("whatsapp", event.target.value)
                }
                placeholder="Contoh: 081234567890"
                className="w-full rounded-xl border border-gray-300 px-4 py-4 font-normal outline-none focus:border-[#ff671d]"
              />
            </label>

            <label className="space-y-2 font-bold text-[#0d1728]">
              <span>
                Jenis Layanan{" "}
                <span className="text-red-500">*</span>
              </span>

              <select
                value={form.service}
                onChange={(event) =>
                  updateForm("service", event.target.value)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-4 font-normal outline-none focus:border-[#ff671d]"
              >
                <option value="">Pilih layanan</option>

                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.title}
                  >
                    {service.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 font-bold text-[#0d1728]">
              <span>Perkiraan Ukuran</span>

              <input
                type="text"
                value={form.estimatedSize}
                onChange={(event) =>
                  updateForm(
                    "estimatedSize",
                    event.target.value,
                  )
                }
                placeholder="Contoh: 3 × 5 meter"
                className="w-full rounded-xl border border-gray-300 px-4 py-4 font-normal outline-none focus:border-[#ff671d]"
              />
            </label>
          </div>

          <label className="mt-6 block space-y-2 font-bold text-[#0d1728]">
            <span>
              Lokasi Pengerjaan{" "}
              <span className="text-red-500">*</span>
            </span>

            <input
              type="text"
              value={form.location}
              onChange={(event) =>
                updateForm("location", event.target.value)
              }
              placeholder="Masukkan kecamatan, kota, atau alamat"
              className="w-full rounded-xl border border-gray-300 px-4 py-4 font-normal outline-none focus:border-[#ff671d]"
            />
          </label>

          <label className="mt-6 block space-y-2 font-bold text-[#0d1728]">
            <span>Catatan Kebutuhan</span>

            <textarea
              value={form.notes}
              onChange={(event) =>
                updateForm("notes", event.target.value)
              }
              rows={5}
              placeholder="Jelaskan kebutuhan, desain, bahan, atau kondisi yang ingin diperbaiki"
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-4 font-normal outline-none focus:border-[#ff671d]"
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
            className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#25d366] px-7 py-4 text-lg font-bold text-white transition hover:bg-[#1fbd59] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <LoaderCircle
                className="animate-spin"
                size={25}
              />
            ) : (
              <MessageCircle size={25} />
            )}

            {loading
              ? "Mengirim Permintaan..."
              : "Kirim Permintaan via WhatsApp"}
          </button>
        </form>
      </div>
    </section>
  );
}