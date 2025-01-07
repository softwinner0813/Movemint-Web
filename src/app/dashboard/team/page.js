"use client"

import TeamMemberList from "@/components/dashboard-layout/pages/team-layout/page";
import React, { useEffect, useState } from "react";
import { getTeamMember } from '@/services/api';
import { notification } from 'antd';
import { useUser } from "@/lib/userContext";

import { NotificationTypes } from "@/constants/messages";


const Page = () => {
  const [data, setData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const { userData } = useUser();
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
        const response = await getTeamMember(userData.mover.id);
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
