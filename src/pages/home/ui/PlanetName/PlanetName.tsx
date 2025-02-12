'use client';

import clsx from 'clsx';

import { RefObject } from 'react';

import { CustomComponentProps } from '@shared/lib';
import { IBMPlexMono, useMatrixText } from '@shared/ui';

import { getPlanetData } from '../../model/planets/planets';
import { usePlanetsStore } from '../../model/store/planets-store';

type PlanetNameProps = CustomComponentProps & {
  ref?: RefObject<HTMLHeadingElement | null>;
};

export function PlanetName({ className, ref }: PlanetNameProps) {
  const currentPlanetName = usePlanetsStore((state) => state.currentPlanetName);
  const isDataAnimated = usePlanetsStore((state) => state.isDataAnimated);

  const { name } = getPlanetData(currentPlanetName)!;
  const planetNameMatrixText = useMatrixText({ text: name }, isDataAnimated);

  return (
    <h2
      className={clsx(
        className,
        IBMPlexMono.className,
        ['[--planet-name-padding:_20px]', 'lg:[--planet-name-padding:_40px]'],
        '-mr-[0.3em] max-w-[calc(100%_-_(var(--planet-name-padding)_*_2))] pl-[var(--planet-name-padding)] pr-[var(--planet-name-padding)]',
        [
          'text-center text-[30px] font-medium uppercase tracking-[0.3em]',
          'sm:text-[36px]',
          'md:text-[42px]',
          'lg:text-[48px]',
          '2lg:text-[67px]',
          '6xl:text-[83px]'
        ]
      )}
      ref={ref}
    >
      {planetNameMatrixText}
    </h2>
  );
}
