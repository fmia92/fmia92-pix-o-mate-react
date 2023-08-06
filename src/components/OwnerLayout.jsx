import { useCallback, useEffect, useState } from "react";
import { OwnerItem } from "./OwnerItem";
import { OwnerDetails } from "./OwnerDetails";
import { useFavouritesOwners } from "../context/favouritesOwnersContext";
import { useFetchOwners } from "../hooks/useFetchOwners";

export function OwnerLayout () {
    const [selectedOwner, setSelectedOwner] = useState(null);
    const { favoritesData, setFavoritesData } = useFavouritesOwners();
    const { owners, loading, setPage, hasMoreData } = useFetchOwners({ searchText: "" });
   
    const handleSelectOwner = (owner) => {
        setSelectedOwner(owner);
    };

    const handleCloseOwnerDetails = () => {
        setSelectedOwner(null);

    };

    const handleFavouriteEvent = () => {
        const isFavorite = favoritesData.some((item) => item.id === selectedOwner.id)
        if (isFavorite) {
            return;
        }
        setFavoritesData(prevState => [...prevState, selectedOwner]);
        setSelectedOwner(null);
    };

    const handleScroll = useCallback(() => {
        // Cargar más dueños cuando el usuario ha llegado al final de la página
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 && hasMoreData
        ) {
            setPage((prev) => prev + 1);
        }
    }, [hasMoreData, setPage]);

    useEffect(() => {
        // Escuchar el evento scroll para cargar más dueños cuando sea necesario
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

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
                        </div>
                        </>
                    )
                }
            <OwnerDetails owner={selectedOwner} onClose={handleCloseOwnerDetails} onSelectFavourite={handleFavouriteEvent} />
        </div>
      </section>
    )        
}