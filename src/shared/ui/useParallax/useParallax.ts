'use client';

import { RefObject, useEffect, useState } from 'react';

import { getRootProperty } from '@shared/lib';

type UseParallax = {
  enabled: boolean;
  ref: RefObject<HTMLElement | null>;
  baseTranslateX?: string;
  baseTranslateY?: string;
  resistance?: string;
};

export const useParallax = ({
  enabled,
  ref,
  baseTranslateX = '0px',
  baseTranslateY = '0px',
  resistance = '1'
}: UseParallax) => {
  const [areSensorsAvailable, setAreSensorsAvailable] =
    useState<boolean>(false);

  useEffect(() => {
    if (!enabled) return;
    if (!ref || !ref.current) return;

    const node = ref.current;

    const SENSOR_OFFSET_RATE = Number(
      getRootProperty('--parallax-sensor-offset-rate')
    );

    const getTranslateCalc = (
      baseTranslate: string,
      axisCenter: number,
      deviceOffset: number
    ) =>
      `calc(${baseTranslate} + ((${deviceOffset}px - ${axisCenter}px) / ${resistance}))`;

    const moveElement = ({
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
        const translateX = getTranslateCalc(
          baseTranslateX,
          windowCenterX,
          deviceOffsetX
        );
        const translateY = getTranslateCalc(
          baseTranslateY,
          windowCenterY,
          deviceOffsetY
        );

        node.style.transform = `translate3d(${translateX}, ${translateY}, 0)`;
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

    const getSensorsOffset = (evt: DeviceOrientationEvent) => {
      return {
        deviceOffsetX: evt.gamma! * SENSOR_OFFSET_RATE,
        deviceOffsetY: evt.beta! * SENSOR_OFFSET_RATE
      };
    };

    const handleMouseMove = (evt: MouseEvent) => {
      window.requestAnimationFrame(
        moveElement({ ...getWindowCenter(), ...getMouseOffset(evt) })
      );
    };

    const handleDeviceOrientation = (evt: DeviceOrientationEvent) => {
      if (!areSensorsAvailable && evt.beta !== null && evt.gamma !== null) {
        setAreSensorsAvailable(true);
      }

      window.requestAnimationFrame(
        moveElement({ ...getWindowCenter(), ...getSensorsOffset(evt) })
      );
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    if (!areSensorsAvailable) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (!areSensorsAvailable) {
        window.removeEventListener('mousemove', handleMouseMove);
      }

      if (window.DeviceOrientationEvent) {
        window.removeEventListener(
          'deviceorientation',
          handleDeviceOrientation
        );
      }
    };
  }, [
    ref,
    resistance,
    baseTranslateX,
    baseTranslateY,
    enabled,
    areSensorsAvailable
  ]);
};
