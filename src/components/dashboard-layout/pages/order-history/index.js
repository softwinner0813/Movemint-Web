"use client";
import CommonDataTable from "@/components/ui/common-data-table";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const payments = [
  {
    id: "000001",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "Accepted",
  },
  {
    id: "000001",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "New",
  },
  {
    id: "000001",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "Rejected",
  },
  {
    id: "000001",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "Accepted",
  },
  {
    id: "000001",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "Rejected",
  },
  {
    id: "000001",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "New",
  },
  {
    id: "000001",
    name: "Christine Brooks",
    originAddress: "089 Kutch Green Apt. 448",
    datePosted: "Feb 22 2022",
    type: "Home",
    status: "Rejected",
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
            "rounded-sm py-1 px-4 text-center text-background font-bold",
            value.includes("accepted")
              ? "bg-success"
              : value.includes("rejected")
              ? "bg-danger-100"
              : value.includes("new")
              ? "bg-purple"
              : "bg-danger-100"
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

const OrderHistory = () => {
  return (
    <>
      <CommonDataTable
        columns={columns}
        data={payments}
        moveTypeValue={moveTypeValue}
        proposalStatusValue={proposalStatusValue}
      />

      <div className="flex justify-between">
        <button className="bg-white text-sm font-semibold text-gray-500 p-2 max-w-[141px] flex gap-1 items-center rounded-sm">
          <ChevronLeftIcon />
          Prev. Date
        </button>
        <button className="bg-white text-sm font-semibold text-gray-500 p-2 max-w-[141px] flex gap-1 items-center rounded-sm">
          Next Date
          <ChevronRightIcon />
        </button>
      </div>
    </>
  );
};

export default OrderHistory;
