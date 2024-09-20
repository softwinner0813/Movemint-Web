"use client"

import "./globals.css";
import { Poppins, Quicksand } from "next/font/google";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/dashboard-layout/components/progress-bar";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { UserProvider } from '@/lib/userContext';

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen font-quicksand antialiased",
          quicksand.variable,
          poppins.variable
        )}
      >
        <UserProvider>
          <ProgressBar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}