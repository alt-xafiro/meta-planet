'use client';

import { useCurrentPlanetStore } from '@pages/home/model/useCurrentPlanetStore';

import { CustomComponentProps } from '@shared/lib';

import { getPlanetIndex, planets } from '../../model/planets';

import { useSetNebulas } from '../Background/Nebulas/useSetNebulas';
import { Planet } from './Planet/Planet';

type PlanetsProps = CustomComponentProps;

export function Planets({ className }: PlanetsProps) {
  const currentPlanet = useCurrentPlanetStore((state) => state.currentPlanet);

  useSetNebulas(
    planets[getPlanetIndex(currentPlanet)].nebulasGradient.from,
    planets[getPlanetIndex(currentPlanet)].nebulasGradient.to
  );

  return (
    <div className={className}>
      {planets.map((planet) => (
        <Planet key={planet.name} planet={planet.name} />
      ))}
    </div>
  );
}
