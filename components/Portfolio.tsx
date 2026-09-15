"use client";

import { MapPin, Maximize2, X } from "lucide-react";
import { useState } from "react";

const categories = [
  "Semua",
  "Kanopi",
  "Pagar",
  "Teralis",
  "Railing",
  "Tangga",
  "Konstruksi",
  "Custom",
];

const projects = [
  {
    title: "Kanopi Carport Minimalis",
    category: "Kanopi",
    location: "Lokasi belum dicantumkan",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Pagar Besi Minimalis",
    category: "Pagar",
    location: "Lokasi belum dicantumkan",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Teralis Jendela Minimalis",
    category: "Teralis",
    location: "Lokasi belum dicantumkan",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Railing Tangga Modern",
    category: "Railing",
    location: "Lokasi belum dicantumkan",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Tangga Besi Custom",
    category: "Tangga",
    location: "Lokasi belum dicantumkan",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Konstruksi Rangka Baja",
    category: "Konstruksi",
    location: "Lokasi belum dicantumkan",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Rak Besi Custom",
    category: "Custom",
    location: "Lokasi belum dicantumkan",
    image:
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=1200&q=85",
  },
];

type Project = (typeof projects)[number];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "Semua"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <section id="portofolio" className="bg-[#f4f6f8] py-20 lg:py-28">
        <div className="mx-auto max-w-[1560px] px-5 lg:px-10">
          <div className="mb-12 max-w-3xl">
            <span className="inline-flex rounded-full bg-[#ff671d]/10 px-5 py-2 font-bold text-[#ff671d]">
              Portofolio
            </span>

            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-[#0d1728] sm:text-5xl">
              Hasil Pekerjaan Kami
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Lihat beberapa contoh pekerjaan kanopi, pagar, teralis,
              railing, tangga, dan konstruksi besi yang kami kerjakan.
            </p>
          </div>

          {/* Filter */}
          <div className="mb-10 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2.5 font-bold transition ${
                  activeCategory === category
                    ? "border-[#ff671d] bg-[#ff671d] text-white"
                    : "border-gray-300 bg-white text-[#0d1728] hover:border-[#ff671d] hover:text-[#ff671d]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Galeri */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <button
                key={project.title}
                type="button"
                onClick={() => setSelectedProject(project)}
                className="group relative min-h-[360px] overflow-hidden rounded-3xl bg-gray-300 text-left shadow-md"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url("${project.image}")` }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071120] via-transparent to-transparent" />

                <span className="absolute left-5 top-5 rounded-full bg-[#ff671d] px-4 py-2 text-sm font-bold text-white">
                  {project.category}
                </span>

                <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#0d1728] opacity-0 transition group-hover:opacity-100">
                  <Maximize2 size={20} />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-extrabold">{project.title}</h3>

                  <p className="mt-2 flex items-center gap-2 text-gray-200">
                    <MapPin size={18} />
                    {project.location}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Tutup gambar"
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-[#ff671d]"
            >
              <X size={24} />
            </button>

            <div
              className="min-h-[350px] bg-cover bg-center sm:min-h-[600px]"
              style={{
                backgroundImage: `url("${selectedProject.image}")`,
              }}
            />

            <div className="p-6">
              <span className="font-bold text-[#ff671d]">
                {selectedProject.category}
              </span>

              <h3 className="mt-2 text-2xl font-extrabold text-[#0d1728]">
                {selectedProject.title}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-gray-600">
                <MapPin size={18} />
                {selectedProject.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}