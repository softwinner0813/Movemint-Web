"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useCallback } from "react";
import { Document, Page } from "react-pdf";
// eslint-disable-next-line no-duplicate-imports
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfPage = () => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(600); // Default width for desktop
  const [aspectRatio, setAspectRatio] = useState(1); // Default aspect ratio

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = ({ originalWidth, originalHeight }) => {
    const calculatedAspectRatio = originalWidth / originalHeight;
    setAspectRatio(calculatedAspectRatio);
  };

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  const updatePageWidth = useCallback(() => {
    if (window.innerWidth < 640) {
      setPageWidth(window.innerWidth * 0.9); // Mobile size
    } else {
      setPageWidth(window.innerWidth * 0.7); // Desktop size
    }
  }, []);

  useEffect(() => {
    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, [updatePageWidth]);

  return (
    <>
      <div className="flex flex-col items-center overflow-auto">
        <Document
          file="/dummy-file.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            width={pageWidth}
            height={pageWidth / aspectRatio} // Maintain aspect ratio
            onLoadSuccess={onPageLoadSuccess}
          />
        </Document>
        <div className="flex justify-evenly mt-4 w-full max-w-[600px] gap-5">
          <Button
            variant="gray"
            className="h-[25px] max-w-max rounded-[10px] bg-gray-500"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <p className="shrink-0">
            Page {pageNumber} of {numPages}
          </p>
          <Button
            variant="gray"
            className="h-[25px] max-w-[97px] rounded-[10px]"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default PdfPage;
