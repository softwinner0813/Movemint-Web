"use client";
import React from "react";

const PublicLayout = ({ children }) => {

  return (
    <div className="min-h-screen bg-midnight">
        <main className="container">{children}</main>
    </div>
  );
};

export default PublicLayout;
