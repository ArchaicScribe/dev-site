import { useState, useEffect, useCallback } from 'react'

export function useTypewriter(words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const tick = useCallback(() => {
    const currentWord = words[wordIndex]
    if (isDeleting) { setText(currentWord.substring(0, text.length - 1)) }
    else { setText(currentWord.substring(0, text.length + 1)) }
  }, [text, wordIndex, isDeleting, words])

  useEffect(() => {
    if (prefersReducedMotion) { setText(words[0]); setIsTyping(false); return }
    if (isPaused) {
      const pauseTimer = setTimeout(() => { setIsPaused(false); setIsDeleting(true) }, pauseTime)
      return () => clearTimeout(pauseTimer)
    }
    const currentWord = words[wordIndex]
    if (!isDeleting && text === currentWord) { setIsTyping(false); setIsPaused(true); return }
    if (isDeleting && text === '') { setIsDeleting(false); setIsTyping(true); setWordIndex((prev) => (prev + 1) % words.length); return }
    setIsTyping(true)
    const timer = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIndex, words, tick, typingSpeed, deletingSpeed, pauseTime, isPaused, prefersReducedMotion])

  return { text, isTyping }
}
export default useTypewriter
