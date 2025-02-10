'use client';

import { useEffect, useState } from 'react';

export const useMatchMedia = (mediaQuery: string) => {
  const [isMatchMedia, setIsMatchMedia] = useState<boolean>(false);

  useEffect(() => {
    const getMatchMedia = () => window.matchMedia(mediaQuery).matches;

    setIsMatchMedia(getMatchMedia());

    const handleWindowResize = () => {
      setIsMatchMedia(getMatchMedia());
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [mediaQuery]);

  return isMatchMedia;
};
