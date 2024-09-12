"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/dataTable";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const payments = [
  {
    id: "1",
    customer: "John Doe",
    originLocation: "123 Prosperity Cir",
    moveDate: "02/22/2022 - 02/22/2022",
    amount: "$3,295",
    status: "Accepted",
    hasBid: false,
  },
  {
    id: "2",
    customer: "Apple Watch",
    originLocation: "123 Prosperity Cir",
    moveDate: "02/22/2022 - 02/22/2022",
    amount: "$3,295",
    status: "Read",
  },
  {
    id: "3",
    customer: "Apple Watch",
    originLocation: "123 Prosperity Cir",
    moveDate: "02/22/2022 - 02/22/2022",
    amount: "$3,295",
    status: "New Message",
    hasBid: true,
  },
  {
    id: "4",
    customer: "Apple Watch",
    originLocation: "123 Prosperity Cir",
    moveDate: "02/22/2022 - 02/22/2022",
    amount: "$3,295",
    status: "Rejected",
  },
];

const columns = [
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "originLocation",
    header: "Origin Location",
  },
  {
    accessorKey: "moveDate",
    header: "Move Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "hasBid",
    header: "Bid Status",
    cell: ({ row }) => {
      const hasBid = row.getValue("hasBid");
      return (
        <div
          className={cn(
            "max-w-28 px-2 py-1 text-xs font-semibold rounded-sm text-center",
            hasBid
              ? "bg-blue-500/20 text-blue-500"
              : "bg-gray-200/20 text-gray-500"
          )}
        >
          {hasBid ? "Bid Placed" : "No Bid"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status").toLowerCase();
      return (
        <div
          className={cn(
            "max-w-28 px-2 py-1 text-xs font-semibold rounded-sm text-center text-background",
            value.includes("accepted")
              ? "bg-success/20 text-success"
              : value.includes("read")
              ? "bg-warning/20 text-warning"
              : value.includes("message")
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

const ProposalsTable = () => {
  return (
    <Card className="border-none bg-background rounded-[14px]">
      <CardHeader className="flex gap-4 md:flex-row justify-between md:items-center">
        <CardTitle>Current Proposals</CardTitle>
        <Select>
          <SelectTrigger className="w-[180px] text-white/70">
            <SelectValue placeholder="Assign to me" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"assign-to-me"}>Assign to me</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={payments}
          tableClasses="border-0 border-separate border-spacing-y-2"
          rowClasses="border-b border-[#ffffff40]"
          headerClasses="border-none rounded-xl outline -outline-offset-2"
        />
        <Button
          variant="ghost"
          className="bg-background p-0 relative top-2 text-xs font-bold"
        >
          View All
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProposalsTable;
