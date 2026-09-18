"use client";

import { useMemo, useState } from "react";
import {
  Clock3,
  MapPin,
  MessageCircle,
  Search,
  Trash2,
} from "lucide-react";

import { createClient } from "@/utils/supabase/client";

type RequestStatus =
  | "baru"
  | "dihubungi"
  | "diproses"
  | "selesai"
  | "dibatalkan";

type CustomerRequest = {
  id: number;
  name: string;
  whatsapp: string;
  service: string;
  estimated_size: string | null;
  location: string;
  notes: string | null;
  status: RequestStatus;
  created_at: string;
};

const statuses: {
  value: RequestStatus;
  label: string;
}[] = [
  { value: "baru", label: "Baru" },
  { value: "dihubungi", label: "Dihubungi" },
  { value: "diproses", label: "Diproses" },
  { value: "selesai", label: "Selesai" },
  { value: "dibatalkan", label: "Dibatalkan" },
];

const statusColors: Record<RequestStatus, string> = {
  baru: "bg-blue-100 text-blue-700",
  dihubungi: "bg-yellow-100 text-yellow-700",
  diproses: "bg-purple-100 text-purple-700",
  selesai: "bg-green-100 text-green-700",
  dibatalkan: "bg-red-100 text-red-700",
};

function formatWhatsAppNumber(number: string) {
  const cleanedNumber = number.replace(/\D/g, "");

  if (cleanedNumber.startsWith("0")) {
    return `62${cleanedNumber.slice(1)}`;
  }

  if (cleanedNumber.startsWith("62")) {
    return cleanedNumber;
  }

  return `62${cleanedNumber}`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(date));
}

export default function RequestsManager({
  initialRequests,
}: {
  initialRequests: CustomerRequest[];
}) {
  const supabase = createClient();

  const [requests, setRequests] =
    useState<CustomerRequest[]>(initialRequests);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<RequestStatus | "semua">("semua");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const filteredRequests = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return requests.filter((request) => {
      const matchesStatus =
        statusFilter === "semua" ||
        request.status === statusFilter;

      const matchesSearch =
        !keyword ||
        request.name.toLowerCase().includes(keyword) ||
        request.whatsapp.toLowerCase().includes(keyword) ||
        request.service.toLowerCase().includes(keyword) ||
        request.location.toLowerCase().includes(keyword);

      return matchesStatus && matchesSearch;
    });
  }, [requests, search, statusFilter]);

  async function handleStatusChange(
    request: CustomerRequest,
    status: RequestStatus,
  ) {
    setMessage("");
    setErrorMessage("");

    const { data, error } = await supabase
      .from("requests")
      .update({ status })
      .eq("id", request.id)
      .select()
      .single();

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setRequests((current) =>
      current.map((item) =>
        item.id === request.id ? data : item,
      ),
    );

    setMessage(
      `Status permintaan ${request.name} berhasil diperbarui.`,
    );
  }

  async function handleDelete(request: CustomerRequest) {
    const confirmed = window.confirm(
      `Hapus permintaan dari "${request.name}"?`,
    );

    if (!confirmed) return;

    setMessage("");
    setErrorMessage("");

    const { error } = await supabase
      .from("requests")
      .delete()
      .eq("id", request.id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setRequests((current) =>
      current.filter((item) => item.id !== request.id),
    );

    setMessage("Permintaan berhasil dihapus.");
  }

  function getWhatsAppUrl(request: CustomerRequest) {
    const phoneNumber = formatWhatsAppNumber(
      request.whatsapp,
    );

    const text = [
      `Halo ${request.name},`,
      "",
      `Kami dari TukangLas.org menanggapi permintaan estimasi ${request.service} yang Anda kirimkan.`,
      "",
      "Apakah kebutuhannya masih dapat kami bantu?",
    ].join("\n");

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      text,
    )}`;
  }

  return (
    <div>
      <div className="mb-6 grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_240px]">
        <label className="relative">
          <Search
            size={21}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari nama, WhatsApp, layanan, atau lokasi"
            className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-[#ff671d]"
          />
        </label>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value as RequestStatus | "semua",
            )
          }
          className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#ff671d]"
        >
          <option value="semua">Semua Status</option>

          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {errorMessage && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600">
          {errorMessage}
        </div>
      )}

      {message && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-600">
          {message}
        </div>
      )}

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-[#0d1728]">
          Daftar Permintaan
        </h2>

        <span className="rounded-full bg-[#ff671d]/10 px-4 py-2 font-bold text-[#ff671d]">
          {filteredRequests.length} data
        </span>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center text-gray-500">
          Tidak ada permintaan yang ditemukan.
        </div>
      ) : (
        <div className="space-y-5">
          {filteredRequests.map((request) => (
            <article
              key={request.id}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-5 xl:flex-row">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-extrabold text-[#0d1728]">
                      {request.name}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${statusColors[request.status]}`}
                    >
                      {
                        statuses.find(
                          (status) =>
                            status.value === request.status,
                        )?.label
                      }
                    </span>
                  </div>

                  <p className="mt-2 font-bold text-[#ff671d]">
                    {request.service}
                  </p>

                  <div className="mt-4 grid gap-3 text-gray-600 md:grid-cols-2">
                    <p className="flex items-center gap-2">
                      <MessageCircle size={19} />
                      {request.whatsapp}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={19} />
                      {request.location}
                    </p>

                    <p>
                      <strong>Perkiraan ukuran:</strong>{" "}
                      {request.estimated_size || "-"}
                    </p>

                    <p className="flex items-center gap-2">
                      <Clock3 size={19} />
                      {formatDate(request.created_at)}
                    </p>
                  </div>

                  {request.notes && (
                    <div className="mt-5 rounded-xl bg-gray-50 p-4">
                      <p className="font-bold text-[#0d1728]">
                        Catatan pelanggan
                      </p>

                      <p className="mt-1 leading-7 text-gray-600">
                        {request.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex w-full flex-col gap-3 xl:w-56">
                  <label className="text-sm font-bold text-gray-600">
                    Status Permintaan
                  </label>

                  <select
                    value={request.status}
                    onChange={(event) =>
                      handleStatusChange(
                        request,
                        event.target.value as RequestStatus,
                      )
                    }
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#ff671d]"
                  >
                    {statuses.map((status) => (
                      <option
                        key={status.value}
                        value={status.value}
                      >
                        {status.label}
                      </option>
                    ))}
                  </select>

                  <a
                    href={getWhatsAppUrl(request)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25d366] px-4 py-3 font-bold text-white hover:bg-[#1fbd59]"
                  >
                    <MessageCircle size={20} />
                    Hubungi
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDelete(request)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-bold text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={20} />
                    Hapus
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}