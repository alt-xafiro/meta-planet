'use client';

import { useSwipeable } from 'react-swipeable';

import { RenderPosition } from '@pages/home/lib/planets';
import { usePlanetsStore } from '@pages/home/model/store';

export const usePlanetsSwipeEvents = () => {
  const addRenderedPlanet = usePlanetsStore((state) => state.addRenderedPlanet);

  const handlers = useSwipeable({
    onSwipedLeft: () => addRenderedPlanet(RenderPosition.AFTER_NEXT),
    onSwipedRight: () => addRenderedPlanet(RenderPosition.BEFORE_PREV)
  });

  return handlers;
};
