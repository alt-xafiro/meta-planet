import planetsJson from './planets.json';

type Galaxy = 'Andromeda-IV' | 'Sombrero' | 'Virgo A';

type Climate = 'Polar' | 'Temperate' | 'Tropical';

export type PlanetData = {
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

export const planets = planetsJson as unknown as PlanetData[];

export const getPlanet = (name: string) =>
  planets.find((planet) => name === planet.name);

export const getPlanetIndex = (name: string) =>
  planets.findIndex((planet) => name === planet.name);
