import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOF1.AI - Alpha Arena",
  description: "AI-Powered Cryptocurrency Trading Platform",
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
