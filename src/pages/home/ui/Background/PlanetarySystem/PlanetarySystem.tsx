'use client';

import clsx from 'clsx';

import { useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';
import { useAspectSquare, useMouseParallax } from '@shared/ui';

import '../../../config/planetary-system.css';
import './styles.css';

import { Microplanets } from './Microplanets/Microplanets';
import { Orbits } from './Orbits/Orbits';

type PlanetarySystemProps = CustomComponentProps;

export function PlanetarySystem({ className }: PlanetarySystemProps) {
  const planetarySystemRef = useRef<HTMLDivElement>(null);

  useAspectSquare(planetarySystemRef);

  useMouseParallax({
    ref: planetarySystemRef,
    baseTranslateX: 'var(--planetary-system-base-translate-x)',
    baseTranslateY: 'var(--planetary-system-base-translate-y)',
    resistance: 'var(--parallax-planetary-system-resistance)'
  });

  return (
    <div
      className={clsx(
        className,
        'fixed bottom-[var(--planetary-system-bottom)] left-[var(--planetary-system-left)] translate-x-[calc(var(--planetary-system-base-translate-x))] translate-y-[calc(var(--planetary-system-base-translate-y))]',
        'aspect-square w-full min-w-[640px] lg:w-[90%]',
        'transition-transform duration-[var(--parallax-planetary-system-delay)] ease-[var(--parallax-planetary-system-ease)] will-change-transform'
      )}
      ref={planetarySystemRef}
    >
      <Orbits />
      <Microplanets />
    </div>
  );
}
