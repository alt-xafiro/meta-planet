import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfigFile from '@@/tailwind.config';

const tailwindConfig = resolveConfig(tailwindConfigFile);

export const Breakpoint = tailwindConfig.theme.screens;

export const getBreakpointValue = (breakpoint: keyof typeof Breakpoint) => {
  if (!Breakpoint[breakpoint]) return null;

  return parseInt(Breakpoint[breakpoint], 10);
};
