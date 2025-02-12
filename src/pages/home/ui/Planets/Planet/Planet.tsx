'use client';

import clsx from 'clsx';
import { Target } from 'motion/react';
import * as motion from 'motion/react-client';

import Image from 'next/image';

import { MouseEvent, useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';

import './styles.css';

import { RenderPosition, RenderPositionValue } from '../../../lib/planets';
import { getPlanetData } from '../../../model/planets/planets';
import { usePlanetsStore } from '../../../model/store/planets-store';
import { usePlanetAnimation } from './usePlanetAnimation';
import { usePlanetDropShadowColor } from './usePlanetDropShadowColor';
import { usePlanetSizes } from './usePlanetSizes';

type PlanetProps = CustomComponentProps & {
  name: string;
  position: RenderPositionValue;
};

export function Planet({ className, name, position }: PlanetProps) {
  const { planetRef, planetKeyframes } = usePlanetAnimation(position);
  const planetImageRef = useRef<HTMLImageElement>(null);
  const planetImageSizesRef = usePlanetSizes(position);

  const addRenderedPlanet = usePlanetsStore((state) => state.addRenderedPlanet);

  const { image, dropShadowColor } = getPlanetData(name)!;

  usePlanetDropShadowColor(planetImageRef, dropShadowColor);

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (position === RenderPosition.PREV) {
      addRenderedPlanet(RenderPosition.BEFORE_PREV);
    }

    if (position === RenderPosition.NEXT) {
      addRenderedPlanet(RenderPosition.AFTER_NEXT);
    }
  };

  const isSidePlanet =
    position === RenderPosition.PREV || position === RenderPosition.NEXT;

  return (
    <motion.button
      className={clsx(
        className,
        position === RenderPosition.CURRENT ? 'z-20' : 'z-10',
        'col-start-1 col-end-2 row-start-1 row-end-2 self-center justify-self-center',
        [
          'flex aspect-square h-full min-h-[var(--planet-min-size)] items-center justify-center',
          'sm:max-w-[70vw]',
          'lg:min-h-[360px]'
        ],
        'select-none',
        'will-change-transform'
      )}
      ref={planetRef}
      onClick={handleClick}
      disabled={!isSidePlanet}
      initial={planetKeyframes as Target}
      tabIndex={-1}
    >
      <Image
        src={`/images/planets/${image}`}
        alt={`${name}.`}
        width={1160}
        height={1160}
        priority
        quality={85}
        className={clsx(
          'w-full max-w-[1160px] object-contain object-center',
          'supports-[overflow-x:_clip]:drop-shadow-[-5px_6px_30px_var(--planet-drop-shadow-color)]'
        )}
        ref={(el) => {
          planetImageRef.current = el;
          planetImageSizesRef(el);
        }}
      />
    </motion.button>
  );
}
