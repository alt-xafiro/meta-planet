import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type UserSettingsState = {
  isParallax: boolean;
  toggleIsParallax: () => void;
};

export const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    (set, get) => ({
      isParallax: false,
      toggleIsParallax: () => set({ isParallax: !get().isParallax })
    }),
    {
      name: 'parallax',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
