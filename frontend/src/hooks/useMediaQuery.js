import { useEffect, useState } from "react";

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure this code runs only on the client-side
    if (typeof window !== "undefined") {
      const mediaQueryList = window.matchMedia(query);
      const handleChange = (event) => setMatches(event.matches);

      // Set the initial match on mount
      setMatches(mediaQueryList.matches);

      mediaQueryList.addEventListener("change", handleChange);
      return () => mediaQueryList.removeEventListener("change", handleChange);
    }
  }, [query]);

  return matches;
};
