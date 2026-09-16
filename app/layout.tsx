import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tukanglas.org"),

  title: {
    default:
      "Jasa Las Panggilan Profesional | Kanopi, Pagar & Teralis",
    template: "%s | TukangLas.org",
  },

  description:
    "TukangLas.org melayani jasa las panggilan, pembuatan kanopi, pagar besi, teralis, railing, tangga besi, konstruksi baja, dan las custom. Konsultasi melalui WhatsApp.",

  keywords: [
    "jasa las panggilan",
    "tukang las terdekat",
    "jasa pembuatan kanopi",
    "pagar besi",
    "teralis jendela",
    "railing tangga",
    "tangga besi",
    "konstruksi baja",
    "las stainless",
    "tukanglas.org",
  ],

  authors: [
    {
      name: "TukangLas.org",
    },
  ],

  creator: "TukangLas.org",
  publisher: "TukangLas.org",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://tukanglas.org",
    siteName: "TukangLas.org",
    title: "Jasa Las Panggilan Profesional – TukangLas.org",
    description:
      "Melayani pembuatan dan perbaikan kanopi, pagar, teralis, railing, tangga besi, konstruksi baja, dan kebutuhan las custom.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jasa Las Panggilan Profesional – TukangLas.org",
    description:
      "Jasa las panggilan untuk kebutuhan rumah, tempat usaha, kantor, dan bangunan.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}