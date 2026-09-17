"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ImageIcon, LoaderCircle, Save } from "lucide-react";

type HeroData = {
  id: number;
  badge: string;
  title_line_one: string;
  title_highlight: string;
  title_connector: string;
  title_line_three: string;
  description: string;
  background_url: string;
};

export default function BannerManager({
  initialData,
}: {
  initialData: HeroData;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [badge, setBadge] = useState(initialData.badge);
  const [titleLineOne, setTitleLineOne] = useState(
    initialData.title_line_one
  );
  const [titleHighlight, setTitleHighlight] = useState(
    initialData.title_highlight
  );
  const [titleConnector, setTitleConnector] = useState(
    initialData.title_connector
  );
  const [titleLineThree, setTitleLineThree] = useState(
    initialData.title_line_three
  );
  const [description, setDescription] = useState(initialData.description);
  const [backgroundUrl, setBackgroundUrl] = useState(
    initialData.background_url
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !badge.trim() ||
      !titleLineOne.trim() ||
      !titleHighlight.trim() ||
      !titleConnector.trim() ||
      !titleLineThree.trim() ||
      !description.trim() ||
      !backgroundUrl.trim()
    ) {
      setMessage("Semua data banner wajib diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("hero_section")
      .update({
        badge: badge.trim(),
        title_line_one: titleLineOne.trim(),
        title_highlight: titleHighlight.trim(),
        title_connector: titleConnector.trim(),
        title_line_three: titleLineThree.trim(),
        description: description.trim(),
        background_url: backgroundUrl.trim(),
      })
      .eq("id", initialData.id);

    if (error) {
      setMessage(`Banner gagal diperbarui: ${error.message}`);
      setLoading(false);
      return;
    }

    setMessage("Banner berhasil diperbarui.");
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="grid gap-7 xl:grid-cols-[1.1fr_0.9fr]">
      {/* Form */}
      <form
        onSubmit={handleUpdate}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff671d] text-white">
            <ImageIcon size={23} />
          </span>

          <div>
            <h2 className="text-xl font-extrabold text-[#0d1728]">
              Konten Banner
            </h2>
            <p className="text-sm text-gray-500">
              Ubah tulisan dan gambar utama website.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="mb-2 block font-bold text-[#0d1728]">
              Badge
            </span>
            <input
              type="text"
              value={badge}
              onChange={(event) => setBadge(event.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10"
            />
          </label>

          <label className="block">
            <span className="mb-2 block font-bold text-[#0d1728]">
              Judul Baris Pertama
            </span>
            <input
              type="text"
              value={titleLineOne}
              onChange={(event) => setTitleLineOne(event.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-[1fr_0.5fr]">
            <label className="block">
              <span className="mb-2 block font-bold text-[#0d1728]">
                Teks Oranye
              </span>
              <input
                type="text"
                value={titleHighlight}
                onChange={(event) =>
                  setTitleHighlight(event.target.value)
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#ff671d]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-bold text-[#0d1728]">
                Kata Penghubung
              </span>
              <input
                type="text"
                value={titleConnector}
                onChange={(event) =>
                  setTitleConnector(event.target.value)
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#ff671d]"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block font-bold text-[#0d1728]">
              Judul Baris Terakhir
            </span>
            <input
              type="text"
              value={titleLineThree}
              onChange={(event) => setTitleLineThree(event.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#ff671d]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block font-bold text-[#0d1728]">
              Deskripsi
            </span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 leading-7 outline-none focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10"
            />
          </label>

          <label className="block">
            <span className="mb-2 block font-bold text-[#0d1728]">
              URL Gambar Latar
            </span>
            <input
              type="url"
              value={backgroundUrl}
              onChange={(event) => setBackgroundUrl(event.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#ff671d]"
            />
            <span className="mt-2 block text-sm text-gray-500">
              Untuk sementara gunakan URL gambar. Upload file dibuat pada tahap
              Supabase Storage.
            </span>
          </label>
        </div>

        {message && (
          <p className="mt-5 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-semibold text-orange-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ff671d] px-6 py-3 font-bold text-white transition hover:bg-[#e95a13] disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>

      {/* Preview */}
      <div className="xl:sticky xl:top-[110px] xl:self-start">
        <div className="mb-3">
          <h2 className="text-xl font-extrabold text-[#0d1728]">
            Preview Banner
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Preview berubah saat form diketik.
          </p>
        </div>

        <div className="relative min-h-[540px] overflow-hidden rounded-3xl bg-[#071120] shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${backgroundUrl}")`,
            }}
          />

          <div className="absolute inset-0 bg-[#071120]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071120] via-[#071120]/70 to-transparent" />

          <div className="relative flex min-h-[540px] flex-col justify-center p-7 text-white">
            <span className="w-fit rounded-full border border-[#ff671d]/50 bg-[#ff671d]/10 px-4 py-2 text-sm font-bold text-[#ff7a35]">
              {badge}
            </span>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight">
              {titleLineOne}
              <span className="mt-2 block">
                <span className="text-[#ff671d]">
                  {titleHighlight}
                </span>{" "}
                {titleConnector}
              </span>
              <span className="mt-2 block">{titleLineThree}</span>
            </h2>

            <p className="mt-6 leading-7 text-gray-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}