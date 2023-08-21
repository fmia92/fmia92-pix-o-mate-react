import { useFavouritesOwnersStore } from '../context/favouritesOwnersContext'
import { TrashIcon } from './Icons'

export function FavouritesList ({ onClose }) {
  const { favouritesOwners, removeFavouriteOwner } = useFavouritesOwnersStore()

  const handleDeleteFavorite = (id) => {
    removeFavouriteOwner(id)
  }
    
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md max-w-full overflow-x-auto">
        {favouritesOwners.length === 0 ? (
          <p>No tienes Dueños favoritos aún.</p>
        ) : (
          <table className="table-auto w-full">
            <caption className="py-5 text-lg font-semibold text-left text-gray-900 bg-white">
              Dueños Favoritos
              <p className="mt-1 text-sm font-normal text-gray-700">Lista de tus dueños de gatos favoritos.</p>
            </caption>
            <thead className='text-xs text-gray-200 uppercase bg-gray-700'>
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Género</th>
                <th className="px-6 py-3">Estado</th> 
                <th>--</th>
              </tr>
            </thead>
            <tbody className='text-white [&>*:nth-child(odd)]:bg-[#1b263b] [&>*:nth-child(even)]:border-gray-700 [&>*:nth-child(even)]:bg-[#384d68]'>
              {favouritesOwners.map((favorite) => (
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
        <button onClick={onClose} className="bg-[#ef476f] text-white mt-4 px-4 py-2 rounded">
                    Cerrar
        </button>
      </div>
    </div>
  )
}