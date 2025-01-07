"use client"

import SubmitProposal from "@/components/dashboard-layout/pages/submit-proposal";
import React, { useEffect, useState } from "react";
import { getProjectById } from "@/services/api";
import { notification } from 'antd';
import LoadingScreen from "@/components/ui/loadingScreen";
import { NotificationTypes } from "@/constants/messages";


const Page = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();

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
        const projectData = await getProjectById(id);
        setData(projectData);
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
  }, [data.isEmpty]);
  
  if (isLoading) return <LoadingScreen />;
  return (
    <>
      {contextHolder}
      <div className="h-full flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Submit Proposal</h1>
        <div className="w-full bg-background rounded-lg">
          <SubmitProposal data={data} />
        </div>
      </div>
    </>
  );
};
export default Page;
