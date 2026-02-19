import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Music Generator",
  description: "Generate music from text prompts using AI. Free, open-source, powered by MusicGen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
