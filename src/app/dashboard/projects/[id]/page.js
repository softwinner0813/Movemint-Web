"use client"

import EditProjectDetails from "@/components/dashboard-layout/pages/project-details";
import React, { useEffect, useState } from "react";
import { getProjectById, getSubmittedProposal } from "@/services/api";
import { useUser } from "@/lib/userContext";
import { notification } from 'antd';
import { useRouter } from "next/navigation";

const NotificationTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error"
};

const Page = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useUser();
  const [submittedProposal, setSubmittedProposal] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isNaN(id)) {
          router.push("/dashboard/projects");
          return;
        }
        const projectData = await getProjectById(id);
        if (projectData == null) {
          router.push("/dashboard/projects");
          return;
        }
        const proposal = await getSubmittedProposal(id, userData.mover.id);
        setData(projectData);
        setSubmittedProposal(proposal);
        setIsLoading(false);
      } catch (error) {
        let errorMessage = "An error occurred"; // Default message

        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; // Extract the custom message
        } else if (error.message) {
          errorMessage = error.message; // Fallback to general error message
        }
        openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [data == null]);
  return (
    <>
      {contextHolder}
      {!isLoading && <div className="h-full flex flex-col gap-6">
        <p className="text-3xl font-bold">Project Details</p>
        <div className="w-full bg-background rounded-lg">
          <EditProjectDetails data={data} submittedProposal={submittedProposal} />
        </div>
      </div>}
    </>
  );
};

export default Page;
