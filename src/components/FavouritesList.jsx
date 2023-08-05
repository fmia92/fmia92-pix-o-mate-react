import { useFavouritesOwners } from "../context/favouritesOwnersContext";
import { TrashIcon } from "./Icons";

export function FavouritesList ({ onClose }) {
    const { favoritesData, removeFavouriteOwner } = useFavouritesOwners();

    const handleDeleteFavorite = (id) => {
        removeFavouriteOwner(id);
    };
    
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md max-w-full overflow-auto">
                <h2 className="text-xl font-bold mb-4">Dueños Favoritos</h2>
                {favoritesData.length === 0 ? (
                    <p>No tienes Dueños favoritos aún.</p>
                ) : (
                    <table className="table-auto w-full">
                    <thead>
                        <tr>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Género</th>
                        <th className="px-4 py-2">Estado</th>
                        <th>--</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favoritesData.map((favorite) => (
                        <tr key={favorite.id}>
                            <td className="border px-4 py-2">{favorite.name}</td>
                            <td className="border px-4 py-2">{favorite.email}</td>
                            <td className="border px-4 py-2">{favorite.gender}</td>
                            <td className="border px-4 py-2">{favorite.status}</td>
                            <td className="border px-4 py-2" onClick={() => handleDeleteFavorite(favorite.id)}>   
                            <TrashIcon />         
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
                <button onClick={onClose} className="bg-blue-500 text-white mt-4 px-4 py-2 rounded">
                    Cerrar
                </button>
            </div>
        </div>
    )
}