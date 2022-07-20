import { createContext, useState } from "react";
import axios from "axios";

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {

  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)
  const [noResultado, setNoResultado] = useState('')

  const [busqueda, setBusqueda] = useState({
    ciudad:'',
    pais: ''
  })

  const datosBusqueda = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    })
  }

  const consultarClima = async datos => {
    setCargando(true)
    setNoResultado(false)
    setResultado({})
    try {
      const { ciudad, pais } = datos
      const appKey = import.meta.env.VITE_PUBLIC_KEY
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appKey}`

      const { data } = await axios(url)
      const { lat, lon } = data[0]

      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appKey}`
      const { data:clima } = await axios(urlClima)

      setResultado(clima)
    } catch (error) {
      setNoResultado('No hay resultados')
      console.error(error)
    } finally{
      setCargando(false)
    }
  }
  
  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        datosBusqueda,
        consultarClima,
        resultado,
        cargando,
        noResultado
      }}
    >
      {children}
    </ClimaContext.Provider>
  )
}

export {
  ClimaProvider
}

export default ClimaContext