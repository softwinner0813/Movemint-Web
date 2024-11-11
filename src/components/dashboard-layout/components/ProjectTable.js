"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/dataTable";
import { cn, getName } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDateTime } from '@/lib/chatDate';
import { useRouter } from "next/navigation";

const columns = [
  {
    accessorKey: "name",
    header: "Customer",
  },
  {
    accessorKey: "originLocation",
    header: "Origin Location",
  },
  {
    accessorKey: "move_date",
    header: "Move Date",
  },
  {
    accessorKey: "desitnationLocation",
    header: "Desitnation Location",
  },
  {
    accessorKey: "residence_type",
    header: "Residence Type",
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
            value === "accepted"
              ? "bg-success text-white"
              : value === "rejected"
                ? "bg-danger text-white"
                : value === "new"
                  ? "bg-purple/20 text-white"
                  : value === "completed"
                    ? "bg-success/20 text-white"
                    : value === "sent"
                      ? "bg-orange/20 text-white"
                      : value === "start_scan"
                        ? "bg-purple text-white"
                        : value === "end_scan"
                          ? "bg-green text-white"
                          : value === "posted"
                            ? "bg-blue-500 text-white"
                            : "bg-danger-100/20 text-white"
          )}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
];

const ProjectsTable = ({ projectData }) => {
  const [data, setData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    projectData.forEach((item) => {
      item.name = getName(item.first_name, item.last_name);
      item.date = formatDateTime(item.updated_at);
      item.originLocation = JSON.parse(item.from).description;
      item.desitnationLocation = JSON.parse(item.destination).description
    });
    setData(projectData);
  }, [projectData.length])
  return (
    <Card className="border-none bg-background rounded-[14px]">
      <CardHeader className="flex gap-4 md:flex-row justify-between md:items-center">
        <CardTitle>Recent Projects</CardTitle>
        {/* <Select>
          <SelectTrigger className="w-[180px] text-white/70">
            <SelectValue placeholder="Assign to me" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"assign-to-me"}>Assign to me</SelectItem>
          </SelectContent>
        </Select> */}
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={data}
          tableClasses="border-0 border-separate border-spacing-y-2"
          rowClasses="border-b border-[#ffffff40]"
          headerClasses="border-none rounded-xl outline -outline-offset-2"
        />
        <Button
          variant="ghost"
          className="bg-background p-0 relative top-2 text-xs font-bold"
          onClick={() => router.push("dashboard/projects")}
        >
          View All
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectsTable;
