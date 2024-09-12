"use client";
import CommonDataTable from "@/components/ui/common-data-table";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const payments = [
  {
    id: "1",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "Accepted",
  },
  {
    id: "2",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "New",
  },
  {
    id: "3",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "Rejected",
  },
  {
    id: "4",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "Completed",
  },
  {
    id: "5",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "Rejected",
  },
  {
    id: "6",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "New",
  },
  {
    id: "7",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "Rejected",
  },
  {
    id: "8",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "sent",
  },
  {
    id: "9",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "in Transit",
  },
];

const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "originAddress",
    header: "ORIGIN ADDRESS",
  },
  {
    accessorKey: "datePosted",
    header: "DATE POSTED",
  },
  {
    accessorKey: "type",
    header: "TYPE",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status").toLowerCase();
      return (
        <div
          className={cn(
            "max-w-36 rounded-sm py-1 px-4 text-center text-background font-semibold",
            value.includes("accepted")
              ? "bg-success/20 text-success"
              : value.includes("rejected")
              ? "bg-danger-100/20 text-danger-100"
              : value.includes("new")
              ? "bg-purple/20 text-purple"
              : value.includes("completed")
              ? "bg-success/20 text-success"
              : value.includes("sent")
              ? "bg-orange/20 text-orange"
              : value.includes("inTransit")
              ? "bg-purple/20 text-purple"
              : "bg-danger-100/20 text-danger-100"
          )}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
];

const moveTypeValue = [
  { label: "Home", value: "Home" },
  { label: "Work", value: "Work" },
  { label: "Community", value: "Community" },
  { label: "Other", value: "Other" },
];

const proposalStatusValue = [
  { label: "New", value: "New" },
  { label: "Accepted", value: "Accepted" },
  { label: "Rejected", value: "Rejected" },
  { label: "Completed", value: "Completed" },
  { label: "Sent", value: "Sent" },
  { label: "In Transit", value: "In Transit" },
];

const Project = () => {
  const router = useRouter();

  const rowClickHandler = (row) => {
    router.push(`/dashboard/projects/${row.original.id}`);
  };

  return (
    <>
      <CommonDataTable
        columns={columns}
        data={payments}
        moveTypeValue={moveTypeValue}
        proposalStatusValue={proposalStatusValue}
        rowClickHandler={rowClickHandler}
      />

      <div className="flex p-3 justify-center bg-white mb-4 max-w-20 rounded-sm max-h-7 items-center ml-auto">
        <button className="  text-black rounded">
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
