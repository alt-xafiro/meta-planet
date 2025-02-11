'use client';

import { useMeasure } from '@uidotdev/usehooks';

import { useEffect } from 'react';

import { useSizesStore } from '@pages/home/model/store';

import { setRootProperty } from '@shared/lib';

import { RenderPosition, RenderPositionValue } from '../../../lib/planets';

export const usePlanetSizes = (position: RenderPositionValue) => {
  const [planetImageRef, { width }] = useMeasure();

  const setComputedPlanetSize = useSizesStore(
    (state) => state.setComputedPlanetSize
  );

  useEffect(() => {
    if (
      position !== RenderPosition.CURRENT ||
      planetImageRef === null ||
      width === null
    )
      return;

    const setCurrentSizeOfPlanet = () => {
      setRootProperty('--planet-current-size', `${width}px`);
      setComputedPlanetSize(width);
    };

    setCurrentSizeOfPlanet();

    const handleWindowResize = () => {
      setCurrentSizeOfPlanet();
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [planetImageRef, position, setComputedPlanetSize, width]);

  return planetImageRef;
};
