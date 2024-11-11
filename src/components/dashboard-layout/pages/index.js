import React, { useEffect, useState } from "react";

import Stats from "../components/Stats";
import ProjectsTable from "../components/ProjectTable";
// import SalesOverviewChart from "../components/sales-chart";
import dynamic from 'next/dynamic';
import { notification } from 'antd';
import { getDashboard } from "@/services/api";
import { useUser } from "@/lib/userContext";

const NotificationTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error"
};

const SalesOverviewChart = dynamic(() => import('../components/sales-chart'), { ssr: false });

const DashboardPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState(null);
  const [projectData, setProjectData] = useState([]);
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
        const response = await getDashboard(userData.mover.id);
        setData(response.data);
        setProjectData(response.projectData);
      } catch (error) {
        let errorMessage = "An error occurred";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {contextHolder}
      <div>
        <h2 className="scroll-m-20 pb-7 text-3xl font-bold tracking-tight first:mt-0">
          Dashboard
        </h2>

        <div className="space-y-8">
          <Stats data={data} />
          <SalesOverviewChart />
          <ProjectsTable projectData = {projectData} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
