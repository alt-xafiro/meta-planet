'use client';

import { RefObject, useEffect } from 'react';

import { ParallaxConfig } from '../../../config/parallax';

export function useParallaxStars(starsRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!starsRef || !starsRef.current) return;

    const starsNode = starsRef.current;

    const getTranslateCalc = (axisCenter: number, deviceOffset: number) =>
      `calc((${deviceOffset}px - ${axisCenter}px) / ${ParallaxConfig.Resistance.STARS})`;

    const moveStars = ({
      windowCenterX,
      windowCenterY,
      deviceOffsetX,
      deviceOffsetY
    }: {
      windowCenterX: number;
      windowCenterY: number;
      deviceOffsetX: number;
      deviceOffsetY: number;
    }) => {
      return () => {
        const starsOffsetX = getTranslateCalc(windowCenterX, deviceOffsetX);
        const starsOffsetY = getTranslateCalc(windowCenterY, deviceOffsetY);

        starsNode.style.transform = `translate(${starsOffsetX}, ${starsOffsetY})`;
      };
    };

    const getWindowCenter = () => {
      return {
        windowCenterX: window.innerWidth / 2,
        windowCenterY: window.innerHeight / 2
      };
    };

    const getMouseOffset = (evt: MouseEvent) => {
      return {
        deviceOffsetX: evt.clientX,
        deviceOffsetY: evt.clientY
      };
    };

    const getSensorOffset = (evt: DeviceOrientationEvent) => {
      return {
        deviceOffsetX: evt.gamma! * ParallaxConfig.SENSOR_OFFSET_RATE,
        deviceOffsetY: evt.beta! * ParallaxConfig.SENSOR_OFFSET_RATE
      };
    };

    const handleMouseMove = (evt: MouseEvent) => {
      window.requestAnimationFrame(
        moveStars({ ...getWindowCenter(), ...getMouseOffset(evt) })
      );
    };

    const handleDeviceOrientation = (evt: DeviceOrientationEvent) => {
      window.requestAnimationFrame(
        moveStars({ ...getWindowCenter(), ...getSensorOffset(evt) })
      );
    };

    window.addEventListener('mousemove', handleMouseMove);

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      if (window.DeviceOrientationEvent) {
        window.removeEventListener(
          'deviceorientation',
          handleDeviceOrientation
        );
      }
    };
  }, [starsRef]);
}
