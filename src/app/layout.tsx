import type { Metadata } from "next";
import { Header } from "@/components/header/header";
import "./globals.css";
import { Toaster } from "sonner";

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
        <Toaster position="bottom-left" />
      </body>
    </html>
  );
}
