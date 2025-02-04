'use client';

import clsx from 'clsx';

import { RefObject, useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';
import { useMouseParallax } from '@shared/ui';

import { UseStarsConfig, useStars } from './useStars';

type StarsLayerProps = CustomComponentProps &
  UseStarsConfig & {
    wrapperRef: RefObject<HTMLElement | null>;
    resistance: string;
  };

export function StarsLayer({
  className,
  wrapperRef,
  offScreenRatio,
  min,
  max,
  ratio,
  speed,
  lightness,
  luminosityMax,
  luminosityMin,
  resistance
}: StarsLayerProps) {
  const starsRef = useRef<HTMLCanvasElement>(null);

  useStars({
    canvasRef: starsRef,
    wrapperRef,
    offScreenRatio,
    min,
    max,
    ratio,
    speed,
    lightness,
    luminosityMax,
    luminosityMin
  });

  useMouseParallax({
    ref: starsRef,
    resistance
  });

  return (
    <canvas
      className={clsx(
        className,
        'absolute -left-[10%] -top-[10%]',
        'h-[120%] w-[120%]',
        'transition-transform will-change-transform'
      )}
      ref={starsRef}
    />
  );
}
