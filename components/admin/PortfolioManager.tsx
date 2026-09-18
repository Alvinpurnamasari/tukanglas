"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  ImagePlus,
  LoaderCircle,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";

type Portfolio = {
  id: number;
  title: string;
  category: string;
  location: string | null;
  image_url: string;
  image_path: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
};

type PortfolioForm = {
  title: string;
  category: string;
  location: string;
  description: string;
  sort_order: number;
};

const initialForm: PortfolioForm = {
  title: "",
  category: "Kanopi",
  location: "",
  description: "",
  sort_order: 1,
};

const categories = [
  "Kanopi",
  "Pagar",
  "Teralis",
  "Railing",
  "Tangga",
  "Konstruksi",
  "Custom",
];

export default function PortfolioManager({
  initialPortfolios,
}: {
  initialPortfolios: Portfolio[];
}) {
  const supabase = createClient();

  const [portfolios, setPortfolios] =
    useState<Portfolio[]>(initialPortfolios);

  const [form, setForm] = useState<PortfolioForm>(initialForm);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Ukuran gambar maksimal 5 MB.");
      event.target.value = "";
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMessage("Format gambar harus JPG, PNG, atau WebP.");
      event.target.value = "";
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setErrorMessage("");
  }

  function resetForm() {
    setForm({
      ...initialForm,
      sort_order: portfolios.length + 1,
    });

    setEditingItem(null);
    setImageFile(null);
    setPreview("");
    setErrorMessage("");
  }

  async function uploadImage(file: File) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(filePath);

    return {
      imageUrl: data.publicUrl,
      imagePath: filePath,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!form.title.trim()) {
      setErrorMessage("Nama pekerjaan harus diisi.");
      return;
    }

    if (!editingItem && !imageFile) {
      setErrorMessage("Gambar portofolio harus dipilih.");
      return;
    }

    setLoading(true);

    let uploadedImage:
      | {
          imageUrl: string;
          imagePath: string;
        }
      | undefined;

    try {
      if (imageFile) {
        uploadedImage = await uploadImage(imageFile);
      }

      const portfolioData = {
        title: form.title.trim(),
        category: form.category,
        location: form.location.trim() || null,
        description: form.description.trim() || null,
        sort_order: Number(form.sort_order),
        image_url:
          uploadedImage?.imageUrl || editingItem?.image_url || "",
        image_path:
          uploadedImage?.imagePath || editingItem?.image_path || null,
      };

      if (editingItem) {
        const { data, error } = await supabase
          .from("portfolios")
          .update(portfolioData)
          .eq("id", editingItem.id)
          .select()
          .single();

        if (error) throw error;

        setPortfolios((current) =>
          current
            .map((item) => (item.id === editingItem.id ? data : item))
            .sort((a, b) => a.sort_order - b.sort_order),
        );

        if (
          uploadedImage &&
          editingItem.image_path &&
          editingItem.image_path !== uploadedImage.imagePath
        ) {
          await supabase.storage
            .from("portfolio-images")
            .remove([editingItem.image_path]);
        }

        setMessage("Portofolio berhasil diperbarui.");
      } else {
        const { data, error } = await supabase
          .from("portfolios")
          .insert(portfolioData)
          .select()
          .single();

        if (error) throw error;

        setPortfolios((current) =>
          [...current, data].sort(
            (a, b) => a.sort_order - b.sort_order,
          ),
        );

        setMessage("Portofolio berhasil ditambahkan.");
      }

      resetForm();
    } catch (error) {
      if (uploadedImage?.imagePath) {
        await supabase.storage
          .from("portfolio-images")
          .remove([uploadedImage.imagePath]);
      }

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Portofolio gagal disimpan.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(item: Portfolio) {
    setEditingItem(item);

    setForm({
      title: item.title,
      category: item.category,
      location: item.location || "",
      description: item.description || "",
      sort_order: item.sort_order,
    });

    setImageFile(null);
    setPreview(item.image_url);
    setMessage("");
    setErrorMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleToggle(item: Portfolio) {
    const { data, error } = await supabase
      .from("portfolios")
      .update({
        is_active: !item.is_active,
      })
      .eq("id", item.id)
      .select()
      .single();

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setPortfolios((current) =>
      current.map((portfolio) =>
        portfolio.id === item.id ? data : portfolio,
      ),
    );

    setMessage(
      data.is_active
        ? "Portofolio berhasil diaktifkan."
        : "Portofolio berhasil dinonaktifkan.",
    );
  }

  async function handleDelete(item: Portfolio) {
    const confirmed = window.confirm(
      `Hapus portofolio "${item.title}"?`,
    );

    if (!confirmed) return;

    setMessage("");
    setErrorMessage("");

    const { error } = await supabase
      .from("portfolios")
      .delete()
      .eq("id", item.id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (item.image_path) {
      await supabase.storage
        .from("portfolio-images")
        .remove([item.image_path]);
    }

    setPortfolios((current) =>
      current.filter((portfolio) => portfolio.id !== item.id),
    );

    if (editingItem?.id === item.id) {
      resetForm();
    }

    setMessage("Portofolio berhasil dihapus.");
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8"
      >
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff671d] text-white">
            {editingItem ? <Pencil size={27} /> : <Plus size={29} />}
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-[#0d1728]">
              {editingItem
                ? "Edit Portofolio"
                : "Tambah Portofolio"}
            </h2>

            <p className="text-gray-500">
              Isi informasi hasil pekerjaan tukang las.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <label className="space-y-2 font-bold text-[#0d1728]">
            <span>Nama Pekerjaan *</span>

            <input
              type="text"
              value={form.title}
              onChange={(event) =>
                setForm({
                  ...form,
                  title: event.target.value,
                })
              }
              placeholder="Contoh: Kanopi Carport Minimalis"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none transition focus:border-[#ff671d]"
            />
          </label>

          <label className="space-y-2 font-bold text-[#0d1728]">
            <span>Kategori *</span>

            <select
              value={form.category}
              onChange={(event) =>
                setForm({
                  ...form,
                  category: event.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 font-bold text-[#0d1728]">
            <span>Lokasi</span>

            <input
              type="text"
              value={form.location}
              onChange={(event) =>
                setForm({
                  ...form,
                  location: event.target.value,
                })
              }
              placeholder="Contoh: Sleman, Yogyakarta"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
            />
          </label>

          <label className="space-y-2 font-bold text-[#0d1728]">
            <span>Urutan</span>

            <input
              type="number"
              min="1"
              value={form.sort_order}
              onChange={(event) =>
                setForm({
                  ...form,
                  sort_order: Number(event.target.value),
                })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
            />
          </label>
        </div>

        <label className="mt-5 block space-y-2 font-bold text-[#0d1728]">
          <span>Deskripsi</span>

          <textarea
            value={form.description}
            onChange={(event) =>
              setForm({
                ...form,
                description: event.target.value,
              })
            }
            rows={3}
            placeholder="Jelaskan hasil pekerjaan portofolio"
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
          />
        </label>

        <div className="mt-5">
          <p className="mb-2 font-bold text-[#0d1728]">
            Gambar Portofolio {!editingItem && "*"}
          </p>

          <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 p-6 text-gray-600 transition hover:border-[#ff671d] hover:text-[#ff671d]">
            <ImagePlus size={25} />

            <span className="font-semibold">
              Pilih gambar JPG, PNG, atau WebP
            </span>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview portofolio"
              className="mt-4 h-64 w-full rounded-2xl object-cover"
            />
          )}
        </div>

        {errorMessage && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600">
            {errorMessage}
          </div>
        )}

        {message && (
          <div className="mt-5 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-semibold text-[#d94f0b]">
            {message}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#ff671d] px-6 py-3 font-bold text-white transition hover:bg-[#e95612] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" size={21} />
            ) : editingItem ? (
              <Pencil size={21} />
            ) : (
              <Plus size={22} />
            )}

            {loading
              ? "Menyimpan..."
              : editingItem
                ? "Simpan Perubahan"
                : "Tambah Portofolio"}
          </button>

          {editingItem && (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-bold text-gray-700 hover:bg-gray-100"
            >
              <X size={21} />
              Batal Edit
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="mb-5 text-2xl font-extrabold text-[#0d1728]">
          Daftar Portofolio
        </h2>

        {portfolios.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            Belum ada portofolio. Silakan tambahkan melalui form di
            atas.
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {portfolios.map((item) => (
              <article
                key={item.id}
                className={`overflow-hidden rounded-3xl border bg-white shadow-sm ${
                  item.is_active
                    ? "border-gray-200"
                    : "border-red-200 opacity-70"
                }`}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <span className="text-sm font-bold text-[#ff671d]">
                        {item.category}
                      </span>

                      <h3 className="mt-1 text-xl font-extrabold text-[#0d1728]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.location || "Lokasi belum dicantumkan"}
                      </p>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-600">
                      Urutan {item.sort_order}
                    </span>
                  </div>

                  {item.description && (
                    <p className="mb-4 text-gray-600">
                      {item.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-100"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggle(item)}
                      className="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-2 font-semibold text-[#e95612] hover:bg-orange-100"
                    >
                      {item.is_active ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}

                      {item.is_active
                        ? "Nonaktifkan"
                        : "Aktifkan"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 font-semibold text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                      Hapus
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}