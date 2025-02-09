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
  planetarySystemCoordinates: {
    x: string;
    y: string;
  };
  nebulasGradient: {
    from: string;
    to: string;
  };
};

export const PLANETS = planetsJson as unknown as PlanetData[];

/**
 * @param query Either planet name or planet index.
 */
export const getPlanetData = (query: string | number) =>
  PLANETS.find((planet, i) =>
    typeof query === 'string' ? query === planet.name! : query === i
  );

export const getPlanetIndex = (planetName: string) =>
  PLANETS.findIndex((planet) => planetName === planet.name);

export const getPlanetName = (planetIndex: number) =>
  PLANETS[planetIndex]!.name;
