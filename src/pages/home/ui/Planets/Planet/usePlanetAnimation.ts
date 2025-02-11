'use client';

import {
  AnimationOptions,
  DOMKeyframesDefinition,
  useAnimate
} from 'motion/react';

import { useCallback, useEffect } from 'react';

import { RenderPosition, RenderPositionValue } from '../../../lib/planets';

const OPTIONS: AnimationOptions = {
  bounce: 0
};

export const usePlanetAnimation = (position: RenderPositionValue) => {
  const [planetRef, animate] = useAnimate<HTMLButtonElement>();

  const getPlanetKeyframes = useCallback(
    (position: RenderPositionValue): DOMKeyframesDefinition => {
      switch (position) {
        case RenderPosition.BEFORE_PREV:
          return {
            x: '-100vw',
            scale: 0
          };
        case RenderPosition.PREV:
          return {
            x: 'var(--planets-prev-planet-x)',
            scale: 'var(--planets-side-planet-scale)'
          };
        case RenderPosition.CURRENT:
          return {
            x: 0,
            scale: 1
          };
        case RenderPosition.NEXT:
          return {
            x: 'var(--planets-next-planet-x)',
            scale: 'var(--planets-side-planet-scale)'
          };
        case RenderPosition.AFTER_NEXT:
          return {
            x: '100vw',
            scale: 0
          };
        default:
          return {};
      }
    },
    []
  );

  useEffect(() => {
    animate(planetRef.current, getPlanetKeyframes(position), OPTIONS);
  }, [animate, getPlanetKeyframes, planetRef, position]);

  return { planetRef, planetKeyframes: getPlanetKeyframes(position) };
};
