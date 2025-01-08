import SignPdfPage from "@/components/dashboard-layout/pages/pdf/signPdf";
import React from "react";

const page = ({ params }) => {
  const { id } = params;

  return (
    <>
      <SignPdfPage proposalId={id} />
    </>
  );
};

export default page;
