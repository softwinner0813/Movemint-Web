"use client";
import { Button } from "@/components/ui/button";
import PdfPage from "./page";
import { useState } from "react";
import CommonModel from "../../components/common-model";

const UploadPdfPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };
  return (
    <>
      <div className="w-full py-[30px] px-[34px] bg-background rounded-lg">
        <div className="text-white text-2xl font-bold mb-2">
          Upload PDF Document
        </div>
        <div className="relative w-full h-12 bg-white rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            style={{ width: "50%" }}
          />
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            className="max-w-[134px] h-[38px] rounded-2xl"
            onClick={handleOpenUploadModal}
          >
            Upload
          </Button>
        </div>
      </div>
      <div className="w-full bg-background rounded-lg px-[34px] pt-9 pb-[52px]">
        <div className="text-white text-2xl font-bold mb-2">
          Upload PDF Document
        </div>
        <div className="flex justify-center pt-[38px]">
          <PdfPage />
        </div>
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-center mt-4">
            Drag & Drop Fields Below:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-[70px]">
              Client Signature
            </Button>
            <Button variant="outline" className="h-[70px]">
              My Signature
            </Button>
            <Button variant="outline" className="h-[70px]">
              Initials
            </Button>
            <Button variant="outline" className="h-[70px]">
              Date
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              className="max-w-[274px] h-14 rounded-xl text-lg"
              onClick={handleOpenModal}
            >
              Submit Contract
            </Button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CommonModel
          mainHeading="Confirm your purchase"
          subHeading="Your card on file will immediately be charged $299.99 for bidding on this project. Please confirm if you’d like
to proceed."
          cancelButtonContent="Cancel"
          mainButtonContent="Purchase"
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isUploadModalOpen && (
        <CommonModel
          mainHeading="Oops, sorry we’ve encountered an error"
          subHeading="Your payment method on file was declined. Please retry the payment method below or click here to update 
your payment method on file."
          cancelButtonContent="Cancel"
          mainButtonContent="Retry Payment"
          setIsModalOpen={setIsUploadModalOpen}
        />
      )}
    </>
  );
};

export default UploadPdfPage;
