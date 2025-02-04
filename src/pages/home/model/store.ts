import { create } from 'zustand';

import { PlanetData, planets } from './planets';

export type CurrentPlanetState = {
  currentPlanet: PlanetData['name'];
  setCurrentPlanet: (planet: string) => void;
};

export const useCurrentPlanetStore = create<CurrentPlanetState>((set) => ({
  currentPlanet: planets[0].name,
  setCurrentPlanet: (planet) => set(() => ({ currentPlanet: planet }))
}));
