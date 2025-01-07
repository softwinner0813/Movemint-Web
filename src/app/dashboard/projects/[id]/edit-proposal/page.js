"use client"

import SubmitProposal from "@/components/dashboard-layout/pages/submit-proposal";
import { getSubmittedProposal } from "@/services/api";
import { useUser } from "@/lib/userContext";
import { useState, useEffect } from "react";
import { notification } from 'antd';
import LoadingScreen from "@/components/ui/loadingScreen";
import { NotificationTypes } from "@/constants/messages";


const Page = ({ params }) => {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [submittedProposal, setSubmittedProposal] = useState(null);
  const { userData } = useUser();
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
        const proposal = (await getSubmittedProposal(id, userData.mover.id)).data;
        proposal.payment_options = JSON.parse(proposal.payment_options);
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
  }, [submittedProposal == null]);
  if (isLoading) return <LoadingScreen />;

  return (
    <>
      {contextHolder}
       <div className="h-full flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Edit Proposal</h1>
        <div className="w-full bg-background rounded-lg">
          <SubmitProposal data={submittedProposal} />
        </div>
      </div>
    </>
  );
};
export default Page;
