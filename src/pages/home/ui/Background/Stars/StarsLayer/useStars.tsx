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
};

export function useStars({
  canvasRef,
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
    if (!canvasRef || !canvasRef.current) return;

    const canvasNode = canvasRef.current;
    const ctx = canvasNode.getContext('2d')!;

    const config = {
      offScreenRatio,
      minStarsCount: min,
      maxStarsCount: max,
      starsCountMultiplier: ratio,
      starsSpeed: speed,
      starsLightness: lightness,
      luminosityMax,
      luminosityMin
    };

    const canvas = {
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
      starsCount = clamp(
        config.minStarsCount,
        Math.floor(
          ((window.innerWidth * window.innerHeight) /
            window.devicePixelRatio /
            config.starsLightness) *
            config.starsCountMultiplier
        ),
        config.maxStarsCount
      );
    };

    const setCansvasSize = () => {
      canvasNode.width = window.innerWidth * offScreenRatio;
      canvasNode.height = window.innerHeight * offScreenRatio;

      const scale = Math.max(window.devicePixelRatio, 1);

      canvas.width = canvasNode.width;
      canvas.height = canvasNode.height;

      canvasNode.width = canvas.width * scale;
      canvasNode.height = canvas.height * scale;

      canvasNode.style.width = `${canvas.width}px`;
      canvasNode.style.height = `${canvas.height}px`;

      ctx.scale(scale, scale);

      canvas.center = { x: canvas.width / 2, y: canvas.height / 2 };
    };

    setCansvasSize();
    setStarsCount();

    const getCanvasLength = () => canvas.width / 2 + canvas.height / 2;

    const setStarParameters = (
      star: Star,
      minDistance: number,
      fadeIn: number
    ) => {
      const luminosity = getRandomNumber(
        config.luminosityMin,
        config.luminosityMax
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
          star.speed * config.starsSpeed * (star.distance / getCanvasLength());
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const starX = Math.cos(star.angle) * star.distance + canvas.center.x;
        const starY = Math.sin(star.angle) * star.distance + canvas.center.y;
        const starTransparency =
          star.color.a * (star.distance / 100) * star.fadeIn;

        ctx.beginPath();
        ctx.arc(
          starX,
          starY,
          1 / window.devicePixelRatio,
          0,
          2 * Math.PI,
          false
        );
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
    speed
  ]);
}
