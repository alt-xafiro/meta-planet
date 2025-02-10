'use client';

import clsx from 'clsx';

import { useEffect, useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';

import { usePlanetsStore } from '../../model/store';
import { usePlanetsArrowKeysEvents } from './usePlanetsArrowKeysEvents';

type PlanetsProps = CustomComponentProps;

export function Planets({ className }: PlanetsProps) {
  const renderedPlanets = usePlanetsStore((state) => state.renderedPlanets);
  const planetsRef = useRef<HTMLDivElement>(null);

  usePlanetsArrowKeysEvents();

  useEffect(() => {
    // Small hack to prevent planets from rendering until JS is loaded.
    // This is important to avoid layout shifts, because sizes of the planets
    // are calculated using JS.
    if (!planetsRef || !planetsRef.current) return;

    const planetsNode = planetsRef.current;

    planetsNode.style.display = 'grid';
  }, [planetsRef]);

  return (
    <div
      className={clsx(
        className,
        'hidden',
        'overflow-x-hidden supports-[overflow-x:_clip]:overflow-x-clip',
        [
          'w-full grid-cols-[min-content] grid-rows-[1fr] items-center justify-center pb-[24px] pt-[24px]',
          'sm:min-h-[calc(100%_-_var(--planet-data-height))]',
          '3xl:pb-[40px] 3xl:pt-[40px]'
        ]
      )}
      ref={planetsRef}
    >
      {renderedPlanets.map((renderedPlanet) => renderedPlanet.element)}
    </div>
  );
}
