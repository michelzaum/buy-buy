import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Header } from "@/components/header/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buy-buy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
