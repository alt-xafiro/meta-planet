'use client';

import { useEffect } from 'react';

import { setRootProperty } from '@shared/lib';

export const useMovePlanetarySystem = (x: string, y: string) => {
  useEffect(() => {
    setRootProperty('--planetary-system-offset-x', x);
    setRootProperty('--planetary-system-offset-y', y);
  }, [x, y]);
};
