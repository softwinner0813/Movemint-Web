"use client"

import TeamMemberList from "@/components/dashboard-layout/pages/team-layout/page";
import React, { useEffect, useState } from "react";
import { getTeamMember } from '@/services/api';
import { notification } from 'antd';

const NotificationTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error"
};

const Page = () => {
  const [data, setData] = useState([]);
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
        const response = await getTeamMember();
        setData(response);
      } catch (error) {
        let errorMessage = "An error occurred"; // Default message

        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; // Extract the custom message
        } else if (error.message) {
          errorMessage = error.message; // Fallback to general error message
        }
        openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
      }
    };
    fetchData();
  }, [data.length]);

  return (
    <>
      {contextHolder}
      <div className="w-full flex items-center justify-center">
        <TeamMemberList memberList={data} />
      </div>
    </>
  );
};

export default Page;
