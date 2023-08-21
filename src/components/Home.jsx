import { Link } from 'wouter'

export function Home() {
  return (
    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4">
      <Link
        to="/owners"
        className="grid place-content-center h-[300px] w-[300px] text-2xl bg-[#55828b] text-white rounded-lg"
      >
            Dueños
      </Link>
      <Link
        to="/search"
        className="grid place-content-center h-[300px] w-[300px] text-2xl bg-[#55828b] text-white rounded-lg"
      >
            Buscar
      </Link>
      <Link 
        to="/pro"
        className="grid place-content-center h-[300px] w-[300px] text-2xl bg-[#55828b] text-white rounded-lg">
              Soy un pro
      </Link>
    </div>
  )
}
  