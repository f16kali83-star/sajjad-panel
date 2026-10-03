import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #09051a 0%, #100b24 50%, #071426 100%)",
        color: "#fff",
        padding: "28px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                color: "#a78bfa",
                fontSize: "14px",
                marginBottom: "6px",
              }}
            >
              Sajjad Panel
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: 800,
              }}
            >
              داشبورد
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              خوش آمدید، {user.username}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                padding: "10px 16px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#c4b5fd",
              }}
            >
              مدیر سیستم
            </div>

            <LogoutButton />
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "30px",
          }}
        >
          {[
            ["کاربران", "0", "مدیریت کاربران"],
            ["سرورها", "0", "سرورهای متصل"],
            ["نودها", "0", "نودهای فعال"],
            ["کانفیگ‌ها", "0", "کانفیگ‌های ساخته‌شده"],
          ].map(([title, value, description]) => (
            <div
              key={title}
              style={{
                padding: "22px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,0.18)",
              }}
            >
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "14px",
                }}
              >
                {title}
              </div>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "32px",
                  fontWeight: 800,
                }}
              >
                {value}
              </div>

              <div
                style={{
                  marginTop: "6px",
                  color: "#a78bfa",
                  fontSize: "13px",
                }}
              >
                {description}
              </div>
            </div>
          ))}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          {[
            "مدیریت کاربران",
            "مدیریت سرورها",
            "مدیریت نودها",
            "ساخت کانفیگ",
            "اشتراک‌ها",
            "پروتکل‌ها",
          ].map((item) => (
            <div
              key={item}
              style={{
                minHeight: "130px",
                display: "flex",
                alignItems: "center",
                padding: "24px",
                borderRadius: "18px",
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.08))",
                border: "1px solid rgba(167,139,250,0.15)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  {item}
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "13px",
                  }}
                >
                  به‌زودی در پنل فعال می‌شود
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
