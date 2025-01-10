"use client";
import { Button } from "@/components/ui/button";
// import PdfPage from "./page";
import { useState, useRef, useEffect, useCallback } from "react";
import { fabric } from "fabric";
import CommonModel from "../../components/common-model";
import SignModel from "../../components/sign-model";
import { pdfjs } from "react-pdf";
// import { saveAs } from "file-saver";
import NProgress, { set } from "nprogress";
import "nprogress/nprogress.css";
import { sendShareLink, updateProposalDocument } from '@/services/api';
import { notification } from 'antd';
import { NotificationTypes } from "@/constants/messages";
import { FaDownload } from "react-icons/fa";
// import jsPDF from "jspdf";
import { PDFDocument } from 'pdf-lib';
import ConfirmModal from "../../components/confim-modal";
import { useUser } from "@/lib/userContext";
import ContractShareModal from "../../components/contract-share-modal";

const MainContract = ({ template, pageNum, workData, proposalId }) => {
  // const { resultLink, savedData } = props;

  const { userData, setUserData } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignModalOpen, setIsSigModalOpen] = useState(false);
  const [sign, setSign] = useState({});
  const [uploadedPdf, setUploadedPdf] = useState(false)
  const [uploadedSubmit, setUploadedSubmit] = useState(0)
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [numPages, setNumPages] = useState(1); // New state for total pages
  const [pageNumber, setPageNumber] = useState(pageNum); // New state for current page
  const [pageWidth, setPageWidth] = useState(600); // Default width
  const [aspectRatio, setAspectRatio] = useState(1);
  const jsonInputRef = useRef();
  const [pdfFile, setPdfFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  var initial = true;

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
      const scale = 1; // Increase scale for better resolution 
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
        const imgDataUrl = tempCanvas.toDataURL("image/png", 1.0); // Set quality to 1.0 for max quality 

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
        if (workData && workData.objects && pageNumber == pageNum) {
          fabricCanvas.loadFromJSON(workData, () => {
            fabricCanvas.renderAll();
          });
        } else {
          // Initialize the fabric canvas when workData is null
          fabricCanvas.clear(); // Clears the canvas, ensuring it's empty
          // Optionally set up some initial state for the canvas if needed
          fabricCanvas.renderAll();
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

    // Set background color to transparent
    fabricCanvas.setBackgroundColor(null, fabricCanvas.renderAll.bind(fabricCanvas));

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
      if (initial == true) {
        setPageNumber(pageNum)
        initial = false
      } else {
        setPageNumber(1);
      }
    }
  }, [template]);
  useEffect(() => {
    if (template?.link) {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}${template.link}`;
      loadPdf(url);
    }
  }, [pageNumber]);
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
    setIsModalOpen(false)
    setLoading(true);
    try {
      const { pathname } = window.location;
      const updatedPath = pathname.replace("preparation", "sign");
      setTemplateUrl(updatedPath);
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
    } catch (error) {
      console.error("PDF download failed:", error);
    } finally {
      setLoading(false); // Stop spinner
    }
  };
  const downloadPDF = async () => {
    try {
      const pdfUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${template.link}`;
      const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(pdfBytes);

      if (pageNumber < 1 || pageNumber > pdfDoc.getPageCount()) {
        throw new Error("Invalid page number");
      }

      const page = pdfDoc.getPage(pageNumber - 1);
      const fabricCanvas = fabricCanvasRef.current;
      if (!fabricCanvas) {
        console.error("Canvas not initialized");
        return;
      }

      // Get the canvas dimensions considering any scroll offsets
      const canvasWidth = fabricCanvas.width;
      const canvasHeight = fabricCanvas.height;

      // Get the visible part of the canvas, considering the scroll offset
      const scrollLeft = fabricCanvas.scrollLeft || 0;
      const scrollTop = fabricCanvas.scrollTop || 0;

      const visibleCanvasWidth = fabricCanvas.getWidth();
      const visibleCanvasHeight = fabricCanvas.getHeight();

      // Get the PDF page dimensions
      const pageWidth = page.getWidth();
      const pageHeight = page.getHeight();

      // Calculate the scaling ratio for both axes based on the visible portion of the canvas
      const scaleX = pageWidth / visibleCanvasWidth;
      const scaleY = pageHeight / visibleCanvasHeight;

      // For each object, determine its position and draw it
      for (const obj of fabricCanvas.getObjects()) {
        if (obj.type === "i-text" || obj.type === "text") {
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = canvasWidth;
          tempCanvas.height = canvasHeight;

          const tempCtx = tempCanvas.getContext("2d");
          const clone = fabric.util.object.clone(obj);
          const tempFabricCanvas = new fabric.StaticCanvas(tempCanvas);
          tempFabricCanvas.add(clone);
          tempFabricCanvas.renderAll();

          const textDataUrl = tempCanvas.toDataURL("image/png");
          const imageBytes = await fetch(textDataUrl).then((res) => res.arrayBuffer());

          const pdfImage = await pdfDoc.embedPng(imageBytes);
          // const { width, height } = pdfImage.scale(1.0);
          // console.log("width => ", width)
          // console.log("height => ", height)
          // // Apply the scaling factor and scroll offset to calculate the correct position
          // const pdfX = (obj.left - scrollLeft) * scaleX;
          // const pdfY = pageHeight - ((obj.top - scrollTop) * scaleY + height);

          page.drawImage(pdfImage, {
            x: 0,
            y: 0,
            width: pageWidth,
            height: pageHeight,
          });

          tempFabricCanvas.dispose();
        }

        if (obj.type === "image") {
          const imageUrl = obj.toDataURL();
          const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());

          const pdfImage = await pdfDoc.embedPng(imageBytes);
          // const { width, height } = pdfImage.scale(0.5);

          // // Apply the scaling factor and scroll offset to calculate the correct position
          // const pdfX = (obj.left - scrollLeft) * scaleX;
          // const pdfY = (obj.top + scrollTop) * scaleY

          page.drawImage(pdfImage, {
            x: 0,
            y: 0,
            width: pageWidth,
            height: pageHeight,
          });
        }
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "modified.pdf";
      link.click();

      URL.revokeObjectURL(url);

      console.log("PDF created and downloaded successfully!");
      return "PDF created and downloaded successfully!";
    } catch (error) {
      console.error("Error creating PDF:", error);
      return "Error creating PDF";
    }
  };


  // OPEN SHARE MODAL
  const openShareModal = () => {
    setIsModalOpen(false);
    setIsSigModalOpen(false);
    setIsShareModalOpen(true);
  };

  // SEND SHARE EMAIL TO
  const sendShreLink = async (link) => {
    try {
      console.log(link)
      const res = await sendShareLink(proposalId, link);
      if (res) {
        setIsShareModalOpen(false);
        openNotificationWithIcon(NotificationTypes.SUCCESS, "Success", "Link sent successfully.");
      } else {
        openNotificationWithIcon(NotificationTypes.ERROR, "Error", "Failed to send link.");
      }
    } catch (error) {
      console.log("======== ERROR =========", error);
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
              onClick={() => { setIsModalOpen(true) }}
              disabled={loading} // Optionally disable the button during loading
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </Button>
            {(workData && userData.mover) && (
              <Button className="max-w-[274px] rounded-xl text-lg mx-2" onClick={openShareModal}
                disabled={workData == null ? true : false}>
                Share
              </Button>
            )}

          </div>
        </div >
      </div>
      <input type="file" accept="application/json" onChange={handleLoadLayout} ref={jsonInputRef} hidden />
      {isModalOpen && (
        <ConfirmModal
          title="Warning!"
          message="Would you like to save your current work?"
          okButtonText="Save"
          onCancel={() => setIsModalOpen(false)}
          onConfirm={submitPdf}
        />
      )
      }
      {isShareModalOpen && (
        <ContractShareModal
          proposalId={proposalId}
          onShare={sendShreLink}
          onCancel={() => setIsShareModalOpen(false)}
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