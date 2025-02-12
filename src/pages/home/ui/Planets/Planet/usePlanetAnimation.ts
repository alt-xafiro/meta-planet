'use client';

import {
  AnimationOptions,
  DOMKeyframesDefinition,
  useAnimate
} from 'motion/react';

import { useCallback, useEffect } from 'react';

import { getRootProperty } from '@shared/lib';

import { RenderPosition, RenderPositionValue } from '../../../lib/planets';

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
    const OPTIONS: AnimationOptions = {
      duration: parseFloat(getRootProperty('--planets-animation-duration')),
      type: 'spring',
      bounce: parseFloat(getRootProperty('--planets-animation-bounce'))
    };

    animate(planetRef.current, getPlanetKeyframes(position), OPTIONS);
  }, [animate, getPlanetKeyframes, planetRef, position]);

  return { planetRef, planetKeyframes: getPlanetKeyframes(position) };
};
