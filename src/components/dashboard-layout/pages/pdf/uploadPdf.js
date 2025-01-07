"use client"; // Add this line to make this file a Client Component

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
// import PdfThumbnail from "./pdfThumbnail"; // Import the PdfThumbnail component
import CommonModel from "../../components/common-model";
import SignModel from "../../components/sign-model";
import { FileTextIcon } from '@radix-ui/react-icons';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PdfPage from "./page";
import ContractTemplateList from "./templateList";

const UploadPdfPage = () => {
 
  const onClickTemplate = (template) => {
    // Do something with the template data
    console.log(template);
  };
  return (
    <>
      <div className="w-full rounded-lg   grid grid-cols-12">
        <div className="col-span-3 mr-2">
          <ContractTemplateList
          onClickTemplate={onClickTemplate}
          />
        </div>
        <div className="col-span-9">
          {/* Main Contents */}
          <div className="h-full bg-background  rounded-lg p-4">
            {/* Add your main contents here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPdfPage;
