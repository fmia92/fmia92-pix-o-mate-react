import { useEffect, useState } from "react";
import { OwnerItem } from "./OwnerItem";
import { OwnerDetails } from "./OwnerDetails";
import { useMataGatos } from "../context/mataGatosContext";
import { useFavouritesOwners } from "../context/favouritesOwnersContext";

export function OwnerLayout () {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [perPages, setPerPages] = useState(10);
    const { increaseKilledCats } = useMataGatos();
    const { favoritesData, setFavoritesData } = useFavouritesOwners();


    const getFavouritesList = () => {
        console.log("getFavouritesList");
        console.log(favoritesData);
    };
    
    useEffect(() => {
        getFavouritesList();
    }, []);
    
    const url = `https://gorest.co.in/public/v2/users?page=1&per_page=${perPages}`;
    const fechOwners = () => {
        fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json, charset=UTF-8",
                    "Authorization": "Bearer 61cb4c2c7bf7096f606410c9f450b345f49b62dad96126720505faefd448f350"
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Algo salió mal...");
                }
                increaseKilledCats();
                return response.json();
            })
            .then((data) => {
                console.log({
                    data
                });
                setOwners(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error)
            });
        };

    useEffect(() => {
        fechOwners();
    }, [perPages]);

   
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