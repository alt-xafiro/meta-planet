'use client';

import { useEffect } from 'react';

import { setRootProperty } from '@shared/lib';

export const useSetNebulas = (color: string, secondColor?: string) => {
  useEffect(() => {
    setRootProperty('--nebula-gradient-from', color);
    setRootProperty('--nebula-gradient-to', secondColor ?? color);
  }, [color, secondColor]);
};
