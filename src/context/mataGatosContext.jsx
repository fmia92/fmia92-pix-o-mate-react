import { createContext, useContext, useState } from 'react'

export const mataGatosContext = createContext()

export const useMataGatos = () => {
  return useContext(mataGatosContext)
}

// eslint-disable-next-line react/prop-types
export const MataGatosProvider = ({ children }) => {
  const [killedCats, setKilledCats] = useState(0)

  const increaseKilledCats = () => {
    setKilledCats(prev => prev + 1)
  }

  const resetKilledCats = () => {
    setKilledCats(0)
  }

  return (
    <mataGatosContext.Provider value={{ killedCats, increaseKilledCats, resetKilledCats }}>
      {children}
    </mataGatosContext.Provider>
  )
}
