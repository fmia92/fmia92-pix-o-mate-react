export function OwnerDetails ({ owner, onClose, onSelectFavourite }) {
    if (!owner) {
      return null;
    }

    const DATE_UNITS = {
        year: 31536000,
        month: 2629800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    }    

    const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

    const getRelativeTime = (epochTime) => {
        const start = epochTime;
        const now = new Date().getTime();

        const elapsed = (start - now) / 1000;

        for (const unit in DATE_UNITS) {
            const absoluteValue = Math.abs(elapsed)
            if (absoluteValue > DATE_UNITS[unit] || unit === 'second') {
                return rtf.format(
                    Math.floor(elapsed / DATE_UNITS[unit]),
                    unit
                )
            }
        }
        return '';
    }

    console.log({owner});

    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded">
          <p className="text-lg font-semibold">{owner.name}</p>
          <p>{owner.status}</p>
          <p>{owner.gender}</p>
          <p>{owner.email}</p>
          <p>{getRelativeTime(owner.created_at)}</p>
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
    );
  }