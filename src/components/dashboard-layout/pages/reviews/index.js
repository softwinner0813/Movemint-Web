"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getReviewsByMoverId } from "@/services/api";
import { notification, Table, Rate } from 'antd';
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useUser } from "@/lib/userContext";

const NotificationTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error"
};

const columns = [
  // {
  //   accessorKey: "id",
  //   title: "ID",
  //   dataIndex: "id",
  //   align: 'center', // Center the text in the ID column
  // },
  {
    accessorKey: "name",
    title: "NAME",
    dataIndex: "name",
    align: 'center', // Center the text in the NAME column
  },
  {
    accessorKey: "speed_rating",
    title: "Speed Rating",
    dataIndex: "speed_rating",
    align: 'center', // Center the text in the ORIGIN ADDRESS column
    render: (value) => <Rate allowHalf disabled value={value} count={5} />
  },
  {
    accessorKey: "accuracy_rating",
    title: "Accuracy Rating",
    dataIndex: "accuracy_rating",
    align: 'center', // Center the text in the ORIGIN ADDRESS column
    render: (value) => <Rate allowHalf disabled value={value} count={5} />
  },
  {
    accessorKey: "service_rating",
    title: "Service Rating",
    dataIndex: "service_rating",
    align: 'center', // Center the text in the ORIGIN ADDRESS column
    render: (value) => <Rate allowHalf disabled value={value} count={5} />
  },
  {
    accessorKey: "rate",
    title: "Total Rating",
    dataIndex: "rate",
    align: 'center', // Center the text in the ORIGIN ADDRESS column
    render: (value) => <Rate allowHalf disabled value={value} count={5} />
  },
  {
    accessorKey: "date",
    title: "Review Date",
    dataIndex: "date",
    align: 'center', // Center the text in the DATE POSTED column
  },
];

const Review = () => {
  const router = useRouter();
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
        const moverId = userData.mover.id;
        if (!moverId)
          return;
        let reviewData = await getReviewsByMoverId(moverId);
        reviewData.map((review) => {
          review.name = review.first_name + " " + review.last_name;
          review.date = review.created_at.split("T")[0];
          review.rate = review.rate.toFixed(1);
          return review;
        });
        setData(reviewData);
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
  }, [userData == null]);

  const customTableClass = "bg-black text-white"; // Table body is black, and text is white
  const customRowClass = "bg-black text-white cursor-pointer border-grey-100"; // Rows with black background 
  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={data}
        rowClassName={customRowClass}
        pagination={false}
        bordered={false}
        className={customTableClass} // Applying the black background to the entire table
      />

      {/* <div className="flex p-3 justify-center bg-white mb-4 max-w-20 rounded-sm max-h-7 items-center ml-auto">
        <button className="text-black rounded">
          <ChevronLeftIcon />
        </button>
        <div className="border-l border-gray-300 h-6 mx-2"></div>
        <button className="text-black rounded">
          <ChevronRightIcon />
        </button>
      </div> */}
    </>
  );
};

export default Review;
