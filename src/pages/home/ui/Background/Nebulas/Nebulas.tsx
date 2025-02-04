'use client';

import clsx from 'clsx';

import { useRef } from 'react';

import { getPlanet } from '@pages/home/model/planets';

import { CustomComponentProps } from '@shared/lib';
import { useMouseParallax } from '@shared/ui';

import '../../../config/nebulas.css';
import { useCurrentPlanetStore } from '../../../model/store';
import './styles.css';
import { useSetNebulas } from './useSetNebulas';

type NebulasProps = CustomComponentProps;

export function Nebulas({ className }: NebulasProps) {
  const currentPlanet = useCurrentPlanetStore((state) => state.currentPlanet);
  const { nebulasGradient } = getPlanet(currentPlanet)!;

  useSetNebulas(nebulasGradient.from, nebulasGradient.to);

  return (
    <div className={className}>
      <div className={clsx('fixed bottom-0 left-0 h-screen w-full')}>
        <Nebula className={clsx('-left-[20px] top-[20%] hidden lg:block')} />
        <Nebula className={clsx('-right-[40px] top-[0%] lg:top-[37%]')} />
        <Nebula
          className={clsx('bottom-0 left-1/2 -translate-x-1/2')}
          baseTranslateX="-50%"
        />
      </div>
    </div>
  );
}

type NebulaProps = CustomComponentProps & {
  baseTranslateX?: string;
  baseTranslateY?: string;
};

function Nebula({ className, baseTranslateX, baseTranslateY }: NebulaProps) {
  const nebulaRef = useRef<HTMLDivElement>(null);

  useMouseParallax({
    ref: nebulaRef,
    baseTranslateX,
    baseTranslateY,
    resistance: 'var(--parallax-nebulas-resistance)'
  });

  return (
    <div
      className={clsx(
        className,
        'absolute',
        'h-[128px] w-[19vw] min-w-[320px] max-w-[364px]',
        'bg-gradient-to-br from-[var(--nebula-gradient-from)] to-[var(--nebula-gradient-to)] blur-[173px]',
        'duration-[var(--nebulas-color-transition-duration),_var(--nebulas-color-transition-duration),_var(--parallax-nebulas-delay)] ease-[linear,_linear,_var(--parallax-nebulas-ease)] will-change-transform [transition-property:_--nebula-gradient-from,_--nebula-gradient-to,_transform]'
      )}
      ref={nebulaRef}
    ></div>
  );
}
