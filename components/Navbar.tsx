"use client";

import { useState } from "react";
import { Flame, Menu, X } from "lucide-react";

const menus = [
  { name: "Beranda", href: "#beranda" },
  { name: "Layanan", href: "#layanan" },
  { name: "Keunggulan", href: "#keunggulan" },
  { name: "Portofolio", href: "#portofolio" },
  { name: "Cara Pesan", href: "#cara-pesan" },
  { name: "FAQ", href: "#faq" },
  { name: "Kontak", href: "#kontak" },
];

const whatsappUrl =
  "https://wa.me/6282227427004?text=Halo%20TukangLas.org%2C%20saya%20ingin%20konsultasi%20mengenai%20jasa%20las.";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#0d1728]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-[82px] max-w-[1560px] items-center justify-between px-5 lg:px-10">
        <a href="#beranda" className="flex items-center gap-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff671d] text-white">
            <Flame size={27} />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            TukangLas.<span className="text-[#ff671d]">org</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {menus.map((menu) => (
            <a
              key={menu.name}
              href={menu.href}
              className="font-semibold text-gray-300 transition hover:text-[#ff671d]"
            >
              {menu.name}
            </a>
          ))}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-xl bg-[#ff671d] px-6 py-3 font-bold text-white transition hover:bg-[#e95612] lg:inline-flex"
        >
          Konsultasi Gratis
        </a>

        <button
          type="button"
          aria-label="Buka menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-white lg:hidden"
        >
          {menuOpen ? <X size={29} /> : <Menu size={29} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0d1728] px-5 pb-6 lg:hidden">
          <div className="flex flex-col">
            {menus.map((menu) => (
              <a
                key={menu.name}
                href={menu.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-4 font-semibold text-gray-200"
              >
                {menu.name}
              </a>
            ))}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 rounded-xl bg-[#ff671d] px-5 py-3 text-center font-bold text-white"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}