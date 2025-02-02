'use client';

import clsx from 'clsx';

import { useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';
import { useMouseParallax } from '@shared/ui';

import './styles.css';

type StarsProps = CustomComponentProps;

export function Stars({ className }: StarsProps) {
  const starsRef = useRef<HTMLDivElement>(null);

  useMouseParallax({
    ref: starsRef,
    resistance: 'var(--parallax-stars-resistance)'
  });

  return (
    <>
      <div className={clsx(className, 'fixed bottom-0 left-0 h-screen w-full')}>
        <div
          className={clsx(
            'absolute -left-[10%] -top-[10%]',
            'h-[120vh] w-[120%]',
            'bg-image-stars bg-[length:1002px_1033px] bg-center bg-repeat',
            'animate-infinite-sliding transition-transform duration-[var(--parallax-stars-delay)] ease-[var(--parallax-stars-ease)] will-change-[transform,_background-position]'
          )}
          ref={starsRef}
        ></div>
      </div>
    </>
  );
}
