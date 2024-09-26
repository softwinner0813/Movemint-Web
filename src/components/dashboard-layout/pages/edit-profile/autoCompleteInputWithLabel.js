import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const AutocompleteInputWithLabel = ({ label, labelClassName, value, onChange, className, ...rest }) => {
  const inputRef = useRef(null);
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  useEffect(() => {
    if (!window.google) {
      console.error("Google API not loaded");
      return;
    }

    // Initialize the autocomplete
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'], // Restrict to addresses
    });

    // Listener for place selection
    const handlePlaceChanged = () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        onChange(place.formatted_address); // Update the parent component with the selected address
        setIsLocationSelected(true); // Mark that a valid location has been selected
      } else {
        console.error("No valid address selected");
      }
    };

    autocomplete.addListener('place_changed', handlePlaceChanged);

    // Clean up the listener on component unmount
    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, []);

  // Handle the onBlur event to clear the input if no valid location is selected
  const handleBlur = () => {
    if (!isLocationSelected) {
      onChange(""); // Clear the input if no location is selected
    }
  };

  // Handle manual input changes (e.g., user typing)
  const handleInputChange = (e) => {
    setIsLocationSelected(false);
    onChange(e.target.value); // Reset the location selected state when user manually types
  };

  return (
    <div className={cn("grid w-full items-center gap-1.5", className)}>
      <Label htmlFor={rest.id} className={cn("font-bold", labelClassName)}>
        {label}
      </Label>
      <Input
        type="text"
        ref={inputRef}
        value={value}
        onChange={handleInputChange} // Update state when typing manually
        onBlur={handleBlur} // Clear input if no location is selected
        placeholder="Start typing location"
        {...rest} // Pass the rest of the props to the input component
      />
    </div>
  );
};

export default AutocompleteInputWithLabel;
