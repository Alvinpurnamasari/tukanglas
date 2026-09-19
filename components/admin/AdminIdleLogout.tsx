"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const LIMIT_MS = 30 * 60 * 1000;
const STORAGE_KEY = "tukanglas-admin-last-activity";

export default function AdminIdleLogout() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    let loggingOut = false;

    async function checkIdle() {
      if (loggingOut) return;

      const lastActivity = Number(localStorage.getItem(STORAGE_KEY));

      if (lastActivity && Date.now() - lastActivity >= LIMIT_MS) {
        loggingOut = true;
        localStorage.removeItem(STORAGE_KEY);
        await supabase.auth.signOut();
        router.replace("/admin/login");
        router.refresh();
      }
    }

    function recordActivity() {
      if (loggingOut) return;

      void checkIdle();

      const lastActivity = Number(localStorage.getItem(STORAGE_KEY));
      if (lastActivity && Date.now() - lastActivity >= LIMIT_MS) return;

      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }

    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }

    void checkIdle();

    const events = ["pointerdown", "keydown", "scroll", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, recordActivity, { passive: true }),
    );

    const interval = window.setInterval(checkIdle, 30_000);

    function onVisibilityChange() {
      if (document.visibilityState === "visible") void checkIdle();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, recordActivity),
      );
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [router]);

  return null;
}