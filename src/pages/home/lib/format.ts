export const MessagesUnit = {
  CONNECTOR: 'to',
  dayLength(value: number) {
    return `Earth hour${value !== 1 ? 's' : ''}`;
  },
  DIAMETER: 'km',
  TEMPERATURE: '°C'
};

export const getNumberWithSeparators = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const getFormattedDayLength = (value: number) =>
  `${value} ${MessagesUnit.dayLength(value)}`;

export const getFormattedDiameter = (value: number) =>
  `${getNumberWithSeparators(value)} ${MessagesUnit.DIAMETER}`;

export const getFormattedTemperature = ([min, max]: [number, number]) =>
  `${min}${MessagesUnit.TEMPERATURE} ${MessagesUnit.CONNECTOR} ${max}${MessagesUnit.TEMPERATURE}`;
