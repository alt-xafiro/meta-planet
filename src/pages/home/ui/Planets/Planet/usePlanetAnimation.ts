'use client';

import {
  AnimationOptions,
  DOMKeyframesDefinition,
  useAnimate
} from 'motion/react';

import { useCallback, useEffect } from 'react';

import { getBreakpointValue } from '@shared/lib';
import { useMatchMedia } from '@shared/ui';

import { RenderPosition, RenderPositionValue } from '../../../lib/planets';

const OPTIONS: AnimationOptions = {
  bounce: 0
};

export const usePlanetAnimation = (position: RenderPositionValue) => {
  const [planetRef, animate] = useAnimate<HTMLButtonElement>();

  const isSmBreakpoint = useMatchMedia(
    `(min-width: ${getBreakpointValue('sm')!}px)`
  );

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
            x: isSmBreakpoint ? '-48vw' : 'calc(-50vw - 24px)',
            scale: 0.3
          };
        case RenderPosition.CURRENT:
          return {
            x: 0,
            scale: 1
          };
        case RenderPosition.NEXT:
          return {
            x: isSmBreakpoint ? '48vw' : 'calc(50vw + 24px)',
            scale: 0.3
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
    [isSmBreakpoint]
  );

  useEffect(() => {
    animate(planetRef.current, getPlanetKeyframes(position), OPTIONS);
  }, [animate, getPlanetKeyframes, planetRef, position]);

  return { planetRef, planetKeyframes: getPlanetKeyframes(position) };
};
