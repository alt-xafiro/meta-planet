'use client';

import clsx from 'clsx';

import { RefObject } from 'react';

import { CustomComponentProps } from '@shared/lib';
import { allerta } from '@shared/ui';

import { getPlanetData } from '../../model/planets';
import { usePlanetsStore } from '../../model/store';

type PlanetNameProps = CustomComponentProps & {
  ref?: RefObject<HTMLHeadingElement | null>;
};

export function PlanetName({ className, ref }: PlanetNameProps) {
  const currentPlanetName = usePlanetsStore((state) => state.currentPlanetName);

  const { name } = getPlanetData(currentPlanetName)!;

  return (
    <h2
      className={clsx(
        className,
        allerta.className,
        ['-mr-[0.3em] pl-[20px] pr-[20px]', 'lg:pl-[40px] lg:pr-[40px]'],
        [
          'text-center text-[30px] uppercase tracking-[0.3em]',
          'sm:text-[36px]',
          'md:text-[42px]',
          'lg:text-[48px]',
          '2lg:text-[67px]',
          '6xl:text-[83px]'
        ]
      )}
      ref={ref}
    >
      {name}
    </h2>
  );
}
