import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sajjad Panel",
  description:
    "پنل مدیریت کاربران، سرورها، نودها، کانفیگ‌ها و اشتراک‌ها",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
