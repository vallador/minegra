import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🌷 Para Ti",
  description: "Un regalo especial lleno de recuerdos y momentos compartidos.",
  keywords: ["regalo", "amor", "tulipanes", "recuerdos"],
  authors: [{ name: "Con amor" }],
  icons: {
    icon: "/tulip-icon.png",
  },
  openGraph: {
    title: "🌷 Para Ti",
    description: "Un regalo especial lleno de recuerdos y momentos compartidos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
