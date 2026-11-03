import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arnab Chanda - Student Developer",
  description: "AI/ML and Data Science Enthusiast • 4x Hackathon Winner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
