import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config";
import { useEffect, useState } from "react";

const fullConfig = resolveConfig(tailwindConfig);

const useBreakpoint = (breakpoint) => {
  const [isMatch, setIsMatch] = useState(false);
  const breakpoints = fullConfig.theme.screens;

  useEffect(() => {
    const updateMatch = () => {
      const width = window.innerWidth;
      setIsMatch(width <= parseInt(breakpoints[breakpoint]));
    };

    updateMatch(); // Set initial value
    window.addEventListener("resize", updateMatch);

    return () => window.removeEventListener("resize", updateMatch);
  }, [breakpoint, breakpoints]);

  return isMatch;
};

export default useBreakpoint;
