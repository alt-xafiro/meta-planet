export const setNodeProperty = (
  node: HTMLElement,
  property: string,
  value: string
) => {
  node.style.setProperty(property, value);
};

export const setRootProperty = (property: string, value: string) => {
  document.documentElement.style.setProperty(property, value);
};
