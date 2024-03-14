import React, { createContext, useState } from "react"
import Modals from "../components/common/Modals"

export const ModalsContext = createContext()

const ModalsProvider = ({ children }) => {
    const [show, setShow] = useState(false)
    const [modalContent, setModalContent] = useState({
        title: "",
        children: "",
        footer: null,
    })

    const showModals = ({ title, children, footer }) => {
        setModalContent({ title, children, footer })
        setShow(true)
    }

    const hideModals = () => {
        setShow(false)
        setModalContent({
            title: "",
            children: "",
            footer: null,
        })
    }

    const modals = { showModals, hideModals }
    return (
        <ModalsContext.Provider value={modals}>
            <Modals
                show={show}
                hideModals={hideModals}
                modalContent={modalContent}
            />
            {children}
        </ModalsContext.Provider>
    )
}

export default ModalsProvider
