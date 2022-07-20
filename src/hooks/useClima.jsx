import ClimaContext from "../context/ClimaProvider"
import { useContext } from "react"

const useClima = () => {
  return useContext(ClimaContext)
}

export default useClima
