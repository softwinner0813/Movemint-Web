import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
// import ClosingIcon from "@/components/icons/closing-icon";
import MovesBookedIcon from "@/components/icons/moves-booked-icon";
import RevenueIcon from "@/components/icons/revenue-icon";
import OpportunitiesIcon from "@/components/icons/opportunities-icon";
import GrowIcon from "@/components/icons/grow-icon";
import LossIcon from "@/components/icons/loss-icon";

const Stats = ({ data }) => {
  const stats = [
    {
      title: "Total Moves Booked",
      value: (data?.totalBookedProjects == undefined ? "0" : data?.totalBookedProjects) + " Moves",
      icon: <MovesBookedIcon />,
      change: "1.3% Up from past week",
      changeType: "up",
    },
    {
      title: "Total Revenue",
      value: "$ " + (data?.totalTransactionVolume == undefined ? "0" : data?.totalTransactionVolume),
      icon: <RevenueIcon />,
      change: "4.3% Down from yesterday",
      changeType: "down",
    },
    {
      title: "Live Opportunities",
      value: data?.activeProjects + " Projects",
      icon: <OpportunitiesIcon />,
      change: "1.8% Up from yesterday",
      changeType: "up",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-7">
      {stats.map((item, index) => (
        <Card
          key={index}
          className="border-none bg-background flex flex-col justify-between rounded-[14px]"
        >
          <CardHeader>
            <div className="flex justify-between gap-4">
              <CardTitle className="text-base">
                <p className="mb-4 font-bold"> {item.title}</p>
                <p className=" text-3xl">{item.value}</p>
              </CardTitle>
              <CardDescription>
                <span
                  className={cn(
                    "h-14 w-14 rounded-3xl grid place-content-center"
                  )}
                >
                  {item.icon}
                </span>
              </CardDescription>
            </div>
          </CardHeader>
          {/* <CardFooter>
              <p className="flex gap-x-3 items-center">
                {item.changeType === "up" ? <GrowIcon /> : <LossIcon />}{" "}
                <span
                  className={cn(
                    "text-muted-foreground",
                    item.changeType === "up" ? "text-success" : "text-danger"
                  )}
                >
                  8.5%
                </span>{" "}
                Up from yesterday
              </p>
            </CardFooter> */}
        </Card>
      ))}
    </div>
  );
};

export default Stats;
