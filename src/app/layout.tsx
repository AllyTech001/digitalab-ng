import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digitalab NG | Interactive Science Laboratory",
  description:
    "Explore Physics, Chemistry and Biology through interactive practicals, a digital lab notebook and teacher-led assessment.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
