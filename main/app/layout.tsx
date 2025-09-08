import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Praise Oke | Full-Stack Developer",
  description: "Portfolio of Praise Oke — Full-Stack Developer specializing in React, Next.js, Node.js, and React Native.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
