"use client";
import React from "react";

const PublicLayout = ({ children }) => {

  return (
    <div className="min-h-screen bg-midnight">
      <main className="px-10 py-5">{children}</main>
    </div>
  );
};

export default PublicLayout;
