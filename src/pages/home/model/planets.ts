import planetsJson from './planets.json';

type Galaxy = 'Andromeda-IV' | 'Sombrero' | 'Virgo A';

type Climate = 'Polar' | 'Temperate' | 'Tropical';

export type Planet = {
  name: string;
  galaxy: Galaxy;
  diameter: number;
  dayLength: number;
  avgTemperature: [number, number];
  climate: Climate;
  image: string;
  nebulasGradient: {
    from: string;
    to: string;
  };
};

export const planets = planetsJson as unknown as Planet[];
