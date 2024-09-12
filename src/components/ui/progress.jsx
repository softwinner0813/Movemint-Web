import React from "react";

const Progress = ({ percentage }) => {
  return (
    <div className="w-[207px] h-[7px] rounded-full bg-[#F5F5F5] overflow-hidden">
      <div
        className="bg-primary h-full rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default Progress;
