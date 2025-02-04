'use client';

import { MouseEvent } from 'react';

import { useCurrentPlanetStore } from '@pages/home/model/store';

import { CustomComponentProps } from '@shared/lib';

import { getPlanet } from '../../../model/planets';

type PlanetProps = CustomComponentProps & {
  planet: string;
};

export function Planet({ className, planet }: PlanetProps) {
  const setCurrentPlanet = useCurrentPlanetStore(
    (state) => state.setCurrentPlanet
  );

  const { name } = getPlanet(planet)!;

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    setCurrentPlanet(planet);
  };

  return (
    <button className={className} onClick={handleClick}>
      {name}
    </button>
  );
}
