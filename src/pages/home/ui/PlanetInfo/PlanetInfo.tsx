'use client';

import clsx from 'clsx';

import { RefObject } from 'react';

import { getPlanetData } from '@pages/home/model/planets';
import { usePlanetsStore } from '@pages/home/model/store';

import {
  CustomComponentProps,
  getFormattedDayLength,
  getFormattedDiameter,
  getFormattedTemperature
} from '@shared/lib';

type PlanetInfoProps = CustomComponentProps & {
  ref?: RefObject<HTMLDivElement | null>;
};

export function PlanetInfo({ className, ref }: PlanetInfoProps) {
  const currentPlanetName = usePlanetsStore((state) => state.currentPlanetName);

  const { galaxy, diameter, dayLength, avgTemperature, climate } =
    getPlanetData(currentPlanetName)!;

  type InfoValue = string | number | [number, number];

  const entries = [
    ['Galaxy', galaxy, null],
    ['Diameter', diameter, getFormattedDiameter],
    ['Day length', dayLength, getFormattedDayLength],
    ['Avg temprature', avgTemperature, getFormattedTemperature],
    ['Climate', climate, null]
  ] as [string, InfoValue, ((value: InfoValue) => string) | null][];

  return (
    <div
      className={clsx(
        className,
        [
          'flex max-w-[1400px] flex-col gap-[24px] pb-[40px] pl-[20px] pr-[20px]',
          'sm:grid sm:grid-cols-[repeat(5,_minmax(0,_max-content))] sm:grid-rows-1 sm:gap-[16px] sm:pb-0 sm:pl-[24px] sm:pr-[24px]',
          'md:pl-[32px] md:pr-[32px]',
          'lg:gap-[36px]',
          '2lg:gap-[48px] 2lg:pl-[40px] 2lg:pr-[40px]',
          '3xl:gap-[60px] 3xl:pl-[50px] 3xl:pr-[50px]'
        ],
        ['text-center', 'sm:text-left']
      )}
      ref={ref}
    >
      {entries.map(([key, value, getFormattedValue]) => {
        return (
          <dl
            key={key}
            className={clsx([
              'flex flex-col items-center justify-start',
              'sm:items-start sm:gap-[2px] sm:self-start sm:justify-self-start',
              'md:gap-[4px]',
              '2lg:gap-[6px]',
              '3xl:gap-[8px]'
            ])}
          >
            <dt
              className={clsx([
                'text-[16px] uppercase tracking-[0.21em] text-space-100/70',
                'sm:text-[12px]',
                'md:text-[14px]',
                'lg:text-[18px]',
                '2lg:text-[20px]',
                '3xl:text-[25px]'
              ])}
            >
              {key}
            </dt>
            <dd
              className={clsx([
                'text-[20px]',
                'sm:text-[14px]',
                'md:text-[18px]',
                'lg:text-[20px]',
                '2lg:text-[24px]',
                '3xl:text-[30px]'
              ])}
            >
              {getFormattedValue ? getFormattedValue(value) : value}
            </dd>
          </dl>
        );
      })}
    </div>
  );
}
