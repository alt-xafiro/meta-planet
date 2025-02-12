import { nanoid } from 'nanoid';

import { getIndexWithinLimit } from '@shared/lib';

import { PLANETS, getPlanetName } from '../model/planets/planets';

//  There are 3 real positions: `PREV`, `CURRENT` and `NEXT`.
//  There are 2 virtual positions: `BEFORE_PREV` and `AFTER_NEXT`.
//
//  The virtual positions are used for animation of planets appearance
//  on `PREV` and `NEXT` positions.

export const RenderPosition = {
  BEFORE_PREV: 0,
  PREV: 1,
  CURRENT: 2,
  NEXT: 3,
  AFTER_NEXT: 4
} as const;

export type RenderPositionValue =
  (typeof RenderPosition)[keyof typeof RenderPosition];

export type VirtualRenderPositionValue = (typeof RenderPosition)[keyof Pick<
  typeof RenderPosition,
  'BEFORE_PREV' | 'AFTER_NEXT'
>];

// The idea is to store unique `key` props of rendered `Planet` components.
//
// This way, we can create infinite carousel of planets and update the rendered
// planets without having to re-render them. The updating without re-rendering
// gives the ability to animate switching between planets.

export class RenderedPlanet {
  public key: string;
  public position: RenderPositionValue;
  public planetName: string;
  public planetIndex: number; // index in the PLANETS array

  constructor(planetIndex: number, position: RenderPositionValue) {
    this.key = nanoid();
    this.position = position;
    this.planetName = getPlanetName(planetIndex);
    this.planetIndex = planetIndex;
  }

  public setPosition(position: RenderPositionValue) {
    this.position = position;
  }
}

export const getInitialRenderedPlanets = () => {
  return new Array(Object.keys(RenderPosition).length)
    .fill(null)
    .map(
      (_, i) =>
        new RenderedPlanet(
          getIndexWithinLimit(i - 2, PLANETS.length - 1),
          i as RenderPositionValue
        )
    );
};

export const getNewRenderedPlanet = (
  renderedPlanets: RenderedPlanet[],
  position: VirtualRenderPositionValue
) => {
  return new RenderedPlanet(
    position === RenderPosition.BEFORE_PREV
      ? getIndexWithinLimit(
          renderedPlanets[0].planetIndex - 1,
          PLANETS.length - 1
        )
      : getIndexWithinLimit(
          renderedPlanets[renderedPlanets.length - 1].planetIndex + 1,
          PLANETS.length - 1
        ),
    position
  );
};

export const getUpdatedRenderedPlanets = (
  renderedPlanets: RenderedPlanet[],
  newRenderedPlanet: RenderedPlanet,
  position: RenderPositionValue
) => {
  const updatedRenderedPlanets = [...renderedPlanets];

  if (position === RenderPosition.BEFORE_PREV) {
    updatedRenderedPlanets.pop();
    updatedRenderedPlanets.unshift(newRenderedPlanet);
  }

  if (position === RenderPosition.AFTER_NEXT) {
    updatedRenderedPlanets.shift();
    updatedRenderedPlanets.push(newRenderedPlanet);
  }

  updatedRenderedPlanets.forEach((renderedPlanet, i) => {
    renderedPlanet.setPosition(i as RenderPositionValue);
  });

  return updatedRenderedPlanets;
};
