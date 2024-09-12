import EditProfileForm from "@/components/dashboard-layout/pages/edit-profile";
import React from "react";

const page = () => {
  return (
    <div className="w-full bg-background flex items-center justify-center p-4 md:p-10 rounded-lg">
      <EditProfileForm />
    </div>
  );
};

export default page;
