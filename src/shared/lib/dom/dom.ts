export const setRootProperty = (property: string, value: string) => {
  document.documentElement.style.setProperty(property, value);
};
