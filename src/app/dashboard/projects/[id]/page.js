import EditProjectDetails from "@/components/dashboard-layout/pages/project-details";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  console.log("page", id);
  return (
    <div className="h-full flex flex-col gap-6">
      <p className="text-3xl font-bold">Project Details</p>
      <div className="w-full bg-background rounded-lg">
        <EditProjectDetails id={id} />
      </div>
    </div>
  );
};

export default page;
