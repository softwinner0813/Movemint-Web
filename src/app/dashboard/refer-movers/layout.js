import React from "react";

const ReferLayout = ({children}) => {
  return (
    <div className="h-full flex flex-col gap-6">
      <p className="text-3xl font-bold">Refer Movers</p>
      {children}
    </div>
  );
};

export default ReferLayout;
