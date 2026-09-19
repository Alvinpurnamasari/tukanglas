import Link from "next/link";
import {
  BriefcaseBusiness,
  CircleHelp,
  Images,
  LayoutDashboard,
  MessageSquareText,
} from "lucide-react";

import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const results = await Promise.all([
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("portfolios").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
    supabase.from("requests").select("*", { count: "exact", head: true }),
  ]);

  const failed = results.find((result) => result.error);
  if (failed?.error) {
    throw new Error(`Gagal memuat ringkasan: ${failed.error.message}`);
  }

  const { data: recentRequests, error: recentError } = await supabase
  .from("requests")
  .select("id, name, service, status, created_at")
  .order("created_at", { ascending: false })
  .limit(5);

  if (recentError) {
    throw new Error(`Gagal memuat permintaan terbaru: ${recentError.message}`);
  }

  const summaries = [
    {
      name: "Layanan",
      value: results[0].count ?? 0,
      icon: BriefcaseBusiness,
      color: "bg-blue-50 text-blue-600",
    },
    {
      name: "Portofolio",
      value: results[1].count ?? 0,
      icon: Images,
      color: "bg-orange-50 text-[#ff671d]",
    },
    {
      name: "FAQ",
      value: results[2].count ?? 0,
      icon: CircleHelp,
      color: "bg-purple-50 text-purple-600",
    },
    {
      name: "Permintaan",
      value: results[3].count ?? 0,
      icon: MessageSquareText,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <section>
      <div className="rounded-3xl bg-[#0d1728] p-7 text-white sm:p-9">
        <LayoutDashboard className="text-[#ff671d]" size={40} />

        <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">
          Dashboard Admin
        </h1>

        <p className="mt-3 text-gray-300">
          Kelola seluruh konten website TukangLas.org.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {summaries.map((summary) => {
          const Icon = summary.icon;

          return (
            <article
              key={summary.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${summary.color}`}
              >
                <Icon size={25} />
              </div>

              <p className="mt-5 text-3xl font-extrabold text-[#0d1728]">
                {summary.value}
              </p>

              <p className="mt-1 font-semibold text-gray-500">
                {summary.name}
              </p>
            </article>
          );
        })}
      </div>
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex flex-wrap items-center justify-between gap-3">
    <h2 className="text-xl font-bold text-[#0d1728]">
      Permintaan Terbaru
    </h2>

    <Link
      href="/admin/requests"
      className="font-semibold text-[#ff671d] hover:underline"
    >
      Lihat semua
    </Link>
  </div>

  {recentRequests && recentRequests.length > 0 ? (
    <ul className="mt-5 divide-y divide-gray-100">
        {recentRequests.map((request) => (
          <li
            key={request.id}
            className="flex flex-wrap items-center justify-between gap-2 py-4"
          >
            <div>
              <p className="font-semibold text-[#0d1728]">
                {request.name}
              </p>
              <p className="text-sm text-gray-500">
                {request.service} · Status: {request.status}
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {new Date(request.created_at).toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
                dateStyle: "medium",
                timeStyle: "short",
              })}{" "}
              WIB
            </span>
          </li>
        ))}
    </ul>
  ) : (
    <p className="mt-5 text-gray-500">
      Belum ada permintaan pelanggan.
    </p>
  )}
</div>
    </section>
  );
}