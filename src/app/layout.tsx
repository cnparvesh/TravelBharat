import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "TravelBharat – Explore India State by State",
    template: "%s | TravelBharat",
  },
  description: "Discover India's incredible tourist destinations state by state, city by city. Explore heritage sites, nature, religious places, and adventure spots across all 28 states and 8 union territories.",
  keywords: ["India tourism", "travel India", "tourist places India", "states of India", "TravelBharat"],
  openGraph: {
    title: "TravelBharat – Explore India State by State",
    description: "Your ultimate digital travel encyclopedia of India",
    siteName: "TravelBharat",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
