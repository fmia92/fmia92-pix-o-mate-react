import { useCallback, useEffect, useState } from 'react'
import { OwnerDetails } from './OwnerDetails'
import { OwnerItem } from './OwnerItem'
import { useFavouritesOwnersStore } from '../context/favouritesOwnersContext'
import { useDebounce } from '../hooks/useDebounce'
import { useFetchOwners } from '../hooks/useFetchOwners'

export function SearchLayout() {
  const [selectedOwner, setSelectedOwner] = useState(null)
  const [searchText, setSearchText] = useState('')
  const debounceSearchText = useDebounce(searchText, 500)
  const { owners, hasNextPage, error, isFetching, isLoading, fetchNextPage } = useFetchOwners({ searchText: debounceSearchText })
  const { favouritesOwners, addFavouriteOwner } = useFavouritesOwnersStore() 

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

  const handleChangeSearchText = (e) => {
    if (e.target.value.length >= 2) {
      setSearchText(e.target.value.trim())
    } else if (e.target.value.length === 0) {
      setSearchText('')
    }
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
          isLoading 
            ? <p>Cargando...</p>
            : (
              <>
                <div className='flex flex-col flex-wrap gap-1'>
                  {owners.map((owner) => (
                    <OwnerItem
                      key={owner.id}
                      owner={owner}
                      isFavourite={favouritesOwners.some((item) => item.id === owner.id)}
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