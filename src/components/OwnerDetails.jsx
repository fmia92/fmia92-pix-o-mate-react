import { useEffect, useState } from "react";

export function OwnerDetails ({ owner, onClose, onSelectFavourite }) {
    const [favouritesList, setFavouritesList] = useState([]);

    useEffect(() => {
        const favoritesList = localStorage.getItem("favoritesList");
        if (favoritesList) {
            setFavouritesList(JSON.parse(favoritesList));
        }
    }, []);

    if (!owner) {
      return null;
    }

    if (!owner.created_at) {
        owner.created_at = new Date().getTime();
    }

    const formatTimeStamptoDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
  
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded">
          <p className="text-lg font-semibold">{owner.name}</p>
          <p>{owner.status}</p>
          <p>{owner.gender}</p>
          <p>{owner.email}</p>
          <p>{formatTimeStamptoDate(owner.created_at)}</p>
          <button onClick={onSelectFavourite} className="bg-blue-500 text-white mt-2 px-4 py-2 rounded">
            Añadir a Favoritos
          </button>
          <button onClick={onClose} className="bg-red-500 text-white mt-2 px-4 py-2 rounded">
            Cerrar
          </button>
        </div>
      </div>
    );
  }