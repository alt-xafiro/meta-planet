'use client';

import clsx from 'clsx';

import { useRef } from 'react';

import { useUserSettingsStore } from '@pages/home/model/store/user-settings-store';

import { CustomComponentProps } from '@shared/lib';
import { useParallax } from '@shared/ui';

import '../../../config/nebulas.css';
import './styles.css';

import { getPlanetData } from '../../../model/planets/planets';
import { usePlanetsStore } from '../../../model/store/planets-store';
import { useSetNebulas } from './useSetNebulas';

type NebulasProps = CustomComponentProps;

export function Nebulas({ className }: NebulasProps) {
  const currentPlanetName = usePlanetsStore((state) => state.currentPlanetName);
  const { nebulasGradient } = getPlanetData(currentPlanetName)!;

  useSetNebulas(nebulasGradient.from, nebulasGradient.to);

  return (
    <div className={className}>
      <div className={clsx('fixed bottom-0 left-0 h-screen w-full')}>
        <Nebula
          className={clsx(['-left-[20px] top-[20%] hidden', 'lg:block'])}
        />
        <Nebula className={clsx(['-right-[40px] top-[0%]', 'lg:top-[37%]'])} />
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
  const isParallax = useUserSettingsStore((state) => state.isParallax);

  useParallax({
    enabled: isParallax,
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
