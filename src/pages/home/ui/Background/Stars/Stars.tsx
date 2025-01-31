'use client';

import clsx from 'clsx';

import { useRef } from 'react';

import { CustomComponentProps } from '@shared/lib';

import './bg-stars-image.css';
import { useParallaxStars } from './useParallaxStars';

type StarsProps = CustomComponentProps;

export function Stars({ className }: StarsProps) {
  const starsRef = useRef<HTMLDivElement>(null);

  useParallaxStars(starsRef);

  return (
    <>
      <div
        className={clsx(
          className,
          'absolute left-0 right-0 h-full w-full overflow-hidden'
        )}
      >
        <div
          className={clsx(
            'absolute -left-1/2 -top-1/2',
            'h-[200%] w-[200%]',
            'bg-stars-image bg-[length:1002px_1033px] bg-center bg-repeat',
            'animate-infinite-sliding transition-transform duration-1000 ease-[cubic-bezier(0.22,_1,_0.36,_1)] will-change-[transform,_background-position]'
          )}
          ref={starsRef}
        ></div>
      </div>
    </>
  );
}
