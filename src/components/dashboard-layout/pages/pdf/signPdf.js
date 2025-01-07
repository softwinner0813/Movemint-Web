"use client"; // Add this line to make this file a Client Component

import { useState, useRef, useEffect } from "react";
import ContractTemplateList from "./templateList";
import MainContract from "./mainContract";

const SignPdfPage = () => {
  const [template, setTemplate] = useState(null);

  const onClickTemplate = (seletedTemplate) => {
    // Do something with the template data
    console.log(seletedTemplate);
    setTemplate(seletedTemplate);
  };
  return (
    <>
      <div className="w-full h-full rounded-lg grid grid-cols-12">
        <div className="col-span-12">
          <MainContract template={template} />
        </div>
      </div >
    </>
  );
};

export default SignPdfPage;
