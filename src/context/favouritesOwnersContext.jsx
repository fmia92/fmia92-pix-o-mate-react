import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const storedFavouritesOwners = JSON.parse(localStorage.getItem('favouritesOwnersStorage')) || [];

export const useFavouritesOwnersStore = create(
  persist(
    (set) => ({
    favouritesOwners: storedFavouritesOwners,
    favouritesOwnersCount: 0,
    addFavouriteOwner: (owner) => set((state) => ({ 
      favouritesOwners: [...state.favouritesOwners, owner],
      favouritesOwnersCount: state.favouritesOwnersCount + 1
    })),
    removeFavouriteOwner: (id) => set((state) => ({ 
      favouritesOwners: state.favouritesOwners.filter((owner) => owner.id !== id),
      favouritesOwnersCount: state.favouritesOwnersCount - 1
    })),
    resetFavouritesOwners: () => set((state) => ({
      favouritesOwners: [],
      favouritesOwnersCount: 0
    }))
  }),
  {
    name: 'favouritesOwnersStorage'
  }
));
    