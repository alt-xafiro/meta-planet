'use client';

import { RefObject, useEffect } from 'react';

type UseParallax = {
  enabled: boolean;
  ref: RefObject<HTMLElement | null>;
  baseTranslateX?: string;
  baseTranslateY?: string;
  resistance?: string;
};

export const useMouseParallax = ({
  enabled,
  ref,
  baseTranslateX = '0px',
  baseTranslateY = '0px',
  resistance = '1'
}: UseParallax) => {
  useEffect(() => {
    if (!enabled) return;
    if (!ref || !ref.current) return;

    const node = ref.current;

    const getTranslateCalc = (
      baseTranslate: string,
      axisCenter: number,
      mouseOffset: number
    ) =>
      `calc(${baseTranslate} + ((${mouseOffset}px - ${axisCenter}px) / ${resistance}))`;

    const moveElement = ({
      windowCenterX,
      windowCenterY,
      mouseOffsetX,
      mouseOffsetY
    }: {
      windowCenterX: number;
      windowCenterY: number;
      mouseOffsetX: number;
      mouseOffsetY: number;
    }) => {
      return () => {
        const translateX = getTranslateCalc(
          baseTranslateX,
          windowCenterX,
          mouseOffsetX
        );
        const translateY = getTranslateCalc(
          baseTranslateY,
          windowCenterY,
          mouseOffsetY
        );

        node.style.transform = `translate3d(${translateX}, ${translateY}, 0)`;
      };
    };

    const handleMouseMove = (evt: MouseEvent) => {
      window.requestAnimationFrame(
        moveElement({
          windowCenterX: window.innerWidth / 2,
          windowCenterY: window.innerHeight / 2,
          mouseOffsetX: evt.clientX,
          mouseOffsetY: evt.clientY
        })
      );
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref, resistance, baseTranslateX, baseTranslateY, enabled]);
};
