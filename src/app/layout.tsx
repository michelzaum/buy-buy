import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
