"use client";
import PublicFooter from "@/components/public/footer";
import PublicHeader from "@/components/public/header";
import { usePathname } from "next/navigation";
import React from "react";

const PublicLayout = ({ children }) => {
  const pathname = usePathname();
  const isSignUpPage = pathname === "/signup";

  return (
    <div className="min-h-screen bg-midnight">
      <div className={`relative ${isSignUpPage ? "" : "bg-login "}`}>
        <PublicHeader />
        <main className="container">{children}</main>
      </div>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
