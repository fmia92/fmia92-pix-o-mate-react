import { create } from 'zustand'

export const useMataGatosStore = create((set) => ({
  killedCats: 0,
  increaseKilledCats: () => set((state) => ({ killedCats: state.killedCats + 1 })),
  resetKilledCats: () => set({ killedCats: 0 }),
}));
