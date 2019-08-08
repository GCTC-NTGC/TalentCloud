import { useState, useEffect } from "react";

export const useLoader = (loader: () => Promise<void>): boolean => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect((): void => {
    setIsLoading(true);
    loader().finally((): void => {
      setIsLoading(false);
    });
  }, [loader]);
  return isLoading;
};

export default { useLoader };
