"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BriefcaseBusiness,
  CircleHelp,
  FileImage,
  Flame,
  Images,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Settings,
  X,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Banner",
    href: "/admin/banner",
    icon: FileImage,
  },
  {
    name: "Layanan",
    href: "/admin/services",
    icon: BriefcaseBusiness,
  },
  {
    name: "Portofolio",
    href: "/admin/portfolio",
    icon: Images,
  },
  {
    name: "FAQ",
    href: "/admin/faq",
    icon: CircleHelp,
  },
  {
    name: "Permintaan",
    href: "/admin/requests",
    icon: MessageSquareText,
  },
  {
    name: "Pengaturan",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <>
      <div className="flex h-[82px] items-center border-b border-white/10 px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff671d] text-white">
            <Flame size={25} />
          </span>

          <span className="text-xl font-extrabold text-white">
            TukangLas.<span className="text-[#ff671d]">org</span>
          </span>
        </Link>
      </div>

      <nav className="space-y-2 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const active = isActive(menu.href);

          return (
            <Link
              key={menu.name}
              href={menu.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3.5 font-semibold transition ${
                active
                  ? "bg-[#ff671d] text-white shadow-lg shadow-orange-950/30"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={21} />
              {menu.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute inset-x-4 bottom-5 rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-bold text-white">Admin TukangLas.org</p>
        <p className="mt-1 text-xs leading-5 text-gray-400">
          Kelola konten landing page melalui menu di atas.
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-[#0d1728] lg:block">
        {sidebarContent}
      </aside>

      {/* Tombol HP */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buka menu admin"
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d1728] text-white shadow-lg lg:hidden"
      >
        <Menu size={25} />
      </button>

      {/* Overlay HP */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <aside
            className="relative h-full w-[290px] bg-[#0d1728]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu admin"
              className="absolute right-3 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white"
            >
              <X size={23} />
            </button>

            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}