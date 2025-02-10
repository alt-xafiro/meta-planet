'use client';

import { RefObject, useEffect } from 'react';

import { setNodeProperty } from '@shared/lib';

export const usePlanetDropShadowColor = (
  planedImageRef: RefObject<HTMLImageElement | null>,
  color: string
) => {
  useEffect(() => {
    if (!planedImageRef || !planedImageRef.current) return;

    const planetImageNode = planedImageRef.current;

    setNodeProperty(planetImageNode, '--planet-drop-shadow-color', color);
  }, [planedImageRef, color]);
};
