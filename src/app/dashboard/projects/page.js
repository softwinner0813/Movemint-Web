import Project from "@/components/dashboard-layout/pages/projects";
import React from "react";

const page = () => {
  return (
    <div className="container h-full bg-[#1b1c21] flex flex-col gap-6">
      <p className="text-3xl font-bold">Open Projects</p>
      <Project />
    </div>
  );
};

export default page;
