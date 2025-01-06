"use client";
import { Button } from "@/components/ui/button";
import PdfPage from "./page";
import { useState, useRef } from "react";
import CommonModel from "../../components/common-model";
import SignModel from "../../components/sign-model";

const UploadPdfPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSignModalOpen, setIsSigModalOpen] = useState(false);
  const [sign, setSign] = useState({});
  const [uploadedPdf, setUploadedPdf] = useState(true)
  const childRef = useRef();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenSignModal = () => {
    if (uploadedPdf == true) {
      setIsSigModalOpen(true);
    } else {
      alert("Please choose a PDF file.");
    }
  }
  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };
  const type_date = () => {
    setIsUploadModalOpen(false);
    setIsSigModalOpen(false);
    setIsModalOpen(false);
    if (childRef.current) {
      childRef.current.handleSignDate(); // Call the child function
    }
  }
  const type_name = (signName) => {
    setIsUploadModalOpen(false);
    setIsSigModalOpen(false);
    setIsModalOpen(false);
    setSign(signName)
    console.log(signName.activeTab)
  }

  return (
    <>
      <div className="w-full py-[30px] px-[34px] bg-background rounded-lg">
      </div>
      <div className="w-full bg-background rounded-lg px-[34px] pt-9 pb-[52px]">
        <div className="text-white text-2xl font-bold mb-2">
          Upload PDF Document
        </div>
        <div className="flex justify-center pt-[38px]">
          <PdfPage ref={childRef} sign={sign} />
        </div>
        <div className="space-y-8">

          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> */}
          <div className="flex justify-center mt-5">
            <Button className="max-w-[274px] h-14 rounded-xl text-lg" onClick={handleOpenSignModal}>
              Signature
            </Button>
            <Button className="max-w-[274px] h-14 rounded-xl text-lg mx-2" onClick={type_date}>
              Date
            </Button>
            <Button
              className="max-w-[274px] h-14 rounded-xl text-lg"
              onClick={handleOpenModal}
            >
              Submit Contract
            </Button>
          </div>
        </div>
      </div >
      {isModalOpen && (
        <CommonModel
          mainHeading="Confirm your purchase"
          subHeading="Your card on file will immediately be charged $299.99 for bidding on this project. Please confirm if you’d like
to proceed."
          cancelButtonContent="Cancel"
          mainButtonContent="Purchase"
          setIsModalOpen={setIsModalOpen}
        />
      )
      }
      {
        isUploadModalOpen && (
          <CommonModel
            mainHeading="Oops, sorry we’ve encountered an error"
            subHeading="Your payment method on file was declined. Please retry the payment method below or click here to update 
your payment method on file."
            cancelButtonContent="Cancel"
            mainButtonContent="Retry Payment"
            setIsModalOpen={setIsUploadModalOpen}
          />
        )
      }
      {
        isSignModalOpen && (
          <SignModel
            mainHeading="Add Your Signature"
            subHeading="Please sign your name or upload an image of your signature to proceed."
            cancelButtonContent="Cancel"
            mainButtonContent="Add Signature"
            setIsModalClose={setIsSigModalOpen}
            onConfirm={type_name}
          />
        )
      }
    </>
  );
};

export default UploadPdfPage;
