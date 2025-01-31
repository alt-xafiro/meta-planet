'use client';

import { RefObject, useEffect } from 'react';

import { ParallaxResistance } from '../../../config/parallax';

export function useParallaxStars(starsRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!starsRef || !starsRef.current) return;

    const starsNode = starsRef.current;

    const handleMouseMove = (evt: MouseEvent) => {
      const mouseX = evt.clientX;
      const mouseY = evt.clientY;

      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;

      const getTranslateCalc = (axisCenter: number, mousePosition: number) =>
        `calc((${mousePosition}px - ${axisCenter}px) / ${ParallaxResistance.STARS})`;

      const starsOffsetX = getTranslateCalc(windowCenterX, mouseX);
      const starsOffsetY = getTranslateCalc(windowCenterY, mouseY);

      starsNode.style.transform = `translate(${starsOffsetX}, ${starsOffsetY})`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [starsRef]);
}
