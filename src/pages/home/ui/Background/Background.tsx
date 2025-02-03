'use client';

import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';

import '../../config/parallax.css';

import { Nebulas } from './Nebulas/Nebulas';
import { PlanetarySystem } from './PlanetarySystem/PlanetarySystem';
import { Space } from './Space/Space';
import { Stars } from './Stars/Stars';

type BackgroundProps = CustomComponentProps;

export function Background({ className }: BackgroundProps) {
  return (
    <div
      className={clsx(
        className,
        'pointer-events-none touch-none select-none overflow-hidden',
        'absolute left-0 top-0 -z-[9999] h-full w-full'
      )}
    >
      <Space className="z-0" />
      <Nebulas className="z-10" />
      <Stars className="z-20" />
      <PlanetarySystem className="z-30" />
    </div>
  );
}
