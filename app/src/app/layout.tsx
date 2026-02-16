import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";

export const metadata: Metadata = {
  title: "REVNIL",
  description:
    "Multi-tenant ERP platform for collegiate athletics NIL management",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
