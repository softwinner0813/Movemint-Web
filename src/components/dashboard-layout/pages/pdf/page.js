import { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { fabric } from "fabric";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Button } from "@/components/ui/button";

const PdfPage = ({ template }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [pdfData, setPdfData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const initFabricCanvas = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const fabricCanvas = new fabric.Canvas(canvas, {
          isDrawingMode: false,
        });

        fabricCanvas.setDimensions({
          width: canvas.width,
          height: canvas.height,
        });

        fabricCanvasRef.current = fabricCanvas;

        return () => {
          if (fabricCanvasRef.current) {
            fabricCanvasRef.current.dispose();
          }
        };
      }
    };

    initFabricCanvas();
  }, []);

  useEffect(() => {
    if (template?.link) {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}${template.link}`;
      loadPdf(url);
    }
  }, [template]);

  const loadPdf = async (url) => {
    try {
      NProgress.start(); // Start progress bar
      const pdfArrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
      const loadingTask = pdfjs.getDocument(pdfArrayBuffer);
      const pdfDoc = await loadingTask.promise;

      setPdfData(pdfDoc);
      setTotalPages(pdfDoc.numPages);
      await renderPage(1, pdfDoc);
      NProgress.done(); // End progress bar
    } catch (error) {
      NProgress.done(); // End progress bar even on error
      console.error("Error loading PDF:", error);
    }
  };

  const renderPage = async (pageNumber, pdfDoc) => {
    try {
      if (!pdfDoc) return;
      NProgress.start(); // Start progress bar for rendering
      const page = await pdfDoc.getPage(pageNumber);

      const scale = 1;
      const viewport = page.getViewport({ scale });

      const tempCanvas = document.createElement("canvas");
      const context = tempCanvas.getContext("2d");
      tempCanvas.height = viewport.height;
      tempCanvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      const fabricCanvas = fabricCanvasRef.current;
      if (fabricCanvas) {
        const imgDataUrl = tempCanvas.toDataURL("image/png");
        fabric.Image.fromURL(imgDataUrl, (fabricImage) => {
          fabricCanvas.setBackgroundImage(
            fabricImage,
            fabricCanvas.renderAll.bind(fabricCanvas),
            {
              scaleX: fabricCanvas.width / fabricImage.width,
              scaleY: fabricCanvas.height / fabricImage.height,
            }
          );
        });
      }
      NProgress.done(); // End progress bar
    } catch (error) {
      NProgress.done(); // End progress bar even on error
      console.error("Error rendering PDF page:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      renderPage(nextPage, pdfData);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      renderPage(prevPage, pdfData);
    }
  };

  return (
    <div className="h-full bg-background rounded-lg p-4">
      <div
        className="flex flex-col items-center gap-4"
        style={{ minHeight: 400, maxHeight: 600 }}
      >
        <div className="flex flex-col items-center overflow-auto flex-grow">
          <canvas
            ref={canvasRef}
            style={{
              border: "1px solid #000",
              width: "100%",
              height: "100%",
            }}
          ></canvas>
        </div>

        {/* Page Number */}
        <div className="flex justify-evenly mt-4 w-full max-w-[600px] gap-5">
          <button
            className="h-[25px] max-w-max rounded-[10px] bg-gray-500 px-3 text-white"
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="h-[25px] max-w-max rounded-[10px] bg-gray-500 px-3 text-white"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-5">
          <Button
            className="max-w-[274px]  rounded-xl text-md"
            // onClick={handleSignature}
            style={{ width: "120px" }}
          >
            Signature
          </Button>
          <Button
            className="max-w-[274px]  rounded-xl text-md mx-5"
            // onClick={handleText}
            style={{ width: "120px" }}
          >
            Text
          </Button>
          <Button
            className="max-w-[274px]  rounded-xl text-md"
            // onClick={handleDate}
            style={{ width: "120px" }}
          >
            Date
          </Button>
          <Button
            className="max-w-[274px]  rounded-xl text-md mx-5"
            // onClick={handleSave}
            style={{ width: "120px" }}
          >
            Save
          </Button>
        </div>

      </div>
    </div>
  );
};

export default PdfPage;
