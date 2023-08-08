import { createContext, useContext, useEffect, useState } from 'react'

export const favouritesOwnersContext = createContext()

export const useFavouritesOwners = () => {
  return useContext(favouritesOwnersContext)
}

// eslint-disable-next-line react/prop-types
export const FavouritesOwnersProvider = ({ children }) => {
  const [favoritesData, setFavoritesData] = useState([])
  const [favouritesOwnersCount, setFavouritesOwnersCount] = useState(0)

  useEffect(() => {
    setFavouritesOwnersCount(favoritesData.length)
  }, [favoritesData])

  const addFavouriteOwner = (owner) => {
    setFavoritesData(prevState => [...prevState, owner])
  }

  const removeFavouriteOwner = (id) => {
    setFavoritesData(prevState => prevState.filter((owner) => owner.id !== id))
  }

  return (
    <favouritesOwnersContext.Provider value={{ favoritesData, setFavoritesData, favouritesOwnersCount, addFavouriteOwner, removeFavouriteOwner }}>
      {children}
    </favouritesOwnersContext.Provider>
  )
}
    