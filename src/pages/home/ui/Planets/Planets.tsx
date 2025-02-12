'use client';

import clsx from 'clsx';
import { AnimatePresence } from 'motion/react';

import { useEffect, useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';
import { useMatrixText } from '@shared/ui';

import '../../config/planets.css';
import './styles.css';

import { RenderPosition } from '../../lib/rendered-planets';
import { usePlanetsStore } from '../../model/store/planets-store';
import { Planet } from './Planet/Planet';
import { SidePlanetName } from './SidePlanetName/SidePlanetName';
import { usePlanetsArrowKeysEvents } from './usePlanetsArrowKeysEvents';
import { usePlanetsSizes } from './usePlanetsSizes';

type PlanetsProps = CustomComponentProps;

export function Planets({ className }: PlanetsProps) {
  const { renderedPlanets, prevPlanetName, nextPlanetName, isDataAnimated } =
    usePlanetsStore((state) => state);
  const planetsRef = useRef<HTMLDivElement>(null);

  const prevPlanetNameMatrixText = useMatrixText(
    { text: prevPlanetName },
    isDataAnimated
  );
  const nextPlanetNameMatrixText = useMatrixText(
    { text: nextPlanetName },
    isDataAnimated
  );

  const { hasSideNamesEnoughSpace } = usePlanetsSizes();

  usePlanetsArrowKeysEvents();

  useEffect(() => {
    // Small hack to prevent planets from rendering until JS is loaded.
    // This is important to avoid layout shifts, because sizes of the planets
    // are calculated using JS.
    if (!planetsRef || !planetsRef.current) return;

    const planetsNode = planetsRef.current;

    planetsNode.style.display = 'flex';
  }, [planetsRef]);

  return (
    <div
      className={clsx(
        className,
        'hidden',
        'relative overflow-x-hidden supports-[overflow-x:_clip]:overflow-x-clip',
        [
          'w-full items-center justify-center pb-[var(--planets-padding)] pt-[var(--planets-padding)]',
          'sm:min-h-[calc(100%_-_var(--planet-data-height))]'
        ]
      )}
      ref={planetsRef}
    >
      <div
        className={clsx(
          'grid h-full w-full grid-cols-[min-content] grid-rows-[1fr] items-center justify-center'
        )}
      >
        {renderedPlanets.map(({ key, position, planetName }) => (
          <Planet key={key} position={position} name={planetName} />
        ))}
      </div>
      <AnimatePresence>
        {hasSideNamesEnoughSpace && (
          <>
            <SidePlanetName
              key="prev-planet-name"
              position={RenderPosition.PREV}
            >
              {prevPlanetNameMatrixText}
            </SidePlanetName>

            <SidePlanetName
              key="next-planet-name"
              position={RenderPosition.NEXT}
            >
              {nextPlanetNameMatrixText}
            </SidePlanetName>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
