"use client";

import { FormEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";

type Faq = {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
};

type FaqForm = {
  question: string;
  answer: string;
  sort_order: number;
};

const initialForm: FaqForm = {
  question: "",
  answer: "",
  sort_order: 1,
};

export default function FaqManager({
  initialFaqs,
}: {
  initialFaqs: Faq[];
}) {
  const supabase = createClient();

  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
  const [form, setForm] = useState<FaqForm>({
    ...initialForm,
    sort_order: initialFaqs.length + 1,
  });

  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function resetForm() {
    setForm({
      ...initialForm,
      sort_order: faqs.length + 1,
    });

    setEditingFaq(null);
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!form.question.trim() || !form.answer.trim()) {
      setErrorMessage("Pertanyaan dan jawaban harus diisi.");
      return;
    }

    setLoading(true);

    const faqData = {
      question: form.question.trim(),
      answer: form.answer.trim(),
      sort_order: Number(form.sort_order),
    };

    if (editingFaq) {
      const { data, error } = await supabase
        .from("faqs")
        .update(faqData)
        .eq("id", editingFaq.id)
        .select()
        .single();

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      setFaqs((current) =>
        current
          .map((item) => (item.id === editingFaq.id ? data : item))
          .sort((a, b) => a.sort_order - b.sort_order),
      );

      setMessage("FAQ berhasil diperbarui.");
    } else {
      const { data, error } = await supabase
        .from("faqs")
        .insert(faqData)
        .select()
        .single();

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      setFaqs((current) =>
        [...current, data].sort(
          (a, b) => a.sort_order - b.sort_order,
        ),
      );

      setMessage("FAQ berhasil ditambahkan.");
    }

    setLoading(false);
    resetForm();
  }

  function handleEdit(faq: Faq) {
    setEditingFaq(faq);

    setForm({
      question: faq.question,
      answer: faq.answer,
      sort_order: faq.sort_order,
    });

    setMessage("");
    setErrorMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleToggle(faq: Faq) {
    setMessage("");
    setErrorMessage("");

    const { data, error } = await supabase
      .from("faqs")
      .update({
        is_active: !faq.is_active,
      })
      .eq("id", faq.id)
      .select()
      .single();

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setFaqs((current) =>
      current.map((item) => (item.id === faq.id ? data : item)),
    );

    setMessage(
      data.is_active
        ? "FAQ berhasil diaktifkan."
        : "FAQ berhasil dinonaktifkan.",
    );
  }

  async function handleDelete(faq: Faq) {
    const confirmed = window.confirm(
      `Hapus pertanyaan "${faq.question}"?`,
    );

    if (!confirmed) return;

    setMessage("");
    setErrorMessage("");

    const { error } = await supabase
      .from("faqs")
      .delete()
      .eq("id", faq.id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setFaqs((current) =>
      current.filter((item) => item.id !== faq.id),
    );

    if (editingFaq?.id === faq.id) {
      resetForm();
    }

    setMessage("FAQ berhasil dihapus.");
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8"
      >
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff671d] text-white">
            {editingFaq ? <Pencil size={26} /> : <Plus size={28} />}
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-[#0d1728]">
              {editingFaq ? "Edit FAQ" : "Tambah FAQ"}
            </h2>

            <p className="text-gray-500">
              Kelola pertanyaan yang sering ditanyakan pelanggan.
            </p>
          </div>
        </div>

        <label className="block space-y-2 font-bold text-[#0d1728]">
          <span>Pertanyaan *</span>

          <input
            type="text"
            value={form.question}
            onChange={(event) =>
              setForm({
                ...form,
                question: event.target.value,
              })
            }
            placeholder="Contoh: Apakah tukang bisa datang ke lokasi?"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
          />
        </label>

        <label className="mt-5 block space-y-2 font-bold text-[#0d1728]">
          <span>Jawaban *</span>

          <textarea
            value={form.answer}
            onChange={(event) =>
              setForm({
                ...form,
                answer: event.target.value,
              })
            }
            rows={5}
            placeholder="Masukkan jawaban pertanyaan"
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 font-normal outline-none focus:border-[#ff671d]"
          />
        </label>

        <label className="mt-5 block max-w-sm space-y-2 font-bold text-[#0d1728]">
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
            className="inline-flex items-center gap-2 rounded-xl bg-[#ff671d] px-6 py-3 font-bold text-white transition hover:bg-[#e95612] disabled:opacity-60"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" size={21} />
            ) : editingFaq ? (
              <Pencil size={21} />
            ) : (
              <Plus size={22} />
            )}

            {loading
              ? "Menyimpan..."
              : editingFaq
                ? "Simpan Perubahan"
                : "Tambah FAQ"}
          </button>

          {editingFaq && (
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
          Daftar FAQ
        </h2>

        {faqs.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            Belum ada FAQ.
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <article
                key={faq.id}
                className={`rounded-2xl border bg-white p-5 shadow-sm ${
                  faq.is_active
                    ? "border-gray-200"
                    : "border-red-200 opacity-70"
                }`}
              >
                <div className="flex flex-col justify-between gap-5 lg:flex-row">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <span className="rounded-full bg-[#ff671d]/10 px-3 py-1 text-sm font-bold text-[#ff671d]">
                        {faq.sort_order}
                      </span>

                      <div>
                        <h3 className="text-lg font-extrabold text-[#0d1728]">
                          {faq.question}
                        </h3>

                        <p className="mt-2 leading-7 text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-start gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(faq)}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-100"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggle(faq)}
                      className="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-2 font-semibold text-[#e95612] hover:bg-orange-100"
                    >
                      {faq.is_active ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}

                      {faq.is_active ? "Nonaktifkan" : "Aktifkan"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(faq)}
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