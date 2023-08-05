import { Link } from "wouter";

export function Home() {
    return (
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-4">
          <Link
            to="/owners"
            className="grid w-fit h-[300px] min-w-[300px] place-content-center text-2xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Dueños
          </Link>
          <Link
            to="/search"
            className="grid w-fit h-[300px] min-w-[300px] place-content-center text-2xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Buscar
          </Link>
        </div>
      </div>
    );
  }
  