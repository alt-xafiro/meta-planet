import { create } from 'zustand';

export type SizesState = {
  computedPlanetSize: number | null;
  setComputedPlanetSize: (width: number) => void;
};

export const useSizesStore = create<SizesState>((set) => ({
  computedPlanetSize: null,
  setComputedPlanetSize: (width) => set(() => ({ computedPlanetSize: width }))
}));
