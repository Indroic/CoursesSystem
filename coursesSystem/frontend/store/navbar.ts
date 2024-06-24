import { create } from "zustand";

interface NavbarState {
  isMenuOpen: boolean;
  loaded: boolean;
  items: Array<{
    label: string;
    href: string;
    permission?: string;
  }>;
  toggleMenu: () => void;
  setItems: (
    items: Array<{
      label: string;
      href: string;
      permission?: string;
    }>,
  ) => void;
  changeLoaded: () => void;
}

const useNavbar = create<NavbarState>((set) => ({
  isMenuOpen: false,
  loaded: false,
  items: [],
  toggleMenu: () =>
  set((state) => ({ ...state, isMenuOpen: !state.isMenuOpen })),
  setItems: (items) => set({ items }),
  changeLoaded: () => set({ loaded: true }),
}));

export default useNavbar;