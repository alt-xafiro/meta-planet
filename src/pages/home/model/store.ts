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
  prevPlanetName: PlanetData['name'];
  nextPlanetName: PlanetData['name'];
  addRenderedPlanet: (position: VirtualRenderPositionValue) => void;
};

export const usePlanetsStore = create<PlanetsState>((set) => ({
  renderedPlanets: getInitialRenderedPlanets(),
  currentPlanetName: PLANETS[0].name,
  prevPlanetName: PLANETS[PLANETS.length - 1].name,
  nextPlanetName: PLANETS[1].name,
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
          updatedRenderedPlanets[RenderPosition.CURRENT].planetName,
        prevPlanetName: updatedRenderedPlanets[RenderPosition.PREV].planetName,
        nextPlanetName: updatedRenderedPlanets[RenderPosition.NEXT].planetName
      };
    })
}));

export type SizesState = {
  computedPlanetSize: number | null;
  setComputedPlanetSize: (width: number) => void;
};

export const useSizesStore = create<SizesState>((set) => ({
  computedPlanetSize: null,
  setComputedPlanetSize: (width) => set(() => ({ computedPlanetSize: width }))
}));
