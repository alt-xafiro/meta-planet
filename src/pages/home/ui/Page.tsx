'use client';

import clsx from 'clsx';

import { RefObject, useRef } from 'react';

import { Tooltip } from '@shared/ui';

import './styles.css';

import { Background } from './Background/Background';
import { Header } from './Header/Header';
import { PlanetInfo } from './PlanetInfo/PlanetInfo';
import { PlanetName } from './PlanetName/PlanetName';
import { Planets } from './Planets/Planets';
import { useHomePageSizes } from './useHomePageSizes';

export type PageRefs = {
  headerRef: RefObject<HTMLElement>;
  planetNameRef: RefObject<HTMLHeadingElement>;
  planetInfoRef: RefObject<HTMLDivElement>;
};

export function Page() {
  const planetNameRef = useRef<HTMLHeadingElement>(null);
  const planetInfoRef = useRef<HTMLDivElement>(null);

  useHomePageSizes({
    planetNameRef,
    planetInfoRef
  });

  return (
    <>
      <Header />

      <main className="flex min-h-[calc(100%_-_var(--header-height))] flex-col items-center justify-start">
        <h1 className="sr-only">Meta Planet</h1>

        <PlanetName
          className={clsx(['sm:mb-[12px]', '2lg:mb-[36px]', '6xl:mb-[48px]'])}
          ref={planetNameRef}
        />
        <PlanetInfo
          className={clsx(['order-1', 'sm:order-none'])}
          ref={planetInfoRef}
        />
        <div className="flex min-h-[calc(var(--planet-min-size)_+_(var(--planets-padding)_*_2)_+_var(--planets-margin-bottom))] w-full flex-shrink-0 flex-grow">
          <Planets className={clsx('mb-[var(--planets-margin-bottom)]')} />
        </div>
      </main>

      <Background />
      <Tooltip />
    </>
  );
}
