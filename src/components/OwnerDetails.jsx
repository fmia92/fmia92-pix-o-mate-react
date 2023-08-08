import { useFetchPostsByUserId } from '../hooks/useFetchPostsByUserId'
import { ManIcon, WomanIcon } from './Icons'

export function OwnerDetails ({ owner, onClose, onSelectFavourite }) {
  if (!owner) {
    return null
  }

  const { id, status, name, gender, email, created_at  } = owner

  const { posts, loading } = useFetchPostsByUserId({userId: id})

  const DATE_UNITS = {
    year: 31536000,
    month: 2629800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  }    

  const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

  const getRelativeTime = (epochTime) => {
    const start = epochTime
    const now = new Date().getTime()

    const elapsed = (start - now) / 1000

    for (const unit in DATE_UNITS) {
      const absoluteValue = Math.abs(elapsed)
      if (absoluteValue > DATE_UNITS[unit] || unit === 'second') {
        return rtf.format(
          Math.floor(elapsed / DATE_UNITS[unit]),
          unit
        )
      }
    }
    return ''
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-4 rounded w-fit overflow-auto max-w-[600px] max-h-full break-words">
        <p className="flex items-center gap-1">
          <span className="text-lg font-semibold">{name}</span> 
              - {gender}
          {
            gender == 'female'
              ? <WomanIcon />
              : <ManIcon />
          }
        </p>
        <p>
          <span className={`text-xl ${status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
            {status}
          </span> ({getRelativeTime(created_at)})
        </p>
        <p>{email}</p>
        {
          loading
            ? <p>Cargando...</p>
            : posts && posts?.map(({ id, title, body }) => (
              <div key={id} className="mt-2">
                <h4 className=" text-2xl font-semibold">{title}</h4>
                <p className="text-gray-600">{body}</p>
              </div>
            ))
        }
        {
          !loading && posts?.length === 0 && <img className="pt-4 pb-4"
            src="./no_posts.gif" alt="No hay posts" />
        }
        <div className="flex gap-2">
          <button onClick={onSelectFavourite} className="bg-blue-500 text-white mt-2 px-4 py-2 rounded">
                  Añadir a Favoritos
          </button>
          <button onClick={onClose} className="bg-red-500 text-white mt-2 px-4 py-2 rounded">
                  Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}