import React, { useState, useEffect, useCallback, useRef } from "react";
import { pdfjs } from "react-pdf";
import { fabric } from "fabric";
import { forwardRef, useImperativeHandle } from "react";
import { circle } from "@amcharts/amcharts5/.internal/core/util/Ease";
import { Button } from "@/components/ui/button";


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfPage = forwardRef((props, ref) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(600); // Default width
  const [aspectRatio, setAspectRatio] = useState(1); // Default aspect ratio
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  // const [canvasStatus, setCanvasSatus] = useState(false);

  const [pdfFile, setPdfFile] = useState(null);
  // console.log("props = >", props);

  const updatePageWidth = useCallback(() => {
    if (window.innerWidth < 640) {
      setPageWidth(window.innerWidth * 0.9); // Mobile size
    } else {
      setPageWidth(window.innerWidth * 0.7); // Desktop size
    }
  }, []);

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
      try {
        const fileReader = new FileReader();
        fileReader.onload = async () => {
          const arrayBuffer = fileReader.result;
          const pdf = await pdfjs.getDocument(arrayBuffer).promise;
          setNumPages(pdf.numPages);
        };
        fileReader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    }
  };
  const handleFileImport = () => {
    if (fileInputRef.current) {
      // setCanvasSatus(true)
      fileInputRef.current.click(); // Programmatically click the file input
    }
  }
  useEffect(() => {
    if (props.showSignaturePad == true) {
      handleSignDate();
    }
  }, [])
  useEffect(() => {
    handleSignName(props.sign.name)
  }, [props.sign.name])
  const renderPdfOnCanvas = async (pdfFile, pageNumber) => {
    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: pdfBytes });
      const pdfDoc = await loadingTask.promise;

      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 }); // Adjust scale as needed

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
        const imgDataUrl = tempCanvas.toDataURL();
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
    } catch (error) {
      console.error("Error rendering PDF on Fabric.js canvas:", error);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const fabricCanvas = new fabric.Canvas(canvas, {
      isDrawingMode: false, // Disable drawing mode
    });

    fabricCanvas.setDimensions({
      width: pageWidth,
      height: pageWidth / aspectRatio,
    });

    fabricCanvasRef.current = fabricCanvas;

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }
    };
  }, [pageWidth, aspectRatio]);

  useEffect(() => {
    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, [updatePageWidth]);

  useEffect(() => {
    if (pdfFile) {
      renderPdfOnCanvas(pdfFile, pageNumber);
    }
  }, [pdfFile, pageNumber]);

  const handleSignDate = () => {
    const fabricCanvas = fabricCanvasRef.current;
    if (fabricCanvas) {
      const currentDate = new Date().toLocaleDateString();
      const dateText = new fabric.IText(currentDate, {
        left: fabricCanvas.width / 2 - 50,        // Horizontal position of the text
        top: fabricCanvas.height / 2 - 20,        // Vertical position of the text
        fontSize: 16,                             // Font size in pixels
        editable: true,                           // Allow the user to edit the text
        fill: "blue",
        fontFamily: 'Pacifico',                      // Font family of the text
        fontStyle: 'italic',                      // Font style of the text
        textAlign: 'center',                      // Horizontal alignment of the text
        lineHeight: 1.5,                          // Line height
        shadow: {                                 // Shadow settings
          color: 'rgba(0, 0, 0, 0.1)',            // Shadow color
          blur: 5,                                // Shadow blur radius
          offsetX: 3,                             // Horizontal offset of the shadow
          offsetY: 3                              // Vertical offset of the shadow
        },
        stroke: 'blue',                            // Stroke (outline) color
        lineWidth: 2,                             // Line width for the stroke
        letterSpacing: 2,                         // Spacing between letters
        textDecoration: 'underline',              // Text decoration (underline, line-through)
        originX: 'center',                        // Horizontal alignment origin
        originY: 'center',                        // Vertical alignment origin
        angle: 0,
        cornerStyle: 'circle',
        transparentCorners: false,
      });
      // Add the text to the canvas
      fabricCanvas.add(dateText);
      fabricCanvas.setActiveObject(dateText);
      fabricCanvas.renderAll();
      // Function to delete the active object
      const deleteActiveObject = () => {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject) {
          fabricCanvas.remove(activeObject);
          fabricCanvas.renderAll(); // Re-render the canvas after removal
        }
      };

      // Function to clear the canvas (close)
      const closeCanvas = () => {
        fabricCanvas.clear(); // Clears all objects on the canvas
        fabricCanvas.renderAll(); // Re-renders the empty canvas
      };
      // Example usage: You can trigger the delete function on a button click
      const deleteButton = document.getElementById('delete-button');
      if (deleteButton) {
        deleteButton.addEventListener('click', deleteActiveObject);
      }
      // Example usage: You can trigger the close function on a close button click
      const closeButton = document.getElementById('close-button');
      if (closeButton) {
        closeButton.addEventListener('click', closeCanvas);
      }
      // Or, you could add functionality to delete on key press (e.g., the 'Delete' key)
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Delete') {
          deleteActiveObject();
        }
      });
    }

  };
  const handleSignName = (value) => {
    const fabricCanvas = fabricCanvasRef.current;
    if (fabricCanvas && typeof value === 'string' && value.trim() !== '') {
      const nameText = new fabric.IText(value, {
        left: fabricCanvas.width / 2 - 50,        // Horizontal position of the text
        top: fabricCanvas.height / 2 - 20,        // Vertical position of the text
        fontSize: 20,                             // Font size in pixels
        editable: true,                           // Allow the user to edit the text
        fill: "blue",
        fontFamily: 'Arial',                      // Font family of the text
        fontWeight: 'bold',                       // Font weight of the text
        fontStyle: 'italic',                      // Font style of the text
        textAlign: 'center',                      // Horizontal alignment of the text
        lineHeight: 1.5,                          // Line height
        shadow: {                                 // Shadow settings
          color: 'rgba(0, 0, 0, 0.1)',            // Shadow color
          blur: 5,                                // Shadow blur radius
          offsetX: 3,                             // Horizontal offset of the shadow
          offsetY: 3                              // Vertical offset of the shadow
        },
        stroke: 'blue',                            // Stroke (outline) color
        lineWidth: 2,                             // Line width for the stroke
        letterSpacing: 2,                         // Spacing between letters
        textDecoration: 'underline',              // Text decoration (underline, line-through)
        originX: 'center',                        // Horizontal alignment origin
        originY: 'center',                        // Vertical alignment origin
        angle: 0,
        cornerStyle: 'circle',
        transparentCorners: false,
      });

      // Add the text (your name) to the canvas
      fabricCanvas.add(nameText);
      fabricCanvas.setActiveObject(nameText);
      fabricCanvas.renderAll();
    } else {
      console.error("Invalid name value provided.");
    }
  };


  // Expose the function to the parent via the ref
  useImperativeHandle(ref, () => ({
    handleSignDate,
  }));

  return (
    <div className="flex flex-col items-center gap-4">
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
          onClick={handleFileImport}
        >
          Upload
        </Button>
      </div>

      <div>
        <input type="file" accept="application/pdf" onChange={handlePdfUpload} ref={fileInputRef} hidden />
      </div>

      <div className="flex flex-col items-center overflow-auto">
        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid #000",
            width: `${pageWidth}px`,
            height: `${pageWidth / aspectRatio}px`,
          }}
        ></canvas>
        <div className="flex justify-evenly mt-4 w-full max-w-[600px] gap-5">
          <button
            className="h-[25px] max-w-max rounded-[10px] bg-gray-500 px-3 text-white"
            onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}
            disabled={pageNumber <= 1}
          >
            Previous
          </button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button
            className="h-[25px] max-w-max rounded-[10px] bg-gray-500 px-3 text-white"
            onClick={() => setPageNumber(Math.min(pageNumber + 1, numPages))}
            disabled={pageNumber >= numPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
})

export default PdfPage;
