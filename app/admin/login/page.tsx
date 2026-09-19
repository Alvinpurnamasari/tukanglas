"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Eye,
  EyeOff,
  Flame,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setErrorMessage("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMessage("Email atau password tidak sesuai.");
      setLoading(false);
      return;
    }

    localStorage.setItem(
      "tukanglas-admin-last-activity",
      String(Date.now()),
    );

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071120] px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-3"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff671d] text-white">
              <Flame size={31} />
            </span>

            <span className="text-3xl font-extrabold text-white">
              TukangLas.<span className="text-[#ff671d]">org</span>
            </span>
          </a>

          <p className="mt-4 text-gray-400">
            Masuk untuk mengelola konten website
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-9"
        >
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff671d]/10 text-[#ff671d]">
              <LockKeyhole size={29} />
            </span>

            <h1 className="mt-4 text-3xl font-extrabold text-[#0d1728]">
              Login Admin
            </h1>

            <p className="mt-2 text-gray-600">
              Masukkan akun admin TukangLas.org
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block font-bold text-[#0d1728]">
                Email
              </span>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={21}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Masukkan email admin"
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-300 py-3.5 pl-12 pr-4 outline-none transition focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block font-bold text-[#0d1728]">
                Password
              </span>

              <div className="relative">
                <LockKeyhole
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={21}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-300 py-3.5 pl-12 pr-12 outline-none transition focus:border-[#ff671d] focus:ring-4 focus:ring-[#ff671d]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Lihat password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                </button>
              </div>
            </label>
          </div>

          {errorMessage && (
            <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff671d] px-5 py-4 font-bold text-white transition hover:bg-[#e95a13] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <LoaderCircle className="animate-spin" size={21} />}
            {loading ? "Memproses..." : "Masuk ke Admin"}
          </button>

          <a
            href="/"
            className="mt-5 block text-center font-semibold text-gray-500 transition hover:text-[#ff671d]"
          >
            Kembali ke website
          </a>
        </form>
      </div>
    </main>
  );
}