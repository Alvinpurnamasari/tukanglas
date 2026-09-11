import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section
        id="beranda"
        className="flex min-h-screen items-center justify-center bg-[#0d1728] pt-[82px]"
      >
        <h1 className="text-4xl font-bold text-white">
          TukangLas.<span className="text-[#ff671d]">org</span>
        </h1>
      </section>
    </main>
  );
}