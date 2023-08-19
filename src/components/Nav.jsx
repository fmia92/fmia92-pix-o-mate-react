import { CatIcon, HeartIcon } from './Icons'
import { useMataGatosStore } from '../context/mataGatosContext'
import { useFavouritesOwnersStore } from '../context/favouritesOwnersContext'
import { Link } from 'wouter'

export function Nav ({ title, showFavoritesModal }) {
  const killedCats = useMataGatosStore((state) => state.killedCats)
  const countFavouritesOwners = useFavouritesOwnersStore((state) => state.favouritesOwnersCount)

  return (
    <header className="bg-gray-300 p-4">
      <nav className='flex justify-between items-center'>
        <div className="flex gap-1 items-center">
          <CatIcon className="h-8 w-8 mr-2"/>
          <span className="text-lg font-bold">{killedCats}</span>
        </div>
        <Link href="/">
          <h1 className='text-2xl font-pacifico'>
            {title}
          </h1>
        </Link>
        <div className="flex gap-1 items-center" onClick={showFavoritesModal}>
          <HeartIcon className="h-8 w-8 mr-2" />
          <span className="text-lg font-bold"> {countFavouritesOwners}</span>
        </div>
      </nav>
    </header>
  )
}