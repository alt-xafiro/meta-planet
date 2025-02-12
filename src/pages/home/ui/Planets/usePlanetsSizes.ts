'use client';

import { useEffect, useState } from 'react';

import { getRootProperty } from '@shared/lib';

import { useSizesStore } from '../../model/store/sizes-store';

export const usePlanetsSizes = () => {
  const computedPlanetSize = useSizesStore((state) => state.computedPlanetSize);

  const [hasSideNamesEnoughSpace, setHasSideNamesEnoughSpace] =
    useState<boolean>(false);

  useEffect(() => {
    if (computedPlanetSize === null) return;

    const getWindowWidth = () => window.innerWidth;
    const sidePlanetScale = Number(
      getRootProperty('--planets-side-planet-scale')
    );
    const sideNameMaxSize = parseFloat(
      getRootProperty('--planets-side-name-max-size')
    );
    const getFreeSpaceBetweenPlanets = () =>
      getWindowWidth() - computedPlanetSize * (1 + 2 * sidePlanetScale);

    const hasEnoughSpace = () =>
      getFreeSpaceBetweenPlanets() >= sideNameMaxSize * 2;

    setHasSideNamesEnoughSpace(hasEnoughSpace());

    const handleWindowResize = () => {
      setHasSideNamesEnoughSpace(hasEnoughSpace());
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [computedPlanetSize, hasSideNamesEnoughSpace]);

  return {
    hasSideNamesEnoughSpace
  };
};
