export const StarsConfig = {
  OFFSCREEN_RATIO: 1.2,
  Layers: [
    {
      MIN: 250,
      MAX: 500,
      RATIO: 0.5,
      SPEED: 0.005,
      LIGHTNESS: 1608,
      LUMINOSITY_MIN: 64,
      LUMINOSITY_MAX: 208
    },
    {
      MIN: 150,
      MAX: 300,
      RATIO: 0.3,
      SPEED: 0.01,
      LIGHTNESS: 1608,
      LUMINOSITY_MIN: 64,
      LUMINOSITY_MAX: 208
    },
    {
      MIN: 80,
      MAX: 160,
      RATIO: 0.16,
      SPEED: 0.02,
      LIGHTNESS: 1608,
      LUMINOSITY_MIN: 64,
      LUMINOSITY_MAX: 208
    }
  ]
} as const;
