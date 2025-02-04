'use client';

import { MouseEvent, useState } from 'react';

import { useCurrentPlanetStore } from '@pages/home/model/useCurrentPlanetStore';

import { CustomComponentProps } from '@shared/lib';

import { PlanetData, getPlanet } from '../../../model/planets';

type PlanetProps = CustomComponentProps & {
  planet: string;
};

export function Planet({ className, planet }: PlanetProps) {
  const setCurrentPlanet = useCurrentPlanetStore(
    (state) => state.setCurrentPlanet
  );
  const [{ name }] = useState<PlanetData>(getPlanet(planet)!);

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
