'use client';

import clsx from 'clsx';
import {
  AnimationOptions,
  DOMKeyframesDefinition,
  Target,
  useAnimate
} from 'motion/react';
import * as motion from 'motion/react-client';

import Image from 'next/image';

import { MouseEvent, useEffect, useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';

import { RenderPosition, RenderPositionValue } from '../../../lib/planets';
import { getPlanetData } from '../../../model/planets';
import { usePlanetsStore } from '../../../model/store';
import { usePlanetDropShadowColor } from './usePlanetDropShadowColor';

const OPTIONS: AnimationOptions = {
  bounce: 0
};

const getPlanetKeyframes = (
  position: RenderPositionValue
): DOMKeyframesDefinition => {
  switch (position) {
    case RenderPosition.BEFORE_PREV:
      return {
        x: '-100vw',
        scale: 0
      };
    case RenderPosition.PREV:
      return {
        x: '-48vw',
        scale: 0.3
      };
    case RenderPosition.CURRENT:
      return {
        x: 0,
        scale: 1
      };
    case RenderPosition.NEXT:
      return {
        x: '48vw',
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
};

type PlanetProps = CustomComponentProps & {
  name: string;
  position: RenderPositionValue;
};

export function Planet({ className, name, position }: PlanetProps) {
  const setCurrentPlanetName = usePlanetsStore(
    (state) => state.setCurrentPlanetName
  );
  const addRenderedPlanet = usePlanetsStore((state) => state.addRenderedPlanet);

  const [planetRef, animate] = useAnimate<HTMLButtonElement>();

  const planetImageRef = useRef<HTMLImageElement>(null);

  const { name: planetName, image, dropShadowColor } = getPlanetData(name)!;

  usePlanetDropShadowColor(planetImageRef, dropShadowColor);

  useEffect(() => {
    animate(planetRef.current, getPlanetKeyframes(position), OPTIONS);
  }, [animate, planetRef, position]);

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (position === RenderPosition.PREV) {
      addRenderedPlanet(RenderPosition.BEFORE_PREV);
    }

    if (position === RenderPosition.NEXT) {
      addRenderedPlanet(RenderPosition.AFTER_NEXT);
    }

    setCurrentPlanetName(planetName);
  };

  const isDisabled =
    position === RenderPosition.CURRENT ||
    position === RenderPosition.BEFORE_PREV ||
    position === RenderPosition.AFTER_NEXT;

  return (
    <motion.button
      className={clsx(
        className,
        position === RenderPosition.CURRENT ? 'z-20' : 'z-10',
        'col-start-1 col-end-2 row-start-1 row-end-1 self-center justify-self-center',
        [
          'flex aspect-square h-full min-h-[280px] items-center justify-center',
          'sm:max-w-[70vw]',
          'lg:min-h-[360px]'
        ],
        'select-none',
        'will-change-transform'
      )}
      ref={planetRef}
      onClick={handleClick}
      disabled={isDisabled}
      initial={getPlanetKeyframes(position) as Target}
    >
      <Image
        src={`/images/planets/${image}`}
        alt={`${planetName}.`}
        width={1160}
        height={1160}
        priority
        quality={95}
        className={clsx(
          'w-full max-w-[1160px] object-contain object-center',
          'supports-[overflow-x:_clip]:drop-shadow-[-5px_6px_30px_var(--planet-drop-shadow-color)]'
        )}
        ref={planetImageRef}
      />
    </motion.button>
  );
}
