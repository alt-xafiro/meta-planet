'use client';

import { useEffect } from 'react';

import { RenderPosition } from '../../lib/planets';
import { usePlanetsStore } from '../../model/store/planets-store';

export const usePlanetsArrowKeysEvents = () => {
  const addRenderedPlanet = usePlanetsStore((state) => state.addRenderedPlanet);

  useEffect(() => {
    const handleArrowLeftKeydown = (evt: KeyboardEvent) => {
      if (evt.code === 'ArrowLeft') {
        evt.preventDefault();

        addRenderedPlanet(RenderPosition.BEFORE_PREV);
      }
    };

    const handleArrowRightKeydown = (evt: KeyboardEvent) => {
      if (evt.code === 'ArrowRight') {
        evt.preventDefault();

        addRenderedPlanet(RenderPosition.AFTER_NEXT);
      }
    };

    window.addEventListener('keydown', handleArrowLeftKeydown);
    window.addEventListener('keydown', handleArrowRightKeydown);

    return () => {
      window.removeEventListener('keydown', handleArrowLeftKeydown);
      window.removeEventListener('keydown', handleArrowRightKeydown);
    };
  }, [addRenderedPlanet]);
};
