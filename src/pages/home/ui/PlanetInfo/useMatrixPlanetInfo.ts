import { useMatrixText } from '@shared/ui';

import {
  MessagesUnit,
  getFormattedDayLength,
  getFormattedDiameter,
  getFormattedTemperature,
  getNumberWithSeparators
} from '../../lib/format';
import { getPlanetData } from '../../model/planets/planets';
import { usePlanetsStore } from '../../model/store/planets-store';

export const useMatrixPlanetInfo = () => {
  const { currentPlanetName, isDataAnimated } = usePlanetsStore(
    (state) => state
  );

  const { galaxy, diameter, dayLength, avgTemperature, climate } =
    getPlanetData(currentPlanetName)!;

  const galaxyMatrixText = useMatrixText(
    {
      text: galaxy,
      sentenceCase: true
    },
    isDataAnimated
  );

  const diameterMatrixText = useMatrixText(
    {
      text: getFormattedDiameter(diameter),
      matrixText: [
        { text: `${getNumberWithSeparators(diameter)}`, matrix: true },
        { text: ` ${MessagesUnit.DIAMETER}`, matrix: false }
      ]
    },
    isDataAnimated
  );

  const dayLengthMatrixText = useMatrixText(
    {
      text: getFormattedDayLength(dayLength),
      matrixText: [
        { text: `${dayLength}`, matrix: true },
        { text: ` ${MessagesUnit.dayLength(dayLength)}`, matrix: false }
      ]
    },
    isDataAnimated
  );

  const avgTemperatureMatrixText = useMatrixText(
    {
      text: getFormattedTemperature(avgTemperature),
      matrixText: [
        { text: avgTemperature[0] < 0 ? '-' : '', matrix: false },
        { text: `${Math.abs(avgTemperature[0])}`, matrix: true },
        { text: `${MessagesUnit.TEMPERATURE}`, matrix: false },
        { text: ` ${MessagesUnit.CONNECTOR} `, matrix: false },
        { text: avgTemperature[1] < 0 ? '-' : '', matrix: false },
        { text: `${Math.abs(avgTemperature[1])}`, matrix: true },
        { text: `${MessagesUnit.TEMPERATURE}`, matrix: false }
      ]
    },
    isDataAnimated
  );

  const climateMatrixText = useMatrixText(
    {
      text: climate,
      sentenceCase: true
    },
    isDataAnimated
  );

  return [
    galaxyMatrixText,
    diameterMatrixText,
    dayLengthMatrixText,
    avgTemperatureMatrixText,
    climateMatrixText
  ];
};
