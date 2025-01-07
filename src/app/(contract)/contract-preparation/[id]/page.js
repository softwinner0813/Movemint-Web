"use client"

import UploadPdfPage from "@/components/dashboard-layout/pages/pdf/uploadPdf";
import React, { useEffect } from "react";

const page = ({ params }) => {
  const { id } = params;
  return (
    <>
      <UploadPdfPage proposalId={id} />
    </>
  );
};

export default page;
