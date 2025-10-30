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
  title: {
    default: "Mercado Livre dos Pneus - O Maior E-commerce de Pneus do Brasil",
    template: "%s | Mercado Livre dos Pneus"
  },
  description: "O maior e-commerce de pneus do Brasil. As melhores marcas e preços com a qualidade. Especialistas em pneus para pickup, camioneta, carro e moto com entrega rápida.",
  keywords: ["pneus", "comprar pneus", "pneus online", "pneus baratos", "pneus para carro", "pneus para SUV", "pneus 4x4", "pneus esportivos", "Mercado Pago", "frete grátis", "Mercado Livre dos Pneus", "maior e-commerce pneus Brasil"],
  authors: [{ name: "Mercado Livre dos Pneus" }],
  creator: "Mercado Livre dos Pneus",
  publisher: "Mercado Livre dos Pneus",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Mercado Livre dos Pneus - O Maior E-commerce de Pneus do Brasil",
    description: "O maior e-commerce de pneus do Brasil. As melhores marcas e preços com a qualidade. Encontre pneus para carro, SUV, 4x4 e caminhão.",
    url: "https://mercadolivre.scpneus.shop",
    siteName: "Mercado Livre dos Pneus",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/images/tires/xbri-brutus-1.png",
        width: 1200,
        height: 630,
        alt: "Mercado Livre dos Pneus - Maior e-commerce de pneus do Brasil"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mercado Livre dos Pneus - O Maior E-commerce de Pneus do Brasil",
    description: "O maior e-commerce de pneus do Brasil. As melhores marcas e preços com a qualidade.",
    images: ["/images/tires/xbri-brutus-1.png"],
  },
  other: {
    "twitter:creator": "@mercadolivredospneus",
    "twitter:site": "@mercadolivredospneus",
    "fb:app_id": "",
  },
  alternates: {
    canonical: "https://mercadolivre.scpneus.shop"
  },
  appLinks: {
    web: {
      url: "https://mercadolivre.scpneus.shop"
    }
  },
  category: "e-commerce",
  classification: "Automotive Parts"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
