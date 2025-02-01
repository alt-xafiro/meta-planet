'use client';

import { RefObject, useEffect } from 'react';

export function useAspectSquare(elementRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (CSS.supports('aspect-ratio: 1/1')) return;

    if (!elementRef || !elementRef.current) return;

    const elementNode = elementRef.current;

    const setElementHeight = () => {
      const elementWidth = getComputedStyle(elementNode).width;

      elementNode.style.height = elementWidth;
    };

    setElementHeight();

    const handleWindowResize = () => {
      setElementHeight();
    };

    window.addEventListener('resize', handleWindowResize);
  }, [elementRef]);
}
