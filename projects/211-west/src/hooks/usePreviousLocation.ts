import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

/**
 *
 * @returns Returns the previous location with hash
 */
export const usePreviousLocation = (): string | null => {
  const location = useLocation();
  const previousLocationRef = useRef<string | null>(null);

  useEffect(() => {
    previousLocationRef.current =
      window.location.pathname + window.location.hash;
  }, [location]);

  return previousLocationRef.current;
};
