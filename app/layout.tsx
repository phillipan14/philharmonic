import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhilHarmonic - AI Music Generator",
  description: "Create original music from text prompts in seconds. Describe the vibe, pick a genre, and let AI compose your track. Free and open-source.",
  openGraph: {
    title: "PhilHarmonic - AI Music Generator",
    description: "Create original music from text prompts in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-mesh">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        {children}
      </body>
    </html>
  );
}
