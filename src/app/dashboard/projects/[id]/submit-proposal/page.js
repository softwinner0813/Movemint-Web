"use client"

import SubmitProposal from "@/components/dashboard-layout/pages/submit-proposal";
import React, { useEffect, useState } from "react";
import { getProjectById } from "@/services/api";

const Page = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProjectById(id);
        setData(projectData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="h-full flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Submit Proposal</h1>
      <div className="w-full bg-background rounded-lg">
        <SubmitProposal data={data} />
      </div>
    </div>
  );
};
export default Page;
