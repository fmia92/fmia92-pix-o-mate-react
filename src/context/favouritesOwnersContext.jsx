import { createContext, useContext, useEffect, useState } from "react";

export const favouritesOwnersContext = createContext();

export const useFavouritesOwners = () => {
    return useContext(favouritesOwnersContext);
}

export const FavouritesOwnersProvider = ({ children }) => {
    const [favoritesData, setFavoritesData] = useState([]);
    const [favouritesOwnersCount, setFavouritesOwnersCount] = useState(0);

    useEffect(() => {
        setFavouritesOwnersCount(favoritesData.length);
    }, [favoritesData]);

    const addFavouriteOwner = (owner) => {
        setFavoritesData(prevState => [...prevState, owner]);
    };

    const removeFavouriteOwner = (id) => {
        const newData = favoritesData.filter((favorite) => favorite.id !== id);
        localStorage.setItem("favoritesList", JSON.stringify(newData));
        setFavoritesData(newData);
    };

    return (
        <favouritesOwnersContext.Provider value={{ favoritesData, setFavoritesData, favouritesOwnersCount, addFavouriteOwner, removeFavouriteOwner }}>
            {children}
        </favouritesOwnersContext.Provider>
    );
}
    