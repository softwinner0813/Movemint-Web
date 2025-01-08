"use client";
import { Button } from "@/components/ui/button";
// import PdfPage from "./page";
import { useState, useRef, useEffect, useCallback } from "react";
import { fabric } from "fabric";
import CommonModel from "../../components/common-model";
import SignModel from "../../components/sign-model";
import { pdfjs } from "react-pdf";
import { saveAs } from "file-saver";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { updateProposalDocument } from '@/services/api';
import { notification } from 'antd';
import { NotificationTypes } from "@/constants/messages";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import { PDFDocument, rgb } from 'pdf-lib';

const MainContract = ({ template, page, workData, proposalId }) => {
  // const { resultLink, savedData } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSignModalOpen, setIsSigModalOpen] = useState(false);
  const [sign, setSign] = useState({});
  const [uploadedPdf, setUploadedPdf] = useState(false)
  const [uploadedSubmit, setUploadedSubmit] = useState(0)
  const [templateLink, setTemplateLink] = useState("")
  const childRef = useRef(null);
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [numPages, setNumPages] = useState(1); // New state for total pages
  const [pageNumber, setPageNumber] = useState(page); // New state for current page
  const [pageWidth, setPageWidth] = useState(600); // Default width
  const [aspectRatio, setAspectRatio] = useState(1);
  const [canvasReady, setCanvasReady] = useState(false);
  const jsonInputRef = useRef();
  const [pdfFile, setPdfFile] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
    });
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  const renderPDF = async (pageNumber, pdfDoc) => {
    try {
      // Fetch the PDF file from the URL
      if (!pdfDoc) return;
      NProgress.start(); // Start progress bar for rendering
      const page = await pdfDoc.getPage(pageNumber);
      // Load the PDF document
      setNumPages(pdfDoc.numPages);
      // Get the requested page from the PDF
      // Increase the scale factor for better quality rendering
      const scale = 2; // Increase scale for better resolution
      const viewport = page.getViewport({ scale });
      // Create a temporary canvas to render the PDF page
      const tempCanvas = document.createElement("canvas");
      const context = tempCanvas.getContext("2d");
      tempCanvas.height = viewport.height;
      tempCanvas.width = viewport.width;

      // Render the PDF page onto the canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      // Get the fabric.js canvas reference
      const fabricCanvas = fabricCanvasRef.current;
      if (fabricCanvas) {
        // Convert the temporary canvas to a high-quality image (PNG)
        const imgDataUrl = tempCanvas.toDataURL("image/png", 3.0); // Set quality to 1.0 for max quality

        // Load the image into fabric.js canvas
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

        // Restore fabric objects from workData
        if (workData && workData.objects) {
          fabricCanvas.loadFromJSON(workData, () => {
            fabricCanvas.renderAll();
          });
        }
      }
      setUploadedPdf(true);
      setPdfFile(true);
    } catch (error) {
      console.log("Error rendering PDF on Fabric.js canvas:", error);
    }
  };

  const handleSignName = (value) => {
    const fabricCanvas = fabricCanvasRef.current;
    if (fabricCanvas && typeof value === 'string' && value.trim() !== '') {
      const nameText = new fabric.IText(value, {
        left: fabricCanvas.width / 2 - 50,        // Horizontal position of the text
        top: fabricCanvas.height / 2 - 20,       // Vertical position of the text
        fontSize: 20,                            // Font size in pixels
        editable: true,                          // Allow the user to edit the text
        fill: "blue",
        fontFamily: 'Pacifico',                  // Font family of the text
        fontStyle: 'italic',                     // Font style of the text
        textAlign: 'center',                     // Horizontal alignment of the text
        lineHeight: 1.5,                         // Line height
        shadow: {                                // Shadow settings
          color: 'rgba(0, 0, 0, 0.1)',           // Shadow color
          blur: 5,                               // Shadow blur radius
          offsetX: 3,                            // Horizontal offset of the shadow
          offsetY: 3                             // Vertical offset of the shadow
        },
        stroke: 'blue',                          // Stroke (outline) color
        lineWidth: 2,                            // Line width for the stroke
        letterSpacing: 2,                        // Spacing between letters
        textDecoration: 'underline',             // Text decoration (underline, line-through)
        originX: 'center',                       // Horizontal alignment origin
        originY: 'center',                       // Vertical alignment origin
        angle: 0,
        cornerStyle: 'circle',
        transparentCorners: false,
      });

      // Add the text to the canvas
      fabricCanvas.add(nameText);
      fabricCanvas.setActiveObject(nameText);
      fabricCanvas.renderAll();

      // Function to delete the active object
      const deleteActiveObject = () => {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject) {
          fabricCanvas.remove(activeObject);
          fabricCanvas.renderAll();
        }
      };

      // Function to clear the canvas
      const clearCanvas = () => {
        fabricCanvas.clear();
        fabricCanvas.renderAll();
      };

      // Add event listener for the 'Delete' key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Delete') {
          deleteActiveObject();
        }
      });

      // Example button for deleting the active object
      const deleteButton = document.getElementById('delete-button');
      if (deleteButton) {
        deleteButton.addEventListener('click', deleteActiveObject);
      }

      // Example button for clearing the canvas
      const clearButton = document.getElementById('clear-button');
      if (clearButton) {
        clearButton.addEventListener('click', clearCanvas);
      }
    } else {
      console.log("Invalid name value provided.");
    }
  };
  const handleSignDate = () => {
    try {
      const fabricCanvas = fabricCanvasRef.current;
      if (!fabricCanvas) {
        console.error("Canvas not initialized");
        return; // Exit early if canvas is not initialized
      }
      const currentDate = new Date().toLocaleDateString();
      const dateText = new fabric.IText(currentDate, {
        left: fabricCanvas.width / 2 - 50,
        top: fabricCanvas.height / 2 - 20,
        fontSize: 16,
        editable: true,
        fill: "blue",
        fontFamily: 'Pacifico',
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 1.5,
        shadow: { color: 'rgba(0, 0, 0, 0)', blur: 5, offsetX: 3, offsetY: 3 },
        stroke: 'blue',
        lineWidth: 2,
        letterSpacing: 2,
        textDecoration: 'underline',
        originX: 'center',
        originY: 'center',
        angle: 0,
        cornerStyle: 'circle',
        transparentCorners: false,
        // Ensure no background for the text object
        backgroundColor: '', // Remove any background color on the text
      });

      fabricCanvas.add(dateText);
      fabricCanvas.setActiveObject(dateText);
      fabricCanvas.renderAll();

    } catch (error) {
      console.error("Error in handleSignDate: ", error);
    }
  };

  const handleImageSign = (imageData) => {
    // Check if imageData is not null, undefined, or empty
    if (imageData && imageData !== "") {
      // Assuming imageData is a base64-encoded string representing an image
      const fabricCanvas = fabricCanvasRef.current;
      if (fabricCanvas) {
        const img = new Image();
        img.onload = () => {
          // Create a fabric Image object from the base64 image data
          const fabricImage = new fabric.Image(img, {
            left: fabricCanvas.width / 2 - img.width / 2, // Center the image horizontally
            top: fabricCanvas.height / 2 - img.height / 2, // Center the image vertically
            angle: 0,                                      // No rotation
            scaleX: 1,                                     // Scale factor for X-axis
            scaleY: 1,                                     // Scale factor for Y-axis
            opacity: 1,                                    // Full opacity
            selectable: true,                              // Allow the image to be selected
            transparentCorners: true,                      // Enable transparent corners
            cornerStyle: 'circle',                         // Corner style for resizing
          });

          // Add the image to the fabric canvas
          fabricCanvas.add(fabricImage);
          fabricCanvas.setActiveObject(fabricImage);
          fabricCanvas.renderAll();

          // Function to delete the active object (image)
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

          // Add functionality to delete on key press (e.g., the 'Delete' key)
          window.addEventListener('keydown', (e) => {
            if (e.key === 'Delete') {
              deleteActiveObject();
            }
          });
        };

        // Set the image source to the image data (base64 string)
        img.src = imageData; // imageData is the base64 PNG data
      } else {
        console.log("Fabric canvas not found.");
      }
    } else {
      console.log("Invalid image data provided.");
    }
  };
  const handleLoadLayout = () => {
    const file = event.target.files[0];
    if (file) {
      // setPdfFile(file);
      // props.uploadFlag();
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setJsonFile(JSON.parse(e.target.result));
      };
      fileReader.readAsText(file);
    }
  }
  const updatePageWidth = useCallback(() => {
    if (window.innerWidth < 640) {
      setPageWidth(window.innerWidth * 0.9); // Mobile size
    } else {
      setPageWidth(window.innerWidth * 0.6); // Desktop size
    }
    if (pdfFile == true) {
      handleSignDate();
    }
  }, []);
  useEffect(() => {
    if (sign.name != "") {
      handleSignName(sign.name)
    }
  }, [sign.name])
  useEffect(() => {
    handleDrawSign(sign.canvasData);
  }, [sign.canvasData]);
  useEffect(() => {
    handleImageSign(sign.imageData);
  }, [sign.imageData]);
  useEffect(() => {
    updatePageWidth();
    // window.addEventListener("resize", updatePageWidth);
    // return () => window.removeEventListener("resize", updatePageWidth);
  }, [updatePageWidth]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const fabricCanvas = new fabric.Canvas(canvas, {
      isDrawingMode: false, // Disable drawing mode,
      backgroundColor: "transparent",
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
    if (template?.link) {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}${template.link}`;
      loadPdf(url);
    }
  }, [template, pageNumber]);
  const loadPdf = async (url) => {
    try {
      NProgress.start(); // Start progress bar
      const pdfArrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
      const loadingTask = pdfjs.getDocument(pdfArrayBuffer);
      const pdfDoc = await loadingTask.promise;
      setPdfData(pdfDoc);
      setNumPages(pdfDoc.numPages);
      await renderPDF(pageNumber, pdfDoc);
      NProgress.done(); // End progress bar
    } catch (error) {
      NProgress.done(); // End progress bar even on error
      console.error("Error loading PDF:", error);
    }
  };


  const handleOpenSignModal = () => {
    if (uploadedPdf == true) {
      setIsSigModalOpen(true);
    } else {
      alert("Please choose a PDF file.");
    }
  }
  const handleDrawSign = (canvasData) => {
    // Check if canvasData is valid
    if (canvasData && canvasData.trim() !== "") {
      // Get the fabric canvas instance
      const fabricCanvas = fabricCanvasRef.current;

      if (fabricCanvas) {
        const img = new Image();

        img.onload = () => {
          // Create a fabric.Image object from the loaded image
          const fabricImage = new fabric.Image(img, {
            left: fabricCanvas.width / 2 - img.width / 2, // Center the image horizontally
            top: fabricCanvas.height / 2 - img.height / 2, // Center the image vertically
            angle: 0, // No rotation
            scaleX: 1, // Default scale factor for X-axis
            scaleY: 1, // Default scale factor for Y-axis
            opacity: 1, // Full opacity
            selectable: true, // Allow image selection
            transparentCorners: true, // Transparent control corners
          });

          // Add the image to the fabric canvas
          fabricCanvas.add(fabricImage);
          fabricCanvas.setActiveObject(fabricImage);
          fabricCanvas.renderAll();

          // Add controls for image manipulation
          const deleteActiveObject = () => {
            const activeObject = fabricCanvas.getActiveObject();
            if (activeObject) {
              fabricCanvas.remove(activeObject);
              fabricCanvas.renderAll();
            }
          };

          const scaleImage = (factor) => {
            const activeObject = fabricCanvas.getActiveObject();
            if (activeObject && activeObject.type === "image") {
              activeObject.scaleX = activeObject.scaleX * factor;
              activeObject.scaleY = activeObject.scaleY * factor;
              fabricCanvas.renderAll();
            }
          };

          const clearCanvas = () => {
            fabricCanvas.clear();
            fabricCanvas.renderAll();
          };

          // Event listener for keyboard interaction
          window.addEventListener("keydown", (e) => {
            if (e.key === "Delete") deleteActiveObject();
          });

          // Button for deleting active object
          const deleteButton = document.getElementById("delete-button");
          if (deleteButton) {
            deleteButton.addEventListener("click", deleteActiveObject);
          }

          // Button for scaling up the image
          const scaleUpButton = document.getElementById("scale-up-button");
          if (scaleUpButton) {
            scaleUpButton.addEventListener("click", () => scaleImage(1.1));
          }

          // Button for scaling down the image
          const scaleDownButton = document.getElementById("scale-down-button");
          if (scaleDownButton) {
            scaleDownButton.addEventListener("click", () => scaleImage(0.9));
          }

          // Button for clearing the canvas
          const clearButton = document.getElementById("clear-button");
          if (clearButton) {
            clearButton.addEventListener("click", clearCanvas);
          }
        };

        // Set the source of the image to the base64 string
        img.src = canvasData;
      } else {
        console.log("Fabric canvas not found.");
      }
    } else {
      console.log("Invalid canvas data provided.");
    }
  };
  const type_date = () => {
    setIsUploadModalOpen(false);
    setIsSigModalOpen(false);
    setIsModalOpen(false);
    handleSignDate(); // Call the child function
  }
  const type_name = (signName) => {
    setIsUploadModalOpen(false);
    setIsSigModalOpen(false);
    setIsModalOpen(false);
    setSign(signName)
    console.log(signName)
  }
  const submitPdf = async () => {
    const fabricCanvas = fabricCanvasRef.current;
    if (fabricCanvas) {
      const json = fabricCanvas.toJSON();
      const data = {
        template: template,
        pageNumber,
        data: json,
      }
      try {
        await updateProposalDocument({
          id: proposalId,
          data: { work_contract: JSON.stringify(data) }
        });
        openNotificationWithIcon(NotificationTypes.SUCCESS, "Success", "Document saved successfully.");
      } catch (error) {
        openNotificationWithIcon(NotificationTypes.ERROR, "Error", "An error occurred while updating the document");
        console.error("An error occurred while updating the document:", error);
      }
      // saveAs(blob, "canvas-state.json");
    } else {
      openNotificationWithIcon(NotificationTypes.WARNING, "Warning", "Please add signature or date");
    }
    setUploadedSubmit(uploadedSubmit + 1)
  };
  const downloadPDF = async () => {
    try {
      // Step 1: Fetch the original PDF
      const pdfUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${template.link}`;
      const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());

      // Step 2: Load the PDF using PDF-lib
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Validate the page number
      if (pageNumber < 1 || pageNumber > pdfDoc.getPageCount()) {
        throw new Error('Invalid page number');
      }

      // Get the specified page
      const page = pdfDoc.getPage(pageNumber - 1); // PDF-lib uses zero-based indexing

      // Step 3: Render Fabric.js canvas to an image
      const fabricCanvas = fabricCanvasRef.current;
      const canvasDataUrl = fabricCanvas.toDataURL(); // Convert canvas to data URL (base64 image)

      // Embed the image in the PDF
      const imageBytes = await fetch(canvasDataUrl).then((res) => res.arrayBuffer());
      const pdfImage = await pdfDoc.embedPng(imageBytes); // Use embedJpg for JPG images

      // Get image dimensions
      const { width, height } = pdfImage.scale(1); // Original dimensions

      // Step 4: Draw the image on the PDF page
      page.drawImage(pdfImage, {
        x: 0, // Adjust X position as needed
        y: 0, // Adjust Y position as needed
        width: width, // Scale image if needed
        height: height,
      });

      // Step 5: Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();

      // Step 6: Create a download link
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'modified.pdf';
      link.click();

      // Clean up
      URL.revokeObjectURL(url);

      console.log("PDF created and downloaded successfully!");
      return 'PDF created and downloaded successfully!';
    } catch (error) {
      console.error('Error creating PDF:', error);
      return 'Error creating PDF';
    }
  }
  return (
    <>
      {contextHolder}
      <div className="w-full bg-background rounded-lg px-[34px] pt-9 pb-[52px]">
        <div className="flex flex-col items-center gap-4 space-y-8" style={{ maxHeight: 700 }}>
          <div className={'flex flex-col items-center overflow-auto ' + (pdfFile ? '' : 'canvas-hide')} >
            <canvas
              ref={canvasRef}
              style={{
                border: "1px solid #000",
                width: `${pageWidth}px`,
                height: `${pageWidth / aspectRatio}px`,
              }}
            ></canvas>
          </div>
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
              {/* Page 1 of 1 */}
            </p>
            <button
              className="h-[25px] max-w-max rounded-[10px] bg-gray-500 px-3 text-white"
              onClick={() => setPageNumber(Math.min(pageNumber + 1, numPages))}
              disabled={pageNumber >= numPages}
            >
              Next
            </button>
          </div>

          <button
            className="absolute top-4 right-12 rounded-full bg-primary px-3 py-3 text-white"
            onClick={downloadPDF}
          >
            <FaDownload />
          </button>
        </div>

        <div className="space-y-8">          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> */}
          <div className="flex justify-center mt-5">
            <Button className="max-w-[274px] rounded-xl text-lg mx-2" onClick={handleOpenSignModal}>
              Signature
            </Button>
            <Button className="max-w-[274px] rounded-xl text-lg mx-2" onClick={type_date}>
              Date
            </Button>
            <Button
              className="max-w-[274px] rounded-xl text-lg mx-2"
              onClick={submitPdf}
            >
              Save
            </Button>
            {/* <Button
              className="max-w-[274px] rounded-xl text-lg mx-2"
              onClick={downloadPDF}
            >
              Download
            </Button> */}
          </div>
        </div >
      </div>
      <input type="file" accept="application/json" onChange={handleLoadLayout} ref={jsonInputRef} hidden />
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

export default MainContract;