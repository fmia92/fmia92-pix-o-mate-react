import { useCallback, useEffect, useState } from 'react'
import { OwnerItem } from './OwnerItem'
import { OwnerDetails } from './OwnerDetails'
import { useFetchOwners } from '../hooks/useFetchOwners'
import { useFavouritesOwnersStore } from '../context/favouritesOwnersContext'

export function OwnerLayout () {
  const [selectedOwner, setSelectedOwner] = useState(null)
  const { favouritesOwners, addFavouriteOwner } = useFavouritesOwnersStore()
  const { owners, loading, setPage, hasMoreData } = useFetchOwners({ searchText: '' })
   
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

  const debouncedSetPage = useCallback(
    debounce(() => {
      setPage((prev) => prev + 1)
    }, 200),
    []
  )

  const handleScroll = useCallback(() => {
    if (hasMoreData && !loading && window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
      debouncedSetPage()
    }
  }, [hasMoreData, loading, debouncedSetPage])

  useEffect(() => {
    // Escuchar el evento scroll para cargar más dueños cuando sea necesario
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  function debounce(func, delay) {
    let timeout
    return function (...args) {
      const context = this
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(context, args), delay)
    }
  }

  return (
    <section className="flex flex-col items-center justify-center h-full p-4 max-w-[100vw]">
      <div className="w-full max-w-md border-2 border-gray-300 p-4">
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