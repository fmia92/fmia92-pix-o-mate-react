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
  const { owners, loading, setPage, hasMoreData, setHasMoreData } = useFetchOwners({ searchText: debounceSearchText })
  const { favouritesOwners, addFavouriteOwner } = useFavouritesOwnersStore() 

  // useEffect(() => {
  //     localStorage.setItem("favoritesList", JSON.stringify(favouritesList));
  // }, [favouritesList]);

  const handleSelectOwner = (owner) => {
    setSelectedOwner(owner)
  }

  const handleCloseOwnerDetails = () => {
    setSelectedOwner(null)
  }

  const handleFavouriteEvent = () => {
    const isFavorite = favoritesData.some((item) => item.id === selectedOwner.id)
    if (isFavorite) {
      return
    }
    addFavouriteOwner(selectedOwner)
    setSelectedOwner(null)
  }

  const handleChangeSearchText = (e) => {
    if (e.target.value.length >= 2) {
      setSearchText(e.target.value.trim())
      setHasMoreData(true)
      setPage(1)
    } else if (e.target.value.length === 0) {
      setSearchText('')
      setHasMoreData(true)
      setPage(1)
    }
  }

  const debouncedSetPage = useCallback(
    debounce(() => {
      setPage((prev) => prev + 1)
    }, 200),
    []
  )

  const handleScroll = useCallback(() => {
    if (hasMoreData && !loading && window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
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