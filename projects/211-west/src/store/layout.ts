import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type LayoutState = {
  isSettingsOpen: boolean;
  isMenuOpen: boolean;
};

export type LayoutActions = {
  updateSettings: (isOpen: boolean) => void;
  toggleSettings: () => void;
  updateMenu: (isOpen: boolean) => void;
  toggleMenu: () => void;
};

export const useLayoutStore = create(
  immer<LayoutState & LayoutActions>((set) => ({
    isSettingsOpen: false,
    isMenuOpen: false,

    updateSettings: (isOpen) => {
      set((state) => {
        state.isSettingsOpen = isOpen;
      });
    },
    toggleSettings: () => {
      set((state) => {
        state.isSettingsOpen = !state.isSettingsOpen;
      });
    },
    updateMenu: (isOpen) => {
      set((state) => {
        state.isMenuOpen = isOpen;
      });
    },
    toggleMenu: () => {
      set((state) => {
        state.isMenuOpen = !state.isMenuOpen;
      });
    }
  }))
);

export const layoutState = useLayoutStore.getState();
