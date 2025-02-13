'use client';

import clsx from 'clsx';

import { useRef } from 'react';

import { useUserSettingsStore } from '@pages/home/model/store/user-settings-store';

import { CustomComponentProps } from '@shared/lib';
import { useParallax } from '@shared/ui';

import '../../../config/planetary-system.css';
import './styles.css';

import { getPlanetData } from '../../../model/planets/planets';
import { usePlanetsStore } from '../../../model/store/planets-store';
import { Microplanets } from './Microplanets/Microplanets';
import { Orbits } from './Orbits/Orbits';
import { useMovePlanetarySystem } from './useMovePlanetarySystem';

type PlanetarySystemProps = CustomComponentProps;

export function PlanetarySystem({ className }: PlanetarySystemProps) {
  const planetarySystemRef = useRef<HTMLDivElement>(null);
  const currentPlanetName = usePlanetsStore((state) => state.currentPlanetName);
  const { planetarySystemCoordinates } = getPlanetData(currentPlanetName)!;
  const isParallax = useUserSettingsStore((state) => state.isParallax);

  useMovePlanetarySystem(
    planetarySystemCoordinates.x,
    planetarySystemCoordinates.y
  );

  useParallax({
    enabled: isParallax,
    ref: planetarySystemRef,
    baseTranslateX: 'var(--planetary-system-base-translate-x)',
    baseTranslateY: 'var(--planetary-system-base-translate-y)',
    resistance: 'var(--parallax-planetary-system-resistance)'
  });

  return (
    <div
      className={clsx(
        className,
        [
          'fixed left-[var(--planetary-system-left)] top-[var(--planetary-system-top)] translate-x-[calc(var(--planetary-system-base-translate-x))] translate-y-[calc(var(--planetary-system-base-translate-y))]',
          'sm:bottom-[var(--planetary-system-bottom)] sm:top-auto'
        ],
        ['aspect-square w-full min-w-[640px]', 'lg:w-[90%]'],
        'transform-gpu transition-transform duration-[var(--parallax-planetary-system-delay)] ease-[var(--parallax-planetary-system-ease)] will-change-transform'
      )}
      ref={planetarySystemRef}
    >
      <Orbits />
      <Microplanets />
    </div>
  );
}
