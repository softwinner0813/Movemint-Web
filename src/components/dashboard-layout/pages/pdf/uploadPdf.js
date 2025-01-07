"use client"; // Add this line to make this file a Client Component

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
// import PdfThumbnail from "./pdfThumbnail"; // Import the PdfThumbnail component
import CommonModel from "../../components/common-model";
import SignModel from "../../components/sign-model";
import { FileTextIcon } from '@radix-ui/react-icons';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PdfPage from "./page";

const UploadPdfPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSignModalOpen, setIsSigModalOpen] = useState(false);
  const [sign, setSign] = useState({});
  const [uploadedPdf, setUploadedPdf] = useState(false);
  const [uploadedSubmit, setUploadedSubmit] = useState(0);
  const [fileLists, setFileLists] = useState([]);
  const childRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    console.log("Updated File Lists:", fileLists);
  }, [fileLists]);

  const handleOpenSignModal = () => {
    if (uploadedPdf === true) {
      setIsSigModalOpen(true);
    } else {
      alert("Please choose a PDF file.");
    }
  };

  const type_date = () => {
    setIsUploadModalOpen(false);
    setIsSigModalOpen(false);
    setIsModalOpen(false);
    if (childRef.current) {
      childRef.current.handleSignDate();
    }
  };

  const type_name = (signName) => {
    setIsUploadModalOpen(false);
    setIsSigModalOpen(false);
    setIsModalOpen(false);
    setSign(signName);
    console.log(signName);
  };

  const submitPdf = () => {
    setUploadedSubmit(uploadedSubmit + 1);
  };

  const uploadFlag = () => {
    setUploadedPdf(true);
  };

  const addPDfFile = () => {
    fileInputRef.current.click();
  };

  const getFileList = () => {
    const files = fileInputRef.current.files;
    const fileNames = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      fileNames.push(file); // Store the actual file object, not just the name
    }

    setFileLists((prevFileLists) => [...prevFileLists, ...fileNames]);
    console.log("FileList=> ", fileLists);
  };
  const handleFileClick = (file, index) => {
    alert(`Clicked on file: ${file.name}, Index: ${index}`);
    // Add your desired functionality here, such as opening a modal, downloading the file, etc.
  };


  return (
    <>
      <div className="w-full bg-background rounded-lg px-[34px] pt-9 pb-[52px] grid grid-cols-12">
        <div className="text-white text-2xl font-bold mb-2 col-span-2">
          <div className="text-white text-2xl mb-2 flex justify-center my-3">
            <Button
              className="max-w-[100px] h-8 rounded-xl text-md"
              onClick={addPDfFile}
            >
              + Add
            </Button>
            <input type="file" accept="application/pdf" ref={fileInputRef} onChange={getFileList} hidden multiple />
          </div>

          {/* Render the uploaded file names with thumbnails */}
          <div className="text-white text-sm font-medium my-4" style={{ height: 'auto' }}>
            {fileLists.length > 0 ? (
              <div className="max-h-[400px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                <ul>
                  {fileLists.map((file, index) => (
                    <li key={index} className="cursor-pointer  rounded-lg transition-shadow hover:shadow-md hover:shadow-gray-400 mt-2"
                      onClick={() => handleFileClick(file, index)} >
                      <p className="flex items-center gap-2">
                        {index + 1}. {file.name}
                        <FileTextIcon className="text-red-600 h-5 w-5" />
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No files uploaded yet.</p>
            )}
          </div>

        </div>

        <div className="col-span-10">
          <div className="flex justify-center pt-[38px]">
            {/* PdfPage Component is being passed ref and props */}
            <PdfPage ref={childRef} sign={sign} submit={uploadedSubmit} uploadFlag={uploadFlag} />
          </div>
          <div className="space-y-8">
            <div className="flex justify-center mt-5">
              <Button className="max-w-[274px] h-14 rounded-xl text-lg" onClick={handleOpenSignModal}>
                Signature
              </Button>
              <Button className="max-w-[274px] h-14 rounded-xl text-lg mx-2" onClick={type_date}>
                Date
              </Button>
              <Button className="max-w-[274px] h-14 rounded-xl text-lg" onClick={submitPdf}>
                Submit Contract
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CommonModel
          mainHeading="Confirm your purchase"
          subHeading="Your card on file will immediately be charged $299.99 for bidding on this project. Please confirm if you’d like to proceed."
          cancelButtonContent="Cancel"
          mainButtonContent="Purchase"
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isSignModalOpen && (
        <SignModel
          mainHeading="Add Your Signature"
          subHeading="Please sign your name or upload an image of your signature to proceed."
          cancelButtonContent="Cancel"
          mainButtonContent="Add Signature"
          setIsModalClose={setIsSigModalOpen}
          onConfirm={type_name}
        />
      )}
    </>
  );
};

export default UploadPdfPage;
