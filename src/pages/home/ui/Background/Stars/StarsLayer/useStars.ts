'use client';

import clamp from 'just-clamp';

import { RefObject, useEffect } from 'react';

import { getRandomNumber } from '@shared/lib';

export type UseStarsConfig = {
  offScreenRatio: number;
  min: number;
  max: number;
  ratio: number;
  speed: number;
  lightness: number;
  luminosityMax: number;
  luminosityMin: number;
};

type UseStars = UseStarsConfig & {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  wrapperRef: RefObject<HTMLElement | null>;
};

export function useStars({
  canvasRef,
  wrapperRef,
  offScreenRatio,
  min,
  max,
  ratio,
  speed,
  lightness,
  luminosityMax,
  luminosityMin
}: UseStars) {
  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !wrapperRef || !wrapperRef.current)
      return;

    const canvasNode = canvasRef.current;
    const ctx = canvasNode.getContext('2d')!;

    const wrapperNode = wrapperRef.current;

    const getDPIRatio = (min?: number) =>
      min === undefined
        ? window.devicePixelRatio
        : Math.max(window.devicePixelRatio, min);

    const starsConfig = {
      offScreenRatio,
      minStarsCount: min,
      maxStarsCount: max,
      starsCountMultiplier: ratio,
      starsSpeed: speed,
      starsLightness: lightness,
      luminosityMax,
      luminosityMin
    };

    const canvasConfig = {
      width: 0,
      height: 0,
      center: {
        x: 0,
        y: 0
      }
    };

    class Star {
      angle: number;
      distance: number;
      speed: number;
      color: { r: number; g: number; b: number; a: number };
      fadeIn: number;

      constructor() {
        this.angle = 0;
        this.distance = 0;
        this.speed = 0;
        this.color = { r: 255, g: 255, b: 255, a: 1 };
        this.fadeIn = 0;
      }
    }

    let stars: Star[] = [];
    let starsCount: number;

    const setStarsCount = () => {
      const DPIRatio = getDPIRatio(1);

      starsCount = clamp(
        starsConfig.minStarsCount * Math.min(DPIRatio, 2),
        Math.floor(
          ((wrapperNode.offsetWidth *
            wrapperNode.offsetHeight *
            Math.min(DPIRatio, 2)) /
            starsConfig.starsLightness) *
            starsConfig.starsCountMultiplier
        ),
        starsConfig.maxStarsCount * Math.min(DPIRatio, 2)
      );
    };

    const setCansvasSize = () => {
      const DPIRatio = getDPIRatio(1);

      canvasConfig.width = wrapperNode.offsetWidth * offScreenRatio;
      canvasConfig.height = wrapperNode.offsetHeight * offScreenRatio;
      canvasConfig.center = {
        x: canvasConfig.width / 2,
        y: canvasConfig.height / 2
      };

      canvasNode.width = canvasConfig.width * DPIRatio;
      canvasNode.height = canvasConfig.height * DPIRatio;

      canvasNode.style.width = `${canvasConfig.width}px`;
      canvasNode.style.height = `${canvasConfig.height}px`;

      if (DPIRatio > 1) {
        ctx.scale(DPIRatio, DPIRatio);
      }
    };

    setCansvasSize();
    setStarsCount();

    const getCanvasLength = () =>
      canvasConfig.width / 2 + canvasConfig.height / 2;

    const setStarParameters = (
      star: Star,
      minDistance: number,
      fadeIn: number
    ) => {
      const luminosity = getRandomNumber(
        starsConfig.luminosityMin,
        starsConfig.luminosityMax
      );

      star.angle = getRandomNumber(0, 2 * Math.PI);
      star.speed = getRandomNumber(10, 100);
      star.distance = getRandomNumber(minDistance, getCanvasLength());
      star.fadeIn = fadeIn;
      star.color.r = luminosity;
      star.color.g = luminosity;
      star.color.b = luminosity;
    };

    const createStars = () => {
      const newStarsCount = starsCount - stars.length;

      for (let i = 0; i < newStarsCount; i++) {
        const newStar = new Star();

        setStarParameters(newStar, 20, getRandomNumber(0.01, 1));

        stars.push(newStar);
      }
    };

    const updateStars = () => {
      for (const star of stars) {
        star.distance +=
          star.speed *
          starsConfig.starsSpeed *
          (star.distance / getCanvasLength());
        star.fadeIn += 0.01;

        if (star.fadeIn > 1) {
          star.fadeIn = 1;
        }

        if (star.distance > getCanvasLength()) {
          setStarParameters(star, 1, 0);
        }
      }
    };

    const paintStars = () => {
      ctx.clearRect(0, 0, canvasConfig.width, canvasConfig.height);

      const DPIRatio = getDPIRatio();

      for (const star of stars) {
        const starX =
          Math.cos(star.angle) * star.distance + canvasConfig.center.x;
        const starY =
          Math.sin(star.angle) * star.distance + canvasConfig.center.y;
        const starTransparency =
          star.color.a * (star.distance / 100) * star.fadeIn;

        ctx.beginPath();
        ctx.arc(starX, starY, 1 / DPIRatio, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${starTransparency})`;
        ctx.fill();
      }
    };

    const handleWindowResize = () => {
      setCansvasSize();
      setStarsCount();

      if (stars.length > starsCount) {
        stars = stars.slice(0, starsCount);
      }

      if (stars.length < starsCount) {
        createStars();
      }
    };

    const renderFrame = () => {
      updateStars();
      paintStars();

      window.requestAnimationFrame(renderFrame);
    };

    createStars();
    renderFrame();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [
    offScreenRatio,
    luminosityMax,
    luminosityMin,
    canvasRef,
    lightness,
    max,
    min,
    ratio,
    speed,
    wrapperRef
  ]);
}
