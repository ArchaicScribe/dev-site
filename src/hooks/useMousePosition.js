import { useState, useEffect, useCallback } from 'react'

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, normalizedX: 0.5, normalizedY: 0.5 })
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMouseMove = useCallback((event) => {
    if (prefersReducedMotion) return
    const { clientX, clientY } = event
    const { innerWidth, innerHeight } = window
    setMousePosition({ x: clientX, y: clientY, normalizedX: clientX / innerWidth, normalizedY: clientY / innerHeight })
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return
    let ticking = false
    const throttledHandler = (event) => {
      if (!ticking) {
        window.requestAnimationFrame(() => { handleMouseMove(event); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('mousemove', throttledHandler, { passive: true })
    return () => window.removeEventListener('mousemove', throttledHandler)
  }, [handleMouseMove, prefersReducedMotion])

  return mousePosition
}
export default useMousePosition
