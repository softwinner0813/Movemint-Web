"use client"; // Add this line to make this file a Client Component

import { useState, useRef, useEffect } from "react";
import ContractTemplateList from "./templateList";
import MainContract from "./mainContract";
import { getProposalByID } from "@/services/api";
import { resolve } from "styled-jsx/css";
import { set } from "nprogress";
import { useUser } from "@/lib/userContext";

const UploadPdfPage = ({ proposalId }) => {
  const { userData, setUserData } = useUser();
  
  const [template, setTemplate] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [workData, setWorkData] = useState(null);


  useEffect(() => {
    // Fetch proposal data using proposalId
    const fetchProposalData = async () => {
      try {
        const response = await getProposalByID(proposalId);
        // Do something with the proposal data
        // console.log("------- 👌👌👌 Proposal Data: 👌👌👌 -------", response);
        if (response.result) {
          const data = response.data;

          if(data.mover_id != userData.mover.id){
            console.log("No access permission");
            alert("No access permission");
            window.location.href = "/dashboard";
            return;
          }

          const workspace = data.work_contract;
          if (workspace) {
            const workData = JSON.parse(workspace);
            console.log("Work Data: ", workData);
            const template = workData.template;
            const pageNumber = workData.pageNumber;
            const fabricData = workData.data;
            setPageNumber(pageNumber);
            setWorkData(fabricData);
            setTemplate(template);
          }

          
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProposalData();
  }, [proposalId]);

  const onClickTemplate = (seletedTemplate) => {
    // Do something with the template data
    console.log(seletedTemplate);
    setPageNumber(1);
    setWorkData(null);
    setTemplate(seletedTemplate);
  };
  return (
    <>
      <div className="w-full h-full rounded-lg grid grid-cols-12">
        <div className="col-span-3 mr-5">
          <ContractTemplateList onClickTemplate={onClickTemplate} />
        </div>
        <div className="col-span-9">
          <MainContract
            template={template}
            pageNum={pageNumber}
            workData={workData}
            proposalId={proposalId} />
        </div>
      </div >
    </>
  );
};

export default UploadPdfPage;
