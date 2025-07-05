import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

// Google-fonts → CSS variables
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Personal Finance Visualizer",
  description: "Track expenses, categories, and budgets.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {/* top nav */}
        <Navbar />

        {/* page content */}
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
