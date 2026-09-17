"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
};

const iconOptions = [
  "Wrench",
  "House",
  "Fence",
  "Grid2X2",
  "Layers3",
  "Construction",
  "DoorOpen",
  "Building2",
  "PackageOpen",
  "Anvil",
  "Settings",
  "Hammer",
];

export default function ServicesManager({
  initialServices,
}: {
  initialServices: Service[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Wrench");
  const [sortOrder, setSortOrder] = useState(
    initialServices.length > 0
      ? Math.max(...initialServices.map((service) => service.sort_order)) + 1
      : 1
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingIcon, setEditingIcon] = useState("Wrench");
  const [editingSortOrder, setEditingSortOrder] = useState(1);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setMessage("Judul dan deskripsi layanan wajib diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("services").insert({
      title: title.trim(),
      description: description.trim(),
      icon,
      sort_order: sortOrder,
      is_active: true,
    });

    if (error) {
      setMessage(`Layanan gagal ditambahkan: ${error.message}`);
      setLoading(false);
      return;
    }

    setTitle("");
    setDescription("");
    setIcon("Wrench");
    setSortOrder(sortOrder + 1);
    setMessage("Layanan berhasil ditambahkan.");
    setLoading(false);
    router.refresh();
  }

  function startEditing(service: Service) {
    setEditingId(service.id);
    setEditingTitle(service.title);
    setEditingDescription(service.description);
    setEditingIcon(service.icon);
    setEditingSortOrder(service.sort_order);
    setMessage("");
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingTitle("");
    setEditingDescription("");
    setEditingIcon("Wrench");
    setEditingSortOrder(1);
  }

  async function handleUpdate(id: number) {
    if (!editingTitle.trim() || !editingDescription.trim()) {
      setMessage("Judul dan deskripsi layanan wajib diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("services")
      .update({
        title: editingTitle.trim(),
        description: editingDescription.trim(),
        icon: editingIcon,
        sort_order: editingSortOrder,
      })
      .eq("id", id);

    if (error) {
      setMessage(`Layanan gagal diperbarui: ${error.message}`);
      setLoading(false);
      return;
    }

    cancelEditing();
    setMessage("Layanan berhasil diperbarui.");
    setLoading(false);
    router.refresh();
  }

  async function handleToggle(service: Service) {
    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("services")
      .update({
        is_active: !service.is_active,
      })
      .eq("id", service.id);

    if (error) {
      setMessage(`Status gagal diubah: ${error.message}`);
      setLoading(false);
      return;
    }

    setMessage(
      service.is_active
        ? "Layanan berhasil dinonaktifkan."
        : "Layanan berhasil diaktifkan."
    );
    setLoading(false);
    router.refresh();
  }

  async function handleDelete(service: Service) {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus layanan "${service.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", service.id);

    if (error) {
      setMessage(`Layanan gagal dihapus: ${error.message}`);
      setLoading(false);
      return;
    }

    setMessage("Layanan berhasil dihapus.");
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="space-y-7">
      {/* Form tambah */}
      <form
        onSubmit={handleAdd}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff671d] text-white">
            <Plus size={23} />
          </span>

          <div>
            <h2 className="text-xl font-extrabold text-[#0d1728]">
              Tambah Layanan
            </h2>
            <p className="text-sm text-gray-500">
              Tambahkan layanan baru ke landing page.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <label>
            <span className="mb-2 block font-bold text-[#0d1728]">
              Nama Layanan
            </span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Contoh: Pembuatan Kanopi"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label>
              <span className="mb-2 block font-bold text-[#0d1728]">
                Ikon
              </span>
              <select
                value={icon}
                onChange={(event) => setIcon(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#ff671d]"
              >
                {iconOptions.map((iconName) => (
                  <option key={iconName} value={iconName}>
                    {iconName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block font-bold text-[#0d1728]">
                Urutan
              </span>
              <input
                type="number"
                min="1"
                value={sortOrder}
                onChange={(event) =>
                  setSortOrder(Number(event.target.value))
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#ff671d]"
              />
            </label>
          </div>

          <label className="lg:col-span-2">
            <span className="mb-2 block font-bold text-[#0d1728]">
              Deskripsi
            </span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              placeholder="Masukkan deskripsi layanan"
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#ff671d] px-6 py-3 font-bold text-white transition hover:bg-[#e95a13] disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            <Plus size={20} />
          )}
          Tambah Layanan
        </button>
      </form>

      {message && (
        <p className="rounded-xl border border-orange-200 bg-orange-50 px-5 py-3 font-semibold text-orange-700">
          {message}
        </p>
      )}

      {/* Daftar layanan */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-[#0d1728]">
            Daftar Layanan
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Terdapat {initialServices.length} layanan.
          </p>
        </div>

        <div className="space-y-4">
          {initialServices.map((service) => (
            <article
              key={service.id}
              className={`rounded-2xl border p-5 ${
                service.is_active
                  ? "border-gray-200 bg-white"
                  : "border-gray-200 bg-gray-50 opacity-70"
              }`}
            >
              {editingId === service.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(event) =>
                      setEditingTitle(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 font-bold outline-none focus:border-[#ff671d]"
                  />

                  <textarea
                    value={editingDescription}
                    onChange={(event) =>
                      setEditingDescription(event.target.value)
                    }
                    rows={3}
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#ff671d]"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <select
                      value={editingIcon}
                      onChange={(event) =>
                        setEditingIcon(event.target.value)
                      }
                      className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none"
                    >
                      {iconOptions.map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      min="1"
                      value={editingSortOrder}
                      onChange={(event) =>
                        setEditingSortOrder(Number(event.target.value))
                      }
                      className="rounded-xl border border-gray-300 px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleUpdate(service.id)}
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 font-bold text-white"
                    >
                      <Save size={18} />
                      Simpan
                    </button>

                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="inline-flex items-center gap-2 rounded-xl bg-gray-200 px-4 py-2.5 font-bold text-gray-700"
                    >
                      <X size={18} />
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-lg bg-orange-50 px-3 py-1 text-sm font-bold text-[#ff671d]">
                        Urutan {service.sort_order}
                      </span>

                      <span
                        className={`rounded-lg px-3 py-1 text-sm font-bold ${
                          service.is_active
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {service.is_active ? "Aktif" : "Tidak aktif"}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-extrabold text-[#0d1728]">
                      {service.title}
                    </h3>

                    <p className="mt-2 leading-7 text-gray-600">
                      {service.description}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-gray-400">
                      Ikon: {service.icon}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggle(service)}
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 font-bold text-gray-700"
                    >
                      {service.is_active ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                      {service.is_active ? "Nonaktifkan" : "Aktifkan"}
                    </button>

                    <button
                      type="button"
                      onClick={() => startEditing(service)}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 font-bold text-blue-600"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(service)}
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 font-bold text-red-600"
                    >
                      <Trash2 size={18} />
                      Hapus
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}