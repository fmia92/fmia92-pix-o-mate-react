import { useEffect, useState } from 'react'
import { OwnerItem } from './OwnerItem'
import { OwnerDetails } from './OwnerDetails'
import { useFetchOwners } from '../hooks/useFetchOwners'
import { useFavouritesOwnersStore } from '../context/favouritesOwnersContext'

export function OwnerLayout () {
  const [selectedOwner, setSelectedOwner] = useState(null)
  const { favouritesOwners, addFavouriteOwner } = useFavouritesOwnersStore()
  const { owners, hasNextPage, error, isFetching, isLoading, fetchNextPage } = useFetchOwners({ searchText: '' })
   
  const handleSelectOwner = (owner) => {
    setSelectedOwner(owner)
  }

  const handleCloseOwnerDetails = () => {
    setSelectedOwner(null)

  }

  const handleFavouriteEvent = () => {
    const isFavorite = favouritesOwners.some((item) => item.id === selectedOwner.id)
    if (isFavorite) {
      return
    }
    addFavouriteOwner(selectedOwner)
    setSelectedOwner(null)
  }

  const handleScroll = () => {
    if (hasNextPage && !isFetching && window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    // Escuchar el evento scroll para cargar más dueños cuando sea necesario
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <section className="flex flex-col items-center justify-center h-full p-4 max-w-[100vw]">
      <div className="w-full max-w-md border-2 border-gray-300 p-4">
        { isLoading && <p>Cargando...</p> }
        { !isLoading && owners.length === 0 && <p>No hay dueños</p> }
        { !isLoading && owners.length > 0 && (
                <div>
                  {owners.map((owner) => (
                    <OwnerItem
                      key={owner.id}
                      owner={owner}
                      isFavourite={favouritesOwners.some((item) => item.id === owner.id)}
                      onOwnerClick={handleSelectOwner}
                    />
                  ))}
                </div>
            )
        }
        {
          isFetching && <p>Cargando más dueños...</p>
        }
        {
          error && <p>Hubo un error</p>
        }
        <OwnerDetails owner={selectedOwner} onClose={handleCloseOwnerDetails} onSelectFavourite={handleFavouriteEvent} />
      </div>
    </section>
  )        
}