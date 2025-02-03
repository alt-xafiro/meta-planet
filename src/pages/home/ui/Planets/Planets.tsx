'use client';

import { CustomComponentProps } from '@shared/lib';

import { planets } from '../../model/planets';

import { useSetNebulas } from '../Background/Nebulas/useSetNebulas';

type PlanetsProps = CustomComponentProps;

export function Planets({ className }: PlanetsProps) {
  const currentPlanet = 0;

  useSetNebulas(
    planets[currentPlanet].nebulasGradient.from,
    planets[currentPlanet].nebulasGradient.to
  );

  return <div className={className}></div>;
}
