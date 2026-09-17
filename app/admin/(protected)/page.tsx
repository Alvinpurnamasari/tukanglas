import {
  BriefcaseBusiness,
  CircleHelp,
  Images,
  LayoutDashboard,
  MessageSquareText,
} from "lucide-react";

const summaries = [
  {
    name: "Layanan",
    value: "0",
    icon: BriefcaseBusiness,
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Portofolio",
    value: "0",
    icon: Images,
    color: "bg-orange-50 text-[#ff671d]",
  },
  {
    name: "FAQ",
    value: "0",
    icon: CircleHelp,
    color: "bg-purple-50 text-purple-600",
  },
  {
    name: "Permintaan",
    value: "0",
    icon: MessageSquareText,
    color: "bg-green-50 text-green-600",
  },
];

export default function AdminDashboardPage() {
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
    </section>
  );
}