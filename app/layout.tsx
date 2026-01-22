"use client"

import "./globals.css";
import ClientLayout from "./clientLayout";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Inter } from "next/font/google";

const TonConnectUIProvider = dynamic(
  () => import("@tonconnect/ui-react").then((mod) => mod.TonConnectUIProvider),
  { ssr: false }
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manifestUrl =
  "https://raw.githubusercontent.com/draysongz/tonpredict/main/public/manifest.json";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: 'Inter, var(--font-inter), sans-serif' }}
      >
        <ClientLayout>
          <TonConnectUIProvider manifestUrl={manifestUrl}>{children}</TonConnectUIProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
