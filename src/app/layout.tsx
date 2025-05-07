import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Vyuhire",
  description: "Track and analyze various job postings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
