import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BlogIA — Tech, IA & Innovation",
    template: "%s | BlogIA",
  },
  description:
    "Le blog qui décrypte l'intelligence artificielle, le développement, la cybersécurité et les innovations technologiques.",
  keywords: ["intelligence artificielle", "IA", "tech", "développement", "cybersécurité"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "BlogIA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "#f5f5f7", color: "#111111" }}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
