"use client"; // Add this line to make this file a Client Component

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import PdfPage from "./page";
import ContractTemplateList from "./templateList";

const UploadPdfPage = () => {
  const [template, setTemplate] = useState(null);

  const onClickTemplate = (seletedTemplate) => {
    // Do something with the template data
    console.log(seletedTemplate);
    setTemplate(seletedTemplate);
  };
  return (
    <>
      <div className="w-full h-full rounded-lg   grid grid-cols-12">
        <div className="col-span-3 mr-2">
          <ContractTemplateList onClickTemplate={onClickTemplate} />
        </div>
        <div className="col-span-9">
          <PdfPage template={template} />
        </div>
      </div>
    </>
  );
};

export default UploadPdfPage;
