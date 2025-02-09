export const getFormattedDayLength = (value: number) =>
  `${value} Earth hour${value !== 1 ? 's' : ''}`;

export const getFormattedDiameter = (value: number) =>
  `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} km`;

export const getFormattedTemperature = ([min, max]: [number, number]) =>
  `${min}°C to ${max}°C`;
