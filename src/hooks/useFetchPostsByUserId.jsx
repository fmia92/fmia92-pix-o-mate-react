import { useEffect, useState } from 'react'
import { useMataGatosStore } from '../context/mataGatosContext'

export function useFetchPostsByUserId({userId}) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  //toDo: Convertir a zustand
  const increaseKilledCats = useMataGatosStore((state) => state.increaseKilledCats)

    
  useEffect(() => {
    const url = `https://gorest.co.in/public/v2/users/${userId}/posts`

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json, charset=UTF-8',
        'Authorization': 'Bearer 61cb4c2c7bf7096f606410c9f450b345f49b62dad96126720505faefd448f350'
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Algo salió mal...')
        }
        increaseKilledCats()
        return response.json()
      })
      .then((data) => {
        setPosts(data) // El array de posts se encuentra en la propiedad "data" del objeto de respuesta
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [userId])

  return {
    posts,
    loading,
    error
  }
}
