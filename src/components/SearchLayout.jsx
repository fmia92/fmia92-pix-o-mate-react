import { useCallback, useEffect, useState } from "react";
import { OwnerDetails } from "./OwnerDetails";
import { OwnerItem } from "./OwnerItem";
import { useFavouritesOwners } from "../context/favouritesOwnersContext";
import { useDebounce } from "../hooks/useDebounce";
import { useFetchOwners } from "../hooks/useFetchOwners";

export function SearchLayout() {
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [searchText, setSearchText] = useState("");
    const { favoritesData, setFavoritesData } = useFavouritesOwners();
    const debounceSearchText = useDebounce(searchText, 500);
    const { owners, loading, setPage, hasMoreData, setHasMoreData } = useFetchOwners({ searchText: debounceSearchText });


    // useEffect(() => {
    //     localStorage.setItem("favoritesList", JSON.stringify(favouritesList));
    // }, [favouritesList]);

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

    const handleChangeSearchText = (e) => {
        console.log(e.target.value);
        if (e.target.value.length >= 2) {
            setSearchText(e.target.value.trim());
            setHasMoreData(true);
            setPage(1);
        } else if (e.target.value.length === 0) {
            setSearchText("");
            setHasMoreData(true);
            setPage(1);
        }
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
                <div className="mb-4">
                    <input
                    type="text"
                    placeholder="Buscar Dueño..."
                    onChange={handleChangeSearchText}
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
                        </div>
                        </>
                    )
                }
            <OwnerDetails owner={selectedOwner} onClose={handleCloseOwnerDetails} onSelectFavourite={handleFavouriteEvent} />
        </div>
      </section>
    );
}