"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
  
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      setLoading(false);
      alert("Gagal logout. Silakan coba lagi.");
      return;
    }
  
    localStorage.removeItem("tukanglas-admin-last-activity");
  
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
    >
      <LogOut size={20} />
      {loading ? "Keluar..." : "Logout"}
    </button>
  );
}