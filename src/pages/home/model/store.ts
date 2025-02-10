import { create } from 'zustand';

import {
  RenderPosition,
  RenderedPlanet,
  VirtualRenderPositionValue,
  getInitialRenderedPlanets,
  getNewRenderedPlanet,
  getUpdatedRenderedPlanets
} from '../lib/planets';
import { PLANETS, PlanetData } from './planets';

export type PlanetsState = {
  renderedPlanets: RenderedPlanet[];
  currentPlanetName: PlanetData['name'];
  addRenderedPlanet: (position: VirtualRenderPositionValue) => void;
};

export const usePlanetsStore = create<PlanetsState>((set) => ({
  renderedPlanets: getInitialRenderedPlanets(),
  currentPlanetName: PLANETS[0].name,
  addRenderedPlanet: (position) =>
    set((state) => {
      const newRenderedPlanet = getNewRenderedPlanet(
        state.renderedPlanets,
        position
      );

      const updatedRenderedPlanets = getUpdatedRenderedPlanets(
        state.renderedPlanets,
        newRenderedPlanet,
        position
      );

      return {
        renderedPlanets: updatedRenderedPlanets,
        currentPlanetName:
          updatedRenderedPlanets[RenderPosition.CURRENT].planetName
      };
    })
}));
