'use client';

import { RefObject, useEffect } from 'react';

import { setRootProperty } from '@shared/lib';

type UsePageSizes = {
  planetNameRef: RefObject<HTMLHeadingElement | null>;
  planetInfoRef: RefObject<HTMLDivElement | null>;
};

export const useHomePageSizes = ({
  planetNameRef,
  planetInfoRef
}: UsePageSizes) => {
  useEffect(() => {
    if (
      !planetNameRef ||
      !planetNameRef.current ||
      !planetInfoRef ||
      !planetInfoRef.current
    )
      return;

    const planetNameNode = planetNameRef.current;
    const planetInfoNode = planetInfoRef.current;

    const setPlanetDataHeightProperty = () => {
      const planetNameHeight = getComputedStyle(planetNameNode).height;
      const planetNameMarginBottom =
        getComputedStyle(planetNameNode).marginBottom;
      const planetInfoHeight = getComputedStyle(planetInfoNode).height;

      const planetDataHeight =
        parseFloat(planetNameHeight) +
        parseFloat(planetNameMarginBottom) +
        parseFloat(planetInfoHeight);

      setRootProperty('--planet-data-height', `${planetDataHeight}px`);
    };

    setPlanetDataHeightProperty();

    const handleWindowResize = () => {
      setPlanetDataHeightProperty();
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [planetNameRef, planetInfoRef]);
};
