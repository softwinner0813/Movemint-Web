"use client"; // Add this line to make this file a Client Component

import { useState, useRef, useEffect } from "react";
import ContractTemplateList from "./templateList";
import MainContract from "./mainContract";
import { getProposalByID } from "@/services/api";

const SignPdfPage = ({ proposalId }) => {
  const [template, setTemplate] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [workData, setWorkData] = useState(null);

  useEffect(() => {
    // Fetch proposal data using proposalId
    const fetchProposalData = async () => {
      try {
        const response = await getProposalByID(proposalId);
        // Do something with the proposal data
        console.log("------- 👌👌👌 Proposal Data: 👌👌👌 -------", response);
        if (response.result) {
          const data = response.data;
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

    if (proposalId) {
      fetchProposalData();
    }
  }, [proposalId]);

  return (
    <>
      <div className="w-full h-full rounded-lg grid grid-cols-12">
        <div className="col-span-12">
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

export default SignPdfPage;
