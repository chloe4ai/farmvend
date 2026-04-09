import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FarmVend - Farmers Market Vendor Management",
  description: "Manage inventory, sales, and analytics for your farmers market business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
