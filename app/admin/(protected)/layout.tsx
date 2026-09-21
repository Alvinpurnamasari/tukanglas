import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import LogoutButton from "@/components/admin/LogoutButton";
import AdminIdleLogout from "@/components/admin/AdminIdleLogout";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminUserId = process.env.ADMIN_USER_ID?.trim();

  if (!user || !adminUserId || user.id !== adminUserId) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <AdminIdleLogout />
      <AdminSidebar />

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-[82px] items-center justify-between border-b border-gray-200 bg-white px-5 pl-20 lg:px-8">
          <div>
            <p className="text-sm text-gray-500">Login sebagai</p>
            <p className="max-w-[190px] truncate font-bold text-[#0d1728] sm:max-w-none">
              {user.email}
            </p>
          </div>

          <LogoutButton />
        </header>

        <main className="p-5 sm:p-7 lg:p-8">{children}</main>
      </div>
    </div>
  );
}