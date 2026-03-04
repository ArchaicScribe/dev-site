import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext(null)

const STORAGE_KEY = 'portfolio-theme'
const DEFAULT_THEME = 'default'

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Read from localStorage on initial mount (client-side only)
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY)
            return stored === 'gold' ? 'gold' : DEFAULT_THEME
        }
        return DEFAULT_THEME
    })

    // Apply theme to document on mount and change
    useEffect(() => {
        document.documentElement.dataset.theme = theme
        // Also apply class-based theme for broader CSS selector compatibility
        document.documentElement.classList.remove('theme-default', 'theme-gold')
        document.documentElement.classList.add(`theme-${theme}`)
        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    const toggleTheme = useCallback(() => {
        console.log('toggleTheme called')
        setTheme(current => {
            const newTheme = current === 'default' ? 'gold' : 'default'
            console.log('Theme changing from', current, 'to', newTheme)
            return newTheme
        })
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export default ThemeContext
