import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getName(firstName, lastName) {
  let name = "";
  if (firstName) {
    name = firstName;
    if (lastName) {
      name += " " + lastName;
    }
  } else if (lastName) {
    name = lastName;
  } else {
    name = "Unknown";
  }
  return name;
}

export function getMake(vehicles) {
  const data = JSON.parse(vehicles)[0];
  return data.make;
}

export function getModel(vehicles) {
  const data = JSON.parse(vehicles)[0];
  return data.model;
}

export function isVehicle(vehicles) {
  const data = JSON.parse(vehicles)[0];
  if (data.make == "")
    return "No";
  return "Yes";
}

export function drawFabricText(canvas, text, fontFamily = "Allura", fontSize = 20, color = "black") {
    if (canvas && typeof text === 'string' && text.trim() !== '') {
      const nameText = new fabric.IText(text, {
        left: canvas.width / 2 - 50,        // Horizontal position of the text
        top: canvas.height / 2 - 20,       // Vertical position of the text
        fontSize: fontSize,                            // Font size in pixels
        editable: true,                          // Allow the user to edit the text
        fill: color,
        fontFamily: fontFamily,                  // Font family of the text
        fontStyle: 'italic',                     // Font style of the text
        textAlign: 'center',                     // Horizontal alignment of the text
        lineHeight: 1.5,                         // Line height
        shadow: {                                // Shadow settings
          color: 'rgba(0, 0, 0, 0.1)',           // Shadow color
          blur: 5,                               // Shadow blur radius
          offsetX: 3,                            // Horizontal offset of the shadow
          offsetY: 3                             // Vertical offset of the shadow
        },
        // stroke: 'blue',                          // Stroke (outline) color
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
      canvas.add(nameText);
      canvas.setActiveObject(nameText);
      canvas.renderAll();
    } else {
      console.log("Invalid text provided.");
    }
}

export function drawFabricImage(canvas, image) {
   // Check if image is not null, undefined, or empty
   if ( canvas && image && image !== "") {
    // Assuming image is a base64-encoded string representing an image
    if (canvas) {
      const img = new Image();
      img.onload = () => {
        // Create a fabric Image object from the base64 image data
        const fabricImage = new fabric.Image(img, {
          left: canvas.width / 2 - img.width / 2, // Center the image horizontally
          top: canvas.height / 2 - img.height / 2, // Center the image vertically
          angle: 0,                                      // No rotation
          scaleX: 1,                                     // Scale factor for X-axis
          scaleY: 1,                                     // Scale factor for Y-axis
          opacity: 1,                                    // Full opacity
          selectable: true,                              // Allow the image to be selected
          transparentCorners: true,                      // Enable transparent corners
          cornerStyle: 'circle',                         // Corner style for resizing
        });

        // Add the image to the fabric canvas
        canvas.add(fabricImage);
        canvas.setActiveObject(fabricImage);
        canvas.renderAll();
      };

      // Set the image source to the image data (base64 string)
      img.src = image; // image is the base64 PNG data
    } else {
      console.log("Fabric canvas not found.");
    }
  } else {
    console.log("Invalid image data provided.");
  }
}