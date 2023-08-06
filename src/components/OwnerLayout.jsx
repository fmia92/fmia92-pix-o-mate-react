import { useState } from "react";
import { OwnerItem } from "./OwnerItem";
import { OwnerDetails } from "./OwnerDetails";
import { useFavouritesOwners } from "../context/favouritesOwnersContext";
import { useFetchOwners } from "../hooks/useFetchOwners";

export function OwnerLayout () {
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [perPages, setPerPages] = useState(10);
    const { favoritesData, setFavoritesData } = useFavouritesOwners();
    const { owners, loading } = useFetchOwners({ perPages });
   
    const handleSelectOwner = (owner) => {
        setSelectedOwner(owner);
    };

    const handleCloseOwnerDetails = () => {
        setSelectedOwner(null);

    };

    const handleLoadMore = () => {
        setPerPages(perPages + 10);
    };

    const handleFavouriteEvent = () => {
        const isFavorite = favoritesData.some((item) => item.id === selectedOwner.id)
        if (isFavorite) {
            return;
        }
        setFavoritesData(prevState => [...prevState, selectedOwner]);
        setSelectedOwner(null);
    };
    
    return (
        <section className="flex flex-col items-center justify-center h-full p-4">
            <div className="border-2 border-gray-300 p-4">
                {
                    loading 
                    ? <p>Cargando...</p>
                    : (
                        <>
                        <div>
                            {owners.map((owner) => (
                                <OwnerItem
                                    key={owner.id}
                                    owner={owner}
                                    isFavourite={favoritesData.some((item) => item.id === owner.id)}
                                    onOwnerClick={handleSelectOwner}
                                />
                            ))}
                            <button 
                                onClick={handleLoadMore}
                                className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                                Ver más
                            </button>
                        </div>
                        </>
                    )
                }
            <OwnerDetails owner={selectedOwner} onClose={handleCloseOwnerDetails} onSelectFavourite={handleFavouriteEvent} />
        </div>
      </section>
    )        
}