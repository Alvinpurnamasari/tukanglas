"use client";

import { useMemo, useState } from "react";
import { MapPin, X } from "lucide-react";

type Portfolio = {
  id: number;
  title: string;
  category: string;
  location: string | null;
  image_url: string;
  description: string | null;
  sort_order: number;
};

export default function PortfolioGallery({
  portfolios,
}: {
  portfolios: Portfolio[];
}) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<Portfolio | null>(null);

  const categories = useMemo(() => {
    return [
      "Semua",
      ...Array.from(
        new Set(portfolios.map((item) => item.category)),
      ),
    ];
  }, [portfolios]);

  const filteredPortfolios =
    activeCategory === "Semua"
      ? portfolios
      : portfolios.filter(
          (item) => item.category === activeCategory,
        );

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-6 py-3 font-semibold transition ${
              activeCategory === category
                ? "border-[#ff671d] bg-[#ff671d] text-white"
                : "border-gray-300 bg-white text-[#0d1728] hover:border-[#ff671d] hover:text-[#ff671d]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredPortfolios.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
          Belum ada portofolio pada kategori ini.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPortfolios.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedPortfolio(item)}
              className="group relative h-[390px] overflow-hidden rounded-3xl bg-[#0d1728] text-left shadow-md"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071120] via-[#071120]/20 to-transparent" />

              <span className="absolute left-6 top-6 rounded-full bg-[#ff671d] px-4 py-2 text-sm font-bold text-white">
                {item.category}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-2xl font-extrabold">
                  {item.title}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-gray-200">
                  <MapPin size={18} />

                  {item.location || "Lokasi belum dicantumkan"}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedPortfolio && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedPortfolio(null)}
        >
          <div
            className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPortfolio(null)}
              aria-label="Tutup detail portofolio"
              className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#0d1728] text-white transition hover:bg-[#ff671d]"
            >
              <X size={27} />
            </button>

            <img
              src={selectedPortfolio.image_url}
              alt={selectedPortfolio.title}
              className="max-h-[70vh] w-full object-cover"
            />

            <div className="p-6 lg:p-8">
              <span className="font-bold text-[#ff671d]">
                {selectedPortfolio.category}
              </span>

              <h3 className="mt-2 text-3xl font-extrabold text-[#0d1728]">
                {selectedPortfolio.title}
              </h3>

              <p className="mt-3 flex items-center gap-2 text-gray-500">
                <MapPin size={20} />

                {selectedPortfolio.location ||
                  "Lokasi belum dicantumkan"}
              </p>

              {selectedPortfolio.description && (
                <p className="mt-5 leading-7 text-gray-600">
                  {selectedPortfolio.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}