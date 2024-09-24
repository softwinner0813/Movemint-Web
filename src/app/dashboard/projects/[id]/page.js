"use client"

import EditProjectDetails from "@/components/dashboard-layout/pages/project-details";
import React, { useEffect, useState } from "react";
import { getProjectById } from "@/services/api";

const Page = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProjectById(id);
        setData(projectData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      { ! isLoading && <div className="h-full flex flex-col gap-6">
        <p className="text-3xl font-bold">Project Details</p>
        <div className="w-full bg-background rounded-lg">
          <EditProjectDetails data={data} />
        </div>
      </div>}
    </>
  );
};

export default Page;
