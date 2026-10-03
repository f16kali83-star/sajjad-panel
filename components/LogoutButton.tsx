"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/login");
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      style={{
        padding: "10px 16px",
        borderRadius: "12px",
        border: "1px solid rgba(239,68,68,0.25)",
        background: "rgba(239,68,68,0.1)",
        color: "#fca5a5",
        cursor: loading ? "wait" : "pointer",
        fontSize: "14px",
        fontWeight: 600,
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? "در حال خروج..." : "خروج"}
    </button>
  );
}
