'use client';

import clsx from 'clsx';

import { useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';
import { useAspectSquare } from '@shared/ui';

import '../../../config/planetary-system.css';
import './bg-images.css';

import { Microplanets } from './Microplanets';
import { Orbits } from './Orbits';

type PlanetarySystemProps = CustomComponentProps;

export function PlanetarySystem({ className }: PlanetarySystemProps) {
  const planetarySystemRef = useRef<HTMLDivElement>(null);

  useAspectSquare(planetarySystemRef);

  return (
    <div
      className={clsx(
        className,
        'planetary-system',
        'fixed bottom-0 left-1/2 -translate-x-[calc(50%_+_70px)] translate-y-[calc(50%_-_200px)]',
        'aspect-square w-full min-w-[640px] lg:w-[90%]'
      )}
      ref={planetarySystemRef}
    >
      <Orbits />
      <Microplanets />
    </div>
  );
}
