import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/navbar";
import SessionWrapper from "@/app/providers/sessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "First app",
  description: "Nest js Practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionWrapper>
        <Navbar/>

        <main className="flex-1 p-6 bg-gray-500">
          {children}
        </main>

        <footer className="bg-gray-800 text-center py-4">
          © 2025 My Website
        </footer>
        </SessionWrapper>
      </body>
    </html>
  );
}
