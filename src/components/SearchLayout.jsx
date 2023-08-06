import { useState } from "react";
import { OwnerDetails } from "./OwnerDetails";
import { OwnerItem } from "./OwnerItem";
import { useFavouritesOwners } from "../context/favouritesOwnersContext";
import { useDebounce } from "../hooks/useDebounce";
import { useFetchOwners } from "../hooks/useFetchOwners";

export function SearchLayout() {
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [perPages, setPerPages] = useState(10);
    const [searchText, setSearchText] = useState("");
    const { favoritesData, setFavoritesData } = useFavouritesOwners();
    const debounceSearchText = useDebounce(searchText, 500);
    const { owners, loading } = useFetchOwners({ searchText: debounceSearchText, perPages });


    // useEffect(() => {
    //     localStorage.setItem("favoritesList", JSON.stringify(favouritesList));
    // }, [favouritesList]);

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
                <div className="mb-4">
                    <input
                    type="text"
                    placeholder="Buscar Dueño..."
                    onChange={(e) => setSearchText(e.target.value.trim())}
                    className="p-2 border rounded w-full"
                    />
                </div>
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
    );
}