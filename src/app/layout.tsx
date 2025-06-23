import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./typography.css";
import "./font-utilities.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vanam — Plant More, Grow More",
  description: "Turn every sapling into a green future with Vanam. Track your trees, earn rewards, and contribute to a greener planet.",
  keywords: ["tree planting", "climate change", "afforestation", "Vanam", "environment", "sustainability", "green initiative"],
  authors: [{ name: "Vanam" }],
  creator: "Vanam",
  openGraph: {
    title: "Vanam — Plant More, Grow More",
    description: "Turn every sapling into a green future with Vanam. Track your trees, earn rewards, and contribute to a greener planet.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vanam — Plant More, Grow More",
    description: "Turn every sapling into a green future with Vanam.",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body
        className="antialiased min-h-screen flex flex-col"
      >
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
