import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const adminUserId = process.env.ADMIN_USER_ID;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!user) {
      return NextResponse.json(
        { error: "Silakan login kembali." },
        { status: 401 },
      );
    }

    if (!adminUserId || user.id !== adminUserId) {
      return NextResponse.json(
        { error: "Anda tidak memiliki akses." },
        { status: 403 },
      );
    }

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Konfigurasi server belum lengkap." },
        { status: 500 },
      );
    }

    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email) {
      return NextResponse.json(
        { error: "Email wajib diisi." },
        { status: 400 },
      );
    }

    if (password && password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter." },
        { status: 400 },
      );
    }

    const adminSupabase = createAdminClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    const updates: {
      email: string;
      email_confirm: boolean;
      password?: string;
    } = {
      email,
      email_confirm: true,
    };

    if (password) {
      updates.password = password;
    }

    const { data, error } =
      await adminSupabase.auth.admin.updateUserById(
        adminUserId,
        updates,
      );

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({
      message:
        "Akun admin berhasil diperbarui. Silakan login kembali.",
      email: data.user.email,
    });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}