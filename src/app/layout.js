"use client"

import "./globals.css";
import { Poppins, Quicksand } from "next/font/google";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/dashboard-layout/components/progress-bar";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { UserProvider } from '@/lib/userContext';
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        ></script>

      <script src="OneSignalSDKWorker.js"></script>
      <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
      <script>
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        OneSignalDeferred.push(async function(OneSignal) {
          await OneSignal.init({
            appId: "65b3e2de-392a-4369-9d9a-c0ac53febfe0",
            safari_web_id: "web.onesignal.auto.2d9123a5-f6c1-46fe-a6d4-d9acca55dc3d",
            notifyButton: {
              enable: true,
            },
          });
        });
      </script>
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
    </html >
  );
}
