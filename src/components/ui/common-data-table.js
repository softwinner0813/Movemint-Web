import React from "react";
import OpenFilter from "../icons/open-filter";
import { ChevronDownIcon } from "lucide-react";
import ResetIcon from "../icons/reset-icon";
import { Card, CardContent } from "./card";
import { DataTable } from "./dataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Calendar } from "./calendar";

const CommonDataTable = ({
  columns,
  data,
  moveTypeValue,
  proposalStatusValue,
  rowClickHandler,
}) => {
  const [date, setDate] = React.useState(new Date());
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:flex lg:flex-wrap max-w-full lg:max-w-fit items-center bg-foreground rounded-md">
        <div className="p-2 lg:p-6 hidden lg:flex border-b md:border-b-0 justify-center h-full items-center md:border-r border-gray-300">
          <OpenFilter />
        </div>
        <div className="p-2 lg:p-6 hidden lg:flex border-b md:border-b-0 justify-center h-full items-center md:border-r border-gray-300">
          <span className="text-background text-sm font-extrabold">
            Filter By
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="text-black text-sm font-extrabold">
            <div className="p-2 lg:p-6 border-b md:border-b-0 justify-center h-full items-center flex md:border-r border-gray-300">
              <div className="flex items-center space-x-1 cursor-pointer">
                <span className="text-black text-sm font-extrabold">Date</span>
                <ChevronDownIcon className="w-4 h-4 text-black" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-none">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className={"border"}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="text-black text-sm font-extrabold">
            <div className="p-2 lg:p-6 border-b md:border-b-0 justify-center h-full items-center flex md:border-r border-gray-300">
              <div className="flex items-center space-x-1 cursor-pointer">
                <span className="text-black text-sm font-extrabold">
                  Move Type
                </span>
                <ChevronDownIcon className="w-4 h-4 text-black" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            {moveTypeValue.map((item) => {
              return (
                <DropdownMenuItem
                  className="text-black text-sm font-extrabold"
                  key={item.value}
                >
                  {item.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="text-black text-sm font-extrabold">
            <div className="p-2 lg:p-6 border-b md:border-b-0 justify-center h-full items-center flex md:border-r border-gray-300">
              <div className="flex items-center space-x-1 cursor-pointer">
                <span className="text-black text-sm font-extrabold">
                  Proposal Status
                </span>
                <ChevronDownIcon className="w-4 h-4 text-black" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            {proposalStatusValue.map((item) => {
              return (
                <DropdownMenuItem
                  className="text-black text-sm font-extrabold"
                  key={item.value}
                >
                  {item.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="p-2 lg:p-6 justify-center h-full items-center flex">
          <div className="flex items-center space-x-1 cursor-pointer">
            <span className="text-red-500 cursor-pointer text-sm font-extrabold flex gap-1">
              <ResetIcon />
              Reset Filter
            </span>
          </div>
        </div>
      </div>

      <Card className="border-none bg-background">
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={data}
            tableClasses="border-0"
            rowClasses="border-b border-[#ffffff40] cursor-pointer"
            headerClasses="bg-white text-black border-none rounded-tl-lg rounded-tr-lg"
            headerStyle={{ borderRadius: "16px 16px 0 0" }}
            theadClasses="font-bold"
            rowClickHandler={rowClickHandler}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default CommonDataTable;
