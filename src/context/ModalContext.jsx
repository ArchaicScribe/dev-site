import { createContext, useContext, useCallback, useRef } from 'react'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
    // Store close callbacks in a ref to avoid re-renders when registering
    const closeCallbacksRef = useRef(new Set())

    const registerModalClose = useCallback((callback) => {
        closeCallbacksRef.current.add(callback)
        // Return unregister function
        return () => {
            closeCallbacksRef.current.delete(callback)
        }
    }, [])

    const closeAllModals = useCallback(() => {
        closeCallbacksRef.current.forEach((callback) => callback())
    }, [])

    return (
        <ModalContext.Provider value={{ registerModalClose, closeAllModals }}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}
