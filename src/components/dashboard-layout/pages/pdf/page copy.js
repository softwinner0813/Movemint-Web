import React, { useState, useEffect, useCallback, useRef } from "react";
import { pdfjs } from "react-pdf";
import { fabric } from "fabric";
import { forwardRef, useImperativeHandle } from "react";
// import { circle } from "@amcharts/amcharts5/.internal/core/util/Ease";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";

const PdfPage = forwardRef((props, ref) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(600); // Default width
  const [aspectRatio, setAspectRatio] = useState(1); // Default aspect ratio
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const jsonInputRef = useRef(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState("0%");

  const [pdfFile, setPdfFile] = useState(null);
  // console.log("props = >", props);

  const updatePageWidth = useCallback(() => {
    if (window.innerWidth < 640) {
      setPageWidth(window.innerWidth * 0.9); // Mobile size
    } else {
      setPageWidth(window.innerWidth * 0.7); // Desktop size
    }
    if (props.showSignaturePad == true) {
      handleSignDate();
    }
  }, []);

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
      simulateUploadProgress();
      props.uploadFlag();
      try {
        const fileReader = new FileReader();
        fileReader.onload = async () => {
          const arrayBuffer = fileReader.result;
          const pdf = await pdfjs.getDocument(arrayBuffer).promise;
          setNumPages(pdf.numPages);
        };
        fileReader.readAsArrayBuffer(file);
      } catch (error) {
        console.log("Error loading PDF:", error);
      }
    }
  };
  const simulateUploadProgress = (duration = 1000) => {
    let progress = 0;
    const interval = 100; // Update every 100ms
    const increment = 100 / (duration / interval); // Calculate increment based on duration

    const timer = setInterval(() => {
      progress += increment;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer); // Clear interval when progress reaches 100%
      }
      setUploadProgress(`${Math.floor(progress)}%`);
    }, interval);
  };
  const handleFileImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the file input
    }
  }
  const handleJsonImport = () => {
    if (jsonInputRef.current) {
      jsonInputRef.current.click(); // Programmatically click the file input
    }
  }
  useEffect(() => {
    if (props.sign.name != "") {
      handleSignName(props.sign.name)
    }
  }, [props.sign.name])

  useEffect(() => {
    handleDrawSign(props.sign.canvasData);
  }, [props.sign.canvasData]);

  useEffect(() => {
    handleImageSign(props.sign.imageData);
  }, [props.sign.imageData]);

  useEffect(() => {
    console.log(props)
    if (props.sign.submit != 0) {
      getUpdatedPDF(pageNumber)
    }
  }, [props.submit])

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

  const getUpdatedPDF = async (selectedPage) => {
    try {
      // Create a new jsPDF instance
      const doc = new jsPDF();

      const pdfBytes = await pdfFile.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: pdfBytes });
      const pdfDoc = await loadingTask.promise;

      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1 });

        // Create a temporary canvas to render the PDF page
        const tempCanvas = document.createElement("canvas");
        const tempContext = tempCanvas.getContext("2d");
        tempCanvas.width = viewport.width;
        tempCanvas.height = viewport.height;

        const renderContext = {
          canvasContext: tempContext,
          viewport,
        };

        // Render the page
        await page.render(renderContext).promise;

        // Convert the rendered page to an image
        const pageImage = tempCanvas.toDataURL("image/png");

        // Add the page image to jsPDF
        if (i > 1) doc.addPage(); // Add a new page in jsPDF after the first
        doc.addImage(pageImage, "PNG", 0, 0, 210, 297); // Fit A4 dimensions

        // Check if this is the selected page to add the signature
        if (i === selectedPage) {
          const fabricCanvas = fabricCanvasRef.current;
          if (fabricCanvas) {
            // Render Fabric.js canvas to an image
            const fabricImage = fabricCanvas.toDataURL("image/png");

            // Overlay the annotation image (signature) onto the selected page
            doc.addImage(fabricImage, "PNG", 0, 0, 210, 297); // Adjust positioning as needed
          }
        }
      }

      // Save the updated PDF
      doc.save("updated_document.pdf");
    } catch (error) {
      console.log("Error generating updated PDF:", error);
      // alert("Failed to generate updated PDF. Please try again.");
    }
  };

  const renderPdfOnCanvas = async (pdfFile, pageNumber) => {
    try {
      // Read the PDF file as ArrayBuffer
      const pdfBytes = await pdfFile.arrayBuffer();

      // Load the PDF document
      const loadingTask = pdfjs.getDocument({ data: pdfBytes });
      const pdfDoc = await loadingTask.promise;

      // Get the requested page from the PDF
      const page = await pdfDoc.getPage(pageNumber);

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
      }
    } catch (error) {
      console.log("Error rendering PDF on Fabric.js canvas:", error);
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
  }
  // Expose the function to the parent via the ref
  useImperativeHandle(ref, () => ({
    handleSignDate,
  }));

  const loadCanvasFromJson = () => {
    const fabricCanvas = fabricCanvasRef.current;
    if (fabricCanvas && jsonFile) {
      fabricCanvas.loadFromJSON(jsonFile, fabricCanvas.renderAll.bind(fabricCanvas));
    }
  };

  useEffect(() => {
    if (jsonFile) {
      loadCanvasFromJson();
    }
  }, [jsonFile]);

  const handleSaveLayout = () => {
    const fabricCanvas = fabricCanvasRef.current;
    if (fabricCanvas) {
      const json = fabricCanvas.toJSON();
      const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
      saveAs(blob, "canvas-state.json");
    }
  }
  const handleLoadLayout = () => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
      simulateUploadProgress();
      props.uploadFlag();
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setJsonFile(JSON.parse(e.target.result));
      };
      fileReader.readAsText(file);
    }
  }


  return (
    <div className="flex flex-col items-center gap-4 space-y-8" >
      <div className="text-white text-2xl font-bold mb-2" >
        Upload PDF Document
      </div>
      <div className="relative w-full h-12 bg-white rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400"
          style={{ width: uploadProgress }}
        />
      </div>
      <div className="flex justify-center mt-5">
        <Button
          className="max-w-[274px] h-14 rounded-xl text-md"
          onClick={handleFileImport}
          style={{ width: '120px' }}
        >
          Upload
        </Button>
        <Button
          className="max-w-[274px] h-14 rounded-xl text-md mx-5"
          onClick={handleSaveLayout}
          style={{ width: '120px' }}
        >
          Save Layout
        </Button>
        <Button
          className="max-w-[274px] h-14 rounded-xl text-md"
          onClick={handleJsonImport}
          style={{ width: '120px' }}
        >
          Load Layout
        </Button>
      </div>

      <div>
        <input type="file" accept="application/pdf" onChange={handlePdfUpload} ref={fileInputRef} hidden />
        <input type="file" accept="application/json" onChange={handleLoadLayout} ref={jsonInputRef} hidden />
      </div>

      <div className={'flex flex-col items-center overflow-auto ' + (pdfFile ? '' : 'canvas-hide')}>
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
PdfPage.displayName = "PdfPage";
export default PdfPage;
