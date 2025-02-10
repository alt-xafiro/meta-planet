'use client';

import clsx from 'clsx';

import { useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';

import { StarsConfig } from '../../../config/stars';
import { StarsLayer } from './StarsLayer/StarsLayer';

type StarsProps = CustomComponentProps;

export function Stars({ className }: StarsProps) {
  const starsWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={clsx(className, 'fixed bottom-0 left-0 h-screen w-full')}
      ref={starsWrapperRef}
    >
      {[1, 2, 3].map((layer) => (
        <StarsLayer
          key={layer}
          wrapperRef={starsWrapperRef}
          offScreenRatio={StarsConfig.OFFSCREEN_RATIO}
          min={StarsConfig.Layers[layer - 1].MIN}
          max={StarsConfig.Layers[layer - 1].MAX}
          ratio={StarsConfig.Layers[layer - 1].RATIO}
          speed={StarsConfig.Layers[layer - 1].SPEED}
          lightness={StarsConfig.Layers[layer - 1].LIGHTNESS}
          luminosityMin={StarsConfig.Layers[layer - 1].LUMINOSITY_MIN}
          luminosityMax={StarsConfig.Layers[layer - 1].LUMINOSITY_MAX}
          resistance={`var(--parallax-stars-${layer}-resistance)`}
          className={clsx(
            layer === 1 &&
              'z-[11] duration-[var(--parallax-stars-1-delay)] ease-[var(--parallax-stars-1-ease)]',
            layer === 2 &&
              'z-[12] duration-[var(--parallax-stars-2-delay)] ease-[var(--parallax-stars-2-ease)]',
            layer === 3 &&
              'z-[13] duration-[var(--parallax-stars-3-delay)] ease-[var(--parallax-stars-3-ease)]'
          )}
        />
      ))}
    </div>
  );
}
