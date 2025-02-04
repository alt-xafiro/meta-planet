'use client';

import { CustomComponentProps } from '@shared/lib';

import { planets } from '../../model/planets';

import { Planet } from './Planet/Planet';

type PlanetsProps = CustomComponentProps;

export function Planets({ className }: PlanetsProps) {
  return (
    <div className={className}>
      {planets.map((planet) => (
        <Planet key={planet.name} planet={planet.name} />
      ))}
    </div>
  );
}
