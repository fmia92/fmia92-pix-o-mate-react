import { useState, useEffect } from "react";
import { OwnerDetails } from "./OwnerDetails";
import { OwnerItem } from "./OwnerItem";
import { useMataGatos } from "../context/mataGatosContext";

export function SearchLayout() {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [perPages, setPerPages] = useState(10);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [favouritesList, setFavouritesList] = useState([]);
    const { increaseKilledCats } = useMataGatos();

    useEffect(() => {
        const favouritesList = JSON.parse(localStorage.getItem("favoritesList"));
        if (favouritesList) {
            setFavouritesList(favouritesList);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favoritesList", JSON.stringify(favouritesList));
    }, [favouritesList]);

    const url = searchText 
        ? `https://gorest.co.in/public/v2/users?name=${searchText}&page=1&per_page=${perPages}`
        : `https://gorest.co.in/public/v2/users?page=1&per_page=${perPages}`;

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
        if (!searchText) {
            fechOwners();
        }

        if (!searchText || searchText.length < 2) {
            setSearchVisible(false);
            return;
        }
        setSearchVisible(true);
    }, [searchText]);

    const handleSelectOwner = (owner) => {
        setSelectedOwner(owner);
    };

    const handleCloseOwnerDetails = () => {
        setSelectedOwner(null);
    };

    const handleSearchclick = () => {
        fechOwners();
    };

    const handleLoadMore = () => {
        setPerPages(perPages + 10);
        fechOwners();
    };

    const handleFavouriteEvent = () => {
        const isFavorite = favouritesList.some((item) => item.id === selectedOwner.id)
        if (isFavorite) {
            return;
        }
        setFavouritesList( prev => [...prev, selectedOwner])
        setSelectedOwner(null);
    };
    
    return (
        <section className="flex flex-col items-center justify-center h-full p-4">
            <div className="border-2 border-gray-300 p-4">
                <div className="flex gap-3 mb-4">
                    <input
                    type="text"
                    placeholder="Buscar Dueño..."
                    onChange={(e) => setSearchText(e.target.value.trim())}
                    className="p-2 border rounded"
                    />
                    <button 
                        onClick={handleSearchclick} 
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!searchVisible}
                        >
                        Buscar
                    </button>
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
                                isFavourite={favouritesList.some((item) => item.id === owner.id)}
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