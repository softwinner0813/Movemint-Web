"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

nprogress.configure({ showSpinner: false, easing: "ease", speed: 500 });

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    const handleLoad = () => {};
    const handleStart = () => nprogress.start();
    const handleStop = () => {
      nprogress.done();
      handleLoad();
    };

    // Cleanup the listener on unmount

    handleStart();
    handleStop();

    return () => {
      nprogress.done()
    };
  }, [pathname]);

  return null;
}
