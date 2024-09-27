"use client";
import CommonDataTable from "@/components/ui/common-data-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjects } from "@/services/api";
import { chatDate } from '@/lib/chatDate'
import { getName } from "@/lib/utils";
import { notification } from 'antd';
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const NotificationTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error"
};

const columns = [
  {
    accessorKey: "id",
    title: "ID",
    dataIndex: "id",
    align: 'center', // Center the text in the ID column
  },
  {
    accessorKey: "name",
    title: "NAME",
    dataIndex: "name",
    align: 'center', // Center the text in the NAME column
  },
  {
    accessorKey: "from",
    title: "ORIGIN ADDRESS",
    dataIndex: "from",
    align: 'center', // Center the text in the ORIGIN ADDRESS column
  },
  {
    accessorKey: "date",
    title: "DATE POSTED",
    dataIndex: "date",
    align: 'center', // Center the text in the DATE POSTED column
  },
  {
    accessorKey: "residence_type",
    title: "TYPE",
    dataIndex: "residence_type",
    align: 'center', // Center the text in the TYPE column
  },
  {
    accessorKey: "status",
    title: "Status",
    align: 'center',
    render: (_, record) => {
      const value = record.status.toLowerCase();
      console.log(value);
      return (
        <div
          className={"px-4 py-1 rounded-lg text-center font-semibold w-15 " +
            (value == "accepted"
              ? "bg-success/20 text-success"
              : value == "rejected"
                ? "bg-danger-100/20 text-danger-100"
                : value == "new"
                  ? "bg-purple/20 text-purple"
                  : value == "completed"
                    ? "bg-success/20 text-success"
                    : value == "sent"
                      ? "bg-orange/20 text-orange"
                      : value == "inTransit"
                        ? "bg-purple/20 text-purple"
                        : "bg-danger-100/20 text-danger-100")
          }
        >
          {record.status}
        </div>
      );
    },
  },
];

const Project = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [moveTypes, setMoveTypes] = useState([]);
  const [proposalStatus, setProposalStatus] = useState([]);

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
        const projectData = await getProjects();
        projectData.forEach((item) => {
          item.name = getName(item.first_name, item.last_name);
          item.date = chatDate(item.updated_at);
        });
        const types = [
          ...new Set(projectData.map((item) => item.residence_type)) // Get unique move types
        ].map((moveType) => ({
          label: moveType,
          value: moveType,
        }));

        const status = [
          ...new Set(projectData.map((item) => item.status)) // Get unique statuses
        ].map((status) => ({
          label: status,
          value: status,
        }));
        setMoveTypes(types);
        setProposalStatus(status);
        projectData.map((item) => {
          item.from = JSON.parse(item.from).description
        })
        setData(projectData);
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

  const rowClickHandler = (row) => {
    router.push(`/dashboard/projects/${row.id}`);
  };

  return (
    <>
      {contextHolder}
      <CommonDataTable
        columns={columns}
        data={data}
        moveTypeValue={moveTypes}
        proposalStatusValue={proposalStatus}
        rowClickHandler={rowClickHandler}
      />

      <div className="flex p-3 justify-center bg-white mb-4 max-w-20 rounded-sm max-h-7 items-center ml-auto">
        <button className="text-black rounded">
          <ChevronLeftIcon />
        </button>
        <div className="border-l border-gray-300 h-6 mx-2"></div>
        <button className="text-black rounded">
          <ChevronRightIcon />
        </button>
      </div>
    </>
  );
};

export default Project;
