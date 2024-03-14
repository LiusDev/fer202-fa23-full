import { useContext } from "react"
import { ModalsContext } from "../context/ModalsContext"

const useModals = () => {
    const modals = useContext(ModalsContext)
    return modals
}

export default useModals
