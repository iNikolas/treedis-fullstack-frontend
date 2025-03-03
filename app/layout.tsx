import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { ReactQueryProvider } from "@/components/providers/react-query-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <ReactQueryProvider>
          <main className="h-screen">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
