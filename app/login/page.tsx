"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "ورود ناموفق بود.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background:
          "linear-gradient(135deg, #09051a 0%, #130b2e 45%, #071426 100%)",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          padding: "36px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 16px",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #7c3aed, #2563eb)",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            S
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: 800,
            }}
          >
            Sajjad Panel
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "rgba(255,255,255,0.65)",
              fontSize: "14px",
            }}
          >
            ورود به پنل مدیریت
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="username"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
            }}
          >
            نام کاربری
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="نام کاربری"
            autoComplete="username"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 16px",
              marginBottom: "18px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.2)",
              color: "#fff",
              outline: "none",
              fontSize: "15px",
            }}
          />

          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
            }}
          >
            رمز عبور
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="رمز عبور"
            autoComplete="current-password"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 16px",
              marginBottom: "18px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.2)",
              color: "#fff",
              outline: "none",
              fontSize: "15px",
            }}
          />

          {error && (
            <div
              style={{
                marginBottom: "18px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#fca5a5",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: 0,
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #7c3aed, #2563eb)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 700,
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "در حال ورود..." : "ورود به پنل"}
          </button>
        </form>
      </div>
    </main>
  );
}
