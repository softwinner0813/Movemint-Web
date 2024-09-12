import AddNewMemberForm from "@/components/dashboard-layout/pages/add-new-member";
import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full bg-background flex items-center justify-center p-4 md:p-10 rounded-lg">
        <AddNewMemberForm />
      </div>
      <div className="w-full bg-background flex items-center justify-center p-4 md:p-10 rounded-lg">
        <AddNewMemberForm editMode />
      </div>
    </>
  );
};

export default page;
