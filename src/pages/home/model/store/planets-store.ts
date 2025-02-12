import { create } from 'zustand';

import { getRootProperty } from '@shared/lib';

import { PLANETS_DATA_ANIMATION_RATE } from '../../config/planets-data';
import {
  RenderPosition,
  RenderedPlanet,
  VirtualRenderPositionValue,
  getInitialRenderedPlanets,
  getNewRenderedPlanet,
  getUpdatedRenderedPlanets
} from '../../lib/planets';
import { PLANETS, PlanetData } from '../planets/planets';

let dataAnimationTimer: NodeJS.Timeout;

export type PlanetsState = {
  renderedPlanets: RenderedPlanet[];
  addRenderedPlanet: (position: VirtualRenderPositionValue) => void;

  currentPlanetName: PlanetData['name'];
  prevPlanetName: PlanetData['name'];
  nextPlanetName: PlanetData['name'];

  isDataAnimated: boolean;
  animateData: () => void;
};

export const usePlanetsStore = create<PlanetsState>((set) => ({
  renderedPlanets: getInitialRenderedPlanets(),
  addRenderedPlanet: (position) =>
    set((state) => {
      const newRenderedPlanet = getNewRenderedPlanet(
        state.renderedPlanets,
        position
      );

      state.animateData();

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
    }),

  currentPlanetName: PLANETS[0].name,
  prevPlanetName: PLANETS[PLANETS.length - 1].name,
  nextPlanetName: PLANETS[1].name,

  isDataAnimated: false,
  animateData: () =>
    set((state) => {
      if (state.isDataAnimated) {
        clearTimeout(dataAnimationTimer!);
      }

      dataAnimationTimer = setTimeout(
        () => {
          set(() => ({ isDataAnimated: false }));
        },
        parseFloat(getRootProperty('--planets-animation-duration')) *
          1000 *
          PLANETS_DATA_ANIMATION_RATE
      );

      return {
        isDataAnimated: true
      };
    })
}));
