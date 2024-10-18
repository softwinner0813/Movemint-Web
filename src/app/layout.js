"use client";

import "./globals.css";
import { Poppins, Quicksand } from "next/font/google";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/dashboard-layout/components/progress-bar";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { UserProvider } from "@/lib/userContext";
import { useEffect } from "react";
// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

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
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: "b40b7cc7-13dc-4662-8b48-efa668f9b72a",
        notifyButton: {
          enable: true,
        },

        allowLocalhostAsSecureOrigin: true,
      });
    });

    return () => {
      window.OneSignal = undefined;
    };
  }, []); // <-- run this effect once on mount

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        ></script>
      </head>
      <title>Movemint</title>
      <body
        className={cn(
          "min-h-screen font-quicksand antialiased",
          quicksand.variable,
          poppins.variable
        )}
      >
        {/* <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        > */}
        <UserProvider>
          <ProgressBar />
          {children}
        </UserProvider>
        {/* </GoogleReCaptchaProvider> */}
      </body>
    </html>
  );
}
