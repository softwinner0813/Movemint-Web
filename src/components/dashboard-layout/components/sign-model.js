import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputWithLabel";

export default function SignModel({
  mainHeading,
  subHeading,
  cancelButtonContent,
  mainButtonContent,
  setIsModalClose,
  isDanger = false,
  onConfirm,
}) {
  const [activeTab, setActiveTab] = useState("text"); // Tracks the active tab
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const modalRef = useRef(null); // Reference for the modal
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState(null);

  // Convert canvas to base64 image
  const getCanvasImage = () => {
    if (fabricCanvasRef.current) {
      // Get the base64 image from the canvas
      return fabricCanvasRef.current.toDataURL();
    }
    return null;
  };

  const handleConfirm = () => {
    // Send the activeTab value, input value, and canvas data (if applicable) to the parent
    const canvasData = activeTab === "drawing" ? getCanvasImage() : null;
    onConfirm({ activeTab, name, canvasData, imageData });
  };

  // Handle the image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result); // Store the base64 image data
      };
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    if (activeTab === "drawing") {
      const canvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true, // Enable drawing mode
        // backgroundColor: "white", // Background color of the canvas
        selection: true,     // Allow selection of multiple objects
        selectionColor: "rgba(100, 100, 255, 0.3)", // Color of selection box
        selectionBorderColor: "blue", // Border color of the selection box
        defaultCursor: "default", // Cursor type when hovering over canvas
        hoverCursor: "move",  // Cursor type when hovering over an object
        freeDrawingCursor: "crosshair", // Cursor type in drawing mode
        preserveObjectStacking: false, // Prevent objects from reordering during selection
        stopContextMenu: true, // Prevent right-click context menu on canvas
        renderOnAddRemove: true, // Automatically render canvas after adding/removing objects
        // transtransparentCorners: false,

      });
      fabricCanvasRef.current = canvas;
      // Set canvas size based on the modal size
      const modal = modalRef.current;
      if (modal && canvas) {
        const modalWidth = modal.offsetWidth;
        const modalHeight = modal.offsetHeight;

        canvas.setWidth(modalWidth - 80);
        canvas.setHeight(modalHeight - 200); // Adjust height to fit modal (e.g., subtract 100 for margins)
      }

      // Set drawing properties
      canvas.freeDrawingBrush.color = "blue";
      canvas.freeDrawingBrush.width = 5;
    }
  }, [activeTab]);

  return (
    <div className="fixed inset-0 flex items-center justify-center px-5 bg-muted/90">
      <div
        ref={modalRef}
        className="bg-background w-full md:w-[70%] lg:w-[869px] p-10 flex flex-col gap-8 rounded-lg"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:font-2xl font-normal">{mainHeading}</h2>
          <p className="text-[14px] max-w-[500px] font-medium">{subHeading}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-muted">
          <button
            className={`px-4 py-2 ${activeTab === "text" ? "border-b-2 border-primary font-bold" : ""}`}
            onClick={() => setActiveTab("text")}
          >
            Text
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "drawing" ? "border-b-2 border-primary font-bold" : ""}`}
            onClick={() => setActiveTab("drawing")}
          >
            Drawing
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "image" ? "border-b-2 border-primary font-bold" : ""}`}
            onClick={() => setActiveTab("image")}
          >
            Upload
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "text" && (
            <div className="flex flex-col gap-4">
              <InputWithLabel type="text" label="Name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          {activeTab === "drawing" && (
            <div className="flex flex-col gap-4">
              <canvas
                ref={canvasRef}
                style={{ marginTop: "5px" }}
              ></canvas>
            </div>
          )}
          {activeTab === "image" && (
            <div className="flex flex-col gap-4">
              <label className="block text-sm font-medium text-white">Upload an image</label>
              <input
                type="file"
                accept="image/*"
                className="border border-muted p-2 rounded-lg w-[150px] sm:w-[274px] border-2 border-foreground"
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-[119px]">
          <Button
            variant={isDanger ? "danger" : undefined}
            className="rounded-lg w-[150px] sm:w-[274px]"
            onClick={handleConfirm}
          >
            {mainButtonContent}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="rounded-lg w-[150px] sm:w-[274px] border-2 border-foreground"
            onClick={() => setIsModalClose(false)}
          >
            {cancelButtonContent}
          </Button>
        </div>
      </div>
    </div>
  );
}
