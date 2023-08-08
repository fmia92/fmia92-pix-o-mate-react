import { Link } from 'wouter'

export function Home() {
  return (
    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4">
      <Link
        to="/owners"
        className="grid place-content-center h-[300px] w-[300px] text-2xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
            Dueños
      </Link>
      <Link
        to="/search"
        className="grid place-content-center h-[300px] w-[300px] text-2xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
            Buscar
      </Link>
      <Link 
        to="/pro"
        className="grid place-content-center h-[300px] w-[300px] text-2xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Soy un pro
      </Link>
    </div>
  )
}
  