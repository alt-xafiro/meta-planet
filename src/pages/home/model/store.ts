import { create } from 'zustand';

import {
  RenderedPlanet,
  VirtualRenderPositionValue,
  getInitialRenderedPlanets,
  getNewRenderedPlanet,
  getUpdatedRenderedPlanets
} from '../lib/planets';
import { PLANETS, PlanetData } from './planets';

export type PlanetsState = {
  renderedPlanets: RenderedPlanet[];
  addRenderedPlanet: (position: VirtualRenderPositionValue) => void;

  currentPlanetName: PlanetData['name'];
  setCurrentPlanetName: (planetName: string) => void;
};

export const usePlanetsStore = create<PlanetsState>((set) => ({
  renderedPlanets: getInitialRenderedPlanets(),
  addRenderedPlanet: (position) =>
    set((state) => {
      const newRenderedPlanet = getNewRenderedPlanet(
        state.renderedPlanets,
        position
      );

      return {
        renderedPlanets: getUpdatedRenderedPlanets(
          state.renderedPlanets,
          newRenderedPlanet,
          position
        )
      };
    }),

  currentPlanetName: PLANETS[0].name,
  setCurrentPlanetName: (planetName) =>
    set(() => ({ currentPlanetName: planetName }))
}));
