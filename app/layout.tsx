"use client"

import "./globals.css";
import ClientLayout from "./clientLayout";
import dynamic from "next/dynamic";

const TonConnectUIProvider = dynamic(
  () => import("@tonconnect/ui-react").then((mod) => mod.TonConnectUIProvider),
  { ssr: false }
);


const manifestUrl =
  "https://raw.githubusercontent.com/draysongz/tonpredict/main/public/manifest.json";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ClientLayout>
        <TonConnectUIProvider manifestUrl={manifestUrl}>{children}</TonConnectUIProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
