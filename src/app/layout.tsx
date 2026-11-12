import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Li Si'ao — Lagu Rohani Nias",
  description: "Ruang digital untuk mengenal, membaca, dan mendengarkan lagu rohani berbahasa Nias.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
